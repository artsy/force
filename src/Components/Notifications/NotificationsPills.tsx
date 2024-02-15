import { ActionType } from "@artsy/cohesion"
import { Flex, Pill, Skeleton, SkeletonBox } from "@artsy/palette"
import { NotificationType } from "Components/Notifications/types"
import { useNotificationsContext } from "Components/Notifications/useNotificationsContext"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { NotificationsPillsQuery } from "__generated__/NotificationsPillsQuery.graphql"
import { compact, times } from "lodash"
import { extractNodes } from "Utils/extractNodes"
import { useClientQuery } from "Utils/Hooks/useClientQuery"

export const NotificationsPills: React.FC = () => {
  const { trackEvent } = useTracking()
  const { setCurrentNotificationFilterType, state } = useNotificationsContext()

  const { data, loading } = useClientQuery<NotificationsPillsQuery>({
    query: notificationsPillsQuery,
  })

  const hasPartnerOfferNotifications =
    extractNodes(data?.viewer?.partnerOfferNotifications).length > 0

  const notificationPills = compact([
    { value: "All", name: "all" },
    hasPartnerOfferNotifications && { value: "Offers", name: "offers" },
    { value: "Alerts", name: "alerts" },
    { value: "Following", name: "following" },
  ])

  if (loading) return <Placeholder />

  return (
    <Flex gap={0.5} flexWrap="wrap">
      {notificationPills.map(pill => {
        return (
          <Pill
            key={pill.name}
            selected={state.currentNotificationFilterType === pill.name}
            variant="default"
            onClick={() => {
              setCurrentNotificationFilterType(pill.name as NotificationType)

              trackEvent({
                action: ActionType.clickedActivityPanelTab,
                tab_name: pill.name,
              })
            }}
          >
            {pill.value}
          </Pill>
        )
      })}
    </Flex>
  )
}

const notificationsPillsQuery = graphql`
  query NotificationsPillsQuery {
    viewer {
      partnerOfferNotifications: notificationsConnection(
        first: 1
        notificationTypes: [PARTNER_OFFER_CREATED]
      ) {
        # Total count does not work and returns a value even when there are no notifications
        # TODO: Use totalCount once the issue is fixed
        edges {
          node {
            id
          }
        }
      }
    }
  }
`

export const Placeholder: React.FC = () => (
  <Skeleton>
    <Flex gap={0.5}>
      {times(3).map(index => (
        <SkeletonBox key={`pill-${index}`} width={70} height={30} />
      ))}
    </Flex>
  </Skeleton>
)
