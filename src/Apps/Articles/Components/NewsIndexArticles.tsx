import { Box, Button, Join, Separator, Text } from "@artsy/palette"
import { FC, Fragment, useState } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { ArticleAd } from "Apps/Article/Components/ArticleAd/ArticleAd"
import { ArticleBodyFragmentContainer } from "Apps/Article/Components/ArticleBody"
import { extractNodes } from "Utils/extractNodes"
import { NewsIndexArticles_viewer$data } from "__generated__/NewsIndexArticles_viewer.graphql"

interface NewsIndexArticlesProps {
  viewer: NewsIndexArticles_viewer$data
  relay: RelayPaginationProp
}

export const NewsIndexArticles: FC<NewsIndexArticlesProps> = ({
  viewer,
  relay,
}) => {
  const [loading, setLoading] = useState(false)

  const articles = extractNodes(viewer.articlesConnection)

  const handleClick = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    setLoading(true)

    relay.loadMore(15, err => {
      if (err) console.error(err)
      setLoading(false)
    })
  }

  if (articles.length === 0) {
    return <Text variant="lg-display">Nothing yet.</Text>
  }

  return (
    <>
      <Join separator={<Separator my={4} />}>
        {articles.map((article, i) => {
          return (
            <Fragment key={article.internalID}>
              <ArticleBodyFragmentContainer article={article} />

              {/* Insert an ad after every 6th, article; beginning with 3rd */}
              {(i - 2) % 6 === 0 && (
                <ArticleAd
                  size="970x250"
                  unit={(() => {
                    if (i === 2) return "Desktop_Leaderboard1"
                    if (i === 8) return "Desktop_Leaderboard2"
                    return "Desktop_LeaderboardRepeat"
                  })()}
                />
              )}
            </Fragment>
          )
        })}
      </Join>

      {relay.hasMore() && (
        <Box textAlign="center" mt={4}>
          <Button onClick={handleClick} loading={loading}>
            Show More
          </Button>
        </Box>
      )}
    </>
  )
}

export const NEWS_INDEX_ARTICLES_QUERY = graphql`
  query NewsIndexArticlesQuery($after: String) {
    viewer {
      ...NewsIndexArticles_viewer @arguments(after: $after)
    }
  }
`

export const NewsIndexArticlesPaginationContainer = createPaginationContainer(
  NewsIndexArticles,
  {
    viewer: graphql`
      fragment NewsIndexArticles_viewer on Viewer
        @argumentDefinitions(after: { type: "String" }) {
        articlesConnection(
          first: 15
          after: $after
          layout: NEWS
          sort: PUBLISHED_AT_DESC
        ) @connection(key: "NewsIndexArticles_articlesConnection") {
          edges {
            node {
              internalID
              ...ArticleBody_article
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getFragmentVariables(prevVars, totalCount) {
      return { ...prevVars, totalCount }
    },
    getVariables(_, { cursor: after }, fragmentVariables) {
      return { ...fragmentVariables, after }
    },
    query: NEWS_INDEX_ARTICLES_QUERY,
  }
)
