import { NextFunction } from "express"
import { userHasLabFeature } from "v2/Utils/user"
import { collectionToArtistSeriesSlugMap } from "v2/Apps/Collect/Utils/collectionToArtistSeriesSlugMap"

export const handleCollectionToArtistSeriesRedirect = async (
  req,
  res,
  next: NextFunction
) => {
  const user = res.locals.sd.CURRENT_USER
  const collectionSlug: string = req.params.collectionSlug

  if (userHasLabFeature(user, "Artist Series")) {
    const seriesSlug: string = collectionToArtistSeriesSlugMap[collectionSlug]
    if (seriesSlug) {
      const artistSeriesPath = `/artist-series/${seriesSlug}`
      res.redirect(301, artistSeriesPath)
      return
    }
  }

  next()
}
