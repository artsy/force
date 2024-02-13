import { ActionType } from "@artsy/cohesion"
import { Flex, Pill, Skeleton, SkeletonBox } from "@artsy/palette"
import { NotificationType } from "Components/Notifications/types"
import { useNotificationsContext } from "Components/Notifications/useNotificationsContext"
import { Suspense } from "react"
import { graphql, useLazyLoadQuery } from "react-relay"
import { useTracking } from "react-tracking"
import { NotificationsPillsQuery } from "__generated__/NotificationsPillsQuery.graphql"
import { times } from "lodash"

export const NOTIFICATIONS_PILLS = [
  { value: "All", name: "all" },
  { value: "Offers", name: "offers" },
  { value: "Alerts", name: "alerts" },
  { value: "Following", name: "following" },
]

export const NotificationsPills: React.FC = () => {
  const { trackEvent } = useTracking()
  const { setCurrentNotificationFilterType, state } = useNotificationsContext()
  const pills = useLazyLoadQuery<NotificationsPillsQuery>(
    notificationsPillsQuery,
    {}
  )

  const hasPartnerOfferNotifications =
    pills.viewer?.notificationsConnection?.totalCount ?? 0 > 0

  const handleClick = tabNumber => {
    setCurrentNotificationFilterType(
      NOTIFICATIONS_PILLS[tabNumber].name as NotificationType
    )
  }

  const sendAnalytics = pillName => {
    trackEvent({
      action: ActionType.clickedActivityPanelTab,
      tab_name: pillName,
    })
  }

  return (
    <Flex gap={0.5}>
      {NOTIFICATIONS_PILLS.map((pill, i) => {
        if (pill.name === "offers" && !hasPartnerOfferNotifications) {
          return null
        }
        return (
          <Pill
            key={i}
            selected={state.currentNotificationFilterType === pill.name}
            variant="default"
            onClick={() => {
              sendAnalytics(pill.name)
              handleClick(i)
            }}
          >
            {pill.value}
          </Pill>
        )
      })}
    </Flex>
  )
}

export const NotificationsPillsQueryRenderer: React.FC = props => {
  return (
    <Suspense fallback={<Placeholder />}>
      <NotificationsPills {...props} />
    </Suspense>
  )
}

const notificationsPillsQuery = graphql`
  query NotificationsPillsQuery {
    viewer {
      notificationsConnection(
        first: 1
        notificationTypes: [PARTNER_OFFER_CREATED]
      ) {
        totalCount
      }
    }
  }
`
export const Placeholder: React.FC = () => (
  <Flex flexDirection="column" gap={0.5}>
    <Skeleton>
      <Flex mb={4}>
        {times(4).map(index => (
          <SkeletonBox key={`pill-${index}`} width={70} height={30} />
        ))}
      </Flex>
    </Skeleton>
  </Flex>
)
