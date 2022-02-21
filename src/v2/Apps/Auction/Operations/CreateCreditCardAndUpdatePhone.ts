import { commitMutation, graphql } from "react-relay"
import {
  CreateCreditCardAndUpdatePhoneMutation,
  CreateCreditCardAndUpdatePhoneMutation$data,
} from "v2/__generated__/CreateCreditCardAndUpdatePhoneMutation.graphql"

export function createCreditCardAndUpdatePhone(relayEnvironment, phone, token) {
  return new Promise<CreateCreditCardAndUpdatePhoneMutation$data>(
    (resolve, reject) => {
      commitMutation<CreateCreditCardAndUpdatePhoneMutation>(relayEnvironment, {
        onCompleted: (data, errors) =>
          errors ? reject(errors) : resolve(data),
        onError: reject,
        mutation: graphql`
          mutation CreateCreditCardAndUpdatePhoneMutation(
            $creditCardInput: CreditCardInput!
            $profileInput: UpdateMyProfileInput!
          ) {
            updateMyUserProfile(input: $profileInput) {
              user {
                internalID
              }
            }

            createCreditCard(input: $creditCardInput) {
              creditCardOrError {
                ... on CreditCardMutationSuccess {
                  creditCardEdge {
                    node {
                      lastDigits
                    }
                  }
                }
                ... on CreditCardMutationFailure {
                  mutationError {
                    type
                    message
                    detail
                  }
                }
              }
            }
          }
        `,
        variables: {
          creditCardInput: { token },
          profileInput: { phone },
        },
      })
    }
  )
}
