// Required for @artsy/react-html-parser which is included by @artsy/reaction
// TODO: Find a way to remove JSDOM from our server.
import "./lib/DOMParser"

// TODO: Publish artsy morgan as an npm module.
import logger from "artsy-morgan"
import express from "express"
import commonMiddlewareSetup from './common-middleware'

const app = express()

app.set("trust proxy", true)

app.use(logger)

// Install common middlewares
commonMiddlewareSetup(app)

// novo must be first, the current app contains a catch all route.
import novo from "./novo/index"
app.use("/", novo)

import current from "./current"
app.use("/", current)

module.exports = app
