import { MetaTags } from "Components/MetaTags"
import { Notifications } from "Components/Notifications/Notifications"
import { createFragmentContainer, graphql } from "react-relay"
import { NotificationsApp_me$data } from "__generated__/NotificationsApp_me.graphql"
import { Media } from "Utils/Responsive"
import { NotificationsContextProvider } from "Components/Notifications/Hooks/useNotificationsContext"
import { NotificationQueryRenderer } from "Components/Notifications/Notification"
import { useRouter } from "found"
import { GridColumns, Column, Flex, FullBleed } from "@artsy/palette"
import { ContextModule, Intent } from "@artsy/cohesion"
import { useAuthDialog } from "Components/AuthDialog"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useEffect } from "react"
import {
  DESKTOP_HEIGHT,
  MIN_LIST_WIDTH,
} from "Apps/Notifications/notificationsutils"

interface NotificationsAppProps {
  me: NotificationsApp_me$data
}

const NotificationsApp: React.FC<NotificationsAppProps> = ({ me }) => {
  const { match } = useRouter()
  const { showAuthDialog } = useAuthDialog()
  const { isLoggedIn } = useSystemContext()

  useEffect(() => {
    if (!isLoggedIn) {
      showAuthDialog({
        mode: "Login",
        options: {
          title: mode => {
            const action = mode === "Login" ? "Log in" : "Sign up"
            return `${action} to view your notifications.`
          },
        },
        analytics: {
          contextModule: ContextModule.activity,
          intent: Intent.login,
        },
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isNotificationsPage = match.location.pathname.startsWith(
    "/notifications"
  )

  return (
    <FullBleed>
      <NotificationsContextProvider>
        <MetaTags
          title="Notifications | Artsy"
          pathname={isNotificationsPage ? "/notifications" : "/notification"}
        />

        <Media greaterThan="xs">
          <GridColumns>
            <Column
              span={3}
              borderRight="1px solid"
              borderColor="black10"
              minWidth={MIN_LIST_WIDTH}
            >
              <Flex height={DESKTOP_HEIGHT} flexDirection="column">
                <Notifications
                  mode="page"
                  unreadCounts={me?.unreadNotificationsCount ?? 0}
                />
              </Flex>
            </Column>

            <Column span={9}>
              <NotificationQueryRenderer />
            </Column>
          </GridColumns>
        </Media>

        <Media at="xs">
          {isNotificationsPage ? (
            <Notifications
              mode="page"
              unreadCounts={me.unreadNotificationsCount ?? 0}
            />
          ) : (
            <NotificationQueryRenderer />
          )}
        </Media>
      </NotificationsContextProvider>
    </FullBleed>
  )
}

export const NotificationsAppFragmentContainer = createFragmentContainer(
  NotificationsApp,
  {
    me: graphql`
      fragment NotificationsApp_me on Me {
        unreadNotificationsCount
      }
    `,
  }
)
