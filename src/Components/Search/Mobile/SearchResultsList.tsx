import { ActionType, type SelectedItemFromSearch } from "@artsy/cohesion"
import { Flex, Spinner } from "@artsy/palette"
import { InfiniteScrollSentinel } from "Components/InfiniteScrollSentinel"
import {
  SuggestionItem,
  type SuggestionItemOptionProps,
} from "Components/Search/SuggestionItem/SuggestionItem"
import type { PillType } from "Components/Search/constants"
import {
  type SearchNodeOption,
  formatOptions,
} from "Components/Search/utils/formatOptions"
import { extractNodes } from "Utils/extractNodes"
import type { SearchResultsList_viewer$data } from "__generated__/SearchResultsList_viewer.graphql"
import { type FC, useEffect } from "react"
import {
  type RelayPaginationProp,
  createPaginationContainer,
  graphql,
} from "react-relay"
import { useTracking } from "react-tracking"
import { ContentPlaceholder } from "./SearchResultsList/ContentPlaceholder"
import { NoResults } from "./SearchResultsList/NoResults"

interface SearchResultsListProps {
  relay: RelayPaginationProp
  viewer: SearchResultsList_viewer$data
  query: string
  selectedPill: PillType
  onClose: () => void
}

const ENTITIES_PER_SCROLL = 10

const SearchResultsList: FC<
  React.PropsWithChildren<SearchResultsListProps>
> = ({ relay, viewer, query, selectedPill, onClose }) => {
  const tracking = useTracking()
  const options = extractNodes(viewer.searchConnection)

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (viewer.searchConnection) {
      tracking.trackEvent({
        action_type:
          options.length > 0
            ? ActionType.searchedWithResults
            : ActionType.searchedWithNoResults,
        context_module: selectedPill.analyticsContextModule,
        query: query,
      })
    }
    // When selecting another pill - this effect shouldn't be executed again, so we disable the linting rule
  }, [viewer.searchConnection])

  const formattedOptions: SuggestionItemOptionProps[] = formatOptions(
    options.map(option => {
      return {
        ...option,
        imageUrl: option.coverArtwork?.image?.src || option.imageUrl,
      }
    }) as SearchNodeOption[],
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

  const handleRedirect = (
    option: SuggestionItemOptionProps,
    quickNavigation = false,
  ) => {
    if (!quickNavigation) {
      const event: SelectedItemFromSearch = {
        action: ActionType.selectedItemFromSearch,
        context_module: selectedPill.analyticsContextModule,
        destination_path: option.href,
        query: query,
        item_id: option.item_id!,
        item_number: option.item_number!,
        item_type: option.item_type!,
      }
      tracking.trackEvent(event)
    }

    onClose()
  }

  return (
    <>
      {formattedOptions.map((option, index) => {
        return (
          <SuggestionItem
            query={query}
            option={option}
            onClick={handleRedirect}
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
        variant: { type: "String" }
      ) {
        searchConnection(
          query: $term
          entities: $entities
          mode: AUTOSUGGEST
          first: $first
          after: $after
          variant: $variant
        ) @connection(key: "SearchResultsList_searchConnection") {
          edges {
            node {
              displayLabel
              href
              imageUrl
              __typename
              ... on SearchableItem {
                internalID
                displayType
                slug
              }
              ... on Artist {
                internalID
                statuses {
                  artworks
                  auctionLots
                }
                coverArtwork {
                  image {
                    src: url(version: ["small"])
                  }
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
        variant: fragmentVariables.variant,
      }
    },
    query: graphql`
      query SearchResultsListPaginationQuery(
        $after: String
        $term: String!
        $entities: [SearchEntity]
        $variant: String
      ) {
        viewer {
          ...SearchResultsList_viewer
            @arguments(
              term: $term
              entities: $entities
              after: $after
              variant: $variant
            )
        }
      }
    `,
  },
)
