import { collectionToArtistSeriesSlugMap } from "Apps/Collect/Utils/collectionToArtistSeriesSlugMap"
import { NextFunction } from "express"
import { ArtsyRequest, ArtsyResponse } from "Server/middleware/artsyExpress"

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
