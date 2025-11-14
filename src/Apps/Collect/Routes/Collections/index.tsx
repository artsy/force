import { FrameWithRecentlyViewed } from "Components/FrameWithRecentlyViewed"
import { MetaTags } from "Components/MetaTags"
import { RouterLink } from "System/Components/RouterLink"
import { Box, Column, GridColumns, Join, Spacer, Text } from "@artsy/palette"
import type { Collections_marketingCategories$data } from "__generated__/Collections_marketingCategories.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { CollectionsCategoryFragmentContainer } from "./Components/CollectionsCategory"

interface CollectionsAppProps {
  marketingCategories: Collections_marketingCategories$data
}

export const CollectionsApp: React.FC<
  React.PropsWithChildren<CollectionsAppProps>
> = ({ marketingCategories }) => {
  const sorted = [...(marketingCategories ?? [])].sort((a, b) =>
    a.name.localeCompare(b.name),
  )

  return (
    <>
      <MetaTags
        title="Collections | Artsy"
        description={META_DESCRIPTION}
        pathname="collections"
      />

      <FrameWithRecentlyViewed>
        <GridColumns my={4} gridRowGap={[2, 0]}>
          <Column span={6}>
            <Text as="h1" variant="xl" mb={2}>
              Collections
            </Text>
          </Column>

          <Column span={6} display="flex" justifyContent="flex-end">
            <Text variant="sm-display">
              <RouterLink to="/collect">View works</RouterLink>
            </Text>
          </Column>
        </GridColumns>

        <Box data-test="collections-list">
          <Join separator={<Spacer y={6} />}>
            {sorted.map((category, i) => {
              return (
                <CollectionsCategoryFragmentContainer
                  key={category.name + i}
                  category={category}
                />
              )
            })}
          </Join>
        </Box>
      </FrameWithRecentlyViewed>
    </>
  )
}

export const CollectionsAppFragmentContainer = createFragmentContainer(
  CollectionsApp,
  {
    marketingCategories: graphql`
      fragment Collections_marketingCategories on MarketingCollectionCategory
      @relay(plural: true) {
        name
        ...CollectionsCategory_category
      }
    `,
  },
)

const META_DESCRIPTION =
  "Discover collections of art curated by Artsy Specialists. From iconic artist series to trending design, shop " +
  "collections on the world’s largest online art marketplace."
