import { ConnectionHandler, graphql } from "react-relay"
import { RecordSourceSelectorProxy } from "relay-runtime"
import { useMutation } from "Utils/Hooks/useMutation"
import {
  useCreateCollectionMutation,
  useCreateCollectionMutation$data,
} from "__generated__/useCreateCollectionMutation.graphql"

const onListAdded = (
  store: RecordSourceSelectorProxy<useCreateCollectionMutation$data>,
  data: useCreateCollectionMutation$data
) => {
  const response = data.createCollection?.responseOrError
  const me = store.getRoot().getLinkedRecord("me")

  if (!response || !me) {
    return
  }

  const key = "CollectorProfileSavesRoute_customArtworkLists"
  const customArtworkListsConnection = ConnectionHandler.getConnection(me, key)
  const mutationPayload = store.getRootField("createCollection")
  const responseOrError = mutationPayload.getLinkedRecord("responseOrError")
  const createdCollection = responseOrError.getLinkedRecord("collection")

  if (!customArtworkListsConnection || !createdCollection) {
    return
  }

  const createdCollectionEdge = ConnectionHandler.createEdge(
    store,
    customArtworkListsConnection,
    createdCollection,
    "Collection"
  )

  ConnectionHandler.insertEdgeBefore(
    customArtworkListsConnection,
    createdCollectionEdge
  )
}

export const useCreateCollection = () => {
  return useMutation<useCreateCollectionMutation>({
    mutation: graphql`
      mutation useCreateCollectionMutation($input: createCollectionInput!) {
        createCollection(input: $input) {
          responseOrError {
            ... on CreateCollectionSuccess {
              collection {
                internalID
                name
                shareableWithPartners
                artworksCount(onlyVisible: true)
              }
            }

            ... on CreateCollectionFailure {
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
    updater: onListAdded,
  })
}
