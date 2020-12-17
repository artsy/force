import { MarketDataSummary_artist } from "v2/__generated__/MarketDataSummary_artist.graphql"
import { MarketInsights_artist } from "v2/__generated__/MarketInsights_artist.graphql"

export const MarketDataSummaryArtists: MarketDataSummary_artist[] = [
  {
    " $refType": null,
    auctionResultsConnection: {
      edges: [
        {
          node: {
            price_realized: {
              display: "$63m",
            },
          },
        },
      ],
    },
    collections: ["Museum of Modern Art (MoMA)"],
    highlights: {
      partnersConnection: {
        edges: [
          {
            node: {
              categories: [
                { slug: "contemporary" },
                { slug: "established" },
                { slug: "top-established" },
              ],
            },
          },
        ],
      },
    },
    internalID: "589a6291275b2410d1beb6a5",
  },
  {
    " $refType": null,
    auctionResultsConnection: null,
    collections: null,
    highlights: {
      partnersConnection: {
        edges: [],
      },
    },
    internalID: "551361eb72616903f6d50300",
  },
]

export const MarketInsightsArtists: MarketInsights_artist[] = [
  {
    " $refType": null,
    auctionResultsConnection: {
      edges: [{ node: { price_realized: { display: "$63m" } } }],
    },
    collections: ["Tate", "Museum of Modern Art (MoMA)"],
    highlights: {
      partnersConnection: {
        edges: [
          {
            node: {
              categories: [
                { slug: "contemporary" },
                { slug: "established" },
                { slug: "modern" },
                { slug: "painting" },
                { slug: "blue-chip" },
              ],
            },
          },
          { node: { categories: [{ slug: "blue-chip" }] } },
          {
            node: {
              categories: [
                { slug: "contemporary" },
                { slug: "modern" },
                { slug: "top-established" },
              ],
            },
          },
          { node: { categories: [{ slug: "blue-chip" }] } },
          {
            node: {
              categories: [
                { slug: "contemporary" },
                { slug: "established" },
                { slug: "top-established" },
              ],
            },
          },
        ],
      },
    },
    internalID: "4d8b92b34eb68a1b2c0003f4",
  },
  {
    " $refType": null,
    auctionResultsConnection: null,
    collections: null,
    highlights: { partnersConnection: { edges: [] } },
    internalID: "4d8b92b34eb68a1b2c0003f4",
  },
]
