import {
  Box,
  CheckCircleFillIcon,
  Column,
  EntityHeader,
  Flex,
  GridColumns,
  HelpIcon,
  Image,
  PendingCircleIcon,
  Separator,
  Skeleton,
  SkeletonBox,
  SkeletonText,
  Text,
  XCircleIcon,
} from "@artsy/palette"
import { DateTime } from "luxon"
import { FC } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { RouterLink } from "v2/System/Router/RouterLink"
import { SettingsPurchasesRow_order } from "v2/__generated__/SettingsPurchasesRow_order.graphql"
import { LocaleOptions } from "luxon"
import { extractNodes } from "v2/Utils/extractNodes"
import { appendCurrencySymbol } from "v2/Apps/Order/Utils/currencyUtils"
import { EntityHeaderPlaceholder } from "v2/Components/EntityHeaders/EntityHeaderPlaceholder"

const ORDER_LABELS = {
  APPROVED: "Confirmed",
  CANCELED: "Canceled",
  FULFILLED: "Delivered",
  IN_TRANSIT: "In transit",
  PROCESSING: "Processing",
  REFUNDED: "Refunded",
  SUBMITTED: "Pending",
} as const

const ORDER_ICONS = {
  APPROVED: <PendingCircleIcon fill="black60" />,
  CANCELED: <XCircleIcon fill="red100" />,
  FULFILLED: <CheckCircleFillIcon />,
  IN_TRANSIT: <PendingCircleIcon fill="black60" />,
  PROCESSING: <PendingCircleIcon fill="black60" />,
  REFUNDED: <XCircleIcon fill="red100" />,
  SUBMITTED: <PendingCircleIcon fill="black60" />,
} as const

const ORDER_COLORS = {
  APPROVED: "black60",
  CANCELED: "red100",
  FULFILLED: "black100",
  IN_TRANSIT: "black100",
  PROCESSING: "black60",
  REFUNDED: "red100",
  SUBMITTED: "black60",
} as const

interface SettingsPurchasesRowProps {
  order: SettingsPurchasesRow_order
}

const SettingsPurchasesRow: FC<SettingsPurchasesRowProps> = ({ order }) => {
  const [lineItem] = extractNodes(order?.lineItems)
  const { artwork, fulfillments } = lineItem
  const { creditCard, requestedFulfillment } = order

  const orderCreatedAt = DateTime.fromISO(order.createdAt)
  const isOrderActive = order.state !== "CANCELED" && order.state !== "REFUNDED"
  const trackingId = fulfillments?.edges?.[0]?.node?.trackingId
  const image = artwork?.image?.cropped

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
            variant="xs"
            color={ORDER_COLORS[order.displayState]}
            textTransform="uppercase"
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
              <RouterLink
                to={artwork?.href!}
                display="block"
                color="black60"
                textDecoration="none"
              >
                {artwork?.title}
              </RouterLink>
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
              <RouterLink to={`/orders/${order.internalID}/status`}>
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
            {creditCard?.lastDigits ? `•••• ${creditCard.lastDigits}` : "N/A"}
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
          <RouterLink to="mailto:support@artsy.net">Contact Us.</RouterLink>
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
        internalID
        code
        displayState
        state
        requestedFulfillment {
          __typename
        }
        creditCard {
          lastDigits
        }
        buyerTotal(precision: 2)
        createdAt
        currencyCode
        lineItems {
          edges {
            node {
              artwork {
                href
                image {
                  cropped(width: 45, height: 45) {
                    src
                    srcSet
                  }
                }
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

          <SkeletonText variant="xs" textTransform="uppercase">
            Pending
          </SkeletonText>
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
