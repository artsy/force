import { ActionType } from "@artsy/cohesion"
import { Flex, Pill } from "@artsy/palette"
import { NotificationType } from "Components/Notifications/types"
import { useNotificationsContext } from "Components/Notifications/useNotificationsContext"
import { useTracking } from "react-tracking"

export const NOTIFICATIONS_PILLS = [
  { value: "All", name: "all" },
  { value: "Alerts", name: "alerts" },
  { value: "Following", name: "following" },
  { value: "Offers", name: "offers" },
]

export const NotificationsPills: React.FC = () => {
  const { trackEvent } = useTracking()
  const { setCurrentNotificationFilterType, state } = useNotificationsContext()

  const handleClick = tabNumber => {
    if (tabNumber >= 0 && tabNumber < NOTIFICATIONS_PILLS.length) {
      setCurrentNotificationFilterType(
        NOTIFICATIONS_PILLS[tabNumber].name as NotificationType
      )
    }
  }

  const sendAnalytics = pillName => {
    trackEvent({
      action: ActionType.clickedActivityPanelTab,
      tab_name: pillName,
    })
  }

  return (
    <Flex gap={0.5}>
      {NOTIFICATIONS_PILLS.map((pill, i) => {
        // if (pill.name === "offers" && hasOffers > 0) {
        //   return null
        // }
        return (
          <Pill
            key={i}
            selected={state.currentNotificationFilterType === pill.name}
            variant="default"
            onClick={() => {
              sendAnalytics(pill.name)
              handleClick(i)
            }}
          >
            {pill.value}
          </Pill>
        )
      })}
    </Flex>
  )
}
