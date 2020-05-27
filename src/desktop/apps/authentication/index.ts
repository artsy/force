import express from "express"
import { index, redirectLoggedInHome, resetPassword } from "./routes"

export const app = express()

app.set("view engine", "jade")
app.set("views", `${__dirname}/templates`)

app.get("/login", redirectLoggedInHome, index)
app.get("/log_in", redirectLoggedInHome, index)
app.get("/signup", redirectLoggedInHome, index)
app.get("/sign_up", redirectLoggedInHome, index)
app.get("/forgot", index)
app.get("/reset_password", resetPassword)
