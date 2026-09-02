import {
  ActionType,
  ContextModule,
  type RailViewed,
  type SearchedWithNoResults,
  type SearchedWithResults,
  type SelectedItemFromSearch,
} from "@artsy/cohesion"
import { Flex, Spinner } from "@artsy/palette"
import { InfiniteScrollSentinel } from "Components/InfiniteScrollSentinel"
import {
  SuggestionItem,
  type SuggestionItemOptionProps,
} from "Components/Search/SuggestionItem/SuggestionItem"
import { SuggestedFiltersItem } from "Components/Search/SuggestedFiltersItem"
import { TOP_PILL, type PillType } from "Components/Search/constants"
import { useRecentSearches } from "Components/Search/hooks/useRecentSearches"
import { buildSuggestedFiltersUrl } from "Components/Search/utils/buildSuggestedFiltersUrl"
import { parseFilterQuery } from "Components/Search/utils/parseFilterQuery"
import {
  type SearchNodeOption,
  formatOptions,
} from "Components/Search/utils/formatOptions"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import type { SearchResultsList_viewer$data } from "__generated__/SearchResultsList_viewer.graphql"
import { useFlag } from "@unleash/proxy-client-react"
import { type FC, useEffect, useMemo, useRef } from "react"
import {
  type RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"
import { useTracking } from "react-tracking"
import { ContentPlaceholder } from "./SearchResultsList/ContentPlaceholder"
import { NoResults } from "./SearchResultsList/NoResults"

interface SearchResultsListProps {
  relay: RelayPaginationProp
  viewer: SearchResultsList_viewer$data
  query: string
  /** Debounced, so the suggested-filters row doesn't flicker per keystroke */
  debouncedQuery: string
  selectedPill: PillType
  onClose: () => void
}

const ENTITIES_PER_SCROLL = 10

export const SearchResultsList: FC<
  React.PropsWithChildren<SearchResultsListProps>
> = ({ relay, viewer, query, debouncedQuery, selectedPill, onClose }) => {
  const tracking = useTracking()
  const { addRecentSearchFromOption } = useRecentSearches()
  const { contextPageOwnerType, contextPageOwnerId, contextPageOwnerSlug } =
    useAnalyticsContext()
  const edges = viewer.searchConnection?.edges ?? []

  const isSuggestedFiltersEnabled = useFlag("onyx_suggested-filters")

  // Gated here, so users who can't see the row don't pay to parse
  const parsedFilters = useMemo(() => {
    if (!isSuggestedFiltersEnabled) return null

    return parseFilterQuery(debouncedQuery)
  }, [debouncedQuery, isSuggestedFiltersEnabled])

  // The entity pills scope to a single type, where browsing artworks is off-topic
  const shouldShowSuggestedFilters =
    !!parsedFilters && selectedPill === TOP_PILL

  // Once per overlay session; per keystroke would inflate the CTR denominator
  const hasTrackedSuggestedFiltersRef = useRef(false)

  useEffect(() => {
    if (!shouldShowSuggestedFilters) return
    if (hasTrackedSuggestedFiltersRef.current) return

    hasTrackedSuggestedFiltersRef.current = true

    const event: RailViewed = {
      action: ActionType.railViewed,
      context_module: ContextModule.suggestedFilters,
      context_screen: contextPageOwnerType,
    }
    tracking.trackEvent(event)
  }, [shouldShowSuggestedFilters, contextPageOwnerType, tracking.trackEvent])

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (viewer.searchConnection) {
      const baseEvent = {
        context_module: selectedPill.analyticsContextModule,
        context_owner_type: contextPageOwnerType,
        context_owner_id: contextPageOwnerId,
        context_owner_slug: contextPageOwnerSlug,
        query: query,
      }

      if (edges.length > 0) {
        const event: SearchedWithResults = {
          action: ActionType.searchedWithResults,
          ...baseEvent,
        }
        tracking.trackEvent(event)
      } else {
        const event: SearchedWithNoResults = {
          action: ActionType.searchedWithNoResults,
          ...baseEvent,
        }
        tracking.trackEvent(event)
      }
    }
    // When selecting another pill - this effect shouldn't be executed again, so we disable the linting rule
  }, [viewer.searchConnection])

  const formattedOptions: SuggestionItemOptionProps[] = formatOptions(
    edges.flatMap(edge => {
      const option = edge?.node
      if (!option) return []
      return [
        {
          ...option,
          imageUrl: option.coverArtwork?.image?.src || option.imageUrl,
          highlights: edge?.highlights ?? null,
        },
      ]
    }) as SearchNodeOption[],
  )

  const suggestedFiltersHref = parsedFilters
    ? buildSuggestedFiltersUrl(parsedFilters)
    : ""

  // Shared by the tracking event and the recent-searches entry, as on desktop
  const suggestedFiltersOption: SuggestionItemOptionProps = {
    kind: "suggestedFilters",
    text: debouncedQuery,
    value: debouncedQuery,
    subtitle: "",
    imageUrl: "",
    showAuctionResultsButton: false,
    href: suggestedFiltersHref,
    typename: "SuggestedFilters",
    item_id: "suggested-filters",
    // Position within its own context module, not the entity ranking
    item_number: 0,
    item_type: "filter-suggestion",
  }

  const handleSuggestedFiltersClick = () => {
    const event: SelectedItemFromSearch = {
      action: ActionType.selectedItemFromSearch,
      // Its own module, separable from entity results
      context_module: ContextModule.suggestedFilters,
      destination_path: suggestedFiltersOption.href,
      query: debouncedQuery,
      item_id: suggestedFiltersOption.item_id!,
      item_number: suggestedFiltersOption.item_number!,
      item_type: suggestedFiltersOption.item_type!,
    }

    tracking.trackEvent(event)
    addRecentSearchFromOption(suggestedFiltersOption)
    onClose()
  }

  // Kept in the loading and empty states: with no entity match, this is the
  // only answer left
  const suggestedFiltersRow =
    shouldShowSuggestedFilters && parsedFilters ? (
      <SuggestedFiltersItem
        parsed={parsedFilters}
        href={suggestedFiltersHref}
        query={debouncedQuery}
        onClick={handleSuggestedFiltersClick}
      />
    ) : null

  if (!viewer.searchConnection) {
    return (
      <>
        {suggestedFiltersRow}

        <ContentPlaceholder />
      </>
    )
  }

  if (formattedOptions.length === 0) {
    return (
      <>
        {suggestedFiltersRow}

        <NoResults query={query} mt={4} mx={2} />
      </>
    )
  }

  const handleLoadMore = () => {
    if (!relay.hasMore() || relay.isLoading()) {
      return
    }

    relay.loadMore(ENTITIES_PER_SCROLL, err => {
      if (err) {
        console.error(err)
      }
    })
  }

  const handleSuggestionClick = (option: SuggestionItemOptionProps) => {
    const event: SelectedItemFromSearch = {
      action: ActionType.selectedItemFromSearch,
      context_module: selectedPill.analyticsContextModule,
      destination_path: option.href,
      query: query,
      item_id: option.item_id!,
      item_number: option.item_number!,
      item_type: option.item_type!,
    }
    tracking.trackEvent(event)
    addRecentSearchFromOption(option)
    onClose()
  }

  const handleQuickNavClick = (option: SuggestionItemOptionProps) => {
    // QuickNavigationItem tracks its own cohesion event
    // Records the artist itself (base href), matching Eigen’s quick nav
    addRecentSearchFromOption(option)
    onClose()
  }

  return (
    <>
      {suggestedFiltersRow}

      {formattedOptions.map((option, index) => {
        return (
          <SuggestionItem
            query={query}
            option={option}
            onClick={handleSuggestionClick}
            onQuickNavClick={handleQuickNavClick}
            key={index}
          />
        )
      })}

      {relay.hasMore() && (
        <>
          <InfiniteScrollSentinel onNext={handleLoadMore} once={false} />

          <Flex width="100%" my={4} alignItems="center">
            <Spinner position="relative" />
          </Flex>
        </>
      )}
    </>
  )
}

export const SearchResultsListPaginationContainer = createPaginationContainer(
  SearchResultsList,
  {
    viewer: graphql`
      fragment SearchResultsList_viewer on Viewer
      @argumentDefinitions(
        first: { type: "Int", defaultValue: 10 }
        after: { type: "String" }
        term: { type: "String!", defaultValue: "" }
        entities: { type: "[SearchEntity]" }
        variant: { type: "String" }
      ) {
        searchConnection(
          query: $term
          entities: $entities
          mode: AUTOSUGGEST
          first: $first
          after: $after
          variant: $variant
        ) @connection(key: "SearchResultsList_searchConnection") {
          edges {
            highlights {
              field
              fragments
            }
            node {
              displayLabel
              href
              imageUrl
              __typename
              ... on SearchableItem {
                internalID
                displayType
                slug
              }
              ... on Artist {
                internalID
                statuses {
                  artworks
                  auctionLots
                }
                coverArtwork {
                  image {
                    src: url(version: ["small"])
                  }
                }
              }
            }
          }
        }
      }
    `,
  },
  {
    direction: "forward",
    getConnectionFromProps(props) {
      return props.viewer.searchConnection
    },
    getFragmentVariables(prevVars, totalCount) {
      return { ...prevVars, count: totalCount }
    },
    getVariables(_, { count, cursor }, fragmentVariables) {
      return {
        first: count,
        after: cursor,
        term: fragmentVariables.term,
        entities: fragmentVariables.entities,
        variant: fragmentVariables.variant,
      }
    },
    query: graphql`
      query SearchResultsListPaginationQuery(
        $after: String
        $term: String!
        $entities: [SearchEntity]
        $variant: String
      ) {
        viewer {
          ...SearchResultsList_viewer
            @arguments(
              term: $term
              entities: $entities
              after: $after
              variant: $variant
            )
        }
      }
    `,
  },
)
