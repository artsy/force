import { Column, GridColumns, Join, Spacer, Text } from "@artsy/palette"
import { Collections_marketingCategories$data } from "v2/__generated__/Collections_marketingCategories.graphql"
import { FrameWithRecentlyViewed } from "v2/Components/FrameWithRecentlyViewed"
import { BreadCrumbList } from "v2/Components/Seo"
import * as React from "react"
import { Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"
import { CollectionsCategoryFragmentContainer } from "./Components/CollectionsCategory"
import { RouterLink } from "v2/System/Router/RouterLink"

interface CollectionsAppProps {
  marketingCategories: Collections_marketingCategories$data
}

export const CollectionsApp: React.FC<CollectionsAppProps> = ({
  marketingCategories,
}) => {
  const sorted = [...(marketingCategories ?? [])].sort((a, b) =>
    a.name.localeCompare(b.name)
  )

  return (
    <>
      <Title>Collections | Artsy</Title>
      <Meta property="og:url" content={`${sd.APP_URL}/collections`} />
      <Meta name="description" content={META_DESCRIPTION} />
      <Meta property="og:description" content={META_DESCRIPTION} />
      <Meta property="twitter:description" content={META_DESCRIPTION} />
      <BreadCrumbList items={[{ name: "Collections", path: "/collections" }]} />

      <FrameWithRecentlyViewed>
        <GridColumns my={4} gridRowGap={[2, 0]}>
          <Column span={6}>
            <Text as="h1" variant="xl" mb={2}>
              Collections
            </Text>
          </Column>

          <Column span={6} display="flex" justifyContent="flex-end">
            <Text variant="md">
              <RouterLink to="/collect">View works</RouterLink>
            </Text>
          </Column>
        </GridColumns>

        <Join separator={<Spacer mt={6} />}>
          {sorted.map((category, i) => {
            return (
              <CollectionsCategoryFragmentContainer
                key={category.name + i}
                category={category}
              />
            )
          })}
        </Join>
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
  }
)

const META_DESCRIPTION =
  "Discover collections of art curated by Artsy Specialists. From iconic artist series to trending design, shop " +
  "collections on the world's largest online art marketplace."
