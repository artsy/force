import React, { useRef } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairApp_fair } from "v2/__generated__/FairApp_fair.graphql"
import { Spacer, Text } from "@artsy/palette"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { FairMetaFragmentContainer } from "./Components/FairMeta"
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
import { FairHeaderImageFragmentContainer } from "./Components/FairHeader/FairHeaderImage"

interface FairAppProps {
  fair: FairApp_fair
}

const FairApp: React.FC<FairAppProps> = ({ children, fair }) => {
  const tracking = useTracking()
  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()
  const lastClickedTab = useRef(ContextModule.fairInfo)

  const fairHref = fair.href ?? ""

  const trackTabData = (
    destinationPath: string,
    subject: string,
    contextModule: ContextModule
  ) => () => {
    const trackingData: ClickedNavigationTab = {
      action: ActionType.clickedNavigationTab,
      context_module: lastClickedTab.current,
      context_page_owner_id: contextPageOwnerId,
      context_page_owner_slug: contextPageOwnerSlug,
      // @ts-expect-error STRICT_NULL_CHECK
      context_page_owner_type: contextPageOwnerType,
      destination_path: destinationPath,
      subject,
    }

    lastClickedTab.current = contextModule

    tracking.trackEvent(trackingData)
  }

  const artworkCount = fair.counts?.artworks ?? 0

  return (
    <>
      <FairMetaFragmentContainer fair={fair} />

      <FairHeaderImageFragmentContainer fair={fair} />

      <Spacer my={[4, 30]} />

      <RouteTabs my={[0, 2]} fill>
        <RouteTab
          to={fairHref}
          exact
          onClick={trackTabData(fairHref, "Overview", ContextModule.fairInfo)}
        >
          Overview
        </RouteTab>
        <RouteTab
          to={`${fairHref}/booths`}
          exact
          onClick={trackTabData(
            `${fairHref}/booths`,
            "Booths",
            ContextModule.exhibitorsTab
          )}
        >
          Booths
        </RouteTab>

        <RouteTab
          to={`${fairHref}/artworks`}
          exact
          onClick={trackTabData(
            `${fairHref}/artworks`,
            "Artworks",
            ContextModule.artworksTab
          )}
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
        ...FairHeaderImage_fair
        ...FairFollowedArtists_fair
        articlesConnection(first: 6, sort: PUBLISHED_AT_DESC) {
          totalCount
          edges {
            __typename
          }
        }
        marketingCollections(size: 5) {
          id
        }
        counts {
          artworks
        }
        profile {
          id
        }
      }
    `,
  }
)
