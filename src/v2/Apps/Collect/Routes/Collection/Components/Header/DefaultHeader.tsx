import { Box, space } from "@artsy/palette"
import { DefaultHeader_headerArtworks } from "v2/__generated__/DefaultHeader_headerArtworks.graphql"
import React, { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { useWindowSize } from "v2/Utils/Hooks/useWindowSize"
import { Media } from "v2/Utils/Responsive"
import { Writable } from "v2/Utils/typeSupport"
import { DefaultHeaderArtworkFragmentContainer as DefaultHeaderArtwork } from "./DefaultHeaderArtwork"

const Rail = styled(Box)`
  display: flex;
  flex-direction: row;
  overflow: hidden;
`

export const fitHeaderArtworks = (
  artworks: DefaultHeader_headerArtworks["edges"],
  headerWidth: number,
  isSmallViewport: boolean
): DefaultHeader_headerArtworks["edges"] => {
  if (artworks.length < 1) return []

  // Initially render all the artworks
  if (headerWidth === 0) return artworks

  // Once we have a viewport width, possibly pad them out to fill out the remaining width,
  // or trim them to fit (which is largely unnecessary but left alone here for simplicity).
  let artworkWidths = 0
  const headerArtworks: Writable<DefaultHeader_headerArtworks["edges"]> = []

  while (true) {
    for (const artwork of artworks) {
      headerArtworks.push(artwork)

      if (artworkWidths > headerWidth) {
        return headerArtworks
      }

      if (!artwork.node.image) continue

      isSmallViewport
        ? (artworkWidths += artwork.node.image.small.width + space(1))
        : (artworkWidths += artwork.node.image.large.width + space(1))
    }
  }
}

export interface CollectionDefaultHeaderProps {
  headerArtworks: DefaultHeader_headerArtworks
  collectionId: string
  collectionSlug: string
}

export const CollectionDefaultHeader: FC<CollectionDefaultHeaderProps> = ({
  headerArtworks,
  collectionId,
  collectionSlug,
}) => {
  const { width: viewportWidth } = useWindowSize()

  if (headerArtworks.edges.length === 0) return null

  const largeArtworks = fitHeaderArtworks(
    headerArtworks.edges,
    viewportWidth,
    false
  )

  const smallArtworks = fitHeaderArtworks(
    headerArtworks.edges,
    viewportWidth,
    true
  )

  return (
    <Box my={[0, 0, 2]}>
      <Media greaterThanOrEqual="md">
        <Rail>
          {largeArtworks.map(artwork => (
            <DefaultHeaderArtwork
              key={artwork.node.id}
              artwork={artwork}
              collectionId={collectionId}
              collectionSlug={collectionSlug}
            />
          ))}
        </Rail>
      </Media>

      <Media lessThan="md">
        <Rail>
          {smallArtworks.map(artwork => (
            <DefaultHeaderArtwork
              key={artwork.node.id}
              artwork={artwork}
              collectionId={collectionId}
              collectionSlug={collectionSlug}
              small
            />
          ))}
        </Rail>
      </Media>
    </Box>
  )
}

export const CollectionDefaultHeaderFragmentContainer = createFragmentContainer(
  CollectionDefaultHeader,
  {
    headerArtworks: graphql`
      fragment DefaultHeader_headerArtworks on FilterArtworksConnection {
        edges {
          node {
            id
            image {
              # TODO: Should accept arguments
              large: resized(height: 230) {
                width
                height
              }
              small: resized(height: 160) {
                width
                height
              }
            }
          }
          ...DefaultHeaderArtwork_artwork
        }
      }
    `,
  }
)
