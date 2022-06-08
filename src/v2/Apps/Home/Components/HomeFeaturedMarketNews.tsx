import {
  ActionType,
  ClickedArticleGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import {
  Image,
  Text,
  Spacer,
  Flex,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  GridColumns,
  Column,
  ResponsiveBox,
} from "@artsy/palette"
import { compact, take } from "lodash"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Masonry } from "v2/Components/Masonry"
import { useSystemContext, useTracking } from "v2/System"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import { RouterLink } from "v2/System/Router/RouterLink"
import { Media } from "v2/Utils/Responsive"
import { HomeFeaturedMarketNewsQuery } from "v2/__generated__/HomeFeaturedMarketNewsQuery.graphql"
import { HomeFeaturedMarketNews_articles } from "v2/__generated__/HomeFeaturedMarketNews_articles.graphql"
import {
  CellArticleFragmentContainer,
  CellArticlePlaceholder,
} from "v2/Components/Cells/CellArticle"

const ARTICLE_COUNT = 6

interface HomeFeaturedMarketNewsProps {
  articles: HomeFeaturedMarketNews_articles
}
const HomeFeaturedMarketNews: React.FC<HomeFeaturedMarketNewsProps> = ({
  articles,
}) => {
  const { trackEvent } = useTracking()
  const [firstArticle, ...restOfArticles] = articles
  const truncatedRestOfArticles = take(restOfArticles, ARTICLE_COUNT)
  const firstImage = firstArticle.thumbnailImage?.large

  return (
    <HomeFeaturedMarketNewsContainer>
      <GridColumns>
        <Column span={[12, 6]} mb={[4, 0]}>
          <RouterLink
            key={firstArticle.internalID}
            to={firstArticle.href ?? ""}
            display="block"
            textDecoration="none"
            onClick={() => {
              const trackingEvent: ClickedArticleGroup = {
                action: ActionType.clickedArticleGroup,
                context_module: ContextModule.marketNews,
                context_page_owner_type: OwnerType.home,
                context_page_owner_id: firstArticle.internalID,
                context_page_owner_slug: firstArticle.slug ?? "",
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
    </HomeFeaturedMarketNewsContainer>
  )
}

const HomeFeaturedMarketNewsContainer: React.FC = ({ children }) => {
  const { trackEvent } = useTracking()

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Text variant="xl">Market News</Text>

        <Text
          variant="sm-display"
          textAlign="right"
          as={RouterLink}
          // @ts-ignore
          to="/articles"
          onClick={() => {
            const trackingEvent: ClickedArticleGroup = {
              action: ActionType.clickedArticleGroup,
              context_module: ContextModule.marketNews,
              context_page_owner_type: OwnerType.home,
              destination_page_owner_type: OwnerType.articles,
              type: "viewAll",
            }
            trackEvent(trackingEvent)
          }}
        >
          Explore Editorial
        </Text>
      </Flex>

      <Spacer mt={4} />

      {children}
    </>
  )
}

export const HomeFeaturedMarketNewsFragmentContainer = createFragmentContainer(
  HomeFeaturedMarketNews,
  {
    articles: graphql`
      fragment HomeFeaturedMarketNews_articles on Article @relay(plural: true) {
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
    `,
  }
)

const PLACEHOLDER = (
  <Skeleton>
    <HomeFeaturedMarketNewsContainer>
      <GridColumns>
        <Column span={6}>
          <Media greaterThan="xs">
            <SkeletonBox bg="black30" width="670" height={720} mb={2} />

            <SkeletonText variant="xs" textTransform="uppercase" my={1}>
              Art Fairs
            </SkeletonText>

            <SkeletonText variant="xl">
              Essential Tips for Collecting Work by Anni and Josef Albers
            </SkeletonText>

            <SkeletonText variant="lg-display" mt={1}>
              By Artsy Editorial
            </SkeletonText>
          </Media>
        </Column>

        <Column span={[12, 6]}>
          <Masonry columnCount={2}>
            {[...new Array(8)].map((_, i) => {
              return <CellArticlePlaceholder key={i} />
            })}
          </Masonry>
        </Column>
      </GridColumns>
    </HomeFeaturedMarketNewsContainer>
  </Skeleton>
)

export const HomeFeaturedMarketNewsQueryRenderer: React.FC = () => {
  const { relayEnvironment } = useSystemContext()

  return (
    <SystemQueryRenderer<HomeFeaturedMarketNewsQuery>
      lazyLoad
      environment={relayEnvironment}
      query={graphql`
        query HomeFeaturedMarketNewsQuery {
          articles(featured: true, published: true, sort: PUBLISHED_AT_DESC) {
            ...HomeFeaturedMarketNews_articles
          }
        }
      `}
      placeholder={PLACEHOLDER}
      render={({ error, props }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props) {
          return PLACEHOLDER
        }

        if (props.articles) {
          return (
            <HomeFeaturedMarketNewsFragmentContainer
              articles={compact(props.articles)}
            />
          )
        }

        return null
      }}
    />
  )
}
