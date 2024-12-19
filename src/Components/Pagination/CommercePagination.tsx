import { createFragmentContainer, graphql } from "react-relay"
import { Pagination } from "./index"

export const CommercePaginationFragmentContainer = createFragmentContainer(
  Pagination,
  {
    pageCursors: graphql`
      fragment CommercePagination_pageCursors on CommercePageCursors {
        around {
          cursor
          page
          isCurrent
        }
        first {
          cursor
          page
          isCurrent
        }
        last {
          cursor
          page
          isCurrent
        }
        previous {
          cursor
          page
        }
      }
    `,
  }
)
