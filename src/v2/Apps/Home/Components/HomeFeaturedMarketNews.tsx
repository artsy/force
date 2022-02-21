import {
  ActionType,
  ClickedArticleGroup,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import {
  Box,
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
import { HomeFeaturedMarketNews_articles$data } from "v2/__generated__/HomeFeaturedMarketNews_articles.graphql"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

const ARTICLE_COUNT = 6

interface HomeFeaturedMarketNewsProps {
  articles: HomeFeaturedMarketNews_articles$data
}

const StyledRouterLink = styled(RouterLink)`
  text-decoration: none;
  &:hover {
    color: ${themeGet("colors.blue100")};
  }
`

const HomeFeaturedMarketNews: React.FC<HomeFeaturedMarketNewsProps> = ({
  articles,
}) => {
  const { trackEvent } = useTracking()
  const [firstArticle, ...restOfArticles] = articles
  const firstImage = firstArticle.thumbnailImage?.large
  const articlesList = take(restOfArticles, ARTICLE_COUNT)

  return (
    <HomeFeaturedMarketNewsContainer>
      <GridColumns>
        <Column span={[12, 6]} mb={[4, 0]}>
          <StyledRouterLink
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

            <Text variant="xs" textTransform="uppercase" my={1}>
              {firstArticle.vertical}
            </Text>

            <Text variant="xl">{firstArticle.title}</Text>

            <Text variant="lg" mt={1}>
              By {firstArticle.byline}
            </Text>
          </StyledRouterLink>
        </Column>

        <Column span={[12, 6]}>
          <Masonry columnCount={2}>
            {articlesList.map(article => {
              const image = article.thumbnailImage?.small

              return (
                <StyledRouterLink
                  key={article.internalID}
                  to={article.href ?? ""}
                  textDecoration="none"
                  onClick={() => {
                    const trackingEvent: ClickedArticleGroup = {
                      action: ActionType.clickedArticleGroup,
                      context_module: ContextModule.marketNews,
                      context_page_owner_type: OwnerType.home,
                      context_page_owner_id: article.internalID,
                      context_page_owner_slug: article.slug ?? "",
                      destination_page_owner_type: OwnerType.article,
                      type: "thumbnail",
                    }
                    trackEvent(trackingEvent)
                  }}
                >
                  <Box mb={4}>
                    {image && (
                      <ResponsiveBox
                        aspectWidth={image.width}
                        aspectHeight={image.height}
                        maxWidth="100%"
                        display="block"
                      >
                        <Image
                          width="100%"
                          height="100%"
                          src={image.src}
                          srcSet={image.srcSet}
                          style={{ display: "block" }}
                          lazyLoad
                        />
                      </ResponsiveBox>
                    )}

                    <Text variant="xs" textTransform="uppercase" my={1}>
                      {article.vertical}
                    </Text>

                    <Text variant="lg">{article.title}</Text>

                    <Text variant="md" mt={1}>
                      By {article.byline}
                    </Text>
                  </Box>
                </StyledRouterLink>
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
          variant="sm"
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
        internalID
        href
        byline
        slug
        title
        publishedAt(format: "MMM D YYYY")
        vertical
        thumbnailTitle
        thumbnailImage {
          large: cropped(width: 670, height: 720) {
            width
            height
            src
            srcSet
          }

          small: cropped(width: 325, height: 240) {
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

            <SkeletonText variant="lg" mt={1}>
              By Artsy Editorial
            </SkeletonText>
          </Media>
        </Column>

        <Column span={[12, 6]}>
          <Masonry columnCount={2}>
            {[...new Array(8)].map((_, i) => {
              return (
                <React.Fragment key={i}>
                  <Box mb={4}>
                    <Media at="xs">
                      <SkeletonBox
                        bg="black30"
                        width="100%"
                        height={300}
                        mb={1}
                      />
                    </Media>
                    <Media greaterThan="xs">
                      <ResponsiveBox
                        aspectWidth={325}
                        aspectHeight={280}
                        maxWidth="100%"
                      >
                        <SkeletonBox
                          bg="black30"
                          height="100%"
                          width="100%"
                          mb={1}
                        />
                      </ResponsiveBox>
                    </Media>

                    <SkeletonText variant="xs" textTransform="uppercase" my={1}>
                      Art Fairs
                    </SkeletonText>

                    <SkeletonText variant="lg">
                      Essential Tips for Collecting Work by Anni and Josef
                      Albers
                    </SkeletonText>

                    <SkeletonText variant="md" mt={1}>
                      By Artsy Editorial
                    </SkeletonText>
                  </Box>
                </React.Fragment>
              )
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
