import { clickedEntityGroup, ContextModule, OwnerType } from "@artsy/cohesion"
import { Flex, Shelf, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "v2/Artsy"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"
import { extractNodes } from "v2/Utils/extractNodes"
import { Artist2NotableWorksRail_artist } from "v2/__generated__/Artist2NotableWorksRail_artist.graphql"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { scrollToTop } from "../Utils/scrollToTop"

interface Artist2NotableWorksRailProps {
  artist: Artist2NotableWorksRail_artist
}

const Artist2NotableWorksRail: React.FC<Artist2NotableWorksRailProps> = ({
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
    <>
      <Flex justifyContent="space-between">
        <Text variant="lg" mb={2}>
          Notable Works
        </Text>

        <RouterLink
          to={`/artist2/${artist.slug}/works-for-sale`}
          onClick={() => {
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
        >
          <Text variant="sm">View all works</Text>
        </RouterLink>
      </Flex>

      <Shelf>
        {nodes.map((node, index) => {
          return (
            <ShelfArtworkFragmentContainer
              artwork={node}
              contextModule={ContextModule.topWorksRail}
              hideArtistName
              hidePartnerName
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
        })}
      </Shelf>
    </>
  )
}

export const Artist2NotableWorksRailFragmentContainer = createFragmentContainer(
  Artist2NotableWorksRail,
  {
    artist: graphql`
      fragment Artist2NotableWorksRail_artist on Artist {
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
