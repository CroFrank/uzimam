import { useEffect } from "react"

const SignoutButton = () => {
  useEffect(() => {
    console.log("SignoutButton mounted in production")
  }, [])
  const handleLogout = async () => {
    console.log("clicked")
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
      })

      const result = await response.json()

      if (response.ok && result.redirect) {
        window.location.href = result.redirect
      } else {
        console.log("Signout failed:", result)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }
  return (
    <button onClick={() => handleLogout} className="view-cart-btn">
      Odjava
    </button>
  )
}

export default SignoutButton
