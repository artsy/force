import { Environment } from "react-relay"
import { commitMutation, graphql } from "relay-runtime"
import RelayModernEnvironment from "relay-runtime/lib/store/RelayModernEnvironment"
import { useSystemContext } from "System/useSystemContext"
import {
  useCreateSavedSearchMutation,
  CreateSavedSearchInput,
  useCreateSavedSearchMutation$data,
} from "__generated__/useCreateSavedSearchMutation.graphql"

interface UseCreateSavedSearch {
  relayEnvironment?: RelayModernEnvironment | Environment | undefined
}

export const useCreateSavedSearch = ({
  relayEnvironment,
}: UseCreateSavedSearch = {}) => {
  const { relayEnvironment: defaultRelayEnvironment } = useSystemContext()

  const createSavedSearch = (input: CreateSavedSearchInput) => {
    return new Promise<useCreateSavedSearchMutation$data>((resolve, reject) => {
      commitMutation<useCreateSavedSearchMutation>(
        (relayEnvironment ?? defaultRelayEnvironment)!,
        {
          onError: reject,
          onCompleted: (res, errors) => {
            if (errors !== null) {
              reject(errors)
              return
            }

            resolve(res)
          },
          mutation: graphql`
            mutation useCreateSavedSearchMutation(
              $input: CreateSavedSearchInput!
            ) {
              createSavedSearch(input: $input) {
                me {
                  counts {
                    savedSearches
                  }
                }
                savedSearchOrErrors {
                  ... on SearchCriteria {
                    internalID
                  }
                }
              }
            }
          `,
          variables: { input },
        }
      )
    })
  }

  return { createSavedSearch }
}
