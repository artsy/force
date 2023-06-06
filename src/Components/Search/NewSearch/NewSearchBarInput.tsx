import { AutocompleteInput, useUpdateEffect } from "@artsy/palette"
import { ChangeEvent, FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { createRefetchContainer, graphql, RelayRefetchProp } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { SystemContextProps, useSystemContext } from "System/SystemContext"
import { extractNodes } from "Utils/extractNodes"
import { NewSearchBarInput_viewer$data } from "__generated__/NewSearchBarInput_viewer.graphql"
import { NewSearchBarInputSuggestQuery } from "__generated__/NewSearchBarInputSuggestQuery.graphql"
import createLogger from "Utils/logger"
import { NewSearchInputPillsFragmentContainer } from "Components/Search/NewSearch/NewSearchInputPills"
import { NewSearchBarFooter } from "Components/Search/NewSearch/NewSearchBarFooter"
import { getSearchTerm } from "./utils/getSearchTerm"
import { isServer } from "Server/isServer"
import {
  PillType,
  TOP_PILL,
  SEARCH_DEBOUNCE_DELAY,
} from "Components/Search/NewSearch/constants"
import {
  NewSuggestionItem,
  SuggionItemOptionProps,
} from "./SuggestionItem/NewSuggestionItem"
import { useTracking } from "react-tracking"
import { StaticSearchContainer } from "./StaticSearchContainer"
import { DESKTOP_NAV_BAR_TOP_TIER_HEIGHT } from "Components/NavBar/constants"
import { useRouter } from "System/Router/useRouter"
import { useDebounce } from "Utils/Hooks/useDebounce"
import { reportPerformanceMeasurement } from "./utils/reportPerformanceMeasurement"
import { shouldStartSearching } from "./utils/shouldStartSearching"
import { getLabel } from "./utils/getLabel"
import { ActionType } from "@artsy/cohesion"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"

const logger = createLogger("Components/Search/NewSearchBar")

export interface NewSearchBarInputProps extends SystemContextProps {
  relay: RelayRefetchProp
  viewer: NewSearchBarInput_viewer$data
}

const NewSearchBarInput: FC<NewSearchBarInputProps> = ({ relay, viewer }) => {
  const tracking = useTracking()
  const { t } = useTranslation()
  const [value, setValue] = useState(getSearchTerm(window.location))
  const [selectedPill, setSelectedPill] = useState<PillType>(TOP_PILL)
  // We use fetchCounter together with useUpdateEffect to track typing
  const [fetchCounter, setFetchCounter] = useState(0)
  const { router } = useRouter()
  const encodedSearchURL = `/search?term=${encodeURIComponent(value)}`

  const options = extractNodes(viewer.searchConnection)
  const formattedOptions: SuggionItemOptionProps[] = [
    ...options.map((option, index) => {
      return {
        text: option.displayLabel!,
        value: option.displayLabel!,
        subtitle:
          getLabel({
            displayType: option.displayType ?? "",
            typename: option.__typename,
          }) ?? "",
        imageUrl: option.imageUrl!,
        showArtworksButton: !!option.statuses?.artworks,
        showAuctionResultsButton: !!option.statuses?.auctionLots,
        href: option.href!,
        typename: option.__typename,
        item_number: index,
        item_type: option.displayType!,
      }
    }),
    {
      text: value,
      value: value,
      subtitle: "",
      imageUrl: "",
      showArtworksButton: false,
      showAuctionResultsButton: false,
      href: encodedSearchURL,
      typename: "Footer",
      item_number: options.length,
      item_type: "Footer",
    },
  ]

  // Clear the search term once you navigate away from search results
  useEffect(() => {
    const remove = router.addNavigationListener(location => {
      if (!location.pathname.startsWith("/search")) {
        setValue("")
      }

      return true
    })

    return remove
  }, [router])

  useUpdateEffect(() => {
    tracking.trackEvent({
      action_type:
        options.length > 0
          ? DeprecatedSchema.ActionType.SearchedAutosuggestWithResults
          : DeprecatedSchema.ActionType.SearchedAutosuggestWithoutResults,
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
          term: value,
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

  const clearSearchInput = () => {
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

  const handleRedirect = () => {
    clearSearchInput()
  }

  const handleSubmit = () => {
    if (value) {
      redirect(encodedSearchURL)
    }
  }

  const handleSelect = (option: SuggionItemOptionProps) => {
    tracking.trackEvent({
      action_type: ActionType.selectedItemFromSearch,
      context_module: selectedPill.analyticsContextModule,
      destination_path:
        option.typename === "Artist"
          ? `${option.href}/works-for-sale`
          : option.href,
      item_number: option.item_number,
      item_type: option.item_type,
      query: value,
    })

    clearSearchInput()
    redirect(option.href)
  }

  const handleFocus = () => {
    tracking.trackEvent({
      action_type: ActionType.focusedOnSearchInput,
      context_module: selectedPill.analyticsContextModule,
    })
  }

  return (
    <AutocompleteInput
      placeholder={t`navbar.searchBy`}
      spellCheck={false}
      options={shouldStartSearching(value) ? formattedOptions : []}
      value={value}
      onChange={handleChange}
      onClear={clearSearchInput}
      onSubmit={handleSubmit}
      onFocus={handleFocus}
      onSelect={handleSelect}
      header={
        <NewSearchInputPillsFragmentContainer
          viewer={viewer}
          selectedPill={selectedPill}
          onPillClick={handlePillClick}
        />
      }
      renderOption={option => {
        if (option.item_type === "Footer") {
          return (
            <NewSearchBarFooter
              query={value}
              href={encodedSearchURL}
              index={options.length}
              selectedPill={selectedPill}
            />
          )
        }
        return (
          <NewSuggestionItem
            query={value}
            option={option}
            onRedirect={handleRedirect}
          />
        )
      }}
      dropdownMaxHeight={`calc(100vh - ${DESKTOP_NAV_BAR_TOP_TIER_HEIGHT}px - 10px)`}
    />
  )
}

export const NewSearchBarInputRefetchContainer = createRefetchContainer(
  NewSearchBarInput,
  {
    viewer: graphql`
      fragment NewSearchBarInput_viewer on Viewer
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
              }
            }
          }
        }
        ...NewSearchInputPills_viewer @arguments(term: $term)
      }
    `,
  },
  graphql`
    query NewSearchBarInputRefetchQuery(
      $term: String!
      $hasTerm: Boolean!
      $entities: [SearchEntity]
    ) {
      viewer {
        ...NewSearchBarInput_viewer
          @arguments(term: $term, hasTerm: $hasTerm, entities: $entities)
      }
    }
  `
)

export const NewSearchBarInputQueryRenderer: FC = () => {
  const { relayEnvironment, searchQuery = "" } = useSystemContext()

  if (isServer) {
    return <StaticSearchContainer searchQuery={searchQuery} />
  }

  return (
    <SystemQueryRenderer<NewSearchBarInputSuggestQuery>
      environment={relayEnvironment}
      query={graphql`
        query NewSearchBarInputSuggestQuery(
          $term: String!
          $hasTerm: Boolean!
          $entities: [SearchEntity]
        ) {
          viewer {
            ...NewSearchBarInput_viewer
              @arguments(term: $term, hasTerm: $hasTerm, entities: $entities)
          }
        }
      `}
      variables={{
        hasTerm: false,
        term: "",
        entities: [],
      }}
      render={({ props }) => {
        if (props?.viewer) {
          return <NewSearchBarInputRefetchContainer viewer={props.viewer} />
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
