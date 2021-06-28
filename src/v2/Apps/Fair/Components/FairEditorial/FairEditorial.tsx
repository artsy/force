import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Text } from "@artsy/palette"
import { Carousel } from "v2/Components/Carousel"
import { FairEditorial_fair } from "v2/__generated__/FairEditorial_fair.graphql"
import { FairEditorialItemFragmentContainer as FairEditorialItem } from "./FairEditorialItem"

export const FAIR_EDITORIAL_AMOUNT = 6

interface FairEditorialProps {
  fair: FairEditorial_fair
}

export const FairEditorial: React.FC<FairEditorialProps> = ({ fair }) => {
  return (
    <>
      <Text variant="lg" as="h3" mb={4}>
        Explore Further
      </Text>
      <Carousel>
        {/* @ts-expect-error STRICT_NULL_CHECK */}
        {fair.articlesConnection.edges.map(({ node: article }) => {
          return <FairEditorialItem article={article} key={article.id} />
        })}
      </Carousel>
    </>
  )
}

export const FairEditorialFragmentContainer = createFragmentContainer(
  FairEditorial,
  {
    fair: graphql`
      fragment FairEditorial_fair on Fair {
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
