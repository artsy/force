import { Shelf, Spacer } from "@artsy/palette"
import { SavesArtworksQueryRenderer } from "./Components/SavesArtworks"
import { SavesHeader } from "./Components/SavesHeader"
import { SavesItemFragmentContainer } from "./Components/SavesItem"
import { FC, useCallback, useRef, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "System/Router/useRouter"
import { extractNodes } from "Utils/extractNodes"
import { CollectorProfileSaves2Route_me$data } from "__generated__/CollectorProfileSaves2Route_me.graphql"
import { useSavesHistoryEntity } from "Apps/CollectorProfile/Routes/Saves2/Hooks/useSavesHistoryEntity"
import {
  CollectorProfileSaves2ContextProvider,
  CollectorProfileSaves2ContextValue,
} from "Apps/CollectorProfile/Routes/Saves2/CollectorProfileSaves2Context"

interface CollectorProfileSaves2RouteProps {
  me: CollectorProfileSaves2Route_me$data
}

const CollectorProfileSaves2Route: FC<CollectorProfileSaves2RouteProps> = ({
  me,
}) => {
  const { match } = useRouter()
  const { page, sort } = match.location.query ?? {}
  const savedCollection = me.defaultSaves!
  const savedCollectionId = savedCollection.internalID
  let otherCollections = extractNodes(me.otherSaves)

  const initialCollectionId = useRef(match.params.id)
  const [activeCollectionId, setActiveCollectionId] = useState(
    match.params.id ?? savedCollectionId
  )

  if (initialCollectionId.current !== undefined) {
    const index = otherCollections.findIndex(
      collection => collection.internalID === initialCollectionId.current
    )

    if (index !== -1) {
      // Remove the initial collection from array
      const initialCollection = otherCollections.splice(index, 1)

      // "Locking" the initial collection in the first slot
      otherCollections = [...initialCollection, ...otherCollections]
    }
  }

  // Always display "Saved Artwork" collection first in the list
  const savedCollections = [savedCollection, ...otherCollections]

  const onHistoryChanged = useCallback(
    (id: string | null) => {
      setActiveCollectionId(id ?? savedCollectionId)
    },
    [savedCollectionId, setActiveCollectionId]
  )

  useSavesHistoryEntity({
    onChanged: onHistoryChanged,
  })

  const onDeleteCollection = () => {
    setActiveCollectionId(savedCollectionId)
    window.history.replaceState(null, "", "/collector-profile/saves2")
  }

  const contextValue: CollectorProfileSaves2ContextValue = {
    activeCollectionId,
    setActiveCollectionId,
    onDeleteCollection,
  }

  return (
    <CollectorProfileSaves2ContextProvider value={contextValue}>
      <SavesHeader />

      <Spacer y={4} />

      <Shelf showProgress={false}>
        {savedCollections.map(collection => {
          const isDefaultCollection =
            collection.internalID === savedCollection.internalID

          return (
            <SavesItemFragmentContainer
              key={collection.internalID}
              item={collection}
              imagesLayout={isDefaultCollection ? "grid" : "stacked"}
            />
          )
        })}
      </Shelf>

      <Spacer y={4} />

      <SavesArtworksQueryRenderer
        collectionID={activeCollectionId}
        initialPage={(page as unknown) as number}
        initialSort={sort}
      />
    </CollectorProfileSaves2ContextProvider>
  )
}

export const CollectorProfileSaves2RouteFragmentContainer = createFragmentContainer(
  CollectorProfileSaves2Route,
  {
    me: graphql`
      fragment CollectorProfileSaves2Route_me on Me {
        defaultSaves: collection(id: "saved-artwork") {
          internalID
          ...SavesItem_item
        }

        otherSaves: collectionsConnection(
          first: 30
          default: false
          saves: true
          sort: CREATED_AT_DESC
        )
          @connection(
            key: "CollectorProfileSaves2Route_otherSaves"
            filters: []
          ) {
          edges {
            node {
              internalID
              default
              ...SavesItem_item
            }
          }
        }
      }
    `,
  }
)
