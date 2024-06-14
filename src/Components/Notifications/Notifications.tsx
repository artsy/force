import { useEffect } from "react"
import { DateTime } from "luxon"
import { markNotificationsAsSeen } from "./Mutations/markNotificationsAsSeen"
import { useSystemContext } from "System/Hooks/useSystemContext"
import createLogger from "Utils/logger"
import { NotificationsWrapperProps } from "./NotificationsWrapper"
import { NotificationsContextProvider } from "Components/Notifications/Hooks/useNotificationsContext"
import { Box, Flex, Separator, useTheme } from "@artsy/palette"
import { NotificationsHeader } from "Components/Notifications/NotificationsHeader"
import { NotificationsListQueryRenderer } from "Components/Notifications/NotificationsList"
import Sticky from "react-stickynode"
import { DESKTOP_NAV_BAR_HEIGHT } from "Components/NavBar/constants"

const DROPDOWN_HEADER_HEIGHT = 113
const VERTICAL_OFFSET = 10
const DROPDOWN_CONTENT_HEIGHT =
  DROPDOWN_HEADER_HEIGHT + DESKTOP_NAV_BAR_HEIGHT + VERTICAL_OFFSET

export type NotificationListMode = "dropdown" | "page"

const logger = createLogger("Notifications")

interface NotificationsProps extends NotificationsWrapperProps {
  mode: NotificationListMode
  onHide?: () => void
}

export const Notifications: React.FC<NotificationsProps> = ({
  mode,
  onHide,
  unreadCounts,
}) => {
  const { relayEnvironment } = useSystemContext()
  const { theme } = useTheme()

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
    <NotificationsContextProvider>
      <Box>
        {mode === "dropdown" ? (
          <Box style={{ boxShadow: theme.effects.dropShadow }}>
            <Flex flex={1} overflow="hidden">
              <NotificationsHeader
                mode="dropdown"
                onHide={onHide}
                unreadCounts={unreadCounts}
              />
            </Flex>

            <Separator borderColor="black5" />

            <Box
              maxHeight={`calc(100vh - ${DROPDOWN_CONTENT_HEIGHT}px)`}
              overflowY="scroll"
            >
              <NotificationsListQueryRenderer mode={mode} />
            </Box>
          </Box>
        ) : (
          <>
            <Sticky>
              <NotificationsHeader
                mode="page"
                onHide={onHide}
                unreadCounts={unreadCounts}
              />
              <Separator borderColor="black5" />
            </Sticky>

            <Box
              overflow="scroll"
              // The notification list needs a maximum height to be independently scrollable.
              maxHeight={[null, `calc(100vh - ${DROPDOWN_CONTENT_HEIGHT}px)`]}
              pb={2}
            >
              <NotificationsListQueryRenderer mode={mode} />
            </Box>
          </>
        )}
      </Box>
    </NotificationsContextProvider>
  )
}
