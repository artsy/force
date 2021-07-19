import {
  Box,
  ChevronIcon,
  Clickable,
  ProgressDots,
  VisuallyHidden,
} from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { compact } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { useCursor } from "use-cursor"
import { ArtworkLightboxFragmentContainer } from "../ArtworkLightbox"
import { ArtworkImageBrowserLarge_artwork } from "v2/__generated__/ArtworkImageBrowserLarge_artwork.graphql"
import { useNextPrevious } from "v2/Utils/Hooks/useNextPrevious"
import { DeepZoom } from "v2/Components/DeepZoom"

interface ArtworkImageBrowserLargeProps {
  artwork: ArtworkImageBrowserLarge_artwork
}

const ArtworkImageBrowserLarge: React.FC<ArtworkImageBrowserLargeProps> = ({
  artwork,
}) => {
  const images = compact(artwork.images)
  const { index, handleNext, handlePrev } = useCursor({ max: images.length })
  const activeImage = images[index]

  const { containerRef } = useNextPrevious({
    onNext: handleNext,
    onPrevious: handlePrev,
  })

  if (images.length === 0) {
    return null
  }

  return (
    <Box ref={containerRef as any} position="relative">
      {images.length > 1 && (
        <nav>
          <NextPrevious
            onClick={handlePrev}
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
            onClick={handleNext}
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

      <DeepZoom deepZoom={activeImage.deepZoom}>
        {({ onShow }) => {
          return (
            <ArtworkLightboxFragmentContainer
              my={2}
              artwork={artwork}
              activeIndex={index}
              onClick={activeImage.isZoomable ? onShow : undefined}
            />
          )
        }}
      </DeepZoom>

      {images.length > 1 && (
        <>
          <VisuallyHidden aria-live="polite" aria-atomic="true">
            Page {index + 1} of {images.length}
          </VisuallyHidden>

          <ProgressDots
            activeIndex={index}
            amount={images.length}
            variant="dash"
          />
        </>
      )}
    </Box>
  )
}

const NextPrevious = styled(Clickable)`
  position: absolute;
  top: 0;
  height: 100%;
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
        images {
          internalID
          # TODO: Move to deepZoom component
          isZoomable
          deepZoom {
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
  }
)
