interface OpenAIRequest {
  model: string
  messages: Message[]
  temperature: number
  top_p: number
}

interface Message {
  role: "developer" | "user"
  content: string
}

export const openAiPromptData = (prompt: string): OpenAIRequest => {
  return {
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
  }
}
