import React from "react"
import { createRefetchContainer, graphql } from "react-relay"
import { FairOrganizerDedicatedArticlesQuery } from "./FairOrganizerDedicatedArticlesQuery"

export const FairOrganizerDedicatedArticles = ({ fairOrganizer }) => {
  return <>Dedicated Articles</>
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
        articles: articlesConnection(first: $first, page: $page) {
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
              title
            }
          }
        }
      }
    `,
  },
  FairOrganizerDedicatedArticlesQuery
)
