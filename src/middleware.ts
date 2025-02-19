import { defineMiddleware } from "astro:middleware"
import { supabase } from "./lib/supabase"

export const onRequest = defineMiddleware(async (context, next) => {
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()
    context.locals.name = user?.user_metadata.name ?? null
    context.locals.email = user?.user_metadata.email ?? null
    context.locals.id = user?.id ?? null
    console.log(`get from middelwarw ${user?.id}`)
  } catch (error) {
    console.error("Error fetching user:", error)
    context.locals.name = null
    context.locals.email = null
    context.locals.id = null
  }

  return next()
})
