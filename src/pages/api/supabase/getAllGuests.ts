import type { APIRoute } from "astro"
import { supabase } from "../../../lib/supabase"

export const POST: APIRoute = async ({ request }) => {
  const { id } = await request.json()

  try {
    const { data: guests, error } = await supabase
      .from("guest")
      .select("*")
      .eq("user_id", id)

    if (error) {
      console.error("Database Error:", error.message)
      return new Response(JSON.stringify("Error, pokušajte ponovno kasnije."), {
        status: 500,
      })
    }

    return new Response(JSON.stringify({ success: true, data: guests }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("Unexpected Error:", err)
    return new Response(JSON.stringify("Error, pokušajte ponovno kasnije."), {
      status: 500,
    })
  }
}
