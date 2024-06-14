import {
  Box,
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
import { DateTime } from "luxon"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "System/Components/RouterLink"
import { SettingsPurchasesRow_order$data } from "__generated__/SettingsPurchasesRow_order.graphql"
import { LocaleOptions } from "luxon"
import { extractNodes } from "Utils/extractNodes"
import { appendCurrencySymbol } from "Apps/Order/Utils/currencyUtils"
import { EntityHeaderPlaceholder } from "Components/EntityHeaders/EntityHeaderPlaceholder"
import CloseStrokeIcon from "@artsy/icons/CloseStrokeIcon"
import HelpIcon from "@artsy/icons/HelpIcon"
import CheckmarkFillIcon from "@artsy/icons/CheckmarkFillIcon"
import PendingIcon from "@artsy/icons/PendingIcon"

const ORDER_LABELS = {
  APPROVED: "Confirmed",
  CANCELED: "Canceled",
  FULFILLED: "Delivered",
  IN_TRANSIT: "In transit",
  PROCESSING: "Processing",
  REFUNDED: "Refunded",
  SUBMITTED: "Pending",
  PROCESSING_APPROVAL: "Payment processing",
} as const

const ORDER_ICONS = {
  APPROVED: <PendingIcon fill="black100" />,
  CANCELED: <CloseStrokeIcon fill="red100" />,
  FULFILLED: <CheckmarkFillIcon fill="green100" />,
  IN_TRANSIT: <PendingIcon fill="black60" />,
  PROCESSING: <PendingIcon fill="black60" />,
  REFUNDED: <CloseStrokeIcon fill="red100" />,
  SUBMITTED: <PendingIcon fill="black60" />,
  PROCESSING_APPROVAL: <PendingIcon fill="black60" />,
} as const

const ORDER_COLORS = {
  APPROVED: "black100",
  CANCELED: "red100",
  FULFILLED: "green100",
  IN_TRANSIT: "black60",
  PROCESSING: "black60",
  REFUNDED: "red100",
  SUBMITTED: "black60",
  PROCESSING_APPROVAL: "black60",
} as const

const getPaymentMethodText = (
  paymentMethodDetails: SettingsPurchasesRow_order$data["paymentMethodDetails"]
) => {
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

interface SettingsPurchasesRowProps {
  order: SettingsPurchasesRow_order$data
}

const SettingsPurchasesRow: FC<SettingsPurchasesRowProps> = ({ order }) => {
  const [lineItem] = extractNodes(order?.lineItems)
  const { artwork, artworkVersion, fulfillments } = lineItem
  const { requestedFulfillment } = order

  const orderCreatedAt = DateTime.fromISO(order.createdAt)
  const isOrderActive = order.state !== "CANCELED" && order.state !== "REFUNDED"
  const trackingId = fulfillments?.edges?.[0]?.node?.trackingId
  const image = artworkVersion?.image?.cropped

  const isPrivateSale = order.source === "private_sale"

  return (
    <Box border="1px solid" borderColor="black10">
      <Flex
        bg="black5"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Text variant="sm-display">
          {orderCreatedAt.toLocaleString(DateTime.DATE_MED as LocaleOptions)}
        </Text>

        <Flex alignItems="center">
          {ORDER_ICONS[order.displayState]}

          <Text
            ml={0.5}
            variant="sm-display"
            color={ORDER_COLORS[order.displayState]}
          >
            {ORDER_LABELS[order.displayState]}
          </Text>

          {trackingId && (
            <>
              <Text variant="sm-display" mx={1}>
                •
              </Text>

              <RouterLink
                to={`https://google.com/search?q=${trackingId}`}
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
            <Box width={45} height={45} bg="black10" />
          )}

          <Box ml={1}>
            <Text variant="sm-display">
              <RouterLink
                to={artwork?.artists?.[0]?.href!}
                display="block"
                textDecoration="none"
              >
                {artwork?.artistNames}
              </RouterLink>
            </Text>

            <Text variant="xs" color="black60">
              {isPrivateSale ? (
                artwork?.title
              ) : (
                <RouterLink
                  to={artwork?.href!}
                  display="block"
                  color="black60"
                  textDecoration="none"
                >
                  {artwork?.title}
                </RouterLink>
              )}
            </Text>
          </Box>
        </Column>

        <Column span={6}>
          <EntityHeader
            href={artwork?.partner?.href!}
            image={{
              ...(artwork?.partner?.profile?.icon?.cropped ?? {}),
              alt: "",
              lazyLoad: true,
            }}
            initials={artwork?.partner?.initials!}
            meta={artwork?.shippingOrigin?.replace(/, US/g, "")}
            name={artwork?.partner?.name!}
          />
        </Column>

        <Column span={12}>
          <Separator />
        </Column>

        <Column span={3}>
          <Text variant="sm-display">Order No.</Text>

          <Text variant="sm-display" color="black60">
            {isOrderActive ? (
              <RouterLink inline to={`/orders/${order.internalID}/status`}>
                {order.code}
              </RouterLink>
            ) : (
              order.code
            )}
          </Text>
        </Column>

        <Column span={3}>
          <Text variant="sm-display">Total</Text>

          <Text variant="sm-display" color="black60">
            {appendCurrencySymbol(order.buyerTotal, order.currencyCode)}
          </Text>
        </Column>

        <Column span={3}>
          <Text variant="sm-display">Payment Method</Text>

          <Text variant="sm-display" color="black60">
            {getPaymentMethodText(order.paymentMethodDetails)}
          </Text>
        </Column>

        <Column span={3}>
          <Text variant="sm-display">Delivery method</Text>

          <Text variant="sm-display" color="black60">
            {requestedFulfillment?.__typename === "CommercePickup"
              ? "Pickup"
              : "Delivery"}
          </Text>
        </Column>
      </GridColumns>

      <Flex p={2} borderTop="1px solid" borderColor="black10">
        <HelpIcon fill="black60" mr={0.5} />

        <Text variant="xs" color="black60">
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
        state
        requestedFulfillment {
          __typename
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
                artists {
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
            }
          }
        }
      }
    `,
  }
)

export const SettingsPurchasesRowPlaceholder: FC = () => {
  return (
    <Skeleton>
      <Box border="1px solid" borderColor="black10">
        <Box
          display="flex"
          bg="black5"
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

        <Flex p={2} borderTop="1px solid" borderColor="black10">
          <SkeletonText variant="xs">Need Help? Contact Us.</SkeletonText>
        </Flex>
      </Box>
    </Skeleton>
  )
}
