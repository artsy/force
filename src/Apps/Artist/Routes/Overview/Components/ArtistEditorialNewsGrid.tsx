import {
  ActionType,
  type ClickedArticleGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import { useVariant } from "@unleash/proxy-client-react"
import {
  Column,
  GridColumns,
  Image,
  ResponsiveBox,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { ArtistEditorialNewsEmptyState } from "Apps/Artist/Routes/Overview/Components/ArtistEditorialNewsEmptyState"
import {
  CellArticleFragmentContainer,
  CellArticlePlaceholder,
} from "Components/Cells/CellArticle"
import { ClientSuspense } from "Components/ClientSuspense"
import { Masonry } from "Components/Masonry"
import { Rail } from "Components/Rail/Rail"
import { RouterLink } from "System/Components/RouterLink"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useTrackFeatureVariantOnMount } from "System/Hooks/useTrackFeatureVariant"
import { Media } from "Utils/Responsive"
import { extractNodes } from "Utils/extractNodes"
import type { ArtistEditorialNewsGridQuery } from "__generated__/ArtistEditorialNewsGridQuery.graphql"
import { take } from "lodash"
import type { FC } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
import { useTracking } from "react-tracking"

const ARTICLE_COUNT = 6
const ARTIST_EDITORIAL_RAIL_EXPERIMENT = "diamond_artist-editorial-rail"

type ArtistEditorialNewsGridArtist = NonNullable<
  ArtistEditorialNewsGridQuery["response"]["artist"]
>

interface ArtistEditorialNewsGridProps {
  artist: ArtistEditorialNewsGridArtist
}

const ArtistEditorialNewsGrid: FC<
  React.PropsWithChildren<ArtistEditorialNewsGridProps>
> = ({ artist }) => {
  const articles = extractNodes(artist.articlesConnection)

  if (articles.length === 0) {
    return <ArtistEditorialNewsEmptyState />
  }

  return <ArtistEditorialNewsGridLayout artist={artist} />
}

const ArtistEditorialNewsGridLayout: FC<
  React.PropsWithChildren<ArtistEditorialNewsGridProps>
> = ({ artist }) => {
  const { trackEvent } = useTracking()

  const variant = useVariant(ARTIST_EDITORIAL_RAIL_EXPERIMENT)

  useTrackFeatureVariantOnMount({
    experimentName: ARTIST_EDITORIAL_RAIL_EXPERIMENT,
    variantName: variant?.name,
  })

  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  const articles = extractNodes(artist.articlesConnection)
  const viewAllHref = `${artist.href}/articles`

  const trackArticleClick = () => {
    const trackingEvent: ClickedArticleGroup = {
      action: ActionType.clickedArticleGroup,
      context_module: ContextModule.marketNews,
      context_page_owner_type: contextPageOwnerType!,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      destination_page_owner_type: OwnerType.article,
      type: "thumbnail",
    }

    trackEvent(trackingEvent)
  }

  const trackViewAllClick = () => {
    const trackingEvent: ClickedArticleGroup = {
      action: ActionType.clickedArticleGroup,
      context_module: ContextModule.marketNews,
      context_page_owner_type: contextPageOwnerType!,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      destination_page_owner_type: OwnerType.articles,
      type: "viewAll",
    }

    trackEvent(trackingEvent)
  }

  if (variant?.enabled && variant.name === "experiment") {
    return (
      <Rail
        title={`Artsy Editorial Featuring ${artist.name}`}
        alignItems="flex-start"
        viewAllHref={viewAllHref}
        viewAllLabel="View All"
        viewAllOnClick={trackViewAllClick}
        getItems={() => {
          return articles.map(article => {
            return (
              <CellArticleFragmentContainer
                key={article.internalID}
                article={article}
                onClick={trackArticleClick}
              />
            )
          })
        }}
      />
    )
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
          to={viewAllHref}
          onClick={trackViewAllClick}
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
          onClick={trackArticleClick}
        >
          {firstImage && (
            <ResponsiveBox
              aspectWidth={firstImage.width}
              aspectHeight={firstImage.height}
              maxWidth="100%"
              bg="mono10"
            >
              <Image
                src={firstImage.src}
                srcSet={firstImage.srcSet}
                width="100%"
                height="100%"
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

          <Text variant="lg-display" color="mono60" mt={0.5}>
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
                onClick={trackArticleClick}
              />
            )
          })}
        </Masonry>
      </Column>
    </GridColumns>
  )
}

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

export const ArtistEditorialNewsGridQueryRenderer: FC<
  React.PropsWithChildren<{
    id: string
  }>
> = ({ id }) => {
  return (
    <ClientSuspense fallback={PLACEHOLDER}>
      <ArtistEditorialNewsGridContent id={id} />
    </ClientSuspense>
  )
}

const ArtistEditorialNewsGridContent: FC<
  React.PropsWithChildren<{
    id: string
  }>
> = ({ id }) => {
  const data = useLazyLoadQuery<ArtistEditorialNewsGridQuery>(
    graphql`
      query ArtistEditorialNewsGridQuery($id: String!) {
        artist(id: $id) {
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
      }
    `,
    { id },
    { fetchPolicy: "store-or-network" },
  )

  if (!data.artist) return null

  return <ArtistEditorialNewsGrid artist={data.artist} />
}
