import { Box, Separator, Spacer, Text, Flex } from "@artsy/palette"
import { Match, Router } from "found"
import * as React from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { getENV } from "v2/Utils/getENV"

import { SeoProductsForArtworks } from "v2/Apps/Collect/Components/SeoProductsForArtworks"
import { buildUrlForCollectApp } from "v2/Apps/Collect/Utils/urlBuilder"

import { FrameWithRecentlyViewed } from "v2/Components/FrameWithRecentlyViewed"
import { BreadCrumbList } from "v2/Components/Seo"

import { getMetadata, Medium, Color } from "./Utils/getMetadata"

import { Collect_marketingCollections } from "v2/__generated__/Collect_marketingCollections.graphql"
import { collectRoutes_ArtworkFilterQueryResponse } from "v2/__generated__/collectRoutes_ArtworkFilterQuery.graphql"
import { CollectionsHubsNavFragmentContainer as CollectionsHubsNav } from "v2/Components/CollectionsHubsNav"
import { ArtworkFilter } from "v2/Components/ArtworkFilter"
import { RouterLink } from "v2/System/Router/RouterLink"
import {
  Counts,
  SharedArtworkFilterContextProps,
} from "v2/Components/ArtworkFilter/ArtworkFilterContext"

export interface CollectAppProps {
  match: Match
  router: Router
  marketingCollections: Collect_marketingCollections
  viewer: collectRoutes_ArtworkFilterQueryResponse["viewer"]
  filterArtworks: collectRoutes_ArtworkFilterQueryResponse["filterArtworks"]
}

export const CollectApp: React.FC<CollectAppProps> = ({
  filterArtworks,
  marketingCollections,
  match: { location, params },
  viewer,
}) => {
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
            <Text variant={["lg", "xl"]}>
              <h1>Collect art and design online</h1>
            </Text>
            <Spacer my={1} />
            <Text variant="md">
              <RouterLink to="/collections">Browse by collection</RouterLink>
            </Text>
          </Flex>

          <Separator my={4} />

          <CollectionsHubsNav marketingCollections={marketingCollections} />

          <Spacer my={6} />
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
              { text: "Default", value: "-decayed_merch" },
              { text: "Recently updated", value: "-partner_updated_at" },
              { text: "Recently added", value: "-published_at" },
              { text: "Artwork year (desc.)", value: "-year" },
              { text: "Artwork year (asc.)", value: "year" },
            ]}
            getUrlForFilterParams={buildUrlForCollectApp}
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
