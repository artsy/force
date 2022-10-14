import { FC } from "react"
import {
  Box,
  Flex,
  Shelf,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import { graphql, createFragmentContainer } from "react-relay"
import { SystemQueryRenderer } from "System/Relay/SystemQueryRenderer"
import { extractNodes } from "Utils/extractNodes"
import { CategoryRailQuery } from "__generated__/CategoryRailQuery.graphql"
import { CategoryRail_category$data } from "__generated__/CategoryRail_category.graphql"
import {
  ShelfArtworkFragmentContainer,
  ShelfArtworkPlaceholder,
} from "./Artwork/ShelfArtwork"
import { EntityHeaderGeneFragmentContainer } from "./EntityHeaders/EntityHeaderGene"

interface CategoryRailProps {
  category: CategoryRail_category$data
}

const CategoryRail: FC<CategoryRailProps> = ({ category }) => {
  if (!category || !category.name) return null

  const artworks = extractNodes(category.filterArtworks)

  return (
    <>
      <EntityHeaderGeneFragmentContainer gene={category} />
      {artworks.length > 0 ? (
        <Shelf>
          {artworks.map(artwork => {
            return (
              <ShelfArtworkFragmentContainer
                key={artwork.internalID}
                contextModule={{} as any} // TODO:
                artwork={artwork}
                lazyLoad
              />
            )
          })}
        </Shelf>
      ) : (
        <Text variant="lg-display" color="black60" textAlign="center">
          No works available in the category at this time.
        </Text>
      )}
    </>
  )
}

export const CATEGORY_RAIL_PLACEHOLDER = (
  <Skeleton>
    <Flex alignItems="center" mb={2}>
      <SkeletonBox width={45} height={45} borderRadius="50%" mr={1} />

      <Box>
        <SkeletonText variant="sm-display">Category Name</SkeletonText>
      </Box>
    </Flex>

    <Shelf>
      {[...new Array(10)].map((_, i) => {
        return <ShelfArtworkPlaceholder key={i} index={i} />
      })}
    </Shelf>
  </Skeleton>
)

export const CategoryRailFragmentContainer = createFragmentContainer(
  CategoryRail,
  {
    category: graphql`
      fragment CategoryRail_category on Gene {
        ...EntityHeaderGene_gene
        name
        href
        filterArtworks: filterArtworksConnection(first: 10) {
          edges {
            node {
              internalID
              ...ShelfArtwork_artwork
            }
          }
        }
      }
    `,
  }
)

interface CategoryRailQueryRendererProps {
  id: string
}

export const CategoryRailQueryRenderer: FC<CategoryRailQueryRendererProps> = ({
  id,
}) => {
  return (
    <SystemQueryRenderer<CategoryRailQuery>
      placeholder={CATEGORY_RAIL_PLACEHOLDER}
      variables={{ id }}
      query={graphql`
        query CategoryRailQuery($id: String!) {
          category: gene(id: $id) {
            ...CategoryRail_category
          }
        }
      `}
      render={({ props, error }) => {
        if (error) {
          console.error(error)
          return null
        }

        if (!props?.category) {
          return CATEGORY_RAIL_PLACEHOLDER
        }

        return <CategoryRailFragmentContainer category={props.category} />
      }}
    />
  )
}
