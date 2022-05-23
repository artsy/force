import {
  Column,
  GridColumns,
  Join,
  Spacer,
  Text,
  HTML,
  FullBleed,
  Flex,
} from "@artsy/palette"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleShare } from "v2/Components/ArticleShare"
import { TopContextBar } from "v2/Components/TopContextBar"
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
      <TopContextBar href="/articles" displayBackArrow>
        {article.byline}
      </TopContextBar>

      <Text variant={["xl", "xxl"]} mt={4}>
        {article.title}
      </Text>

      {article.sponsor && (
        <ArticleSponsorFragmentContainer sponsor={article.sponsor} mt={4} />
      )}

      <Spacer mt={6} />

      <Join separator={<Spacer mt={4} />}>
        {article.relatedArticles.map(relatedArticle => {
          return (
            <ArticleSeriesItemFragmentContainer
              key={relatedArticle.internalID}
              article={relatedArticle}
            />
          )
        })}
      </Join>

      <Spacer mt={6} />

      <GridColumns>
        {article.series?.description && (
          <Column span={6} start={4}>
            <Flex alignItems="center" justifyContent="space-between">
              <Text variant="lg-display">About the Series</Text>

              <ArticleShare
                description={article.title}
                pathname={article.href}
              />
            </Flex>

            {article.sponsor && (
              <ArticleSponsorFragmentContainer
                mt={4}
                sponsor={article.sponsor}
              />
            )}

            <HTML variant="md" mt={4} html={article.series.description} />
          </Column>
        )}
      </GridColumns>

      <Spacer mt={6} />

      <FullBleed p={1} bg="black5">
        <ArticleAd unit="Desktop_InContentLB2" size="970x250" />
      </FullBleed>
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
