import { clickedEntityGroup, ContextModule, OwnerType } from "@artsy/cohesion"
import { Shelf, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useAnalyticsContext } from "v2/Artsy"
import { ShelfArtworkFragmentContainer } from "v2/Components/Artwork/ShelfArtwork"
import { extractNodes } from "v2/Utils/extractNodes"
import { Artist2NotableWorks_artist } from "v2/__generated__/Artist2NotableWorks_artist.graphql"

interface Artist2NotableWorksProps {
  artist: Artist2NotableWorks_artist
}

const Artist2NotableWorks: React.FC<Artist2NotableWorksProps> = ({
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
      <Text variant="lg" my={4}>
        Notable Works
      </Text>

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
              onClick={() => {
                tracking.trackEvent(
                  clickedEntityGroup({
                    contextModule: ContextModule.topWorksRail,
                    contextPageOwnerId,
                    contextPageOwnerSlug,
                    // @ts-expect-error STRICT_NULL_CHECK
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
          )
        })}
      </Shelf>
    </>
  )
}

export const Artist2NotableWorksFragmentContainer = createFragmentContainer(
  Artist2NotableWorks,
  {
    artist: graphql`
      fragment Artist2NotableWorks_artist on Artist {
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
