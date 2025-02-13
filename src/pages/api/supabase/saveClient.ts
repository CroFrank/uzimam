import type { APIRoute } from "astro"
import { supabase } from "../../../lib/supabase"

export const POST: APIRoute = async ({ request }) => {
  const { herName, hisName, date, id } = await request.json()

  if (!herName || !hisName || !date) {
    return new Response(JSON.stringify("Popunite sva polja"), {
      status: 400,
    })
  }
  console.log(herName, hisName, date, id)

  const { data, error } = await supabase.from("mladenci").insert({
    user_id: id,
    hername: herName,
    hisname: hisName,
    date,
  })
  if (data) {
    console.log(data)
  }
  if (error) {
    console.log(error)
    return new Response(JSON.stringify("Error prilikom slanja podataka"), {
      status: 200,
    })
  }

  return new Response(JSON.stringify("Mladenci uspješno dodani"), {
    status: 200,
  })
}
