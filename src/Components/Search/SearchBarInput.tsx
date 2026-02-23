import { AutocompleteInput, useDidMount } from "@artsy/palette"
import { type ChangeEvent, type FC, useEffect, useRef, useState } from "react"

import {
  ActionType,
  type SearchedWithNoResults,
  type SearchedWithResults,
  type SelectedItemFromSearch,
} from "@artsy/cohesion"
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
import {
  SuggestionItem,
  type SuggestionItemOptionProps,
} from "./SuggestionItem/SuggestionItem"
import { type PillType, SEARCH_DEBOUNCE_DELAY, TOP_PILL } from "./constants"
import { getLabel } from "./utils/getLabel"
import { shouldStartSearching } from "./utils/shouldStartSearching"

export interface SearchBarInputProps {
  searchTerm: string
}

export const SearchBarInput: FC<
  React.PropsWithChildren<SearchBarInputProps>
> = ({ searchTerm }) => {
  const tracking = useTracking()
  const { contextPageOwnerType, contextPageOwnerId, contextPageOwnerSlug } =
    useAnalyticsContext()

  const isClient = useDidMount()

  const { data, refetch } = useClientQuery<SearchBarInputSuggestQuery>({
    query: QUERY,
    variables: {
      hasTerm: shouldStartSearching(searchTerm ?? ""),
      term: searchTerm ? String(searchTerm) : "",
      entities: [],
    },
    skip: !searchTerm,
  })

  const [value, setValue] = useState(searchTerm)
  const [debouncedValue] = useDebounce(value, SEARCH_DEBOUNCE_DELAY)
  const [selectedPill, setSelectedPill] = useState<PillType>(TOP_PILL)
  // Request tracking / cancellation
  const [requestId, setRequestId] = useState(0)
  const lastRequestIdRef = useRef<number | null>(null)
  const lastRefetchDisposableRef = useRef<{ dispose: () => void } | null>(null)

  const { router, match } = useRouter()

  const encodedSearchURL = `/search?term=${encodeURIComponent(value)}`

  const options = extractNodes(data?.viewer?.searchConnection)

  const formattedOptions: SuggestionItemOptionProps[] = [
    ...options.map((option, index) => {
      return {
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
      }
    }),
    {
      text: value,
      value: value,
      subtitle: "",
      imageUrl: "",
      showAuctionResultsButton: false,
      href: encodedSearchURL,
      typename: "Footer",
    },
  ]

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (shouldStartSearching(debouncedValue)) {
      searchRequest(
        debouncedValue,
        selectedPill.searchEntityName as SearchEntity | undefined,
      )
    }
  }, [debouncedValue, selectedPill.searchEntityName])

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

  const handleSubmit = () => {
    if (value) {
      redirect(encodedSearchURL)
    }
  }

  const handleSelect = (option: SuggestionItemOptionProps) => {
    // Only track if this is an actual search result, not the footer
    if (option.typename !== "Footer") {
      const event: SelectedItemFromSearch = {
        action: ActionType.selectedItemFromSearch,
        context_module: selectedPill.analyticsContextModule,
        destination_path: option.href,
        query: value,
        item_id: option.item_id!,
        item_number: option.item_number!,
        item_type: option.item_type!,
      }
      tracking.trackEvent(event)
    }

    resetValue()
    redirect(option.href)
  }

  const handleFocus = () => {
    tracking.trackEvent({
      action_type: ActionType.focusedOnSearchInput,
      context_module: selectedPill.analyticsContextModule,
    })
  }
  const handlePaste = () => {
    tracking.trackEvent({
      action_type: ActionType.pastedIntoSearchInput,
      context_module: selectedPill.analyticsContextModule,
      query: value,
    })
  }

  const ref = useRef<HTMLInputElement | null>(null)

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

        if (option.typename === "Footer") {
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
            onClick={handleSelect}
          />
        )
      }}
      dropdownMaxHeight={`calc(100vh - ${DESKTOP_NAV_BAR_TOP_TIER_HEIGHT}px - 90px)`}
      dropdownMinWidth={600}
      flip={false}
      height={40}
    />
  )
}

const QUERY = graphql`
  query SearchBarInputSuggestQuery(
    $term: String!
    $hasTerm: Boolean!
    $entities: [SearchEntity]
  ) {
    viewer {
      ...SearchInputPills_viewer @arguments(term: $term)

      searchConnection(
        query: $term
        entities: $entities
        mode: AUTOSUGGEST
        first: 7
      ) @include(if: $hasTerm) {
        edges {
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
