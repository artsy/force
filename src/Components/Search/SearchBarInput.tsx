import { DESKTOP_NAV_BAR_TOP_TIER_HEIGHT } from "Components/NavBar/constants"
import { useRouter } from "System/Hooks/useRouter"
import { extractNodes } from "Utils/extractNodes"
import { useClientQuery } from "Utils/Hooks/useClientQuery"
import { ActionType } from "@artsy/cohesion"
import { AutocompleteInput, useDidMount, useUpdateEffect } from "@artsy/palette"
import type {
  SearchBarInputSuggestQuery,
  SearchEntity,
} from "__generated__/SearchBarInputSuggestQuery.graphql"
import { type ChangeEvent, type FC, useEffect, useRef, useState } from "react"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useDebounce } from "use-debounce"
import { type PillType, SEARCH_DEBOUNCE_DELAY, TOP_PILL } from "./constants"
import { SearchBarFooter } from "./SearchBarFooter"
import { SearchInputPillsFragmentContainer } from "./SearchInputPills"
import { StaticSearchContainer } from "./StaticSearchContainer"
import {
  SuggestionItem,
  type SuggestionItemOptionProps,
} from "./SuggestionItem/SuggestionItem"
import { getLabel } from "./utils/getLabel"
import { shouldStartSearching } from "./utils/shouldStartSearching"

export interface SearchBarInputProps {
  searchTerm: string
}

export const SearchBarInput: FC<
  React.PropsWithChildren<SearchBarInputProps>
> = ({ searchTerm }) => {
  const tracking = useTracking()

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

  // FIXME: Refactor to just use callback
  // We use fetchCounter together with useUpdateEffect to track typing
  const [fetchCounter, setFetchCounter] = useState(0)

  const { router, match } = useRouter()

  const encodedSearchURL = `/search?term=${encodeURIComponent(value)}`

  const options = extractNodes(data?.viewer?.searchConnection)

  const formattedOptions: SuggestionItemOptionProps[] = [
    ...options.map(option => {
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

  useUpdateEffect(() => {
    tracking.trackEvent({
      action_type:
        options.length > 0
          ? ActionType.searchedWithResults
          : ActionType.searchedWithNoResults,
      context_module: selectedPill.analyticsContextModule,
      query: value,
    })
  }, [fetchCounter])

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

    refetch({
      hasTerm: true,
      term: String(value),
      entities,
    })

    setFetchCounter(prevCounter => prevCounter + 1)
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

    tracking.trackEvent({
      action_type: ActionType.tappedNavigationTab,
      context_module: selectedPill.analyticsContextModule,
      query: value,
    })
  }

  const handleSubmit = () => {
    if (value) {
      redirect(encodedSearchURL)
    }
  }

  const handleSelect = (option: SuggestionItemOptionProps) => {
    tracking.trackEvent({
      action_type: ActionType.selectedItemFromSearch,
      context_module: selectedPill.analyticsContextModule,
      destination_path: option.href,
      query: value,
    })

    resetValue()
    redirect(option.href)
  }

  const handleFocus = () => {
    tracking.trackEvent({
      action_type: ActionType.focusedOnSearchInput,
      context_module: selectedPill.analyticsContextModule,
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
      onClick={handleFocus}
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
              displayType
              slug
            }
            ... on Artist {
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
