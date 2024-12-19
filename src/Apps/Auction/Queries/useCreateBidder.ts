import { useMutation } from "Utils/Hooks/useMutation"
import type { useCreateBidderMutation } from "__generated__/useCreateBidderMutation.graphql"
import { graphql } from "react-relay"

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
