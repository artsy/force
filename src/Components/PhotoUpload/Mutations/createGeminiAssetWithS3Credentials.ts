import {
  CreateGeminiEntryForAssetInput,
  createGeminiAssetWithS3CredentialsMutation,
} from "__generated__/createGeminiAssetWithS3CredentialsMutation.graphql"
import { Environment } from "react-relay"
import { commitMutation, graphql } from "react-relay"

export const createGeminiAssetWithS3Credentials = (
  relayEnvironment: Environment,
  input: CreateGeminiEntryForAssetInput
) => {
  return new Promise<string>((resolve, reject) => {
    commitMutation<createGeminiAssetWithS3CredentialsMutation>(
      relayEnvironment,
      {
        mutation: graphql`
          mutation createGeminiAssetWithS3CredentialsMutation(
            $input: CreateGeminiEntryForAssetInput!
          ) {
            createGeminiEntryForAsset(input: $input) {
              asset {
                token
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
            resolve(response.createGeminiEntryForAsset?.asset?.token as string)
          }
        },
      }
    )
  })
}
