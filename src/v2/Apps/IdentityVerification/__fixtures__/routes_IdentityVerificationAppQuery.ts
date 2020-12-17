import { identityVerificationRoutes_IdentityVerificationAppQueryRawResponse } from "v2/__generated__/identityVerificationRoutes_IdentityVerificationAppQuery.graphql"

export const IdentityVerificationAppQueryResponseFixture: identityVerificationRoutes_IdentityVerificationAppQueryRawResponse = {
  me: {
    email: "barry@example.com",
    id: "unused-user",
    identityVerification: {
      id: "unused-idv",
      internalID: "identity-verification-id",
      state: "pending",
      userID: "my-user-id",
    },
    internalID: "my-user-id",
  },
}
