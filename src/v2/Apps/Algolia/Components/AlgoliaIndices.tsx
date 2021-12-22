import { createFragmentContainer, graphql } from "react-relay"
import { AlgoliaIndices_algolia } from "v2/__generated__/AlgoliaIndices_algolia.graphql"
import { Box, Pill } from "@artsy/palette"

interface AlgoliaIndicesProps {
  algolia: AlgoliaIndices_algolia | null
  onClick: (index: number) => void
}

export const AlgoliaIndices: React.FC<AlgoliaIndicesProps> = ({
  algolia,
  onClick,
}) => {
  return (
    <Box py={2} mx={-0.5}>
      {algolia?.indices.map((indice, index) => {
        return (
          <Pill
            variant="filter"
            onClick={() => onClick(index)}
            key={indice.key}
            mx={0.5}
          >
            {indice.displayName}
          </Pill>
        )
      })}
    </Box>
  )
}

export const AlgoliaIndicesFragmentContainer = createFragmentContainer(
  AlgoliaIndices,
  {
    algolia: graphql`
      fragment AlgoliaIndices_algolia on Algolia {
        indices {
          displayName
          key
          name
        }
      }
    `,
  }
)
