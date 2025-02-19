const SignoutButton = () => {
  const handleLogout = async (e: React.FormEvent) => {
    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
      })

      const result = await response.json()

      if (response.ok && result.redirect) {
        window.location.href = result.redirect
        return
      } else {
        console.log("Registration failed")
        console.log(result)
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }
  return (
    <button onClick={handleLogout} className="view-cart-btn">
      Odjava
    </button>
  )
}

export default SignoutButton
