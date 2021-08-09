import { Box, Column, GridColumns, Spacer, Text } from "@artsy/palette"
import React from "react"
import { createRefetchContainer, graphql } from "react-relay"
import { FairEditorialItemFragmentContainer as FairEditorialItem } from "v2/Apps/Fair/Components/FairEditorial/FairEditorialItem"
import { extractNodes } from "v2/Utils/extractNodes"
import { FairOrganizerDedicatedArticlesQuery } from "./FairOrganizerDedicatedArticlesQuery"
import { FairOrganizerDedicatedArticles_fairOrganizer } from "v2/__generated__/FairOrganizerDedicatedArticles_fairOrganizer.graphql"

interface FairOrganizerDedicatedArticlesProps {
  fairOrganizer: FairOrganizerDedicatedArticles_fairOrganizer
}

export const FairOrganizerDedicatedArticles: React.FC<FairOrganizerDedicatedArticlesProps> = ({
  fairOrganizer,
}) => {
  const { name, articlesConnection } = fairOrganizer
  const articles = extractNodes(articlesConnection)

  return (
    <Box>
      <Text as="h1" variant="lg" mt={6}>
        All Articles for Explore {name} on Artsy
      </Text>

      <Spacer mt={4} />

      <GridColumns>
        {articles.map(article => (
          <Column key={article.id} span={[12, 6, 3, 3]}>
            <FairEditorialItem article={article as any} />
          </Column>
        ))}
      </GridColumns>
    </Box>
  )
}

export const FairOrganizerDedicatedArticlesFragmentContainer = createRefetchContainer(
  FairOrganizerDedicatedArticles,
  {
    fairOrganizer: graphql`
      fragment FairOrganizerDedicatedArticles_fairOrganizer on FairOrganizer
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 16 }
          page: { type: "Int", defaultValue: 1 }
        ) {
        slug
        name
        articlesConnection(first: $first, page: $page) {
          totalCount
          pageInfo {
            hasNextPage
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          edges {
            node {
              id
              ...FairEditorialItem_article
            }
          }
        }
      }
    `,
  },
  FairOrganizerDedicatedArticlesQuery
)
