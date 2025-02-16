import type { APIRoute } from "astro"
import { supabase } from "../../../lib/supabase"

export const POST: APIRoute = async ({ request }) => {
  try {
    const { id, name, url, invited, confirmed } = await request.json()

    if (!id || typeof id !== "string" || !name) {
      return new Response(
        JSON.stringify({ error: "Invalid or missing ID or name" }),
        {
          status: 400,
        }
      )
    }
    const { data, error } = await supabase
      .from("guest")
      .update({ name, url, invited, confirmed })
      .eq("id", id)
      .select()

    if (error) {
      console.error("Database Error:", error.message)
      return new Response(JSON.stringify({ error: "Database update failed" }), {
        status: 500,
      })
    }

    return new Response(
      JSON.stringify({ message: "Guest successfully updated", data }),
      { status: 200 }
    )
  } catch (err) {
    console.error("Unexpected Error:", err)
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    })
  }
}
