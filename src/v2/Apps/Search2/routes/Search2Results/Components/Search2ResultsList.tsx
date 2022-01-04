import { Separator } from "@artsy/palette"
import { Search2ResultItem } from "./Search2ResultItem"
import { StateResultsProvided } from "react-instantsearch-core"
import { Search2Hit } from "v2/Apps/Search2/types"
import { LoadingArea } from "v2/Components/LoadingArea"
import { EmptyMessage } from "./EmptyMessage"
import { createFragmentContainer, graphql } from "react-relay"
import { Search2ResultsList_algolia } from "v2/__generated__/Search2ResultsList_algolia.graphql"
import { keyBy } from "lodash"
import { Fragment } from "react"

type StateResults = StateResultsProvided<Search2Hit>

export interface Search2ResultsListProps extends StateResults {
  algolia: Search2ResultsList_algolia | null
}

export const Search2ResultsList: React.FC<Search2ResultsListProps> = props => {
  const { searchResults, isSearchStalled, algolia } = props
  const indiceByKey = keyBy(algolia?.indices ?? [], "name")
  const entityType = indiceByKey[searchResults?.index]?.displayName ?? ""
  const results = searchResults?.hits.map((hit, index) => (
    <Fragment key={hit.objectID}>
      <Search2ResultItem
        hit={hit}
        entityType={entityType}
        position={searchResults.page * searchResults.hitsPerPage + index}
      />
      {index < searchResults.hits.length - 1 && <Separator />}
    </Fragment>
  ))

  return (
    <LoadingArea isLoading={isSearchStalled}>
      {searchResults?.nbHits === 0 ? (
        <EmptyMessage query={searchResults?.query} entityType={entityType} />
      ) : (
        results
      )}
    </LoadingArea>
  )
}

export const Search2ResultsListFragmentContainer = createFragmentContainer(
  Search2ResultsList,
  {
    algolia: graphql`
      fragment Search2ResultsList_algolia on Algolia {
        indices {
          displayName
          name
        }
      }
    `,
  }
)
