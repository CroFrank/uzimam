import { useEffect } from "react"

const NotificationBar: React.FC<NotificationProps> = ({
  msg,
  type,
  onClose,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 3000)

    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div
      className={` px-4 py-2 my-2 rounded-lg text-white shadow-md ${
        type === "success" ? "bg-success" : "bg-danger"
      }`}
      style={{ width: window.innerWidth >= 576 ? "25%" : "50%" }}
    >
      {msg}
    </div>
  )
}

export default NotificationBar
