import { Box, Separator, Spacer, Text } from "@artsy/palette"
import { OwnerType, clickedMainArtworkGrid } from "@artsy/cohesion"
import { Match, Router } from "found"
import React from "react"
import { Link, Meta, Title } from "react-head"
import { createFragmentContainer, graphql } from "react-relay"
import { data as sd } from "sharify"

import { SeoProductsForArtworks } from "v2/Apps/Collect/Components/SeoProductsForArtworks"
import { buildUrlForCollectApp } from "v2/Apps/Collect/Utils/urlBuilder"
import { AppContainer } from "v2/Apps/Components/AppContainer"

import { useTracking } from "v2/Artsy/Analytics"
import { AnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"
import { FrameWithRecentlyViewed } from "v2/Components/FrameWithRecentlyViewed"
import { BreadCrumbList } from "v2/Components/Seo"

import { getMetadataForMedium } from "./Components/CollectMediumMetadata"

import { Collect_marketingHubCollections } from "v2/__generated__/Collect_marketingHubCollections.graphql"
import { collectRoutes_ArtworkFilterQueryResponse } from "v2/__generated__/collectRoutes_ArtworkFilterQuery.graphql"
import { CollectionsHubsNavFragmentContainer as CollectionsHubsNav } from "v2/Components/CollectionsHubsNav"
import { ArtworkFilter } from "v2/Components/v2/ArtworkFilter"

export interface CollectAppProps {
  match: Match
  router: Router
  marketingHubCollections: Collect_marketingHubCollections
  viewer: collectRoutes_ArtworkFilterQueryResponse["viewer"]
  filterArtworks: collectRoutes_ArtworkFilterQueryResponse["filterArtworks"]
}

export const CollectApp: React.FC<CollectAppProps> = ({
  filterArtworks,
  marketingHubCollections,
  match: { location, params },
  viewer,
}) => {
  const medium = params && params.medium
  const { description, breadcrumbTitle, title } = getMetadataForMedium(medium)

  const canonicalHref = medium
    ? `${sd.APP_URL}/collect/${medium}`
    : `${sd.APP_URL}/collect`

  const items = [{ path: "/collect", name: "Collect" }]
  if (medium) {
    items.push({
      path: `/collect/${medium}`,
      name: breadcrumbTitle,
    })
  }

  const tracking = useTracking()

  return (
    <AnalyticsContext.Provider
      value={{
        contextPageOwnerType: OwnerType.collect,
      }}
    >
      <AnalyticsContext.Consumer>
        {({ contextPageOwnerType }) => (
          <AppContainer>
            <FrameWithRecentlyViewed>
              <Title>{title}</Title>
              <Meta property="og:url" content={`${sd.APP_URL}/collect`} />
              <Meta
                property="og:image"
                content={`${sd.APP_URL}/images/og_image.jpg`}
              />
              <Meta name="description" content={description} />
              <Meta property="og:description" content={description} />
              <Meta property="twitter:description" content={description} />
              <Link rel="canonical" href={canonicalHref} />

              <BreadCrumbList items={items} />

              {filterArtworks && (
                <SeoProductsForArtworks artworks={filterArtworks} />
              )}

              <Box mt={3}>
                <Text variant="largeTitle">
                  <h1>Collect art and design online</h1>
                </Text>
                <Separator mt={2} mb={[2, 2, 2, 4]} />

                <CollectionsHubsNav
                  marketingHubCollections={marketingHubCollections}
                />

                <Spacer mb={2} mt={[2, 2, 2, 4]} />
              </Box>

              <Box>
                <ArtworkFilter
                  viewer={viewer}
                  filters={location.query as any}
                  sortOptions={[
                    { value: "-decayed_merch", text: "Default" },
                    { value: "-partner_updated_at", text: "Recently updated" },
                    { value: "-published_at", text: "Recently added" },
                    { value: "-year", text: "Artwork year (desc.)" },
                    { value: "year", text: "Artwork year (asc.)" },
                  ]}
                  onArtworkBrickClick={artwork => {
                    tracking.trackEvent(
                      clickedMainArtworkGrid({
                        contextPageOwnerType,
                        destinationPageOwnerId: artwork.internalID,
                        destinationPageOwnerSlug: artwork.slug,
                      })
                    )
                  }}
                  onChange={filters => {
                    const url = buildUrlForCollectApp(filters)

                    if (typeof window !== "undefined") {
                      window.history.replaceState({}, "", url)
                    }

                    /**
                   * FIXME: Ideally we route using our router, but are running into
                   * synchronization issues between router state and URL bar state.
                   *
                   * See below example as an illustration:
                   *
                    const newLocation = router.createLocation(url)

                    router.replace({
                      ...newLocation,
                      state: {
                        scrollTo: "#jump--artworkFilter"
                      },
                    })
                  *
                  */
                  }}
                />
              </Box>
            </FrameWithRecentlyViewed>
          </AppContainer>
        )}
      </AnalyticsContext.Consumer>
    </AnalyticsContext.Provider>
  )
}

export const CollectAppFragmentContainer = createFragmentContainer(CollectApp, {
  marketingHubCollections: graphql`
    fragment Collect_marketingHubCollections on MarketingCollection
      @relay(plural: true) {
      ...CollectionsHubsNav_marketingHubCollections
    }
  `,
})

// Top-level route needs to be exported for bundle splitting in the router
export default CollectAppFragmentContainer
