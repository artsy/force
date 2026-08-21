import { AutocompleteInput, Box, useDidMount } from "@artsy/palette"
import { themeGet } from "@styled-system/theme-get"
import { useFlag } from "@unleash/proxy-client-react"
import {
  type ChangeEvent,
  type FC,
  type FocusEvent,
  type MouseEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import styled from "styled-components"

import {
  ActionType,
  type SearchedWithNoResults,
  type SearchedWithResults,
  type SelectedItemFromSearch,
} from "@artsy/cohesion"
import { buildUrlForCollectApp } from "Apps/Collect/Utils/urlBuilder"
import { Z } from "Apps/Components/constants"
import { ManageArtworkForSavesProvider } from "Components/Artwork/ManageArtworkForSaves"
import { DESKTOP_NAV_BAR_TOP_TIER_HEIGHT } from "Components/NavBar/constants"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useRouter } from "System/Hooks/useRouter"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { extractNodes } from "Utils/extractNodes"
import type {
  SearchBarInputSuggestQuery,
  SearchEntity,
} from "__generated__/SearchBarInputSuggestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useDebounce } from "use-debounce"
import { SearchBarFooter } from "./SearchBarFooter"
import { SearchInputPillsFragmentContainer } from "./SearchInputPills"
import { StaticSearchContainer } from "./StaticSearchContainer"
import { SuggestedFiltersItem } from "./SuggestedFiltersItem"
import {
  SuggestionItem,
  type SuggestionItemOptionProps,
} from "./SuggestionItem/SuggestionItem"
import { TrendingSearches } from "./TrendingSearches/TrendingSearches"
import { type PillType, SEARCH_DEBOUNCE_DELAY, TOP_PILL } from "./constants"
import { useRecentSearches } from "./hooks/useRecentSearches"
import { useTrendingImpressionSession } from "./hooks/useTrendingImpressionSession"
import { getLabel } from "./utils/getLabel"
import { isModifiedClick } from "./utils/isModifiedClick"
import { parseFilterQuery } from "./utils/parseFilterQuery"
import { searchResultsHref } from "./utils/searchResultsHref"
import { shouldStartSearching } from "./utils/shouldStartSearching"

export interface SearchBarInputProps {
  searchTerm: string
}

// Shared by the results dropdown and the trending panel so the two surfaces
// always swap without a visible size jump
const SEARCH_DROPDOWN_MAX_HEIGHT = `calc(100vh - ${DESKTOP_NAV_BAR_TOP_TIER_HEIGHT}px - 90px)`
const SEARCH_DROPDOWN_MIN_WIDTH = 600

export const SearchBarInput: FC<
  React.PropsWithChildren<SearchBarInputProps>
> = ({ searchTerm }) => {
  const tracking = useTracking()
  const { contextPageOwnerType, contextPageOwnerId, contextPageOwnerSlug } =
    useAnalyticsContext()

  const isClient = useDidMount()

  const { addRecentSearch, addRecentSearchFromOption } = useRecentSearches()

  const { data, refetch } = useClientQuery<SearchBarInputSuggestQuery>({
    query: QUERY,
    variables: {
      hasTerm: shouldStartSearching(searchTerm ?? ""),
      term: searchTerm ? String(searchTerm) : "",
      entities: [],
      variant: "experiment",
    },
    skip: !searchTerm,
  })

  // searchTerm is typed as string but arrives undefined on routes without a
  // term (see the `searchTerm ?? ""` guards below); value must be a string
  const [value, setValue] = useState(searchTerm ?? "")
  const [debouncedValue] = useDebounce(value, SEARCH_DEBOUNCE_DELAY)
  const [selectedPill, setSelectedPill] = useState<PillType>(TOP_PILL)
  const [isFocused, setIsFocused] = useState(false)
  // Request tracking / cancellation
  const [requestId, setRequestId] = useState(0)
  const lastRequestIdRef = useRef<number | null>(null)
  const lastRefetchDisposableRef = useRef<{ dispose: () => void } | null>(null)
  const ref = useRef<HTMLInputElement | null>(null)

  const { router, match } = useRouter()

  // Trimmed so recorded recent searches and the results page never carry
  // accidental whitespace padding
  const encodedSearchURL = searchResultsHref(value.trim())

  const edges = data?.viewer?.searchConnection?.edges ?? []

  const isSuggestedFiltersEnabled = useFlag("onyx_suggested-filters")

  // Parsed from `debouncedValue`, not `value`. Parsing is synchronous, so `value`
  // would land the row a beat sooner — but the row is prepended, so appearing
  // and disappearing per keystroke while the entity results lag behind shifts
  // every option index under the user's cursor. Matching the entity list's
  // cadence keeps the list stable to click and arrow through.
  const parsedFilters = useMemo(() => {
    return parseFilterQuery(debouncedValue)
  }, [debouncedValue])

  // The entity pills scope the search to a single type, where a link out to
  // browsing artworks is off-topic.
  const shouldShowSuggestedFilters =
    isSuggestedFiltersEnabled && !!parsedFilters && selectedPill === TOP_PILL

  const suggestedFiltersHref = parsedFilters
    ? buildUrlForCollectApp(parsedFilters.filters)
    : ""

  const formattedOptions: SuggestionItemOptionProps[] = [
    ...(shouldShowSuggestedFilters
      ? [
          {
            kind: "suggestedFilters" as const,
            text: value,
            value: value,
            subtitle: "",
            imageUrl: "",
            showAuctionResultsButton: false,
            href: suggestedFiltersHref,
            typename: "SuggestedFilters",
            item_id: "suggested-filters",
            item_type: "filter-suggestion",
          },
        ]
      : []),
    ...edges.flatMap((edge, index) => {
      const option = edge?.node
      if (!option) return []
      return [
        {
          kind: "entity" as const,
          text: option.displayLabel ?? "Unknown",
          value: option.displayLabel ?? "unknown",
          subtitle:
            getLabel({
              displayType: option.displayType ?? "",
              typename: option.__typename,
            }) ?? "",
          imageUrl: option.coverArtwork?.image?.src || option.imageUrl || "",
          showAuctionResultsButton: !!option.statuses?.auctionLots,
          href: option.href ?? "/",
          typename: option.__typename,
          item_id: option.internalID,
          item_number: index,
          item_type: option.displayType ?? undefined,
          highlights: edge?.highlights ?? null,
        },
      ]
    }),
    {
      kind: "footer" as const,
      text: value,
      value: value,
      subtitle: "",
      imageUrl: "",
      showAuctionResultsButton: false,
      href: encodedSearchURL,
      typename: "Footer",
    },
  ]

  useEffect(() => {
    if (shouldStartSearching(debouncedValue)) {
      searchRequest(
        debouncedValue,
        selectedPill.searchEntityName as SearchEntity | undefined,
      )
    }
  }, [debouncedValue, selectedPill.searchEntityName])

  useEffect(() => {
    if (!value) {
      setSelectedPill(TOP_PILL)
    }
  }, [value])

  const searchRequest = (value: string, entity?: SearchEntity) => {
    const entities = entity ? [entity] : []

    // Cancel previous request and generate new request ID
    lastRefetchDisposableRef.current?.dispose()
    const nextId = requestId + 1
    setRequestId(nextId)
    lastRequestIdRef.current = nextId

    // Perform the search - type is now properly inferred from useClientQuery
    const { promise, disposable } = refetch({
      hasTerm: true,
      term: String(value),
      entities,
      variant: "experiment",
    })

    lastRefetchDisposableRef.current = disposable

    // Track analytics when response arrives (only if still latest request)
    void promise
      .then(res => {
        // Ignore stale responses
        if (lastRequestIdRef.current !== nextId) return

        const nodes = extractNodes(res?.viewer?.searchConnection)

        const baseEvent = {
          context_module: selectedPill.analyticsContextModule,
          context_owner_type: contextPageOwnerType,
          context_owner_id: contextPageOwnerId,
          context_owner_slug: contextPageOwnerSlug,
          query: value,
        }

        if (nodes.length > 0) {
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
      })
      .catch((err: Error) => {
        // Network errors or cancelled requests - no analytics needed
        if (process.env.NODE_ENV !== "production") {
          console.warn("SearchBarInput: Error during search request:", err)
        }
      })
  }

  const resetValue = () => {
    setValue("")
    setSelectedPill(TOP_PILL)
  }

  const redirect = (to: string) => {
    router.push(to)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handlePillClick = (pill: PillType) => {
    setSelectedPill(pill)
    searchRequest(value, pill.searchEntityName as SearchEntity | undefined)

    // Use the pill value directly to avoid stale selectedPill in tracking
    tracking.trackEvent({
      action_type: ActionType.tappedNavigationTab,
      context_module: pill.analyticsContextModule,
      query: value,
    })
  }

  const suppressFocusUntilRef = useRef(0)

  // Matches production behavior: once a result is chosen the input gives up
  // focus, so neither the results dropdown nor the trending panel lingers
  // over the destination page.
  const closeDropdown = () => {
    // Palette's AutocompleteInput re-focuses the input ~100ms after a
    // keyboard selection (its internal resetUI); ignore that programmatic
    // focus so the trending panel doesn't reopen over the destination page
    suppressFocusUntilRef.current = Date.now() + 500
    setIsFocused(false)
    ref.current?.blur()
  }

  const handleSubmit = () => {
    const term = value.trim()
    if (!term) return

    addRecentSearch({ label: term, href: encodedSearchURL })
    closeDropdown()
    redirect(encodedSearchURL)
  }

  const trackSelection = (option: SuggestionItemOptionProps) => {
    // Only real search results belong in this event. The footer has never been
    // tracked here, and the suggested-filters row is not an entity in a ranked
    // list — emitting it with a synthetic item_number would pollute the
    // dataset. Its own viewed/clicked events land in a follow-up PR, so clicks
    // on the row are deliberately untracked for now.
    if (option.kind === undefined || option.kind === "entity") {
      const analyticsEvent: SelectedItemFromSearch = {
        action: ActionType.selectedItemFromSearch,
        context_module: selectedPill.analyticsContextModule,
        destination_path: option.href,
        query: value,
        item_id: option.item_id!,
        item_number: option.item_number!,
        item_type: option.item_type!,
      }
      tracking.trackEvent(analyticsEvent)
    }
  }

  const handleSelect = (option: SuggestionItemOptionProps) => {
    trackSelection(option)
    // The “See all results” footer row records the raw query + results page,
    // the same entry a plain Enter submit records
    addRecentSearchFromOption(option)

    closeDropdown()
    resetValue()
    redirect(option.href)
  }

  const handleSuggestionClick = (
    option: SuggestionItemOptionProps,
    event?: MouseEvent<HTMLElement>,
  ) => {
    trackSelection(option)
    addRecentSearchFromOption(option)
    if (isModifiedClick(event)) return
    closeDropdown()
    resetValue()
    redirect(option.href)
  }

  const handleQuickNavClick = (
    option: SuggestionItemOptionProps,
    event: MouseEvent<HTMLElement>,
  ) => {
    // QuickNavigationItem tracks its own cohesion event
    // Records the artist itself (base href), matching Eigen’s quick nav
    addRecentSearchFromOption(option)
    if (isModifiedClick(event)) return
    closeDropdown()
    resetValue()
    redirect(`${option.href}/auction-results`)
  }

  const handleFocus = () => {
    // Skip Palette's programmatic post-selection refocus (see closeDropdown)
    if (Date.now() < suppressFocusUntilRef.current) return

    setIsFocused(true)
    tracking.trackEvent({
      action_type: ActionType.focusedOnSearchInput,
      context_module: selectedPill.analyticsContextModule,
    })
  }

  // Close the trending panel when focus leaves the search container entirely
  // (clicks inside the panel keep focus via onMouseDown preventDefault below).
  const handleContainerBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setIsFocused(false)
    }
  }

  // Kill switch: with the flag off, the search dropdown behaves as it did
  // before the trending panel existed.
  const isTrendingEnabled = useFlag("onyx_trending-searches")

  // Show trending only when focused with an empty/too-short query.
  const isTrendingVisible =
    isTrendingEnabled && isFocused && !shouldStartSearching(value)

  const shouldTrackTrendingImpressions = useTrendingImpressionSession({
    isPanelVisible: isTrendingVisible,
    // The session ends on blur; refocusing counts as a new panel open
    isSessionActive: isFocused,
  })

  // Safety net: while the input is focused, Palette's AutocompleteInput
  // swallows Escape itself (stopPropagation) and the panel then closes via
  // the blur Palette triggers. This handler only fires for focus inside the
  // panel, where Palette isn't involved. isComposing guards IME cancellation.
  const handleContainerKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (
      event.key === "Escape" &&
      !event.nativeEvent.isComposing &&
      isTrendingVisible
    ) {
      closeDropdown()
    }
  }
  const handlePaste = () => {
    tracking.trackEvent({
      action_type: ActionType.pastedIntoSearchInput,
      context_module: selectedPill.analyticsContextModule,
      query: value,
    })
  }

  // Focus the search input on '/' keypress
  useEffect(() => {
    const handleKeyUp = ({ target, key }: KeyboardEvent) => {
      if (!ref.current || key !== "/") return

      const tag =
        (target && (target as HTMLElement).tagName.toLowerCase()) || ""

      // Ignore if an input has focus
      if (["input", "textarea", "select"].includes(tag)) {
        return
      }

      ref.current.focus()
    }

    window.addEventListener("keyup", handleKeyUp)
    return () => {
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  if (!isClient) {
    return <StaticSearchContainer searchQuery={searchTerm} />
  }

  return (
    // Hosts the save-to-lists state, modal, and toast action used by the
    // trending panel's artwork save buttons. Mounted here, OUTSIDE the panel,
    // because the panel unmounts on blur the moment the lists modal (or the
    // toast's "Add to a List" action) takes focus — a provider inside the
    // panel would take the modal down with it.
    <ManageArtworkForSavesProvider>
      <Box
        position="relative"
        onBlur={handleContainerBlur}
        onKeyDown={handleContainerKeyDown}
      >
        <AutocompleteInput
          forwardRef={ref}
          key={match.location.pathname}
          value={value}
          placeholder="Search by artist, gallery, style, theme, tag, etc."
          spellCheck={false}
          options={shouldStartSearching(value) ? formattedOptions : []}
          defaultValue={value}
          onChange={handleChange}
          onClear={resetValue}
          onSelect={handleSelect}
          onSubmit={handleSubmit}
          onFocus={handleFocus}
          onPaste={handlePaste}
          header={
            data?.viewer ? (
              <SearchInputPillsFragmentContainer
                viewer={data.viewer}
                selectedPill={selectedPill}
                onPillClick={handlePillClick}
              />
            ) : null
          }
          renderOption={option => {
            if (!value) return <></>

            if (option.kind === "suggestedFilters" && parsedFilters) {
            return (
              <SuggestedFiltersItem
                parsed={parsedFilters}
                href={suggestedFiltersHref}
                query={debouncedValue}
                onClick={event => {
                  handleSuggestionClick(option, event)
                }}
              />
            )
          }

          if (option.kind === "footer") {
              return (
                <SearchBarFooter
                  query={value}
                  href={encodedSearchURL}
                  selectedPill={selectedPill}
                />
              )
            }

            return (
              <SuggestionItem
                query={value}
                option={option}
                onClick={handleSuggestionClick}
                onQuickNavClick={handleQuickNavClick}
              />
            )
          }}
          dropdownMaxHeight={SEARCH_DROPDOWN_MAX_HEIGHT}
          dropdownMinWidth={SEARCH_DROPDOWN_MIN_WIDTH}
          flip={false}
          height={40}
        />

        {isTrendingVisible && (
          <TrendingPanel
            position="absolute"
            // Mirrors the results dropdown exactly (same anchor, offset, width,
            // min-width, and shadow) so trending and autosuggest read as one
            // overlay swapping content rather than two differently-sized surfaces.
            top="calc(100% + 10px)"
            left={0}
            width="100%"
            minWidth={SEARCH_DROPDOWN_MIN_WIDTH}
            zIndex={Z.dropdown}
            bg="mono0"
            maxHeight={SEARCH_DROPDOWN_MAX_HEIGHT}
            overflowY="auto"
            // Keep input focused so the panel stays open while clicking inside it
            onMouseDown={event => event.preventDefault()}
          >
            <TrendingSearches
              // closeDropdown (not just setIsFocused) so the input also blurs:
              // otherwise a same-pathname navigation leaves the input focused
              // with the panel unable to reopen on the next click
              onNavigate={closeDropdown}
              shouldTrackImpressions={shouldTrackTrendingImpressions}
            />
          </TrendingPanel>
        )}
      </Box>
    </ManageArtworkForSavesProvider>
  )
}

// Same box shadow as Palette's AutocompleteInput dropdown, so the trending
// panel is indistinguishable from the results dropdown chrome.
const TrendingPanel = styled(Box)`
  box-shadow: ${themeGet("effects.dropShadow")};

  /* TrendingSearches renders nothing until its query resolves with content;
     the chrome (shadow) must not paint around an empty panel */
  &:empty {
    display: none;
  }
`

const QUERY = graphql`
  query SearchBarInputSuggestQuery(
    $term: String!
    $hasTerm: Boolean!
    $entities: [SearchEntity]
    $variant: String
  ) {
    viewer {
      ...SearchInputPills_viewer @arguments(term: $term)

      searchConnection(
        query: $term
        entities: $entities
        mode: AUTOSUGGEST
        first: 7
        variant: $variant
      ) @include(if: $hasTerm) {
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
                  src: url(version: ["square"])
                }
              }
            }
          }
        }
      }
    }
  }
`
