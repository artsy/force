import express from "express"
import { identityVerification } from "desktop/apps/identity_verification/routes"

export const app = express()

app.get("/identity-verification/:id", identityVerification)
