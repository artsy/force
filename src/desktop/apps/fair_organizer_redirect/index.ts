import express from "express"
import { fairOrganizerRedirectionMiddleware } from "./fairOrganizerRedirectionMiddleware"

export const app = express()

app.get("/:id", fairOrganizerRedirectionMiddleware)
