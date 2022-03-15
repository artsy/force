import { useMutation } from "v2/Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useCreateBidderMutation } from "v2/__generated__/useCreateBidderMutation.graphql"

export const useCreateBidder = () => {
  return useMutation<useCreateBidderMutation>({
    mutation: graphql`
      mutation useCreateBidderMutation($input: CreateBidderInput!) {
        createBidder(input: $input) {
          bidder {
            internalID
            sale {
              ...AuctionApp_sale
            }
          }
        }
      }
    `,
  })
}
