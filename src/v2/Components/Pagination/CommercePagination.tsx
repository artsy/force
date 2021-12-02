import { Pagination } from "./index"
import { createFragmentContainer, graphql } from "react-relay"

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
