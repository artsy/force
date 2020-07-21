import { Box, BoxProps, Flex } from "@artsy/palette"
import { SearchBar_viewer } from "v2/__generated__/SearchBar_viewer.graphql"
import { SearchBarSuggestQuery } from "v2/__generated__/SearchBarSuggestQuery.graphql"
import { SystemContext, SystemContextProps, withSystemContext } from "v2/Artsy"
import { track } from "v2/Artsy/Analytics"
import * as Schema from "v2/Artsy/Analytics/Schema"
import { SystemQueryRenderer as QueryRenderer } from "v2/Artsy/Relay/SystemQueryRenderer"
import colors from "v2/Assets/Colors"
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
import React, { Component, useContext } from "react"
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
  viewer: SearchBar_viewer
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

const ResultsWrapper = styled(Box)`
  background-color: ${colors.white};
  display: flex;
  border: 1px solid ${colors.grayRegular};
  position: absolute;
`

const SuggestionContainer = ({ children, containerProps }) => {
  return (
    <AutosuggestWrapper
      width="100%"
      flexDirection={["column", "row"]}
      {...containerProps}
    >
      <ResultsWrapper width="100%" mt={0.5}>
        <Box width="100%">
          <Flex flexDirection="column" width="100%">
            {children}
          </Flex>
        </Box>
      </ResultsWrapper>
    </AutosuggestWrapper>
  )
}

const Form = styled.form`
  width: 100%;
`

@track(null, {
  dispatch: data => Events.postEvent(data),
})
export class SearchBar extends Component<Props, State> {
  public input: HTMLInputElement

  // Once this is set, we don't ever expect to change it back. A click on a
  // descendant indicates that we're going to navigate away from the page, so
  // this behaviour  is acceptable.
  private userClickedOnDescendant: boolean

  state = {
    term: getSearchTerm(window.location),
    entityID: null,
    entityType: null,
    focused: false,
  }

  // Throttled method to toggle previews.
  throttledOnSuggestionHighlighted = ({ suggestion }) => {
    if (!suggestion) return

    const {
      node: { displayType: entityType, id: entityID },
    } = suggestion

    if (entityType === "FirstItem") return

    this.setState({
      entityType,
      entityID,
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
        term,
        hasTerm: true,
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
        const edges = get(viewer, v => v.searchConnection.edges, [])
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
  }

  reportPerformanceMeasurement = performanceStart => {
    const duration = performance.now() - performanceStart
    const deviceType = sd.IS_MOBILE ? "mobile" : "desktop"

    const metricPayload = {
      type: "timing",
      name: "autocomplete-search-response",
      timing: duration,
      tags: [`device-type:${deviceType}`, "design:rich"],
    }

    request
      .post(sd.VOLLEY_ENDPOINT)
      .send({
        serviceName: "force",
        metrics: [metricPayload],
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

  onSuggestionsClearRequested = e => {
    // This event _also_ fires when a user clicks on a link in the preview pane
    //  or the magnifying glass icon. If we initialize state when that happens,
    //  the link will get removed from the DOM before the browser has a chance
    //  to follow it.
    if (!this.userClickedOnDescendant) {
      this.setState({
        entityID: null,
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
            node: { href, displayType, id },
          },
          suggestionIndex,
        },
      ]
    ) => ({
      action_type: Schema.ActionType.SelectedItemFromSearch,
      query: state.term,
      destination_path:
        displayType === "Artist" ? `${href}/works-for-sale` : href,
      item_type: displayType,
      item_id: id,
      item_number: suggestionIndex,
    })
  )
  onSuggestionSelected({
    suggestion: {
      node: { href, displayType },
    },
  }) {
    this.userClickedOnDescendant = true
    const newHref = displayType === "Artist" ? `${href}/works-for-sale` : href

    if (this.props.router) {
      // @ts-ignore (routeConfig not found; need to update DT types)
      const routes = this.props.router.matcher.routeConfig
      // @ts-ignore (matchRoutes not found; need to update DT types)
      const isSupportedInRouter = !!this.props.router.matcher.matchRoutes(
        routes,
        newHref
      )

      // Check if url exists within the global router context
      if (isSupportedInRouter) {
        this.props.router.push(newHref)
        this.onBlur({})
      } else {
        window.location.assign(newHref)
      }
      // Outside of router context
    } else {
      window.location.assign(newHref)
    }
  }

  renderSuggestionsContainer = ({ containerProps, children, query }) => {
    const noResults = get(
      this.props,
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

  renderSuggestion = (edge, rest) => {
    const renderer = edge.node.isFirstItem
      ? this.renderFirstSuggestion
      : this.renderDefaultSuggestion
    const item = renderer(edge, rest)
    return item
  }

  renderFirstSuggestion = (edge, { query, isHighlighted }) => {
    const { displayLabel, displayType, href } = edge.node
    return (
      <FirstSuggestionItem
        display={displayLabel}
        href={href}
        isHighlighted={isHighlighted}
        label={displayType}
        query={query}
      />
    )
  }

  renderDefaultSuggestion = (edge, { query, isHighlighted }) => {
    const { displayLabel, displayType, href } = edge.node
    const newHref = displayType === "Artist" ? `${href}/works-for-sale` : href

    return (
      <SuggestionItem
        display={displayLabel}
        href={newHref}
        isHighlighted={isHighlighted}
        label={displayType}
        query={query}
      />
    )
  }

  renderInputComponent = props => <SearchInputContainer {...props} />

  renderAutosuggestComponent({ xs }) {
    const { term } = this.state
    const { viewer } = this.props

    const inputProps = {
      "aria-label": "Search Artsy",
      onChange: this.searchTextChanged,
      onFocus: this.onFocus.bind(this),
      onBlur: this.onBlur,
      placeholder: xs ? PLACEHOLDER_XS : PLACEHOLDER,
      value: term,
      name: "term",
      onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (
          event.keyCode === 13 && // Enter key press ...
          event.target && // with empty search query
          isEmpty((event.target as HTMLInputElement).value)
        ) {
          event.preventDefault()
        }

        // Clear input after submit
        if (event.key === "Enter") {
          setTimeout(() => {
            this.setState({
              term: "",
            })
          })
        }
      },
    }

    const firstSuggestionPlaceholder = {
      node: {
        isFirstItem: true,
        displayType: "FirstItem",
        displayLabel: term,
        href: `/search?term=${term}`,
      },
    }

    const edges = get(viewer, v => v.searchConnection.edges, [])
    const suggestions = [firstSuggestionPlaceholder, ...edges]

    return (
      <Autosuggest
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
        itemProp="potentialAction"
        itemScope
        itemType="http://schema.org/SearchAction"
        onSubmit={event => {
          if (router) {
            event.preventDefault()
            router.push(`/search?term=${this.state.term}`)
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
              ... on SearchableItem {
                displayType
                slug
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
    <QueryRenderer<SearchBarSuggestQuery>
      environment={relayEnvironment}
      query={graphql`
        query SearchBarSuggestQuery($term: String!, $hasTerm: Boolean!) {
          viewer {
            ...SearchBar_viewer @arguments(term: $term, hasTerm: $hasTerm)
          }
        }
      `}
      variables={{
        term: "",
        hasTerm: false,
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

export function getSearchTerm(location: Location): string {
  const term = get(
    qs,
    querystring => querystring.parse(location.search.slice(1)).term,
    ""
  )
  if (Array.isArray(term)) {
    return term[0]
  }
  return term
}
