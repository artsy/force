import ChevronLeftIcon from "@artsy/icons/ChevronLeftIcon"
import ChevronRightIcon from "@artsy/icons/ChevronRightIcon"
import { Box, Clickable, ProgressDots, Spacer } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { ArtworkLightboxFragmentContainer } from "Apps/Artwork/Components/ArtworkLightbox"
import { ArtworkVideoPlayerFragmentContainer } from "Apps/Artwork/Components/ArtworkVideoPlayer"
import { DeepZoomFragmentContainer, useDeepZoom } from "Components/DeepZoom"
import { useDetectActivity } from "Utils/Hooks/useDetectActivity"
import { useNextPrevious } from "Utils/Hooks/useNextPrevious"
import { isTouch } from "Utils/device"
import type { ArtworkImageBrowserLarge_artwork$data } from "__generated__/ArtworkImageBrowserLarge_artwork.graphql"
import type * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"

interface ArtworkImageBrowserLargeProps {
  artwork: ArtworkImageBrowserLarge_artwork$data
  activeIndex: number
  onNext(): void
  onPrev(): void
  onChange(index: number): void
  maxHeight: number
}

const ArtworkImageBrowserLarge: React.FC<
  React.PropsWithChildren<ArtworkImageBrowserLargeProps>
> = ({ artwork, activeIndex, onNext, onPrev, onChange, maxHeight }) => {
  const { figures } = artwork

  const activeFigure = figures[activeIndex]

  const { showDeepZoom, hideDeepZoom, isDeepZoomVisible } = useDeepZoom()

  const { containerRef } = useNextPrevious({ onNext, onPrevious: onPrev })

  const { detectActivityProps, isActive } = useDetectActivity()

  const isNavVisible = isActive || isTouch

  if (figures.length === 0) {
    return null
  }

  return (
    <>
      {activeFigure.__typename === "Image" && isDeepZoomVisible && (
        <DeepZoomFragmentContainer
          image={activeFigure}
          onClose={hideDeepZoom}
        />
      )}

      <Box
        ref={containerRef as any}
        position="relative"
        bg="mono0"
        {...detectActivityProps}
      >
        {figures.length > 1 && (
          <nav>
            <NextPrevious
              onClick={onPrev}
              aria-label="Previous image"
              left={0}
              p={2}
              style={{ opacity: isNavVisible ? 1 : 0 }}
            >
              <ChevronLeftIcon
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
              style={{ opacity: isNavVisible ? 1 : 0 }}
            >
              <ChevronRightIcon
                fill="currentColor"
                width={30}
                height={30}
                aria-hidden
              />
            </NextPrevious>
          </nav>
        )}

        {activeFigure.__typename === "Image" && (
          <ArtworkLightboxFragmentContainer
            maxHeight={maxHeight}
            artwork={artwork}
            activeIndex={
              artwork.isSetVideoAsCover ? activeIndex - 1 : activeIndex
            }
            onClick={activeFigure.isZoomable ? showDeepZoom : undefined}
          />
        )}

        {activeFigure.__typename === "Video" && (
          <ArtworkVideoPlayerFragmentContainer
            maxHeight={maxHeight}
            activeIndex={activeIndex}
            artwork={artwork}
          />
        )}

        <Spacer y={2} />

        {figures.length > 1 && (
          <ProgressDots
            activeIndex={activeIndex}
            amount={figures.length}
            variant="dash"
            onClick={onChange}
          />
        )}
      </Box>
    </>
  )
}

export const ArtworkImageBrowserLargeFragmentContainer =
  createFragmentContainer(ArtworkImageBrowserLarge, {
    artwork: graphql`
      fragment ArtworkImageBrowserLarge_artwork on Artwork
      @argumentDefinitions(
        includeAllImages: { type: "Boolean", defaultValue: false }
      ) {
        ...ArtworkLightbox_artwork
          @arguments(includeAllImages: $includeAllImages)
        ...ArtworkVideoPlayer_artwork
          @arguments(includeAllImages: $includeAllImages)
        isSetVideoAsCover
        figures(includeAll: $includeAllImages) {
          ... on Image {
            ...DeepZoom_image
            __typename
            internalID
            isZoomable
          }
          ... on Video {
            __typename
          }
        }
      }
    `,
  })

const NextPrevious = styled(Clickable)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${themeGet("colors.mono60")};
  mix-blend-mode: difference;
  transition:
    color 250ms,
    opacity 250ms;
  z-index: 1;

  &:hover,
  &:focus,
  &:focus-visible {
    outline: none;
    color: ${themeGet("colors.mono10")};
  }
`
