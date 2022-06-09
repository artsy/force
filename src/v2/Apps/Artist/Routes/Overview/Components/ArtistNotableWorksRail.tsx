import { clickedEntityGroup, ContextModule, OwnerType } from "@artsy/cohesion"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useAnalyticsContext, useSystemContext } from "v2/System"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistNotableWorksRail_artist } from "v2/__generated__/ArtistNotableWorksRail_artist.graphql"
import { ArtistNotableWorksRailQuery } from "v2/__generated__/ArtistNotableWorksRailQuery.graphql"
import { scrollToTop } from "../Utils/scrollToTop"
import { Rail } from "v2/Components/Rail"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import {
  Box,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Spacer,
} from "@artsy/palette"

interface ArtistNotableWorksRailProps {
  artist: ArtistNotableWorksRail_artist
}

const ArtistNotableWorksRail: React.FC<ArtistNotableWorksRailProps> = ({
  artist,
}) => {
  const tracking = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const nodes = extractNodes(artist.filterArtworksConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <Rail
      title="Notable Works"
      viewAllLabel="View All Works"
      viewAllHref={`/artist/${artist.slug}/works-for-sale`}
      viewAllOnClick={() => {
        scrollToTop()

        tracking.trackEvent(
          clickedEntityGroup({
            contextModule: ContextModule.topWorksRail,
            contextPageOwnerId,
            contextPageOwnerSlug,
            contextPageOwnerType: contextPageOwnerType!,
            destinationPageOwnerType: OwnerType.artist,
            destinationPageOwnerId: artist.internalID,
            destinationPageOwnerSlug: artist.slug,
            type: "viewAll",
          })
        )
      }}
      getItems={() => {
        return nodes.map((node, index) => {
          return (
            <ShelfArtworkFragmentContainer
              artwork={node}
              contextModule={ContextModule.topWorksRail}
              key={index}
              showExtended={false}
              showMetadata
              lazyLoad
              onClick={() => {
                tracking.trackEvent(
                  clickedEntityGroup({
                    contextModule: ContextModule.topWorksRail,
                    contextPageOwnerId,
                    contextPageOwnerSlug,
                    contextPageOwnerType: contextPageOwnerType!,
                    destinationPageOwnerType: OwnerType.artwork,
                    destinationPageOwnerId: node.internalID,
                    destinationPageOwnerSlug: node.slug,
                    horizontalSlidePosition: index + 1,
                    type: "thumbnail",
                  })
                )
              }}
            />
          )
        })
      }}
    />
  )
}

export const ArtistNotableWorksRailFragmentContainer = createFragmentContainer(
  ArtistNotableWorksRail,
  {
    artist: graphql`
      fragment ArtistNotableWorksRail_artist on Artist {
        slug
        internalID
        filterArtworksConnection(sort: "-weighted_iconicity", first: 10) {
          edges {
            node {
              internalID
              slug
              ...ShelfArtwork_artwork @arguments(width: 200)
            }
          }
        }
      }
    `,
  }
)

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Notable Works"
      viewAllLabel="View All Works"
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
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
        })
      }}
    />
  </Skeleton>
)

export const ArtistNotableWorksRailQueryRenderer: React.FC<{
  slug: string
}> = ({ slug }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <Box data-test="ArtistNotableWorksRailQueryRenderer">
      <SystemQueryRenderer<ArtistNotableWorksRailQuery>
        lazyLoad
        environment={relayEnvironment}
        variables={{ slug }}
        placeholder={PLACEHOLDER}
        query={graphql`
          query ArtistNotableWorksRailQuery($slug: String!) {
            artist(id: $slug) {
              ...ArtistNotableWorksRail_artist
            }
          }
        `}
        render={({ error, props }) => {
          if (error) {
            console.error(error)
            return null
          }
          if (!props) {
            return PLACEHOLDER
          }
          if (props.artist) {
            return (
              <ArtistNotableWorksRailFragmentContainer artist={props.artist} />
            )
          }
        }}
      />
    </Box>
  )
}
