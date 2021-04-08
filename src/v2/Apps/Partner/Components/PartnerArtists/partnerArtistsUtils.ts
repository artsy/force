import { PartnerArtistDetails_artist } from "v2/__generated__/PartnerArtistDetails_artist.graphql"
import { PartnerArtistList_artists } from "v2/__generated__/PartnerArtistList_artists.graphql"

export interface ArtistListColumnSizes {
  representedArtist: number
  worksAvailableBy: number
}

export function getColumnsCountForEachArtistType(
  representedArtistCount: number,
  worksAvailableByCount: number,
  columnCount: number
): ArtistListColumnSizes {
  if (representedArtistCount === 0 && worksAvailableByCount === 0) {
    return {
      representedArtist: 0,
      worksAvailableBy: 0,
    }
  }

  const artistsInColumn = Math.ceil(
    (representedArtistCount + worksAvailableByCount) / columnCount
  )
  const isRepresentedArtistSmaller =
    representedArtistCount < worksAvailableByCount

  const smallerColumnCount = Math.ceil(
    (isRepresentedArtistSmaller
      ? representedArtistCount
      : worksAvailableByCount) / artistsInColumn
  )

  return isRepresentedArtistSmaller
    ? {
        representedArtist: smallerColumnCount,
        worksAvailableBy: columnCount - smallerColumnCount,
      }
    : {
        representedArtist: columnCount - smallerColumnCount,
        worksAvailableBy: smallerColumnCount,
      }
}

export interface ArtistsGroup {
  artists: PartnerArtistList_artists
  columnSize: number
  columnName?: string
}

export function groupArtists(
  artists: PartnerArtistList_artists,
  distinguishRepresentedArtists: boolean,
  columnSize: number = 6
): Array<ArtistsGroup> {
  const filteredArtists = artists
    .filter(artist => artist.isDisplayOnPartnerProfile)
    .filter(artists => artists.representedBy || artists.counts.artworks > 0)

  if (!distinguishRepresentedArtists) {
    return [
      {
        artists: filteredArtists,
        columnSize: columnSize,
        columnName: undefined,
      },
    ]
  }

  const representedArtists = filteredArtists.filter(
    artist => artist.representedBy
  )
  const worksAvailableArtists = filteredArtists.filter(
    artist => !artist.representedBy
  )

  const columnSizes = getColumnsCountForEachArtistType(
    representedArtists.length,
    worksAvailableArtists.length,
    columnSize
  )

  return [
    {
      artists: representedArtists,
      columnSize: columnSizes.representedArtist,
      columnName: "Represented Artists",
    },
    {
      artists: worksAvailableArtists,
      columnSize: columnSizes.worksAvailableBy,
      columnName: "Works Available by",
    },
  ]
    .filter(group => group.artists.length > 0)
    .sort((a, b) => b.artists.length - a.artists.length)
}

export function getBriefArtistInfo(artist: PartnerArtistDetails_artist) {
  const { birthday, deathday, nationality } = artist

  const years = birthday
    ? deathday
      ? `${birthday}-${deathday}`
      : `b. ${birthday}`
    : undefined

  return [nationality, years].filter(item => !!item).join(", ")
}
