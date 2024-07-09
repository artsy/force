import { Flex, Spacer, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import { FC } from "react"
import { useFragment, graphql } from "react-relay"
import { PartnerOfferCreatedNotification_notification$key } from "__generated__/PartnerOfferCreatedNotification_notification.graphql"
import { extractNodes } from "Utils/extractNodes"
import { ExpiresInTimer } from "Components/Notifications/ExpiresInTimer"
import { BASE_SAVES_PATH } from "Apps/CollectorProfile/constants"
import { PartnerOfferArtwork } from "Components/Notifications/PartnerOfferArtwork"
import { NotificationErrorMessage } from "Components/Notifications/NotificationErrorMessage"
import { useTimer } from "Utils/Hooks/useTimer"
import { NotificationWrapper } from "Components/Notifications/Notification"

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

  const partnerOffer = item?.partnerOffer
  const artwork = extractNodes(offerArtworksConnection)[0]
  const { hasEnded } = useTimer(partnerOffer?.endAt || "")
  const isOfferFromSaves = partnerOffer?.source === "SAVE"

  let subtitle = isOfferFromSaves
    ? "Review the offer on your saved artwork"
    : "Review the offer before it expires"

  if (hasEnded)
    subtitle =
      "This offer has expired. View Work to make an offer, purchase or contact the gallery"
  if (!partnerOffer?.isAvailable)
    subtitle =
      "Sorry, this artwork is sold or no longer available. Please create an alert or contact orders@artsy.net to find similar artworks"

  if (!item || !offerArtworksConnection || !item.partnerOffer) {
    return <NotificationErrorMessage />
  }

  return (
    <NotificationWrapper>
      <Flex width="100%" justifyContent="space-between">
        <Text
          variant="xs"
          color="blue100"
          backgroundColor="blue10"
          px={0.5}
          borderRadius={3}
        >
          Limited-Time Offer
        </Text>
        {isOfferFromSaves && (
          <RouterLink to={BASE_SAVES_PATH} data-testid="manage-saves-link">
            <Text variant="xs">Manage Saves</Text>
          </RouterLink>
        )}
      </Flex>
      <Flex width="100%" justifyContent="space-between">
        <Flex flex={1}>
          <Text variant="lg-display">{headline}</Text>
        </Flex>
      </Flex>

      <Text variant="sm-display">{subtitle}</Text>

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
          expiresAt={partnerOffer?.endAt}
          available={partnerOffer?.isAvailable}
        />
      </Flex>

      <Spacer y={4} />

      <Flex flexDirection="column" alignItems="center">
        <PartnerOfferArtwork
          artwork={artwork}
          targetHref={targetHref}
          endAt={partnerOffer?.endAt}
          note={partnerOffer?.note}
          available={partnerOffer?.isAvailable}
          partnerOfferID={partnerOffer?.internalID}
          priceWithDiscount={partnerOffer?.priceWithDiscount?.display}
        />
      </Flex>
    </NotificationWrapper>
  )
}

export const PartnerOfferCreatedNotificationFragment = graphql`
  fragment PartnerOfferCreatedNotification_notification on Notification {
    headline
    targetHref
    item {
      ... on PartnerOfferCreatedNotificationItem {
        partnerOffer {
          internalID
          endAt
          isAvailable
          note
          source
          priceWithDiscount {
            display
          }
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
