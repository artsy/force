import { Environment, commitMutation, graphql } from "react-relay"
import {
  ConfirmPasswordInput,
  ConfirmPasswordMutation,
  ConfirmPasswordMutationResponse,
} from "v2/__generated__/ConfirmPasswordMutation.graphql"

export const ConfirmPassword = (
  environment: Environment,
  input: ConfirmPasswordInput
) => {
  return new Promise<ConfirmPasswordMutationResponse>(
    async (resolve, reject) => {
      commitMutation<ConfirmPasswordMutation>(environment, {
        mutation: graphql`
          mutation ConfirmPasswordMutation($input: ConfirmPasswordInput!)
            @raw_response_type {
            confirmPassword(input: $input) {
              valid
            }
          }
        `,

        onCompleted: (data, err) => {
          if (err) {
            reject(err)
          } else if (data.confirmPassword) {
            if (data.confirmPassword.valid) {
              resolve(data)
            } else {
              reject({ error: "Invalid password." })
            }
          }
        },
        variables: {
          input,
        },
      })
    }
  )
}
