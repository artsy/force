import { Environment, commitMutation, graphql } from "react-relay"
import {
  CreateOfferResponseMutation,
  CreateOfferResponseMutationInput,
  CreateOfferResponseMutationResponse,
} from "v2/__generated__/CreateOfferResponseMutation.graphql"

type CreateOfferResponseValues = Pick<
  CreateOfferResponseMutationInput,
  "intendedState" | "phoneNumber" | "rejectionReason" | "comments"
>

export const CreateOfferResponse = (
  relayEnvironment: Environment,
  offerID: string,
  values: CreateOfferResponseValues
) => {
  return new Promise<CreateOfferResponseMutationResponse>((resolve, reject) => {
    commitMutation<CreateOfferResponseMutation>(relayEnvironment, {
      onCompleted: (data, errors) => (errors ? reject(errors) : resolve(data)),
      onError: reject,
      mutation: graphql`
        mutation CreateOfferResponseMutation(
          $input: CreateOfferResponseMutationInput!
        ) {
          createConsignmentOfferResponse(input: $input) {
            consignmentOfferResponse {
              intendedState
              phoneNumber
              rejectionReason
              comments
            }
          }
        }
      `,
      variables: {
        input: {
          offerId: offerID,
          intendedState: values.intendedState,
          phoneNumber: values.phoneNumber,
          rejectionReason: values.rejectionReason,
          comments: values.comments,
        },
      },
    })
  })
}
