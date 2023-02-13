import { Shelf, Spacer } from "@artsy/palette"
import { SavesArtworksQueryRenderer } from "./Components/SavesArtworks"
import { SavesItemFragmentContainer } from "./Components/SavesItem"
import { FC, useRef } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "System/Router/useRouter"
import { extractNodes } from "Utils/extractNodes"
import { CollectorProfileSaves2Route_me$data } from "__generated__/CollectorProfileSaves2Route_me.graphql"

interface CollectorProfileSaves2RouteProps {
  me: CollectorProfileSaves2Route_me$data
}

const CollectorProfileSaves2Route: FC<CollectorProfileSaves2RouteProps> = ({
  me,
}) => {
  const { match } = useRouter()
  const initialCollectionId = useRef(match.params.id)
  const { page, sort } = match.location.query ?? {}
  const savedCollection = me.defaultSaves!
  const selectedCollectionId = match.params.id ?? savedCollection.internalID
  let otherCollections = extractNodes(me.otherSaves)

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

  return (
    <>
      <Shelf showProgress={false}>
        {savedCollections.map(collection => {
          const isDefaultCollection =
            collection.internalID === savedCollection.internalID

          return (
            <SavesItemFragmentContainer
              key={collection.internalID}
              item={collection}
              isSelected={collection.internalID === selectedCollectionId}
              imagesLayout={isDefaultCollection ? "grid" : "stacked"}
            />
          )
        })}
      </Shelf>

      <Spacer y={2} />

      <SavesArtworksQueryRenderer
        collectionID={selectedCollectionId}
        initialPage={(page as unknown) as number}
        initialSort={sort}
      />
    </>
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
