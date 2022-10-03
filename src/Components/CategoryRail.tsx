import { FC, Fragment } from "react"
import {
  Box,
  EntityHeader,
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
import { ShelfArtworkFragmentContainer } from "./Artwork/ShelfArtwork"
import { FollowGeneButtonFragmentContainer } from "./FollowButton/FollowGeneButton"

interface CategoryRailProps {
  category: CategoryRail_category$data
}

const CategoryRail: FC<CategoryRailProps> = ({ category }) => {
  if (!category || !category.name) return null

  const artworks = extractNodes(category.filterArtworksConnection)

  return (
    <>
      <EntityHeader
        name={category.name}
        initials={category.name[0]}
        href={category.href!}
        image={{
          src: category.avatar?.cropped?.src,
          srcSet: category.avatar?.cropped?.srcSet,
        }}
        FollowButton={
          // @ts-ignore RELAY UPGRADE 13
          <FollowGeneButtonFragmentContainer gene={category} size="small">
            Follow
          </FollowGeneButtonFragmentContainer>
        }
        mb={2}
      />

      {artworks.length > 0 ? (
        <Shelf>
          {artworks.map(artwork => {
            return (
              <ShelfArtworkFragmentContainer
                key={artwork.internalID}
                contextModule={{} as any} // TODO:
                // @ts-ignore RELAY UPGRADE 13
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
        return (
          <Fragment key={i}>
            <SkeletonBox
              width={200}
              height={[
                [100, 150, 200, 250][i % 4],
                [100, 320, 200, 250][i % 4],
              ]}
              mb={1}
            />

            <SkeletonText variant="sm-display">Category Name</SkeletonText>
            <SkeletonText variant="sm-display">Artwork Title</SkeletonText>
            <SkeletonText variant="xs">Partner</SkeletonText>
            <SkeletonText variant="xs">US$0,000</SkeletonText>
          </Fragment>
        )
      })}
    </Shelf>
  </Skeleton>
)

export const CategoryRailFragmentContainer = createFragmentContainer(
  CategoryRail,
  {
    category: graphql`
      fragment CategoryRail_category on Gene {
        name
        href
        avatar: image {
          cropped(width: 45, height: 45) {
            src
            srcSet
          }
        }
        ...FollowGeneButton_gene
        filterArtworksConnection(first: 10) {
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

        // @ts-ignore RELAY UPGRADE 13
        return <CategoryRailFragmentContainer category={props.category} />
      }}
    />
  )
}
