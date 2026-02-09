import { Button, Join, Message, Spacer } from "@artsy/palette"
import { PaginationFragmentContainer } from "Components/Pagination"
import { RouterLink } from "System/Components/RouterLink"
import { useRouter } from "System/Hooks/useRouter"
import { extractNodes } from "Utils/extractNodes"
import type { SettingsOrders_me$data } from "__generated__/SettingsOrders_me.graphql"
import type { FC } from "react"
import {
  type RelayRefetchProp,
  createRefetchContainer,
  graphql,
} from "react-relay"
import { SettingsOrdersRowFragmentContainer } from "./SettingsOrdersRow"

export interface SettingsOrdersProps {
  me: SettingsOrders_me$data
  relay: RelayRefetchProp
}

const SettingsOrders: FC<React.PropsWithChildren<SettingsOrdersProps>> = ({
  me,
  relay,
}: SettingsOrdersProps) => {
  const { match, router } = useRouter()

  const orders = extractNodes(me.ordersConnection)

  if (orders.length === 0) {
    return (
      <>
        <Message variant="info">You have no orders to display.</Message>
        <RouterLink to="/artworks">
          <Button mt={4} variant="primaryBlack">
            Explore Artworks
          </Button>
        </RouterLink>
      </>
    )
  }

  const hasNextPage = me.ordersConnection?.pageInfo.hasNextPage ?? false
  const pageCursors = me.ordersConnection?.pageCursors

  const handleClick = (_cursor: string, page: number) => {
    relay.refetch(
      {
        page,
        buyerState: [
          "SUBMITTED",
          "OFFER_RECEIVED",
          "PAYMENT_FAILED",
          "PROCESSING_PAYMENT",
          "PROCESSING_OFFLINE_PAYMENT",
          "APPROVED",
          "SHIPPED",
          "COMPLETED",
          "CANCELED",
          "REFUNDED",
          "DECLINED_BY_SELLER",
          "DECLINED_BY_BUYER",
        ],
      },
      null,
      error => {
        if (error) {
          console.error(error)
        }

        // Update URL without reload
        router.push({
          pathname: match.location.pathname,
          query: { ...match.location.query, page },
        })
      },
    )
  }

  const handleNext = (page: number) => {
    if (!hasNextPage) return

    relay.refetch(
      {
        page,
        buyerState: [
          "SUBMITTED",
          "OFFER_RECEIVED",
          "PAYMENT_FAILED",
          "PROCESSING_PAYMENT",
          "PROCESSING_OFFLINE_PAYMENT",
          "APPROVED",
          "SHIPPED",
          "COMPLETED",
          "CANCELED",
          "REFUNDED",
          "DECLINED_BY_SELLER",
          "DECLINED_BY_BUYER",
        ],
      },
      null,
      error => {
        if (error) {
          console.error(error)
        }

        // Update URL without reload
        router.push({
          pathname: match.location.pathname,
          query: { ...match.location.query, page },
        })
      },
    )
  }

  return (
    <>
      <Join separator={<Spacer y={4} />}>
        {orders.map(order => (
          <SettingsOrdersRowFragmentContainer
            key={order.internalID}
            order={order}
          />
        ))}
      </Join>

      {pageCursors && (
        <PaginationFragmentContainer
          hasNextPage={hasNextPage}
          pageCursors={pageCursors}
          onClick={handleClick}
          onNext={handleNext}
        />
      )}
    </>
  )
}

export const SettingsOrdersFragmentContainer = createRefetchContainer(
  SettingsOrders,
  {
    me: graphql`
      fragment SettingsOrders_me on Me
      @argumentDefinitions(
        page: { type: "Int", defaultValue: 1 }
        buyerState: {
          type: "[OrderBuyerStateEnum]"
          defaultValue: [
            SUBMITTED
            OFFER_RECEIVED
            PAYMENT_FAILED
            PROCESSING_PAYMENT
            PROCESSING_OFFLINE_PAYMENT
            APPROVED
            SHIPPED
            COMPLETED
            CANCELED
            REFUNDED
            DECLINED_BY_SELLER
            DECLINED_BY_BUYER
          ]
        }
      ) {
        ordersConnection(first: 10, page: $page, buyerState: $buyerState) {
          pageInfo {
            hasNextPage
            hasPreviousPage
          }
          pageCursors {
            ...Pagination_pageCursors
          }
          edges {
            node {
              internalID
              ...SettingsOrdersRow_order
            }
          }
        }
      }
    `,
  },
  graphql`
    query SettingsOrdersQuery($page: Int, $buyerState: [OrderBuyerStateEnum]) {
      me {
        ...SettingsOrders_me @arguments(page: $page, buyerState: $buyerState)
      }
    }
  `,
)
