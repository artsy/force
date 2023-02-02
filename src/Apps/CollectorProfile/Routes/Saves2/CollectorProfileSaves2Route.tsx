import { Shelf, Spacer } from "@artsy/palette"
import { SavesArtworksQueryRenderer } from "Apps/CollectorProfile/Routes/Saves2/Components/SavesArtworks"
import { SavesItemFragmentContainer } from "Apps/CollectorProfile/Routes/Saves2/Components/SavesItem"
import { orderBy } from "lodash"
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
  const nodes = extractNodes(me.collectionsConnection)
  // Placing the default collection at the top of the list
  let collections = orderBy(nodes, ["default"], ["desc"])
  const savedCollections = collections[0]
  const selectedCollectionId = match.params.id ?? savedCollections.internalID

  if (initialCollectionId.current !== undefined) {
    const index = collections.findIndex(
      collection => collection.internalID === initialCollectionId.current
    )

    // "Locking" the initial collection in the 2nd slot
    if (index !== -1) {
      // Remove the initial collection from collections array
      const initialCollection = collections.splice(index, 1)

      // Ignore the first collection (the default saved collection)
      const otherCollections = collections.slice(1)

      collections = [collections[0], ...initialCollection, ...otherCollections]
    }
  }

  return (
    <>
      <Shelf showProgress={false}>
        {collections.map(collection => (
          <SavesItemFragmentContainer
            key={collection.internalID}
            item={collection}
            isSelected={collection.internalID === selectedCollectionId}
            imagesLayout={collection.default ? "grid" : "stacked"}
          />
        ))}
      </Shelf>

      <Spacer y={2} />

      <SavesArtworksQueryRenderer collectionID={selectedCollectionId} />
    </>
  )
}

export const CollectorProfileSaves2RouteFragmentContainer = createFragmentContainer(
  CollectorProfileSaves2Route,
  {
    me: graphql`
      fragment CollectorProfileSaves2Route_me on Me {
        collectionsConnection(first: 20) {
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
