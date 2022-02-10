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
} from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleShare } from "v2/Components/ArticleShare"
import { TopContextBar } from "v2/Components/TopContextBar"
import { RouterLink } from "v2/System/Router/RouterLink"
import { getENV } from "v2/Utils/getENV"
import { ArticleSeries_article } from "v2/__generated__/ArticleSeries_article.graphql"

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

      <Join separator={<Spacer mt={12} />}>
        <Text variant="xxl" textAlign="center" mt={4}>
          {article.title}
        </Text>

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
                          {relatedArticle.title}
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
                    </ResponsiveBox>
                  </Column>
                </GridColumns>
              </RouterLink>
            )
          })}
        </Join>

        {article.series?.description && (
          <GridColumns>
            <Column span={4}>
              <Text variant="xl" mb={2}>
                About the Series
              </Text>

              <ArticleShare
                description={article.title ?? "Artsy Editorial"}
                url={`${getENV("APP_URL")}${article.href}`}
              />
            </Column>

            <Column span={8}>
              <HTML variant="lg" html={article.series.description} />
            </Column>
          </GridColumns>
        )}
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
        relatedArticles {
          internalID
          href
          title
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
        }
      }
    `,
  }
)
