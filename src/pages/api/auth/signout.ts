import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ cookies }) => {
  cookies.delete("sb-access-token", {
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "lax",
  })
  cookies.delete("sb-refresh-token", {
    path: "/",
    secure: true,
    httpOnly: true,
    sameSite: "lax",
  })

  return new Response(JSON.stringify({ success: true, redirect: "/signin" }), {
    headers: { "Content-Type": "application/json" },
  })
}
