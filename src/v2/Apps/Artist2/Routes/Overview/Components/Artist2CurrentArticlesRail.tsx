import { ContextModule, OwnerType } from "@artsy/cohesion"
import { Image, Shelf, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { AnalyticsSchema, useAnalyticsContext } from "v2/Artsy"
import { RouterLink } from "v2/Artsy/Router/RouterLink"
import { extractNodes } from "v2/Utils/extractNodes"
import { Artist2CurrentArticlesRail_artist } from "v2/__generated__/Artist2CurrentArticlesRail_artist.graphql"

interface Artist2CurrentArticlesRailProps {
  artist: Artist2CurrentArticlesRail_artist
}

const Artist2CurrentArticlesRail: React.FC<Artist2CurrentArticlesRailProps> = ({
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
      <Text variant="lg" my={4}>
        Articles featuring {artist.name}
      </Text>

      <Shelf alignItems="flex-start">
        {nodes.map((node, index) => {
          return (
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
              <Image
                width={node.thumbnailImage?.cropped?.width}
                height={node.thumbnailImage?.cropped?.height}
                src={node.thumbnailImage?.cropped?.src!}
                srcSet={node.thumbnailImage?.cropped?.srcSet}
                lazyLoad
              />
              <Spacer my={1} />
              <Text variant="md">{node.thumbnailTitle}</Text>
              <Text variant="md" color="black60">
                {node.publishedAt}
              </Text>
            </RouterLink>
          )
        })}
      </Shelf>
    </>
  )
}

export const Artist2CurrentArticlesRailFragmentContainer = createFragmentContainer(
  Artist2CurrentArticlesRail,
  {
    artist: graphql`
      fragment Artist2CurrentArticlesRail_artist on Artist {
        name
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
                cropped(width: 325, height: 330) {
                  width
                  height
                  src
                  srcSet
                }
              }
            }
          }
        }
      }
    `,
  }
)
