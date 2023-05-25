import { collectionToArtistSeriesSlugMap } from "Apps/Collect/Utils/collectionToArtistSeriesSlugMap"

export function redirectCollectionToArtistSeries({ req, res }) {
  const collectionSlug: string = req.params.slug
  const seriesSlug: string = collectionToArtistSeriesSlugMap[collectionSlug]

  if (seriesSlug) {
    const artistSeriesPath = `/artist-series/${seriesSlug}`
    res.redirect(301, artistSeriesPath)
  }
}
