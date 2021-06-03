import express from "express"
import { parse } from "url"
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

app.get("/log_in", (req, res) => {
  const parsedUrl = parse(req.url)
  res.redirect(301, `/login?${parsedUrl.query}`)
})
app.get("/sign_up", (req, res) => {
  const parsedUrl = parse(req.url)
  res.redirect(301, `/signup?${parsedUrl.query}`)
})
