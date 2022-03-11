import {
  Box,
  ChevronIcon,
  Column,
  GridColumns,
  Join,
  Spacer,
  Text,
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
import { ArticleSeriesItemFragmentContainer } from "./ArticleSeriesItem"

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
          return (
            <ArticleSeriesItemFragmentContainer
              key={relatedArticle.internalID}
              article={relatedArticle}
            />
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
          ...ArticleSeriesItem_article
          internalID
        }
      }
    `,
  }
)
