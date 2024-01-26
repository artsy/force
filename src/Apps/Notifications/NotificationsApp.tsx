import { MetaTags } from "Components/MetaTags"
import { Notifications } from "Components/Notifications/Notifications"
import { createFragmentContainer, graphql } from "react-relay"
import { NotificationsApp_me$data } from "__generated__/NotificationsApp_me.graphql"
import { Media } from "Utils/Responsive"
import { NotificationsContextProvider } from "Components/Notifications/useNotificationsContext"
import { NotificationQueryRenderer } from "Components/Notifications/Notification"
import { useRouter } from "found"
import { GridColumns, Column, Flex, FullBleed } from "@artsy/palette"
import { DESKTOP_NAV_BAR_HEIGHT } from "Components/NavBar/constants"

const DESKTOP_HEIGHT = `calc(100vh - ${DESKTOP_NAV_BAR_HEIGHT}px)`
const MIN_LIST_WIDTH = 350

interface NotificationsAppProps {
  me: NotificationsApp_me$data
}

const NotificationsApp: React.FC<NotificationsAppProps> = ({ me }) => {
  const { match } = useRouter()

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
                  unreadCounts={me.unreadNotificationsCount ?? 0}
                />
              </Flex>
            </Column>

            <Column span={9}>
              <Flex
                flexDirection="column"
                height={DESKTOP_HEIGHT}
                overflow="auto"
              >
                <NotificationQueryRenderer />
              </Flex>
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
