import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { createFragmentContainer, graphql } from "react-relay"
import { FairApp_fair } from "v2/__generated__/FairApp_fair.graphql"
import { Box, CSSGrid, Separator, Text } from "@artsy/palette"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import { Footer } from "v2/Components/Footer"
import { FairEditorialFragmentContainer as FairEditorial } from "./Components/FairEditorial"
import { FairHeaderFragmentContainer as FairHeader } from "./Components/FairHeader"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { FairMetaFragmentContainer as FairMeta } from "./Components/FairMeta"
import { FairCollectionsFragmentContainer as FairCollections } from "./Components/FairCollections"
import { FairFollowedArtistsFragmentContainer as FairFollowedArtists } from "./Components/FairFollowedArtists"
import { useSystemContext } from "v2/Artsy"
import { useTracking } from "react-tracking"
import {
  AnalyticsContext,
  useAnalyticsContext,
} from "v2/Artsy/Analytics/AnalyticsContext"
import {
  ActionType,
  ClickedNavigationTab,
  ContextModule,
} from "@artsy/cohesion"
import { HttpError } from "found"
import { userIsAdmin } from "v2/Utils/user"

interface FairAppProps {
  fair: FairApp_fair
}

const FairApp: React.FC<FairAppProps> = ({ children, fair }) => {
  const { user } = useSystemContext()
  const tracking = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const hasArticles = (fair.articles?.edges?.length ?? 0) > 0
  const hasCollections = (fair.marketingCollections?.length ?? 0) > 0
  const artworkCount = fair.counts.artworks

  const clickedArtworksTabTrackingData: ClickedNavigationTab = {
    context_module: ContextModule.exhibitorsTab,
    context_page_owner_type: contextPageOwnerType,
    context_page_owner_id: contextPageOwnerId,
    context_page_owner_slug: contextPageOwnerSlug,
    destination_path: `fair/${fair.slug}/artworks`,
    subject: "Artworks",
    action: ActionType.clickedNavigationTab,
  }

  const clickedExhibitorsTabTrackingData: ClickedNavigationTab = {
    context_module: ContextModule.artworksTab,
    context_page_owner_type: contextPageOwnerType,
    context_page_owner_id: contextPageOwnerId,
    context_page_owner_slug: contextPageOwnerSlug,
    destination_path: `fair/${fair.slug}`,
    subject: "Exhibitors",
    action: ActionType.clickedNavigationTab,
  }

  return (
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
  )
}

const TrackingWrappedFairApp: React.FC<FairAppProps> = props => {
  const {
    fair: { internalID, profile },
  } = props

  const { contextPageOwnerSlug, contextPageOwnerType } = useAnalyticsContext()

  // If a fair's profile is inaccessible, that means it's private, which in turn means
  // the fair is only visible to admins.
  const { user } = useSystemContext()
  if (!profile && !userIsAdmin(user)) {
    throw new HttpError(404)
  }

  return (
    <AnalyticsContext.Provider
      value={{
        contextPageOwnerId: internalID,
        contextPageOwnerSlug,
        contextPageOwnerType,
      }}
    >
      <FairApp {...props} />
    </AnalyticsContext.Provider>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export default createFragmentContainer(TrackingWrappedFairApp, {
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
      profile {
        __typename
      }
    }
  `,
})
