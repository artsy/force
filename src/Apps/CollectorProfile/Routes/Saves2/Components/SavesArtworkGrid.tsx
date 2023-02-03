import { createFragmentContainer, graphql, RelayRefetchProp } from "react-relay"
import { SavesArtworkGrid_filtered_artworks$data } from "__generated__/SavesArtworkGrid_filtered_artworks.graphql"
import { useTracking } from "react-tracking"
import ArtworkGrid from "Components/ArtworkGrid"
import { PaginationFragmentContainer as Pagination } from "Components/Pagination"
import {
  ContextModule,
  clickedMainArtworkGrid,
  ClickedChangePage,
  ActionType,
  commercialFilterParamsChanged,
} from "@artsy/cohesion"
import { useAnalyticsContext } from "System/Analytics/AnalyticsContext"
import { LoadingArea } from "Components/LoadingArea"
import { useArtworkFilterContext } from "Components/ArtworkFilter/ArtworkFilterContext"
import { FC, useState } from "react"
import { SavesArtworkGridHeader } from "Apps/CollectorProfile/Routes/Saves2/Components/SavesArtworkGridHeader"
import { Spacer } from "@artsy/palette"
import useDeepCompareEffect from "use-deep-compare-effect"
import { usePrevious } from "Utils/Hooks/usePrevious"
import { isEqual } from "lodash"
import { Jump } from "Utils/Hooks/useJump"
import { allowedFilters } from "Components/ArtworkFilter/Utils/allowedFilters"

interface SavesArtworkGridProps {
  artworks: SavesArtworkGrid_filtered_artworks$data
  collectionID: string
  relayRefetch: RelayRefetchProp["refetch"]
}

/**
 * In the future we plan to use the `BaseArtworkFilter` and `ArtworkFilterArtworkGrid` components
 * when filter support is added.
 */
const SavesArtworkGrid: FC<SavesArtworkGridProps> = ({
  artworks,
  relayRefetch,
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

  const fetchResults = () => {
    setFetching(true)

    // we currently support only `page` filter
    const relayParams = {
      after: artworks.pageInfo.endCursor,
    }

    console.log("[debug] fetchResults", relayParams)

    relayRefetch(relayParams, null, error => {
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

      fetchResults()
      trackAnalytics(filterKey)
    }
  }, [context.filters])

  return (
    <>
      <Jump id="artworksGrid" />

      <SavesArtworkGridHeader />

      <Spacer y={2} />

      <LoadingArea isLoading={fetching}>
        <ArtworkGrid
          artworks={artworks}
          columnCount={[2, 2, 2, 3]}
          contextModule={ContextModule.artworkGrid}
          itemMargin={40}
          onClearFilters={context.resetFilters}
          emptyStateComponent={context.ZeroState && <context.ZeroState />}
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

export const SavesArtworkGridFragmentContainer = createFragmentContainer(
  SavesArtworkGrid,
  {
    artworks: graphql`
      fragment SavesArtworkGrid_filtered_artworks on ArtworkConnection {
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
          }
        }
        ...ArtworkGrid_artworks
      }
    `,
  }
)
