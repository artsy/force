import {
  Avatar,
  BorderBox,
  Box,
  Flex,
  HelpIcon,
  Image,
  Link,
  Separator,
  Text,
} from "@artsy/palette"
import { DateTime } from "luxon"

import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import styled from "styled-components"
import { Media } from "v2/Utils/Responsive"
import { OrderRow_order } from "v2/__generated__/OrderRow_order.graphql"
import { getOrderColor, getOrderIcon } from "../Utils/orderHelper"

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
  const artwork = order.lineItems.edges[0].node.artwork

  const orderCreatedAt = DateTime.fromISO(order.createdAt)

  const { creditCard, requestedFulfillment } = order

  const orderIsInactive =
    order.state === "CANCELED" || order.state === "REFUNDED"

  const partnerImageUrl = artwork?.partner?.profile?.icon?.url
  const partnerInitials = artwork?.partner?.initials
  const partnerName = artwork?.partner?.name
  const creditCardNumber = creditCard?.lastDigits
  const fulfillment = requestedFulfillment?.__typename

  const isShip = fulfillment === "CommerceShip"

  const artworkImage = artwork ? (
    <StyledImage src={artwork.image?.resized?.url} alt={artwork.title} />
  ) : (
    <Box width="50px" height="50px" backgroundColor="black10" />
  )

  const XSOrderRow = (
    <Box px={2}>
      <Flex
        py={1.5}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex
          alignItems="center"
          justifyContent="center"
          height="50px"
          width="50px"
          mr={1.5}
        >
          {artworkImage}
        </Flex>

        <Flex flexDirection="column" justifyContent="center" width="100%">
          {!orderIsInactive && (
            <Link
              href={`/orders/${order.internalID}/status`}
              underlineBehavior="hover"
            >
              <Text variant="text" letterSpacing="tight">
                {artwork?.artist_names}
              </Text>
            </Link>
          )}
          {orderIsInactive && (
            <Text variant="text" letterSpacing="tight">
              {artwork?.artist_names}
            </Text>
          )}
          <Text variant="text" color="black60" letterSpacing="tight">
            {artwork?.partner?.name}
          </Text>
          <Text variant="text" color="black60" letterSpacing="tight">
            {orderCreatedAt.toLocaleString(DateTime.DATE_SHORT)}
          </Text>
        </Flex>
        <Flex flexDirection="column" alignItems="flex-end">
          <Text
            variant="text"
            color="black60"
            letterSpacing="tight"
            style={{ textTransform: "capitalize" }}
          >
            {order.buyerTotal}
          </Text>
          <Text
            variant="text"
            color={getOrderColor(order.state.toLowerCase())}
            letterSpacing="tight"
            style={{ textTransform: "capitalize" }}
          >
            {order.state.toLowerCase()}
          </Text>
        </Flex>
      </Flex>
      {props.hasDivider && <Separator />}
    </Box>
  )

  const SMOrderRow = (
    <BorderBox my={2} mx="40px" p={0} flexDirection="column">
      <Flex
        bg="black5"
        width="100%"
        justifyContent="space-between"
        alignItems="center"
        p={2}
      >
        <Text variant="text">
          {" "}
          {orderCreatedAt.toLocaleString(DateTime.DATE_MED)}
        </Text>
        <Flex alignItems="center">
          {getOrderIcon(order.state.toLowerCase())}
          <Text
            ml="2px"
            variant="text"
            color={getOrderColor(order.state.toLowerCase())}
            style={{ textTransform: "capitalize" }}
          >
            {order.state.toLowerCase()}
          </Text>
        </Flex>
      </Flex>
      <Flex p={2} width="100%" alignItems="center">
        <Flex width="50%">
          {artworkImage}
          <Flex flexDirection="column" ml={1}>
            {!orderIsInactive && (
              <Link
                href={`/orders/${order.internalID}/status`}
                underlineBehavior="hover"
              >
                <Text variant="text">{artwork?.artist_names}</Text>
              </Link>
            )}
            {orderIsInactive && (
              <Text variant="text">{artwork?.artist_names}</Text>
            )}
            <Text variant="text" color="black60">
              {artwork?.title}
            </Text>
          </Flex>
        </Flex>
        <Flex width="50%">
          <Avatar size="xs" src={partnerImageUrl} initials={partnerInitials} />
          <Flex flexDirection="column" ml={1}>
            <Text variant="text">{partnerName}</Text>
            <Text variant="text" color="black60">
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
          <Text variant="text">Order No.</Text>
          <Text variant="text" color="black60">
            {order.code}
          </Text>
        </Flex>
        <Flex flexDirection="column" width="25%">
          <Text variant="text">Total</Text>
          <Text variant="text" color="black60">
            {order.buyerTotal}
          </Text>
        </Flex>
        <Flex flexDirection="column" width="25%">
          <Text variant="text">Payment Method</Text>
          <Text variant="text" color="black60">
            {creditCardNumber ? "•••• " + creditCardNumber : "N/A"}
          </Text>
        </Flex>
        <Flex flexDirection="column" width="25%">
          <Text variant="text">Fulfillment</Text>
          <Text variant="text" color="black60">
            {isShip ? "Delivery" : "Pickup"}
          </Text>
        </Flex>
      </Flex>
      <Flex px={2}>
        <Separator />
      </Flex>
      <Flex p={2}>
        <HelpIcon fill="black60" mr="6px" />
        <Text variant="text" color="black60">
          Need Help?{" "}
        </Text>
        <Link href="mailto:support@artsy.net">
          <Text variant="text" color="black60" ml="3px">
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
              artwork {
                date
                image {
                  resized(width: 55) {
                    url
                  }
                }
                partner {
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
                artist_names: artistNames
              }
            }
          }
        }
      }
    `,
  }
)
