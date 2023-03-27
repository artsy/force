import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { Box, Separator, Text } from "@artsy/palette"
import ArtworkIcon from "@artsy/icons/ArtworkIcon"
import GraphIcon from "@artsy/icons/GraphIcon"
import HeartStrokeIcon from "@artsy/icons/HeartStrokeIcon"
import GroupIcon from "@artsy/icons/GroupIcon"
import { SystemContext } from "System/SystemContext"
import * as React from "react"
import { useContext } from "react"
import { useTracking } from "react-tracking"
import { NavBarMenuItemLink } from "./NavBarMenuItem"
import { ProgressiveOnboardingSaveHighlight } from "Components/ProgressiveOnboarding/ProgressiveOnboardingSaveHighlight"
import { ProgressiveOnboardingFollowHighlight } from "Components/ProgressiveOnboarding/ProgressiveOnboardingFollowHighlight"
import { useLinkToSaves } from "Apps/CollectorProfile/Routes/Saves2/Utils/useLinksToSaves"

export const NavBarCollectorProfileMenu: React.FC = () => {
  const { trackEvent } = useTracking()

  const { user } = useContext(SystemContext)

  const savesPath = useLinkToSaves()

  const trackClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const link = event.currentTarget

    if (!(link instanceof HTMLAnchorElement)) return

    const text = link.innerText
    const href = link.getAttribute("href")

    trackEvent({
      action_type: DeprecatedAnalyticsSchema.ActionType.Click,
      context_module:
        DeprecatedAnalyticsSchema.ContextModule.HeaderUserDropdown,
      subject: text,
      destination_path: href!,
    })
  }

  if (!user) return null

  return (
    <Text variant="sm" py={1} width={230}>
      <Box px={2} py={1}>
        Hi, {user.name}
      </Box>

      <Box px={2} my={1}>
        <Separator as="hr" color="black60" />
      </Box>

      <NavBarMenuItemLink
        aria-label="View your Collection"
        to="/collector-profile/my-collection"
        onClick={trackClick}
      >
        <ArtworkIcon mr={1} aria-hidden="true" /> My Collection
      </NavBarMenuItemLink>

      <NavBarMenuItemLink
        aria-label="View your Collection's Insights"
        to="/collector-profile/insights"
        onClick={trackClick}
      >
        <GraphIcon mr={1} aria-hidden="true" /> Insights
      </NavBarMenuItemLink>

      <ProgressiveOnboardingSaveHighlight
        position={{ top: "3.5px", left: "9.5px" }}
      >
        <NavBarMenuItemLink
          aria-label="View your Saves"
          to={savesPath}
          onClick={trackClick}
        >
          <HeartStrokeIcon mr={1} aria-hidden="true" /> Saves
        </NavBarMenuItemLink>
      </ProgressiveOnboardingSaveHighlight>

      <ProgressiveOnboardingFollowHighlight
        position={{ top: "3.5px", left: "9.5px" }}
      >
        <NavBarMenuItemLink
          aria-label="View your Follows"
          to="/collector-profile/follows"
          onClick={trackClick}
        >
          <GroupIcon mr={1} aria-hidden="true" /> Follows
        </NavBarMenuItemLink>
      </ProgressiveOnboardingFollowHighlight>
    </Text>
  )
}
