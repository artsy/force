import React, { useState } from "react"
import {
  Box,
  Flex,
  Link,
  MediumCard,
  ProgressBar,
  Sans,
  Spacer,
} from "@artsy/palette"
import { Carousel } from "v2/Components/Carousel"
import { ViewingRoomsFeaturedRail_featuredViewingRooms } from "v2/__generated__/ViewingRoomsFeaturedRail_featuredViewingRooms.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { flowRight } from "lodash"
import { Arrow } from "../Routes/Works/Components/ViewingRoomCarousel"
import { getTagProps } from "../Components/ViewingRoomsLatestGrid"

interface ViewingRoomsFeaturedRailProps {
  featuredViewingRooms: ViewingRoomsFeaturedRail_featuredViewingRooms
}

export const ViewingRoomsFeaturedRail: React.FC<ViewingRoomsFeaturedRailProps> = props => {
  const featuredViewingRooms = props.featuredViewingRooms

  const featuredViewingRoomsForRail = featuredViewingRooms.edges
    .map(vr => {
      return vr.node ? vr.node : null
    })
    .filter(Boolean)

  const computeScrollPercent = selectedIndex =>
    ((selectedIndex + 1) / featuredViewingRoomsForRail.length) * 100
  const [scrollPercent, setScrollPercent] = useState(computeScrollPercent(0))
  const update = flowRight(setScrollPercent, computeScrollPercent)
  const showProgressBar = featuredViewingRoomsForRail.length > 1

  const CarouselHeight = 380
  const carouselItemRender = (
    {
      heroImageURL,
      slug,
      title,
      partner,
      status,
      distanceToOpen,
      distanceToClose,
    },
    slideIndex
  ) => {
    const tag = getTagProps(status, distanceToOpen, distanceToClose)
    return (
      <Flex flexDirection="row">
        {slideIndex !== 0 && <Spacer ml="15px" />}
        <Link href={`/viewing-room/${slug}`} key={slug} noUnderline>
          <MediumCard
            image={heroImageURL}
            title={title}
            subtitle={partner.name}
            tag={tag}
          />
        </Link>
      </Flex>
    )
  }

  return (
    featuredViewingRoomsForRail.length > 0 && (
      <Box>
        <Sans size="5">Featured</Sans>
        <Box width="100%">
          <Flex
            height={CarouselHeight}
            // maxWidth={breakpoints.lg}
            m="auto"
            my={2}
            position="relative"
            justifyContent="left"
          >
            <Carousel
              options={{
                cellAlign: "center",
                draggable: showProgressBar,
                freeScroll: true,
                groupCells: 1,
                pageDots: false,
              }}
              data={featuredViewingRoomsForRail}
              height={CarouselHeight}
              onDragEnd={({ flickity }) => update(flickity.selectedIndex)}
              render={carouselItemRender}
              renderLeftArrow={({ currentSlideIndex, flickity }) => {
                const opacity = currentSlideIndex === 0 ? 0 : 1
                return (
                  <Arrow
                    direction="left"
                    opacity={opacity}
                    onClick={() => {
                      flickity.previous()
                      update(flickity.selectedIndex)
                    }}
                  />
                )
              }}
              renderRightArrow={({ currentSlideIndex, flickity }) => {
                const opacity =
                  currentSlideIndex === featuredViewingRoomsForRail.length - 1
                    ? 0
                    : 1
                return (
                  <Arrow
                    direction="right"
                    opacity={opacity}
                    onClick={() => {
                      flickity.next()
                      update(flickity.selectedIndex)
                    }}
                  />
                )
              }}
            />
          </Flex>
          {showProgressBar && (
            <Box maxWidth={["100%", 470]} mx={[2, "auto"]}>
              <ProgressBar
                highlight="black100"
                percentComplete={scrollPercent}
                transition="width .30s ease-out"
              />
            </Box>
          )}
        </Box>
      </Box>
    )
  )
}
export const ViewingRoomsFeaturedRailFragmentContainer = createFragmentContainer(
  ViewingRoomsFeaturedRail,
  {
    featuredViewingRooms: graphql`
      fragment ViewingRoomsFeaturedRail_featuredViewingRooms on ViewingRoomConnection {
        edges {
          node {
            status
            slug
            title
            heroImageURL
            distanceToOpen(short: true)
            distanceToClose(short: true)
            partner {
              name
            }
          }
        }
      }
    `,
  }
)

export default ViewingRoomsFeaturedRailFragmentContainer
