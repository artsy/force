import { commitMutation, Environment, graphql } from "relay-runtime"
import {
  PaymentRouteSetOrderPaymentMutation,
  CommerceSetPaymentInput,
  PaymentRouteSetOrderPaymentMutationResponse,
} from "__generated__/PaymentRouteSetOrderPaymentMutation.graphql"

export const SetOrderPayment = (
  relayEnvironment: Environment,
  input: CommerceSetPaymentInput
) => {
  return new Promise<PaymentRouteSetOrderPaymentMutationResponse>(
    (resolve, reject) => {
      commitMutation<PaymentRouteSetOrderPaymentMutation>(relayEnvironment, {
        mutation: graphql`
          mutation PaymentRouteSetOrderPaymentMutation(
            $input: CommerceSetPaymentInput!
          ) {
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
    }
  )
}
