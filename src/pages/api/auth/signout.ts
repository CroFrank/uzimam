import type { APIRoute } from "astro"

export const GET: APIRoute = async ({ cookies }) => {
  cookies.delete("sb-access-token", { path: "/" })
  cookies.delete("sb-refresh-token", { path: "/" })
  return new Response(JSON.stringify({ success: true, redirect: "/signin" }), {
    headers: { "Content-Type": "application/json" },
  })
}
