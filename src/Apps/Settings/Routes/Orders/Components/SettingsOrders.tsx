import { CommercePaginationFragmentContainer } from "Components/Pagination/CommercePagination"
import { RouterLink } from "System/Components/RouterLink"
import { extractNodes } from "Utils/extractNodes"
import { Button, Join, Message, Spacer } from "@artsy/palette"
import type { SettingsOrders_me$data } from "__generated__/SettingsOrders_me.graphql"
import { type FC, Suspense, useState } from "react"
import {
  createRefetchContainer,
  graphql,
  type RelayRefetchProp,
} from "react-relay"
import { SettingsOrdersRowPlaceholder } from "./SettingsOrdersRow"
import { SettingsOrdersRowLoader } from "./SettingsOrdersRowLoader"

export interface SettingsOrdersProps {
  me: SettingsOrders_me$data
  relay: RelayRefetchProp
}

const SettingsOrders: FC<React.PropsWithChildren<SettingsOrdersProps>> = ({
  me,
  relay,
}: SettingsOrdersProps) => {
  const [loading, setLoading] = useState(false)

  const orders = extractNodes(me.orders)

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
          "SUBMITTED",
          "PROCESSING_APPROVAL",
          "APPROVED",
          "CANCELED",
          "FULFILLED",
          "REFUNDED",
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

  return !loading ? (
    <>
      <Join separator={<Spacer y={4} />}>
        {orders.map(order => (
          <Suspense
            key={order.internalID}
            fallback={<SettingsOrdersRowPlaceholder />}
          >
            <SettingsOrdersRowLoader orderInternalID={order.internalID} />
          </Suspense>
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
        return <SettingsOrdersRowPlaceholder key={i} />
      })}
    </Join>
  )
}

export const SettingsOrdersFragmentContainer = createRefetchContainer(
  SettingsOrders,
  {
    me: graphql`
      fragment SettingsOrders_me on Me
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
              internalID
            }
          }
        }
      }
    `,
  },
  graphql`
    query SettingsOrdersQuery(
      $states: [CommerceOrderStateEnum!]
      $first: Int!
      $after: String
    ) {
      me {
        ...SettingsOrders_me
          @arguments(states: $states, first: $first, after: $after)
      }
    }
  `
)
