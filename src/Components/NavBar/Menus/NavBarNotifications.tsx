import { Box, Flex, Spinner } from "@artsy/palette"
import loadable from "@loadable/component"

const Notifications = loadable(
  () =>
    import(
      /* webpackChunkName: "notificationsBundle" */
      "Components/Notifications/Notifications"
    ),
  { resolveComponent: component => component.Notifications }
)

interface NavBarNotificationsProps {
  unreadCounts: number
  onHide: () => void
}

export const NavBarNotifications: React.FC<
  React.PropsWithChildren<NavBarNotificationsProps>
> = ({ onHide, ...rest }) => {
  return (
    <Box width={420}>
      <Notifications
        mode="dropdown"
        fallback={
          <Flex height={600}>
            <Spinner m="auto" />
          </Flex>
        }
        onHide={onHide}
        {...rest}
      />
    </Box>
  )
}
