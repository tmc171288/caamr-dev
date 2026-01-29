import { Handlers } from "$fresh/server.ts";
import { isValidSession } from "../../utils/auth.ts";

const UPLOAD_DIR = "./static/uploads";

export const handler: Handlers = {
  async POST(req) {
    if (!isValidSession(req)) {
      return new Response("Unauthorized", { status: 401 });
    }

    try {
      await Deno.mkdir(UPLOAD_DIR, { recursive: true });
    } catch {
      // Directory exists
    }

    const form = await req.formData();
    const file = form.get("file") as File;

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { error: "Only JPEG, PNG, GIF, WEBP images are allowed" },
        { status: 400 },
      );
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return Response.json(
        { error: "File size must be less than 5MB" },
        { status: 400 },
      );
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename = `${Date.now()}-${crypto.randomUUID().slice(0, 8)}.${ext}`;
    const filepath = `${UPLOAD_DIR}/${filename}`;

    const buffer = await file.arrayBuffer();
    await Deno.writeFile(filepath, new Uint8Array(buffer));

    const url = `/uploads/${filename}`;

    return Response.json({ url, filename });
  },

  async GET(req) {
    if (!isValidSession(req)) {
      return new Response("Unauthorized", { status: 401 });
    }

    try {
      const files: { name: string; url: string }[] = [];
      for await (const entry of Deno.readDir(UPLOAD_DIR)) {
        if (entry.isFile) {
          files.push({
            name: entry.name,
            url: `/uploads/${entry.name}`,
          });
        }
      }
      files.sort((a, b) => b.name.localeCompare(a.name));
      return Response.json({ files });
    } catch {
      return Response.json({ files: [] });
    }
  },

  async DELETE(req) {
    if (!isValidSession(req)) {
      return new Response("Unauthorized", { status: 401 });
    }

    const url = new URL(req.url);
    const filename = url.searchParams.get("filename");

    if (!filename) {
      return Response.json({ error: "Filename required" }, { status: 400 });
    }

    if (filename.includes("..") || filename.includes("/")) {
      return Response.json({ error: "Invalid filename" }, { status: 400 });
    }

    try {
      await Deno.remove(`${UPLOAD_DIR}/${filename}`);
      return Response.json({ success: true });
    } catch {
      return Response.json({ error: "File not found" }, { status: 404 });
    }
  },
};
