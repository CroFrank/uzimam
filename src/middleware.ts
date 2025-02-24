import { defineMiddleware } from "astro:middleware"
import { supabase } from "./lib/supabase"

export const onRequest = defineMiddleware(async ({ locals }, next) => {
  console.log("middelware hit")
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    locals.name = user?.user_metadata.name ?? null
    locals.email = user?.user_metadata.email ?? null
    locals.id = user?.id ?? null
  } catch (error) {
    console.error("Error fetching user:", error)
    locals.name = null
    locals.email = null
    locals.id = null
  }

  return next()
})
