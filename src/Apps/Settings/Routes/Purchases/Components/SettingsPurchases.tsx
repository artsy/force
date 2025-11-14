import { EmptyState } from "Components/EmptyState"
import { CommercePaginationFragmentContainer } from "Components/Pagination/CommercePagination"
import { extractNodes } from "Utils/extractNodes"
import { Join, Spacer } from "@artsy/palette"
import type { SettingsPurchases_me$data } from "__generated__/SettingsPurchases_me.graphql"
import { type FC, useState } from "react"
import {
  createRefetchContainer,
  graphql,
  type RelayRefetchProp,
} from "react-relay"
import {
  SettingsPurchasesRowFragmentContainer,
  SettingsPurchasesRowPlaceholder,
} from "./SettingsPurchasesRow"

export interface SettingsPurchasesProps {
  me: SettingsPurchases_me$data
  relay: RelayRefetchProp
}

const SettingsPurchases: FC<
  React.PropsWithChildren<SettingsPurchasesProps>
> = ({ me, relay }: SettingsPurchasesProps) => {
  const [loading, setLoading] = useState(false)

  const orders = extractNodes(me.orders)

  if (orders.length === 0) {
    return <EmptyState title="Orders can not be loaded at this time." />
  }

  const hasNextPage = me.orders?.pageInfo.hasNextPage ?? false
  const endCursor = me.orders?.pageInfo.endCursor as string
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
      },
    )
  }

  if (orders.length === 0) {
    return <EmptyState title="No orders found." />
  }

  return !loading ? (
    <>
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
  `,
)
