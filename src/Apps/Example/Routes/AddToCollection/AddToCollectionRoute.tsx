import { Column, Flex, GridColumns, Text } from "@artsy/palette"
import { useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { extractNodes } from "Utils/extractNodes"
import { AddToCollectionRoute_viewer$data } from "__generated__/AddToCollectionRoute_viewer.graphql"
import { ArtworkItem } from "./Components/ArtworkItem"

interface AddToCollectionRouteProps {
  viewer: AddToCollectionRoute_viewer$data
}

const AddToCollectionRoute: React.FC<AddToCollectionRouteProps> = props => {
  const artworks = extractNodes(props.viewer.artworksConnection)

  // Left column artworks
  const [artworksInCollection, setArtworksInCollection] = useState<
    typeof artworks
  >([])

  // Right column artworks
  const [availableArtworks, setAvailableArtworks] = useState(artworks)

  const hasArtworksInCollection = artworksInCollection.length > 0

  const handleAddArtwork = artwork => {
    setArtworksInCollection([...artworksInCollection, artwork])
    setAvailableArtworks(
      availableArtworks.filter(
        availableArtwork => availableArtwork.internalID !== artwork.internalID
      )
    )
  }

  const handleRemoveArtwork = artwork => {
    setArtworksInCollection(
      artworksInCollection.filter(
        availableArtwork => availableArtwork.internalID !== artwork.internalID
      )
    )
    setAvailableArtworks([artwork, ...availableArtworks])
  }

  return (
    <GridColumns>
      <Column span={3} borderRight="1px solid #ccc">
        <>
          {hasArtworksInCollection ? (
            <>
              {artworksInCollection.map(artwork => {
                return (
                  <ArtworkItem
                    key={artwork.internalID}
                    artwork={artwork}
                    mode="remove"
                    onClick={handleRemoveArtwork}
                  />
                )
              })}
            </>
          ) : (
            <Text variant="md">No Works.</Text>
          )}

          <Text variant="sm" color="black60">
            Select some artworks from the right to get started.
          </Text>
        </>
      </Column>
      <Column span={9}>
        <Flex flexWrap="wrap">
          {availableArtworks.map(artwork => {
            return (
              <ArtworkItem
                key={artwork.internalID}
                artwork={artwork}
                mode="add"
                onClick={handleAddArtwork}
              />
            )
          })}
        </Flex>
      </Column>
    </GridColumns>
  )
}

export const AddToCollectionRouteFragmentContainer = createFragmentContainer(
  AddToCollectionRoute,
  {
    viewer: graphql`
      fragment AddToCollectionRoute_viewer on Viewer {
        artworksConnection(first: 50, marketable: true, medium: "painting") {
          edges {
            node {
              internalID
              artistNames
              title
              date
              image {
                cropped(width: 200, height: 200) {
                  width
                  height
                  src
                  srcSet
                }
              }
            }
          }
        }
      }
    `,
  }
)
