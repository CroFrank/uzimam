import { useState } from "react"
import NotificationBar from "../ui/NotificationBar"

const GuestsList: React.FC<GuestsListProps> = ({
  guests,
  setGuests,
  fetchDataGuests,
}) => {
  const [loadingDelete, setLoadingDelete] = useState<{
    [key: string]: boolean
  }>({})
  const [loadingSave, setLoadingSave] = useState<{
    [key: string]: boolean
  }>({})
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

  const handleChangeExistingGuest = (
    e: React.ChangeEvent<HTMLInputElement>,
    guestId: string
  ) => {
    const { name, type, value, checked } = e.target
    setGuests((prevGuests) =>
      prevGuests.map((guest) =>
        guest.id === guestId
          ? { ...guest, [name]: type === "checkbox" ? checked : value }
          : guest
      )
    )
  }

  const saveExistingGuest = async (id: string) => {
    setLoadingSave((prev) => ({ ...prev, [id]: true }))
    const editedGuest = guests.find((guest) => id === guest.id)
    try {
      const response = await fetch("/api/supabase/saveExistingGuest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedGuest),
      })
      if (!response.ok) {
        showError("Response Error")
      } else {
        fetchDataGuests()
        showSuccess("Gost izmijenjen")
      }
    } catch (error) {
      showError("Pokušajte ponovno kasnije")
    } finally {
      setLoadingSave((prev) => ({ ...prev, [id]: false }))
    }
  }

  const deleteGuest = async (id: string) => {
    setLoadingDelete((prev) => ({ ...prev, [id]: true }))
    try {
      const response = await fetch("/api/supabase/deleteGuest", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        showError("Response Error")
      } else {
        fetchDataGuests()
        showSuccess("Gost obrisan")
      }
    } catch (error) {
      showError("Pokušajte ponovno kasnije")
    } finally {
      setLoadingDelete((prev) => ({ ...prev, [id]: false }))
    }
  }
  return (
    <>
      <h2 className="mb-5 text-center">Popis uzvanika</h2>

      <table className="container text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Imena gostiju</th>
            <th className="p-2 border">Link pozivnice</th>
            <th className="p-2 border">Pozivnica poslana</th>
            <th className="p-2 border">Potvrdio dolazak</th>
            <th className="p-2 border">Spremi</th>
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
                      onChange={(e) => handleChangeExistingGuest(e, guest.id)}
                      placeholder="Ime"
                    />
                  </td>
                  <td className="p-0 border">
                    <input
                      name="url"
                      type="url"
                      className="form-control border-0 w-100 h-100"
                      style={{
                        boxShadow: "none",
                        outline: "none",
                        border: "none",
                      }}
                      value={guest.url}
                      onChange={(e) => handleChangeExistingGuest(e, guest.id)}
                      placeholder="Url"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="checkbox"
                      name="invited"
                      className="d-inline text-center align-middle"
                      checked={guest.invited}
                      onChange={(e) => handleChangeExistingGuest(e, guest.id)}
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      name="confirmed"
                      type="checkbox"
                      className="d-inline text-center align-middle"
                      checked={guest.confirmed}
                      onChange={(e) => handleChangeExistingGuest(e, guest.id)}
                    />
                  </td>
                  <td className="p-2 border">
                    <button
                      className="bg-success text-white px-2 py-1 rounded"
                      onClick={() => saveExistingGuest(guest.id)}
                    >
                      {loadingSave[guest.id] ? (
                        <img src="/assets/images/fancybox/fancybox_loading.gif" />
                      ) : (
                        <i className="fi flaticon-heart "></i>
                      )}
                    </button>
                  </td>
                  <td className="p-2 border">
                    <button
                      className="bg-danger text-black px-2 py-1 rounded"
                      onClick={() => deleteGuest(guest.id)}
                    >
                      {loadingDelete[guest.id] ? (
                        <img src="/assets/images/fancybox/fancybox_loading.gif" />
                      ) : (
                        <i className="fi flaticon-heart "></i>
                      )}
                    </button>
                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>
      {notification && (
        <NotificationBar
          msg={notification.msg}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </>
  )
}

export default GuestsList
