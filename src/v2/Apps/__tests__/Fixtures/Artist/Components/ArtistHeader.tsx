import { ArtistHeader_Test_QueryRawResponse } from "v2/__generated__/ArtistHeader_Test_Query.graphql"

export const ArtistHeaderFixture = {
  artistHighlights: {
    partnersConnection: {
      edges: [
        {
          id: "UGFydG5lckFydGlzdEVkZ2U6NTIwM2Y1NWU4N2E1M2ViOWZkMDAwMDcw",
          node: {
            categories: [
              {
                id: "opaque-gene-contemporary",
                slug: "contemporary",
              },
              {
                id: "opaque-gene-established",
                slug: "established",
              },
              {
                id: "opaque-gene-modern",
                slug: "modern",
              },
              {
                id: "opaque-gene-painting",
                slug: "painting",
              },
              {
                id: "opaque-gene-blue-chip",
                slug: "blue-chip",
              },
            ],
            id: "UGFydG5lcjpnYWdvc2lhbg==",
          },
        },
        {
          id: "UGFydG5lckFydGlzdEVkZ2U6NTU0YWI2MDg3NzZmNzI1MzQyMDYwMDAw",
          node: {
            categories: [
              {
                id: "opaque-gene-blue-chip",
                slug: "blue-chip",
              },
            ],
            id: "UGFydG5lcjpnYWxlcmllLXRoYWRkYWV1cy1yb3BhYw==",
          },
        },
        {
          id: "UGFydG5lckFydGlzdEVkZ2U6NTFlNWE4Zjk4YjNiODFlNDQ4MDAwMDc1",
          node: {
            categories: [
              {
                id: "opaque-gene-blue-chip",
                slug: "blue-chip",
              },
            ],
            id: "UGFydG5lcjpza2Fyc3RlZHQtZ2FsbGVyeQ==",
          },
        },
        {
          id: "UGFydG5lckFydGlzdEVkZ2U6NTFlNThlZGQyNzViMjRjMzI3MDAwMWNj",
          node: {
            categories: [
              {
                id: "opaque-gene-contemporary",
                slug: "contemporary",
              },
              {
                id: "opaque-gene-established",
                slug: "established",
              },
              {
                id: "opaque-gene-top-established",
                slug: "top-established",
              },
            ],
            id: "UGFydG5lcjphbnRvbi1rZXJuLWdhbGxlcnk=",
          },
        },
      ],
    },
  },
  carousel: {
    images: [
      {
        href: "/show/two-palms-two-palms-at-the-armory-show-2016",
        resized: {
          height: 200,
          url:
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=359&height=200&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FlL-b8v9q-GLBENMOg9pVGQ%2Flarge.jpg",
          width: 359,
        },
      },
    ],
  },
  auctionResultsConnection: {
    edges: [
      {
        node: {
          organization: "Christie's",
          id: "QXVjdGlvblJlc3VsdDoxMDkzOQ==",
          price_realized: {
            display: "$63m",
          },
          sale_date: "2017",
        },
      },
    ],
  },
  counts: { follows: 9135, forSaleArtworks: 0 },
  formattedNationalityAndBirthday: "British, born 1969",
  id: "QXJ0aXN0OmNlY2lseS1icm93bg==",
  internalID: "4d8b92884eb68a1b2c0001d8",
  is_followed: true,
  name: "Cecily Brown",
  slug: "cecily-brown",
  statuses: {
    articles: false,
    artists: true,
    artworks: true,
    auction_lots: true,
    cv: true,
    shows: true,
  },
} as ArtistHeader_Test_QueryRawResponse["artist"]
