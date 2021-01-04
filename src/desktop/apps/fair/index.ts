import express from "express"
import { redirectFairRequests } from "./redirectFairRequests"

export const app = express()

app
  // Legacy desktop routes
  .get("/:id", redirectFairRequests)
  .get("/:id/:year([0-9]{4})", redirectFairRequests)
  .get("/:id/articles", redirectFairRequests)
  .get("/:id/browse", redirectFairRequests)
  .get("/:id/browse/*", redirectFairRequests)
  .get("/:id/browse/artworks/artworks", redirectFairRequests)
  .get("/:id/browse/show/:partner_id", redirectFairRequests)
  .get("/:id/capture", redirectFairRequests)
  .get("/:id/capture/:action", redirectFairRequests)
  .get("/:id/for-you", redirectFairRequests)
  .get("/:id/overview", redirectFairRequests)
  .get("/:id/programming", redirectFairRequests)
  .get("/:id/search", redirectFairRequests)
  .get("/:id/sign_up", redirectFairRequests)
  .get("/:id/sign_up/:action", redirectFairRequests)
  // Legacy mobile routes
  .get("/:id/article/:slug", redirectFairRequests)
  .get("/:id/browse/artist/:artistId", redirectFairRequests)
  .get("/:id/browse/artists", redirectFairRequests)
  .get("/:id/browse/artworks", redirectFairRequests)
  .get("/:id/browse/booths", redirectFairRequests)
  .get("/:id/browse/booths/section", redirectFairRequests)
  .get("/:id/browse/booths/section/:section", redirectFairRequests)
  .get("/:id/browse/exhibitors", redirectFairRequests)
  .get("/:id/browse/filter", redirectFairRequests)
  .get("/:id/browse/show/:partnerId", redirectFairRequests)
  .get("/:id/feed", redirectFairRequests)
  .get("/:id/live", redirectFairRequests)
