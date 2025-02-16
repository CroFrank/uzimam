import type { APIRoute } from "astro"
import { supabase } from "../../../lib/supabase"

export const POST: APIRoute = async ({ request }) => {
  try {
    const {
      id,
      name,
      url,
      invited = false,
      confirmed = false,
    } = await request.json()

    if (!name || typeof name !== "string") {
      return new Response(JSON.stringify("Ime gosta je obavezno"), {
        status: 400,
      })
    }

    const { error } = await supabase.from("guest").insert({
      user_id: id,
      name,
      url,
      invited,
      confirmed,
    })
    if (error) {
      console.error("Database Error:", error.message)
      return new Response(JSON.stringify("Database insert failed"), {
        status: 500,
      })
    }

    return new Response(JSON.stringify("Uzvanik uspješno dodan"), {
      status: 200,
    })
  } catch (err) {
    console.error("Unexpected Error:", err)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    })
  }
}
