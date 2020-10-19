import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { createFragmentContainer, graphql } from "react-relay"
import { FairApp_fair } from "v2/__generated__/FairApp_fair.graphql"
import { Box, CSSGrid, Separator, Text } from "@artsy/palette"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { Footer } from "v2/Components/Footer"
import { ErrorPage } from "v2/Components/ErrorPage"
import { FairEditorialFragmentContainer as FairEditorial } from "./Components/FairEditorial"
import { FairHeaderFragmentContainer as FairHeader } from "./Components/FairHeader"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { FairMetaFragmentContainer as FairMeta } from "./Components/FairMeta"
import { FairCollectionsFragmentContainer as FairCollections } from "./Components/FairCollections"
import { FairFollowedArtistsFragmentContainer as FairFollowedArtists } from "./Components/FairFollowedArtists"
import { useSystemContext } from "v2/Artsy"
import { useTracking } from "react-tracking"
import { AnalyticsContext } from "v2/Artsy/Analytics/AnalyticsContext"
import {
  ActionType,
  ClickedNavigationTab,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"

interface FairAppProps {
  fair: FairApp_fair
}

const FairApp: React.FC<FairAppProps> = ({ children, fair }) => {
  const { user } = useSystemContext()
  const tracking = useTracking()

  if (!fair) return <ErrorPage code={404} />

  const hasArticles = (fair.articles?.edges?.length ?? 0) > 0
  const hasCollections = (fair.marketingCollections?.length ?? 0) > 0
  const artworkCount = fair.counts.artworks

  const clickedArtworksTabTrackingData: ClickedNavigationTab = {
    context_module: ContextModule.exhibitorsTab,
    context_page_owner_type: OwnerType.fair,
    context_page_owner_id: fair.internalID,
    context_page_owner_slug: fair.slug,
    destination_path: `fair/${fair.slug}/artworks`,
    subject: "Artworks",
    action: ActionType.clickedNavigationTab,
  }

  const clickedExhibitorsTabTrackingData: ClickedNavigationTab = {
    context_module: ContextModule.artworksTab,
    context_page_owner_type: OwnerType.fair,
    context_page_owner_id: fair.internalID,
    context_page_owner_slug: fair.slug,
    destination_path: `fair/${fair.slug}`,
    subject: "Exhibitors",
    action: ActionType.clickedNavigationTab,
  }

  return (
    <AnalyticsContext.Provider
      value={{
        contextPageOwnerType: OwnerType.fair,
        contextPageOwnerId: fair.internalID,
        contextPageOwnerSlug: fair.slug,
      }}
    >
      <>
        <FairMeta fair={fair} />

        <AppContainer>
          <HorizontalPadding>
            <FairHeader mt={[0, 2]} fair={fair} />

            {hasArticles && (
              <Box my={3} pt={3} borderTop="1px solid" borderColor="black10">
                <Text variant="subtitle" as="h3" mb={2}>
                  Related Reading
                </Text>

                <CSSGrid
                  gridAutoFlow="row"
                  gridColumnGap={3}
                  gridRowGap={2}
                  gridTemplateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
                >
                  <FairEditorial fair={fair} />
                </CSSGrid>
              </Box>
            )}

            {hasCollections && (
              <Box my={3} pt={3} borderTop="1px solid" borderColor="black10">
                <Text variant="subtitle" as="h3" mb={2}>
                  Curated Highlights
                </Text>

                <FairCollections fair={fair} />
              </Box>
            )}

            {!!user && (
              <FairFollowedArtists
                fair={fair}
                my={3}
                pt={3}
                borderTop="1px solid"
                borderColor="black10"
              />
            )}

            <RouteTabs>
              <RouteTab
                to={`/fair/${fair.slug}`}
                exact
                onClick={() =>
                  tracking.trackEvent(clickedExhibitorsTabTrackingData)
                }
              >
                Exhibitors
              </RouteTab>

              <RouteTab
                to={`/fair/${fair.slug}/artworks`}
                exact
                onClick={() =>
                  tracking.trackEvent(clickedArtworksTabTrackingData)
                }
              >
                Artworks ({artworkCount})
              </RouteTab>
            </RouteTabs>

            {children}

            <Separator as="hr" my={3} />

            <Footer />
          </HorizontalPadding>
        </AppContainer>
      </>
    </AnalyticsContext.Provider>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export default createFragmentContainer(FairApp, {
  fair: graphql`
    fragment FairApp_fair on Fair {
      internalID
      slug
      ...FairMeta_fair
      ...FairHeader_fair
      ...FairEditorial_fair
      ...FairCollections_fair
      ...FairFollowedArtists_fair
      articles: articlesConnection(first: 5, sort: PUBLISHED_AT_DESC) {
        edges {
          __typename
        }
      }
      marketingCollections(size: 4) {
        __typename
      }
      counts {
        artworks
      }
    }
  `,
})
