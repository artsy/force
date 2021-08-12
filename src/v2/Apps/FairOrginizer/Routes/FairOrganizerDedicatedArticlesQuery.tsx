import { graphql } from "react-relay"

export const FairOrganizerDedicatedArticlesQuery = graphql`
  query FairOrganizerDedicatedArticlesQuery(
    $id: String!
    $first: Int
    $page: Int
  ) {
    fairOrganizer(id: $id) {
      ...FairOrganizerDedicatedArticles_fairOrganizer
        @arguments(first: $first, page: $page)
    }
  }
`
