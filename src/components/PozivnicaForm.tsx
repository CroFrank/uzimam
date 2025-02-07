import { useEffect, useState } from "react"

const PozivnicaForm: React.FC = () => {
  const [formData, setFormData] = useState({
    mladenka: "",
    mladozenja: "",
    gosti: "",
    oGostima: "",
    ton: "",
    prisnost: "",
    date: "",
    textLength: "srednji",
  })

  const [link, setLink] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [randomUrl, setRandomUrl] = useState<string>("")
  const [apiResponse, setApiResponse] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      setApiResponse(data)
      setRandomUrl(Math.random().toString(36).slice(2, 12))
    } catch (error) {
      console.error("Greška:", error)
      setApiResponse("Došlo je do greške pri generiranju pozivnice.")
    }
    setLoading(false)
  }

  useEffect(() => {
    if (apiResponse && randomUrl) {
      setLink(
        `uzimam.com/ai-pozivnice-za-vjencanje/${randomUrl}?mladenka=${
          formData.mladenka
        }&mladozenja=${formData.mladozenja}&date=${
          formData.date
        }&apiResponse=${encodeURIComponent(apiResponse)}`
      )
    }
  }, [apiResponse])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  return (
    <div className="wpo-checkout-area section-padding" id="forma">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="caupon-wrap s2">
              <div className="wpo-section-title">
                <h2 className="poort-text poort-in-right">Detalji pozivnice</h2>
              </div>
              <div className="billing-adress" id="open2">
                <div className="contact-form form-style">
                  <div className="row">
                    <div className="col-lg-6 col-md-12 col-12">
                      <label htmlFor="mladenka">Upišite ime mladenke:</label>
                      <input
                        id="mladenka"
                        type="text"
                        name="mladenka"
                        placeholder="Ime mladenke"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-lg-6 col-md-12 col-12">
                      <label htmlFor="mladozenja">
                        Upišite ime mladoženje:
                      </label>
                      <input
                        id="mladozenja"
                        type="text"
                        name="mladozenja"
                        placeholder="Ime mladoženje"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-lg-6 col-md-12 col-12">
                      <label htmlFor="date">Datum vjenčanja:</label>
                      <input
                        id="date"
                        type="date"
                        name="date"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
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
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
                      <label htmlFor="prisnost">
                        Koliko ste bliski sa gostima:
                      </label>
                      <input
                        id="prisnost"
                        type="text"
                        name="prisnost"
                        placeholder="npr. bliski prijatelji, daleka rodbina - slab kontakt"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-lg-12 col-md-12 col-12">
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
                    </div>
                    <div className="col-lg-6 col-md-12 col-12">
                      <label htmlFor="ton">
                        Ton u kojem će biti pisana pozivnica:
                      </label>
                      <input
                        id="ton"
                        type="text"
                        name="ton"
                        placeholder="Ton pozivnice (npr. šaljiv, formalan...)"
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-lg-6 col-md-12 col-12">
                      <label htmlFor="textLength">
                        Odaberite duljinu teksta:
                      </label>
                      <select
                        id="textLength"
                        name="textLength"
                        onChange={handleChange}
                      >
                        <option value="kratak">Kratak tekst</option>
                        <option value="srednji">Srednji</option>
                        <option value="opsiran">Opširan</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button className="theme-btn" type="submit">
            {loading ? "Generiram..." : "Generiraj pozivnicu"}
          </button>
        </form>
        {loading ? (
          <>
            <section className="wpo-blog-pg-section section-padding">
              <div className="container">
                Ovo može potrajati nekoliko trenutaka...
              </div>
            </section>
            <div className="container">
              <img
                src="/assets/images/fancybox/fancybox_loading@2x.gif"
                alt=""
              />
            </div>
          </>
        ) : apiResponse ? (
          <section className="wpo-blog-pg-section section-padding">
            <div className="container">
              <div className="row">
                <div className="col col-lg-10 offset-lg-1">
                  <div className="wpo-blog-content">
                    <div className="post format-standard-image">
                      <div className="entry-details">
                        <h3>Pozivnica je uspješno generirana</h3>
                        <p>
                          ovo je{" "}
                          <a
                            href={`/ai-pozivnice-za-vjencanje/${randomUrl}?mladenka=${
                              formData.mladenka
                            }&mladozenja=${formData.mladozenja}&date=${
                              formData.date
                            }&apiResponse=${encodeURIComponent(apiResponse)}`}
                          >
                            link
                          </a>{" "}
                          koji vodi na vašu pozivnicu
                        </p>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <button onClick={handleCopy} className="theme-btn-s4">
                          {copied ? "Kopirano!" : "Kopiraj Link"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
      </div>
    </div>
  )
}

export default PozivnicaForm
