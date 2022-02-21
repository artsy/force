import { Environment, commitMutation, graphql } from "react-relay"
import {
  CreateOfferResponseMutation,
  CreateOfferResponseMutationInput,
  CreateOfferResponseMutation$data,
} from "v2/__generated__/CreateOfferResponseMutation.graphql"

type CreateOfferResponseValues = Pick<
  CreateOfferResponseMutationInput,
  "intendedState"
>

export const CreateOfferResponse = (
  relayEnvironment: Environment,
  offerID: string,
  values: CreateOfferResponseValues
) => {
  return new Promise<CreateOfferResponseMutation$data>((resolve, reject) => {
    commitMutation<CreateOfferResponseMutation>(relayEnvironment, {
      mutation: graphql`
        mutation CreateOfferResponseMutation(
          $input: CreateOfferResponseMutationInput!
        ) {
          createConsignmentOfferResponse(input: $input) {
            consignmentOfferResponse {
              intendedState
            }
          }
        }
      `,
      onCompleted: (data, errors) => (errors ? reject(errors) : resolve(data)),
      onError: reject,
      variables: {
        input: {
          intendedState: values.intendedState,
          offerId: offerID,
        },
      },
    })
  })
}
