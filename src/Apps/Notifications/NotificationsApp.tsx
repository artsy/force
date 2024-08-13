import { MetaTags } from "Components/MetaTags"
import { Notifications } from "Components/Notifications/Notifications"
import { createFragmentContainer, graphql } from "react-relay"
import { NotificationsApp_me$data } from "__generated__/NotificationsApp_me.graphql"
import { Media } from "Utils/Responsive"
import { NotificationsContextProvider } from "Components/Notifications/Hooks/useNotificationsContext"
import { NotificationQueryRenderer } from "Components/Notifications/Notification"
import { useRouter } from "found"
import { GridColumns, Column, FullBleed, Box } from "@artsy/palette"
import { ContextModule, Intent } from "@artsy/cohesion"
import { useAuthDialog } from "Components/AuthDialog"
import { useSystemContext } from "System/Hooks/useSystemContext"
import {
  DESKTOP_HEIGHT,
  MIN_LIST_WIDTH,
} from "Apps/Notifications/notificationsutils"
import { useOnce } from "Utils/Hooks/useOnce"
import { useEffect, useRef } from "react"

interface NotificationsAppProps {
  me: NotificationsApp_me$data
}

const NotificationsApp: React.FC<NotificationsAppProps> = ({ me }) => {
  const { match } = useRouter()
  const { showAuthDialog } = useAuthDialog()
  const { isLoggedIn } = useSystemContext()

  const contentRef = useRef<HTMLDivElement | null>(null)

  useOnce(() => {
    if (isLoggedIn) return

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
  })

  const pathname = match.location.pathname
  const isNotificationsPage = pathname.startsWith("/notifications")

  // Scroll to top of content pane when route changes
  useEffect(() => {
    contentRef.current?.scrollTo(0, 0)
  }, [pathname])

  return (
    <FullBleed>
      <NotificationsContextProvider>
        <MetaTags
          title="Notifications | Artsy"
          pathname={isNotificationsPage ? "/notifications" : "/notification"}
        />

        <Media greaterThan="xs">
          <GridColumns height="100%">
            <Column
              span={3}
              borderRight="1px solid"
              borderColor="black10"
              minWidth={MIN_LIST_WIDTH}
              height="100%"
            >
              <Notifications
                mode="page"
                unreadCounts={me?.unreadNotificationsCount ?? 0}
              />
            </Column>

            <Column span={9}>
              <Box
                ref={contentRef as any}
                maxHeight={DESKTOP_HEIGHT}
                overflow="auto"
              >
                <NotificationQueryRenderer />
              </Box>
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
