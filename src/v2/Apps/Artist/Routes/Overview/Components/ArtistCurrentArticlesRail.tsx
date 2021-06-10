import { clickedEntityGroup, ContextModule, OwnerType } from "@artsy/cohesion"
import { Box, Flex, Image, Shelf, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { AnalyticsSchema, useAnalyticsContext } from "v2/Artsy"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { extractNodes } from "v2/Utils/extractNodes"
import { ArtistCurrentArticlesRail_artist } from "v2/__generated__/ArtistCurrentArticlesRail_artist.graphql"

interface ArtistCurrentArticlesRailProps {
  artist: ArtistCurrentArticlesRail_artist
}

const ArtistCurrentArticlesRail: React.FC<ArtistCurrentArticlesRailProps> = ({
  artist,
}) => {
  const tracking = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const nodes = extractNodes(artist.articlesConnection)

  if (nodes.length === 0) {
    return null
  }

  return (
    <>
      <Flex justifyContent="space-between">
        <Text variant="lg" mb={4}>
          Articles featuring {artist.name}
        </Text>

        <RouterLink
          to={`/artist/${artist.slug}/articles`}
          onClick={() => {
            tracking.trackEvent(
              clickedEntityGroup({
                contextModule: ContextModule.relatedArticles,
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
          <Text variant="sm">View all articles</Text>
        </RouterLink>
      </Flex>
      <Shelf alignItems="flex-start">
        {nodes.map((node, index) => {
          return (
            <Box maxWidth={345} key={index}>
              <RouterLink
                to={node.href!}
                key={index}
                noUnderline
                onClick={() => {
                  tracking.trackEvent({
                    action_type: AnalyticsSchema.ActionType.Click,
                    contextModule: ContextModule.relatedArticles,
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
                {node?.thumbnailImage?.cropped?.src ? (
                  <Image
                    width={node.thumbnailImage.cropped.width}
                    height={node.thumbnailImage.cropped.height}
                    src={node.thumbnailImage.cropped.src}
                    srcSet={node.thumbnailImage.cropped.srcSet}
                    lazyLoad
                  />
                ) : (
                  <Box width={325} height={230} bg="black10" />
                )}
                <Spacer my={1} />
                <Text variant="md">{node.thumbnailTitle}</Text>
                <Text variant="md" color="black60">
                  {node.publishedAt}
                </Text>
              </RouterLink>
            </Box>
          )
        })}
      </Shelf>
    </>
  )
}

export const ArtistCurrentArticlesRailFragmentContainer = createFragmentContainer(
  ArtistCurrentArticlesRail,
  {
    artist: graphql`
      fragment ArtistCurrentArticlesRail_artist on Artist {
        articlesConnection(
          first: 10
          sort: PUBLISHED_AT_DESC
          inEditorialFeed: true
        ) {
          edges {
            node {
              internalID
              slug
              href
              thumbnailTitle
              publishedAt(format: "MMM Do, YYYY")
              thumbnailImage {
                cropped(width: 325, height: 230) {
                  width
                  height
                  src
                  srcSet
                }
              }
            }
          }
        }
        internalID
        name
        slug
      }
    `,
  }
)
