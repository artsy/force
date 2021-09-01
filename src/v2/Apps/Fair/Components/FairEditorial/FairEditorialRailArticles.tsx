import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairEditorialRailArticles_fair } from "v2/__generated__/FairEditorialRailArticles_fair.graphql"
import { FairEditorialItemFragmentContainer as FairEditorialItem } from "./FairEditorialItem"
import { Shelf } from "@artsy/palette"
import { extractNodes } from "v2/Utils/extractNodes"

export interface FairBoothRailArtworksProps {
  fair: FairEditorialRailArticles_fair
}

const FairEditorialRailArticles: React.FC<FairBoothRailArtworksProps> = ({
  fair,
}) => {
  const articles = extractNodes(fair.articlesConnection)

  return (
    <Shelf alignItems="flex-start">
      {articles.map(article => {
        return <FairEditorialItem key={article.id} article={article} />
      })}
    </Shelf>
  )
}

export const FairEditorialRailArticlesFragmentContainer = createFragmentContainer(
  FairEditorialRailArticles,
  {
    fair: graphql`
      fragment FairEditorialRailArticles_fair on Fair {
        articlesConnection(first: 6, sort: PUBLISHED_AT_DESC) {
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
