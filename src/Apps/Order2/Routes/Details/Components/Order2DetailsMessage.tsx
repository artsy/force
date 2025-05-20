import { Box, Flex, Link, Spacer, Text } from "@artsy/palette"
import { RouterLink } from "System/Components/RouterLink"
import type { Order2DetailsMessage_order$key } from "__generated__/Order2DetailsMessage_order.graphql"
import { graphql, useFragment } from "react-relay"

interface Order2DetailsMessageProps {
  order: Order2DetailsMessage_order$key
}

export const Order2DetailsMessage = ({ order }: Order2DetailsMessageProps) => {
  const orderData = useFragment(FRAGMENT, order)

  return (
    <Box backgroundColor="mono0" p={2}>
      {getMessageContent(orderData)}
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

const getMessageContent = (order): React.ReactNode => {
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
            The gallery will confirm by {formattedStateExpireTime}.
          </Text>
          <Text variant="sm">
            You can <Link>contact the gallery</Link> with any questions about
            your order.
          </Text>
        </>
      )
    case "SUBMITTED_OFFER":
      return (
        <>
          <Text variant="sm">
            Thank you! Your offer has been submitted. You will receive an email
            shortly with all the details. Please note making an offer doesn’t
            guarantee you the work.
          </Text>
          <Spacer y={2} />
          <Text variant="sm">
            The gallery will confirm by {formattedStateExpireTime}.
          </Text>
          <Text variant="sm">
            You can <Link>contact the gallery</Link> with any questions about
            your order.
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
            {formattedStateExpireTime}.
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
          <Box border="1px solid" borderColor="mono15" p={2}>
            <Text variant="sm" fontWeight="bold">
              Send wire transfer to
            </Text>
            <Spacer y={1} />
            <Text variant="sm">
              Account name: Art.sy Inc.
              <br />
              Account number: 424385142
              <br />
              Routing number: 121000248
              <br />
              International SWIFT: WFBIUS6S
            </Text>
            <Spacer y={4} />
            <Text variant="sm" fontWeight="bold">
              Bank address
            </Text>
            <Spacer y={1} />
            <Text variant="sm">
              Wells Fargo Bank, N.A.
              <br />
              420 Montgomery Street
              <br />
              San Francisco, CA 9410
            </Text>
            <Spacer y={4} />
            <Text variant="sm" fontWeight="bold">
              Add order #{order.code} to the notes section in your wire
              transfer.
            </Text>
            <Spacer y={1} />
            <Text variant="sm">
              If your bank account is not in USD, please reference Artsy’s
              intermediary bank ING Brussels (Intermediary Bank BIC/SWIFT:
              PNBPUS3NNYC) along with Artsy’s international SWIFT (WFBIUS6S)
              when making payment. Ask your bank for further instructions.
            </Text>
          </Box>
        </>
      )
    case "APPROVED_PICKUP":
      return (
        <>
          <Text variant="sm">
            Thank you for your purchase. A specialist will contact you within 2
            business days to coordinate pickup.
          </Text>
          <Text variant="sm">
            You can <Link>contact the gallery</Link> with any questions about
            your order.
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
      return (
        <>
          <Text variant="sm">Your work is on its way.</Text>
          {/* TODO: Add shipping tracking info when available */}
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
    case "CANCELLED_ORDER":
      return (
        <Text variant="sm">
          You can contact <ContactOrdersLink /> with any questions.
        </Text>
      )
    default:
      return ""
  }
}

const FRAGMENT = graphql`
  fragment Order2DetailsMessage_order on Order {
    buyerStateExpiresAt
    code
    internalID
    displayTexts {
      messageType
    }
  }
`
