import { commitMutation, Environment, graphql } from "relay-runtime"
import {
  SetOrderPaymentMutation,
  CommerceSetPaymentInput,
  SetOrderPaymentMutationResponse,
} from "__generated__/SetOrderPaymentMutation.graphql"

export const SetOrderPayment = (
  relayEnvironment: Environment,
  input: CommerceSetPaymentInput
) => {
  return new Promise<SetOrderPaymentMutationResponse>((resolve, reject) => {
    commitMutation<SetOrderPaymentMutation>(relayEnvironment, {
      mutation: graphql`
        mutation SetOrderPaymentMutation($input: CommerceSetPaymentInput!) {
          commerceSetPayment(input: $input) {
            orderOrError {
              ... on CommerceOrderWithMutationSuccess {
                order {
                  id
                  ...Payment_validation
                  creditCard {
                    internalID
                    name
                    street1
                    street2
                    city
                    state
                    country
                    postal_code: postalCode
                  }
                }
              }
              ... on CommerceOrderWithMutationFailure {
                error {
                  type
                  code
                  data
                }
              }
            }
          }
        }
      `,
      variables: {
        input,
      },
      onError: reject,
      onCompleted: async (res, errors) => {
        if (errors !== null) {
          reject(errors)
          return
        }
        resolve(res)
      },
    })
  })
}
