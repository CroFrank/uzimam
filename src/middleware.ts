import { defineMiddleware } from "astro:middleware"
import { supabase } from "./lib/supabase"

export const onRequest = defineMiddleware(async ({ locals }, next) => {
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession()
    if (error) {
      console.log(`session error : ${error}`)
    }
    if (!session) {
      console.log(`no session : ${session}`)
    }
    if (!session?.user.id) {
      console.log(`no session id : ${session?.user.id}`)
    }
    if (!session?.user.user_metadata.name) {
      console.log(`no session name : ${session?.user.user_metadata.name}`)
    }
    console.log("middelware goes first")
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
