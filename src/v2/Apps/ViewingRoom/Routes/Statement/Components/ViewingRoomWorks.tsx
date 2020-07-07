import React from "react"
import { Box, Flex, Image, Sans, Spacer } from "@artsy/palette"
import { useRouter } from "v2/Artsy/Router/useRouter"
import { createFragmentContainer, graphql } from "react-relay"

import { ViewingRoomWorks_viewingRoom } from "v2/__generated__/ViewingRoomWorks_viewingRoom.graphql"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { AnalyticsSchema, useTracking } from "v2/Artsy"
import { scrollToId } from "../Utils/scrollToId"
import { ViewWorksButton } from "./ViewWorksButton"

interface ViewingRoomWorksProps {
  viewingRoom: ViewingRoomWorks_viewingRoom
}

const ViewingRoomWorks: React.FC<ViewingRoomWorksProps> = ({
  viewingRoom: {
    artworksConnection: { totalCount, edges },
  },
}) => {
  const {
    match: {
      params: { slug },
    },
  } = useRouter()

  const navigateTo = `/viewing-room/${slug}/works`

  return (
    <>
      <Flex>
        {edges.map(({ node: artwork }) => {
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
      <ViewWorksButton artworksCount={totalCount} />
    </>
  )
}

export const ViewingRoomWorksFragmentContainer = createFragmentContainer(
  ViewingRoomWorks,
  {
    viewingRoom: graphql`
      fragment ViewingRoomWorks_viewingRoom on ViewingRoom {
        artworksConnection(first: 2) {
          totalCount
          edges {
            node {
              internalID
              imageUrl
              artistNames
              title
              date
              saleMessage
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
  saleMessage,
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
        <Box mb={0.5}>
          <Image width="100%" src={imageUrl} alt={title} />
        </Box>
        <Box>
          <Sans size="3t">{artistNames}</Sans>
        </Box>
        <Box style={{ textOverflow: "ellipsis" }}>
          <Sans size="3t" color="black60">
            {[title, date].filter(s => s).join(", ")}
          </Sans>
        </Box>
        {saleMessage && (
          <Box>
            <Sans size="3t" color="black60">
              {saleMessage}
            </Sans>
          </Box>
        )}
      </Box>
    </RouterLink>
  )
}
