import { commitMutation, graphql } from "react-relay"
import {
  RequestCredentialsForAssetUploadInput,
  getGeminiCredentialsForEnvironmentMutation$data,
  getGeminiCredentialsForEnvironmentMutation,
} from "__generated__/getGeminiCredentialsForEnvironmentMutation.graphql"
import { Environment } from "react-relay"

export type AssetCredentials =
  | NonNullable<
      getGeminiCredentialsForEnvironmentMutation$data["requestCredentialsForAssetUpload"]
    >["asset"]
  | undefined

export const getGeminiCredentialsForEnvironment = (
  relayEnvironment: Environment,
  input: RequestCredentialsForAssetUploadInput
) => {
  return new Promise<AssetCredentials>((resolve, reject) => {
    commitMutation<getGeminiCredentialsForEnvironmentMutation>(
      relayEnvironment,
      {
        mutation: graphql`
          mutation getGeminiCredentialsForEnvironmentMutation(
            $input: RequestCredentialsForAssetUploadInput!
          ) {
            requestCredentialsForAssetUpload(input: $input) {
              asset {
                signature
                credentials
                policyEncoded
                policyDocument {
                  expiration
                  conditions {
                    acl
                    bucket
                    geminiKey
                    successActionStatus
                  }
                }
              }
            }
          }
        `,
        variables: {
          input: {
            ...input,
            clientMutationId: Math.random().toString(8),
          },
        },
        onError: reject,
        onCompleted: (response, errors) => {
          if (errors && errors.length > 0) {
            reject(new Error(JSON.stringify(errors)))
          } else {
            resolve(response.requestCredentialsForAssetUpload?.asset)
          }
        },
      }
    )
  })
}
