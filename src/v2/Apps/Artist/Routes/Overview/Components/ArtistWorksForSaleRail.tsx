import { clickedEntityGroup, ContextModule, OwnerType } from "@artsy/cohesion"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useAnalyticsContext, useSystemContext } from "v2/System"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistWorksForSaleRail_artist } from "v2/__generated__/ArtistWorksForSaleRail_artist.graphql"
import { ArtistWorksForSaleRailQuery } from "v2/__generated__/ArtistWorksForSaleRailQuery.graphql"
import { scrollToTop } from "../Utils/scrollToTop"
import { Rail } from "v2/Components/Rail"
import { Box, Skeleton, SkeletonBox, SkeletonText } from "@artsy/palette"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"

interface ArtistWorksForSaleRailProps {
  artist: ArtistWorksForSaleRail_artist
}

const ArtistWorksForSaleRail: React.FC<ArtistWorksForSaleRailProps> = ({
  artist,
}) => {
  const tracking = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const nodes = extractNodes(artist.artworksConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <Rail
      title="Works For Sale"
      viewAllLabel="View All Works"
      viewAllHref={`/artist/${artist.slug}/works-for-sale`}
      viewAllOnClick={() => {
        scrollToTop()

        tracking.trackEvent(
          clickedEntityGroup({
            contextModule: ContextModule.worksForSaleRail,
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
            <Box data-test="worksForSaleRail">
              <ShelfArtworkFragmentContainer
                artwork={node}
                contextModule={ContextModule.worksForSaleRail}
                hidePartnerName
                key={index}
                showExtended={false}
                showMetadata
                lazyLoad
                onClick={() => {
                  tracking.trackEvent(
                    clickedEntityGroup({
                      contextModule: ContextModule.worksForSaleRail,
                      contextPageOwnerId,
                      contextPageOwnerSlug,
                      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                      contextPageOwnerType,
                      destinationPageOwnerType: OwnerType.artwork,
                      destinationPageOwnerId: node.internalID,
                      destinationPageOwnerSlug: node.slug,
                      horizontalSlidePosition: index + 1,
                      type: "thumbnail",
                    })
                  )
                }}
              />
            </Box>
          )
        })
      }}
    />
  )
}

export const ArtistWorksForSaleRailFragmentContainer = createFragmentContainer(
  ArtistWorksForSaleRail,
  {
    artist: graphql`
      fragment ArtistWorksForSaleRail_artist on Artist {
        artworksConnection(first: 20, sort: AVAILABILITY_ASC) {
          edges {
            node {
              internalID
              slug
              ...ShelfArtwork_artwork @arguments(width: 200)
            }
          }
        }
        internalID
        slug
      }
    `,
  }
)

const PLACEHOLDER = (
  <Skeleton>
    <Rail
      title="Works For Sale"
      viewAllLabel="View All Works"
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return (
            <React.Fragment key={i}>
              <SkeletonBox width={200} height={[200, 300, 250, 275][i % 4]} />
              <SkeletonText variant="lg-display">Some Artist</SkeletonText>
              <SkeletonText variant="sm-display">Location</SkeletonText>
            </React.Fragment>
          )
        })
      }}
    />
  </Skeleton>
)

export const ArtistWorksForSaleRailQueryRenderer: React.FC<{
  slug: string
}> = ({ slug }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <Box data-test="ArtistWorksForSaleRailQueryRenderer">
      <SystemQueryRenderer<ArtistWorksForSaleRailQuery>
        lazyLoad
        environment={relayEnvironment}
        variables={{ slug }}
        placeholder={PLACEHOLDER}
        query={graphql`
          query ArtistWorksForSaleRailQuery($slug: String!) {
            artist(id: $slug) {
              ...ArtistWorksForSaleRail_artist
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
              <ArtistWorksForSaleRailFragmentContainer artist={props.artist} />
            )
          }
        }}
      />
    </Box>
  )
}
