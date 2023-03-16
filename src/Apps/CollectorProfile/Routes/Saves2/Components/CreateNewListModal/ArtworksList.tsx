import { FC } from "react"
import { Column, GridColumns } from "@artsy/palette"
import { ArtworkItem } from "./ArtworkItem"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { ArtworksList_artworks$data } from "__generated__/ArtworksList_artworks.graphql"

interface ArtworksListProps {
  selectedIds: string[]
  onItemClick: (artworkID: string) => void
  artworks: ArtworksList_artworks$data
}

const ArtworksList: FC<ArtworksListProps> = ({
  onItemClick,
  selectedIds,
  artworks,
}) => {
  const handleItemClick = (artworkID: string) => {
    onItemClick(artworkID)
  }

  return (
    <GridColumns>
      {extractNodes(artworks).map(artwork => {
        return (
          <Column span={[6, 4]}>
            <ArtworkItem
              key={artwork.internalID}
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
    artworks: graphql`
      fragment ArtworksList_artworks on ArtworkConnection {
        edges {
          node {
            internalID
            ...GridItem_artwork
          }
        }
      }
    `,
  }
)
