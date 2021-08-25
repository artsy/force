import React from "react"
import { Box, Flex, Link, MediumCard, Sans, Spacer } from "@artsy/palette"
import { ViewingRoomsFeaturedRail_featuredViewingRooms } from "v2/__generated__/ViewingRoomsFeaturedRail_featuredViewingRooms.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomCarousel } from "./ViewingRoomCarousel"
import { getTagProps } from "v2/Components/ViewingRoomCard"
import { cropped } from "v2/Utils/resized"
import { extractNodes } from "../../../Utils/extractNodes"

interface ViewingRoomsFeaturedRailProps {
  featuredViewingRooms: ViewingRoomsFeaturedRail_featuredViewingRooms
}

export const ViewingRoomsFeaturedRail: React.FC<ViewingRoomsFeaturedRailProps> = props => {
  const featuredViewingRooms = props.featuredViewingRooms

  const featuredViewingRoomsForRail = extractNodes(featuredViewingRooms)

  const numFeaturedViewingRooms = featuredViewingRoomsForRail.length

  if (numFeaturedViewingRooms === 0) {
    return null
  }

  const carouselItemRender = (
    { image, slug, title, partner, status, distanceToOpen, distanceToClose },
    slideIndex: number
  ): React.ReactElement => {
    const tag = getTagProps(status, distanceToOpen, distanceToClose)
    const sized = cropped(image?.imageURLs?.normalized, {
      height: 370,
      width: 280,
    })

    return (
      <Flex flexDirection="row">
        {slideIndex !== 0 && <Spacer ml="15px" />}
        <Link href={`/viewing-room/${slug}`} key={slug} noUnderline>
          <MediumCard
            image={sized}
            title={title}
            subtitle={partner.name}
            // @ts-expect-error STRICT_NULL_CHECK
            tag={tag}
          />
        </Link>
      </Flex>
    )
  }

  return (
    <Box>
      <Sans size="5">Featured</Sans>
      <ViewingRoomCarousel
        height={380}
        data={featuredViewingRoomsForRail}
        render={carouselItemRender}
        maxWidth="100%"
        justifyContent="left"
        scrollPercentByCustomCount={numFeaturedViewingRooms - 2}
      />
    </Box>
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
            image {
              imageURLs {
                normalized
              }
            }
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
