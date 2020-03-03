import express from "express"
import { skipIfClientSideRoutingEnabled } from "desktop/components/split_test/skipIfClientSideRoutingEnabled"
import { identityVerification } from "desktop/apps/identity_verification/routes"

export const app = express()

app.get(
  "/identity-verification/:id",
  skipIfClientSideRoutingEnabled,
  identityVerification
)
