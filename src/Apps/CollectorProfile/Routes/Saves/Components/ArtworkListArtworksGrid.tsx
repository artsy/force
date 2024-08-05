import { createFragmentContainer, graphql, RelayRefetchProp } from "react-relay"
import { ArtworkListArtworksGrid_me$data } from "__generated__/ArtworkListArtworksGrid_me.graphql"
import { useTracking } from "react-tracking"
import ArtworkGrid from "Components/ArtworkGrid/ArtworkGrid"
import { PaginationFragmentContainer as Pagination } from "Components/Pagination"
import {
  ContextModule,
  clickedMainArtworkGrid,
  ClickedChangePage,
  ActionType,
  commercialFilterParamsChanged,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { LoadingArea } from "Components/LoadingArea"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { FC, useState } from "react"
import { ArtworkListArtworksGridHeader } from "./ArtworkListArtworksGridHeader"
import { Spacer } from "@artsy/palette"
import useDeepCompareEffect from "use-deep-compare-effect"
import { usePrevious } from "Utils/Hooks/usePrevious"
import { isEqual } from "lodash"
import { Jump } from "Utils/Hooks/useJump"
import { allowedFilters } from "Components/ArtworkFilter/Utils/allowedFilters"
import { ArtworkListEmptyStateFragmentContainer } from "./ArtworkListEmptyState"

export const ARTWORK_LIST_ARTWORK_GRID_ID = "artworksGrid"

interface ArtworkListArtworksGridProps {
  relayRefetch: RelayRefetchProp["refetch"]
  me: ArtworkListArtworksGrid_me$data
}

/**
 * In the future we plan to use the `BaseArtworkFilter` and `ArtworkFilterArtworkGrid` components
 * when filter support is added.
 */
const ArtworkListArtworksGrid: FC<ArtworkListArtworksGridProps> = ({
  relayRefetch,
  me,
}) => {
  const { trackEvent } = useTracking()
  const {
    contextPageOwnerType,
    contextPageOwnerSlug,
    contextPageOwnerId,
  } = useAnalyticsContext()
  const context = useArtworkFilterContext()
  const filters = context.filters ?? {}
  const [fetching, setFetching] = useState(false)
  const previousFilters = usePrevious(filters)

  const artworks = me.artworkList?.artworks
  const {
    pageCursors,
    pageInfo: { hasNextPage },
  } = artworks || {
    pageInfo: { hasNextPage: false },
    pageCursors: null,
  }

  /**
   * Load next page of artworks
   */
  const loadNext = () => {
    if (hasNextPage) {
      const prevPage = context?.filters?.page ?? 0
      loadPage(prevPage + 1)
    }
  }

  /**
   * Refetch page of artworks based on cursor
   */
  const loadPage = (page: number) => {
    context.setFilter("page", page)
  }

  const fetchResults = (changedFilterKey: string) => {
    setFetching(true)

    const variables = {
      sort: filters.sort,
      page: filters.page,
    }

    relayRefetch(variables, null, error => {
      if (error) {
        console.error(error)
      }

      setFetching(false)
    })
  }

  const trackAnalytics = (changedFilterKey: string) => {
    if (changedFilterKey === "page") {
      const prevFilterValue = previousFilters[changedFilterKey]
      const currentFilterValue = filters[changedFilterKey]

      const pageTrackingParams: ClickedChangePage = {
        action: ActionType.clickedChangePage,
        context_module: ContextModule.artworkGrid,
        context_page_owner_type: contextPageOwnerType,
        context_page_owner_id: contextPageOwnerId,
        context_page_owner_slug: contextPageOwnerSlug,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        page_current: prevFilterValue!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        page_changed: currentFilterValue!,
      }

      trackEvent(pageTrackingParams)
      return
    }

    const onlyAllowedFilters = allowedFilters(filters)
    const event = commercialFilterParamsChanged({
      changed: JSON.stringify({
        [changedFilterKey]: filters[changedFilterKey],
      }),
      contextOwnerId: contextPageOwnerId,
      contextOwnerSlug: contextPageOwnerSlug,
      contextOwnerType: contextPageOwnerType,
      current: JSON.stringify(onlyAllowedFilters),
    })

    trackEvent(event)
  }

  useDeepCompareEffect(() => {
    const changedFilterEntity = Object.entries(filters).find(
      ([filterKey, currentFilter]) => {
        const previousFilter = previousFilters[filterKey]
        const isChanged = !isEqual(currentFilter, previousFilter)

        return isChanged
      }
    )
    const filtersHaveUpdated = !!changedFilterEntity

    if (filtersHaveUpdated) {
      const [filterKey] = changedFilterEntity

      fetchResults(filterKey)
      trackAnalytics(filterKey)
    }
  }, [context.filters])

  if (artworks?.edges?.length === 0) {
    return <ArtworkListEmptyStateFragmentContainer me={me} />
  }

  return (
    <>
      <Jump id={ARTWORK_LIST_ARTWORK_GRID_ID} />
      <ArtworkListArtworksGridHeader />
      <Spacer y={2} />
      <LoadingArea isLoading={fetching}>
        <ArtworkGrid
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          artworks={artworks!}
          columnCount={[2, 3]}
          contextModule={ContextModule.artworkGrid}
          itemMargin={40}
          emptyStateComponent={null}
          savedListId={me.artworkList?.internalID}
          onBrickClick={(artwork, artworkIndex) => {
            // TODO: Clarify moments about analytics
            trackEvent(
              clickedMainArtworkGrid({
                contextPageOwnerType: contextPageOwnerType,
                contextPageOwnerSlug,
                contextPageOwnerId,
                destinationPageOwnerId: artwork.internalID,
                destinationPageOwnerSlug: artwork.slug,
                position: artworkIndex,
                sort: context?.filters?.sort,
              })
            )
          }}
        />

        <Pagination
          hasNextPage={hasNextPage}
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          pageCursors={pageCursors!}
          onClick={(_cursor, page) => loadPage(page)}
          onNext={() => loadNext()}
          scrollTo="artworksGrid"
        />
      </LoadingArea>
    </>
  )
}

export const ArtworkListArtworksGridFragmentContainer = createFragmentContainer(
  ArtworkListArtworksGrid,
  {
    me: graphql`
      fragment ArtworkListArtworksGrid_me on Me
        @argumentDefinitions(
          listID: { type: "String!" }
          page: { type: "Int", defaultValue: 1 }
          sort: { type: "CollectionArtworkSorts" }
        ) {
        artworkList: collection(id: $listID) {
          internalID

          artworks: artworksConnection(first: 30, page: $page, sort: $sort) {
            pageInfo {
              hasNextPage
            }
            pageCursors {
              ...Pagination_pageCursors
            }
            edges {
              node {
                id
              }
            }
            ...ArtworkGrid_artworks
          }
        }
        ...ArtworkListEmptyState_me @arguments(listID: $listID)
      }
    `,
  }
)
