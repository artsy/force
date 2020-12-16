import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Media } from "v2/Utils/Responsive"
import { ScrollIntoView } from "v2/Utils/ScrollIntoView"
import { useArtworkFilterContext } from "v2/Components/v2/ArtworkFilter/ArtworkFilterContext"
import { useRouter } from "v2/Artsy/Router/useRouter"
import { Pagination_pageCursors } from "v2/__generated__/Pagination_pageCursors.graphql"
import { buildUrl } from "v2/Components/v2/ArtworkFilter/Utils/urlBuilder"

import {
  Box,
  LargePagination,
  Separator,
  SmallPagination,
  PaginationProps,
} from "@artsy/palette"

interface Props {
  hasNextPage: boolean
  onClick?: (cursor: string, page: number) => void
  onNext?: () => void
  pageCursors: Pagination_pageCursors
  scrollTo?: string
}

export const Pagination: React.FC<Props> = ({
  hasNextPage,
  onClick = _cursor => ({}),
  onNext = () => ({}),
  pageCursors,
  scrollTo = null,
}) => {
  const filterContext = useArtworkFilterContext()
  const routerContext = useRouter()

  if (pageCursors.around.length === 1) {
    return null
  }

  const currentlySelectedFilters = filterContext.currentlySelectedFilters()
  const pathname = routerContext?.match?.location?.pathname

  const getHref = page => {
    const filterState = {
      ...currentlySelectedFilters,
      page,
    }

    const href = buildUrl(filterState, pathname)
    return href
  }

  const handleClick = (cursor, page, event) => {
    event.preventDefault()
    onClick(cursor, page)
  }

  const handleNext = event => {
    event.preventDefault()
    onNext()
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
