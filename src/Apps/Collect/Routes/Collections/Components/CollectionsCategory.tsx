import { useState } from "react"
import {
  Box,
  Button,
  Column,
  EntityHeader,
  GridColumns,
  Text,
} from "@artsy/palette"
import { crop } from "Utils/resizer"
import { createFragmentContainer, graphql } from "react-relay"
import { CollectionsCategory_category$data } from "__generated__/CollectionsCategory_category.graphql"
import {
  MOBILE_NAV_HEIGHT,
  DESKTOP_NAV_BAR_HEIGHT,
} from "Components/NavBar/constants"
import { slugify } from "underscore.string"

interface CollectionsCategoryProps {
  category: CollectionsCategory_category$data
}

export const CollectionsCategory: React.FC<CollectionsCategoryProps> = ({
  category,
  category: { collections },
}) => {
  const [showAll, toggleShowAll] = useState(false)

  const sortedCollections = [...collections].sort((a, b) =>
    a.title.localeCompare(b.title)
  )

  return (
    <>
      {category.name && (
        <>
          {/* Anchor to scroll-to that's offset by the nav height */}
          <Box
            // TODO: Metaphysics should expose a slug
            id={slugify(category.name)}
            position="relative"
            top={[-MOBILE_NAV_HEIGHT, -DESKTOP_NAV_BAR_HEIGHT]}
          />

          <Text variant="lg-display" mb={2}>
            {category.name}
          </Text>
        </>
      )}

      <GridColumns data-test="collections-category-list">
        {sortedCollections.map((collection, i) => {
          return (
            <Column
              key={collection.internalID}
              span={[12, 6, 3, 3]}
              // Keep these in the markup so that they are crawlable
              display={!showAll && i >= TRUNCATED_AMOUNT ? "none" : "block"}
            >
              <EntityHeader
                initials={collection.title[0]}
                py={2}
                href={`/collection/${collection.slug}`}
                imageUrl={
                  collection.headerImage
                    ? crop(collection.headerImage, { width: 50, height: 50 })!
                    : undefined
                }
                name={collection.title}
              />
            </Column>
          )
        })}
      </GridColumns>

      {!showAll && collections.length > TRUNCATED_AMOUNT && (
        <Box textAlign="center" mt={4}>
          <Button
            size="large"
            variant="secondaryBlack"
            onClick={() => toggleShowAll(true)}
          >
            More in {category.name}
          </Button>
        </Box>
      )}
    </>
  )
}

export const CollectionsCategoryFragmentContainer = createFragmentContainer(
  CollectionsCategory,
  {
    category: graphql`
      fragment CollectionsCategory_category on MarketingCollectionCategory {
        name
        collections {
          internalID
          slug
          title
          headerImage
        }
      }
    `,
  }
)

const TRUNCATED_AMOUNT = 16
