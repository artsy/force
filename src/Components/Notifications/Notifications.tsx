import { Box, Column, Flex, GridColumns, THEME, Tab } from "@artsy/palette"
import { NofiticationsTabs, NofiticationsTabsProps } from "./NotificationsTabs"
import { NotificationPaginationType } from "./types"
import { useEffect, useState } from "react"
import { DateTime } from "luxon"
import { markNotificationsAsSeen } from "./Mutations/markNotificationsAsSeen"
import { useSystemContext } from "System/useSystemContext"
import createLogger from "Utils/logger"
import { NotificationsContextProvider } from "Components/Notifications/useNotificationsContext"
import { NotificationQueryRenderer } from "Apps/Notifications/Notification"
import { NotificationsListQueryRenderer } from "Components/Notifications/NotificationsList"
import { __internal__useMatchMedia } from "Utils/Hooks/useMatchMedia"

const logger = createLogger("Notifications")

interface NotificationsProps extends NofiticationsTabsProps {
  paginationType?: NotificationPaginationType
}

export const Notifications: React.FC<NotificationsProps> = ({
  paginationType,
  ...rest
}) => {
  const { relayEnvironment } = useSystemContext()
  const isMobile = __internal__useMatchMedia(THEME.mediaQueries.xs)

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

  const [height, setHeight] = useState(0)

  useEffect(() => {
    const MENU_HEIGHT = 103

    const handleResize = () => {
      setHeight(window.innerHeight - MENU_HEIGHT)
    }

    handleResize()

    window.addEventListener("resize", handleResize, { passive: true })

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <NotificationsContextProvider id={null} mode={rest.mode}>
      <Box>
        {rest.mode === "page" && !isMobile ? (
          <GridColumns gridColumnGap={0}>
            <Column span={4} borderRight="1px solid #ddd">
              <Flex height={height} flexDirection={"column"}>
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
              </Flex>
            </Column>

            <Column span={8}>
              <Flex flexDirection={"column"} height={height} overflow="auto">
                <NotificationQueryRenderer />
              </Flex>
            </Column>
          </GridColumns>
        ) : (
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
        )}
      </Box>
    </NotificationsContextProvider>
  )
}
