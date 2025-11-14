import { ArticleShare } from "Components/ArticleShare"
import { TopContextBar } from "Components/TopContextBar"
import {
  Column,
  Flex,
  FullBleed,
  GridColumns,
  HTML,
  Join,
  Spacer,
  Text,
} from "@artsy/palette"
import type { ArticleSeries_article$data } from "__generated__/ArticleSeries_article.graphql"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { ArticleAd } from "./ArticleAd/ArticleAd"
import { ArticleSeriesItemFragmentContainer } from "./ArticleSeriesItem"
import { ArticleSponsorFragmentContainer } from "./ArticleSponsor"

interface ArticleSeriesProps {
  article: ArticleSeries_article$data
}

const ArticleSeries: FC<React.PropsWithChildren<ArticleSeriesProps>> = ({
  article,
}) => {
  return (
    <>
      <TopContextBar href="/articles" displayBackArrow>
        {article.byline}
      </TopContextBar>

      <Text as="h1" variant={["xl", "xxl"]} mt={4}>
        {article.title}
      </Text>

      {article.sponsor && (
        <ArticleSponsorFragmentContainer sponsor={article.sponsor} mt={4} />
      )}

      <Spacer y={6} />

      <Join separator={<Spacer y={4} />}>
        {article.relatedArticles.map(relatedArticle => {
          return (
            <ArticleSeriesItemFragmentContainer
              key={relatedArticle.internalID}
              article={relatedArticle}
            />
          )
        })}
      </Join>

      <Spacer y={6} />

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

      <Spacer y={6} />

      <FullBleed p={1} bg="mono5">
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
  },
)
