import { useRef } from "react"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { FairApp_fair } from "v2/__generated__/FairApp_fair.graphql"
import { Box, DROP_SHADOW, Flex, FullBleed, Text, Image } from "@artsy/palette"
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
  PageOwnerType,
} from "@artsy/cohesion"
import { HttpError } from "found"
import { userIsAdmin } from "v2/Utils/user"
import { FairHeaderImageFragmentContainer } from "./Components/FairHeader/FairHeaderImage"
import { FairHeaderFragmentContainer } from "./Components/FairHeader"
import { data as sd } from "sharify"
import { Sticky, StickyProvider } from "v2/Components/Sticky"
import { AppContainer } from "../Components/AppContainer"
import { HorizontalPadding } from "../Components/HorizontalPadding"
import styled from "styled-components"

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
      context_page_owner_type: contextPageOwnerType as PageOwnerType,
      destination_path: destinationPath,
      subject,
    }

    lastClickedTab.current = contextModule

    tracking.trackEvent(trackingData)
  }

  const artworkCount = fair.counts?.artworks ?? 0
  const enableFairPageExhibitorsTab = sd.ENABLE_FAIR_PAGE_EXHIBITORS_TAB

  return (
    <StickyProvider>
      <FairMetaFragmentContainer fair={fair} />

      <FairHeaderImageFragmentContainer fair={fair} />

      <FairHeaderFragmentContainer fair={fair} />

      <Sticky>
        {({ stuck }) => {
          return (
            <FullBleed
              mb={stuck ? 0.5 : 0}
              style={stuck ? { boxShadow: DROP_SHADOW } : undefined}
            >
              <AppContainer>
                <HorizontalPadding>
                  <Flex>
                    <Box
                      width={60}
                      height={60}
                      border="1px solid transparent"
                      borderBottomColor="black10"
                    >
                      {stuck && fair.profile?.icon?.cropped && (
                        <Image
                          src={fair.profile.icon.cropped.src}
                          srcSet={fair.profile.icon.cropped.srcSet}
                          width="100%"
                          height="100%"
                        />
                      )}
                    </Box>
                    <RouteTabs textAlign="center" flexGrow={1} fill>
                      <FairRouteTab
                        to={fairHref}
                        exact
                        onClick={trackTabData(
                          fairHref,
                          "Overview",
                          ContextModule.fairInfo
                        )}
                      >
                        Overview
                      </FairRouteTab>

                      <FairRouteTab
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
                      </FairRouteTab>

                      {enableFairPageExhibitorsTab && (
                        <FairRouteTab
                          to={`${fairHref}/exhibitors`}
                          exact
                          onClick={trackTabData(
                            `${fairHref}/exhibitors`,
                            "Exhibitors",
                            ContextModule.exhibitorsTab
                          )}
                        >
                          Exhibitors A-Z
                        </FairRouteTab>
                      )}

                      {!enableFairPageExhibitorsTab && (
                        <FairRouteTab
                          to={`${fairHref}/booths`}
                          exact
                          onClick={trackTabData(
                            `${fairHref}/booths`,
                            "Booths",
                            ContextModule.boothsTab
                          )}
                        >
                          Booths
                        </FairRouteTab>
                      )}
                    </RouteTabs>
                  </Flex>
                </HorizontalPadding>
              </AppContainer>
            </FullBleed>
          )
        }}
      </Sticky>

      {children}
    </StickyProvider>
  )
}

const FairRouteTab = styled(RouteTab).attrs({
  variant: "md",
  alignItems: "center",
  py: 2,
  height: "auto",
})``

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
        profile {
          icon {
            cropped(width: 60, height: 60, version: "square140") {
              src
              srcSet
            }
          }
        }
        ...FairMeta_fair
        ...FairHeader_fair
        ...FairHeaderImage_fair
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
