interface DeleteButtonProps {
  slug: string;
}

export default function DeleteButton({ slug }: DeleteButtonProps) {
  const handleDelete = async () => {
    if (confirm("Bạn có chắc muốn xóa bài viết này?")) {
      const res = await fetch(`/api/posts/${slug}`, { method: "DELETE" });
      if (res.ok) {
        location.reload();
      } else {
        alert("Không thể xóa bài viết");
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      class="text-red-600 hover:text-red-800"
    >
      Xóa
    </button>
  );
}
