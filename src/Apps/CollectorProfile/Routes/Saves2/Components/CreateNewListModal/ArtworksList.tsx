import { FC } from "react"
import { Column, GridColumns } from "@artsy/palette"
import { ArtworkItem } from "./ArtworkItem"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { ArtworksList_me$data } from "__generated__/ArtworksList_me.graphql"

interface ArtworksListProps {
  selectedIds: string[]
  onItemClick: (artworkID: string) => void
  me: ArtworksList_me$data
}

const ArtworksList: FC<ArtworksListProps> = ({
  onItemClick,
  selectedIds,
  me,
}) => {
  const handleItemClick = artworkID => {
    onItemClick(artworkID)
  }

  const artworks = extractNodes(me?.collection?.artworksConnection)

  return (
    <GridColumns>
      {artworks.map(artwork => {
        return (
          <Column span={[6, 4]}>
            <ArtworkItem
              item={artwork}
              selected={selectedIds.includes(artwork.internalID)}
              onItemClick={handleItemClick}
            />
          </Column>
        )
      })}
    </GridColumns>
  )
}

export const ArtworksListFragmentContainer = createFragmentContainer(
  ArtworksList,
  {
    me: graphql`
      fragment ArtworksList_me on Me
        @argumentDefinitions(
          sort: { type: CollectionArtworkSorts, defaultValue: POSITION_DESC }
        ) {
        collection(id: "saved-artwork") {
          name

          artworksConnection(first: 30, sort: $sort) {
            edges {
              node {
                internalID
                ...GridItem_artwork
              }
            }
          }
        }
      }
    `,
  }
)
