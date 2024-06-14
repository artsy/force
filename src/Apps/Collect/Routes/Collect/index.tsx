import { Box, Separator, Spacer, Text, Flex } from "@artsy/palette"
import { Match, Router } from "found"
import * as React from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { getENV } from "Utils/getENV"
import { SeoProductsForArtworks } from "Apps/Collect/Components/SeoProductsForArtworks"
import { buildUrlForCollectApp } from "Apps/Collect/Utils/urlBuilder"
import { FrameWithRecentlyViewed } from "Components/FrameWithRecentlyViewed"
import { BreadCrumbList } from "Components/Seo/BreadCrumbList"
import { getMetadata, Medium, Color } from "./Utils/getMetadata"
import { Collect_marketingCollections$data } from "__generated__/Collect_marketingCollections.graphql"
import { collectRoutes_ArtworkFilterQuery$data } from "__generated__/collectRoutes_ArtworkFilterQuery.graphql"
import { CollectionsHubsNavFragmentContainer as CollectionsHubsNav } from "Components/CollectionsHubsNav"
import { ArtworkFilter } from "Components/ArtworkFilter"
import { RouterLink } from "System/Components/RouterLink"
import {
  Counts,
  SharedArtworkFilterContextProps,
} from "Components/ArtworkFilter/ArtworkFilterContext"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useRouter } from "System/Hooks/useRouter"

export interface CollectAppProps {
  match: Match
  router: Router
  marketingCollections: Collect_marketingCollections$data
  viewer: collectRoutes_ArtworkFilterQuery$data["viewer"]
  filterArtworks: collectRoutes_ArtworkFilterQuery$data["filterArtworks"]
}

export const CollectApp: React.FC<CollectAppProps> = ({
  filterArtworks,
  marketingCollections,
  match: { location, params },
  viewer,
}) => {
  const { silentReplace } = useRouter()
  const { userPreferences } = useSystemContext()
  const medium = params?.medium as Medium
  const color = params?.color as Color
  const { description, breadcrumbTitle, title } = getMetadata({
    medium,
    color,
  })

  let canonicalHref

  if (medium) {
    canonicalHref = `${getENV("APP_URL")}/collect/${medium}`
  } else if (color) {
    canonicalHref = `${getENV("APP_URL")}/collect/color/${color}`
  } else {
    canonicalHref = `${getENV("APP_URL")}/collect`
  }

  const items = [{ name: "Collect", path: "/collect" }]
  if (medium) {
    items.push({
      name: breadcrumbTitle,
      path: `/collect/${medium}`,
    })
  }

  return (
    <>
      <FrameWithRecentlyViewed>
        <Title>{title}</Title>
        <Meta property="og:url" content={`${getENV("APP_URL")}/collect`} />
        <Meta
          property="og:image"
          content={`${getENV("APP_URL")}/images/og_image.jpg`}
        />
        <Meta name="description" content={description} />
        <Meta property="og:description" content={description} />
        <Meta property="twitter:description" content={description} />
        <Link rel="canonical" href={canonicalHref} />

        <BreadCrumbList items={items} />

        {filterArtworks && <SeoProductsForArtworks artworks={filterArtworks} />}

        <Box mt={4}>
          <Flex
            justifyContent="space-between"
            alignItems={["left", "center"]}
            flexDirection={["column", "row"]}
          >
            <Text variant={["lg-display", "xl"]}>
              <h1>Collect art and design online</h1>
            </Text>
            <Spacer y={1} />
            <Text variant="sm-display">
              <RouterLink to="/collections">Browse by collection</RouterLink>
            </Text>
          </Flex>

          <Separator my={4} />

          <CollectionsHubsNav marketingCollections={marketingCollections} />

          <Spacer y={6} />
        </Box>

        <Box>
          <ArtworkFilter
            viewer={viewer}
            aggregations={
              viewer?.artworksConnection
                ?.aggregations as SharedArtworkFilterContextProps["aggregations"]
            }
            counts={viewer?.artworksConnection?.counts as Counts}
            filters={location.query as any}
            sortOptions={[
              { text: "Recommended", value: "-decayed_merch" },
              { text: "Recently Updated", value: "-partner_updated_at" },
              { text: "Recently Added", value: "-published_at" },
              { text: "Artwork Year (Descending)", value: "-year" },
              { text: "Artwork Year (Ascending)", value: "year" },
            ]}
            onChange={filters => {
              const url = buildUrlForCollectApp(filters)

              silentReplace(url)
            }}
            userPreferredMetric={userPreferences?.metric}
          />
        </Box>
      </FrameWithRecentlyViewed>
    </>
  )
}

export const CollectAppFragmentContainer = createFragmentContainer(CollectApp, {
  marketingCollections: graphql`
    fragment Collect_marketingCollections on MarketingCollection
      @relay(plural: true) {
      ...CollectionsHubsNav_marketingCollections
    }
  `,
})
