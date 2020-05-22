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
} from "@artsy/palette"

interface Props {
  onClick?: (cursor: string, page: number) => void
  onNext?: () => void
  pageCursors: Pagination_pageCursors
  hasNextPage: boolean
  scrollTo?: string
}

export class Pagination extends React.Component<Props> {
  static defaultProps = {
    onClick: _cursor => ({}),
    onNext: () => ({}),
    scrollTo: null,
  }

  render() {
    if (this.props.pageCursors.around.length === 1) {
      return null
    }

    return (
      <ScrollIntoView selector={this.props.scrollTo}>
        <Media at="xs">
          <SmallPagination {...this.props} />
        </Media>
        <Media greaterThan="xs">
          <Box>
            <Separator mb={3} pr={2} />
            <LargePagination {...this.props} />
          </Box>
        </Media>
      </ScrollIntoView>
    )
  }
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
