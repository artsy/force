import { PartnerArtistList_artists$data } from "v2/__generated__/PartnerArtistList_artists.graphql"

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
  artists: PartnerArtistList_artists$data
  columnSize: number
  columnName?: string
}

export function groupArtists(
  artists: PartnerArtistList_artists$data,
  distinguishRepresentedArtists: boolean,
  columnSize: number = 6
): Array<ArtistsGroup> {
  if (!distinguishRepresentedArtists) {
    return [
      {
        artists: artists,
        columnSize: columnSize,
        columnName: undefined,
      },
    ]
  }

  const representedArtists = artists.filter(artist => artist.representedBy)
  const worksAvailableArtists = artists.filter(artist => !artist.representedBy)

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
