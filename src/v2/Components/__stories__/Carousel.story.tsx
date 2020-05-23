import { ContextModule } from "@artsy/cohesion"
import { Box, Flex, Image } from "@artsy/palette"
import { artworkBricks, images } from "v2/Apps/__tests__/Fixtures/Carousel"
import { FillwidthItem } from "v2/Components/Artwork/FillwidthItem"
import React from "react"
import { storiesOf } from "storybook/storiesOf"

import { Carousel, LargeCarousel, SmallCarousel } from "v2/Components/Carousel"
import { MockRelayRenderer } from "v2/DevTools"
import { graphql } from "react-relay"

const MockFillWidthItem = ({ artwork }) => {
  const {
    image: { aspect_ratio },
  } = artwork
  return (
    <MockRelayRenderer
      Component={() => (
        <FillwidthItem
          artwork={artwork}
          targetHeight={200}
          imageHeight={200}
          width={200 * aspect_ratio}
          margin={20}
          contextModule={ContextModule.header}
        />
      )}
      mockData={{ artwork }}
      query={graphql`
        query CarouselArtworkBrickStoryQuery {
          artwork(id: "unused") {
            ...FillwidthItem_artwork
          }
        }
      `}
    />
  )
}

storiesOf("Styleguide/Components/Carousel", module)
  .add("Responsive Carousel", () => {
    return (
      <Container>
        <Carousel
          data={images}
          render={props => {
            return (
              <Image
                px={5}
                src={props.resized.url}
                width={props.resized.width}
                height={props.resized.height}
              />
            )
          }}
        />
      </Container>
    )
  })

  .add("Small Carousel", () => {
    return (
      <Container width="50%">
        <SmallCarousel
          data={images}
          render={props => {
            return (
              <Image
                px={5}
                src={props.resized.url}
                width={props.resized.width}
                height={props.resized.height}
              />
            )
          }}
        />
      </Container>
    )
  })

  .add("Large Carousel", () => {
    return (
      <Container>
        <LargeCarousel
          data={images}
          height="300px"
          render={props => {
            return (
              <Image
                px={5}
                src={props.resized.url}
                width={props.resized.width}
                height={props.resized.height}
              />
            )
          }}
        />
      </Container>
    )
  })

  .add("Large Carousel with WrapAround", () => {
    return (
      <Container width="70%">
        <LargeCarousel
          showArrows
          data={images}
          height="300px"
          options={{ wrapAround: true }}
          render={props => {
            return (
              <Image
                px={5}
                src={props.resized.url}
                width={props.resized.width}
                height={props.resized.height}
              />
            )
          }}
        />
      </Container>
    )
  })

  .add("Carousel with ArtworkBricks", () => {
    return (
      <Container>
        <Carousel
          data={artworkBricks}
          render={artwork => {
            return <MockFillWidthItem artwork={artwork.node} />
          }}
        />
      </Container>
    )
  })

  .add("Custom arrows with defaults", () => {
    return (
      <Container>
        <Carousel
          data={images}
          render={props => {
            return (
              <Image
                px={5}
                src={props.resized.url}
                width={props.resized.width}
                height={props.resized.height}
              />
            )
          }}
          renderLeftArrow={({ Arrow }) => {
            return (
              <Box top={10} position="relative" bg="black10">
                <Arrow />
              </Box>
            )
          }}
          renderRightArrow={({ Arrow }) => {
            return (
              <Box top={10} position="relative" bg="black10">
                <Arrow />
              </Box>
            )
          }}
        />
      </Container>
    )
  })

  .add("Custom arrows", () => {
    return (
      <Container>
        <Carousel
          data={images}
          render={props => {
            return (
              <Image
                px={5}
                src={props.resized.url}
                width={props.resized.width}
                height={props.resized.height}
              />
            )
          }}
          renderLeftArrow={({ flickity }) => {
            return (
              <Box
                onClick={() => {
                  flickity.previous()
                }}
              >
                Prev
              </Box>
            )
          }}
          renderRightArrow={({ flickity }) => {
            return (
              <Box
                onClick={() => {
                  flickity.next()
                }}
              >
                Next
              </Box>
            )
          }}
        />
      </Container>
    )
  })

  .add("Arrow onClick callback function", () => {
    return (
      <Container>
        <Carousel
          data={images}
          render={(props, slideIndex) => {
            return (
              <Box
                onClick={() => {
                  console.log("Clicking slide", slideIndex)
                }}
              >
                <Image
                  px={5}
                  src={props.resized.url}
                  width={props.resized.width}
                  height={props.resized.height}
                />
              </Box>
            )
          }}
          onArrowClick={({ state }) => {
            console.log("Slide #", state.currentSlideIndex)
          }}
          renderLeftArrow={({ flickity, Arrow }) => {
            return <Arrow />
          }}
          renderRightArrow={({ Arrow }) => {
            return <Arrow />
          }}
        />
      </Container>
    )
  })

const Container = ({ children, ...props }) => {
  return (
    <Flex width="100%" justifyContent="center">
      <Box width="70%" {...props}>
        {children}
      </Box>
    </Flex>
  )
}
