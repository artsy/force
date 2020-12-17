import { ArtworkActions_Test_QueryRawResponse } from "v2/__generated__/ArtworkActions_Test_Query.graphql"

export const ArtworkActionsFixture: ArtworkActions_Test_QueryRawResponse & {
  user: User
} = {
  artwork: {
    artists: [
      {
        id: "asfds",
        name: "Pablo Picasso",
      },
    ],
    href: "/artwork/pablo-picasso-femme-assise-dans-un-fauteuil-tresse",
    id:
      "QXJ0d29yazpwYWJsby1waWNhc3NvLWZlbW1lLWFzc2lzZS1kYW5zLXVuLWZhdXRldWlsLXRyZXNzZQ==",
    image: {
      height: 540,
      internalID: "5aa17f397622dd4f3b006294",
      url:
        "https://d32dm0rphc51dk.cloudfront.net/sSoqyQKLQrfODvlAR-oOjw/larger.jpg",
      width: 540,
    },
    date: "1979-1982",
    internalID: "5bae581fc60fcc53df98dfcc",
    artworkMeta: {
      share: "Share this please",
    },
    is_downloadable: true,
    dimensions: {
      cm: "76.2 × 55.9 cm",
    },
    is_saved: true,
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
    slug: "pablo-picasso-femme-assise-dans-un-fauteuil-tresse",
    is_hangable: true,
    partner: {
      id: "foo",
      slug: "gallery",
    },
    sale: {
      id: "sdfdsf",
      is_auction: false,
      is_closed: true,
    },
    title: "FEMME ASSISE DANS UN FAUTEUIL TRESSE",
  },
  user: {
    roles: ["admin", "team"],
    type: "Admin",
  },
}
