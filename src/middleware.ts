import { defineMiddleware } from "astro:middleware"
import { supabase } from "./lib/supabase"

export const onRequest = defineMiddleware(async ({ locals, request }, next) => {
  try {
    const cookies = request.headers.get("cookie") || ""
    const accessToken = cookies
      .split(";")
      .map((str) => str.trim())
      .find((row) => row.startsWith("sb-access-token="))
      ?.split("=")[1]
    const refreshToken = cookies
      .split(";")
      .map((str) => str.trim())
      .find((row) => row.startsWith("sb-refresh-token="))
      ?.split("=")[1]

    const { data, error } = await supabase.auth.setSession({
      access_token: accessToken || "",
      refresh_token: refreshToken || "",
    })
    const { session } = data

    if (error || !session) {
      console.log("Session expired")
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
