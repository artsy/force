import { graphql } from "react-relay"

export const FailureQuery = graphql`
  query RequestConditionReportQueriesFailureQuery($artworkID: String!) {
    me {
      ...RequestConditionReport_me
    }

    artwork(id: $artworkID) {
      ...RequestConditionReport_artwork
    }
  }
`

export const SuccessQuery = graphql`
  query RequestConditionReportQueriesSuccessQuery($artworkID: String!) {
    me {
      ...RequestConditionReport_me
    }

    artwork(id: $artworkID) {
      ...RequestConditionReport_artwork
    }
  }
`

export const UnauthenticatedQuery = graphql`
  query RequestConditionReportQueriesUnauthenticatedQuery($artworkID: String!) {
    me {
      ...RequestConditionReport_me
    }

    artwork(id: $artworkID) {
      ...RequestConditionReport_artwork
    }
  }
`
