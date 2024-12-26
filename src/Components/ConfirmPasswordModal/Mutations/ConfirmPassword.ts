import type {
  ConfirmPasswordInput,
  ConfirmPasswordMutation,
  ConfirmPasswordMutation$data,
} from "__generated__/ConfirmPasswordMutation.graphql"
import { type Environment, commitMutation, graphql } from "react-relay"

export const ConfirmPassword = (
  environment: Environment,
  input: ConfirmPasswordInput,
) => {
  return new Promise<ConfirmPasswordMutation$data>(async (resolve, reject) => {
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
  })
}
