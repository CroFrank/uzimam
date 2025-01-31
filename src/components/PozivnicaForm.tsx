import { useState } from "react"

const PozivnicaForm: React.FC = () => {
  const [formData, setFormData] = useState({
    mladenka: "",
    mladozenja: "",
    gosti: "",
    oGostima: "",
    ton: "",
    prisnost: "",
  })

  const [apiResponse, setApiResponse] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/pozivnice-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Greška pri slanju podataka")
      }

      const data = await response.json()
      console.log(data)
      setApiResponse(data)
    } catch (error) {
      console.error("Greška:", error)
      setApiResponse("Došlo je do greške pri generiranju pozivnice.")
    }
    setLoading(false)
  }

  return (
    <section className="wpo-contact-pg-section section-padding">
      <div className="container">
        <div className="row">
          <div className="col col-lg-10 offset-lg-1">
            <div className="wpo-contact-title">
              <h2>Izradi pozivnicu</h2>
              <p>Besplatno isprobaj AI pozivnice</p>
            </div>
            {apiResponse && (
              <div className="pozivnica-output">
                <h4>Generirana pozivnica:</h4>
                <p>{apiResponse}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <label htmlFor="mladenka">Upišite ime mladenke:</label>
              <input
                id="mladenka"
                type="text"
                name="mladenka"
                placeholder="Ime mladenke"
                onChange={handleChange}
                required
              />
              <label htmlFor="mladenka">Upišite ime mladoženje:</label>
              <input
                id="mladozenja"
                type="text"
                name="mladozenja"
                placeholder="Ime mladoženje"
                onChange={handleChange}
                required
              />
              <label htmlFor="gosti">
                Upišite imena gostiju koje pozivate:
              </label>
              <input
                id="gosti"
                type="text"
                name="gosti"
                placeholder="npr. Ana, Luka i sin Tin"
                onChange={handleChange}
                required
              />
              <label htmlFor="oGostima">
                Upišite nešto šte vežete uz njih:
              </label>
              <input
                id="oGostima"
                type="text"
                name="oGostima"
                placeholder="Ana je profesorica i pomalo stroga, Luka voli nogomet, Tin je naučio hodati"
                onChange={handleChange}
                required
              />
              <label htmlFor="ton">Ton u kojem će biti pisana pozivnica:</label>
              <input
                id="ton"
                type="text"
                name="ton"
                placeholder="Ton pozivnice (npr. šaljiv, formalan...)"
                onChange={handleChange}
                required
              />
              <label htmlFor="prisnost">Koliko ste bliski sa gostima:</label>
              <input
                id="prisnost"
                type="text"
                name="prisnost"
                placeholder="npr. bliski prijatelji, daleka rodbina - slab kontakt"
                onChange={handleChange}
                required
              />

              <button className="theme-btn" type="submit">
                {loading ? "Generiram..." : "Generiraj pozivnicu"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default PozivnicaForm
