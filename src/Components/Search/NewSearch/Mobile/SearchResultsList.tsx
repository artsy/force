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
  SuggionItemOptionProps,
} from "Components/Search/NewSearch/SuggestionItem/NewSuggestionItem"
import { getLabel } from "Components/Search/NewSearch/utils/getLabel"
import { useIntersectionObserver } from "Utils/Hooks/useIntersectionObserver"
import { Box } from "@artsy/palette"
import { shouldStartSearching } from "Components/Search/NewSearch/utils/shouldStartSearching"

interface SearchResultsListProps {
  relay: RelayPaginationProp
  viewer: SearchResultsList_viewer$data
  query: string
}

const ENTITIES_PER_SCROLL = 10

const SearchResultsList: FC<SearchResultsListProps> = ({
  relay,
  viewer,
  query,
}) => {
  if (!shouldStartSearching(query)) return null

  const options = extractNodes(viewer.searchConnection)

  // TODO: refactor
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

  // TODO: loading state
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
            onRedirect={() => {}}
            key={index}
          />
        )
      })}

      {relay.hasMore() && <InfiniteScrollSentinel onNext={handleLoadMore} />}
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

interface InfiniteScrollSentinelProps {
  onNext: () => void
}

const InfiniteScrollSentinel: FC<InfiniteScrollSentinelProps> = ({
  onNext,
}) => {
  const { ref } = useIntersectionObserver({
    onIntersection: onNext,
    once: false,
  })

  return <Box ref={ref as any} height={0} />
}
