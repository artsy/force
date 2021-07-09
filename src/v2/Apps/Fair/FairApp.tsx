import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairApp_fair } from "v2/__generated__/FairApp_fair.graphql"
import { Box, Spacer, Text } from "@artsy/palette"
import {
  FairEditorialFragmentContainer,
  FAIR_EDITORIAL_AMOUNT,
} from "./Components/FairEditorial"
import { FairHeaderFragmentContainer } from "./Components/FairHeader"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { FairMetaFragmentContainer } from "./Components/FairMeta"
import { FairCollectionsFragmentContainer } from "./Components/FairCollections"
import { FairFollowedArtistsFragmentContainer } from "./Components/FairFollowedArtists"
import { useSystemContext } from "v2/System"
import { useTracking } from "react-tracking"
import {
  AnalyticsContext,
  useAnalyticsContext,
} from "v2/System/Analytics/AnalyticsContext"
import {
  ActionType,
  ClickedNavigationTab,
  ContextModule,
} from "@artsy/cohesion"
import { HttpError } from "found"
import { userIsAdmin } from "v2/Utils/user"
import { RouterLink } from "v2/System/Router/RouterLink"

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
  // @ts-expect-error STRICT_NULL_CHECK
  const artworkCount = fair.counts.artworks

  const clickedArtworksTabTrackingData: ClickedNavigationTab = {
    action: ActionType.clickedNavigationTab,
    context_module: ContextModule.exhibitorsTab,
    context_page_owner_id: contextPageOwnerId,
    context_page_owner_slug: contextPageOwnerSlug,
    // @ts-expect-error STRICT_NULL_CHECK
    context_page_owner_type: contextPageOwnerType,
    destination_path: `${fair.href}/artworks`,
    subject: "Artworks",
  }

  const clickedExhibitorsTabTrackingData: ClickedNavigationTab = {
    action: ActionType.clickedNavigationTab,
    context_module: ContextModule.artworksTab,
    context_page_owner_id: contextPageOwnerId,
    context_page_owner_slug: contextPageOwnerSlug,
    // @ts-expect-error STRICT_NULL_CHECK
    context_page_owner_type: contextPageOwnerType,
    destination_path: `${fair.href}`,
    subject: "Exhibitors",
  }

  return (
    <>
      <FairMetaFragmentContainer fair={fair} />

      <FairHeaderFragmentContainer fair={fair} />

      {hasArticles && (
        <Box my={4} pt={4} borderTop="1px solid" borderColor="black10">
          <Box display="flex" justifyContent="space-between">
            {/* @ts-expect-error STRICT_NULL_CHECK */}
            {fair.articlesConnection.totalCount > FAIR_EDITORIAL_AMOUNT && (
              <RouterLink to={`${fair.href}/articles`} noUnderline>
                <Text variant="sm">View all</Text>
              </RouterLink>
            )}
          </Box>

          <FairEditorialFragmentContainer fair={fair} />
        </Box>
      )}

      {hasCollections && (
        <Box my={4} pt={4} borderTop="1px solid" borderColor="black10">
          <Text variant="lg" as="h3" mb={2}>
            Curated Highlights
          </Text>

          <FairCollectionsFragmentContainer fair={fair} />
        </Box>
      )}

      {!!user && (
        <FairFollowedArtistsFragmentContainer
          fair={fair}
          my={2}
          pt={2}
          borderTop="1px solid"
          borderColor="black10"
        />
      )}

      <Spacer my={[4, 80]} />

      <RouteTabs mb={2} fill>
        <RouteTab
          to={fair.href}
          exact
          onClick={() => tracking.trackEvent(clickedExhibitorsTabTrackingData)}
        >
          Exhibitors
        </RouteTab>

        <RouteTab
          to={`${fair.href}/artworks`}
          exact
          onClick={() => tracking.trackEvent(clickedArtworksTabTrackingData)}
        >
          Artworks
          <Text display="inline">&nbsp;({artworkCount})</Text>
        </RouteTab>
      </RouteTabs>

      {children}
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
