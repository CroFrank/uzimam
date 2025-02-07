import type { APIRoute } from "astro"
import { supabase } from "../../../lib/supabase"

export const POST: APIRoute = async ({ request }) => {
  const { name, email, password } = await request.json()

  if (!email || !password || !name) {
    return new Response(JSON.stringify("Ime, email i lozinka su obavezni."), {
      status: 400,
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify("Neispravan email format"), {
      status: 400,
    })
  }

  const strongPasswordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W)[A-Za-z\d\W]{8,}$/

  if (!strongPasswordRegex.test(password)) {
    console.log(
      "Lozinka mora sadržavati minimalno 8 znakova od kojih barem jedan broj, veliko slovo i poseban znak '!?%...'"
    )
    return new Response(
      JSON.stringify(
        "Lozinka mora sadržavati minimalno 8 znakova od kojih barem jedan broj, veliko slovo i poseban znak '!?%...'"
      ),
      { status: 400 }
    )
  }

  const sanitize = (str: string) => str.replace(/[<>]/g, "")
  const { error } = await supabase.auth.signUp({
    email: sanitize(email),
    password,
    options: {
      data: {
        name: sanitize(name),
      },
    },
  })

  if (error) {
    console.log(error)
    return new Response(
      JSON.stringify("Ups, negdje je zapelo, pokušajte ponovno kasnije."),
      {
        status: 500,
      }
    )
  }

  return new Response(
    JSON.stringify({ success: true, redirect: "/uspjesna-registracija" }),
    {
      headers: { "Content-Type": "application/json" },
    }
  )
}
