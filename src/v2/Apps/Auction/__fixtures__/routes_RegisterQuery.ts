import { routes_RegisterQueryRawResponse } from "v2/__generated__/routes_RegisterQuery.graphql"

export const RegisterQueryResponseFixture: routes_RegisterQueryRawResponse = {
  me: {
    id: "opaque-me-id",
    hasQualifiedCreditCards: false,
    internalID: "userid",
    identityVerified: false,
  },
  sale: {
    id: "opaque-sale-id",
    isAuction: true,
    slug: "an-example-auction-sale",
    isRegistrationClosed: false,
    isOpen: true,
    isPreview: false,
    registrationStatus: null,
    internalID: "id123",
    status: "open",
    requireIdentityVerification: true,
  },
}

export const RegisterQueryResponseFixtureWithVerifiedUser: routes_RegisterQueryRawResponse = {
  me: {
    id: "opaque-me-id",
    hasQualifiedCreditCards: false,
    internalID: "userid",
    identityVerified: true,
  },
  sale: {
    id: "opaque-sale-id",
    isAuction: true,
    slug: "an-example-auction-sale",
    isRegistrationClosed: false,
    isOpen: true,
    isPreview: false,
    registrationStatus: null,
    internalID: "id123",
    status: "open",
    requireIdentityVerification: true,
  },
}

export const RegisterQueryResponseFixtureWithoutVerificationNeeded: routes_RegisterQueryRawResponse = {
  me: {
    id: "opaque-me-id",
    hasQualifiedCreditCards: false,
    internalID: "userid",
    identityVerified: false,
  },
  sale: {
    id: "opaque-sale-id",
    isAuction: true,
    slug: "an-example-auction-sale",
    isRegistrationClosed: false,
    isOpen: true,
    isPreview: false,
    registrationStatus: null,
    internalID: "id123",
    status: "open",
    requireIdentityVerification: false,
  },
}
