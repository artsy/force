import { collectionToArtistSeriesSlugMap } from "../Utils/collectionToArtistSeriesSlugMap"

export function redirectCollectionToArtistSeries({ req, res }) {
  const collectionSlug: string = req.params.collectionSlug
  const seriesSlug: string = collectionToArtistSeriesSlugMap[collectionSlug]

  if (seriesSlug) {
    const artistSeriesPath = `/artist-series/${seriesSlug}`
    res.redirect(301, artistSeriesPath)
  }
}
