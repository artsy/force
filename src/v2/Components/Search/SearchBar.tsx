import { Component, useContext } from "react"
import * as React from "react"
import { Box, BoxProps } from "@artsy/palette"
import { SearchBar_viewer$data } from "v2/__generated__/SearchBar_viewer.graphql"
import { SearchBarSuggestQuery } from "v2/__generated__/SearchBarSuggestQuery.graphql"
import { SystemContext, SystemContextProps, withSystemContext } from "v2/System"
import { track } from "v2/System/Analytics"
import * as Schema from "v2/System/Analytics/Schema"
import { SystemQueryRenderer } from "v2/System/Relay/SystemQueryRenderer"
import {
  FirstSuggestionItem,
  PLACEHOLDER,
  PLACEHOLDER_XS,
  SuggestionItem,
} from "v2/Components/Search/Suggestions/SuggestionItem"
import { Router } from "found"
import { isEmpty } from "lodash"
import { throttle } from "lodash"
import qs from "qs"
import Autosuggest from "react-autosuggest"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import styled from "styled-components"
import request from "superagent"
import Events from "v2/Utils/Events"
import { get } from "v2/Utils/get"
import { useDidMount } from "v2/Utils/Hooks/useDidMount"
import createLogger from "v2/Utils/logger"
import { Media } from "v2/Utils/Responsive"
import { SearchInputContainer } from "./SearchInputContainer"

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
@track(null, {
  dispatch: data => Events.postEvent(data),
})
export class SearchBar extends Component<Props, State> {
  public input: HTMLInputElement

  // Once this is set, we don't ever expect to change it back. A click on a
  // descendant indicates that we're going to navigate away from the page, so
  // this behaviour  is acceptable.
  private userClickedOnDescendant: boolean

  private removeNavigationListener: () => void

  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  state = {
    entityID: null,
    entityType: null,
    focused: false,
    term: getSearchTerm(window.location),
  }

  // Throttled method to toggle previews.
  throttledOnSuggestionHighlighted = ({ suggestion }) => {
    if (!suggestion) return

    const {
      node: { displayType: entityType, id: entityID },
    } = suggestion

    if (entityType === "FirstItem") return

    this.setState({
      entityID,
      entityType,
    })
  }

  @track((_props, _state, [query, hasResults]) => ({
    action_type: hasResults
      ? Schema.ActionType.SearchedAutosuggestWithResults
      : Schema.ActionType.SearchedAutosuggestWithoutResults,
    query,
  }))
  trackSearch(_term, _hasResults) {
    /* no-op */
  }

  // Throttled method to perform refetch for new suggest query.
  throttledFetch = ({ value: term }) => {
    const { relay } = this.props
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
        } else if (performanceStart && sd.VOLLEY_ENDPOINT) {
          this.reportPerformanceMeasurement(performanceStart)
        }
        const { viewer } = this.props
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        const edges = get(viewer, v => v.searchConnection.edges, [])
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        this.trackSearch(term, edges.length > 0)
      }
    )
  }

  componentDidMount() {
    this.throttledFetch = throttle(this.throttledFetch, 500, {
      leading: true,
    })

    this.throttledOnSuggestionHighlighted = throttle(
      this.throttledOnSuggestionHighlighted,
      500,
      { leading: true }
    )

    // Clear the search term once you navigate away from search results
    this.removeNavigationListener = this.props.router
      ? this.props.router.addNavigationListener(location => {
          if (!location.pathname.startsWith("/search")) {
            this.setState({ term: "" })
          }

          return true
        })
      : () => {
          // noop
        }
  }

  componentWillUnmount() {
    this.removeNavigationListener()
  }

  reportPerformanceMeasurement = performanceStart => {
    const duration = performance.now() - performanceStart
    const deviceType = sd.IS_MOBILE ? "mobile" : "desktop"

    const metricPayload = {
      name: "autocomplete-search-response",
      tags: [`device-type:${deviceType}`, "design:rich"],
      timing: duration,
      type: "timing",
    }

    request
      .post(sd.VOLLEY_ENDPOINT)
      .send({
        metrics: [metricPayload],
        serviceName: "force",
      })
      .end()
  }

  searchTextChanged = (_e, { newValue: term }) => {
    this.setState({ term })
  }

  @track({
    action_type: Schema.ActionType.FocusedOnAutosuggestInput,
  })
  onFocus() {
    this.setState({ focused: true })
  }

  onBlur = event => {
    const isClickOnSearchIcon =
      event.relatedTarget &&
      event.relatedTarget.form &&
      event.relatedTarget.form === event.target.form
    if (isClickOnSearchIcon) {
      if (!isEmpty(event.target.value)) {
        this.userClickedOnDescendant = true
      }
    } else {
      this.setState({ focused: false })
    }
  }

  onSuggestionsClearRequested = () => {
    // This event _also_ fires when a user clicks on a link in the preview pane
    //  or the magnifying glass icon. If we initialize state when that happens,
    //  the link will get removed from the DOM before the browser has a chance
    //  to follow it.
    if (!this.userClickedOnDescendant) {
      this.setState({
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        entityID: null,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        entityType: null,
      })
    }
  }

  // Navigate to selected search item.
  @track(
    (
      _props,
      state: State,
      [
        {
          suggestion: {
            node: { href, displayType, id, __typename },
          },
          suggestionIndex,
        },
      ]
    ) => ({
      action_type: Schema.ActionType.SelectedItemFromSearch,
      destination_path:
        __typename === "Artist" ? `${href}/works-for-sale` : href,
      item_id: id,
      item_number: suggestionIndex,
      item_type: displayType,
      query: state.term,
    })
  )
  onSuggestionSelected({
    suggestion: {
      node: { href },
    },
    method,
  }) {
    this.userClickedOnDescendant = true

    if (this.props.router) {
      // @ts-ignore (routeConfig not found; need to update DT types)
      const routes = this.props.router.matcher.routeConfig
      // @ts-ignore (matchRoutes not found; need to update DT types)
      const isSupportedInRouter = !!this.props.router.matcher.matchRoutes(
        routes,
        href
      )

      // Check if url exists within the global router context
      if (isSupportedInRouter) {
        this.props.router.push(href)
        this.onBlur({})
      } else {
        window.location.assign(href)
      }
      // Outside of router context
    } else {
      window.location.assign(href)
    }
  }

  renderSuggestionsContainer = ({ containerProps, children, query }) => {
    const noResults = get(
      this.props,
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      p => p.viewer.searchConnection.edges.length === 0
    )
    const { focused } = this.state

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

  getSuggestionValue = ({ node: { displayLabel } }) => {
    return displayLabel
  }

  getLabel = ({ displayType, __typename }) =>
    displayType || (__typename === "Artist" ? "Artist" : null)

  renderSuggestion = (edge, rest) => {
    const renderer = edge.node.isFirstItem
      ? this.renderFirstSuggestion
      : this.renderDefaultSuggestion
    const item = renderer(edge, rest)
    return item
  }

  renderFirstSuggestion = (edge, { query, isHighlighted }) => {
    const { displayLabel, href } = edge.node

    const label = this.getLabel(edge.node)

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

  renderDefaultSuggestion = (edge, { query, isHighlighted }) => {
    const { displayLabel, href, statuses } = edge.node

    const label = this.getLabel(edge.node)

    const showArtworksButton = !!statuses?.artworks
    const showAuctionResultsButton = !!statuses?.auctionLots

    return (
      <SuggestionItem
        display={displayLabel}
        href={href}
        isHighlighted={isHighlighted}
        label={label}
        query={query}
        showArtworksButton={showArtworksButton}
        showAuctionResultsButton={showAuctionResultsButton}
      />
    )
  }

  renderInputComponent = props => <SearchInputContainer {...props} />

  renderAutosuggestComponent({ xs }) {
    const { term } = this.state
    const { viewer } = this.props

    const inputProps = {
      "aria-label": "Search Artsy",
      name: "term",
      onBlur: this.onBlur,
      onChange: this.searchTextChanged,
      onFocus: this.onFocus.bind(this),
      onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (
          event.keyCode === 13 && // Enter key press ...
          event.target && // with empty search query
          isEmpty((event.target as HTMLInputElement).value)
        ) {
          event.preventDefault()
        }
      },
      placeholder: xs ? PLACEHOLDER_XS : PLACEHOLDER,
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

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const edges = get(viewer, v => v.searchConnection.edges, [])
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const suggestions = [firstSuggestionPlaceholder, ...edges]

    return (
      <Autosuggest
        focusInputOnSuggestionClick={false}
        alwaysRenderSuggestions={this.userClickedOnDescendant}
        suggestions={suggestions}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        onSuggestionHighlighted={this.throttledOnSuggestionHighlighted}
        onSuggestionsFetchRequested={this.throttledFetch}
        getSuggestionValue={this.getSuggestionValue}
        renderSuggestion={this.renderSuggestion}
        renderSuggestionsContainer={props => {
          return this.renderSuggestionsContainer(props)
        }}
        inputProps={inputProps}
        onSuggestionSelected={(e, selection) => {
          e.preventDefault()
          this.onSuggestionSelected(selection)
        }}
        renderInputComponent={this.renderInputComponent}
      />
    )
  }

  render() {
    const { router } = this.props

    return (
      <Form
        action="/search"
        method="GET"
        onSubmit={event => {
          if (router) {
            event.preventDefault()
            const encodedTerm = encodeURIComponent(this.state.term)

            // TODO: Reenable in-router push once all routes have been moved over
            // to new novo app
            // router.push(`/search?term=${this.state.term}`)
            window.location.assign(`/search?term=${encodedTerm}`)
            this.onBlur(event)
          } else {
            console.error(
              "[Components/Search/SearchBar] `router` instance not found."
            )
          }
        }}
      >
        <Media at="xs">{this.renderAutosuggestComponent({ xs: true })}</Media>
        <Media greaterThan="xs">
          {this.renderAutosuggestComponent({ xs: false })}
        </Media>
      </Form>
    )
  }
}

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
  return (
    <>
      <Box display={["block", "none"]} {...rest}>
        <SearchInputContainer
          placeholder={searchQuery || PLACEHOLDER_XS}
          defaultValue={searchQuery}
        />
      </Box>

      <Box display={["none", "block"]} {...rest}>
        <SearchInputContainer
          placeholder={searchQuery || PLACEHOLDER}
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
