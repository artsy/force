import {
  ActionType,
  type ClickedBuyNow,
  type ClickedViewWork,
  OwnerType,
} from "@artsy/cohesion"
import type {
  ClickedActivityPanelNotificationItem,
  ClickedActivityPanelTab,
} from "@artsy/cohesion/dist/Schema/Events/ActivityPanel"
import {
  type CollectorSignals,
  getSignalLabel,
  signalsToArray,
} from "Utils/getSignalLabel"
import { useTracking } from "react-tracking"

export const useNotificationsTracking = () => {
  const { trackEvent } = useTracking()

  const tracking = {
    clickedActivityPanelNotificationItem: (notificationType: string) => {
      const event: ClickedActivityPanelNotificationItem = {
        action: ActionType.clickedActivityPanelNotificationItem,
        notification_type: notificationType,
      }

      trackEvent(event)
    },
    clickedActivityPanelTab: (tabName: string) => {
      const event: ClickedActivityPanelTab = {
        action: ActionType.clickedActivityPanelTab,
        tab_name: tabName,
      }

      trackEvent(event)
    },
    clickedViewWork: (artworkID: string, partnerOfferID: string) => {
      const event: ClickedViewWork = {
        action: ActionType.clickedViewWork,
        context_owner_type: OwnerType.notification,
        owner_id: partnerOfferID,
        artwork_id: artworkID,
        notification_type: "offer",
      }

      trackEvent(event)
    },
    clickBuyNow: (
      artworkID: string,
      artworkSlug: string,
      collectorSignals?: CollectorSignals,
    ) => {
      const signals = signalsToArray(collectorSignals)

      const event: ClickedBuyNow = {
        action: ActionType.clickedBuyNow,
        context_owner_type: OwnerType.notification,
        context_owner_id: artworkID,
        context_owner_slug: artworkSlug,
        flow: "Partner Offer",
        signal_label: collectorSignals ? getSignalLabel({ signals }) : "",
      }

      trackEvent(event)
    },
  }

  return { tracking }
}
