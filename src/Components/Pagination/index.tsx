import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Pagination_pageCursors$data } from "__generated__/Pagination_pageCursors.graphql"
import { CommercePagination_pageCursors$data } from "__generated__/CommercePagination_pageCursors.graphql"
import {
  Pagination as PaginationBase,
  PaginationProps as BasePaginationProps,
  BoxProps,
} from "@artsy/palette"
import { useComputeHref } from "./useComputeHref"
import { userIsForcingNavigation } from "System/Router/Utils/catchLinks"
import { useJump } from "Utils/Hooks/useJump"

export interface PaginationProps
  extends Pick<BasePaginationProps, "getHref">,
    BoxProps {
  hasNextPage: boolean
  // TODO: Hacks around stitching. See if we can transform the schema to make this unnecessary.
  pageCursors?:
    | Pagination_pageCursors$data
    | CommercePagination_pageCursors$data
  scrollTo?: string
  offset?: number
  onClick?: (cursor: string, page: number) => void
  onNext?: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  hasNextPage,
  pageCursors,
  scrollTo = null,
  getHref: __getHref__,
  onClick = _cursor => ({}),
  onNext = () => ({}),
  offset,
  ...rest
}) => {
  const { jumpTo } = useJump({ offset })

  const getHref = __getHref__ ?? useComputeHref()

  if (pageCursors?.around.length === 1) {
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

    if (!scrollTo) return

    jumpTo(scrollTo, { offset })
  }

  const handleNext = (event: React.MouseEvent, page: number) => {
    if (userIsForcingNavigation(event)) return

    event.preventDefault()

    onNext(page)

    if (!scrollTo) return

    jumpTo(scrollTo, { offset })
  }

  const paginationProps: BasePaginationProps = {
    getHref,
    hasNextPage,
    onClick: handleClick,
    onNext: handleNext,
    // FIXME:
    pageCursors: pageCursors as any,
  }

  return (
    // FIXME: Should not have external margin
    <PaginationBase mt={6} {...paginationProps} {...rest} />
  )
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
