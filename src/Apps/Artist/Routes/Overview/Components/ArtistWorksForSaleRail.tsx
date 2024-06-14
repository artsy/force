import { clickedEntityGroup, ContextModule, OwnerType } from "@artsy/cohesion"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import { extractNodes } from "Utils/extractNodes"
import { ArtistWorksForSaleRail_artist$data } from "__generated__/ArtistWorksForSaleRail_artist.graphql"
import { ArtistWorksForSaleRailQuery } from "__generated__/ArtistWorksForSaleRailQuery.graphql"
import { Rail } from "Components/Rail/Rail"
import { Box, Skeleton } from "@artsy/palette"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useJump } from "Utils/Hooks/useJump"

interface ArtistWorksForSaleRailProps {
  artist: ArtistWorksForSaleRail_artist$data
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

  const { jumpTo } = useJump({ offset: 20 })

  const nodes = extractNodes(artist.artworksConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <Rail
      title="Works For Sale"
      viewAllLabel="View All Works"
      viewAllHref={`/artist/${artist.slug}`}
      viewAllOnClick={() => {
        jumpTo("artistContentArea")

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
            <Box key={node.internalID} data-test="worksForSaleRail">
              <ShelfArtworkFragmentContainer
                artwork={node}
                contextModule={ContextModule.worksForSaleRail}
                lazyLoad
                onClick={() => {
                  tracking.trackEvent(
                    clickedEntityGroup({
                      contextModule: ContextModule.worksForSaleRail,
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
              ...ShelfArtwork_artwork
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
          return <ShelfArtworkPlaceholder key={i} index={i} />
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
