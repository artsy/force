import express from "express"
import {
  forgotPassword,
  login,
  signup,
  redirectLoggedInHome,
  resetPassword,
} from "./routes"

export const app = express()

app.set("view engine", "jade")
app.set("views", `${__dirname}/templates`)

app.get("/login", redirectLoggedInHome, login)
app.get("/signup", redirectLoggedInHome, signup)
app.get("/forgot", forgotPassword)
app.get("/reset_password", resetPassword)

app.get("/log_in", (_req, res) => {
  res.redirect(301, "/login")
})
app.get("/sign_up", (_req, res) => {
  res.redirect(301, "/signup")
})
