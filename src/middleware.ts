import { defineMiddleware } from "astro:middleware"
import { supabase } from "./lib/supabase"

export const onRequest = defineMiddleware(async ({ locals }, next) => {
  console.log("middelware hit")
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()
    locals.name = session?.user.user_metadata.name ?? null
    locals.email = session?.user.email ?? null
    locals.id = session?.user.id ?? null
  } catch (error) {
    console.error("Error fetching user:", error)
    locals.name = null
    locals.email = null
    locals.id = null
  }

  return next()
})
