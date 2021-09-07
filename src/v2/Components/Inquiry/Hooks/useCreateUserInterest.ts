import { commitMutation, graphql } from "relay-runtime"
import { useSystemContext } from "v2/System"
import {
  useCreateUserInterestMutation,
  CreateUserInterestMutationInput,
} from "v2/__generated__/useCreateUserInterestMutation.graphql"

export const useCreateUserInterest = () => {
  const { relayEnvironment } = useSystemContext()

  const submitCreateUserInterest = (input: CreateUserInterestMutationInput) => {
    return new Promise((resolve, reject) => {
      commitMutation<useCreateUserInterestMutation>(relayEnvironment!, {
        onError: reject,
        onCompleted: (res, errors) => {
          if (errors !== null) {
            reject(errors)
            return
          }

          resolve(res)
        },
        mutation: graphql`
          mutation useCreateUserInterestMutation(
            $input: CreateUserInterestMutationInput!
          ) {
            createUserInterest(input: $input) {
              clientMutationId
            }
          }
        `,
        variables: { input },
      })
    })
  }

  return { submitCreateUserInterest }
}
