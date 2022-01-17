import {
  Avatar,
  BorderBox,
  Box,
  Button,
  Flex,
  HelpIcon,
  Image,
  Join,
  Separator,
  Text,
} from "@artsy/palette"
import { DateTime } from "luxon"

import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { RouterLink } from "v2/System/Router/RouterLink"
import { Media } from "v2/Utils/Responsive"
import { OrderRow_order } from "v2/__generated__/OrderRow_order.graphql"
import {
  getOrderColor,
  getOrderIcon,
  getOrderDisplayStateString,
} from "v2/Apps/Purchase/Utils/orderHelper"
import { LocaleOptions } from "luxon"
import { extractNodes } from "v2/Utils/extractNodes"
import { appendCurrencySymbol } from "v2/Apps/Order/Utils/currencyUtils"

interface OrderRowProps {
  order: OrderRow_order
  hasDivider: boolean
}

const StyledImage = styled(Image)`
  object-fit: cover;
  height: 50px;
  width: 50px;
`

const UnderlineOnHoverLink = styled(RouterLink)`
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`

const OrderRow: React.FC<OrderRowProps> = props => {
  const { order } = props
  const displayState = order.displayState
  const [lineItem] = extractNodes(order?.lineItems)
  const { artwork, fulfillments } = lineItem
  const orderCreatedAt = DateTime.fromISO(order.createdAt)
  const { creditCard, requestedFulfillment } = order
  const orderIsActive = order.state !== "CANCELED" && order.state !== "REFUNDED"

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
  const currency = order.currencyCode

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
            {appendCurrencySymbol(order.buyerTotal, currency)}
          </Text>
          <Text
            variant="sm"
            color={getOrderColor(displayState)}
            letterSpacing="tight"
            style={{ textTransform: "capitalize" }}
          >
            {getOrderDisplayStateString(displayState)}
          </Text>
        </Flex>
      </Flex>
      <Flex>
        <Join separator={<Box ml={1} />}>
          {orderIsActive && (
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
          {getOrderIcon(displayState)}
          <Text
            ml="2px"
            variant="sm"
            color={getOrderColor(displayState)}
            style={{ textTransform: "capitalize" }}
          >
            {getOrderDisplayStateString(displayState)}
          </Text>
          {trackingId && (
            <>
              <Text variant="sm" mx={1}>
                &#8226;
              </Text>
              <RouterLink
                to={trackingURL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text variant="sm">Track order</Text>
              </RouterLink>
            </>
          )}
        </Flex>
      </Flex>
      <Flex p={2} width="100%" alignItems="center">
        <Flex width="50%">
          {artworkImage}
          <Flex flexDirection="column" ml={1}>
            <UnderlineOnHoverLink to={artistURL}>
              <Text variant="sm">{artwork?.artistNames}</Text>
            </UnderlineOnHoverLink>
            <UnderlineOnHoverLink to={artworkURL}>
              <Text variant="sm" color="black60">
                {artwork?.title}
              </Text>
            </UnderlineOnHoverLink>
          </Flex>
        </Flex>
        <Flex width="50%">
          <Avatar
            size="xs"
            src={partnerImageUrl || undefined}
            initials={partnerInitials || undefined}
          />
          <Flex flexDirection="column" ml={1}>
            <UnderlineOnHoverLink to={partnerURL}>
              <Text variant="sm" color="black60" letterSpacing="tight">
                {partnerName}
              </Text>
            </UnderlineOnHoverLink>{" "}
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
          {orderIsActive ? (
            <UnderlineOnHoverLink to={orderURL}>
              <Text variant="sm" letterSpacing="tight">
                {order.code}
              </Text>
            </UnderlineOnHoverLink>
          ) : (
            <Text variant="sm" letterSpacing="tight">
              {order.code}
            </Text>
          )}
        </Flex>
        <Flex flexDirection="column" width="25%">
          <Text variant="sm">Total</Text>
          <Text variant="sm" color="black60">
            {appendCurrencySymbol(order.buyerTotal, currency)}
          </Text>
        </Flex>
        <Flex flexDirection="column" width="25%">
          <Text variant="sm">Payment Method</Text>
          <Text variant="sm" color="black60">
            {creditCardNumber ? "•••• " + creditCardNumber : "N/A"}
          </Text>
        </Flex>
        <Flex flexDirection="column" width="25%">
          <Text variant="sm">Delivery method</Text>
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
        <RouterLink to="mailto:support@artsy.net">
          <Text variant="sm" color="black60" ml="3px">
            Contact Us.
          </Text>
        </RouterLink>
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
        displayState
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
        buyerTotal(precision: 2)
        createdAt
        itemsTotal
        currencyCode
        lineItems {
          edges {
            node {
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
