import type { APIRoute } from "astro"
import { supabase } from "../../../lib/supabase"

export const POST: APIRoute = async ({ request }) => {
  const {
    id,
    name,
    link,
    invited = false,
    confirmed = false,
  } = await request.json()

  if (!name) {
    return new Response(JSON.stringify("Ime gosta je obavezno"), {
      status: 400,
    })
  }

  const { data, error } = await supabase.from("guest").insert({
    user_id: id,
    name: name,
    url: link,
    invited: invited,
    confirmed: confirmed,
  })
  if (data) {
    console.log(data)
  }
  if (error) {
    console.log(error)
  }

  return new Response(JSON.stringify("Uzvanik uspješno dodan"), {
    status: 200,
  })
}
