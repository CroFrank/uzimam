import { useState } from "react"

const SigninForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [dataFromServer, setDataFromServer] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const result = await response.json()

      setDataFromServer(result)
      console.log(dataFromServer)
      if (response.ok && result.redirect) {
        window.location.href = result.redirect
        return
      } else {
        setDataFromServer(result)
        console.log("Registration failed")
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
                    <img src="/assets/images/logo/logo-bijeli.svg" alt="" />
                  </a>
                  <a className="wpo-accountBtn" href="/register">
                    <span className="">Izradi račun</span>
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
                  <h2>Prijava</h2>
                  <p>Prijavite se na vaš račun</p>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-12">
                    <label>Email</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="demo@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-12">
                    <div className="form-group">
                      <label>Password</label>
                      <input
                        className="pwd6"
                        type="password"
                        placeholder=""
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        name="pass"
                      />
                      <span className="input-group-btn">
                        <button
                          className="btn btn-default reveal6"
                          type="button"
                        >
                          <i className="fa fa-eye"></i>
                        </button>
                      </span>
                    </div>
                  </div>
                  {dataFromServer && (
                    <p
                      style={{
                        color: "red",
                        fontSize: "14px",
                        marginTop: "5px",
                      }}
                    >
                      {dataFromServer}
                    </p>
                  )}
                  <div className="col-lg-12 col-md-12 col-12">
                    <div className="check-box-wrap">
                      {/* <div className="input-box">
                        <input
                          type="checkbox"
                          id="fruit4"
                          name="fruit-4"
                          value="Strawberry"
                          checked={rememberMe}
                          onChange={() => setRememberMe(!rememberMe)}
                        />
                        <label htmlFor="fruit4">Zapamti prijavu</label>
                      </div> */}
                      <div className="forget-btn">
                        <a href="/obnova-lozinke">Zaboravili ste loziknu?</a>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-12 col-md-12 col-12">
                    <button type="submit" className="wpo-accountBtn">
                      {isSubmitting ? "Šaljem..." : "Prijava"}
                    </button>
                  </div>
                </div>

                <br />
                <p className="subText">
                  Nemate račun? <a href="/register">Stvorite račun besplatno</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SigninForm
