import { useMutation } from "v2/Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useCreateBidderPositionMutation } from "v2/__generated__/useCreateBidderPositionMutation.graphql"

export const useCreateBidderPosition = () => {
  return useMutation<useCreateBidderPositionMutation>({
    mutation: graphql`
      mutation useCreateBidderPositionMutation($input: BidderPositionInput!) {
        createBidderPosition(input: $input) {
          result {
            position {
              internalID
              saleArtwork {
                sale {
                  registrationStatus {
                    internalID
                    qualifiedForBidding
                  }
                }
              }
            }
            status
            messageHeader
          }
        }
      }
    `,
  })
}
