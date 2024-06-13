import {
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Image,
  Text,
  Column,
} from "@artsy/palette"
import {
  ClickedArticleGroup,
  ActionType,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { GridColumns, ResponsiveBox } from "@artsy/palette"
import {
  CellArticleFragmentContainer,
  CellArticlePlaceholder,
} from "Components/Cells/CellArticle"
import { Masonry } from "Components/Masonry"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { RouterLink } from "System/Components/RouterLink"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { Media } from "Utils/Responsive"
import { extractNodes } from "Utils/extractNodes"
import { take } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { ArtistEditorialNewsGrid_artist$data } from "__generated__/ArtistEditorialNewsGrid_artist.graphql"
import { ArtistEditorialNewsGridQuery } from "__generated__/ArtistEditorialNewsGridQuery.graphql"
import { FC } from "react"

const ARTICLE_COUNT = 6

interface ArtistEditorialNewsGridProps {
  artist: ArtistEditorialNewsGrid_artist$data
}

const ArtistEditorialNewsGrid: FC<ArtistEditorialNewsGridProps> = ({
  artist,
}) => {
  const { trackEvent } = useTracking()

  const articles = extractNodes(artist.articlesConnection)

  if (articles.length === 0) {
    return null
  }

  const [firstArticle, ...restOfArticles] = articles
  const truncatedRestOfArticles = take(restOfArticles, ARTICLE_COUNT)
  const firstImage = firstArticle.thumbnailImage?.large

  return (
    <GridColumns gridRowGap={4}>
      <Column
        span={12}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text as="h3" variant="lg-display">
          Artsy Editorial Featuring {artist.name}
        </Text>

        <Text
          variant="sm-display"
          flexShrink={0}
          as={RouterLink}
          // @ts-ignore
          to={`${artist.href}/articles`}
          onClick={() => {
            const trackingEvent: ClickedArticleGroup = {
              action: ActionType.clickedArticleGroup,
              context_module: ContextModule.marketNews,
              context_page_owner_type: OwnerType.artist,
              destination_page_owner_type: OwnerType.articles,
              type: "viewAll",
            }

            trackEvent(trackingEvent)
          }}
        >
          View All
        </Text>
      </Column>

      <Column span={[12, 6]} mb={[4, 0]}>
        <RouterLink
          key={firstArticle.internalID}
          to={firstArticle.href}
          display="block"
          textDecoration="none"
          onClick={() => {
            const trackingEvent: ClickedArticleGroup = {
              action: ActionType.clickedArticleGroup,
              context_module: ContextModule.marketNews,
              context_page_owner_type: OwnerType.artist,
              context_page_owner_id: artist.internalID,
              context_page_owner_slug: artist.slug,
              destination_page_owner_type: OwnerType.article,
              type: "thumbnail",
            }

            trackEvent(trackingEvent)
          }}
        >
          {firstImage && (
            <ResponsiveBox
              aspectWidth={firstImage.width}
              aspectHeight={firstImage.height}
              maxWidth="100%"
              bg="black10"
            >
              <Image
                src={firstImage.src}
                srcSet={firstImage.srcSet}
                style={{ display: "block" }}
                lazyLoad
              />
            </ResponsiveBox>
          )}

          <Text variant="xs" fontWeight="bold" mt={1}>
            {firstArticle.vertical}
          </Text>

          <Text variant="xl" mt={0.5}>
            {firstArticle.title}
          </Text>

          <Text variant="lg-display" mt={1}>
            By {firstArticle.byline}
          </Text>

          <Text variant="lg-display" color="black60" mt={0.5}>
            {firstArticle.publishedAt}
          </Text>
        </RouterLink>
      </Column>

      <Column span={[12, 6]}>
        <Masonry columnCount={2}>
          {truncatedRestOfArticles.map(article => {
            return (
              <CellArticleFragmentContainer
                key={article.internalID}
                article={article}
                mode="GRID"
                mb={4}
              />
            )
          })}
        </Masonry>
      </Column>
    </GridColumns>
  )
}

export const ArtistEditorialNewsGridFragmentContainer = createFragmentContainer(
  ArtistEditorialNewsGrid,
  {
    artist: graphql`
      fragment ArtistEditorialNewsGrid_artist on Artist {
        internalID
        name
        slug
        href
        articlesConnection(first: 6, sort: PUBLISHED_AT_DESC) {
          edges {
            node {
              ...CellArticle_article
              internalID
              href
              byline
              slug
              title
              publishedAt(format: "MMM D, YYYY")
              vertical
              thumbnailTitle
              thumbnailImage {
                large: cropped(width: 670, height: 720) {
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

const PLACEHOLDER = (
  <Skeleton>
    <GridColumns>
      <Column span={[12, 6]} mb={[4, 0]}>
        <Media greaterThan="xs">
          <ResponsiveBox aspectWidth={670} aspectHeight={720} maxWidth="100%">
            <SkeletonBox width="100%" height="100%" />
          </ResponsiveBox>

          <SkeletonText variant="xs" fontWeight="bold" mt={1}>
            Art Fairs
          </SkeletonText>

          <SkeletonText variant="xl" mt={0.5}>
            Essential Tips for Collecting Work by Anni and Josef Albers
          </SkeletonText>

          <SkeletonText variant="lg-display" mt={1}>
            By Artsy Editorial
          </SkeletonText>

          <SkeletonText variant="lg-display" mt={0.5}>
            Jan 1, 2000
          </SkeletonText>
        </Media>
      </Column>

      <Column span={[12, 6]}>
        <Masonry columnCount={2}>
          {[...new Array(ARTICLE_COUNT)].map((_, i) => {
            return <CellArticlePlaceholder key={i} mode="GRID" mb={4} />
          })}
        </Masonry>
      </Column>
    </GridColumns>
  </Skeleton>
)

export const ArtistEditorialNewsGridQueryRenderer: FC<{
  id: string
}> = ({ id }) => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<ArtistEditorialNewsGridQuery>
      lazyLoad
      environment={relayEnvironment}
      variables={{ id }}
      placeholder={PLACEHOLDER}
      query={graphql`
        query ArtistEditorialNewsGridQuery($id: String!) {
          artist(id: $id) {
            ...ArtistEditorialNewsGrid_artist
          }
        }
      `}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }
        if (!props || !props.artist) {
          return PLACEHOLDER
        }

        return (
          <ArtistEditorialNewsGridFragmentContainer artist={props.artist} />
        )
      }}
    />
  )
}
