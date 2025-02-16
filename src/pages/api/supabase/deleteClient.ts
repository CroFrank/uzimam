import type { APIRoute } from "astro"
import { supabase } from "../../../lib/supabase"

export const DELETE: APIRoute = async ({ request }) => {
  try {
    const { id } = await request.json()

    if (!id) {
      return new Response(JSON.stringify("ID is required"), {
        status: 400,
      })
    }

    const { error } = await supabase.from("mladenci").delete().eq("id", id)

    if (error) {
      console.error("Database Error:", error.message)
      return new Response(JSON.stringify("Error, pokušajte ponovno kasnije."), {
        status: 500,
      })
    }

    return new Response(JSON.stringify("Mladenci izbrisani"), {
      status: 200,
    })
  } catch (err) {
    console.error("Server Error:", err)
    return new Response(JSON.stringify("Interna greška servera"), {
      status: 500,
    })
  }
}
