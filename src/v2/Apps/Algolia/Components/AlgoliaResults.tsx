import { Separator } from "@artsy/palette"
import { AlgoliaResultItem } from "./AlgoliaResultItem"
import { StateResultsProvided } from "react-instantsearch-core"
import { AlgoliaHit } from "../types"
import { LoadingArea } from "v2/Components/LoadingArea"
import { EmptyMessage } from "./EmptyMessage"
import { createFragmentContainer, graphql } from "react-relay"
import { AlgoliaResults_algolia } from "v2/__generated__/AlgoliaResults_algolia.graphql"
import { keyBy } from "lodash"

type StateResults = StateResultsProvided<AlgoliaHit>

export interface AlgoliaResultItemProps extends StateResults {
  algolia: AlgoliaResults_algolia | null
}

export const AlgoliaResults: React.FC<AlgoliaResultItemProps> = props => {
  const { searchResults, isSearchStalled, algolia } = props
  const indiceByKey = keyBy(algolia?.indices ?? [], "name")
  const entityType = indiceByKey[searchResults?.index]?.displayName ?? ""
  const results = searchResults?.hits.map((hit, index) => (
    <>
      <AlgoliaResultItem
        key={hit.objectID}
        hit={hit}
        entityType={entityType}
        position={searchResults.page * searchResults.hitsPerPage + index}
      />
      {index < searchResults.hits.length - 1 && <Separator />}
    </>
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

export const AlgoliaResultsFragmentContainer = createFragmentContainer(
  AlgoliaResults,
  {
    algolia: graphql`
      fragment AlgoliaResults_algolia on Algolia {
        indices {
          displayName
          name
        }
      }
    `,
  }
)
