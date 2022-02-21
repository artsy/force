import { Box, Col, Flex, Grid, Image, Row, Sans } from "@artsy/palette"
import { FeaturedArticles_articles$data } from "v2/__generated__/FeaturedArticles_articles.graphql"
import { StyledLink } from "./StyledLink"
import { AnalyticsSchema } from "v2/System"
import { useTracking } from "v2/System/Analytics/useTracking"
import { RouterLink } from "v2/System/Router/RouterLink"
import * as React from "react"
import { createFragmentContainer } from "react-relay"
import { graphql } from "relay-runtime"
import styled from "styled-components"
import { Media } from "v2/Utils/Responsive"

interface FeaturedArticlesProps {
  featured_article_id: string
  article_1_id: string
  article_2_id: string
  article_3_id: string
  view_more_url: string
  articles: FeaturedArticles_articles$data
}

const FeaturedArticles: React.FC<FeaturedArticlesProps> = props => {
  const articles = [...props.articles]

  const firstArticle = articles.shift()
  const firstArticleImage = firstArticle?.thumbnailImage?.cropped

  const tracking = useTracking()

  const trackClick = (destinationPath: string) => {
    tracking.trackEvent({
      action_type: AnalyticsSchema.ActionType.Click,
      context_module: AnalyticsSchema.ContextModule.Editorial,
      destination_path: destinationPath,
    })
  }

  if (articles.length === 0) {
    return null
  }

  return (
    <Grid fluid>
      <Row>
        <Col md={6}>
          <Box pr={[0, 0, 1]}>
            <StyledLink
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              to={firstArticle.href}
              // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
              onClick={() => trackClick(firstArticle.href)}
            >
              {firstArticleImage && (
                <div
                  style={{
                    width: "100%",
                    paddingBottom: `${
                      (firstArticleImage.height / firstArticleImage.width) * 100
                    }%`,
                    backgroundImage: `url(${firstArticle?.thumbnailImage?.cropped?.url})`,
                    backgroundSize: "contain",
                  }}
                />
              )}
              <Sans size={["4t", "4t", "6"]} my={1}>
                {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
                {firstArticle.thumbnailTitle}
              </Sans>
              <Sans size="2" color="black60">
                {/* @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION */}
                {firstArticle.publishedAt}
              </Sans>
            </StyledLink>
          </Box>
          <Media lessThan="md">
            <ArticleSeparator my={2} />
          </Media>
        </Col>
        <Col md={6}>
          {articles.map((article, index) => {
            return (
              <Box ml={[0, 0, 1]} key={`article-${index}`}>
                <StyledLink
                  to={article.href}
                  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                  onClick={() => trackClick(article.href)}
                >
                  <Flex width="100%" justifyContent="space-between">
                    <Box width="70%" maxWidth={["none", "400px"]} mr={[1, 2]}>
                      <Sans size={["2", "3t"]} mb="5px">
                        {article.thumbnailTitle}
                      </Sans>
                      <Sans size="2" color="black60">
                        {article.publishedAt}
                      </Sans>
                    </Box>
                    <Box maxWidth={["90px", "120px"]}>
                      <Image
                        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                        src={article.tinyImage.cropped.url}
                        width="60px"
                        height={60}
                        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
                        alt={article.thumbnailTitle}
                      />
                    </Box>
                  </Flex>
                </StyledLink>
                <ArticleSeparator my={2} />
              </Box>
            )
          })}
          <RouterLink
            to={props.view_more_url}
            onClick={() => {
              tracking.trackEvent({
                action_type: AnalyticsSchema.ActionType.Click,
                context_module: AnalyticsSchema.ContextModule.Editorial,
                destination_path: props.view_more_url,
                subject: "View more",
              })
            }}
          >
            <Sans size="2" ml={[0, 0, 1]}>
              View more
            </Sans>
          </RouterLink>
        </Col>
      </Row>
    </Grid>
  )
}

export const FeaturedArticlesFragmentContainer = createFragmentContainer(
  FeaturedArticles,
  {
    articles: graphql`
      fragment FeaturedArticles_articles on Article @relay(plural: true) {
        thumbnailTitle
        publishedAt(format: "MMM Do, YYYY")
        thumbnailImage {
          cropped(width: 1170, height: 780) {
            width
            height
            url
          }
        }
        tinyImage: thumbnailImage {
          cropped(width: 120, height: 120) {
            url
          }
        }
        href
      }
    `,
  }
)

const ArticleSeparator = styled(Box)`
  border-top: 1px solid #e5e5e5;
`
