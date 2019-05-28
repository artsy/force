import express from "express"
import { index, resetPassword, redirectLoggedInHome } from "./routes"

export const app = express()

app.set("view engine", "jade")
app.set("views", `${__dirname}/templates`)

app.get("/login", index)
app.get("/log_in", redirectLoggedInHome, index)
app.get("/signup", index)
app.get("/sign_up", redirectLoggedInHome, index)
app.get("/forgot", index)
app.get("/reset_password", resetPassword)
