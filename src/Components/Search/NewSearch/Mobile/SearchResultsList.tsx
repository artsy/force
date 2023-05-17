import { FC, useState } from "react"
import {
  RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"
import { SearchResultsList_viewer$data } from "__generated__/SearchResultsList_viewer.graphql"
import { extractNodes } from "Utils/extractNodes"
import {
  NewSuggestionItem,
  SuggionItemOptionProps,
} from "Components/Search/NewSearch/SuggestionItem/NewSuggestionItem"
import { Flex, Spinner } from "@artsy/palette"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { SearchResultsListQuery } from "__generated__/SearchResultsListQuery.graphql"
import {
  SearchNodeOption,
  formatOptions,
} from "Components/Search/NewSearch/utils/formatOptions"
import { InfiniteScrollSentinel } from "Components/InfiniteScrollSentinel"
import { ContentPlaceholder } from "Components/Search/NewSearch/Mobile/SearchResultsList/ContentPlaceholder"
import { NoResults } from "Components/Search/NewSearch/Mobile/SearchResultsList/NoResults"

interface SearchResultsListProps {
  relay: RelayPaginationProp
  viewer: SearchResultsList_viewer$data
  query: string
  onClose: () => void
}

const ENTITIES_PER_SCROLL = 10

const SearchResultsList: FC<SearchResultsListProps> = ({
  relay,
  viewer,
  query,
  onClose,
}) => {
  const [isLoading, setIsLoading] = useState(false)

  const options = extractNodes(viewer.searchConnection)

  if (!relay.isLoading() && options.length === 0) {
    return <NoResults query={query} mt={50} mx={20} />
  }

  const formattedOptions: SuggionItemOptionProps[] = formatOptions(
    options as SearchNodeOption[]
  )

  const handleLoadMore = () => {
    if (!relay.hasMore() || relay.isLoading()) {
      return
    }

    setIsLoading(true)

    relay.loadMore(ENTITIES_PER_SCROLL, err => {
      if (err) {
        console.error(err)
      }

      setIsLoading(false)
    })
  }

  const handleOnRedirect = () => {
    onClose()
  }

  return (
    <>
      {formattedOptions.map((option, index) => {
        return (
          <NewSuggestionItem
            query={query}
            option={option}
            onRedirect={handleOnRedirect}
            key={index}
          />
        )
      })}

      {relay.hasMore() && (
        <InfiniteScrollSentinel onNext={handleLoadMore} once={false} />
      )}

      {isLoading && (
        <Flex width="100%" my={4} alignItems="center">
          <Spinner position="relative" />
        </Flex>
      )}
    </>
  )
}

const SearchResultsListPaginationContainer = createPaginationContainer(
  SearchResultsList,
  {
    viewer: graphql`
      fragment SearchResultsList_viewer on Viewer
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          after: { type: "String" }
          term: { type: "String!", defaultValue: "" }
          hasTerm: { type: "Boolean!", defaultValue: false }
          entities: { type: "[SearchEntity]" }
        ) {
        searchConnection(
          query: $term
          entities: $entities
          mode: AUTOSUGGEST
          first: $first
          after: $after
        )
          @include(if: $hasTerm)
          @connection(key: "SearchResultsList_searchConnection") {
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
        hasTerm: fragmentVariables.hasTerm,
        entities: fragmentVariables.entities,
      }
    },
    query: graphql`
      query SearchResultsListPaginationQuery(
        $after: String
        $first: Int!
        $term: String!
        $hasTerm: Boolean!
        $entities: [SearchEntity]
      ) {
        viewer {
          ...SearchResultsList_viewer
            @arguments(
              term: $term
              hasTerm: $hasTerm
              entities: $entities
              first: $first
              after: $after
            )
        }
      }
    `,
  }
)

interface SearchResultsListQueryRendererProps {
  term: string
  hasTerm: boolean
  entities: string[]
  onClose: () => void
}

export const SearchResultsListQueryRenderer: FC<SearchResultsListQueryRendererProps> = ({
  term,
  hasTerm,
  entities,
  ...rest
}) => {
  return (
    <SystemQueryRenderer<SearchResultsListQuery>
      placeholder={<ContentPlaceholder />}
      query={graphql`
        query SearchResultsListQuery(
          $term: String!
          $hasTerm: Boolean!
          $entities: [SearchEntity]
        ) {
          viewer {
            ...SearchResultsList_viewer
              @arguments(term: $term, hasTerm: $hasTerm, entities: $entities)
          }
        }
      `}
      variables={{
        hasTerm: hasTerm,
        term: term,
        entities: entities,
      }}
      render={({ props: relayProps, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!relayProps?.viewer) {
          return <ContentPlaceholder />
        }

        return (
          <SearchResultsListPaginationContainer
            viewer={relayProps.viewer}
            query={term}
            {...rest}
          />
        )
      }}
    />
  )
}
