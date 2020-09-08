import { ArtworkImageBrowser_artwork } from "v2/__generated__/ArtworkImageBrowser_artwork.graphql"
import { BaseCarousel as Carousel } from "v2/Components/FlickityCarousel"
import { Lightbox } from "v2/Components/Lightbox"
import FlickityType from "flickity"
import React from "react"
import styled from "styled-components"
import { Media } from "v2/Utils/Responsive"

import { Box, ChevronIcon, Col, Flex, color, space } from "@artsy/palette"

interface ArtworkBrowserProps {
  imageAlt: string
  images: ArtworkImageBrowser_artwork["images"]
  setCarouselRef: (carouselRef: FlickityType) => void
}

type Image = ArtworkBrowserProps["images"][number]

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

export class LargeArtworkImageBrowser extends React.Component<
  ArtworkBrowserProps
> {
  render() {
    const hasMultipleImages = this.props.images.length > 1
    const { imageAlt, images, setCarouselRef } = this.props

    // FIXME: During SSR pass want to hide other images. Work around for lack
    // of SSR support in Flickity.
    const carouselImages = typeof window === "undefined" ? [images[0]] : images

    const options = {
      prevNextButtons: false,
      wrapAround: true,
      pageDots: hasMultipleImages,
      cellAlign: "left",
      draggable: false,
      lazyLoad: true,
    }

    // The maxHeight was added in order to fix how Google bot renders the page
    return (
      <Container key={Math.random()}>
        <Carousel
          showArrows={hasMultipleImages}
          options={options}
          oneSlideVisible
          height="auto"
          setCarouselRef={setCarouselRef}
          data={carouselImages}
          renderLeftArrow={({ flickity }) => (
            <Col sm={1}>
              <ArrowButton
                direction="left"
                onClick={() => {
                  // FIXME: Flickity.prototype.previous typing is missing second
                  // `isInstant` method.
                  // @ts-ignore
                  flickity.previous(false, true)
                }}
              />
            </Col>
          )}
          renderRightArrow={({ flickity }) => (
            <Col sm={1}>
              <ArrowButton
                direction="right"
                onClick={() => {
                  // FIXME: Flickity.prototype.next typing is missing second
                  // `isInstant` method.
                  // @ts-ignore
                  flickity.next(false, true)
                }}
              />
            </Col>
          )}
          // maxHeight is needed for google search indexing
          render={(image: Image) => {
            return (
              <Flex
                flexDirection="column"
                justifyContent="center"
                width="100%"
                px={hasMultipleImages ? [2, 2, 0] : 0}
                height="60vh"
                maxHeight="2000px"
              >
                <Lightbox
                  imageAlt={imageAlt}
                  deepZoom={image.deepZoom}
                  enabled={image.is_zoomable}
                  isDefault={image.is_default}
                  src={image.uri}
                  initialHeight="60vh"
                  maxHeight="2000px"
                />
              </Flex>
            )
          }}
        />
      </Container>
    )
  }
}

export class SmallArtworkImageBrowser extends React.Component<
  ArtworkBrowserProps
> {
  render() {
    const { images, imageAlt, setCarouselRef } = this.props
    // FIXME: During SSR pass want to hide other images. Work around for lack
    // of SSR support in Flickity.
    const carouselImages = typeof window === "undefined" ? [images[0]] : images
    const hasMultipleImages = this.props.images.length > 1
    const options = {
      prevNextButtons: false,
      wrapAround: true,
      draggable: hasMultipleImages,
      groupCells: 1,
      pageDots: hasMultipleImages,
    }

    // The maxHeight was added in order to fix how Google bot renders the page
    return (
      <Container key={Math.random()}>
        <Carousel
          options={options}
          data={carouselImages}
          oneSlideVisible
          setCarouselRef={setCarouselRef}
          render={(image: Image) => {
            return (
              <Flex
                flexDirection="column"
                justifyContent="center"
                px={1}
                width="100%"
              >
                <Lightbox
                  imageAlt={imageAlt}
                  deepZoom={image.deepZoom}
                  enabled={image.is_zoomable}
                  isDefault={image.is_default}
                  src={image.uri}
                  maxHeight="2000px"
                  initialHeight="45vh"
                />
              </Flex>
            )
          }}
        />
      </Container>
    )
  }
}

const ArrowButton = ({ direction, onClick }) => {
  return (
    <ArrowButtonContainer
      flexDirection="column"
      justifyContent="center"
      height="100%"
      alignItems={direction === "left" ? "flex-start" : "flex-end"}
      onClick={onClick}
    >
      <ChevronIcon direction={direction} width={30} height={30} />
    </ArrowButtonContainer>
  )
}

const ArrowButtonContainer = styled(Flex)`
  cursor: pointer;
  opacity: 0.1;
  transition: opacity 0.25s;

  &:hover {
    opacity: 1;
  }
`

const Container = styled(Box)`
  user-select: none;

  .flickity-viewport {
    overflow: hidden;
  }

  .flickity-slider > div {
    margin-left: 5px;
    margin-right: 5px;
    width: 100%;
  }

  .flickity-page-dots {
    text-align: center;
    height: 0;
    padding-top: ${space(1)}px;

    .dot {
      width: 4px;
      height: 4px;
      border-radius: 100%;
      display: inline-block;
      margin: ${space(0.5)}px;
      background-color: ${color("black10")};
    }

    .dot.is-selected {
      background-color: ${color("black100")};
    }
  }
`

const PageIndicator = styled.span`
  &::after {
    content: "•";
  }
`

// @ts-ignore
PageIndicator.displayName = "PageIndicator"
