import type { APIRoute } from "astro"
import { OpenAI } from "openai"
import { openAiPromptData } from "../../data/ai-generator-pozivnica-data"

export const POST: APIRoute = async ({ request }) => {
  try {
    const { id, formData } = await request.json()

    if (!id) {
      console.error("Unauthorized access: User not logged in.")
      return new Response(JSON.stringify("Morate biti prijavljeni"), {
        status: 401,
      })
    }

    if (!formData || Object.keys(formData).length === 0) {
      console.error("Invalid request: formData is missing.")
      return new Response(JSON.stringify("Podaci obrasca nisu ispravni"), {
        status: 400,
      })
    }

    const apiKey = import.meta.env.OPENAI_API_KEY
    if (!apiKey) {
      console.error("Server error: OpenAI API key is missing.")
      return new Response(JSON.stringify("AI usluga nije dostupna."), {
        status: 500,
      })
    }

    const openai = new OpenAI({ apiKey })

    const completion = await openai.chat.completions.create(
      openAiPromptData(formData)
    )

    const responseContent = completion?.choices?.[0]?.message?.content
    if (!responseContent) {
      console.error("OpenAI API error: No content received.")
      return new Response(JSON.stringify("AI usluga trenutno nije dostupna."), {
        status: 503,
      })
    }

    return new Response(JSON.stringify(responseContent), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Server Error:", error)
    return new Response(
      JSON.stringify("Usluga trenutno nije dostupna, pokušajte kasnije."),
      { status: 500 }
    )
  }
}
