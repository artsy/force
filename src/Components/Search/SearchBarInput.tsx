import { AutocompleteInput, useUpdateEffect } from "@artsy/palette"
import {
  ChangeEvent,
  FC,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { useTranslation } from "react-i18next"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { extractNodes } from "Utils/extractNodes"
import { SearchBarInput_viewer$data } from "__generated__/SearchBarInput_viewer.graphql"
import { SearchBarInputSuggestQuery } from "__generated__/SearchBarInputSuggestQuery.graphql"
import createLogger from "Utils/logger"
import { SearchInputPillsFragmentContainer } from "./SearchInputPills"
import { isServer } from "Server/isServer"
import { PillType, TOP_PILL, SEARCH_DEBOUNCE_DELAY } from "./constants"
import {
  SuggestionItem,
  SuggestionItemOptionProps,
} from "./SuggestionItem/SuggestionItem"
import { useTracking } from "react-tracking"
import { StaticSearchContainer } from "./StaticSearchContainer"
import { DESKTOP_NAV_BAR_TOP_TIER_HEIGHT } from "Components/NavBar/constants"
import { useRouter } from "System/Hooks/useRouter"
import { useDebounce } from "Utils/Hooks/useDebounce"
import { reportPerformanceMeasurement } from "./utils/reportPerformanceMeasurement"
import { shouldStartSearching } from "./utils/shouldStartSearching"
import { getLabel } from "./utils/getLabel"
import { ActionType } from "@artsy/cohesion"
import { SearchBarFooter } from "./SearchBarFooter"

const logger = createLogger("Components/Search/SearchBar")

export interface SearchBarInputProps {
  relay: RelayRefetchProp
  viewer: SearchBarInput_viewer$data
  searchTerm: string
}

const SearchBarInput: FC<SearchBarInputProps> = ({
  relay,
  viewer,
  searchTerm,
}) => {
  const tracking = useTracking()

  const { t } = useTranslation()

  const [value, setValue] = useState(searchTerm)
  const [selectedPill, setSelectedPill] = useState<PillType>(TOP_PILL)

  // FIXME: Refactor to just use callback
  // We use fetchCounter together with useUpdateEffect to track typing
  const [fetchCounter, setFetchCounter] = useState(0)

  const { router, match } = useRouter()

  const encodedSearchURL = `/search?term=${encodeURIComponent(value)}`

  const options = extractNodes(viewer.searchConnection)

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

  const refetch = useCallback(
    (value: string, entity?: string) => {
      const entities = entity ? [entity] : []
      const performanceStart = performance && performance.now()

      relay.refetch(
        {
          hasTerm: true,
          term: String(value),
          entities: entities,
        },
        null,
        error => {
          if (error) {
            logger.error(error)
            return
          }

          if (performance) {
            reportPerformanceMeasurement(performanceStart)
          }

          // trigger useEffect to send tracking event
          setFetchCounter(prevCounter => prevCounter + 1)
        }
      )
    },
    [relay]
  )

  const debouncedSearchRequest = useDebounce({
    callback: refetch,
    delay: SEARCH_DEBOUNCE_DELAY,
  })

  const resetValue = () => {
    setValue("")
  }

  const redirect = (to: string) => {
    router.push(to)
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)

    if (shouldStartSearching(event.target.value))
      debouncedSearchRequest(event.target.value, selectedPill.searchEntityName)
  }

  const handlePillClick = (pill: PillType) => {
    setSelectedPill(pill)
    refetch(value, pill.searchEntityName)

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

  return (
    <AutocompleteInput
      forwardRef={ref}
      key={match.location.pathname}
      value={value}
      placeholder={t`navbar.searchBy`}
      spellCheck={false}
      options={shouldStartSearching(value) ? formattedOptions : []}
      defaultValue={value}
      onChange={handleChange}
      onClear={resetValue}
      onSelect={handleSelect}
      onSubmit={handleSubmit}
      onClick={handleFocus}
      header={
        <SearchInputPillsFragmentContainer
          viewer={viewer}
          selectedPill={selectedPill}
          onPillClick={handlePillClick}
        />
      }
      renderOption={option => {
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

export const SearchBarInputRefetchContainer = createRefetchContainer(
  SearchBarInput,
  {
    viewer: graphql`
      fragment SearchBarInput_viewer on Viewer
        @argumentDefinitions(
          term: { type: "String!", defaultValue: "" }
          hasTerm: { type: "Boolean!", defaultValue: false }
          entities: { type: "[SearchEntity]" }
        ) {
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
        ...SearchInputPills_viewer @arguments(term: $term)
      }
    `,
  },
  graphql`
    query SearchBarInputRefetchQuery(
      $term: String!
      $hasTerm: Boolean!
      $entities: [SearchEntity]
    ) {
      viewer {
        ...SearchBarInput_viewer
          @arguments(term: $term, hasTerm: $hasTerm, entities: $entities)
      }
    }
  `
)

interface SearchBarInputQueryRendererProps {
  term?: string
}

export const SearchBarInputQueryRenderer: FC<SearchBarInputQueryRendererProps> = ({
  term,
}) => {
  const { relayEnvironment, searchQuery = "" } = useSystemContext()

  if (isServer) {
    return <StaticSearchContainer searchQuery={searchQuery} />
  }

  return (
    <SystemQueryRenderer<SearchBarInputSuggestQuery>
      environment={relayEnvironment}
      query={graphql`
        query SearchBarInputSuggestQuery(
          $term: String!
          $hasTerm: Boolean!
          $entities: [SearchEntity]
        ) {
          viewer {
            ...SearchBarInput_viewer
              @arguments(term: $term, hasTerm: $hasTerm, entities: $entities)
          }
        }
      `}
      variables={{
        hasTerm: shouldStartSearching(term ?? ""),
        term: term ? String(term) : "",
        entities: [],
      }}
      render={({ props }) => {
        if (props?.viewer) {
          return (
            <SearchBarInputRefetchContainer
              viewer={props.viewer}
              searchTerm={term ?? ""}
            />
          )
          // SSR render pass. Since we don't have access to `<Boot>` context
          // from within the NavBar (it's not a part of any app) we need to lean
          // on styled-system for showing / hiding depending upon breakpoint.
        } else {
          return <StaticSearchContainer searchQuery={searchQuery} />
        }
      }}
    />
  )
}
