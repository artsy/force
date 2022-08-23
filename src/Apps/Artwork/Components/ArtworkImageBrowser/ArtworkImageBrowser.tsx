import { ContextModule } from "@artsy/cohesion"
import { Box, Flex, ResponsiveBox, Spacer } from "@artsy/palette"
import { compact } from "lodash"
import { scale } from "proportional-scale"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useCursor } from "use-cursor"
import { Media } from "Utils/Responsive"
import { ArtworkImageBrowser_artwork } from "__generated__/ArtworkImageBrowser_artwork.graphql"
import { ArtworkActionsFragmentContainer as ArtworkActions } from "./ArtworkActions"
import { ArtworkImageBrowserLargeFragmentContainer } from "./ArtworkImageBrowserLarge"
import { ArtworkImageBrowserSmallFragmentContainer } from "./ArtworkImageBrowserSmall"
import { ArtworkNoImageComponent } from "./ArtworkNoImageComponent"

const MAX_DIMENSION = 800

export interface ArtworkImageBrowserProps {
  artwork: ArtworkImageBrowser_artwork
  isMyCollectionArtwork?: boolean
}

export const ArtworkImageBrowser: React.FC<ArtworkImageBrowserProps> = ({
  artwork,
  isMyCollectionArtwork,
}) => {
  const { figures } = artwork

  const { index, handleNext, handlePrev, setCursor } = useCursor({
    max: figures.length,
  })

  const images = compact(artwork.images)
  const hasGeometry = !!images[0]?.width
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
    return (
      <>
        <Media greaterThanOrEqual="md">
          <Flex justifyContent="center">
            <ResponsiveBox
              data-testid="artwork-browser-no-image-box"
              bg="black10"
              mx={[0, 2, 4]}
              maxWidth={600}
              aspectWidth={1}
              aspectHeight={1}
            >
              <ArtworkNoImageComponent
                artworkID={artwork.internalID}
                isMyCollectionArtwork={isMyCollectionArtwork}
              />
            </ResponsiveBox>
          </Flex>
        </Media>

        <Media lessThan="md">
          <Flex justifyContent="center">
            <ResponsiveBox
              data-testid="artwork-browser-no-image-box"
              bg="black10"
              mx={[0, 2, 4]}
              maxWidth="100%"
              aspectWidth={1}
              aspectHeight={1}
            >
              <ArtworkNoImageComponent
                artworkID={artwork.internalID}
                isMyCollectionArtwork={isMyCollectionArtwork}
              />
            </ResponsiveBox>
          </Flex>
        </Media>
      </>
    )
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
      {!isMyCollectionArtwork && (
        <>
          <Spacer mt={2} />

          <ArtworkActions
            artwork={artwork}
            selectDefaultSlide={handleSelectDefaultSlide}
          />
        </>
      )}
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
