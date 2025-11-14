import { useOrder2Tracking } from "Apps/Order2/Hooks/useOrder2Tracking"
import { RouterLink } from "System/Components/RouterLink"
import { Box, Flex, Spacer, Text } from "@artsy/palette"
import type { OrderDetailsMessage_me$key } from "__generated__/OrderDetailsMessage_me.graphql"
import type {
  OrderDetailsMessage_order$data,
  OrderDetailsMessage_order$key,
} from "__generated__/OrderDetailsMessage_order.graphql"
import { graphql, useFragment } from "react-relay"
import { WireTransferInfo } from "./WireTransferInfo"

interface OrderDetailsMessageProps {
  order: OrderDetailsMessage_order$key
  me: OrderDetailsMessage_me$key
}

export const OrderDetailsMessage = ({
  order,
  me,
}: OrderDetailsMessageProps) => {
  const orderData = useFragment(ORDER_FRAGMENT, order)
  const meData = useFragment(ME_FRAGMENT, me)

  const collectorProfile = meData?.collectorProfile
  const hasIncompleteProfile = !(
    collectorProfile?.location?.country &&
    collectorProfile?.isEmailConfirmed &&
    collectorProfile?.profession &&
    collectorProfile?.isIdentityVerified &&
    collectorProfile?.otherRelevantPositions &&
    collectorProfile?.bio
  )

  return (
    <Box backgroundColor="mono0" px={[2, 4]} py={2}>
      <MessageContent
        order={orderData}
        hasIncompleteProfile={hasIncompleteProfile}
      />
    </Box>
  )
}

const YourCollectionNote: React.FC = () => (
  <Text variant="sm">
    This artwork will be added to{" "}
    <RouterLink to="/collector-profile/my-collection" display="inline">
      your Collection on Artsy
    </RouterLink>
    .
  </Text>
)

const NumberedListItem: React.FC<{
  children: React.ReactNode
  index: number
}> = ({ children, index }) => (
  <Flex flexDirection="row">
    <Flex minWidth={20}>
      <Text>{index}.</Text>
    </Flex>
    <Flex>{children}</Flex>
  </Flex>
)

const ContactOrdersLink: React.FC = () => (
  <RouterLink to="mailto:orders@artsy.net" display="inline">
    orders@artsy.net
  </RouterLink>
)

interface MessageContentProps {
  order: OrderDetailsMessage_order$data
  hasIncompleteProfile: boolean
}
const MessageContent = ({
  order,
  hasIncompleteProfile,
}: MessageContentProps): React.ReactNode => {
  const tracking = useOrder2Tracking(order.source, order.mode)

  const messageType = order.displayTexts.messageType

  const formattedStateExpireTime =
    order.buyerStateExpiresAt &&
    new Date(order.buyerStateExpiresAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZoneName: "short",
    })

  switch (messageType) {
    case "SUBMITTED_ORDER":
      return (
        <>
          <Text variant="sm">
            Thank you! Your order is being processed. You will receive an email
            shortly with all the details.
          </Text>
          <Spacer y={2} />
          <Text variant="sm">
            The gallery will confirm by <b>{formattedStateExpireTime}</b>.
            {hasIncompleteProfile && (
              <CompleteCollectorProfilePrompt tracking={tracking} />
            )}
          </Text>
          <Spacer y={2} />
          <Text variant="sm">
            You can contact the gallery with any questions about your order.
          </Text>
        </>
      )
    case "SUBMITTED_OFFER":
      return (
        <>
          <Text variant="sm">
            Thank you! Your offer has been submitted. You will receive an email
            shortly with all the details. Please note making an offer
            doesn&rsquo;t guarantee you the work.
          </Text>
          <Spacer y={2} />
          <Text variant="sm">
            The gallery will respond to your offer by{" "}
            <b>{formattedStateExpireTime}</b>.
            {hasIncompleteProfile && (
              <CompleteCollectorProfilePrompt tracking={tracking} />
            )}
          </Text>
          <Spacer y={2} />
          <Text variant="sm">
            You can{" "}
            {!!order.impulseConversationId ? (
              <RouterLink
                to={`/user/conversations/${order.impulseConversationId}`}
                onClick={() => tracking.clickedContactGallery(order.internalID)}
              >
                contact the gallery
              </RouterLink>
            ) : (
              <a
                href="/user/conversations"
                onClick={() => {
                  tracking.clickedContactGallery(order.internalID)
                }}
              >
                contact the gallery
              </a>
            )}{" "}
            with any questions about your offer.
          </Text>
        </>
      )
    case "PAYMENT_FAILED":
      return (
        <>
          <Text variant="sm">
            To complete your purchase, please{" "}
            <RouterLink to={`/orders/${order.internalID}/payment/new`}>
              update your payment details
            </RouterLink>{" "}
            or provide an alternative payment method by{" "}
            <b>{formattedStateExpireTime}</b>.
          </Text>
        </>
      )
    case "PROCESSING_PAYMENT_PICKUP":
      return (
        <Text variant="sm">
          Thank you for your purchase. You will be notified when the work is
          available for pickup.
        </Text>
      )
    case "PROCESSING_PAYMENT_SHIP":
      return (
        <Text variant="sm">
          Thank you for your purchase. You will be notified when the work has
          shipped.
        </Text>
      )
    case "PROCESSING_WIRE":
      return (
        <>
          <Text variant="sm">
            Your order has been confirmed. Thank you for your purchase.
          </Text>
          <Spacer y={2} />
          <Text variant="sm" fontWeight="bold">
            Please proceed with the wire transfer within 7 days to complete your
            purchase.
          </Text>
          <Spacer y={1} />
          <NumberedListItem index={1}>
            Find the total amount due and Artsy's banking details below.
          </NumberedListItem>
          <NumberedListItem index={2}>
            Please inform your bank that you are responsible for all wire
            transfer fees.
          </NumberedListItem>
          <NumberedListItem index={3}>
            <Text>
              Please make the transfer in the currency displayed on the order
              breakdown and then email proof of payment to <ContactOrdersLink />
              .
            </Text>
          </NumberedListItem>
          <Spacer y={2} />
          <WireTransferInfo order={order} />
        </>
      )
    case "APPROVED_PICKUP":
      return (
        <>
          <Text variant="sm">
            Thank you for your purchase. A specialist will contact you within 2
            business days to coordinate pickup.
          </Text>
          <Spacer y={2} />
          <Text variant="sm">
            You can contact the gallery with any questions about your order.
          </Text>
        </>
      )
    case "APPROVED_SHIP_EXPRESS":
      return (
        <>
          <Text variant="sm">
            Your order has been confirmed. Thank you for your purchase.
          </Text>
          <Spacer y={2} />
          <Text variant="sm">
            Your order will be processed and packaged, and you will be notified
            once it ships.
          </Text>
          <Text variant="sm">
            Once shipped, your order will be delivered in 2 business days.
          </Text>
        </>
      )
    case "APPROVED_SHIP_STANDARD":
      return (
        <>
          <Text variant="sm">
            Your order has been confirmed. Thank you for your purchase.
          </Text>
          <Spacer y={2} />
          <Text variant="sm">
            Your order will be processed and packaged, and you will be notified
            once it ships.
          </Text>
          <Text variant="sm">
            Once shipped, your order will be delivered in 3-5 business days.
          </Text>
        </>
      )
    case "APPROVED_SHIP_WHITE_GLOVE":
      return (
        <>
          <Text variant="sm">
            Your order has been confirmed. Thank you for your purchase.
          </Text>
          <Spacer y={2} />
          <Text variant="sm">
            Once shipped, you will receive a notification and further details.
          </Text>
          <Text variant="sm">
            You can contact <ContactOrdersLink /> with any questions.
          </Text>
        </>
      )
    case "APPROVED_SHIP":
      return (
        <>
          <Text variant="sm">
            Your order has been confirmed. Thank you for your purchase.
          </Text>
          <Spacer y={2} />
          <Text variant="sm">
            You will be notified when the work has shipped, typically within 5-7
            business days.
          </Text>
          <Text variant="sm">
            You can contact <ContactOrdersLink /> with any questions.
          </Text>
        </>
      )
    case "SHIPPED":
      const {
        shipperName,
        trackingNumber,
        trackingURL,
        estimatedDelivery,
        estimatedDeliveryWindow,
      } = order.deliveryInfo || {}

      const isDeliveryInfoPresent =
        shipperName ||
        trackingNumber ||
        trackingURL ||
        estimatedDelivery ||
        estimatedDeliveryWindow

      const formattedEstimatedDelivery =
        estimatedDelivery &&
        new Date(estimatedDelivery).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      const estimatedDeliveryDisplay =
        (estimatedDeliveryWindow || formattedEstimatedDelivery) &&
        (estimatedDeliveryWindow
          ? estimatedDeliveryWindow
          : formattedEstimatedDelivery)

      return (
        <>
          <Text variant="sm">Your work is on its way.</Text>
          {isDeliveryInfoPresent && (
            <>
              <Spacer y={2} />
              {shipperName && <Text variant="sm">Shipper: {shipperName}</Text>}
              {trackingNumber && (
                <Text variant="sm">
                  Tracking:{" "}
                  {trackingURL ? (
                    <RouterLink
                      to={trackingURL}
                      target="_blank"
                      display="inline"
                    >
                      {trackingNumber}
                    </RouterLink>
                  ) : (
                    trackingNumber
                  )}
                </Text>
              )}
              {estimatedDeliveryDisplay && (
                <Text variant="sm">
                  Estimated delivery: {estimatedDeliveryDisplay}
                </Text>
              )}
            </>
          )}
          <Spacer y={2} />
          <YourCollectionNote />
        </>
      )
    case "COMPLETED_PICKUP":
    case "COMPLETED_SHIP":
      return (
        <>
          <Text variant="sm">We hope you love your purchase!</Text>
          <Text variant="sm">
            Your feedback is valuable—share any thoughts with us at{" "}
            <ContactOrdersLink />.
          </Text>
          <Spacer y={2} />
          <YourCollectionNote />
        </>
      )
    case "CANCELED":
      return (
        <Text variant="sm">
          Your order could not be processed. You can contact{" "}
          <ContactOrdersLink /> with any questions.
        </Text>
      )
    case "DECLINED_BY_BUYER":
      return (
        <>
          <Text variant="sm">
            Thank you for your response. The seller will be informed of your
            decision to decline the offer, ending the current negotiation.
          </Text>
          <Spacer y={2} />
          <Text variant="sm">
            We’d love to hear your feedback—reach out to us at{" "}
            <ContactOrdersLink /> with any thoughts.
          </Text>
        </>
      )
    case "DECLINED_BY_SELLER":
      return (
        <>
          <Text variant="sm">
            Unfortunately, the seller declined your offer, ending the current
            negotiation.
          </Text>
          <Text variant="sm">
            You can contact the gallery with any questions.
          </Text>
        </>
      )
    case "REFUNDED":
      return (
        <>
          <Text variant="sm">
            Your refund will appear on your bank statement within 5-7 business
            days.
          </Text>
          <Spacer y={2} />
          <Text variant="sm">
            You can contact <ContactOrdersLink /> with any questions.
          </Text>
        </>
      )
    default:
      return ""
  }
}

interface CompleteCollectorProfilePromptProps {
  tracking: ReturnType<typeof useOrder2Tracking>
}

const CompleteCollectorProfilePrompt: React.FC<
  CompleteCollectorProfilePromptProps
> = ({ tracking }) => (
  <>
    {" "}
    You're more likely to receive quick responses from galleries by{" "}
    <RouterLink
      onClick={() => {
        tracking.clickedCompleteYourProfile()
      }}
      to="/settings/edit-profile"
      target="_blank"
      display="inline"
    >
      completing your profile
    </RouterLink>
    .
  </>
)

const ME_FRAGMENT = graphql`
  fragment OrderDetailsMessage_me on Me {
    collectorProfile {
      isEmailConfirmed
      location {
        country
      }
      profession
      isIdentityVerified
      otherRelevantPositions
      bio
    }
  }
`

const ORDER_FRAGMENT = graphql`
  fragment OrderDetailsMessage_order on Order {
    buyerStateExpiresAt
    code
    currencyCode
    internalID
    impulseConversationId
    displayTexts {
      messageType
    }
    deliveryInfo {
      shipperName
      trackingNumber
      trackingURL
      estimatedDelivery
      estimatedDeliveryWindow
    }
    source
    mode
  }
`
