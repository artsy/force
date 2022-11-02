import { clickedEntityGroup, ContextModule, OwnerType } from "@artsy/cohesion"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useAnalyticsContext, useSystemContext } from "System"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "Components/Artwork/ShelfArtwork"
import { extractNodes } from "Utils/extractNodes"
import { ArtistNotableWorksRail_artist$data } from "__generated__/ArtistNotableWorksRail_artist.graphql"
import { ArtistNotableWorksRailQuery } from "__generated__/ArtistNotableWorksRailQuery.graphql"
import { Rail } from "Components/Rail"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { Box, Skeleton } from "@artsy/palette"
import { useJump } from "Utils/Hooks/useJump"

interface ArtistNotableWorksRailProps {
  artist: ArtistNotableWorksRail_artist$data
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

  const { jumpTo } = useJump({ offset: 20 })

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
        jumpTo("artistContentArea")

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
              ...ShelfArtwork_artwork
              internalID
              slug
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
          return <ShelfArtworkPlaceholder key={i} index={i} />
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
