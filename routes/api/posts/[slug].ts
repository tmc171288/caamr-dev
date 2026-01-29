import { Handlers } from "$fresh/server.ts";
import { isValidSession } from "../../../utils/auth.ts";

export const handler: Handlers = {
  async DELETE(req, ctx) {
    if (!isValidSession(req)) {
      return new Response("Unauthorized", { status: 401 });
    }

    const slug = ctx.params.slug;

    try {
      await Deno.remove(`./posts/${slug}.md`);
      return new Response("OK", { status: 200 });
    } catch {
      return new Response("Not found", { status: 404 });
    }
  },
};
