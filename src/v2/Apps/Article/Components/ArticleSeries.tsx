import {
  Box,
  ChevronIcon,
  Column,
  Flex,
  GridColumns,
  Join,
  ResponsiveBox,
  Spacer,
  Text,
  Image,
  HTML,
  Separator,
} from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleShare } from "v2/Components/ArticleShare"
import { TopContextBar } from "v2/Components/TopContextBar"
import { RouterLink } from "v2/System/Router/RouterLink"
import { ArticleSeries_article } from "v2/__generated__/ArticleSeries_article.graphql"
import { ArticleAd } from "./ArticleAd"
import { ArticleSponsorFragmentContainer } from "./ArticleSponsor"
import styled from "styled-components"
import { themeGet } from "@styled-system/theme-get"

interface ArticleSeriesProps {
  article: ArticleSeries_article
}

const ArticleSeries: FC<ArticleSeriesProps> = ({ article }) => {
  return (
    <>
      <TopContextBar>
        <RouterLink
          to="/articles"
          display="flex"
          alignItems="center"
          textDecoration="none"
        >
          <ChevronIcon direction="left" mr={1} />

          <Text variant="md">{article.byline}</Text>
        </RouterLink>
      </TopContextBar>

      <Box>
        <Text variant="xxl" textAlign="center" mt={4}>
          {article.title}
        </Text>

        {article.sponsor && (
          <ArticleSponsorFragmentContainer
            sponsor={article.sponsor}
            mt={4}
            display="flex"
            flexDirection="column"
            textAlign="center"
            alignItems="center"
          />
        )}
      </Box>

      <Spacer mt={12} />

      <Join separator={<Spacer mt={4} />}>
        {article.relatedArticles.map(relatedArticle => {
          const image = relatedArticle.thumbnailImage?.display

          return (
            <RouterLink
              to={relatedArticle.href}
              display="block"
              textDecoration="none"
            >
              <GridColumns
                key={relatedArticle.internalID}
                border="1px solid"
                borderColor="black100"
                gridRowGap={2}
                p={[2, 4]}
              >
                <Column span={6} order={[1, 0]}>
                  <Flex
                    flexDirection="column"
                    justifyContent="space-between"
                    height="100%"
                  >
                    <Box>
                      <Text variant="xs" textTransform="uppercase" mb={0.5}>
                        {article.title}
                      </Text>

                      <Text variant="xl" mb={2}>
                        {relatedArticle.thumbnailTitle ?? relatedArticle.title}
                      </Text>

                      <Text variant="lg">{relatedArticle.description}</Text>
                    </Box>

                    <Flex mt={4}>
                      <Text variant="xs" textTransform="uppercase">
                        {relatedArticle.byline}
                      </Text>

                      <Text variant="xs" textTransform="uppercase" ml={2}>
                        {relatedArticle.publishedAt}
                      </Text>
                    </Flex>
                  </Flex>
                </Column>

                <Column span={6}>
                  <ResponsiveBox
                    position="relative"
                    aspectWidth={869}
                    aspectHeight={580}
                    maxWidth="100%"
                    bg="black30"
                  >
                    {image && (
                      <Image
                        src={image.src}
                        srcSet={image.srcSet}
                        width="100%"
                        height="100%"
                        lazyLoad
                      />
                    )}

                    {relatedArticle.media && (
                      <>
                        <Play
                          position="absolute"
                          bottom={2}
                          left={2}
                          color="white100"
                        />

                        <Text
                          variant="xs"
                          color="white100"
                          position="absolute"
                          bottom={1}
                          right={2}
                        >
                          {relatedArticle.media.duration}
                        </Text>
                      </>
                    )}
                  </ResponsiveBox>
                </Column>
              </GridColumns>
            </RouterLink>
          )
        })}

        <GridColumns>
          {article.series?.description && (
            <>
              <Column
                span={3}
                start={3}
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Box>
                  <Text variant="xl" mb={2}>
                    About the Series
                  </Text>

                  <ArticleShare
                    description={article.title}
                    pathname={article.href}
                  />
                </Box>

                {article.sponsor && (
                  <ArticleSponsorFragmentContainer
                    mt={4}
                    sponsor={article.sponsor}
                  />
                )}
              </Column>

              <Column span={5}>
                <HTML variant="sm" html={article.series.description} />
              </Column>
            </>
          )}

          <Column span={12}>
            <Separator mb={4} />

            <ArticleAd unit="Desktop_InContentLB2" size="970x250" />
          </Column>
        </GridColumns>
      </Join>
    </>
  )
}

export const ArticleSeriesFragmentContainer = createFragmentContainer(
  ArticleSeries,
  {
    article: graphql`
      fragment ArticleSeries_article on Article {
        title
        byline
        href
        series {
          description
        }
        sponsor {
          ...ArticleSponsor_sponsor
        }
        relatedArticles {
          internalID
          href
          title
          thumbnailTitle
          byline
          description
          publishedAt(format: "MMM DD, YYYY")
          thumbnailImage {
            # 3:2 aspect ratio
            display: cropped(width: 869, height: 580) {
              src
              srcSet
            }
          }
          media {
            duration
          }
        }
      }
    `,
  }
)

const Play = styled(Box)`
  &:after {
    content: "";
    display: block;
    color: currentColor;
    border-top: 15px solid transparent;
    border-bottom: 15px solid transparent;
    border-left: 30px solid;
  }
`
