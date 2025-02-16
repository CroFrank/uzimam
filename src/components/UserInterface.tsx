import { useEffect, useState } from "react"
import GuestsList from "../components/parts/GuestsList"
import AddGuest from "./parts/AddGuest"
import AddClient from "./parts/AddClient"
import NotificationBar from "./ui/NotificationBar"

const UserInterface = ({ id }: any) => {
  const [guests, setGuests] = useState<Guest[]>([])
  const [client, setClient] = useState<Client | null>(null)
  const [notification, setNotification] = useState<{
    msg: string
    type: "success" | "error"
  } | null>(null)

  const showError = (msg: string) => {
    setNotification({ msg, type: "error" })
  }

  useEffect(() => {
    fetchDataGuests()
    fetchDataClient()
  }, [])

  const fetchDataGuests = async () => {
    try {
      const response = await fetch("/api/supabase/getAllGuests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      })
      if (!response.ok) {
        showError("Greška pri dohvaćanju podataka")
      } else {
        const { data } = await response.json()
        if (Array.isArray(data)) {
          setGuests(data)
        } else {
          setGuests([])
          showError("Greška pri dohvaćanju podataka")
        }
      }
    } catch (error) {
      setGuests([])
      showError("Pokušajte ponovno kasnije.")
    }
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
        setClient({
          id: data.id,
          hisName: data.hisname,
          herName: data.hername,
          date: data.date,
        })
      } else {
        setClient(null)
      }
    } catch (error) {
      showError("Pokušajte ponovno kasnije.")
      setClient(null)
    }
  }

  return (
    <div>
      <AddClient
        id={id}
        client={client}
        setClient={setClient}
        fetchDataClient={fetchDataClient}
      />
      <AddGuest id={id} fetchDataGuests={fetchDataGuests} />
      <GuestsList
        guests={guests}
        setGuests={setGuests}
        fetchDataGuests={fetchDataGuests}
      />
      {notification && (
        <NotificationBar
          msg={notification.msg}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  )
}

export default UserInterface
