import { AutocompleteInput, BoxProps, useUpdateEffect } from "@artsy/palette"
import { ChangeEvent, FC, useMemo, useState } from "react"
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
import { getLabel } from "./utils/getLabel"
import { getSearchTerm } from "./utils/getSearchTerm"
import { isServer } from "Server/isServer"
import { PillType, TOP_PILL } from "Components/Search/NewSearch/constants"
import {
  NewSuggestionItem,
  SuggionItemOptionProps,
} from "./SuggestionItem/NewSuggestionItem"
import { debounce } from "lodash"
import { useTracking } from "react-tracking"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { getENV } from "Utils/getENV"
// eslint-disable-next-line no-restricted-imports
import request from "superagent"
import { StaticSearchContainer } from "./StaticSearchContainer"
import { DESKTOP_NAV_BAR_TOP_TIER_HEIGHT } from "Components/NavBar/constants"
import { useRouter } from "System/Router/useRouter"

const logger = createLogger("Components/Search/NewSearchBar")
const SEARCH_DEBOUNCE_DELAY = 250

export interface NewSearchBarInputProps extends SystemContextProps {
  relay: RelayRefetchProp
  viewer: NewSearchBarInput_viewer$data
  isXs: boolean
}

const reportPerformanceMeasurement = performanceStart => {
  const duration = performance.now() - performanceStart
  const deviceType = getENV("IS_MOBILE") ? "mobile" : "desktop"

  const metricPayload = {
    name: "autocomplete-search-response",
    tags: [`device-type:${deviceType}`, "design:rich"],
    timing: duration,
    type: "timing",
  }

  request
    .post(getENV("VOLLEY_ENDPOINT"))
    .send({
      metrics: [metricPayload],
      serviceName: "force",
    })
    .end()
}

const shouldStartSearching = (value: string) => {
  return value.length > 1
}

const NewSearchBarInput: FC<NewSearchBarInputProps> = ({
  isXs,
  relay,
  viewer,
}) => {
  const tracking = useTracking()
  const { t } = useTranslation()
  const [value, setValue] = useState(getSearchTerm(window.location))
  const [selectedPill, setSelectedPill] = useState<PillType>(TOP_PILL)
  // We use fetchCounter together with useUpdateEffect to track typing
  const [fetchCounter, setFetchCounter] = useState(0)
  const { router } = useRouter()
  const encodedSearchURL = `/search?term=${encodeURIComponent(value)}`

  const options = extractNodes(viewer.searchConnection)
  const formattedOptions: SuggionItemOptionProps[] = options.map(
    (option, index) => {
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
    }
  )

  // Clear the search term once you navigate away from search results
  useMemo(() => {
    router.addNavigationListener(location => {
      if (!location.pathname.startsWith("/search")) {
        setValue("")
      }

      return true
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useUpdateEffect(() => {
    tracking.trackEvent({
      action_type:
        options.length > 0
          ? DeprecatedSchema.ActionType.SearchedAutosuggestWithResults
          : DeprecatedSchema.ActionType.SearchedAutosuggestWithoutResults,
      query: value,
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchCounter])

  const refetch = (value: string, entity?: string) => {
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

        if (performanceStart && getENV("VOLLEY_ENDPOINT")) {
          reportPerformanceMeasurement(performanceStart)
        }

        setFetchCounter(prevCounter => prevCounter + 1)
      }
    )
  }

  const debouncedSearchRequest = useMemo(
    () => debounce(refetch, SEARCH_DEBOUNCE_DELAY),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

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
      action_type: DeprecatedSchema.ActionType.SelectedItemFromSearch,
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
      action_type: DeprecatedSchema.ActionType.FocusedOnAutosuggestInput,
    })
  }

  return (
    <AutocompleteInput
      placeholder={isXs ? t`navbar.searchArtsy` : t`navbar.searchBy`}
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
      renderOption={option => (
        <NewSuggestionItem
          query={value}
          option={option}
          onRedirect={handleRedirect}
        />
      )}
      footer={
        <NewSearchBarFooter
          query={value}
          href={encodedSearchURL}
          index={options.length}
        />
      }
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

interface NewSearchBarInputQueryRendererProps extends BoxProps {
  isXs: boolean
}

export const NewSearchBarInputQueryRenderer: FC<NewSearchBarInputQueryRendererProps> = props => {
  const { relayEnvironment, searchQuery = "" } = useSystemContext()

  if (isServer) {
    return <StaticSearchContainer searchQuery={searchQuery} {...props} />
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
      render={({ props: relayProps }) => {
        if (relayProps && relayProps.viewer) {
          return (
            <NewSearchBarInputRefetchContainer
              viewer={relayProps.viewer}
              isXs={props.isXs}
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
