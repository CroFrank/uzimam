export const prerender = false
import type { APIRoute } from "astro"
import { OpenAI } from "openai"
import { openAiPromptData } from "../../data/ai-generator-pozivnica-data"

export const POST: APIRoute = async ({ request }) => {
  const prompt = await request.json()
  try {
    const openai = new OpenAI({ apiKey: import.meta.env.OPENAI_API_KEY })

    const completion = await openai.chat.completions.create(
      openAiPromptData(prompt)
    )
    if (!completion.choices[0].message.content) {
      console.log("openai API error")
      return new Response(
        JSON.stringify([
          "Usluga trenutno nedostupna, pokušajte ponovno kasnije.",
        ])
      )
    }
    const textPozivnice = completion.choices[0].message.content

    return new Response(JSON.stringify(textPozivnice), {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new Response(
      JSON.stringify([
        "Usluga je trenutno nedostupna, pokušajte ponovno kasnije.",
      ])
    )
  }
}
