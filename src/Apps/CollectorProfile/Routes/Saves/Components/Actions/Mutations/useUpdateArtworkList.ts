import { useMutation } from "Utils/Hooks/useMutation"
import type { useUpdateArtworkListMutation } from "__generated__/useUpdateArtworkListMutation.graphql"
import { graphql } from "react-relay"

export const useUpdateArtworkList = () => {
  return useMutation<useUpdateArtworkListMutation>({
    mutation: graphql`
      mutation useUpdateArtworkListMutation($input: updateCollectionInput!) {
        updateCollection(input: $input) {
          responseOrError {
            __typename
            ... on UpdateCollectionSuccess {
              artworkList: collection {
                internalID
                name
                shareableWithPartners
              }
            }
            ... on UpdateCollectionFailure {
              mutationError {
                fieldErrors {
                  name
                  message
                }
              }
            }
          }
        }
      }
    `,
  })
}
