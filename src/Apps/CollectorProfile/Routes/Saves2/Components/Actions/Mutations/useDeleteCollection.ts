import { ConnectionHandler, graphql } from "react-relay"
import { RecordSourceSelectorProxy } from "relay-runtime"
import { useMutation } from "Utils/Hooks/useMutation"
import {
  useDeleteCollectionMutation,
  useDeleteCollectionMutation$data,
} from "__generated__/useDeleteCollectionMutation.graphql"

const deleteCollectionUpdater = (
  store: RecordSourceSelectorProxy<useDeleteCollectionMutation$data>,
  data
) => {
  const collectionID = data.deleteCollection?.responseOrError?.collection?.id

  const root = store.getRoot()
  const me = root.getLinkedRecord("me")

  if (!me || !collectionID) {
    return
  }

  const otherSavesConnection = ConnectionHandler.getConnection(
    me,
    "CollectorProfileSaves2Route_otherSaves"
  )

  if (!otherSavesConnection) {
    return
  }

  ConnectionHandler.deleteNode(otherSavesConnection, collectionID)
}

export const useDeleteCollection = () => {
  return useMutation<useDeleteCollectionMutation>({
    mutation: graphql`
      mutation useDeleteCollectionMutation($input: deleteCollectionInput!) {
        deleteCollection(input: $input) {
          responseOrError {
            __typename # DeleteCollectionSuccess or DeleteCollectionFailure
            ... on DeleteCollectionSuccess {
              collection {
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
    updater: (store, data) => deleteCollectionUpdater(store, data),
  })
}
