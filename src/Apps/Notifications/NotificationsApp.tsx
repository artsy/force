import { ContextModule, Intent } from "@artsy/cohesion"
import { Box, Column, FullBleed, GridColumns } from "@artsy/palette"
import {
  DESKTOP_HEIGHT,
  MIN_LIST_WIDTH,
} from "Apps/Notifications/notificationsutils"
import { useAuthDialog } from "Components/AuthDialog"
import { MetaTags } from "Components/MetaTags"
import { NotificationsContextProvider } from "Components/Notifications/Hooks/useNotificationsContext"
import { NotificationQueryRenderer } from "Components/Notifications/Notification"
import { Notifications } from "Components/Notifications/Notifications"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useOnce } from "Utils/Hooks/useOnce"
import { Media } from "Utils/Responsive"
import type { NotificationsApp_me$data } from "__generated__/NotificationsApp_me.graphql"
import { useRouter } from "found"
import { useEffect, useRef } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface NotificationsAppProps {
  me: NotificationsApp_me$data
}

const NotificationsApp: React.FC<
  React.PropsWithChildren<NotificationsAppProps>
> = ({ me }) => {
  const { match } = useRouter()
  const { showAuthDialog } = useAuthDialog()
  const { isLoggedIn } = useSystemContext()

  const contentRef = useRef<HTMLDivElement | null>(null)

  useOnce(() => {
    if (isLoggedIn) return

    showAuthDialog({
      options: {
        title: "Sign up or log in to view your notifications",
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
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
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
              borderColor="mono10"
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
                <Box mx={[2, 4]} my={2}>
                  <NotificationQueryRenderer />
                </Box>
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
  },
)
