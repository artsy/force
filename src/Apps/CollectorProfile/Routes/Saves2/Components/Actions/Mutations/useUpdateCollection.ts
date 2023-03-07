import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { useUpdateCollectionMutation } from "__generated__/useUpdateCollectionMutation.graphql"

export const useUpdateCollection = () => {
  return useMutation<useUpdateCollectionMutation>({
    mutation: graphql`
      mutation useUpdateCollectionMutation($input: updateCollectionInput!) {
        updateCollection(input: $input) {
          responseOrError {
            __typename
            ... on UpdateCollectionSuccess {
              collection {
                internalID
                name
              }
            }
            ... on UpdateCollectionFailure {
              mutationError {
                message
                statusCode
              }
            }
          }
        }
      }
    `,
  })
}
