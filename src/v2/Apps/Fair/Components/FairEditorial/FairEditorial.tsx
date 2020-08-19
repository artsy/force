import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairEditorial_fair } from "v2/__generated__/FairEditorial_fair.graphql"
import { Box, BoxProps, Join, Spacer } from "@artsy/palette"
import { FairEditorialItemFragmentContainer as FairEditorialItem } from "./FairEditorialItem"

interface FairEditorialProps extends BoxProps {
  fair: FairEditorial_fair
}

export const FairEditorial: React.FC<FairEditorialProps> = ({
  fair,
  ...rest
}) => {
  return (
    <Box {...rest}>
      <Join separator={<Spacer my={2} />}>
        {fair.articles.edges.map(({ node: article }) => {
          return <FairEditorialItem key={article.id} article={article} />
        })}
      </Join>
    </Box>
  )
}

export const FairEditorialFragmentContainer = createFragmentContainer(
  FairEditorial,
  {
    fair: graphql`
      fragment FairEditorial_fair on Fair {
        articles: articlesConnection(first: 5, sort: PUBLISHED_AT_DESC) {
          edges {
            node {
              id
              ...FairEditorialItem_article
            }
          }
        }
      }
    `,
  }
)
