import { ConnectionHandler, graphql } from "react-relay"
import { RecordSourceSelectorProxy } from "relay-runtime"
import { useMutation } from "Utils/Hooks/useMutation"
import {
  useDeleteArtworkListMutation,
  useDeleteArtworkListMutation$data,
} from "__generated__/useDeleteArtworkListMutation.graphql"

const deleteArtworkListUpdater = (
  store: RecordSourceSelectorProxy<useDeleteArtworkListMutation$data>,
  data: useDeleteArtworkListMutation$data
) => {
  const { responseOrError } = data.deleteCollection ?? {}

  if (responseOrError?.__typename !== "DeleteCollectionSuccess") {
    return
  }

  const artworkListID = responseOrError.artworkList?.id

  const root = store.getRoot()
  const me = root.getLinkedRecord("me")

  if (!me || !artworkListID) {
    return
  }

  const customArtworkListsConnection = ConnectionHandler.getConnection(
    me,
    "CollectorProfileSavesRoute_customArtworkLists"
  )

  if (!customArtworkListsConnection) {
    return
  }

  ConnectionHandler.deleteNode(customArtworkListsConnection, artworkListID)
}

export const useDeleteArtworkList = () => {
  return useMutation<useDeleteArtworkListMutation>({
    mutation: graphql`
      mutation useDeleteArtworkListMutation($input: deleteCollectionInput!) {
        deleteCollection(input: $input) {
          responseOrError {
            __typename # DeleteCollectionSuccess or DeleteCollectionFailure
            ... on DeleteCollectionSuccess {
              artworkList: collection {
                id
              }
            }
            ... on DeleteCollectionFailure {
              mutationError {
                message
                statusCode
              }
            }
          }
        }
      }
    `,
    updater: (store, data) => deleteArtworkListUpdater(store, data),
  })
}
