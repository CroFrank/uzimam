import type { APIRoute } from "astro"
import { supabase } from "../../../lib/supabase"

export const POST: APIRoute = async ({ cookies }) => {
  cookies.delete("sb-access-token", {
    path: "/",
  })
  cookies.delete("sb-refresh-token", {
    path: "/",
  })
  await supabase.auth.signOut()

  return new Response(JSON.stringify({ success: true, redirect: "/signin" }), {
    headers: { "Content-Type": "application/json" },
  })
}
