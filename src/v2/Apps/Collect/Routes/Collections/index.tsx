import { Box, Button, Flex, Text } from "@artsy/palette"
import { Collections_marketingCategories } from "v2/__generated__/Collections_marketingCategories.graphql"
import { withSystemContext } from "v2/Artsy"
import { FrameWithRecentlyViewed } from "v2/Components/FrameWithRecentlyViewed"
import { BreadCrumbList } from "v2/Components/Seo"
import { Router } from "found"
import React, { Component, useState } from "react"
import { Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { TrackingProp } from "react-tracking"
import { data as sd } from "sharify"
import { CollectionEntity, CollectionsGrid } from "./Components/CollectionsGrid"
import { RouterLink } from "v2/Artsy/Router/RouterLink"

interface CollectionsAppProps {
  marketingCategories: Collections_marketingCategories
  router: Router
  tracking: TrackingProp
}

const META_DESCRIPTION =
  "Discover collections of art curated by Artsy Specialists. From iconic artist series to trending design, shop " +
  "collections on the world's largest online art marketplace."

const isServer = typeof window === "undefined"

export class CollectionsApp extends Component<CollectionsAppProps> {
  render() {
    const { marketingCategories, router } = this.props

    return (
      <>
        <Title>Collections | Artsy</Title>
        <Meta property="og:url" content={`${sd.APP_URL}/collections`} />
        <Meta name="description" content={META_DESCRIPTION} />
        <Meta property="og:description" content={META_DESCRIPTION} />
        <Meta property="twitter:description" content={META_DESCRIPTION} />
        <BreadCrumbList
          items={[{ name: "Collections", path: "/collections" }]}
        />

        <>
          <FrameWithRecentlyViewed>
            <Flex
              mt={3}
              mb={4}
              justifyContent="space-between"
              alignItems={["left", "center"]}
              flexDirection={["column", "row"]}
            >
              <Text variant="largeTitle" as="h1">
                Collections
              </Text>

              <Box>
                <Text variant="mediumText">
                  <RouterLink to="/collect">View works</RouterLink>
                </Text>
              </Box>
            </Flex>
            {marketingCategories &&
              [...marketingCategories] // creates a new array since the sort function modifies the array.
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((category, index) => {
                  return (
                    <Box key={category.name + index}>
                      <CategoryItem category={category} router={router} />
                    </Box>
                  )
                })}
          </FrameWithRecentlyViewed>
        </>
      </>
    )
  }
}

const CategoryItem = props => {
  const [showAll, toggleShowAll] = useState(false)
  const { category, router } = props
  const { collections } = category
  const truncatedCollections = collections.slice(0, 21)
  const displayableCollections = (showAll || isServer
    ? collections
    : truncatedCollections) as CollectionEntity[]

  return (
    <>
      <CollectionsGrid
        name={category.name}
        collections={displayableCollections}
        router={router}
      />
      {!(isServer || showAll) && (
        <Box mb={6} width="100%" style={{ textAlign: "center" }}>
          <Button
            size="medium"
            variant="secondaryOutline"
            onClick={() => toggleShowAll(true)}
          >
            More in {category.name}
          </Button>
        </Box>
      )}
    </>
  )
}

export const CollectionsAppFragmentContainer = createFragmentContainer(
  withSystemContext(CollectionsApp),
  {
    marketingCategories: graphql`
      fragment Collections_marketingCategories on MarketingCollectionCategory
        @relay(plural: true) {
        name
        collections {
          slug
          headerImage
          title
        }
      }
    `,
  }
)
