import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { useUpdateArtworkListMutation } from "__generated__/useUpdateArtworkListMutation.graphql"

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
