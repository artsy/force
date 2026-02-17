import {
  ActionType,
  ContextModule,
  type ClickedNavigationDropdownItem,
  type ClickedNotificationsBell,
  type NavigationDropdownViewed,
} from "@artsy/cohesion"
import * as DeprecatedAnalyticsSchema from "@artsy/cohesion/dist/DeprecatedSchema"
import { useAnalyticsContext } from "System/Hooks/useAnalyticsContext"
import { useTracking } from "react-tracking"

export const useNavBarTracking = () => {
  const { trackEvent } = useTracking()

  const { contextPageOwnerId, contextPageOwnerSlug, contextPageOwnerType } =
    useAnalyticsContext()

  return {
    // -- Typed payloads (from @artsy/cohesion) --

    clickedNotificationsBell: () => {
      const payload: ClickedNotificationsBell = {
        action: ActionType.clickedNotificationsBell,
      }

      trackEvent(payload)
    },

    navigationDropdownViewed: (args: {
      navigationItem: string
      level: number
      interactionType: "hover" | "drilldown"
    }) => {
      const payload: NavigationDropdownViewed = {
        action: ActionType.navigationDropdownViewed,
        context_module: ContextModule.header,
        context_page_owner_type: contextPageOwnerType!,
        context_page_owner_id: contextPageOwnerId,
        context_page_owner_slug: contextPageOwnerSlug,
        navigation_item: args.navigationItem,
        level: args.level,
        interaction_type: args.interactionType,
      }

      trackEvent(payload)
    },

    clickedNavigationDropdownItem: (args: {
      contextModule: DeprecatedAnalyticsSchema.ContextModule
      parentNavigationItem: string
      subject: string
      destinationPath: string
      dropdownGroup?: string
    }) => {
      const payload: ClickedNavigationDropdownItem = {
        action: "click",
        flow: "Header",
        // @ts-expect-error - ContextModule types between deprecated and new schema
        context_module: args.contextModule,
        context_page_owner_type: contextPageOwnerType!,
        context_page_owner_id: contextPageOwnerId,
        context_page_owner_slug: contextPageOwnerSlug,
        parent_navigation_item: args.parentNavigationItem,
        dropdown_group: args.dropdownGroup,
        subject: args.subject,
        destination_path: args.destinationPath,
      }

      trackEvent(payload)
    },

    // -- Deprecated payloads --
    // These use the deprecated analytics schema and should be migrated
    // to typed @artsy/cohesion events when available.

    /** @deprecated Uses DeprecatedAnalyticsSchema */
    clickedNavLink: (args: { subject: string; destinationPath: string }) => {
      trackEvent({
        action_type: DeprecatedAnalyticsSchema.ActionType.Click,
        destination_path: args.destinationPath,
        subject: args.subject,
      })
    },

    /** @deprecated Uses DeprecatedAnalyticsSchema */
    clickedMobileMenuHamburger: () => {
      trackEvent({
        action_type: DeprecatedAnalyticsSchema.ActionType.Click,
        subject:
          DeprecatedAnalyticsSchema.Subject.SmallScreenMenuSandwichIcon,
      })
    },

    /** @deprecated Uses DeprecatedAnalyticsSchema */
    clickedMobileNavLink: (args: {
      subject: string
      destinationPath: string | null
    }) => {
      trackEvent({
        action_type: DeprecatedAnalyticsSchema.ActionType.Click,
        context_module: DeprecatedAnalyticsSchema.ContextModule.Header,
        flow: "Header",
        subject: args.subject,
        destination_path: args.destinationPath,
      })
    },

    /** @deprecated Uses DeprecatedAnalyticsSchema */
    clickedMobileSubMenuOpen: (args: {
      contextModule: DeprecatedAnalyticsSchema.ContextModule
      subject: string
    }) => {
      trackEvent({
        action_type: DeprecatedAnalyticsSchema.ActionType.Click,
        context_module: args.contextModule,
        flow: "Header",
        subject: args.subject,
      })
    },

    /** @deprecated Uses DeprecatedAnalyticsSchema */
    clickedMobileSubMenuBack: (args: {
      contextModule: DeprecatedAnalyticsSchema.ContextModule
    }) => {
      trackEvent({
        action_type: DeprecatedAnalyticsSchema.ActionType.Click,
        context_module: args.contextModule,
        flow: "Header",
        subject: "Back link",
      })
    },

    /** @deprecated Uses DeprecatedAnalyticsSchema */
    clickedUserMenuItem: (args: {
      subject: string
      destinationPath: string | null
    }) => {
      trackEvent({
        action_type: DeprecatedAnalyticsSchema.ActionType.Click,
        context_module:
          DeprecatedAnalyticsSchema.ContextModule.HeaderUserDropdown,
        subject: args.subject,
        destination_path: args.destinationPath,
      })
    },
  }
}
