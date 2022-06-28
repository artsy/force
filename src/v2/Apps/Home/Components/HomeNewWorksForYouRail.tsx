import {
  Box,
  Shelf,
  Skeleton,
  SkeletonText,
  SkeletonBox,
  Spacer,
} from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext, useTracking } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { HomeNewWorksForYouRail_artworksForUser } from "v2/__generated__/HomeNewWorksForYouRail_artworksForUser.graphql"
import { HomeNewWorksForYouRailQuery } from "v2/__generated__/HomeNewWorksForYouRailQuery.graphql"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"
import { extractNodes } from "v2/Utils/extractNodes"
import {
  ActionType,
  ClickedArtworkGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"

interface HomeNewWorksForYouRailProps {
  artworksForUser: HomeNewWorksForYouRail_artworksForUser
}

const HomeNewWorksForYouRail: React.FC<HomeNewWorksForYouRailProps> = ({
  artworksForUser,
}) => {
  const { trackEvent } = useTracking()

  const artworks = extractNodes(artworksForUser)
  if (!artworks || artworks?.length === 0) {
    return null
  }

  return (
    <Shelf>
      {artworks.map((artwork, index) => {
        if (!artwork) {
          return <></>
        }

        return (
          <ShelfArtworkFragmentContainer
            artwork={artwork}
            key={index}
            // TODO: Add home type to cohesion once we have tracking
            contextModule={null as any}
            lazyLoad
            onClick={() => {
              const trackingEvent: ClickedArtworkGroup = {
                action: ActionType.clickedArtworkGroup,
                context_module: ContextModule.newWorksForYouRail,
                context_page_owner_type: OwnerType.home,
                destination_page_owner_id: artwork.internalID,
                destination_page_owner_slug: artwork.slug,
                destination_page_owner_type: OwnerType.artwork,
                type: "thumbnail",
              }
              trackEvent(trackingEvent)
            }}
          />
        )
      })}
    </Shelf>
  )
}

const PLACEHOLDER = (
  <Skeleton>
    <Shelf>
      {[...new Array(8)].map((_, i) => {
        return (
          <Box width={200} key={i}>
            <SkeletonBox width={200} height={[200, 300, 250, 275][i % 4]} />

            <Spacer mt={1} />

            <SkeletonText variant="sm-display">Artist Name</SkeletonText>
            <SkeletonText variant="sm-display">Artwork Title</SkeletonText>
            <SkeletonText variant="xs">Partner</SkeletonText>
            <SkeletonText variant="xs">Price</SkeletonText>
          </Box>
        )
      })}
    </Shelf>
  </Skeleton>
)

export const HomeNewWorksForYouRailFragmentContainer = createFragmentContainer(
  HomeNewWorksForYouRail,
  {
    artworksForUser: graphql`
      fragment HomeNewWorksForYouRail_artworksForUser on ArtworkConnection {
        edges {
          node {
            internalID
            slug
            ...ShelfArtwork_artwork @arguments(width: 210)
          }
        }
      }
    `,
  }
)

export const HomeNewWorksForYouRailQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeNewWorksForYouRailQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query HomeNewWorksForYouRailQuery {
          artworksForUser(includeBackfill: true, first: 20) {
            ...HomeNewWorksForYouRail_artworksForUser
          }
        }
      `}
      placeholder={PLACEHOLDER}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return PLACEHOLDER
        }

        if (props.artworksForUser) {
          return (
            <HomeNewWorksForYouRailFragmentContainer
              artworksForUser={props.artworksForUser}
            />
          )
        }

        return null
      }}
    />
  )
}
