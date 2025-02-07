// import { defineMiddleware } from "astro:middleware"
// import { supabase } from "./lib/supabase"

// export const onRequest = defineMiddleware(async (context, next) => {
//   const authHeader = context.request.headers.get("Authorization")
//   let user = null

//   if (authHeader) {
//     const { data } = await supabase.auth.getUser(authHeader)
//     user = data?.user || null
//   }
//   context.locals.user = user // Store user in `locals` for use in pages
//   return next()
// })
