import React, { useState } from "react"
import { graphql, createRefetchContainer, RelayRefetchProp } from "react-relay"
import { updateUrl } from "v2/Components/ArtworkFilter/Utils/urlBuilder"
import { Box } from "@artsy/palette"
import { FairExhibitors_fair } from "v2/__generated__/FairExhibitors_fair.graphql"
import {
  ExhibitorFilterContextProvider,
  useExhibitorsFilterContext,
} from "./ExhibitorFilterContext"
import { FairExhibitorsQuery } from "./FairExhibitorsQuery"
import { FairExhibitorRail } from "../Components/FairExhibitorRail"
import { PaginationFragmentContainer as Pagination } from "v2/Components/Pagination"
import { LoadingArea } from "v2/Components/LoadingArea"
import { FairExhibitorSortFilter } from "../Components/FairExhibitorSortFilter"

interface FairExhibitorsProps {
  fair: FairExhibitors_fair
  relay: RelayRefetchProp
}

const FairExhibitors: React.FC<FairExhibitorsProps> = ({ fair, relay }) => {
  const context = useExhibitorsFilterContext()

  const {
    pageInfo: { hasNextPage },
    pageCursors,
  } = fair.exhibitors!

  function loadPage(page) {
    context.setFilter("page", page)
  }

  function loadNext() {
    if (fair.exhibitors?.pageInfo.hasNextPage) {
      loadPage(context.filters.page + 1)
    }
  }

  return (
    <LoadingArea isLoading={false}>
      <FairExhibitorSortFilter />

      {fair.exhibitors!.edges!.map((edge, index) => {
        const show = edge?.node!
        if (show?.counts?.artworks === 0 || !show?.partner) {
          // Skip rendering of booths without artworks
          return null
        }

        return (
          <Box my={6} key={index}>
            <FairExhibitorRail key={show.id} show={show as any} />
          </Box>
        )
      })}

      <Pagination
        hasNextPage={hasNextPage}
        pageCursors={pageCursors}
        onClick={(_cursor, page) => loadPage(page)}
        onNext={() => loadNext()}
      />
    </LoadingArea>
  )
}

const FairExhibitorsWithContext: React.FC<any> = props => {
  return (
    <ExhibitorFilterContextProvider
      sortOptions={[
        { text: "Relevance", value: "featured" },
        { text: "Alphabetical (A-Z)", value: "sortable_name" },
      ]}
      onChange={updateUrl}
    >
      <FairExhibitors {...props} />
    </ExhibitorFilterContextProvider>
  )
}

export const FairExhibitorsFragmentContainer = createRefetchContainer(
  FairExhibitorsWithContext,
  {
    fair: graphql`
      fragment FairExhibitors_fair on Fair
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 5 }
          after: { type: "String" }
        ) {
        exhibitors: showsConnection(
          first: $first
          after: $after
          sort: FEATURED_DESC
          totalCount: true
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          edges {
            node {
              id
              counts {
                artworks
              }
              partner {
                ... on Partner {
                  id
                }
                ... on ExternalPartner {
                  id
                }
              }
              ...FairExhibitorRail_show
            }
          }
        }
      }
    `,
  },
  FairExhibitorsQuery
)
