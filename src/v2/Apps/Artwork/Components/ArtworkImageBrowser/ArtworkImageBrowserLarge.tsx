import {
  Box,
  ChevronIcon,
  Clickable,
  ProgressDots,
  VisuallyHidden,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { ArtworkLightboxFragmentContainer } from "../ArtworkLightbox"
import { ArtworkImageBrowserLarge_artwork } from "v2/__generated__/ArtworkImageBrowserLarge_artwork.graphql"
import { useNextPrevious } from "v2/Utils/Hooks/useNextPrevious"
import { DeepZoomFragmentContainer, useDeepZoom } from "v2/Components/DeepZoom"
import { ArtworkVideoPlayerFragmentContainer } from "../ArtworkVideoPlayer"
interface ArtworkImageBrowserLargeProps {
  artwork: ArtworkImageBrowserLarge_artwork
  index: number
  onNext(): void
  onPrev(): void
}

const ArtworkImageBrowserLarge: React.FC<ArtworkImageBrowserLargeProps> = ({
  artwork,
  index,
  onNext,
  onPrev,
}) => {
  const { figures } = artwork

  const activeFigure = figures[index]

  const { showDeepZoom, hideDeepZoom, isDeepZoomVisible } = useDeepZoom()

  const { containerRef } = useNextPrevious({ onNext, onPrevious: onPrev })

  if (figures.length === 0) {
    return null
  }

  return (
    <>
      {activeFigure.type === "Image" && isDeepZoomVisible && (
        <DeepZoomFragmentContainer
          image={activeFigure}
          onClose={hideDeepZoom}
        />
      )}

      <Box ref={containerRef as any} position="relative">
        {figures.length > 1 && (
          <nav>
            <NextPrevious
              onClick={onPrev}
              aria-label="Previous image"
              left={0}
              p={2}
            >
              <ChevronIcon
                direction="left"
                // @ts-ignore
                fill="currentColor"
                width={30}
                height={30}
                aria-hidden
              />
            </NextPrevious>

            <NextPrevious
              onClick={onNext}
              aria-label="Next image"
              right={0}
              p={2}
            >
              <ChevronIcon
                direction="right"
                // @ts-ignore
                fill="currentColor"
                width={30}
                height={30}
                aria-hidden
              />
            </NextPrevious>
          </nav>
        )}

        {activeFigure.type === "Image" && (
          <ArtworkLightboxFragmentContainer
            my={2}
            artwork={artwork}
            activeIndex={index}
            onClick={activeFigure.isZoomable ? showDeepZoom : undefined}
          />
        )}

        {activeFigure.type === "Video" && (
          <ArtworkVideoPlayerFragmentContainer
            activeIndex={index}
            artwork={artwork}
          />
        )}

        {figures.length > 1 && (
          <>
            <VisuallyHidden aria-live="polite" aria-atomic="true">
              Page {index + 1} of {figures.length}
            </VisuallyHidden>

            <ProgressDots
              activeIndex={index}
              amount={figures.length}
              variant="dash"
            />
          </>
        )}
      </Box>
    </>
  )
}

const NextPrevious = styled(Clickable)`
  position: absolute;
  top: 20%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${themeGet("colors.black30")};
  transition: color 250ms;
  z-index: 1;

  &:hover {
    color: ${themeGet("colors.black100")};
  }
`

export const ArtworkImageBrowserLargeFragmentContainer = createFragmentContainer(
  ArtworkImageBrowserLarge,
  {
    artwork: graphql`
      fragment ArtworkImageBrowserLarge_artwork on Artwork {
        ...ArtworkLightbox_artwork
        ...ArtworkVideoPlayer_artwork
        figures {
          ... on Image {
            type: __typename
            internalID
            isZoomable
            ...DeepZoom_image
          }
          ... on Video {
            type: __typename
          }
        }
      }
    `,
  }
)
