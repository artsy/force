import { ArtworkImageBrowser_artwork } from "v2/__generated__/ArtworkImageBrowser_artwork.graphql"
import { ArtworkImageBrowserQuery } from "v2/__generated__/ArtworkImageBrowserQuery.graphql"
import { SystemContext } from "v2/Artsy"
import { renderWithLoadProgress } from "v2/Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import React, { useContext, useState } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkActionsFragmentContainer as ArtworkActions } from "./ArtworkActions"
import { ArtworkImageBrowser } from "./ArtworkImageBrowser"
import { Box, Spacer } from "@artsy/palette"
import { ContextModule } from "@artsy/cohesion"

export interface ImageBrowserProps {
  artwork: ArtworkImageBrowser_artwork
}

export const ArtworkImageBrowserContainer: React.FC<ImageBrowserProps> = ({
  artwork,
}) => {
  const { images, image_alt } = artwork

  // Rather than lift state up to reset the carousel to the first slide, just
  // re-render it to reset the state.
  const [key, setKey] = useState(0)
  const handleSelectDefaultSlide = () => {
    return setKey(prevKey => prevKey + 1)
  }

  if ((images ?? []).length === 0) {
    return null
  }

  return (
    <Box data-test={ContextModule.artworkImage}>
      <ArtworkImageBrowser key={key} images={images} imageAlt={image_alt} />

      <Spacer mt={2} />

      <ArtworkActions
        artwork={artwork}
        selectDefaultSlide={handleSelectDefaultSlide}
      />
    </Box>
  )
}

export const ArtworkImageBrowserFragmentContainer = createFragmentContainer<
  ImageBrowserProps
>(ArtworkImageBrowserContainer, {
  artwork: graphql`
    fragment ArtworkImageBrowser_artwork on Artwork {
      image_alt: formattedMetadata
      ...ArtworkActions_artwork
      images {
        internalID
        uri: url(version: ["large"])
        placeholder: resized(width: 30, height: 30, version: "small") {
          url
        }
        aspectRatio: aspectRatio
        is_zoomable: isZoomable
        is_default: isDefault
        deepZoom: deepZoom {
          Image {
            xmlns
            Url
            Format
            TileSize
            Overlap
            Size {
              Width
              Height
            }
          }
        }
      }
    }
  `,
})

export const ArtworkImageBrowserQueryRenderer = ({
  artworkID,
}: {
  artworkID: string
}) => {
  const { relayEnvironment } = useContext(SystemContext)

  return (
    <QueryRenderer<ArtworkImageBrowserQuery>
      environment={relayEnvironment}
      variables={{ artworkID }}
      query={graphql`
        query ArtworkImageBrowserQuery($artworkID: String!) {
          artwork(id: $artworkID) {
            ...ArtworkImageBrowser_artwork
          }
        }
      `}
      render={renderWithLoadProgress(ArtworkImageBrowserFragmentContainer)}
    />
  )
}
