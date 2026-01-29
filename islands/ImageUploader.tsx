import { useSignal } from "@preact/signals";

interface ImageFile {
  name: string;
  url: string;
}

export default function ImageUploader() {
  const images = useSignal<ImageFile[]>([]);
  const uploading = useSignal(false);
  const message = useSignal("");
  const loaded = useSignal(false);

  const loadImages = async () => {
    try {
      const res = await fetch("/api/upload");
      if (res.ok) {
        const data = await res.json();
        images.value = data.files;
      }
    } catch {
      // ignore
    }
    loaded.value = true;
  };

  if (!loaded.value) {
    loadImages();
  }

  const handleUpload = async (e: Event) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    uploading.value = true;
    message.value = "";

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        message.value = `Upload thanh cong! URL: ${data.url}`;
        await loadImages();
      } else {
        message.value = `Loi: ${data.error}`;
      }
    } catch {
      message.value = "Loi ket noi";
    }

    uploading.value = false;
    input.value = "";
  };

  const handleDelete = async (filename: string) => {
    if (!confirm("Ban co chac muon xoa anh nay?")) return;

    try {
      const res = await fetch(`/api/upload?filename=${filename}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await loadImages();
      }
    } catch {
      // ignore
    }
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    message.value = "Da copy URL!";
    setTimeout(() => {
      message.value = "";
    }, 2000);
  };

  return (
    <div>
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Upload anh moi
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading.value}
          class="block w-full text-sm text-gray-500 dark:text-gray-400
            file:mr-4 file:py-2 file:px-4
            file:rounded-lg file:border-0
            file:text-sm file:font-medium
            file:bg-primary-600 file:text-white
            hover:file:bg-primary-700
            disabled:opacity-50"
        />
        <p class="mt-1 text-xs text-gray-500">
          JPEG, PNG, GIF, WEBP. Toi da 5MB.
        </p>
      </div>

      {message.value && (
        <div class="mb-4 p-3 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded">
          {message.value}
        </div>
      )}

      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.value.map((img) => (
          <div
            key={img.name}
            class="relative group bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden"
          >
            <img
              src={img.url}
              alt={img.name}
              class="w-full h-32 object-cover"
            />
            <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => copyUrl(img.url)}
                class="px-2 py-1 bg-white text-gray-900 rounded text-xs"
              >
                Copy
              </button>
              <button
                type="button"
                onClick={() => handleDelete(img.name)}
                class="px-2 py-1 bg-red-600 text-white rounded text-xs"
              >
                Xoa
              </button>
            </div>
            <div class="p-2 text-xs text-gray-600 dark:text-gray-400 truncate">
              {img.name}
            </div>
          </div>
        ))}
      </div>

      {loaded.value && images.value.length === 0 && (
        <div class="text-center py-8 text-gray-500 dark:text-gray-400">
          Chua co anh nao. Hay upload anh dau tien!
        </div>
      )}
    </div>
  );
}
