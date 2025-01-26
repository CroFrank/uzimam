export const prerender = false
import type { APIRoute } from "astro"
import { OpenAI } from "openai"
import { openAiPromptData } from "../../data/ai-songs-generator"

export const POST: APIRoute = async ({ request }) => {
  const { prompt } = await request.json()
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
    const items = completion.choices[0].message.content.split("\n")

    if (items.length < 2) {
      console.log("neispravan unos")
      return new Response(
        JSON.stringify([
          "Molim Vas napišite valjane primjere pjesama i/ili izvođača.",
        ])
      )
    }

    const arrayOfSongs = []

    for (const song of items) {
      const params = new URLSearchParams({
        part: "snippet",
        q: song,
        type: "video",
        videoCategoryId: "10", // Optional: Music category
        maxResults: "1", // Fetch the top result
        key: import.meta.env.YOUTUBE_API_KEY,
      })

      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?${params}`
        )
        const data = await response.json()

        // if (data.items && data.items.length > 0) {
        const video = data.items[0]
        const videoId = video.id.videoId
        const videoTitle = video.snippet.title

        arrayOfSongs.push(
          `${videoTitle} https://www.youtube.com/watch?v=${videoId}`
        )
        // } else {
        //   console.log("No video found.")
        //   arrayOfSongs.push(null)
        // }
      } catch (error) {
        console.error("Error fetching YouTube data")
        arrayOfSongs.push(null)
      }
    }

    const pureArrayOfSongs = arrayOfSongs.filter((song) => song !== null)
    if (pureArrayOfSongs.length < 1) {
      return new Response(
        JSON.stringify([
          "Postignut je dnevni limit, pokušajte ponovno kasnije.",
        ])
      )
    }
    return new Response(JSON.stringify(pureArrayOfSongs), {
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
