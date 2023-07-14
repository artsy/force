import { useState, FC } from "react"
import { RelayRefetchProp, createRefetchContainer, graphql } from "react-relay"
import { Join, Spacer, Message, Text } from "@artsy/palette"
import { extractNodes } from "Utils/extractNodes"
import {
  SettingsPurchasesRowFragmentContainer,
  SettingsPurchasesRowPlaceholder,
} from "./SettingsPurchasesRow"
import { SettingsPurchases_me$data } from "__generated__/SettingsPurchases_me.graphql"
import { CommercePaginationFragmentContainer } from "Components/Pagination/CommercePagination"
import { uniqBy, sortBy } from "lodash"

export interface SettingsPurchasesProps {
  me: SettingsPurchases_me$data
  relay: RelayRefetchProp
}

type PendingOrder = NonNullable<
  NonNullable<
    NonNullable<
      NonNullable<SettingsPurchases_me$data["pendingOrders"]>["edges"]
    >[number]
  >["node"]
>

const SettingsPurchases: FC<SettingsPurchasesProps> = ({
  me,
  relay,
}: SettingsPurchasesProps) => {
  const [loading, setLoading] = useState(false)

  const pendingOrders = sortBy<PendingOrder>(
    extractNodes(me.pendingOrders),
    order => {
      return -Date.parse(order.createdAt)
    }
  ) as PendingOrder[]

  console.log(
    pendingOrders.map(({ createdAt, code }) => ({
      createdAt,
      code,
    }))
  )

  const uniquePendingOrders = uniqBy(pendingOrders, order => {
    return order.lineItems!.nodes!.map(order => {
      const { artworkId, editionSetId } = order!
      return `${artworkId}-${editionSetId}`
    })
  })

  const orders = extractNodes(me.orders)
  const hasNextPage = me.orders?.pageInfo.hasNextPage ?? false
  const endCursor = me.orders?.pageInfo.endCursor!
  const pageCursors = me.orders?.pageCursors

  const handleNext = () => {
    if (!hasNextPage) return

    handleClick(endCursor)
  }

  const handleClick = (cursor: string) => {
    setLoading(true)

    relay.refetch(
      {
        after: cursor,
        first: 10,
        states: [
          "APPROVED",
          "SUBMITTED",
          "CANCELED",
          "FULFILLED",
          "REFUNDED",
          "PROCESSING_APPROVAL",
        ],
      },
      null,
      error => {
        if (error) {
          console.error(error)
        }

        setLoading(false)
      }
    )
  }

  if (orders.length === 0) {
    return <Message>No Orders</Message>
  }

  return !loading ? (
    <>
      <Text variant="lg" mb={2}>
        Pending orders
      </Text>
      <Join separator={<Spacer y={4} />}>
        {uniquePendingOrders.map(order => (
          <SettingsPurchasesRowFragmentContainer
            key={order.code}
            order={order}
          />
        ))}
      </Join>
      <Spacer y={4} />
      <Text variant="lg" mb={2}>
        Past orders
      </Text>
      <Join separator={<Spacer y={4} />}>
        {orders.map(order => (
          <SettingsPurchasesRowFragmentContainer
            key={order.code}
            order={order}
          />
        ))}
      </Join>

      {pageCursors && (
        <CommercePaginationFragmentContainer
          hasNextPage={hasNextPage}
          onClick={handleClick}
          onNext={handleNext}
          pageCursors={pageCursors}
        />
      )}
    </>
  ) : (
    <Join separator={<Spacer y={4} />}>
      {[...new Array(10)].map((_, i) => {
        return <SettingsPurchasesRowPlaceholder key={i} />
      })}
    </Join>
  )
}

export const SettingsPurchasesFragmentContainer = createRefetchContainer(
  SettingsPurchases,
  {
    me: graphql`
      fragment SettingsPurchases_me on Me
        @argumentDefinitions(
          after: { type: "String" }
          first: { type: "Int", defaultValue: 10 }
          states: {
            type: "[CommerceOrderStateEnum!]"
            defaultValue: [
              APPROVED
              CANCELED
              FULFILLED
              REFUNDED
              SUBMITTED
              PROCESSING_APPROVAL
            ]
          }
        ) {
        name
        pendingOrders: orders(states: [PENDING], first: 100) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          pageCursors {
            ...CommercePagination_pageCursors
          }

          edges {
            node {
              code
              source
              createdAt
              lineItems {
                nodes {
                  artworkId
                  editionSetId
                }
              }
              ...SettingsPurchasesRow_order
            }
          }
        }
        orders(states: $states, first: $first, after: $after) {
          totalCount
          pageInfo {
            hasNextPage
            endCursor
          }
          pageCursors {
            ...CommercePagination_pageCursors
          }
          edges {
            node {
              code
              ...SettingsPurchasesRow_order
            }
          }
        }
      }
    `,
  },
  graphql`
    query SettingsPurchasesQuery(
      $states: [CommerceOrderStateEnum!]
      $first: Int!
      $after: String
    ) {
      me {
        ...SettingsPurchases_me
          @arguments(states: $states, first: $first, after: $after)
      }
    }
  `
)
