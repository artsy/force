import { ConnectionHandler, graphql } from "react-relay"
import { RecordSourceSelectorProxy } from "relay-runtime"
import { useMutation } from "Utils/Hooks/useMutation"
import {
  CreateNewListModalMutation,
  CreateNewListModalMutation$data,
} from "__generated__/CreateNewListModalMutation.graphql"

const onListAdded = (
  store: RecordSourceSelectorProxy<CreateNewListModalMutation$data>,
  data
) => {
  const response = data.createCollection?.responseOrError
  const me = store.getRoot().getLinkedRecord("me")

  if (!response || !me) {
    return
  }

  const key = "CollectorProfileSaves2Route_otherSaves"
  const otherSavesConnection = ConnectionHandler.getConnection(me, key)
  const mutationPayload = store.getRootField("createCollection")
  const responseOrError = mutationPayload.getLinkedRecord("responseOrError")
  const createdCollection = responseOrError.getLinkedRecord("collection")

  if (!otherSavesConnection || !createdCollection) {
    return
  }

  const createdCollectionEdge = ConnectionHandler.createEdge(
    store,
    otherSavesConnection,
    createdCollection,
    "Collection"
  )

  ConnectionHandler.insertEdgeBefore(
    otherSavesConnection,
    createdCollectionEdge
  )
}

export const useCreateCollection = () => {
  return useMutation<CreateNewListModalMutation>({
    mutation: graphql`
      mutation useCreateCollectionMutation($input: createCollectionInput!) {
        createCollection(input: $input) {
          responseOrError {
            ... on CreateCollectionSuccess {
              collection {
                internalID
                name
                artworksCount
              }
            }

            ... on CreateCollectionFailure {
              mutationError {
                message
              }
            }
          }
        }
      }
    `,
    updater: onListAdded,
  })
}
