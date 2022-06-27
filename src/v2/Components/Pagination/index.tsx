import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Pagination_pageCursors } from "v2/__generated__/Pagination_pageCursors.graphql"
import { CommercePagination_pageCursors } from "v2/__generated__/CommercePagination_pageCursors.graphql"
import {
  Pagination as PaginationBase,
  PaginationProps as BasePaginationProps,
} from "@artsy/palette"
import { useComputeHref } from "./useComputeHref"
import { userIsForcingNavigation } from "v2/System/Router/Utils/catchLinks"
import { scrollIntoView } from "v2/Utils/scrollHelpers"

export interface PaginationProps {
  hasNextPage: boolean
  // TODO: Hacks around stitching. See if we can transform the schema to make this unnecessary.
  pageCursors: Pagination_pageCursors | CommercePagination_pageCursors
  scrollTo?: string
  offset?: number
  getHref?: BasePaginationProps["getHref"]
  onClick?: (cursor: string, page: number) => void
  onNext?: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = props => {
  const {
    hasNextPage,
    pageCursors,
    scrollTo = null,
    getHref: __getHref__,
    onClick = _cursor => ({}),
    onNext = () => ({}),
    offset,
  } = props
  const getHref = __getHref__ ?? useComputeHref()

  if (pageCursors.around.length === 1) {
    return null
  }

  const handleClick = (
    cursor: string,
    page: number,
    event: React.MouseEvent
  ) => {
    if (userIsForcingNavigation(event)) return
    event.preventDefault()
    onClick(cursor, page)
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    scrollIntoView({ selector: scrollTo, offset })
  }

  const handleNext = (event: React.MouseEvent, page: number) => {
    if (userIsForcingNavigation(event)) return
    event.preventDefault()
    onNext(page)
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    scrollIntoView({ selector: scrollTo, offset })
  }

  const paginationProps: BasePaginationProps = {
    getHref,
    hasNextPage,
    onClick: handleClick,
    onNext: handleNext,
    pageCursors: pageCursors as any,
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    scrollTo,
  }

  return (
    // TODO: Should not have external margin
    <PaginationBase mt={6} {...paginationProps} />
  )
}

Pagination.defaultProps = {
  offset: 40,
}

export const PaginationFragmentContainer = createFragmentContainer(Pagination, {
  pageCursors: graphql`
    fragment Pagination_pageCursors on PageCursors {
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
})
