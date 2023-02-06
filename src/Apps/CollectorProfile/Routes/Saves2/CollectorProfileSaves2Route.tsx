import { Shelf } from "@artsy/palette"
import { SavesItemFragmentContainer } from "Apps/CollectorProfile/Routes/Saves2/Components/SavesItem"
import { orderBy } from "lodash"
import { FC, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { CollectorProfileSaves2Route_me$data } from "__generated__/CollectorProfileSaves2Route_me.graphql"

interface CollectorProfileSaves2RouteProps {
  me: CollectorProfileSaves2Route_me$data
}

const CollectorProfileSaves2Route: FC<CollectorProfileSaves2RouteProps> = ({
  me,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const collections = extractNodes(me.collectionsConnection)
  // Placing the default collection at the top of the list
  const sortedCollections = orderBy(collections, ["default"], ["desc"])

  return (
    <Shelf showProgress={false}>
      {sortedCollections.map((collection, index) => (
        <SavesItemFragmentContainer
          key={collection.internalID}
          item={collection}
          isSelected={selectedIndex === index}
          imagesLayout={collection.default ? "grid" : "stacked"}
          onClick={() => setSelectedIndex(index)}
        />
      ))}
    </Shelf>
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
