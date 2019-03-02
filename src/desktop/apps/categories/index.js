import express from "express"
import * as routes from "./routes"

export const app = express()

app.set("view engine", "jade")
app.set("views", `${__dirname}/components`)

app.get("/categories", routes.index)
