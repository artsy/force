import express from "express"
import { fairRedirectionMiddleware } from "./fairRedirectionMiddleware"

export const app = express()

app
  // Legacy desktop routes
  .get("/:id", fairRedirectionMiddleware)
  .get("/:id/:year([0-9]{4})", fairRedirectionMiddleware)
  .get("/:id/articles", fairRedirectionMiddleware)
  .get("/:id/browse", fairRedirectionMiddleware)
  .get("/:id/browse/*", fairRedirectionMiddleware)
  .get("/:id/browse/artworks/artworks", fairRedirectionMiddleware)
  .get("/:id/browse/show/:partner_id", fairRedirectionMiddleware)
  .get("/:id/capture", fairRedirectionMiddleware)
  .get("/:id/capture/:action", fairRedirectionMiddleware)
  .get("/:id/for-you", fairRedirectionMiddleware)
  .get("/:id/overview", fairRedirectionMiddleware)
  .get("/:id/programming", fairRedirectionMiddleware)
  .get("/:id/search", fairRedirectionMiddleware)
  .get("/:id/sign_up", fairRedirectionMiddleware)
  .get("/:id/sign_up/:action", fairRedirectionMiddleware)
  // Legacy mobile routes
  .get("/:id/article/:slug", fairRedirectionMiddleware)
  .get("/:id/browse/artist/:artistId", fairRedirectionMiddleware)
  .get("/:id/browse/artists", fairRedirectionMiddleware)
  .get("/:id/browse/artworks", fairRedirectionMiddleware)
  .get("/:id/browse/booths", fairRedirectionMiddleware)
  .get("/:id/browse/booths/section", fairRedirectionMiddleware)
  .get("/:id/browse/booths/section/:section", fairRedirectionMiddleware)
  .get("/:id/browse/exhibitors", fairRedirectionMiddleware)
  .get("/:id/browse/filter", fairRedirectionMiddleware)
  .get("/:id/browse/show/:partnerId", fairRedirectionMiddleware)
  .get("/:id/feed", fairRedirectionMiddleware)
  .get("/:id/live", fairRedirectionMiddleware)
