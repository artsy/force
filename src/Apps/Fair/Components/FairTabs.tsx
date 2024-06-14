import {
  ActionType,
  ClickedNavigationTab,
  ContextModule,
  PageOwnerType,
} from "@artsy/cohesion"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { FC, useRef } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"
import styled from "styled-components"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useJump } from "Utils/Hooks/useJump"
import { FairTabs_fair$data } from "__generated__/FairTabs_fair.graphql"

interface FairTabsProps {
  fair: FairTabs_fair$data
}

const FairTabs: FC<FairTabsProps> = ({ fair }) => {
  const tracking = useTracking()

  const {
    contextPageOwnerId,
    contextPageOwnerSlug,
    contextPageOwnerType,
  } = useAnalyticsContext()

  const lastClickedTab = useRef(ContextModule.fairInfo)

  const { jumpTo } = useJump()

  const handleClick = ({
    destinationPath,
    subject,
    contextModule,
  }: {
    destinationPath: string
    subject: string
    contextModule: ContextModule
  }) => () => {
    jumpTo("FairTabs")

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

  const fairHref = fair.href ?? ""
  const artworkCount = fair.counts?.artworks ?? 0

  return (
    <RouteTabs fill>
      <FairRouteTab
        to={fairHref}
        exact
        onClick={handleClick({
          destinationPath: fairHref,
          subject: "Overview",
          contextModule: ContextModule.fairInfo,
        })}
      >
        Overview
      </FairRouteTab>

      <FairRouteTab
        to={`${fairHref}/artworks`}
        exact
        onClick={handleClick({
          destinationPath: `${fairHref}/artworks`,
          subject: "Artworks",
          contextModule: ContextModule.artworksTab,
        })}
      >
        Artworks<span>&nbsp;({artworkCount})</span>
      </FairRouteTab>

      <FairRouteTab
        to={`${fairHref}/exhibitors`}
        exact
        onClick={handleClick({
          destinationPath: `${fairHref}/exhibitors`,
          subject: "Exhibitors",
          contextModule: ContextModule.exhibitorsTab,
        })}
      >
        Exhibitors A-Z
      </FairRouteTab>
    </RouteTabs>
  )
}

const FairRouteTab = styled(RouteTab).attrs({
  variant: "sm-display",
  alignItems: "center",
  py: 2,
  height: "auto",
})``

export const FairTabsFragmentContainer = createFragmentContainer(FairTabs, {
  fair: graphql`
    fragment FairTabs_fair on Fair {
      href
      counts {
        artworks
      }
    }
  `,
})
