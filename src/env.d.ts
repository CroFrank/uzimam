/// <reference path="../.astro/types.d.ts" />
declare namespace App {
  interface Locals {
    name: string | null
    email: string | null
    id: string | null
  }
}

interface Guest {
  id: string
  name: string
  url: string
  invited: boolean
  confirmed: boolean
}

interface GuestsListProps {
  guests: Guest[]
  setGuests: React.Dispatch<React.SetStateAction<Guest[]>>
  fetchDataGuests: () => Promise<void>
}

interface NotificationProps {
  msg: string
  type: "success" | "error"
  onClose: () => void
}

interface AddGuestProps {
  id: string
  fetchDataGuests: () => Promise<void>
}

interface Client {
  id: string
  herName: string
  hisName: string
  date: string
}
interface AddClientProps {
  id: string
  client: Client | null
  setClient: React.Dispatch<React.SetStateAction<Client | null>>
  fetchDataClient: () => Promise<void>
}

interface PozivnicaFormProps {
  id: string | null
}
