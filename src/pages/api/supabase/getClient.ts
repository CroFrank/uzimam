import type { APIRoute } from "astro"
import { supabase } from "../../../lib/supabase"

export const POST: APIRoute = async ({ request }) => {
  const { id } = await request.json()
  try {
    const { data: mladenci, error } = await supabase
      .from("mladenci")
      .select("*")
      .eq("user_id", id)
      .limit(1)
      .single()

    return new Response(JSON.stringify({ success: true, data: mladenci }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("Unexpected Error:", err)
    return new Response(
      JSON.stringify({ success: false, data: null, message: "Server error" }),
      { status: 500 }
    )
  }
}
