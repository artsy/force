import React from "react"
import { MediumCard } from "@artsy/palette/dist/elements/Cards"
import { Link } from "@artsy/palette/dist/elements/Link"
import { Spacer } from "@artsy/palette/dist/elements/Spacer"
import { Sans } from "@artsy/palette/dist/elements/Typography"
import { Flex } from "@artsy/palette/dist/elements/Flex"
import { Box } from "@artsy/palette/dist/elements/Box"
import { ViewingRoomsFeaturedRail_featuredViewingRooms } from "v2/__generated__/ViewingRoomsFeaturedRail_featuredViewingRooms.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { ViewingRoomCarousel } from "./ViewingRoomCarousel"
import { getTagProps } from "../Components/ViewingRoomsLatestGrid"
import { crop } from "v2/Utils/resizer"

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
    { image, slug, title, partner, status, distanceToOpen, distanceToClose },
    slideIndex: number
  ): React.ReactElement => {
    const tag = getTagProps(status, distanceToOpen, distanceToClose)
    const heroImageURL = crop(image?.imageURLs?.normalized, {
      height: 740,
      width: 560,
    })

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

export default ViewingRoomsFeaturedRailFragmentContainer
