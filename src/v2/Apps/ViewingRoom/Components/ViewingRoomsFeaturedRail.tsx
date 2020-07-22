import React from "react"
import { Box, Flex, Link, MediumCard, Sans, Spacer } from "@artsy/palette"
import { ViewingRoomsFeaturedRail_featuredViewingRooms } from "v2/__generated__/ViewingRoomsFeaturedRail_featuredViewingRooms.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomCarousel } from "./ViewingRoomCarousel"
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

  if (featuredViewingRoomsForRail.length === 0) {
    return null
  }

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
    slideIndex: number
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
    <Box>
      <Sans size="5">Featured</Sans>
      <ViewingRoomCarousel
        height={380}
        data={featuredViewingRoomsForRail}
        render={carouselItemRender}
        maxWidth="100%"
        justifyContent="left"
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
