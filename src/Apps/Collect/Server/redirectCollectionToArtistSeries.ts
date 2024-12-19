import { collectionToArtistSeriesSlugMap } from "Apps/Collect/Utils/collectionToArtistSeriesSlugMap"
import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"
import type { NextFunction } from "express"

export function redirectCollectionToArtistSeries(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) {
  const collectionSlug: string = req.params.slug
  const seriesSlug: string = collectionToArtistSeriesSlugMap[collectionSlug]

  if (seriesSlug) {
    const artistSeriesPath = `/artist-series/${seriesSlug}`
    res.redirect(301, artistSeriesPath)
  } else {
    next()
  }
}
