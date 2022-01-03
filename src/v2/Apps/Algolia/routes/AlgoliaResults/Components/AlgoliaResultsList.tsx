import { Separator } from "@artsy/palette"
import { AlgoliaResultItem } from "./AlgoliaResultItem"
import { StateResultsProvided } from "react-instantsearch-core"
import { AlgoliaHit } from "v2/Apps/Algolia/types"
import { LoadingArea } from "v2/Components/LoadingArea"
import { EmptyMessage } from "./EmptyMessage"
import { createFragmentContainer, graphql } from "react-relay"
import { AlgoliaResultsList_algolia } from "v2/__generated__/AlgoliaResultsList_algolia.graphql"
import { keyBy } from "lodash"
import { Fragment } from "react"

type StateResults = StateResultsProvided<AlgoliaHit>

export interface AlgoliaResultsListProps extends StateResults {
  algolia: AlgoliaResultsList_algolia | null
}

export const AlgoliaResultsList: React.FC<AlgoliaResultsListProps> = props => {
  const { searchResults, isSearchStalled, algolia } = props
  const indiceByKey = keyBy(algolia?.indices ?? [], "name")
  const entityType = indiceByKey[searchResults?.index]?.displayName ?? ""
  const results = searchResults?.hits.map((hit, index) => (
    <Fragment key={hit.objectID}>
      <AlgoliaResultItem
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

export const AlgoliaResultsListFragmentContainer = createFragmentContainer(
  AlgoliaResultsList,
  {
    algolia: graphql`
      fragment AlgoliaResultsList_algolia on Algolia {
        indices {
          displayName
          name
        }
      }
    `,
  }
)
