import React from "react"
import { Box, Flex, Link, MediumCard, Sans, Spacer } from "@artsy/palette"
import { ViewingRoomsFeaturedRail_featuredViewingRooms } from "v2/__generated__/ViewingRoomsFeaturedRail_featuredViewingRooms.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomCarousel } from "../Routes/Works/Components/ViewingRoomCarousel"
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

  const carouselHeight = 380
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
  ): React.ReactElement => {
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
        <ViewingRoomCarousel
          height={carouselHeight}
          items={featuredViewingRoomsForRail}
          itemRender={carouselItemRender}
          maxWidth="100%"
          justifyCarousel="left"
        />
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
