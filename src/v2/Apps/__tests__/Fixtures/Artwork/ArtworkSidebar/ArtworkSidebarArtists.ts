import { ArtworkSidebarArtists_Test_QueryRawResponse } from "v2/__generated__/ArtworkSidebarArtists_Test_Query.graphql"

export const SingleFollowedArtist: ArtworkSidebarArtists_Test_QueryRawResponse["artwork"] = {
  artists: [
    {
      counts: { follows: 9346 },
      href: "/artist/josef-albers",
      id: "QXJ0aXN0Ompvc2VmLWFsYmVycw==",
      internalID: "artist_id",
      is_followed: false,
      name: "Josef Albers",
      related: null,
      slug: "josef-albers",
    },
  ],
  cultural_maker: "American 18th Century",
  id: "opaque-artwork-id",
}

export const SingleNonFollowedArtist = {
  artists: [
    {
      counts: { follows: 9346 },
      href: "/artist/josef-albers",
      id: "QXJ0aXN0Ompvc2VmLWFsYmVycw==",
      internalID: "artist_id",
      is_followed: false,
      name: "Josef Albers",
      related: null,
      slug: "josef-albers",
    },
  ],
  cultural_maker: "American 18th Century",
}

export const MultipleArtists: ArtworkSidebarArtists_Test_QueryRawResponse["artwork"] = {
  artists: [
    {
      counts: { follows: 9346 },
      href: "/artist/josef-albers",
      id: "QXJ0aXN0Ompvc2VmLWFsYmVycw==",
      internalID: "artist_0_id",
      is_followed: false,
      name: "Josef Albers",
      related: null,
      slug: "josef-albers",
    },
    {
      counts: { follows: 15431 },
      href: "/artist/ed-ruscha",
      id: "QXJ0aXN0OmVkLXJ1c2NoYQ==",
      internalID: "artist_1_id",
      is_followed: false,
      name: "Ed Ruscha",
      related: null,
      slug: "ed-ruscha",
    },
  ],
  cultural_maker: "American 18th Century",
  id: "opaque-artwork-id",
}

export const CulturalMakerWork: ArtworkSidebarArtists_Test_QueryRawResponse["artwork"] = {
  artists: [],
  cultural_maker: "American 18th Century",
  id: "opaque-artwork-id",
}
