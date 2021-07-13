import { ArtworkActions_Test_QueryRawResponse } from "v2/__generated__/ArtworkActions_Test_Query.graphql"

export const ArtworkActionsFixture: ArtworkActions_Test_QueryRawResponse & {
  user: User
} = {
  user: {
    type: "Admin",
    roles: ["admin", "team"],
  },
  artwork: {
    id:
      "QXJ0d29yazpwYWJsby1waWNhc3NvLWZlbW1lLWFzc2lzZS1kYW5zLXVuLWZhdXRldWlsLXRyZXNzZQ==",
    internalID: "5bae581fc60fcc53df98dfcc",
    slug: "pablo-picasso-femme-assise-dans-un-fauteuil-tresse",
    is_saved: true,
    is_downloadable: true,
    is_hangable: true,
    href: "/artwork/pablo-picasso-femme-assise-dans-un-fauteuil-tresse",
    artists: [
      {
        name: "Pablo Picasso",
        id: "asfds",
      },
    ],
    image: {
      height: 540,
      width: 540,
      internalID: "5aa17f397622dd4f3b006294",
      url:
        "https://d32dm0rphc51dk.cloudfront.net/sSoqyQKLQrfODvlAR-oOjw/larger.jpg",
    },
    title: "FEMME ASSISE DANS UN FAUTEUIL TRESSE",
    images: [
      {
        url:
          "https://d32dm0rphc51dk.cloudfront.net/XOqmjacZ-BGJW0IP4hVGVQ/larger.jpg",
      },
      {
        url:
          "https://d32dm0rphc51dk.cloudfront.net/IbvbfsfAUbPRYt0jwLmruw/larger.jpg",
      },
      {
        url:
          "https://d32dm0rphc51dk.cloudfront.net/d_bpX6nAmEDYjNPM1CshMQ/larger.jpg",
      },
    ],
    date: "1979-1982",
    dimensions: {
      cm: "76.2 × 55.9 cm",
    },
    artworkMeta: {
      share: "Share this please",
    },
    sale: {
      id: "sdfdsf",
      is_closed: true,
      is_auction: false,
      isClosed: true,
      isAuction: false,
    },
    partner: {
      id: "foo",
      slug: "gallery",
    },
  },
}
