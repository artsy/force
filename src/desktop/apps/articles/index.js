import express from "express"
import * as routes from "./routes"
import { crop, resize } from "desktop/components/resizer/index.coffee"
import { toSentence } from "underscore.string"
// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"

export const app = express()

app.set("view engine", "jade")
app.set("views", `${__dirname}/templates`)
app.locals.resize = resize
app.locals.crop = crop
app.locals.toSentence = toSentence

app.get("/news", routes.news)
app.get("/venice-biennale-2015", routes.section)
