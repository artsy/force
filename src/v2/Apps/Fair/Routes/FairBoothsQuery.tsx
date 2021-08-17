import { graphql } from "react-relay"

export const FairBoothsQuery = graphql`
  query FairBoothsQuery(
    $id: String!
    $first: Int
    $page: Int
    $sort: ShowSorts
  ) {
    fair(id: $id) {
      ...FairBooths_fair @arguments(first: $first, page: $page, sort: $sort)
    }
  }
`
