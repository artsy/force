import { ArtworkImageBrowser_artwork } from "v2/__generated__/ArtworkImageBrowser_artwork.graphql"
import { ArtworkImageBrowserQuery } from "v2/__generated__/ArtworkImageBrowserQuery.graphql"
import { SystemContext } from "v2/Artsy"
import { renderWithLoadProgress } from "v2/Artsy/Relay/renderWithLoadProgress"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import React, { useContext } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkActionsFragmentContainer as ArtworkActions } from "./ArtworkActions"
import { ArtworkImageBrowser } from "./ArtworkImageBrowser"
import { Box } from "@artsy/palette"
import { ContextModule } from "@artsy/cohesion"

export interface ImageBrowserProps {
  artwork: ArtworkImageBrowser_artwork
}

export class ArtworkImageBrowserContainer extends React.Component<
  ImageBrowserProps
  > {
  carousel = null

  render() {
    const { images, image, image_alt } = this.props.artwork
    if (!images.length) {
      return null
    }

    const defaultImageIndex = images.findIndex(
      e => e.internalID === image.internalID
    )
    return (
      <Box data-test={ContextModule.artworkImage}>
        <ArtworkImageBrowser
          setCarouselRef={f => (this.carousel = f)}
          images={images}
          imageAlt={image_alt}
        />
        <ArtworkActions
          selectDefaultSlide={() => {
            this.carousel.select(defaultImageIndex, false, true)
          }}
          artwork={this.props.artwork}
        />
      </Box>
    )
  }
}

export const ArtworkImageBrowserFragmentContainer = createFragmentContainer<
  ImageBrowserProps
>(ArtworkImageBrowserContainer, {
  artwork: graphql`
    fragment ArtworkImageBrowser_artwork on Artwork {
      image_alt: formattedMetadata
      ...ArtworkActions_artwork
      image {
        internalID
      }
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
