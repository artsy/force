import { useMutation } from "Utils/Hooks/useMutation"
import { graphql } from "react-relay"
import { useCreateBidderMutation } from "__generated__/useCreateBidderMutation.graphql"

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
