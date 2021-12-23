import { Box, Separator } from "@artsy/palette"
import { AlgoliaResultItem } from "./AlgoliaResultItem"
import { StateResultsProvided } from "react-instantsearch-core"

export interface AlgoliaResultItemBaseProps {
  entityType: string
}

export interface AlgoliaResultItemProps
  extends StateResultsProvided,
    AlgoliaResultItemBaseProps {}

export const AlgoliaResults: React.FC<AlgoliaResultItemProps> = props => {
  const { searchResults, entityType } = props

  return (
    <Box>
      {searchResults?.hits.map((hit, index) => (
        <>
          <AlgoliaResultItem
            key={hit.objectID}
            hit={hit}
            entityType={entityType}
          />
          {index < searchResults.hits.length - 1 && <Separator />}
        </>
      ))}
    </Box>
  )
}
