import { useState } from "react"
import NotificationBar from "../ui/NotificationBar"

const AddGuest: React.FC<AddGuestProps> = ({ id, fetchDataGuests }) => {
  const [formDataGuest, setFormDataGuest] = useState({
    id,
    name: "",
    url: "",
    invited: false,
    confirmed: false,
  })
  const [loading, setLoading] = useState(false)
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, value, checked } = e.target
    if (type === "checkbox") {
      setFormDataGuest({ ...formDataGuest, [name]: checked })
    } else {
      setFormDataGuest({ ...formDataGuest, [name]: value })
    }
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
        showError("Response Error")
      } else {
        fetchDataGuests()
        showSuccess("Gost dodan")
      }
    } catch (error) {
      showError("Pokušajte ponovno kasnije")
    } finally {
      setLoading(false)
      setFormDataGuest({
        id,
        name: "",
        url: "",
        invited: false,
        confirmed: false,
      })
    }
  }
  return (
    <>
      <h2 className="mb-5 text-center">Dodaj gosta</h2>
      <form onSubmit={handleSubmit}>
        <table className="container text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Imena gostiju</th>
              <th className="p-2 border">Link pozivnice</th>
              <th className="p-2 border">Pozivnica poslana</th>
              <th className="p-2 border">Potvrdio dolazak</th>
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
                  onChange={(e) => handleChange(e)}
                  placeholder="Ime"
                  required
                />
              </td>
              <td className="p-0 border">
                <input
                  name="url"
                  type="text"
                  className="form-control border-0 w-100 h-100"
                  style={{ boxShadow: "none", outline: "none", border: "none" }}
                  value={formDataGuest.url}
                  onChange={(e) => handleChange(e)}
                  placeholder="Url"
                />
              </td>
              <td className="p-2 border">
                <input
                  type="checkbox"
                  name="invited"
                  className="d-inline text-center align-middle"
                  checked={formDataGuest.invited}
                  onChange={(e) => handleChange(e)}
                />
              </td>
              <td className="p-2 border">
                <input
                  name="confirmed"
                  type="checkbox"
                  className="d-inline text-center align-middle"
                  checked={formDataGuest.confirmed}
                  onChange={(e) => handleChange(e)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        {notification && (
          <NotificationBar
            msg={notification.msg}
            type={notification.type}
            onClose={() => setNotification(null)}
          />
        )}
        <button className="view-cart-btn s1" type="submit">
          {loading ? "Šaljem..." : " Dodaj gosta"}
        </button>
      </form>
    </>
  )
}
export default AddGuest
