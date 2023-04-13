import { useCallback, useContext, useEffect, useState } from "react"
import * as React from "react"
import { Box, BoxProps } from "@artsy/palette"
import { SearchBar_viewer$data } from "__generated__/SearchBar_viewer.graphql"
import { SearchBarSuggestQuery } from "__generated__/SearchBarSuggestQuery.graphql"
import {
  SystemContext,
  SystemContextProps,
  withSystemContext,
} from "System/SystemContext"
import * as DeprecatedSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import {
  FirstSuggestionItem,
  SuggestionItem,
} from "Components/Search/Suggestions/SuggestionItem"
import { Router } from "found"
import { isEmpty } from "lodash"
import { throttle } from "lodash"
import qs from "qs"
// eslint-disable-next-line no-restricted-imports
import Autosuggest from "react-autosuggest"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import styled from "styled-components"
// eslint-disable-next-line no-restricted-imports
import request from "superagent"
import Events from "Utils/Events"
import { get } from "Utils/get"
import { useDidMount } from "Utils/Hooks/useDidMount"
import createLogger from "Utils/logger"
import { Media } from "Utils/Responsive"
import { SearchInputContainer } from "./SearchInputContainer"
import { useTranslation } from "react-i18next"
import { ClassI18n } from "System/i18n/ClassI18n"
import track, { useTracking } from "react-tracking"
import { getENV } from "Utils/getENV"

const logger = createLogger("Components/Search/SearchBar")

export interface Props extends SystemContextProps {
  relay: RelayRefetchProp
  router?: Router
  viewer: SearchBar_viewer$data
}

interface State {
  /* Holds current input */
  term: string
  /* For preview generation of selected items */
  entityID: string
  entityType: string
  focused: boolean
}

const AutosuggestWrapper = styled(Box)`
  position: relative;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
`

const SuggestionContainer = ({ children, containerProps }) => {
  return (
    <AutosuggestWrapper {...containerProps}>
      <Box
        width="100%"
        mt={0.5}
        border="1px solid"
        borderColor="black10"
        bg="white100"
        position="absolute"
        zIndex={2}
      >
        {children}
      </Box>
    </AutosuggestWrapper>
  )
}

const Form = styled.form`
  width: 100%;
`

// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
const SearchBar = track(null, {
  dispatch: data => Events.postEvent(data),
})(({ router, relay, viewer }) => {
  const [entityID, setEntityID] = useState(null)
  const [entityType, setEntityType] = useState(null)
  const [focused, setFocused] = useState(false)
  const [term, setTerm] = useState(getSearchTerm(window.location))
  const { trackEvent } = useTracking()

  // Once this is set, we don't ever expect to change it back. A click on a
  // descendant indicates that we're going to navigate away from the page, so
  // this behaviour  is acceptable.
  let userClickedOnDescendant: boolean

  const removeNavigationListener = useCallback(() => {
    if (!router) {
      return null
    }

    return router.addNavigationListener(location => {
      if (!location.pathname.startsWith("/search")) {
        setTerm("")
      }

      return true
    })
  }, [router])

  // Throttled method to toggle previews.
  const throttledOnSuggestionHighlighted = ({ suggestion }) => {
    if (!suggestion) return

    const {
      node: { displayType: entityType, id: entityID },
    } = suggestion

    if (entityType === "FirstItem") return

    setEntityID(entityID)
    setEntityType(entityType)
  }

  track((_props, _state, [query, hasResults]) => ({
    action_type: hasResults
      ? DeprecatedSchema.ActionType.SearchedAutosuggestWithResults
      : DeprecatedSchema.ActionType.SearchedAutosuggestWithoutResults,
    query,
  }))

  const trackSearch = (_term, _hasResults) => {
    /* no-op */
  }

  // Throttled method to perform refetch for new suggest query.
  const throttledFetch = useCallback(
    ({ value: term }) => {
      const performanceStart = performance && performance.now()

      relay.refetch(
        {
          hasTerm: true,
          term,
        },
        null,
        error => {
          if (error) {
            logger.error(error)
            return
          } else if (performanceStart && getENV("VOLLEY_ENDPOINT")) {
            reportPerformanceMeasurement(performanceStart)
          }
          const edges = get(viewer, v => v.searchConnection.edges, [])
          trackSearch(term, edges.length > 0)
        }
      )
    },
    [relay, viewer]
  )

  useEffect(() => {
    throttle(throttledFetch, 500, {
      leading: true,
    })

    throttle(throttledOnSuggestionHighlighted, 500, { leading: true })

    return removeNavigationListener
  }, [removeNavigationListener, router, throttledFetch])

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

  const searchTextChanged = (_e, { newValue: term }) => {
    setTerm(term)
  }

  const onFocus = () => {
    setFocused(true)
    trackEvent({
      action_type: DeprecatedSchema.ActionType.FocusedOnAutosuggestInput,
    })
  }

  const onBlur = event => {
    const isClickOnSearchIcon =
      event.relatedTarget &&
      event.relatedTarget.form &&
      event.relatedTarget.form === event.target.form
    if (isClickOnSearchIcon) {
      if (!isEmpty(event.target.value)) {
        userClickedOnDescendant = true
      }
    } else {
      setFocused(false)
    }
  }

  const onSuggestionsClearRequested = () => {
    // This event _also_ fires when a user clicks on a link in the preview pane
    //  or the magnifying glass icon. If we initialize state when that happens,
    //  the link will get removed from the DOM before the browser has a chance
    //  to follow it.
    if (!userClickedOnDescendant) {
      setEntityID(null)
      setEntityType(null)
    }
  }

  // Navigate to selected search item.
  const onSuggestionSelected = ({
    suggestion: {
      node: { href, displayType, id, __typename },
    },
    suggestionIndex,
    method,
  }) => {
    userClickedOnDescendant = true

    if (router) {
      const routes = router.matcher.routeConfig
      const isSupportedInRouter = !!router.matcher.matchRoutes(routes, href)

      // Check if url exists within the global router context
      if (isSupportedInRouter) {
        router.push(href)
        onBlur({})
      } else {
        window.location.assign(href)
      }
      // Outside of router context
    } else {
      window.location.assign(href)
    }

    trackEvent({
      action_type: DeprecatedSchema.ActionType.SelectedItemFromSearch,
      destination_path:
        __typename === "Artist" ? `${href}/works-for-sale` : href,
      item_id: id,
      item_number: suggestionIndex,
      item_type: displayType,
      query: term,
    })
  }

  const renderSuggestionsContainer = ({ containerProps, children, query }) => {
    const noResults = get(
      viewer,
      p => p.viewer.searchConnection.edges.length === 0
    )

    if (noResults || !focused || !query) {
      return null
    }

    const props = {
      children,
      containerProps,
      focused,
      query,
    }

    return <SuggestionContainer {...props}>{children}</SuggestionContainer>
  }

  const getSuggestionValue = ({ node: { displayLabel } }) => {
    return displayLabel
  }

  const getLabel = ({ displayType, __typename }) =>
    displayType || (__typename === "Artist" ? "Artist" : null)

  const renderSuggestion = (edge, rest) => {
    const renderer = edge.node.isFirstItem
      ? renderFirstSuggestion
      : renderDefaultSuggestion
    const item = renderer(edge, rest)
    return item
  }

  const renderFirstSuggestion = (edge, { query, isHighlighted }) => {
    const { displayLabel, href } = edge.node

    const label = getLabel(edge.node)

    return (
      <FirstSuggestionItem
        display={displayLabel}
        href={href}
        isHighlighted={isHighlighted}
        label={label}
        query={query}
      />
    )
  }

  const renderDefaultSuggestion = (edge, { query, isHighlighted }) => {
    const { displayLabel, href, statuses, imageUrl } = edge.node

    const label = getLabel(edge.node)

    const showArtworksButton = !!statuses?.artworks
    const showAuctionResultsButton = !!statuses?.auctionLots

    return (
      <SuggestionItem
        display={displayLabel}
        href={href}
        isHighlighted={isHighlighted}
        label={label}
        imageUrl={imageUrl}
        query={query}
        showArtworksButton={showArtworksButton}
        showAuctionResultsButton={showAuctionResultsButton}
      />
    )
  }

  const renderInputComponent = props => <SearchInputContainer {...props} />

  const renderAutosuggestComponent = (t, { xs }) => {
    const inputProps = {
      "aria-label": "Search Artsy",
      name: "term",
      onBlur,
      onChange: searchTextChanged,
      onFocus,
      onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (
          event.keyCode === 13 && // Enter key press ...
          event.target && // with empty search query
          isEmpty((event.target as HTMLInputElement).value)
        ) {
          event.preventDefault()
        }
      },
      placeholder: xs ? t`navbar.searchArtsy` : t`navbar.searchBy`,
      value: term,
    }

    const firstSuggestionPlaceholder = {
      node: {
        displayLabel: term,
        displayType: "FirstItem",
        href: `/search?term=${encodeURIComponent(term)}`,
        isFirstItem: true,
      },
    }

    const edges = get(viewer, v => v.searchConnection.edges, [])
    const suggestions = [...edges, firstSuggestionPlaceholder]

    return (
      <Autosuggest
        focusInputOnSuggestionClick={false}
        alwaysRenderSuggestions={userClickedOnDescendant}
        suggestions={suggestions}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionHighlighted={throttledOnSuggestionHighlighted}
        onSuggestionsFetchRequested={throttledFetch}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        renderSuggestionsContainer={props => {
          return renderSuggestionsContainer(props)
        }}
        inputProps={inputProps}
        onSuggestionSelected={(e, selection) => {
          e.preventDefault()
          onSuggestionSelected(selection)
        }}
        renderInputComponent={renderInputComponent}
      />
    )
  }

  return (
    <ClassI18n>
      {({ t }) => (
        <Form
          action="/search"
          method="GET"
          onSubmit={event => {
            if (router) {
              event.preventDefault()
              const encodedTerm = encodeURIComponent(term)

              // TODO: Reenable in-router push once all routes have been moved over
              // to new app shell
              // router.push(`/search?term=${this.state.term}`)
              window.location.assign(`/search?term=${encodedTerm}`)
              onBlur(event)
            } else {
              console.error(
                "[Components/Search/SearchBar] `router` instance not found."
              )
            }
          }}
        >
          <Media at="xs">{renderAutosuggestComponent(t, { xs: true })}</Media>
          <Media greaterThan="xs">
            {renderAutosuggestComponent(t, { xs: false })}
          </Media>
        </Form>
      )}
    </ClassI18n>
  )
})

export const SearchBarRefetchContainer = createRefetchContainer(
  withSystemContext(SearchBar),
  {
    viewer: graphql`
      fragment SearchBar_viewer on Viewer
        @argumentDefinitions(
          term: { type: "String!", defaultValue: "" }
          hasTerm: { type: "Boolean!", defaultValue: false }
        ) {
        searchConnection(query: $term, mode: AUTOSUGGEST, first: 7)
          @include(if: $hasTerm) {
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
      }
    `,
  },
  graphql`
    query SearchBarRefetchQuery($term: String!, $hasTerm: Boolean!) {
      viewer {
        ...SearchBar_viewer @arguments(term: $term, hasTerm: $hasTerm)
      }
    }
  `
)

/**
 * Displays during SSR render, but once mounted is swapped out with
 * QueryRenderer below.
 */
const StaticSearchContainer: React.FC<{ searchQuery: string } & BoxProps> = ({
  searchQuery,
  ...rest
}) => {
  const { t } = useTranslation()
  return (
    <>
      <Box display={["block", "none"]} {...rest}>
        <SearchInputContainer
          placeholder={searchQuery || t`navbar.searchArtsy`}
          defaultValue={searchQuery}
        />
      </Box>

      <Box display={["none", "block"]} {...rest}>
        <SearchInputContainer
          placeholder={searchQuery || t`navbar.searchBy`}
          defaultValue={searchQuery}
        />
      </Box>
    </>
  )
}

export const SearchBarQueryRenderer: React.FC<BoxProps> = props => {
  const { relayEnvironment, searchQuery = "" } = useContext(SystemContext)
  const isMounted = useDidMount(typeof window !== "undefined")

  if (!isMounted) {
    return <StaticSearchContainer searchQuery={searchQuery} {...props} />
  }

  return (
    <SystemQueryRenderer<SearchBarSuggestQuery>
      environment={relayEnvironment}
      query={graphql`
        query SearchBarSuggestQuery($term: String!, $hasTerm: Boolean!) {
          viewer {
            ...SearchBar_viewer @arguments(term: $term, hasTerm: $hasTerm)
          }
        }
      `}
      variables={{
        hasTerm: false,
        term: "",
      }}
      render={({ props }) => {
        if (props) {
          return <SearchBarRefetchContainer viewer={props.viewer} />
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

export const getSearchTerm = (location: Location): string => {
  const term = qs.parse(location.search?.slice(1))?.term ?? ""

  if (Array.isArray(term)) {
    return term[0]
  }

  return term
}
