import type { APIRoute } from "astro"
import { OpenAI } from "openai"

// Configure OpenAI
const openAiConfig = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY,
})

export const post: APIRoute = async ({ request }) => {
  try {
    const { name } = await request.json()

    // Prepare the prompt
    const prompt = `
      Create a wedding invitation text:
      Start text with saying helo to ${name}
      - Names: ${name}
   }
      
      Text:
    `

    // Call OpenAI API
    const response = await openAiConfig.chat.completions.create({
      model: "gpt-4o",
      prompt,
      max_tokens: 250,
    })

    const generatedText = response.data.choices[0].text.trim()

    return new Response(JSON.stringify({ text: generatedText }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Error generating invitation:", error)
    return new Response(
      JSON.stringify({ error: "Failed to generate invitation text" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    )
  }
}
