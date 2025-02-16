import { useState } from "react"
import NotificationBar from "../ui/NotificationBar"

const AddGuest: React.FC<AddClientProps> = ({
  id,
  client,
  setClient,
  fetchDataClient,
}) => {
  const [formDataClient, setFormDataClient] = useState({
    id,
    herName: "",
    hisName: "",
    date: "",
  })
  const [loadingSave, setLoadingSave] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
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
    setFormDataClient({ ...formDataClient, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoadingSave(true)
    try {
      const response = await fetch("/api/supabase/saveClient", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataClient),
      })
      if (!response.ok) {
        showError("Response Error")
      } else {
        showSuccess("Podaci spremljeni")
      }
    } catch (error) {
      showError("Pokušajte ponovno kasnije")
    } finally {
      fetchDataClient()
      setLoadingSave(false)
    }
  }

  const deleteClient = async (id: string) => {
    setLoadingDelete(true)
    try {
      const response = await fetch("/api/supabase/deleteClient", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        showError("Response Error")
      } else {
        fetchDataClient()
        showSuccess("Podaci izbrisani")
      }
    } catch (error) {
      showError("Pokušajte ponovno kasnije")
    } finally {
      setClient(null)
      setLoadingDelete(false)
      setFormDataClient({
        id,
        herName: "",
        hisName: "",
        date: "",
      })
    }
  }
  return (
    <div className="mb-5">
      <h2 className="mb-5 text-center">O vama</h2>
      <form onSubmit={handleSubmit}>
        <table className="container text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Ime mladenke</th>
              <th className="p-2 border">Ime mladoženje</th>
              <th className="p-2 border">Datum vjenčanja</th>
              <th className="p-2 border">Spremi</th>
              <th className="p-2 border">Obriši</th>
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
                  value={client ? client.herName : formDataClient.herName}
                  onChange={(e) => handleChange(e)}
                  placeholder="Ime"
                  required
                  readOnly={client ? true : false}
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
                  value={client ? client.hisName : formDataClient.hisName}
                  onChange={(e) => handleChange(e)}
                  placeholder="Ime"
                  required
                  readOnly={client ? true : false}
                />
              </td>
              <td className="p-2 border">
                <input
                  type="date"
                  name="date"
                  className="d-inline text-center align-middle"
                  value={client ? client.date : formDataClient.date}
                  onChange={(e) => handleChange(e)}
                  required
                  readOnly={client ? true : false}
                />
              </td>
              <td className="p-2 border">
                <button
                  className="bg-success text-white px-2 py-1 rounded"
                  type="submit"
                >
                  {loadingSave ? (
                    <img src="/assets/images/fancybox/fancybox_loading.gif" />
                  ) : (
                    <i className="fi flaticon-heart "></i>
                  )}
                </button>
              </td>
              <td className="p-2 border">
                <button
                  className="bg-danger text-black px-2 py-1 rounded"
                  type="button"
                  onClick={() => deleteClient(client!.id)}
                >
                  {loadingDelete ? (
                    <img src="/assets/images/fancybox/fancybox_loading.gif" />
                  ) : (
                    <i className="fi flaticon-heart "></i>
                  )}
                </button>
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
      </form>
    </div>
  )
}

export default AddGuest
