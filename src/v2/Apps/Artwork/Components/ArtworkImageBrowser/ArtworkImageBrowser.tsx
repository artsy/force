import { ArtworkImageBrowser_artwork } from "v2/__generated__/ArtworkImageBrowser_artwork.graphql"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArtworkActionsFragmentContainer as ArtworkActions } from "./ArtworkActions"
import { Box, Spacer } from "@artsy/palette"
import { ContextModule } from "@artsy/cohesion"
import { ArtworkImageBrowserLargeFragmentContainer } from "./ArtworkImageBrowserLarge"
import { ArtworkImageBrowserSmallFragmentContainer } from "./ArtworkImageBrowserSmall"
import { Media } from "v2/Utils/Responsive"
import { useCursor } from "use-cursor"
import { compact } from "lodash"
import { scale } from "proportional-scale"

const MAX_DIMENSION = 800

export interface ArtworkImageBrowserProps {
  artwork: ArtworkImageBrowser_artwork
}

export const ArtworkImageBrowser: React.FC<ArtworkImageBrowserProps> = ({
  artwork,
}) => {
  const { figures } = artwork

  const { index, handleNext, handlePrev, setCursor } = useCursor({
    max: figures.length,
  })

  const images = compact(artwork.images)
  const hasGeometry = !!images[0].width
  const maxHeight = Math.max(
    ...images.map(image => {
      const scaled = scale({
        width: image.width!,
        height: image.height!,
        maxWidth: MAX_DIMENSION,
        maxHeight: MAX_DIMENSION,
      })

      return hasGeometry ? scaled.height : MAX_DIMENSION
    })
  )

  const handleSelectDefaultSlide = () => {
    const defaultIndex = figures?.findIndex(image => !!image?.isDefault) ?? 0
    setCursor(defaultIndex)
  }

  if ((figures ?? []).length === 0) {
    return null
  }

  return (
    <Box
      // Keyed to the artwork ID so that state is reset on route changes
      key={artwork.internalID}
      data-test={ContextModule.artworkImage}
    >
      <Media at="xs">
        <ArtworkImageBrowserSmallFragmentContainer
          artwork={artwork}
          index={index}
          setIndex={setCursor}
          maxHeight={maxHeight}
        />
      </Media>

      <Media greaterThan="xs">
        <ArtworkImageBrowserLargeFragmentContainer
          artwork={artwork}
          index={index}
          onNext={handleNext}
          onPrev={handlePrev}
          maxHeight={maxHeight}
        />
      </Media>

      <Spacer mt={2} />

      <ArtworkActions
        artwork={artwork}
        selectDefaultSlide={handleSelectDefaultSlide}
      />
    </Box>
  )
}

export const ArtworkImageBrowserFragmentContainer = createFragmentContainer<
  ArtworkImageBrowserProps
>(ArtworkImageBrowser, {
  artwork: graphql`
    fragment ArtworkImageBrowser_artwork on Artwork {
      ...ArtworkActions_artwork
      ...ArtworkImageBrowserSmall_artwork
      ...ArtworkImageBrowserLarge_artwork
      internalID
      images {
        width
        height
      }
      figures {
        ... on Image {
          internalID
          isDefault
        }
        ... on Video {
          type: __typename
        }
      }
    }
  `,
})
