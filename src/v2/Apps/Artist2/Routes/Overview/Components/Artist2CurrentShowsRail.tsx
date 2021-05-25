import { ContextModule, OwnerType } from "@artsy/cohesion"
import { Image, Shelf, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { AnalyticsSchema, useAnalyticsContext } from "v2/Artsy"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { extractNodes } from "v2/Utils/extractNodes"
import { Artist2CurrentShowsRail_artist } from "v2/__generated__/Artist2CurrentShowsRail_artist.graphql"

interface Artist2CurrentShowsRailProps {
  artist: Artist2CurrentShowsRail_artist
}

const Artist2CurrentShowsRail: React.FC<Artist2CurrentShowsRailProps> = ({
  artist,
}) => {
  const tracking = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const nodes = extractNodes(artist.showsConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <>
      <Text variant="lg" my={4}>
        Shows featuring {artist.name}
      </Text>

      <Shelf>
        {nodes.map((node, index) => {
          return (
            <RouterLink
              to={node.href!}
              key={index}
              noUnderline
              onClick={() => {
                tracking.trackEvent({
                  action_type: AnalyticsSchema.ActionType.Click,
                  contextModule: ContextModule.currentShowsRail,
                  contextPageOwnerId,
                  contextPageOwnerSlug,
                  // @ts-expect-error STRICT_NULL_CHECK
                  contextPageOwnerType,
                  destination_path: node.href,
                  destinationPageOwnerId: node.internalID,
                  destinationPageOwnerSlug: node.slug,
                  destinationPageOwnerType: OwnerType.artwork,
                  horizontalSlidePosition: index + 1,
                  subject: "showCarouselSlide",
                  type: "thumbnail",
                })
              }}
            >
              <Image
                width={node.coverImage?.cropped?.width}
                height={node.coverImage?.cropped?.height}
                src={node.coverImage?.cropped?.src!}
                srcSet={node.coverImage?.cropped?.srcSet}
                lazyLoad
              />
              <Spacer my={1} />
              <Text variant="md">{node.name}</Text>
              <Text variant="md" color="black60">
                {node.exhibitionPeriod}
              </Text>
            </RouterLink>
          )
        })}
      </Shelf>
    </>
  )
}

export const Artist2CurrentShowsRailFragmentContainer = createFragmentContainer(
  Artist2CurrentShowsRail,
  {
    artist: graphql`
      fragment Artist2CurrentShowsRail_artist on Artist {
        name
        showsConnection(first: 5, sort: END_AT_ASC, status: "running") {
          edges {
            node {
              coverImage {
                cropped(width: 325, height: 330) {
                  width
                  height
                  srcSet
                  src
                }
              }
              exhibitionPeriod
              href
              internalID
              name
              slug
            }
          }
        }
      }
    `,
  }
)
