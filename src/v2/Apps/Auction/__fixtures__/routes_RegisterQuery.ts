import { auctionRoutes_RegisterQuery$rawResponse } from "v2/__generated__/auctionRoutes_RegisterQuery.graphql"

export const RegisterQueryResponseFixture: auctionRoutes_RegisterQuery$rawResponse = {
  me: {
    hasQualifiedCreditCards: false,
    id: "opaque-me-id",
    identityVerified: false,
    internalID: "userid",
  },
  sale: {
    id: "opaque-sale-id",
    internalID: "id123",
    isAuction: true,
    isOpen: true,
    isPreview: false,
    isRegistrationClosed: false,
    registrationStatus: null,
    requireIdentityVerification: true,
    slug: "an-example-auction-sale",
    status: "open",
  },
}

export const RegisterQueryResponseFixtureWithVerifiedUser: auctionRoutes_RegisterQuery$rawResponse = {
  me: {
    hasQualifiedCreditCards: false,
    id: "opaque-me-id",
    identityVerified: true,
    internalID: "userid",
  },
  sale: {
    id: "opaque-sale-id",
    internalID: "id123",
    isAuction: true,
    isOpen: true,
    isPreview: false,
    isRegistrationClosed: false,
    registrationStatus: null,
    requireIdentityVerification: true,
    slug: "an-example-auction-sale",
    status: "open",
  },
}

export const RegisterQueryResponseFixtureWithoutVerificationNeeded: auctionRoutes_RegisterQuery$rawResponse = {
  me: {
    hasQualifiedCreditCards: false,
    id: "opaque-me-id",
    identityVerified: false,
    internalID: "userid",
  },
  sale: {
    id: "opaque-sale-id",
    internalID: "id123",
    isAuction: true,
    isOpen: true,
    isPreview: false,
    isRegistrationClosed: false,
    registrationStatus: null,
    requireIdentityVerification: false,
    slug: "an-example-auction-sale",
    status: "open",
  },
}
