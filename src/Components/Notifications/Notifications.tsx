import { Tab } from "@artsy/palette"
import { NofiticationsTabs, NofiticationsTabsProps } from "./NotificationsTabs"
import { NotificationsListQueryRenderer } from "./NotificationsList"
import { NotificationPaginationType } from "./types"
import { useEffect, useCallback } from "react"
import { DateTime } from "luxon"
import { markNotificationsAsSeen } from "./Mutations/markNotificationsAsSeen"
import { useSystemContext } from "System"
import createLogger from "Utils/logger"

const logger = createLogger("MarkNotificationsAsSeen")

interface NotificationsProps extends NofiticationsTabsProps {
  paginationType?: NotificationPaginationType
}

export const Notifications: React.FC<NotificationsProps> = ({
  paginationType,
  ...rest
}) => {
  const { relayEnvironment } = useSystemContext()

  const markAsSeen = useCallback(async () => {
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
  }, [relayEnvironment])

  useEffect(() => {
    markAsSeen()
  }, [markAsSeen])

  return (
    <NofiticationsTabs {...rest}>
      <Tab name="All">
        <NotificationsListQueryRenderer
          type="all"
          paginationType={paginationType}
        />
      </Tab>
      <Tab name="Alerts">
        <NotificationsListQueryRenderer
          type="alerts"
          paginationType={paginationType}
        />
      </Tab>
    </NofiticationsTabs>
  )
}
