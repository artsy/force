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
import { Masonry } from "Components/Masonry"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useTracking } from "react-tracking"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { RouterLink } from "System/Components/RouterLink"
import { Media } from "Utils/Responsive"
import { HomeFeaturedMarketNewsQuery } from "__generated__/HomeFeaturedMarketNewsQuery.graphql"
import { HomeFeaturedMarketNews_articles$data } from "__generated__/HomeFeaturedMarketNews_articles.graphql"
import {
  CellArticleFragmentContainer,
  CellArticlePlaceholder,
} from "Components/Cells/CellArticle"

const ARTICLE_COUNT = 6

interface HomeFeaturedMarketNewsProps {
  articles: HomeFeaturedMarketNews_articles$data
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

            <Text variant={["lg", "xl"]} mt={0.5}>
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
        <Text variant={["lg-display", "xl"]} mr={2}>
          Artsy Editorial
        </Text>

        <Text
          variant={["xs", "sm-display"]}
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

      <Spacer y={4} />

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
