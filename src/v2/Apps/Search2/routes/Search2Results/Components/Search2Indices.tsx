import { createFragmentContainer, graphql } from "react-relay"
import { Search2Indices_algolia } from "v2/__generated__/Search2Indices_algolia.graphql"
import { Box, Pill, Swiper } from "@artsy/palette"

interface Search2IndicesProps {
  algolia: Search2Indices_algolia | null
  selectedIndiceName: string
  onClick: (index: number) => void
}

export const Search2Indices: React.FC<Search2IndicesProps> = ({
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

export const Search2IndicesFragmentContainer = createFragmentContainer(
  Search2Indices,
  {
    algolia: graphql`
      fragment Search2Indices_algolia on Algolia {
        indices {
          displayName
          key
          name
        }
      }
    `,
  }
)
