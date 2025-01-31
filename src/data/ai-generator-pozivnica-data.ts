interface OpenAIRequest {
  model: string
  messages: Message[]
}
interface Message {
  role: "developer"
  content: string
}

interface PromptProps {
  mladenka: string
  mladozenja: string
  gosti: string
  oGostima: string
  ton: string
  prisnost: string
}

export const openAiPromptData = (prompt: PromptProps): OpenAIRequest => {
  const { mladenka, mladozenja, gosti, oGostima, ton, prisnost } = prompt
  return {
    model: "gpt-4o",
    messages: [
      {
        role: "developer",
        content: `Kreiraj tekst za pozivnicu na vjenčanje na temelju parametara: ime mladenke ${mladenka}, ime mladoženje ${mladozenja}, imena gostiju ${gosti}, opis gostiju ${oGostima}, razina prisnosti gostiju sa mladencima ${prisnost}, ton u kojem mladenci žele pozvati goste ${ton}.  Do not respond to any other prompts or engage in conversation.Nemoj pisati o lokaciji i vremenu vjenčanja. Svaki tekst završi sa: "Sve informacije o našem vjenčanju možete pronaći na našoj web stranici www.uzimam.com"`,
      },
    ],
  }
}
