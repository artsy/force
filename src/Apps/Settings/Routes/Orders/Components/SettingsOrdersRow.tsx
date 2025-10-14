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
import { EntityHeaderPlaceholder } from "Components/EntityHeaders/EntityHeaderPlaceholder"
import { RouterLink } from "System/Components/RouterLink"
import type {
  OrderBuyerStateEnum,
  SettingsOrdersRow_order$data,
} from "__generated__/SettingsOrdersRow_order.graphql"
import { DateTime } from "luxon"
import type { LocaleOptions } from "luxon"
import type { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useTracking } from "react-tracking"

interface SettingsOrdersRowProps {
  order: SettingsOrdersRow_order$data
}

interface OrderLinkProps {
  order: SettingsOrdersRow_order$data
  trackChangePaymentMethodClick: (orderId: string) => () => void
}

interface OrderActionButtonProps {
  state: OrderBuyerStateEnum | null | undefined
  actionPrompt: string | null | undefined
  orderId: string
  trackChangePaymentMethodClick: (orderId: string) => () => void
}

const ORDER_ICONS: Record<string, React.ReactElement> = {
  APPROVED: <PendingIcon fill="mono100" />,
  CANCELLED: <CloseStrokeIcon fill="red100" />,
  COMPLETED: <CheckmarkFillIcon fill="green100" />,
  DECLINED_BY_BUYER: <CloseStrokeIcon fill="red100" />,
  DECLINED_BY_SELLER: <CloseStrokeIcon fill="red100" />,
  INCOMPLETE: <PendingIcon fill="mono60" />,
  PAYMENT_FAILED: <AlertStrokeIcon fill="red100" />,
  PROCESSING_OFFLINE_PAYMENT: <PendingIcon fill="mono60" />,
  PROCESSING_PAYMENT: <PendingIcon fill="mono60" />,
  REFUNDED: <CloseStrokeIcon fill="red100" />,
  SHIPPED: <PendingIcon fill="mono60" />,
  SUBMITTED: <PendingIcon fill="mono60" />,
  UNKNOWN: <PendingIcon fill="mono60" />,
} as const

const ORDER_COLORS: Record<string, string> = {
  APPROVED: "mono100",
  CANCELLED: "red100",
  COMPLETED: "green100",
  DECLINED_BY_BUYER: "red100",
  DECLINED_BY_SELLER: "red100",
  INCOMPLETE: "mono60",
  PAYMENT_FAILED: "red100",
  PROCESSING_OFFLINE_PAYMENT: "mono60",
  PROCESSING_PAYMENT: "mono60",
  REFUNDED: "red100",
  SHIPPED: "mono60",
  SUBMITTED: "mono60",
  UNKNOWN: "mono60",
} as const

// TODO: verify how payment method be displayed.
// Could/should we reuse details page display?
const getPaymentMethodText = (
  paymentMethodDetails: SettingsOrdersRow_order$data["paymentMethodDetails"],
  creditCardWalletType: SettingsOrdersRow_order$data["creditCardWalletType"],
) => {
  if (!!creditCardWalletType) {
    switch (creditCardWalletType) {
      case "GOOGLE_PAY":
        return "Google Pay"
      case "APPLE_PAY":
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

// #TODO: details has it's own redirects if order. Maybe be specific with those?
// Can redirect here more proper once states are verified.
const OrderLink: FC<OrderLinkProps> = ({
  order,
  trackChangePaymentMethodClick,
}) => {
  const isOrderActive = !["CANCELLED", "REFUNDED"].includes(
    order.buyerState || "",
  )

  const isOrderPaymentFailed = order.buyerState === "PAYMENT_FAILED"

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
  state,
  actionPrompt,
  orderId,
  trackChangePaymentMethodClick,
}) => {
  if (!actionPrompt) {
    return null
  }

  let route = `/orders/${orderId}/details`

  switch (state) {
    case "PAYMENT_FAILED":
      route = `/orders/${orderId}/payment/new`
      break
    case "OFFER_RECEIVED":
      route = `/orders/${orderId}/respond`
      break
  }

  return (
    <Button
      // @ts-ignore
      as={RouterLink}
      to={route}
      variant="primaryBlack"
      size="large"
      width="50%"
      minWidth={["240px", "200px"]}
      my={[1, 0]}
      onClick={trackChangePaymentMethodClick(orderId)}
    >
      {actionPrompt}
    </Button>
  )
}

const SettingsOrdersRow: FC<
  React.PropsWithChildren<SettingsOrdersRowProps>
> = ({ order }) => {
  const lineItem = order.lineItems?.[0]
  const artwork = lineItem?.artwork
  const artworkVersion = lineItem?.artworkVersion
  const image = artworkVersion?.image?.cropped

  const isPrivateSale = order.source === "PRIVATE_SALE"

  const buyerState = order.buyerState || "UNKNOWN"

  const orderCreatedAt = DateTime.fromISO(order.createdAt || "")

  // TODO: Order type doesn't have tracking info structured the same way
  const trackingUrl = null

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
          {ORDER_ICONS[buyerState]}

          <Text ml={0.5} variant="sm-display" color={ORDER_COLORS[buyerState]}>
            {order.displayTexts.stateName}
          </Text>

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
                to={artwork?.artists?.[0]?.href || "#"}
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
                  to={artwork?.href || "#"}
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
              meta={artwork?.shippingOrigin?.replace(/, US/g, "") ?? ""}
              name={artwork?.partner?.name ?? ""}
            />

            <OrderActionButton
              state={buyerState}
              actionPrompt={order.displayTexts.actionPrompt}
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
            {order.buyerTotal?.display || "N/A"}
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
            {/* TODO: Need to determine fulfillment type from Order.fulfillmentDetails */}
            Delivery
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

export const SettingsOrdersRowFragmentContainer = createFragmentContainer(
  SettingsOrdersRow,
  {
    order: graphql`
      fragment SettingsOrdersRow_order on Order {
        source
        internalID
        code
        buyerState
        createdAt
        creditCardWalletType
        displayTexts {
          stateName
          actionPrompt
        }
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
        buyerTotal {
          display
        }
        currencyCode
        lineItems {
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
          artworkVersion {
            image {
              cropped(width: 45, height: 45) {
                src
                srcSet
              }
            }
          }
        }
      }
    `,
  },
)

export const SettingsOrdersRowPlaceholder: FC<
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
