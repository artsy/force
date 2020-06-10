import { commitMutation, graphql } from "react-relay"
import { CreateCreditCardAndUpdatePhoneMutation } from "v2/__generated__/CreateCreditCardAndUpdatePhoneMutation.graphql"

export function createCreditCardAndUpdatePhone(relayEnvironment, phone, token) {
  return new Promise(async (resolve, reject) => {
    commitMutation<CreateCreditCardAndUpdatePhoneMutation>(relayEnvironment, {
      onCompleted: (data, errors) => {
        const {
          createCreditCard: { creditCardOrError },
        } = data

        if (creditCardOrError.creditCardEdge) {
          resolve()
        } else {
          if (errors) {
            reject(errors)
          } else {
            reject(creditCardOrError.mutationError)
          }
        }
      },
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
  })
}
