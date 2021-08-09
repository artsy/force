import { graphql } from "react-relay"

export const FairExhibitorsQuery = graphql`
  query FairExhibitorsQuery(
    $id: String!
    $first: Int
    $page: Int
    $sort: ShowSorts
  ) {
    fair(id: $id) {
      ...FairExhibitors_fair @arguments(first: $first, page: $page, sort: $sort)
    }
  }
`
