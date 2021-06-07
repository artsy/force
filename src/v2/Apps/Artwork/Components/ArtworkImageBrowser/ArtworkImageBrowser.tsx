import { ArtworkImageBrowser_artwork } from "v2/__generated__/ArtworkImageBrowser_artwork.graphql"
import { Lightbox } from "v2/Components/Lightbox"
import React, { useState } from "react"
import { Media } from "v2/Utils/Responsive"
import {
  Box,
  ChevronIcon,
  Clickable,
  ProgressDots,
  Swiper,
  SwiperCell,
  SwiperCellProps,
  SwiperRail,
  SwiperRailProps,
  VisuallyHidden,
} from "@artsy/palette"
import { useCursor } from "use-cursor"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"
import { compact } from "lodash"

interface ArtworkBrowserProps {
  imageAlt?: string | null
  images: ArtworkImageBrowser_artwork["images"]
}

export const ArtworkImageBrowser = (props: ArtworkBrowserProps) => {
  return (
    <>
      <Media at="xs">
        <SmallArtworkImageBrowser {...props} />
      </Media>

      <Media greaterThan="xs">
        <LargeArtworkImageBrowser {...props} />
      </Media>
    </>
  )
}

export const LargeArtworkImageBrowser: React.FC<ArtworkBrowserProps> = ({
  imageAlt,
  images: _images,
}) => {
  const images = compact(_images)

  const { index, handleNext, handlePrev } = useCursor({ max: images.length })

  if (images.length === 0) {
    return null
  }

  const image = images[index]

  return (
    <Box position="relative">
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

      <Box p={2}>
        <Lightbox
          imageAlt={imageAlt}
          deepZoom={image.deepZoom}
          enabled={image.is_zoomable}
          isDefault={image.is_default}
          src={image.uri}
          maxHeight="2000px"
          initialHeight="60vh"
        />
      </Box>

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

  &:hover {
    color: ${themeGet("colors.black100")};
  }
`

const SmallArtworkImageBrowser: React.FC<ArtworkBrowserProps> = ({
  imageAlt,
  images: _images,
}) => {
  const [index, setIndex] = useState(0)
  const images = compact(_images)

  if (images.length === 0) {
    return null
  }

  return (
    <>
      <Swiper snap="center" onChange={setIndex} Cell={Cell} Rail={Rail}>
        {images.map((image, i) => {
          return (
            <Lightbox
              key={i}
              imageAlt={imageAlt}
              deepZoom={image.deepZoom}
              enabled={image.is_zoomable}
              isDefault={image.is_default}
              src={image.uri}
              maxHeight="2000px"
              initialHeight="45vh"
            />
          )
        })}
      </Swiper>

      {images.length > 1 && (
        <ProgressDots
          variant="dash"
          amount={images.length}
          activeIndex={index}
        />
      )}
    </>
  )
}

const Cell: React.ForwardRefExoticComponent<SwiperCellProps> = React.forwardRef(
  (props, ref) => {
    return (
      <SwiperCell
        {...props}
        ref={ref as any}
        display="inline-flex"
        width="100%"
        verticalAlign="top"
        justifyContent="center"
        pr={0}
        p={2}
      />
    )
  }
)

const Rail: React.FC<SwiperRailProps> = props => {
  return <SwiperRail {...props} display="block" />
}
