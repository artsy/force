import { graphql } from "react-relay"
import { useMutation } from "Utils/Hooks/useMutation"
import { useUpdateMeCollectionMutation } from "__generated__/useUpdateMeCollectionMutation.graphql"

export const useUpdateMeCollection = () => {
  return useMutation<useUpdateMeCollectionMutation>({
    mutation: graphql`
      mutation useUpdateMeCollectionMutation(
        $input: updateMeCollectionsMutationInput!
      ) {
        updateMeCollectionsMutation(input: $input) {
          meCollectionsOrErrors {
            ... on UpdateMeCollectionsSuccess {
              collection {
                id
                shareableWithPartners
                name
                artworksCount
              }
            }
            ... on UpdateMeCollectionsFailure {
              mutationError {
                type
                message
              }
            }
          }
        }
      }
    `,
  })
}
