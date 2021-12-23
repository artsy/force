import { Separator } from "@artsy/palette"
import { AlgoliaResultItem } from "./AlgoliaResultItem"
import { StateResultsProvided } from "react-instantsearch-core"
import { AlgoliaHit } from "../types"
import { LoadingArea } from "v2/Components/LoadingArea"

export interface AlgoliaResultItemBaseProps {
  entityType: string
}

export interface AlgoliaResultItemProps
  extends StateResultsProvided<AlgoliaHit>,
    AlgoliaResultItemBaseProps {}

export const AlgoliaResults: React.FC<AlgoliaResultItemProps> = props => {
  const { searchResults, entityType, isSearchStalled } = props

  return (
    <LoadingArea isLoading={isSearchStalled}>
      {searchResults?.hits.map((hit, index) => (
        <>
          <AlgoliaResultItem
            key={hit.objectID}
            hit={hit}
            entityType={entityType}
            position={searchResults.page * searchResults.hitsPerPage + index}
          />
          {index < searchResults.hits.length - 1 && <Separator />}
        </>
      ))}
    </LoadingArea>
  )
}
