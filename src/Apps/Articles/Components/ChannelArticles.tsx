import { Box, Button, Column, GridColumns, Text } from "@artsy/palette"
import { FC, useState } from "react"
import {
  createPaginationContainer,
  graphql,
  RelayPaginationProp,
} from "react-relay"
import { CellArticleFragmentContainer } from "Components/Cells/CellArticle"
import { extractNodes } from "Utils/extractNodes"
import { ChannelArticles_channel$data } from "__generated__/ChannelArticles_channel.graphql"

interface ChannelArticlesProps {
  channel: ChannelArticles_channel$data
  relay: RelayPaginationProp
}

export const ChannelArticles: FC<ChannelArticlesProps> = ({
  channel,
  relay,
}) => {
  const [loading, setLoading] = useState(false)

  const articles = extractNodes(channel.articlesConnection)

  const handleClick = () => {
    if (!relay.hasMore() || relay.isLoading()) return

    setLoading(true)

    relay.loadMore(9, err => {
      if (err) console.error(err)
      setLoading(false)
    })
  }

  if (articles.length === 0) {
    return <Text variant="lg-display">Nothing yet.</Text>
  }

  return (
    <>
      <GridColumns gridRowGap={4}>
        {articles.map(article => {
          return (
            <Column key={article.internalID} span={4}>
              <CellArticleFragmentContainer article={article} mode="GRID" />
            </Column>
          )
        })}
      </GridColumns>

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

export const CHANNEL_ARTICLES_QUERY = graphql`
  query ChannelArticlesQuery($id: ID!, $after: String) {
    channel(id: $id) {
      ...ChannelArticles_channel @arguments(after: $after)
    }
  }
`

export const ChannelArticlesPaginationContainer = createPaginationContainer(
  ChannelArticles,
  {
    channel: graphql`
      fragment ChannelArticles_channel on Channel
        @argumentDefinitions(after: { type: "String" }) {
        articlesConnection(first: 9, after: $after, sort: PUBLISHED_AT_DESC)
          @connection(key: "ChannelArticles_articlesConnection") {
          edges {
            node {
              ...CellArticle_article
              internalID
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
    query: CHANNEL_ARTICLES_QUERY,
  }
)
