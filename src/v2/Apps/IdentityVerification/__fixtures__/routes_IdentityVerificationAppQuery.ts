import { routes_IdentityVerificationAppQueryRawResponse } from "v2/__generated__/routes_IdentityVerificationAppQuery.graphql"

export const IdentityVerificationAppQueryResponseFixture: routes_IdentityVerificationAppQueryRawResponse = {
  me: {
    internalID: "my-user-id",
    email: "barry@example.com",
    id: "unused-user",
    identityVerification: {
      internalID: "identity-verification-id",
      id: "unused-idv",
      userID: "my-user-id",
      state: "pending",
    },
  },
}
