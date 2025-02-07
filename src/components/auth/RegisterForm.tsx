import { useState } from "react"

const RegisterForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [passwordsMatch, setPasswordsMatch] = useState(true)
  const [isStrongPassword, setIsStrongPassword] = useState(false)
  const [dataFromServer, setDataFromServer] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const strong = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  const sanitizeInput = (input: string) => {
    return input.replace(/[<>]/g, "")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: sanitizeInput(value) }))
    if (name === "confirmPassword") {
      setPasswordsMatch(formData.password === value)
    } else if (name === "password") {
      setPasswordsMatch(value === formData.confirmPassword)
      setIsStrongPassword(strong.test(value))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false)
      setIsSubmitting(false)
      setFormData({ name: "", email: "", password: "", confirmPassword: "" })
      return
    } else if (!isStrongPassword) {
      setIsSubmitting(false)
      setFormData({ name: "", email: "", password: "", confirmPassword: "" })
      return
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      setDataFromServer(result)
      if (response.ok && result.redirect) {
        window.location.href = result.redirect
        return
      } else {
        setDataFromServer(result)
        console.log("Registration failed")
        console.log(result)
      }
    } catch (error) {
      setDataFromServer("Ups, negdje je zapelo, pokušajte ponovno kasnije.")
      console.error("Error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="wpo-login-area">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <form className="wpo-accountWrapper" onSubmit={handleSubmit}>
              <div className="wpo-accountInfo">
                <div className="wpo-accountInfoHeader">
                  <a href="#">
                    <img src="assets/images/logo/logo-bijeli.svg" alt="" />
                  </a>
                  <a className="wpo-accountBtn" href="/signin">
                    <span className="">Prijava</span>
                  </a>
                </div>
                <div className="image">
                  <img src="assets/images/login.svg" alt="" />
                </div>
                <div className="back-home">
                  <a className="wpo-accountBtn" href="/">
                    <span className="">Naslovnica</span>
                  </a>
                </div>
              </div>
              <div className="wpo-accountForm form-style">
                <div className="fromTitle">
                  <h2>Registracija</h2>
                  <p>Registrirajte se za puni pristup</p>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-12">
                    <label htmlFor="name">Ime i Prezime</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Vaše ime i prezime"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-12">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Vaš email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-12">
                    <div className="form-group">
                      <label htmlFor="password">Password</label>
                      <input
                        id="password"
                        className="pwd2"
                        type="password"
                        placeholder="Vaš password..."
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                      {isStrongPassword ? (
                        ""
                      ) : (
                        <p
                          style={{
                            color: "red",
                            fontSize: "14px",
                            marginTop: "5px",
                          }}
                        >
                          minimalno 8 znakova od kojih barem jedan broj, veliko
                          slovo i poseban znak '!?%...'{" "}
                        </p>
                      )}
                      <span className="input-group-btn">
                        <button
                          className="btn btn-default reveal3"
                          type="button"
                        >
                          <i className="fa fa-eye"></i>
                        </button>
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12">
                    <div className="form-group">
                      <label htmlFor="confirmPassword">
                        Potvrdite Password
                      </label>
                      <input
                        id="confirmPassword"
                        className="pwd3"
                        type="password"
                        placeholder="Vaš password.."
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                      {dataFromServer}
                      {!passwordsMatch && (
                        <p
                          style={{
                            color: "red",
                            fontSize: "14px",
                            marginTop: "5px",
                          }}
                        >
                          Lozinke se ne podudaraju!
                        </p>
                      )}
                      <span className="input-group-btn">
                        <button
                          className="btn btn-default reveal2"
                          type="button"
                        >
                          <i className="fa fa-eye"></i>
                        </button>
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12">
                    <button type="submit" className="wpo-accountBtn">
                      {isSubmitting ? "Šaljem..." : "Registriraj se"}
                    </button>
                  </div>
                </div>
                <br />
                <p className="subText">
                  Već imaš napravljen račun? <a href="/signin">Prijavi se</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterForm
