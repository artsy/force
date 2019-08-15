import * as routes from "./routes"
import express from "express"

export const app = express()

app.set("view engine", "jade")
app.set("views", `${__dirname}/templates`)

app.get("/article/:slug/amp", routes.amp)
app.get("/article/:slug", routes.index)
app.get("/series/:slug", routes.index)
app.get("/series/:seriesSlug/:slug", routes.index)
app.get("/video/:slug", routes.index)
app.get("/news/:slug/amp", routes.amp)
app.get("/news/:slug", routes.index)
app.get("/post/:id", routes.redirectPost)
app.get("/:id/posts", routes.redirectPost)

// Vanguard 2019 Custom landing page
app.get("/artsy-vanguard-2019/:slug", routes.index)
app.get("/artsy-vanguard-2019", routes.index)
