import type { APIRoute } from "astro"
import { supabase } from "../../../lib/supabase"

export const DELETE: APIRoute = async ({ request }) => {
  let id

  try {
    const { id: parsedId } = await request.json()
    id = parsedId
  } catch (error) {
    console.error("Error parsing JSON:", error)
    return new Response(
      JSON.stringify("Invalid JSON format or missing fields."),
      {
        status: 400,
      }
    )
  }

  if (!id) {
    return new Response(
      JSON.stringify("Missing required 'id' field in the request."),
      {
        status: 400,
      }
    )
  }

  const { error } = await supabase.from("guest").delete().eq("id", id)

  if (error) {
    console.error("Database Error:", error.message)
    return new Response(JSON.stringify("Error, pokušajte ponovno kasnije."), {
      status: 500,
    })
  }

  return new Response(JSON.stringify("Gost uklonjen"), {
    status: 200,
  })
}
