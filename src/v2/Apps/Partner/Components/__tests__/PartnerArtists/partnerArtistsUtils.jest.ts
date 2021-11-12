import { flatten } from "lodash"
import { PartnerArtistList_artists } from "v2/__generated__/PartnerArtistList_artists.graphql"
import {
  ArtistListColumnSizes,
  ArtistsGroup,
  getColumnsCountForEachArtistType,
  groupArtists,
} from "../../PartnerArtists"

describe("partnerArtistsUtils", () => {
  it.each([
    [10, 10, 6, { representedArtist: 3, worksAvailableBy: 3 }],
    [0, 10, 6, { representedArtist: 0, worksAvailableBy: 6 }],
    [10, 0, 6, { representedArtist: 6, worksAvailableBy: 0 }],
    [0, 0, 6, { representedArtist: 0, worksAvailableBy: 0 }],
    [100, 10, 6, { representedArtist: 5, worksAvailableBy: 1 }],
    [60, 30, 6, { representedArtist: 4, worksAvailableBy: 2 }],
    [60, 30, 6, { representedArtist: 4, worksAvailableBy: 2 }],
    [53, 9, 6, { representedArtist: 5, worksAvailableBy: 1 }],
  ])(
    "getColumnsCountForEachArtistType returns correct value. representedArtist: %d, worksAvailableBy: %d, columnCount: %d",
    (
      representedArtistCount: number,
      worksAvailableByCount: number,
      columnCount: number,
      result: ArtistListColumnSizes
    ) => {
      expect(
        getColumnsCountForEachArtistType(
          representedArtistCount,
          worksAvailableByCount,
          columnCount
        )
      ).toEqual(result)
    }
  )

  it.each([
    [
      "With the correct number of columns(3:3)",
      generateArtistList(),
      true,
      generateArtistGroup(),
    ],
    [
      "With the correct number of columns(5:1)",
      generateArtistList(50, 10),
      true,
      generateArtistGroup(50, 10, 5, 1),
    ],
    [
      "Without separating into two columns",
      generateArtistList(50, 10),
      false,
      [
        {
          artists: [...Array(60)],
          columnSize: 6,
          columnName: undefined,
        },
      ],
    ],
    [
      "Without artists",
      generateArtistList(0, 0),
      false,
      [
        {
          artists: [],
          columnSize: 6,
          columnName: undefined,
        },
      ],
    ],
  ])(
    "groupArtists returns correct value. %s",
    (
      name: string,
      artists: PartnerArtistList_artists,
      distinguishRepresentedArtists: boolean,
      result: Array<ArtistsGroup>
    ) => {
      const groups = groupArtists(artists, distinguishRepresentedArtists)

      expect(groups.length).toEqual(result.length)

      groups.forEach((group, i) => {
        expect(group.artists.length).toEqual(result[i].artists.length)
        expect(group.columnSize).toEqual(result[i].columnSize)
        expect(group.columnName).toEqual(result[i].columnName)
      })
    }
  )
})

function generateArtistList(
  representedByCount = 10,
  worksAvailableArtistCount = 10
): PartnerArtistList_artists {
  return flatten([
    [...Array(representedByCount)].map(() => generateArtistItem()),
    [...Array(worksAvailableArtistCount)].map(() => generateArtistItem(false)),
  ])
}

function generateArtistItem(
  representedBy = true
): PartnerArtistList_artists[0] {
  return {
    counts: {
      artworks: 3,
    },
    representedBy: representedBy,
    node: {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      internalID: null,
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      " $fragmentRefs": null,
    },
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    " $refType": null,
  }
}

function generateArtistGroup(
  representedArtistCount = 10,
  worksAvailableArtistCount = 10,
  representedArtistColumnCount = 3,
  worksAvailableArtistColumnCount = 3,
  withColumnNames = true
): Array<ArtistsGroup> {
  return [
    {
      artists: [...Array(representedArtistCount)],
      columnSize: representedArtistColumnCount,
      columnName: withColumnNames ? "Represented Artists" : undefined,
    },
    {
      artists: [...Array(worksAvailableArtistCount)],
      columnSize: worksAvailableArtistColumnCount,
      columnName: withColumnNames ? "Works Available by" : undefined,
    },
  ]
}
