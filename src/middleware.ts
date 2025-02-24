import { defineMiddleware } from "astro:middleware"
import { supabase } from "./lib/supabase"

export const onRequest = defineMiddleware(async ({ locals, request }, next) => {
  try {
    const { data, error } = await supabase.auth.getSession()
    const { session } = data

    if (!session) {
      console.log(`no session : ${data}`)
      console.log("Session data:", JSON.stringify(data, null, 2))
    }

    if (error || !session) {
      console.log("Session expired, refreshing...")
      await supabase.auth.refreshSession()
    }

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
