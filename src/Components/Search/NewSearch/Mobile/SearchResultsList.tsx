import { FC } from "react"
import {
  RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"
import { SearchResultsList_viewer$data } from "__generated__/SearchResultsList_viewer.graphql"
import { extractNodes } from "Utils/extractNodes"
import {
  NewSuggestionItem,
  SuggestionItemOptionProps,
} from "Components/Search/NewSearch/SuggestionItem/NewSuggestionItem"
import { Flex, Spinner } from "@artsy/palette"
import {
  SearchNodeOption,
  formatOptions,
} from "Components/Search/NewSearch/utils/formatOptions"
import { InfiniteScrollSentinel } from "Components/InfiniteScrollSentinel"
import { NoResults } from "Components/Search/NewSearch/Mobile/SearchResultsList/NoResults"
import { ContentPlaceholder } from "Components/Search/NewSearch/Mobile/SearchResultsList/ContentPlaceholder"

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
  const options = extractNodes(viewer.searchConnection)
  const formattedOptions: SuggestionItemOptionProps[] = formatOptions(
    options as SearchNodeOption[]
  )

  if (!viewer.searchConnection) {
    return <ContentPlaceholder />
  }

  if (formattedOptions.length === 0) {
    return <NoResults query={query} mt={4} mx={2} />
  }

  const handleLoadMore = () => {
    if (!relay.hasMore() || relay.isLoading()) {
      return
    }

    relay.loadMore(ENTITIES_PER_SCROLL, err => {
      if (err) {
        console.error(err)
      }
    })
  }

  return (
    <>
      {formattedOptions.map((option, index) => {
        return (
          <NewSuggestionItem
            query={query}
            option={option}
            onRedirect={onClose}
            key={index}
          />
        )
      })}

      {relay.hasMore() && (
        <>
          <InfiniteScrollSentinel onNext={handleLoadMore} once={false} />

          <Flex width="100%" my={4} alignItems="center">
            <Spinner position="relative" />
          </Flex>
        </>
      )}
    </>
  )
}

export const SearchResultsListPaginationContainer = createPaginationContainer(
  SearchResultsList,
  {
    viewer: graphql`
      fragment SearchResultsList_viewer on Viewer
        @argumentDefinitions(
          first: { type: "Int", defaultValue: 10 }
          after: { type: "String" }
          term: { type: "String!", defaultValue: "" }
          entities: { type: "[SearchEntity]" }
        ) {
        searchConnection(
          query: $term
          entities: $entities
          mode: AUTOSUGGEST
          first: $first
          after: $after
        ) @connection(key: "SearchResultsList_searchConnection") {
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
        entities: fragmentVariables.entities,
      }
    },
    query: graphql`
      query SearchResultsListPaginationQuery(
        $after: String
        $term: String!
        $entities: [SearchEntity]
      ) {
        viewer {
          ...SearchResultsList_viewer
            @arguments(term: $term, entities: $entities, after: $after)
        }
      }
    `,
  }
)
