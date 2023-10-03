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
    // Disable scroll anchoring for infinite article scroll
    // https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-anchor/Guide_to_scroll_anchoring
    <div style={{ overflowAnchor: "none" }}>
      <GridColumns alignItems="flex-end">
        {extractNodes(artworks).map(artwork => {
          return (
            <Column
              span={[6, 4]}
              key={artwork.internalID}
              // Fix for issue in Firefox where contents overflow container.
              width="100%"
            >
              <ArtworkItem
                item={artwork}
                selected={selectedIds.includes(artwork.internalID)}
                onItemClick={handleItemClick}
              />
            </Column>
          )
        })}
      </GridColumns>
    </div>
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
