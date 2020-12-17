import { commitMutation, graphql } from "react-relay"
import {
  CreateCreditCardAndUpdatePhoneMutation,
  CreateCreditCardAndUpdatePhoneMutationResponse,
} from "v2/__generated__/CreateCreditCardAndUpdatePhoneMutation.graphql"

export function createCreditCardAndUpdatePhone(relayEnvironment, phone, token) {
  return new Promise<CreateCreditCardAndUpdatePhoneMutationResponse>(
    (resolve, reject) => {
      commitMutation<CreateCreditCardAndUpdatePhoneMutation>(relayEnvironment, {
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
        onCompleted: (data, errors) =>
          errors ? reject(errors) : resolve(data),
        onError: reject,
        variables: {
          creditCardInput: { token },
          profileInput: { phone },
        },
      })
    }
  )
}
