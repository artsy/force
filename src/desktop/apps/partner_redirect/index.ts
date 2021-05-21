import express from "express"
import { partnerRedirectionMiddleware } from "./partnerRedirectionMiddleware"

export const app = express()

app
  .get("/:id", partnerRedirectionMiddleware)
  .get("/:id/overview", partnerRedirectionMiddleware)
  .get("/:id/shows", partnerRedirectionMiddleware)
  .get("/:id/works", partnerRedirectionMiddleware)
  .get("/:id/artists", partnerRedirectionMiddleware)
  .get("/:id/artist/:artistId", partnerRedirectionMiddleware)
  .get("/:id/articles", partnerRedirectionMiddleware)
  .get("/:id/contact", partnerRedirectionMiddleware)
// .get("/:id/collection", partnerRedirectionMiddleware)
// .get("/:id/shop", partnerRedirectionMiddleware)
// .get("/:id/about", partnerRedirectionMiddleware)
