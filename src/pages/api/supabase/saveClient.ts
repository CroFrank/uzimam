import type { APIRoute } from "astro"
import { supabase } from "../../../lib/supabase"

export const POST: APIRoute = async ({ request }) => {
  try {
    const { herName, hisName, date, id } = await request.json()

    if (!herName || !hisName || !date || !id) {
      return new Response(JSON.stringify("Popunite sva polja"), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      })
    }

    const { error } = await supabase.from("mladenci").insert([
      {
        user_id: id,
        hername: herName,
        hisname: hisName,
        date,
      },
    ])

    if (error) {
      console.error("Supabase insert error:", error)
      return new Response(JSON.stringify("Greška prilikom slanja podataka"), {
        status: 500,
      })
    }

    return new Response(
      JSON.stringify({ message: "Mladenci uspješno dodani" }),
      {
        status: 201,
      }
    )
  } catch (err) {
    console.error("Server error:", err)
    return new Response(JSON.stringify("Interna greška servera"), {
      status: 500,
    })
  }
}
