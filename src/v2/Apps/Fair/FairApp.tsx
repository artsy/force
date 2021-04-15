import React from "react"
import { AppContainer } from "v2/Apps/Components/AppContainer"
import { createFragmentContainer, graphql } from "react-relay"
import { FairApp_fair } from "v2/__generated__/FairApp_fair.graphql"
import { Box, CSSGrid, Text } from "@artsy/palette"
import { HorizontalPadding } from "v2/Apps/Components/HorizontalPadding"
import {
  FairEditorialFragmentContainer,
  FAIR_EDITORIAL_AMOUNT,
} from "./Components/FairEditorial"
import { FairHeaderFragmentContainer } from "./Components/FairHeader"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { FairMetaFragmentContainer } from "./Components/FairMeta"
import { FairCollectionsFragmentContainer } from "./Components/FairCollections"
import { FairFollowedArtistsFragmentContainer } from "./Components/FairFollowedArtists"
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
import { RouterLink } from "v2/Artsy/Router/RouterLink"

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

  const hasArticles = (fair.articlesConnection?.edges?.length ?? 0) > 0
  const hasCollections = (fair.marketingCollections?.length ?? 0) > 0
  const artworkCount = fair.counts.artworks

  const clickedArtworksTabTrackingData: ClickedNavigationTab = {
    action: ActionType.clickedNavigationTab,
    context_module: ContextModule.exhibitorsTab,
    context_page_owner_id: contextPageOwnerId,
    context_page_owner_slug: contextPageOwnerSlug,
    context_page_owner_type: contextPageOwnerType,
    destination_path: `${fair.href}/artworks`,
    subject: "Artworks",
  }

  const clickedExhibitorsTabTrackingData: ClickedNavigationTab = {
    action: ActionType.clickedNavigationTab,
    context_module: ContextModule.artworksTab,
    context_page_owner_id: contextPageOwnerId,
    context_page_owner_slug: contextPageOwnerSlug,
    context_page_owner_type: contextPageOwnerType,
    destination_path: `${fair.href}`,
    subject: "Exhibitors",
  }

  return (
    <>
      <FairMetaFragmentContainer fair={fair} />

      <AppContainer>
        <HorizontalPadding>
          <FairHeaderFragmentContainer fair={fair} />

          {hasArticles && (
            <Box my={3} pt={3} borderTop="1px solid" borderColor="black10">
              <Box display="flex" justifyContent="space-between">
                <Text variant="subtitle" as="h3" mb={2}>
                  Related Reading
                </Text>

                {fair.articlesConnection.totalCount > FAIR_EDITORIAL_AMOUNT && (
                  <RouterLink to={`${fair.href}/articles`} noUnderline>
                    <Text variant="subtitle" color="black60">
                      View all
                    </Text>
                  </RouterLink>
                )}
              </Box>

              <CSSGrid
                gridAutoFlow="row"
                gridColumnGap={3}
                gridRowGap={2}
                gridTemplateColumns={["repeat(1, 1fr)", "repeat(2, 1fr)"]}
              >
                <FairEditorialFragmentContainer fair={fair} />
              </CSSGrid>
            </Box>
          )}

          {hasCollections && (
            <Box my={3} pt={3} borderTop="1px solid" borderColor="black10">
              <Text variant="subtitle" as="h3" mb={2}>
                Curated Highlights
              </Text>

              <FairCollectionsFragmentContainer fair={fair} />
            </Box>
          )}

          {!!user && (
            <FairFollowedArtistsFragmentContainer
              fair={fair}
              my={3}
              pt={3}
              borderTop="1px solid"
              borderColor="black10"
            />
          )}

          <RouteTabs position="relative">
            <RouteTab
              to={fair.href}
              exact
              onClick={() =>
                tracking.trackEvent(clickedExhibitorsTabTrackingData)
              }
            >
              Exhibitors
            </RouteTab>

            <RouteTab
              to={`${fair.href}/artworks`}
              exact
              onClick={() =>
                tracking.trackEvent(clickedArtworksTabTrackingData)
              }
            >
              Artworks
              <Text variant="text" display="inline">
                &nbsp;({artworkCount})
              </Text>
            </RouteTab>
          </RouteTabs>

          {children}
        </HorizontalPadding>
      </AppContainer>
    </>
  )
}

const TrackingWrappedFairApp: React.FC<FairAppProps> = props => {
  const {
    fair: { internalID, profile, slug },
  } = props

  const { contextPageOwnerType } = useAnalyticsContext()

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
        contextPageOwnerSlug: slug,
        contextPageOwnerType,
      }}
    >
      <FairApp {...props} />
    </AnalyticsContext.Provider>
  )
}

// Top-level route needs to be exported for bundle splitting in the router
export const FairAppFragmentContainer = createFragmentContainer(
  TrackingWrappedFairApp,
  {
    fair: graphql`
      fragment FairApp_fair on Fair {
        internalID
        href
        slug
        ...FairMeta_fair
        ...FairHeader_fair
        ...FairEditorial_fair
        ...FairCollections_fair
        ...FairFollowedArtists_fair
        articlesConnection(first: 6, sort: PUBLISHED_AT_DESC) {
          totalCount
          edges {
            __typename
          }
        }
        marketingCollections(size: 5) {
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
  }
)
