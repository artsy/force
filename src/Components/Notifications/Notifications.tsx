import { Tab } from "@artsy/palette"
import { NofiticationsTabs, NofiticationsTabsProps } from "./NotificationsTabs"
import { NotificationsListQueryRenderer } from "./NotificationsList"
import { NotificationPaginationType } from "./types"
import { useEffect } from "react"
import { DateTime } from "luxon"
import { markNotificationsAsSeen } from "./Mutations/markNotificationsAsSeen"
import { useSystemContext } from "System/useSystemContext"
import createLogger from "Utils/logger"
import { useFeatureFlag } from "System/useFeatureFlag"
import { NotificationsWrapper } from "./NotificationsWrapper"
import { NotificationsContextProvider } from "Components/Notifications/useNotificationsContext"

const logger = createLogger("Notifications")

interface NotificationsProps extends NofiticationsTabsProps {
  paginationType?: NotificationPaginationType
}

export const Notifications: React.FC<NotificationsProps> = ({
  paginationType,
  ...rest
}) => {
  const { relayEnvironment } = useSystemContext()

  const enableActivityPanelPills = useFeatureFlag(
    "onyx_activity_panel_filter_pills"
  )

  const markAsSeen = async () => {
    if (!relayEnvironment) {
      return
    }

    try {
      const until = DateTime.local().toISO()
      const response = await markNotificationsAsSeen(until, relayEnvironment)
      const errorMessage =
        response.markNotificationsAsSeen?.responseOrError?.mutationError
          ?.message

      if (errorMessage) {
        throw new Error(errorMessage)
      }
    } catch (error) {
      logger.error(error)
    }
  }

  useEffect(() => {
    markAsSeen()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {!enableActivityPanelPills ? (
        <NofiticationsTabs {...rest}>
          <Tab name="All">
            <NotificationsListQueryRenderer
              mode={rest.mode}
              type="all"
              paginationType={paginationType}
            />
          </Tab>
          <Tab name="Alerts">
            <NotificationsListQueryRenderer
              mode={rest.mode}
              type="alerts"
              paginationType={paginationType}
            />
          </Tab>
        </NofiticationsTabs>
      ) : (
        <NotificationsContextProvider>
          <NotificationsWrapper {...rest} />
        </NotificationsContextProvider>
      )}
    </>
  )
}
