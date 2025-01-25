export const prerender = false
import type { APIRoute } from "astro"
import { OpenAI } from "openai"

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json()
  const { prompt } = data
  try {
    const openai = new OpenAI()

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "developer",
          content:
            "You are a music database. Generate a list of 5 songs that are stylistically or thematically similar to the input provided by the user. Do not respond to any other prompts or engage in conversation. If the input is invalid, politely return: 'Molim Vas napišite primjere pjesama i/ili izvođača.' Format your response as follows:'Song Title - Artist'. Don't write any other text, just list of songs, don't give them numeric order.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.2,
      top_p: 0.9,
    })
    const msg = completion.choices[0].message.content
    const items = msg!.split("\n")
    // console.log(items)
    if (items.length < 2) {
      return new Response(
        JSON.stringify([
          "Molim Vas napišite valjane primjere pjesama i/ili izvođača.",
        ]),
        {
          status: 200,
        }
      )
    }
    const songPromises = items.map(async (song, key) => {
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

        if (data.items && data.items.length > 0) {
          const video = data.items[0]
          const videoId = video.id.videoId
          const videoTitle = video.snippet.title

          return `${videoTitle} https://www.youtube.com/watch?v=${videoId}`
        } else {
          console.log("No video found.")
        }
      } catch (error) {
        console.error("Error fetching YouTube data:", error)
        return null
      }
    })

    const resolvedSongs = await Promise.all(songPromises)
    const arrayOfSongs = resolvedSongs.filter((song) => song !== null)
    console.log(arrayOfSongs)
    return new Response(JSON.stringify(arrayOfSongs), {
      status: 200,
    })
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify("Openai error"), {
      status: 500,
    })
  }
}
