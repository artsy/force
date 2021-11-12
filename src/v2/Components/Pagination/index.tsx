import * as React from "react";
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "v2/Utils/Responsive"
import { Pagination_pageCursors } from "v2/__generated__/Pagination_pageCursors.graphql"
import {
  Pagination as PaginationBase,
  Separator,
  SmallPagination,
  PaginationProps,
  useThemeConfig,
} from "@artsy/palette"
import { useComputeHref } from "./useComputeHref"
import { userIsForcingNavigation } from "v2/System/Router/Utils/catchLinks"
import { scrollIntoView } from "v2/Utils/scrollHelpers"

interface Props {
  hasNextPage: boolean
  pageCursors: Pagination_pageCursors
  scrollTo?: string
  offset?: number
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
  offset,
}) => {
  const getHref = __getHref__ ?? useComputeHref()

  const tokens = useThemeConfig({
    v2: { version: "v2" },
    v3: { version: "v3" },
  })

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

  const paginationProps: PaginationProps = {
    getHref,
    hasNextPage,
    onClick: handleClick,
    onNext: handleNext,
    pageCursors: pageCursors as any,
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    scrollTo,
  }

  return (
    <>
      {tokens.version === "v2" && (
        <>
          <Media at="xs">
            <SmallPagination {...paginationProps} />
          </Media>

          <Media greaterThan="xs">
            <Separator mb={3} />
            <PaginationBase {...paginationProps} />
          </Media>
        </>
      )}

      {tokens.version === "v3" && (
        <PaginationBase mt={6} {...paginationProps} />
      )}
    </>
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
