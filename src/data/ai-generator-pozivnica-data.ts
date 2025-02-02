interface OpenAIRequest {
  model: string
  messages: Message[]
}
interface Message {
  role: "developer"
  content: string
}

interface PromptProps {
  gosti: string
  oGostima: string
  ton: string
  prisnost: string
  textLength: string
}

export const openAiPromptData = (prompt: PromptProps): OpenAIRequest => {
  const { gosti, oGostima, ton, prisnost, textLength } = prompt
  let wordsNumMin = 20
  let wordsNumMax = 50
  if (textLength === "srednji") {
    wordsNumMin = 40
    wordsNumMax = 75
  } else if (textLength === "opsiran") {
    wordsNumMin = 60
    wordsNumMax = 95
  }

  return {
    model: "gpt-4o",
    messages: [
      {
        role: "developer",
        content: `Kreiraj tekst za pozivnicu na vjenčanje na temelju parametara: imena gostiju ${gosti}, opis gostiju ${oGostima}, razina prisnosti gostiju sa mladencima ${prisnost}, ton u kojem mladenci žele pozvati goste ${ton}.Nemoj pisati o lokaciji i vremenu vjenčanja niti spominjati mladence. Neka tekst bude između ${wordsNumMin} i ${wordsNumMax} riječi, nemoj koristiti emotikone.`,
      },
    ],
  }
}
