import { routes_ConfirmBidQueryRawResponse } from "v2/__generated__/routes_ConfirmBidQuery.graphql"

export const ConfirmBidQueryResponseFixture: routes_ConfirmBidQueryRawResponse = {
  me: {
    id: "opaque-my-user-id",
    internalID: "my-user-id",
    hasQualifiedCreditCards: true,
  },
  artwork: {
    id: "opaque-artworkid",
    internalID: "artworkid",
    slug: "artworkslug",
    date: "may 4",
    title: "artworkid",
    imageUrl: "artworkid",
    artistNames: "artworkid",
    saleArtwork: {
      id: "opaque-saleArtworkid",
      internalID: "saleArtworkid",
      slug: "saleArtworkslug",
      counts: { bidderPositions: 3 },
      increments: [
        { cents: 5000000, display: "$50,000" },
        { cents: 6000000, display: "$60,000" },
        { cents: 7000000, display: "$70,000" },
      ],
      lotLabel: "13",
      minimumNextBid: {
        amount: "50000",
        cents: 5000000,
        display: "$50,000USD",
      },
      sale: {
        id: "opaque-saleid",
        internalID: "saleid",
        slug: "saleslug",
        name: "Art Sale 2019",
        isClosed: false,
        isRegistrationClosed: false,
        registrationStatus: {
          id: "opaque-bidderid",
          internalID: "existing-bidder-id",
          qualifiedForBidding: true,
        },
      },
    },
  },
}
