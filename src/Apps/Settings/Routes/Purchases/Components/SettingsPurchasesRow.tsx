import { appendCurrencySymbol } from "Apps/Order/Utils/currencyUtils"
import { EntityHeaderPlaceholder } from "Components/EntityHeaders/EntityHeaderPlaceholder"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import {
  ActionType,
  type ClickedChangePaymentMethod,
  ContextModule,
  OwnerType,
} from "@artsy/cohesion"
import AlertStrokeIcon from "@artsy/icons/AlertStrokeIcon"
import CheckmarkFillIcon from "@artsy/icons/CheckmarkFillIcon"
import CloseStrokeIcon from "@artsy/icons/CloseStrokeIcon"
import HelpIcon from "@artsy/icons/HelpIcon"
import PendingIcon from "@artsy/icons/PendingIcon"
import {
  Box,
  Button,
  Column,
  EntityHeader,
  Flex,
  GridColumns,
  Image,
  Separator,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Text,
} from "@artsy/palette"
import type {
  CommerceBuyerOfferActionEnum,
  CommerceOrderDisplayStateEnum,
  SettingsPurchasesRow_order$data,
} from "__generated__/SettingsPurchasesRow_order.graphql"
import type { LocaleOptions } from "luxon"
import { DateTime } from "luxon"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

type BuyerDisplayStateEnum =
  | CommerceBuyerOfferActionEnum
  | CommerceOrderDisplayStateEnum

interface SettingsPurchasesRowProps {
  order: SettingsPurchasesRow_order$data
}

interface OrderLinkProps {
  order: SettingsPurchasesRow_order$data
  trackChangePaymentMethodClick: (orderId: string) => () => void
}

interface OrderActionButtonProps {
  displayState: BuyerDisplayStateEnum
  orderId: string
  trackChangePaymentMethodClick: (orderId: string) => () => void
}

const ORDER_LABELS = {
  APPROVED: "Confirmed",
  CANCELED: "Canceled",
  FULFILLED: "Delivered",
  IN_TRANSIT: "Shipped",
  OFFER_RECEIVED: "Counteroffer received",
  PROCESSING: "Processing",
  REFUNDED: "Refunded",
  SUBMITTED: "Pending",
  PROCESSING_APPROVAL: "Payment processing",
  PAYMENT_FAILED: "Payment failed",
} as const

const ORDER_ICONS = {
  APPROVED: <PendingIcon fill="mono100" />,
  CANCELED: <CloseStrokeIcon fill="red100" />,
  FULFILLED: <CheckmarkFillIcon fill="green100" />,
  IN_TRANSIT: <PendingIcon fill="mono60" />,
  OFFER_RECEIVED: <PendingIcon fill="blue100" />,
  PROCESSING: <PendingIcon fill="mono60" />,
  REFUNDED: <CloseStrokeIcon fill="red100" />,
  SUBMITTED: <PendingIcon fill="mono60" />,
  PROCESSING_APPROVAL: <PendingIcon fill="mono60" />,
  PAYMENT_FAILED: <AlertStrokeIcon fill="red100" />,
} as const

const ORDER_COLORS = {
  APPROVED: "mono100",
  CANCELED: "red100",
  FULFILLED: "green100",
  IN_TRANSIT: "mono60",
  OFFER_RECEIVED: "blue100",
  PROCESSING: "mono60",
  REFUNDED: "red100",
  SUBMITTED: "mono60",
  PROCESSING_APPROVAL: "mono60",
  PAYMENT_FAILED: "red100",
} as const

const getPaymentMethodText = (
  paymentMethodDetails: SettingsPurchasesRow_order$data["paymentMethodDetails"],
  creditCardWalletType: SettingsPurchasesRow_order$data["creditCardWalletType"],
) => {
  if (!!creditCardWalletType) {
    switch (creditCardWalletType) {
      case "google_pay":
        return "Google Pay"
      case "apple_pay":
        return "Apple Pay"
      default:
        break
    }
  }
  switch (paymentMethodDetails?.__typename) {
    case "BankAccount":
      return `Bank transfer •••• ${paymentMethodDetails.last4}`
    case "WireTransfer":
      return "Wire transfer"
    case "CreditCard":
      return `Credit card •••• ${paymentMethodDetails.lastDigits}`
    default:
      return "N/A"
  }
}

const OrderLink: FC<OrderLinkProps> = ({
  order,
  trackChangePaymentMethodClick,
}) => {
  const isOrderActive = !["CANCELED", "REFUNDED"].includes(order.displayState)
  const isOrderPaymentFailed = order.displayState === "PAYMENT_FAILED"

  if (isOrderPaymentFailed) {
    return (
      <RouterLink
        inline
        to={`/orders/${order.internalID}/payment/new`}
        onClick={trackChangePaymentMethodClick(order.internalID)}
      >
        {order.code}
      </RouterLink>
    )
  }

  if (isOrderActive) {
    return (
      <RouterLink inline to={`/orders/${order.internalID}/details`}>
        {order.code}
      </RouterLink>
    )
  }

  return <>{order.code}</>
}

const OrderActionButton: FC<OrderActionButtonProps> = ({
  displayState,
  orderId,
  trackChangePaymentMethodClick,
}) => {
  switch (displayState) {
    case "PAYMENT_FAILED":
      return (
        <Button
          // @ts-expect-error
          as={RouterLink}
          to={`/orders/${orderId}/payment/new`}
          variant="primaryBlack"
          size="large"
          width="50%"
          minWidth={["240px", "200px"]}
          my={[1, 0]}
          onClick={trackChangePaymentMethodClick(orderId)}
        >
          Update Payment Method
        </Button>
      )
    case "OFFER_RECEIVED":
      return (
        <Button
          // @ts-expect-error
          as={RouterLink}
          to={`/orders/${orderId}/details`}
          variant="primaryBlack"
          size="large"
          width="50%"
          minWidth={["240px", "200px"]}
          my={[1, 0]}
        >
          Respond to Counteroffer
        </Button>
      )
    default:
      return null
  }
}

const SettingsPurchasesRow: FC<
  React.PropsWithChildren<SettingsPurchasesRowProps>
> = ({ order }) => {
  const [lineItem] = extractNodes(order?.lineItems)
  const { artwork, artworkVersion, fulfillments, shipment } = lineItem
  const { requestedFulfillment, buyerAction } = order

  const orderCreatedAt = DateTime.fromISO(order.createdAt)
  const trackingId = fulfillments?.edges?.[0]?.node?.trackingId
  const trackingUrl = shipment?.trackingUrl
  const image = artworkVersion?.image?.cropped

  const isPrivateSale = order.source === "private_sale"

  // Enritch displayState with buyerState.
  // TODO: figure out how to move it to the server
  let buyerDisplayState: BuyerDisplayStateEnum = order.displayState
  if (
    buyerDisplayState === "SUBMITTED" &&
    !!buyerAction &&
    [
      "OFFER_RECEIVED",
      "OFFER_RECEIVED_CONFIRM_NEEDED",
      "OFFER_ACCEPTED_CONFIRM_NEEDED",
    ].includes(buyerAction)
  ) {
    buyerDisplayState = "OFFER_RECEIVED"
  }
  // if fulfilment with trackingId is present the order is partner shipped
  // and we do not want to display it as delivered.
  // We want the end state to be IN_TRANSIT for pargtner shipped orders
  if (buyerDisplayState === "FULFILLED" && trackingId) {
    buyerDisplayState = "IN_TRANSIT"
  }

  const { trackEvent } = useTracking()
  const trackChangePaymentMethodClick = (orderID: string) => () => {
    const payload: ClickedChangePaymentMethod = {
      action: ActionType.clickedChangePaymentMethod,
      context_module: ContextModule.ordersHistory,
      context_page_owner_type: OwnerType.ordersHistory,
      context_page_owner_id: orderID,
    }

    trackEvent(payload)
  }

  return (
    <Box border="1px solid" borderColor="mono10">
      <Flex bg="mono5" justifyContent="space-between" alignItems="center" p={2}>
        <Text variant="sm-display">
          {orderCreatedAt.toLocaleString(DateTime.DATE_MED as LocaleOptions)}
        </Text>

        <Flex alignItems="center">
          {ORDER_ICONS[buyerDisplayState]}

          <Text
            ml={0.5}
            variant="sm-display"
            color={ORDER_COLORS[buyerDisplayState]}
          >
            {ORDER_LABELS[buyerDisplayState]}
          </Text>

          {/* Only whant to add tracking if order is arta shippied and url is present  */}
          {trackingUrl && (
            <>
              <Text variant="sm-display" mx={1}>
                •
              </Text>

              <RouterLink
                to={trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text variant="sm-display">Track Order</Text>
              </RouterLink>
            </>
          )}
        </Flex>
      </Flex>
      <GridColumns m={2}>
        <Column span={6} display="flex" alignItems="center">
          {image ? (
            <Image
              src={image.src}
              srcSet={image.srcSet}
              alt=""
              width={45}
              height={45}
              lazyLoad
            />
          ) : (
            <Box width={45} height={45} bg="mono10" />
          )}

          <Box ml={1}>
            <Text variant="sm-display">
              <RouterLink
                to={artwork?.artists?.[0]?.href}
                display="block"
                textDecoration="none"
              >
                {artwork?.artistNames}
              </RouterLink>
            </Text>

            <Text variant="xs" color="mono60">
              {isPrivateSale ? (
                artwork?.title
              ) : (
                <RouterLink
                  to={artwork?.href}
                  display="block"
                  color="mono60"
                  textDecoration="none"
                >
                  {artwork?.title}
                </RouterLink>
              )}
            </Text>
          </Box>
        </Column>

        <Column span={6}>
          <Flex
            justifyContent="space-between"
            alignItems={"left"}
            flexDirection={["column", "row"]}
          >
            <EntityHeader
              href={artwork?.partner?.href ?? ""}
              image={{
                ...(artwork?.partner?.profile?.icon?.cropped ?? {}),
                alt: "",
                lazyLoad: true,
              }}
              initials={artwork?.partner?.initials ?? ""}
              meta={artwork?.shippingOrigin?.replace(/, US/g, "")}
              name={artwork?.partner?.name ?? ""}
            />

            <OrderActionButton
              displayState={buyerDisplayState}
              orderId={order.internalID}
              trackChangePaymentMethodClick={trackChangePaymentMethodClick}
            />
          </Flex>
        </Column>

        <Column span={12}>
          <Separator />
        </Column>

        <Column span={3}>
          <Text variant="sm-display">Order No.</Text>

          <Text variant="sm-display" color="mono60">
            <OrderLink
              order={order}
              trackChangePaymentMethodClick={trackChangePaymentMethodClick}
            />
          </Text>
        </Column>

        <Column span={3}>
          <Text variant="sm-display">Total</Text>

          <Text variant="sm-display" color="mono60">
            {appendCurrencySymbol(order.buyerTotal, order.currencyCode)}
          </Text>
        </Column>

        <Column span={3}>
          <Text variant="sm-display">Payment Method</Text>

          <Text variant="sm-display" color="mono60">
            {getPaymentMethodText(
              order.paymentMethodDetails,
              order.creditCardWalletType,
            )}
          </Text>
        </Column>

        <Column span={3}>
          <Text variant="sm-display">Delivery method</Text>

          <Text variant="sm-display" color="mono60">
            {requestedFulfillment?.__typename === "CommercePickup"
              ? "Pickup"
              : "Delivery"}
          </Text>
        </Column>
      </GridColumns>
      <Flex p={2} borderTop="1px solid" borderColor="mono10">
        <HelpIcon fill="mono60" mr={0.5} />

        <Text variant="xs" color="mono60">
          Need Help?{" "}
          {isPrivateSale ? (
            <RouterLink inline to="mailto:privatesales@artsy.net">
              privatesales@artsy.net
            </RouterLink>
          ) : (
            <RouterLink inline to="mailto:support@artsy.net">
              Contact Us.
            </RouterLink>
          )}
        </Text>
      </Flex>
    </Box>
  )
}

export const SettingsPurchasesRowFragmentContainer = createFragmentContainer(
  SettingsPurchasesRow,
  {
    order: graphql`
      fragment SettingsPurchasesRow_order on CommerceOrder {
        source
        internalID
        code
        displayState
        requestedFulfillment {
          __typename
        }
        creditCardWalletType
        paymentMethodDetails {
          __typename
          ... on CreditCard {
            lastDigits
          }
          ... on BankAccount {
            last4
          }
          ... on WireTransfer {
            isManualPayment
          }
        }
        buyerTotal(precision: 2)
        createdAt
        currencyCode
        lineItems {
          edges {
            node {
              artworkVersion {
                image {
                  cropped(width: 45, height: 45) {
                    src
                    srcSet
                  }
                }
              }
              artwork {
                href
                partner {
                  href
                  initials
                  name
                  profile {
                    icon {
                      cropped(width: 45, height: 45) {
                        src
                        srcSet
                      }
                    }
                  }
                }
                shippingOrigin
                title
                artistNames
                artists(shallow: true) {
                  href
                }
              }
              fulfillments(first: 1) {
                edges {
                  node {
                    trackingId
                  }
                }
              }
              shipment {
                trackingUrl
              }
            }
          }
        }
        ... on CommerceOfferOrder {
          buyerAction
        }
      }
    `,
  },
)

export const SettingsPurchasesRowPlaceholder: FC<
  React.PropsWithChildren<unknown>
> = () => {
  return (
    <Skeleton>
      <Box border="1px solid" borderColor="mono10">
        <Box
          display="flex"
          bg="mono5"
          justifyContent="space-between"
          alignItems="center"
          p={2}
        >
          <SkeletonText variant="sm-display">Jan 00, 0000</SkeletonText>

          <SkeletonText variant="xs">Pending</SkeletonText>
        </Box>

        <GridColumns m={2}>
          <Column span={6} display="flex" alignItems="center">
            <SkeletonBox width={45} height={45} />

            <Flex ml={1} flexDirection="column" justifyContent="center">
              <SkeletonText variant="sm-display">Artist Name</SkeletonText>
              <SkeletonText variant="xs">Artwork Title</SkeletonText>
            </Flex>
          </Column>

          <Column span={6}>
            <EntityHeaderPlaceholder />
          </Column>

          <Column span={12}>
            <Separator />
          </Column>

          <Column span={3}>
            <SkeletonText variant="sm-display">Order No.</SkeletonText>
            <SkeletonText variant="sm-display">000000000</SkeletonText>
          </Column>

          <Column span={3}>
            <SkeletonText variant="sm-display">Total</SkeletonText>
            <SkeletonText variant="sm-display">US$00,0000</SkeletonText>
          </Column>

          <Column span={3}>
            <SkeletonText variant="sm-display">Payment Method</SkeletonText>
            <SkeletonText variant="sm-display">•••• 0000</SkeletonText>
          </Column>

          <Column span={3}>
            <SkeletonText variant="sm-display">Delivery method</SkeletonText>
            <SkeletonText variant="sm-display">Delivery</SkeletonText>
          </Column>
        </GridColumns>

        <Flex p={2} borderTop="1px solid" borderColor="mono10">
          <SkeletonText variant="xs">Need Help? Contact Us.</SkeletonText>
        </Flex>
      </Box>
    </Skeleton>
  )
}
