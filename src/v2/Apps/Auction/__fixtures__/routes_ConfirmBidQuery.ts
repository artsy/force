import { auctionRoutes_ConfirmBidQueryRawResponse } from "v2/__generated__/auctionRoutes_ConfirmBidQuery.graphql"

export const ConfirmBidQueryResponseFixture: auctionRoutes_ConfirmBidQueryRawResponse = {
  artwork: {
    artistNames: "artworkid",
    date: "may 4",
    id: "opaque-artworkid",
    imageUrl: "artworkid",
    internalID: "artworkid",
    saleArtwork: {
      counts: { bidderPositions: 3 },
      id: "opaque-saleArtworkid",
      increments: [
        { cents: 5000000, display: "$50,000" },
        { cents: 6000000, display: "$60,000" },
        { cents: 7000000, display: "$70,000" },
      ],
      internalID: "saleArtworkid",
      lotLabel: "13",
      currentBid: {
        display: "$50,000USD",
      },
      minimumNextBid: {
        cents: 5000000,
      },
      sale: {
        id: "opaque-saleid",
        internalID: "saleid",
        isClosed: false,
        isRegistrationClosed: false,
        name: "Art Sale 2019",
        registrationStatus: {
          id: "opaque-bidderid",
          internalID: "existing-bidder-id",
          qualifiedForBidding: true,
        },
        slug: "saleslug",
      },
      slug: "saleArtworkslug",
    },
    slug: "artworkslug",
    title: "artworkid",
  },
  me: {
    hasQualifiedCreditCards: true,
    id: "opaque-my-user-id",
    internalID: "my-user-id",
  },
}
