import { NextFunction } from "express"
import { collectionToArtistSeriesSlugMap } from "v2/Apps/Collect/Utils/collectionToArtistSeriesSlugMap"

export const handleCollectionToArtistSeriesRedirect = async (
  req,
  res,
  next: NextFunction
) => {
  const collectionSlug: string = req.params.collectionSlug

  const seriesSlug: string = collectionToArtistSeriesSlugMap[collectionSlug]
  if (seriesSlug) {
    const artistSeriesPath = `/artist-series/${seriesSlug}`
    res.redirect(301, artistSeriesPath)
    return
  }

  next()
}
