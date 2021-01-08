import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "v2/Utils/Responsive"
import { ScrollIntoView } from "v2/Utils/ScrollIntoView"
import { Pagination_pageCursors } from "v2/__generated__/Pagination_pageCursors.graphql"

import {
  Box,
  LargePagination,
  Separator,
  SmallPagination,
  PaginationProps,
} from "@artsy/palette"
import { useComputeHref } from "./useComputeHref"
import { userIsForcingNavigation } from "v2/Artsy/Router/Utils/catchLinks"

interface Props {
  hasNextPage: boolean
  pageCursors: Pagination_pageCursors
  scrollTo?: string
  getHref?: PaginationProps["getHref"]
  onClick?: (cursor: string, page: number) => void
  onNext?: (page: number) => void
}

export const Pagination: React.FC<Props> = ({
  hasNextPage,
  pageCursors,
  scrollTo = null,
  getHref: __getHref__,
  onClick = _cursor => ({}),
  onNext = () => ({}),
}) => {
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
  }

  const handleNext = (event: React.MouseEvent, page: number) => {
    if (userIsForcingNavigation(event)) return
    event.preventDefault()
    onNext(page)
  }

  const paginationProps: PaginationProps = {
    getHref,
    hasNextPage,
    onClick: handleClick,
    onNext: handleNext,
    pageCursors: pageCursors as any,
    scrollTo,
  }

  return (
    <ScrollIntoView selector={scrollTo}>
      <Media at="xs">
        <SmallPagination {...paginationProps} />
      </Media>
      <Media greaterThan="xs">
        <Box>
          <Separator mb={3} pr={2} />
          <LargePagination {...paginationProps} />
        </Box>
      </Media>
    </ScrollIntoView>
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
