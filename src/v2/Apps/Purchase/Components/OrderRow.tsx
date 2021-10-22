import {
  Avatar,
  BorderBox,
  Box,
  Button,
  Flex,
  HelpIcon,
  Image,
  Join,
  Link,
  Separator,
  Text,
} from "@artsy/palette"
import { DateTime } from "luxon"

import * as React from "react";
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { Media } from "v2/Utils/Responsive"
import { OrderRow_order } from "v2/__generated__/OrderRow_order.graphql"
import {
  getOrderColor,
  getOrderIcon,
  getOrderStatus,
  OrderState,
} from "../Utils/orderHelper"
import { LocaleOptions } from "luxon"
import { extractNodes } from "v2/Utils/extractNodes"

interface OrderRowProps {
  order: OrderRow_order
  hasDivider: boolean
}

const StyledImage = styled(Image)`
  object-fit: cover;
  height: 50px;
  width: 50px;
`

const OrderRow: React.FC<OrderRowProps> = props => {
  const { order } = props
  const [lineItem] = extractNodes(order?.lineItems)
  const { artwork, fulfillments } = lineItem
  const orderCreatedAt = DateTime.fromISO(order.createdAt)
  const { creditCard, requestedFulfillment } = order
  const orderStatus = getOrderStatus(order.state as OrderState, lineItem)
  const orderIsInactive =
    orderStatus === "canceled" || orderStatus === "refunded"

  const partnerImageUrl = artwork?.partner?.profile?.icon?.url
  const partnerInitials = artwork?.partner?.initials
  const partnerName = artwork?.partner?.name
  const creditCardNumber = creditCard?.lastDigits
  const fulfillment = requestedFulfillment?.__typename
  const trackingId = fulfillments?.edges?.[0]?.node?.trackingId

  const isPickup = fulfillment === "CommercePickup"

  const artworkImage = artwork ? (
    <StyledImage
      src={artwork.image?.resized?.url}
      alt={artwork.title || undefined}
    />
  ) : (
    <Box width="50px" height="50px" backgroundColor="black10" />
  )

  const orderURL = `/orders/${order.internalID}/status`
  const artworkURL = `/artwork/${artwork?.slug}`
  const artistURL = `/artist/${artwork?.artists?.[0]?.slug}`
  const partnerURL = artwork?.partner?.href!
  const trackingURL = `https://google.com/search?q=${trackingId}`

  const XSOrderRow = (
    <Flex px={2} flexDirection="column">
      <Flex
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        py={2}
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          height="50px"
          width="50px"
          mr={2}
        >
          {artworkImage}
        </Flex>

        <Flex flexDirection="column" justifyContent="center" width="100%">
          <Text variant="sm" letterSpacing="tight">
            {artwork?.artistNames}
          </Text>
          <Text variant="sm" color="black60" letterSpacing="tight">
            {partnerName}
          </Text>
          <Text variant="sm" color="black60" letterSpacing="tight">
            {orderCreatedAt.toLocaleString(
              DateTime.DATE_SHORT as LocaleOptions
            )}
          </Text>
        </Flex>
        <Flex flexDirection="column" alignItems="flex-end">
          <Text
            variant="sm"
            color="black60"
            letterSpacing="tight"
            style={{ textTransform: "capitalize" }}
          >
            {order.buyerTotal}
          </Text>
          <Text
            variant="sm"
            color={getOrderColor(orderStatus)}
            letterSpacing="tight"
            style={{ textTransform: "capitalize" }}
          >
            {orderStatus}
          </Text>
        </Flex>
      </Flex>
      <Flex>
        <Join separator={<Box ml={1} />}>
          {!orderIsInactive && (
            <Box flexGrow={1} mb={2}>
              <Button
                width="100%"
                onClick={() => {
                  window.location.href = orderURL
                }}
                variant="secondaryGray"
              >
                View Order
              </Button>
            </Box>
          )}
          {trackingId && (
            <Box flexGrow={1} mb={2}>
              <Button
                width="100%"
                onClick={() => {
                  window.open(trackingURL)
                }}
              >
                Track Order
              </Button>
            </Box>
          )}
        </Join>
      </Flex>
      {props.hasDivider && <Separator />}
    </Flex>
  )

  const SMOrderRow = (
    <BorderBox my={2} mx={4} p={0} flexDirection="column">
      <Flex
        bg="black5"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Text variant="sm">
          {" "}
          {orderCreatedAt.toLocaleString(DateTime.DATE_MED as LocaleOptions)}
        </Text>
        <Flex alignItems="center">
          {getOrderIcon(orderStatus)}
          <Text
            ml="2px"
            variant="sm"
            color={getOrderColor(orderStatus)}
            style={{ textTransform: "capitalize" }}
          >
            {orderStatus}
          </Text>
          {trackingId && (
            <>
              <Text variant="sm" mx={1}>
                &#8226;
              </Text>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={trackingURL}
              >
                <Text variant="sm">Track order</Text>
              </Link>
            </>
          )}
        </Flex>
      </Flex>
      <Flex p={2} width="100%" alignItems="center">
        <Flex width="50%">
          {artworkImage}
          <Flex flexDirection="column" ml={1}>
            <Link href={artistURL} underlineBehavior="hover">
              <Text variant="sm">{artwork?.artistNames}</Text>
            </Link>
            <Link href={artworkURL} underlineBehavior="hover">
              <Text variant="sm" color="black60">
                {artwork?.title}
              </Text>
            </Link>
          </Flex>
        </Flex>
        <Flex width="50%">
          <Avatar
            size="xs"
            src={partnerImageUrl || undefined}
            initials={partnerInitials || undefined}
          />
          <Flex flexDirection="column" ml={1}>
            <Link href={partnerURL} underlineBehavior="hover">
              <Text variant="sm" color="black60" letterSpacing="tight">
                {partnerName}
              </Text>
            </Link>{" "}
            <Text variant="sm" color="black60">
              {artwork?.shippingOrigin &&
                artwork?.shippingOrigin.replace(/, US/g, "")}
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex px={2}>
        <Separator />
      </Flex>
      <Flex p={2}>
        <Flex flexDirection="column" width="25%">
          <Text variant="sm">Order No.</Text>
          {!orderIsInactive && (
            <Link href={orderURL} underlineBehavior="hover">
              <Text variant="sm" letterSpacing="tight">
                {order.code}
              </Text>
            </Link>
          )}
          {orderIsInactive && (
            <Text variant="sm" letterSpacing="tight">
              {order.code}
            </Text>
          )}
        </Flex>
        <Flex flexDirection="column" width="25%">
          <Text variant="sm">Total</Text>
          <Text variant="sm" color="black60">
            {order.buyerTotal}
          </Text>
        </Flex>
        <Flex flexDirection="column" width="25%">
          <Text variant="sm">Payment Method</Text>
          <Text variant="sm" color="black60">
            {creditCardNumber ? "•••• " + creditCardNumber : "N/A"}
          </Text>
        </Flex>
        <Flex flexDirection="column" width="25%">
          <Text variant="sm">Fulfillment</Text>
          <Text variant="sm" color="black60">
            {isPickup ? "Pickup" : "Delivery"}
          </Text>
        </Flex>
      </Flex>
      <Flex px={2}>
        <Separator />
      </Flex>
      <Flex p={2}>
        <HelpIcon fill="black60" mr="6px" />
        <Text variant="sm" color="black60">
          Need Help?{" "}
        </Text>
        <Link href="mailto:support@artsy.net">
          <Text variant="sm" color="black60" ml="3px">
            Contact Us.
          </Text>
        </Link>
      </Flex>
    </BorderBox>
  )

  return (
    <>
      <Media at="xs">{XSOrderRow}</Media>
      <Media greaterThanOrEqual="sm">{SMOrderRow}</Media>
    </>
  )
}

export const OrderRowFragmentContainer = createFragmentContainer(
  OrderRow as React.ComponentType<OrderRowProps>,
  {
    order: graphql`
      fragment OrderRow_order on CommerceOrder {
        internalID
        code
        state
        mode
        requestedFulfillment {
          ... on CommerceShip {
            __typename
          }
          ... on CommercePickup {
            __typename
          }
          ... on CommerceShipArta {
            __typename
          }
        }
        creditCard {
          lastDigits
        }
        buyerTotal
        createdAt
        itemsTotal
        lineItems {
          edges {
            node {
              shipment {
                status
              }
              artwork {
                slug
                date
                image {
                  resized(width: 55) {
                    url
                  }
                }
                partner {
                  href
                  initials
                  name
                  profile {
                    icon {
                      url(version: "square140")
                    }
                  }
                }
                shippingOrigin
                internalID
                title
                artistNames
                artists {
                  slug
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
