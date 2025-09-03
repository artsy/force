import { ContextModule } from "@artsy/cohesion"
import { Box, Spacer } from "@artsy/palette"
import { getENV } from "Utils/getENV"
import type { ArtworkImageBrowser_artwork$data } from "__generated__/ArtworkImageBrowser_artwork.graphql"
import { scale } from "proportional-scale"
import type * as React from "react"
import { useMemo } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useCursor } from "use-cursor"
import { ArtworkActionsFragmentContainer as ArtworkActions } from "./ArtworkActions"
import { ArtworkImageBrowserLargeFragmentContainer } from "./ArtworkImageBrowserLarge"
import { ArtworkImageBrowserSmallFragmentContainer } from "./ArtworkImageBrowserSmall"

// Dimension used to scale both images and videos
export const MAX_DIMENSION = 800

interface ArtworkImageBrowserProps {
  artwork: ArtworkImageBrowser_artwork$data
  isMyCollectionArtwork?: boolean
}

export const ArtworkImageBrowser: React.FC<
  React.PropsWithChildren<ArtworkImageBrowserProps>
> = ({ artwork, isMyCollectionArtwork }) => {
  const { figures } = artwork

  // Calculate the default index first so it can be used to initialize the cursor
  const defaultIndex = useMemo(() => {
    const index = figures.findIndex(figure => {
      if (!("isDefault" in figure)) return false
      return !!figure.isDefault
    })

    return index === -1 ? 0 : index
  }, [figures])

  const {
    index: activeIndex,
    handleNext,
    handlePrev,
    setCursor,
  } = useCursor({
    max: figures.length,
    initialCursor: defaultIndex,
  })

  // Here we pre-emptively scale the figures to figure out which is going
  // to have the largest height. We use this to set a fixed height on the container
  // so that the UI doesn't shift around.
  const maxHeight = useMemo(() => {
    return Math.max(
      ...figures.map(figure => {
        switch (figure.__typename) {
          case "Image": {
            if (!figure.width || !figure.height) return MAX_DIMENSION

            return scale({
              width: figure.width,
              height: figure.height,
              maxWidth: MAX_DIMENSION,
              maxHeight: MAX_DIMENSION,
            }).height
          }

          case "Video": {
            return scale({
              width: figure.videoWidth,
              height: figure.videoHeight,
              maxWidth: MAX_DIMENSION,
              maxHeight: MAX_DIMENSION,
            }).height
          }

          default: {
            return MAX_DIMENSION
          }
        }
      }),
    )
  }, [figures])

  const handleSelectRoomViewableFigure = () => {
    setCursor(defaultIndex)
  }

  if ((figures ?? []).length === 0) {
    return null
  }

  const isMobile = getENV("IS_MOBILE")

  return (
    <Box
      // Keyed to the artwork ID so that state is reset on route changes
      key={artwork.internalID}
      data-test={ContextModule.artworkImage}
    >
      {isMobile ? (
        <ArtworkImageBrowserSmallFragmentContainer
          artwork={artwork}
          activeIndex={activeIndex}
          setActiveIndex={setCursor}
          maxHeight={maxHeight}
        />
      ) : (
        <ArtworkImageBrowserLargeFragmentContainer
          artwork={artwork}
          activeIndex={activeIndex}
          onNext={handleNext}
          onPrev={handlePrev}
          onChange={setCursor}
          maxHeight={maxHeight}
        />
      )}
      {!isMyCollectionArtwork && (
        <>
          <Spacer y={2} />

          <ArtworkActions
            artwork={artwork}
            selectRoomViewableFigure={handleSelectRoomViewableFigure}
          />
        </>
      )}
    </Box>
  )
}

export const ArtworkImageBrowserFragmentContainer = createFragmentContainer(
  ArtworkImageBrowser,
  {
    artwork: graphql`
      fragment ArtworkImageBrowser_artwork on Artwork
      @argumentDefinitions(
        includeAllImages: { type: "Boolean", defaultValue: false }
      ) {
        ...ArtworkActions_artwork
          @arguments(includeAllImages: $includeAllImages)
        ...ArtworkImageBrowserSmall_artwork
          @arguments(includeAllImages: $includeAllImages)
        ...ArtworkImageBrowserLarge_artwork
          @arguments(includeAllImages: $includeAllImages)
        internalID
        figures(includeAll: $includeAllImages) {
          __typename
          ... on Image {
            isDefault
            width
            height
          }
          ... on Video {
            # Fields need to be aliased to prevent conflicting types
            videoWidth: width
            videoHeight: height
          }
        }
      }
    `,
  },
)
