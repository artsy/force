import { clickedEntityGroup, ContextModule, OwnerType } from "@artsy/cohesion"
import { Box, Flex, Image, Shelf, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { AnalyticsSchema, useAnalyticsContext } from "v2/System"
import { RouterLink } from "v2/System/Router/RouterLink"
import { extractNodes } from "v2/Utils/extractNodes"
import { cropped } from "v2/Utils/resized"
import { ArtistCurrentShowsRail_artist } from "v2/__generated__/ArtistCurrentShowsRail_artist.graphql"

interface ArtistCurrentShowsRailProps {
  artist: ArtistCurrentShowsRail_artist
}

const ArtistCurrentShowsRail: React.FC<ArtistCurrentShowsRailProps> = ({
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
      <Flex justifyContent="space-between">
        <Text variant="lg" mb={4} as="h2">
          Shows featuring {artist.name}
        </Text>

        <RouterLink
          to={`/artist/${artist.slug}/shows`}
          onClick={() => {
            tracking.trackEvent(
              clickedEntityGroup({
                contextModule: ContextModule.currentShowsRail,
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
          <Text variant="sm">View all shows</Text>
        </RouterLink>
      </Flex>

      <Shelf alignItems="flex-start">
        {nodes.map((node, index) => {
          const image = cropped(node.coverImage?.sourceUrl!, {
            width: 325,
            height: 230,
          })

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
              {image.src ? (
                <Image
                  width={325}
                  height={230}
                  src={image.src}
                  srcSet={image.srcSet}
                  lazyLoad
                />
              ) : (
                <Box width={325} height={230} bg="black10" />
              )}

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

export const ArtistCurrentShowsRailFragmentContainer = createFragmentContainer(
  ArtistCurrentShowsRail,
  {
    artist: graphql`
      fragment ArtistCurrentShowsRail_artist on Artist {
        internalID
        name
        slug
        showsConnection(first: 5, sort: END_AT_ASC, status: "running") {
          edges {
            node {
              coverImage {
                sourceUrl: url(version: ["larger", "large"])
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
