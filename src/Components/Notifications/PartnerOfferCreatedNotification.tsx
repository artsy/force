import { Flex, Spacer, Text, Box } from "@artsy/palette"
import { RouterLink } from "System/Router/RouterLink"
import { FC } from "react"
import { useFragment, graphql } from "react-relay"
import { PartnerOfferCreatedNotification_notification$key } from "__generated__/PartnerOfferCreatedNotification_notification.graphql"
import { extractNodes } from "Utils/extractNodes"
import { ExpiresInTimer } from "Components/Notifications/ExpiresInTimer"
import { BASE_SAVES_PATH } from "Apps/CollectorProfile/constants"
import { PartnerOfferArtwork } from "Components/Notifications/PartnerOfferArtwork"
import { NotificationErrorMessage } from "Components/Notifications/NotificationErrorMessage"

interface PartnerOfferCreatedNotificationProps {
  notification: PartnerOfferCreatedNotification_notification$key
}

export const PartnerOfferCreatedNotification: FC<PartnerOfferCreatedNotificationProps> = ({
  notification,
}) => {
  const notificationData = useFragment(
    PartnerOfferCreatedNotificationFragment,
    notification
  )

  const {
    headline,
    item,
    targetHref,
    offerArtworksConnection,
  } = notificationData

  if (!item || !offerArtworksConnection || !item.partnerOffer) {
    return <NotificationErrorMessage />
  }

  const partnerOffer = item.partnerOffer
  const artwork = extractNodes(offerArtworksConnection)[0]

  return (
    <Box>
      <Flex width="100%" justifyContent="space-between">
        <Text variant="xs" color="blue100">
          Limited Time Offer
        </Text>
        <RouterLink to={BASE_SAVES_PATH} data-testid="manage-saves-link">
          <Text variant="xs">Manage Saves</Text>
        </RouterLink>
      </Flex>
      <Flex width="100%" justifyContent="space-between">
        <Flex flex={1}>
          <Text variant="lg-display">{headline}</Text>
        </Flex>
      </Flex>

      <Text variant="sm-display">Review the offer on your saved artwork</Text>

      <Spacer y={0.5} />

      <Flex flexDirection="row" alignItems="center" gap="3px">
        <>
          <Text
            variant="xs"
            fontWeight="bold"
            aria-label={`Notification type: Offer`}
          >
            Offer
          </Text>
        </>

        <ExpiresInTimer
          expiresAt={partnerOffer.endAt}
          available={partnerOffer.isAvailable}
        />
      </Flex>

      <Spacer y={4} />

      <Flex flexDirection="column" alignItems="center">
        <PartnerOfferArtwork
          artwork={artwork}
          targetHref={targetHref}
          endAt={partnerOffer.endAt}
          available={partnerOffer.isAvailable}
          priceListedMessage={partnerOffer.priceListedMessage}
          priceWithDiscountMessage={partnerOffer.priceWithDiscountMessage}
        />
      </Flex>
    </Box>
  )
}

export const PartnerOfferCreatedNotificationFragment = graphql`
  fragment PartnerOfferCreatedNotification_notification on Notification {
    headline
    targetHref
    item {
      ... on PartnerOfferCreatedNotificationItem {
        partnerOffer {
          endAt
          isAvailable
          priceListedMessage
          priceWithDiscountMessage
        }
      }
    }
    offerArtworksConnection: artworksConnection(first: 1) {
      edges {
        node {
          ...PartnerOfferArtwork_artwork
        }
      }
    }
  }
`
