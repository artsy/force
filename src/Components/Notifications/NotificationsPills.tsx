import { ActionType } from "@artsy/cohesion"
import { Flex, Pill } from "@artsy/palette"
import { NotificationType } from "Components/Notifications/types"
import { useNotificationsContext } from "Components/Notifications/useNotificationsContext"
import { useTracking } from "react-tracking"

export const NOTIFICATIONS_PILLS = [
  { value: "All", name: "all" },
  { value: "Alerts", name: "alerts" },
  { value: "Following", name: "following" },
]
export const NotificationsPills: React.FC = () => {
  const { trackEvent } = useTracking()
  const { setCurrentNotificationFilterType, state } = useNotificationsContext()

  const handleClick = tabNumber => {
    setCurrentNotificationFilterType(
      NOTIFICATIONS_PILLS[tabNumber].name as NotificationType
    )
  }

  const sendAnalytics = pill => {
    trackEvent({
      action: ActionType.clickedActivityPanelTab,
      tab_name: pill.name,
    })
  }

  return (
    <Flex gap={1}>
      {NOTIFICATIONS_PILLS.map((pill, i) => {
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
