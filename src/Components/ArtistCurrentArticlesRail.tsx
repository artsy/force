import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { clickedEntityGroup, ContextModule, OwnerType } from "@artsy/cohesion"
import { Box, Skeleton, SkeletonBox, SkeletonText } from "@artsy/palette"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { Rail } from "Components/Rail/Rail"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { ArtistCurrentArticlesRail_artist$data } from "__generated__/ArtistCurrentArticlesRail_artist.graphql"
import { ArtistCurrentArticlesRailQuery } from "__generated__/ArtistCurrentArticlesRailQuery.graphql"
import { CellArticleFragmentContainer } from "Components/Cells/CellArticle"

interface ArtistCurrentArticlesRailProps {
  artist: ArtistCurrentArticlesRail_artist$data
  artworkId?: string
}

const ArtistCurrentArticlesRail: React.FC<ArtistCurrentArticlesRailProps> = ({
  artist,
  artworkId,
}) => {
  const tracking = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const articles = extractNodes(artist.articlesConnection)

  if (articles.length === 0) {
    return null
  }

  return (
    <Rail
      title={`Articles Featuring ${artist.name}`}
      alignItems="flex-start"
      viewAllLabel="View All Articles"
      viewAllHref={
        artworkId
          ? `/artist/${artist.slug}/articles/${artworkId}`
          : `/artist/${artist.slug}/articles`
      }
      viewAllOnClick={() => {
        tracking.trackEvent(
          clickedEntityGroup({
            contextModule: ContextModule.relatedArticles,
            contextPageOwnerId,
            contextPageOwnerSlug,
            contextPageOwnerType: contextPageOwnerType,
            destinationPageOwnerType: OwnerType.artist,
            destinationPageOwnerId: artist.internalID,
            destinationPageOwnerSlug: artist.slug,
            type: "viewAll",
          })
        )
      }}
      getItems={() => {
        return articles.map((article, index) => {
          return (
            <CellArticleFragmentContainer
              key={article.internalID}
              article={article}
              onClick={() => {
                tracking.trackEvent({
                  action_type: DeprecatedAnalyticsSchema.ActionType.Click,
                  contextModule: ContextModule.relatedArticles,
                  contextPageOwnerId,
                  contextPageOwnerSlug,
                  contextPageOwnerType,
                  destination_path: article.href,
                  destinationPageOwnerId: article.internalID,
                  destinationPageOwnerSlug: article.slug,
                  destinationPageOwnerType: OwnerType.article,
                  horizontalSlidePosition: index + 1,
                  subject: "showCarouselSlide",
                  type: "thumbnail",
                })
              }}
            />
          )
        })
      }}
    />
  )
}

export const ArtistCurrentArticlesRailFragmentContainer = createFragmentContainer(
  ArtistCurrentArticlesRail,
  {
    artist: graphql`
      fragment ArtistCurrentArticlesRail_artist on Artist {
        internalID
        name
        slug
        articlesConnection(first: 10, sort: PUBLISHED_AT_DESC) {
          edges {
            node {
              ...CellArticle_article
              internalID
              slug
              href
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
      title="Articles"
      viewAllLabel="View All Articles"
      getItems={() => {
        return [...new Array(8)].map((_, i) => {
          return (
            <Box width={325} key={i}>
              <SkeletonBox width={325} height={230} />
              <SkeletonText variant="lg-display">Some Artist</SkeletonText>
              <SkeletonText variant="sm-display">Location</SkeletonText>
            </Box>
          )
        })
      }}
    />
  </Skeleton>
)

export const ArtistCurrentArticlesRailQueryRenderer: React.FC<{
  slug: string
  artworkId?: string
}> = ({ slug, artworkId }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <Box data-test="ArtistCurrentArticlesRailQueryRenderer">
      <SystemQueryRenderer<ArtistCurrentArticlesRailQuery>
        lazyLoad
        environment={relayEnvironment}
        variables={{ slug }}
        placeholder={PLACEHOLDER}
        query={graphql`
          query ArtistCurrentArticlesRailQuery($slug: String!) {
            artist(id: $slug) {
              ...ArtistCurrentArticlesRail_artist
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
              <ArtistCurrentArticlesRailFragmentContainer
                artist={props.artist}
                artworkId={artworkId}
              />
            )
          }
        }}
      />
    </Box>
  )
}
