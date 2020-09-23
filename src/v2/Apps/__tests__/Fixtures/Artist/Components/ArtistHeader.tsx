import { ArtistHeader_Test_QueryRawResponse } from "v2/__generated__/ArtistHeader_Test_Query.graphql"

export const ArtistHeaderFixture = {
  internalID: "4d8b92884eb68a1b2c0001d8",
  slug: "cecily-brown",
  name: "Cecily Brown",
  formattedNationalityAndBirthday: "British, born 1969",
  counts: { follows: 9135, forSaleArtworks: 0 },
  carousel: {
    images: [
      {
        href: "/show/two-palms-two-palms-at-the-armory-show-2016",
        resized: {
          url:
            "https://d7hftxdivxxvm.cloudfront.net?resize_to=fit&width=359&height=200&quality=80&src=https%3A%2F%2Fd32dm0rphc51dk.cloudfront.net%2FlL-b8v9q-GLBENMOg9pVGQ%2Flarge.jpg",
          width: 359,
          height: 200,
        },
      },
    ],
  },
  id: "QXJ0aXN0OmNlY2lseS1icm93bg==",
  is_followed: true,
  statuses: {
    shows: true,
    artists: true,
    articles: false,
    cv: true,
    auction_lots: true,
    artworks: true,
  },
  artistHighlights: {
    partnersConnection: {
      edges: [
        {
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
          id: "UGFydG5lckFydGlzdEVkZ2U6NTIwM2Y1NWU4N2E1M2ViOWZkMDAwMDcw",
        },
        {
          node: {
            categories: [
              {
                id: "opaque-gene-blue-chip",
                slug: "blue-chip",
              },
            ],
            id: "UGFydG5lcjpnYWxlcmllLXRoYWRkYWV1cy1yb3BhYw==",
          },
          id: "UGFydG5lckFydGlzdEVkZ2U6NTU0YWI2MDg3NzZmNzI1MzQyMDYwMDAw",
        },
        {
          node: {
            categories: [
              {
                id: "opaque-gene-blue-chip",
                slug: "blue-chip",
              },
            ],
            id: "UGFydG5lcjpza2Fyc3RlZHQtZ2FsbGVyeQ==",
          },
          id: "UGFydG5lckFydGlzdEVkZ2U6NTFlNWE4Zjk4YjNiODFlNDQ4MDAwMDc1",
        },
        {
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
          id: "UGFydG5lckFydGlzdEVkZ2U6NTFlNThlZGQyNzViMjRjMzI3MDAwMWNj",
        },
      ],
    },
  },
  auctionResultsConnection: {
    edges: [
      {
        node: {
          price_realized: {
            display: "$63m",
          },
          organization: "Christie's",
          sale_date: "2017",
          id: "QXVjdGlvblJlc3VsdDoxMDkzOQ==",
        },
      },
    ],
  },
} as ArtistHeader_Test_QueryRawResponse["artist"]
