import { useEffect, useState } from "react"

interface Guest {
  id: string
  name: string
  link: string
  invited: boolean
  confirmed: boolean
}

const UserInterface = ({ id }: any) => {
  const [formDataGuest, setFormDataGuest] = useState({
    id,
    name: "",
    link: "",
    invited: false,
    confirmed: false,
  })
  const [formDataClient, setFormDataClient] = useState({
    herName: "",
    hisName: "",
    date: "",
  })
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleChangeGuest = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target
    if (type === "checkbox") {
      setFormDataGuest({ ...formDataGuest, [name]: checked })
    } else {
      setFormDataGuest({ ...formDataGuest, [name]: value })
    }
  }

  const handleChangeClient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataClient({ ...formDataClient, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch("/api/supabase/saveGuest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataGuest),
      })
      if (!response.ok) {
        setMessage("Greška pri slanju podataka")
      }
      const data = await response.json()
      setMessage(data)
    } catch (error) {
      console.error("Greška:", error)
      setMessage("Greška pri slanju podataka")
    }
    fetchData()
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await fetch("/api/supabase/getAllGuests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
      if (!response.ok) {
        setMessage("Greška pri dohvaćanju podataka")
      }
      const { data } = await response.json()
      if (Array.isArray(data)) {
        setGuests(data)
      } else {
        setGuests([])
      }
    } catch (error) {
      setMessage("Error, pokušajte ponovno kasnije.")
    }
  }

  const deleteGuest = async (id: string) => {
    try {
      const response = await fetch("/api/supabase/deleteGuest", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        setMessage("Greška pri brisanju gosta")
      }
    } catch (error) {
      setMessage("Došlo je do pogreške, pokušajte ponovno kasnije.")
    }
    fetchData()
  }

  return (
    <div>
      <div className="mb-5">
        <h2 className="mb-5 text-center">O vama</h2>
        <form onSubmit={handleSubmit}>
          <table className="container text-center">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Ime mladenke</th>
                <th className="p-2 border">Ime mladoženje</th>
                <th className="p-2 border">Datum vjenčanja</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-0 border">
                  <input
                    name="herName"
                    type="text"
                    className="form-control border-0 w-100 h-100"
                    style={{
                      boxShadow: "none",
                      outline: "none",
                      border: "none",
                    }}
                    value={formDataClient.herName}
                    onChange={(e) => handleChangeClient(e)}
                    placeholder="Ime"
                  />
                </td>
                <td className="p-0 border">
                  <input
                    name="hisName"
                    type="text"
                    className="form-control border-0 w-100 h-100"
                    style={{
                      boxShadow: "none",
                      outline: "none",
                      border: "none",
                    }}
                    value={formDataClient.hisName}
                    onChange={(e) => handleChangeClient(e)}
                    placeholder="Ime"
                  />
                </td>
                <td className="p-2 border">
                  <input
                    type="date"
                    name="date"
                    className="d-inline text-center align-middle"
                    value={formDataClient.date}
                    onChange={(e) => handleChangeClient(e)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <h2 className="mb-5 text-center">Dodaj gosta</h2>
      <form onSubmit={handleSubmit}>
        <table className="container text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Imena gostiju</th>
              <th className="p-2 border">Link pozivnice</th>
              <th className="p-2 border">Pozivnica poslana</th>
              <th className="p-2 border">Potvrdio dolazak</th>
              <th className="p-2 border">Kreiraj pozivnicu</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-0 border">
                <input
                  name="name"
                  type="text"
                  className="form-control border-0 w-100 h-100"
                  style={{ boxShadow: "none", outline: "none", border: "none" }}
                  value={formDataGuest.name}
                  onChange={(e) => handleChangeGuest(e)}
                  placeholder="Ime"
                />
              </td>
              <td className="p-0 border">
                <input
                  name="link"
                  type="link"
                  className="form-control border-0 w-100 h-100"
                  style={{ boxShadow: "none", outline: "none", border: "none" }}
                  value={formDataGuest.link}
                  onChange={(e) => handleChangeGuest(e)}
                  placeholder="Url"
                />
              </td>
              <td className="p-2 border">
                <input
                  type="checkbox"
                  name="invited"
                  className="d-inline text-center align-middle"
                  checked={formDataGuest.invited}
                  onChange={(e) => handleChangeGuest(e)}
                />
              </td>
              <td className="p-2 border">
                <input
                  name="confirmed"
                  type="checkbox"
                  className="d-inline text-center align-middle"
                  checked={formDataGuest.confirmed}
                  onChange={(e) => handleChangeGuest(e)}
                />
              </td>
              <td className="p-2 border">
                <a className="bg-primary text-white px-2 py-1 rounded" href="/">
                  <i className="fi flaticon-heart "></i>{" "}
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        {message ? <p>{message}</p> : ""}
        <button className="view-cart-btn s1" type="submit">
          {loading ? "Šaljem..." : " Dodaj gosta"}
        </button>
      </form>
      <h2 className="mb-5 text-center">Popis uzvanika</h2>
      <table className="container text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Imena gostiju</th>
            <th className="p-2 border">Link pozivnice</th>
            <th className="p-2 border">Pozivnica poslana</th>
            <th className="p-2 border">Potvrdio dolazak</th>
            <th className="p-2 border">Obriši</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(guests) &&
            guests.length > 0 &&
            guests.map((guest: Guest, i) => {
              return (
                <tr key={i}>
                  <td className="p-0 border">
                    <input
                      name="name"
                      type="text"
                      className="form-control border-0 w-100 h-100"
                      style={{
                        boxShadow: "none",
                        outline: "none",
                        border: "none",
                      }}
                      value={guest.name}
                      placeholder="Ime"
                      readOnly
                    />
                  </td>
                  <td className="p-0 border">
                    <input
                      name="link"
                      type="link"
                      className="form-control border-0 w-100 h-100"
                      style={{
                        boxShadow: "none",
                        outline: "none",
                        border: "none",
                      }}
                      value={guest.link}
                      placeholder="Url"
                      readOnly
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="checkbox"
                      name="invited"
                      className="d-inline text-center align-middle"
                      checked={guest.invited}
                      readOnly
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      name="confirmed"
                      type="checkbox"
                      className="d-inline text-center align-middle"
                      checked={guest.confirmed}
                      readOnly
                    />
                  </td>
                  <td className="p-2 border">
                    <button
                      className="bg-danger text-black px-2 py-1 rounded"
                      onClick={() => deleteGuest(guest.id)}
                    >
                      <i className="fi flaticon-heart "></i>{" "}
                    </button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default UserInterface
