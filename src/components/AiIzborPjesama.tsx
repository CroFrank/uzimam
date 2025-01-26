import { useState } from "react"

const AiIzborPjesama: React.FC = () => {
  const [prompt, setPrompt] = useState<string>("")
  const [apiResponse, setApiResponse] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPrompt(e.target.value)
  }

  const handleButtonClick = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/songs-creator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })

      if (!response.ok) {
        throw new Error("HTTP error: status .......")
      }

      const sendResponseFromEndPoint = await response.json()

      setApiResponse(sendResponseFromEndPoint)
    } catch (error) {
      console.error("Error fetching data:", error)
    }
    setLoading(false)
  }

  return (
    <section className="wpo-blog-pg-section section-padding">
      <div className="container">
        <div className="row">
          <div className="col col-lg-10 offset-lg-1">
            <div className="wpo-blog-content">
              <div className="post format-standard-image">
                <div className="entry-details">
                  <h3>Stvaranje liste pjesama</h3>
                  <p>
                    U polje ispod upišite nekoliko pjesama po vašem izboru, a
                    umjetna inteligencija će pronaći još pjesama u stilu koji
                    volite. Što više pjesama ili izvođača upišete, preciznije
                    rezultate ćete dobiti.
                  </p>
                  <textarea
                    autoComplete="true"
                    className="form-control"
                    name="pjesmeInput"
                    id="pjesmeInput"
                    placeholder="Oliver Dragojević - Cesarica, Željko Bebek - Laku noć svirači ... "
                    required
                    minLength={2}
                    maxLength={450}
                    value={prompt}
                    onChange={handleInputChange}
                  />
                  <br />
                  <button
                    className="theme-btn"
                    type="submit"
                    id="submitButton"
                    onClick={handleButtonClick}
                  >
                    {loading ? "Generiram..." : "Generiraj"}{" "}
                  </button>
                </div>
              </div>
            </div>
            <div>
              <ul id="returnFromApi" className="container">
                {loading
                  ? "Ovo može potrajati nekoliko trenutaka..."
                  : apiResponse.map((song: string) => {
                      if (song === null || undefined) {
                        return (
                          <li>
                            Postignut je dnevni limit, pokušajte ponovno
                            kasnije.
                          </li>
                        )
                      }
                      const httpIndex = song.indexOf("http")
                      if (httpIndex !== -1) {
                        const songText = song.substring(0, httpIndex).trim()
                        const songLink = song.substring(httpIndex).trim()

                        return (
                          <li>
                            <a href={songLink} target="_blank">
                              {songText}
                            </a>
                          </li>
                        )
                      } else {
                        return <li>{song}</li>
                      }
                    })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AiIzborPjesama
