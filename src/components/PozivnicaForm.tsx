import { useEffect, useState } from "react"
import NotificationBar from "./ui/NotificationBar"

const PozivnicaForm: React.FC<PozivnicaFormProps> = ({ id }) => {
  const [formData, setFormData] = useState({
    mladenka: "",
    mladozenja: "",
    gosti: "",
    oGostima: "",
    ton: "",
    prisnost: "",
    date: "",
    textLength: "srednji",
    designe: "",
    message: "",
  })

  const [link, setLink] = useState<string>("")
  const [copied, setCopied] = useState(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingFinal, setLoadingFinal] = useState<boolean>(false)
  const [notification, setNotification] = useState<{
    msg: string
    type: "success" | "error"
  } | null>(null)

  const showSuccess = (msg: string) => {
    setNotification({ msg, type: "success" })
  }

  const showError = (msg: string) => {
    setNotification({ msg, type: "error" })
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    if (!id) {
      e.preventDefault()

      showError("Morate biti prijavljeni")
      return
    }
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch("/api/pozivnice-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ formData, id }),
      })
      if (!response.ok) {
        showError("Response Error")
      } else {
        const data = await response.json()
        setFormData({ ...formData, message: data })
        showSuccess("Tekst generiran")
      }
    } catch (error) {
      showError("Pokušajte ponovno kasnije")
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitFinal = async (e: React.FormEvent) => {
    if (!id) {
      showError("Morate biti prijavljeni")
      return
    }
    e.preventDefault()
    setLoadingFinal(true)
    if (
      formData.message.length > 1 &&
      formData.mladenka.length > 1 &&
      formData.mladozenja.length > 1 &&
      formData.date.length > 1 &&
      formData.designe.length > 1
    ) {
      const longLink = `${formData.designe}?mladenka=${formData.mladenka}&mladozenja=${formData.mladozenja}&date=${formData.date}&apiResponse=${formData.message}`
      try {
        const response = await fetch("/api/supabase/shorten", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ longLink, id }),
        })
        if (!response.ok) {
          showError("Response Error")
        } else {
          const data = await response.json()
          setLink(data.data)
        }
      } catch (error) {
        showError("Pokušajte ponovno kasnije")
      } finally {
        showSuccess("Pozivnica generirana")
      }
    } else {
      showError("Nisu popunjena sva polja")
    }
    setLoadingFinal(false)
  }

  const fetchDataClient = async () => {
    try {
      const response = await fetch("/api/supabase/getClient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      const { success, data } = await response.json()
      if (success && data) {
        setFormData({
          ...formData,
          mladenka: data.hername,
          mladozenja: data.hisname,
          date: data.date,
        })
      } else {
        setFormData({
          ...formData,
        })
      }
    } catch (error) {
      setFormData({
        ...formData,
      })
    }
  }

  useEffect(() => {
    fetchDataClient()
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link)
      setCopied(true)
    } catch (err) {
      showError("Error")
    }
  }

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit} className="p-4 shadow-sm bg-white rounded">
        <h2 className="text-center mb-5">Detalji pozivnice</h2>

        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="mladenka" className="form-label">
              Ime mladenke:
            </label>
            <input
              id="mladenka"
              type="text"
              name="mladenka"
              placeholder="ime"
              className="form-control"
              value={formData.mladenka}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="mladozenja" className="form-label">
              Ime mladoženje:
            </label>
            <input
              id="mladozenja"
              type="text"
              name="mladozenja"
              placeholder="ime"
              className="form-control"
              value={formData.mladozenja}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="date" className="form-label">
              Datum vjenčanja:
            </label>
            <input
              id="date"
              type="date"
              name="date"
              className="form-control"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label htmlFor="gosti" className="form-label">
              Imena gostiju:
            </label>
            <input
              id="gosti"
              type="text"
              name="gosti"
              className="form-control"
              placeholder="npr. Ana i Luka"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label htmlFor="prisnost" className="form-label">
              Koliko ste bliski s gostima:
            </label>
            <input
              id="prisnost"
              type="text"
              name="prisnost"
              className="form-control"
              placeholder="npr. bliski prijatelji, samo poznanici..."
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-12">
            <label htmlFor="oGostima" className="form-label">
              Nešto što vežete uz goste:
            </label>
            <input
              id="oGostima"
              type="text"
              name="oGostima"
              className="form-control"
              placeholder="Ana je teta u vrtiću, Luka voli nogomet"
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="ton" className="form-label">
              Ton pozivnice:
            </label>
            <input
              id="ton"
              type="text"
              name="ton"
              className="form-control"
              placeholder="npr. šaljiv, formalan..."
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="textLength" className="form-label">
              Duljina teksta:
            </label>
            <select
              id="textLength"
              name="textLength"
              className="form-select"
              value={formData.textLength}
              onChange={handleChange}
            >
              <option value="kratak">Kratak tekst</option>
              <option value="srednji">Srednji</option>
              <option value="opsiran">Opširan</option>
            </select>
          </div>
        </div>

        <button type="submit" className="theme-btn mt-4">
          {loading ? "Generiram..." : " Generiraj tekst"}
        </button>
      </form>

      <div className="my-5">
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Uredite tekst pozivnice:
          </label>
          <textarea
            id="message"
            name="message"
            className="form-control"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Odaberite dizajn pozivnice:</label>
          <div className="d-flex gap-3">
            {["bojana", "belami"].map((option, index) => (
              <div key={index} className="form-check">
                <input
                  type="radio"
                  id={option}
                  name="designe"
                  value={option}
                  onChange={handleChange}
                  className="form-check-input"
                  required
                />
                <label htmlFor={option} className="form-check-label">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
        <button onClick={handleSubmitFinal} className="theme-btn mt-4">
          {loadingFinal ? "Generiram..." : " Generiraj pozivnicu"}
        </button>
      </div>

      {notification && (
        <NotificationBar
          msg={notification.msg}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
      {link && (
        <>
          <div className="my-5">
            <p>
              Link koji vodi na vašu pozivnicu: <a href={link}>{link}</a>
            </p>
          </div>
          <button className="theme-btn" onClick={handleCopy}>
            {copied ? "Kopirano!" : "Kopiraj link"}
          </button>
        </>
      )}
    </div>
  )
}

export default PozivnicaForm
