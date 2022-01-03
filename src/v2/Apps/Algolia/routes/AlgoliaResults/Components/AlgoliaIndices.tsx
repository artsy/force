import { createFragmentContainer, graphql } from "react-relay"
import { AlgoliaIndices_algolia } from "v2/__generated__/AlgoliaIndices_algolia.graphql"
import { Box, Pill, Swiper } from "@artsy/palette"

interface AlgoliaIndicesProps {
  algolia: AlgoliaIndices_algolia | null
  selectedIndiceName: string
  onClick: (index: number) => void
}

export const AlgoliaIndices: React.FC<AlgoliaIndicesProps> = ({
  algolia,
  selectedIndiceName,
  onClick,
}) => {
  return (
    <Box mx={-0.5}>
      <Swiper>
        {algolia?.indices.map((indice, index) => {
          const isSelected = selectedIndiceName === indice.name

          return (
            <Pill
              variant="filter"
              onClick={() => onClick(index)}
              key={indice.key}
              mx={0.5}
              my={2}
              focus={isSelected}
              hover={isSelected}
            >
              {indice.displayName}
            </Pill>
          )
        })}
      </Swiper>
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
