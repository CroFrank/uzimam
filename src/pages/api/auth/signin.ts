import type { APIRoute } from "astro"
import { supabase } from "../../../lib/supabase"

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { email, password } = await request.json()
    if (!email || !password) {
      return new Response(JSON.stringify("Email i lozinka su obavezni"), {
        status: 400,
      })
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    console.log(data)
    if (error) {
      console.log(error)
      return new Response(JSON.stringify("Neispravan unos."), { status: 401 })
    }

    const { access_token, refresh_token } = data.session
    cookies.set("sb-access-token", access_token, {
      path: "/",
    })

    cookies.set("sb-refresh-token", refresh_token, {
      path: "/",
    })
    return new Response(
      JSON.stringify({ success: true, redirect: "/dashboard" }),
      {
        headers: { "Content-Type": "application/json" },
      }
    )
  } catch (error) {
    console.error(error)
    return new Response(
      JSON.stringify("Usluga nije dostupna, pokušajte ponovno kasnije."),
      { status: 500 }
    )
  }
}
