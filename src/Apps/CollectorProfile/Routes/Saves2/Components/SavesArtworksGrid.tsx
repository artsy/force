import { createFragmentContainer, graphql, RelayRefetchProp } from "react-relay"
import { SavesArtworksGrid_me$data } from "__generated__/SavesArtworksGrid_me.graphql"
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
import {
  AnalyticsContext,
  useAnalyticsContext,
} from "System/Analytics/AnalyticsContext"
import { LoadingArea } from "Components/LoadingArea"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { FC, useState } from "react"
import { SavesArtworksGridHeader } from "./SavesArtworksGridHeader"
import { Spacer } from "@artsy/palette"
import useDeepCompareEffect from "use-deep-compare-effect"
import { usePrevious } from "Utils/Hooks/usePrevious"
import { isEqual } from "lodash"
import { Jump } from "Utils/Hooks/useJump"
import { allowedFilters } from "Components/ArtworkFilter/Utils/allowedFilters"
import { SavesEmptyStateFragmentContainer } from "./SavesEmptyState"

interface SavesArtworksGridProps {
  relayRefetch: RelayRefetchProp["refetch"]
  me: SavesArtworksGrid_me$data
}

/**
 * In the future we plan to use the `BaseArtworkFilter` and `ArtworkFilterArtworkGrid` components
 * when filter support is added.
 */
const SavesArtworksGrid: FC<SavesArtworksGridProps> = ({
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

  const artworks = me.collection?.artworks!
  const {
    pageCursors,
    pageInfo: { hasNextPage },
  } = artworks

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
        context_page_owner_type: contextPageOwnerType!,
        context_page_owner_id: contextPageOwnerId,
        context_page_owner_slug: contextPageOwnerSlug,
        page_current: prevFilterValue!,
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
      contextOwnerType: contextPageOwnerType!,
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

  if (artworks.edges?.length === 0) {
    return <SavesEmptyStateFragmentContainer me={me} />
  }

  return (
    <>
      <Jump id="artworksGrid" />

      <SavesArtworksGridHeader />

      <Spacer y={2} />

      <LoadingArea isLoading={fetching}>
        <ArtworkGrid
          artworks={artworks}
          columnCount={[2, 2, 2, 3]}
          contextModule={ContextModule.artworkGrid}
          itemMargin={40}
          emptyStateComponent={null}
          savedListId={me.collection?.internalID!}
          onBrickClick={(artwork, artworkIndex) => {
            // TODO: Clarify moments about analytics
            trackEvent(
              clickedMainArtworkGrid({
                contextPageOwnerType: contextPageOwnerType!,
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
          pageCursors={pageCursors}
          onClick={(_cursor, page) => loadPage(page)}
          onNext={() => loadNext()}
          scrollTo="artworksGrid"
        />
      </LoadingArea>
    </>
  )
}

const PageWrapper: FC<SavesArtworksGridProps> = props => {
  const { contextPageOwnerType, contextPageOwnerSlug } = useAnalyticsContext()

  return (
    <AnalyticsContext.Provider
      value={{
        contextPageOwnerId: props.me.collection!.internalID,
        contextPageOwnerSlug,
        // TODO: Clarify some moment about analytics later (maybe we should pass OwnerType.collection)
        contextPageOwnerType,
      }}
    >
      <SavesArtworksGrid {...props} />
    </AnalyticsContext.Provider>
  )
}

export const SavesArtworksGridFragmentContainer = createFragmentContainer(
  PageWrapper,
  {
    me: graphql`
      fragment SavesArtworksGrid_me on Me
        @argumentDefinitions(
          collectionID: { type: "String!" }
          page: { type: "Int", defaultValue: 1 }
          sort: { type: "CollectionArtworkSorts" }
        ) {
        collection(id: $collectionID) {
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
        ...SavesEmptyState_me @arguments(collectionID: $collectionID)
      }
    `,
  }
)
