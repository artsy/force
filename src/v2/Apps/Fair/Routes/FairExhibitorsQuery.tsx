import { graphql } from "react-relay"

export const FairExhibitorsQuery = graphql`
  query FairExhibitorsQuery(
    $id: String!
    $first: Int
    $after: String
    $sort: ShowSorts
  ) {
    fair(id: $id) {
      ...FairExhibitors_fair
        @arguments(first: $first, after: $after, sort: $sort)
    }
  }
`
