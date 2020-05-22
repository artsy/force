import React from "react"
import { Box, Button, Flex, Image, Sans, Spacer } from "@artsy/palette"
import { useRouter } from "v2/Artsy/Router/useRouter"
import { createFragmentContainer, graphql } from "react-relay"

import { ViewingRoomWorks_viewingRoom } from "v2/__generated__/ViewingRoomWorks_viewingRoom.graphql"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { AnalyticsSchema, useTracking } from "v2/Artsy"
import { scrollToId } from "../Utils/scrollToId"

interface ViewingRoomWorksProps {
  viewingRoom: ViewingRoomWorks_viewingRoom
}

const ViewingRoomWorks: React.FC<ViewingRoomWorksProps> = ({
  viewingRoom: {
    artworksConnection: { edges },
  },
}) => {
  const tracking = useTracking()

  const {
    match: {
      params: { slug },
    },
  } = useRouter()

  const navigateTo = `/viewing-room/${slug}/works`

  return (
    <>
      <Flex>
        {edges.map(({ node: artwork }, index) => {
          return (
            <ArtworkItem
              key={artwork.internalID}
              navigateTo={navigateTo}
              {...artwork}
            />
          )
        })}
      </Flex>
      <Spacer my={4} />
      <RouterLink
        to={navigateTo}
        data-test="viewingRoomWorksButton"
        onClick={() => {
          scrollToId("viewingRoomTabBarAnchor")
          tracking.trackEvent({
            action_type: AnalyticsSchema.ActionType.ClickedArtworkGroup,
            context_module:
              AnalyticsSchema.ContextModule.ViewingRoomArtworkRail,
            subject: AnalyticsSchema.Subject.ViewWorks,
            destination_path: navigateTo,
          })
        }}
      >
        <Button size="large" width="100%">
          View works
        </Button>
      </RouterLink>
    </>
  )
}

export const ViewingRoomWorksFragmentContainer = createFragmentContainer(
  ViewingRoomWorks,
  {
    viewingRoom: graphql`
      fragment ViewingRoomWorks_viewingRoom on ViewingRoom {
        artworksConnection {
          edges {
            node {
              internalID
              imageUrl
              artistNames
              title
              date
            }
          }
        }
      }
    `,
  }
)

type ArtworkNode = ViewingRoomWorksProps["viewingRoom"]["artworksConnection"]["edges"][0]["node"] & {
  navigateTo: string
}

const ArtworkItem: React.FC<ArtworkNode> = ({
  artistNames,
  date,
  imageUrl,
  navigateTo,
  title,
}) => {
  const tracking = useTracking()

  return (
    <RouterLink
      to={navigateTo}
      style={{ textDecoration: "none", width: "50%" }}
      onClick={() => {
        scrollToId("viewingRoomTabBarAnchor")

        tracking.trackEvent({
          action_type: AnalyticsSchema.ActionType.ClickedArtworkGroup,
          context_module: AnalyticsSchema.ContextModule.ViewingRoomArtworkRail,
          subject: AnalyticsSchema.Subject.ArtworkThumbnail,
          destination_path: navigateTo,
        })
      }}
    >
      <Box width="95%">
        <Box>
          <Image width="100%" src={imageUrl} />
        </Box>
        <Box>
          <Sans size="3t">{artistNames}</Sans>
        </Box>
        <Box style={{ textOverflow: "ellipsis" }}>
          <Sans size="3t" color="black60">
            {[title, date].filter(s => s).join(", ")}
          </Sans>
        </Box>
      </Box>
    </RouterLink>
  )
}
