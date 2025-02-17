import type { APIRoute } from "astro"
import { supabase } from "../../../lib/supabase"

export const POST: APIRoute = async ({ request }) => {
  try {
    const { longLink, id } = await request.json()
    if (!longLink || !id) {
      return new Response(JSON.stringify("link is required"), {
        status: 400,
      })
    }

    const randomStr = Math.random().toString(36).substring(2, 8)
    const slug = `https://www.uzimam.com/${randomStr}`

    const { data, error } = await supabase
      .from("short_links")
      .insert({ slug, original_url: longLink, user_id: id })
      .select()
      .single()

    if (error) {
      console.error("Database Error:", error.message)
      return new Response(JSON.stringify("Error, pokušajte ponovno kasnije."), {
        status: 500,
      })
    }

    return new Response(JSON.stringify({ success: true, data: data.slug }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("Server Error:", err)
    return new Response(JSON.stringify("Interna greška servera"), {
      status: 500,
    })
  }
}
