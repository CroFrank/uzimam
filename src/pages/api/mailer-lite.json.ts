export const prerender = false
import type { APIRoute } from "astro"

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.json()

    const res = await fetch(`https://connect.mailerlite.com/api/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${import.meta.env.MAILER_LITE_API}`,
      },
      body: JSON.stringify({
        email: data,
        groups: [import.meta.env.MAILER_LITE_GROUP_ID],
      }),
    })

    if (!res.ok) {
      const errorOutput = await res.json()
      throw new Error(
        `MailerLite API error: ${errorOutput?.message || res.statusText}`
      )
    }

    const output = await res.json()

    return new Response(
      JSON.stringify({
        message: output.data.email,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    )
  } catch (error) {
    console.error("Error during MailerLite API request:", error)

    return new Response(
      JSON.stringify({
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
