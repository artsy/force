import {
  CheckCircleFillIcon,
  PendingCircleIcon,
  XCircleIcon,
} from "@artsy/palette"
import {
  CommerceOrderDisplayStateEnum,
  OrderRow_order,
} from "v2/__generated__/OrderRow_order.graphql"

export type OrderRowLineItem = NonNullable<
  NonNullable<NonNullable<OrderRow_order["lineItems"]>["edges"]>[0]
>["node"]

export type OrderDisplayState = Exclude<
  CommerceOrderDisplayStateEnum,
  "ABANDONED" | "PENDING" | "%future added value"
>

const orderDisplayStateToStringMap = {
  SUBMITTED: "Pending",
  APPROVED: "Confirmed",
  PROCESSING: "Processing",
  IN_TRANSIT: "In transit",
  CANCELED: "Canceled",
  FULFILLED: "Delivered",
  REFUNDED: "Refunded",
}

export function getOrderDisplayStateString(
  displayState: CommerceOrderDisplayStateEnum
): string {
  return orderDisplayStateToStringMap[displayState]
}

export const getOrderIcon = (displayState: CommerceOrderDisplayStateEnum) => {
  switch (displayState) {
    case "SUBMITTED":
    case "APPROVED":
    case "PROCESSING":
    case "IN_TRANSIT":
      return <PendingCircleIcon fill="black60" />
    case "CANCELED":
    case "REFUNDED":
      return <XCircleIcon fill="red100" />
    case "FULFILLED":
      return <CheckCircleFillIcon />
  }
}

export const getOrderColor = (status: string) => {
  switch (status) {
    case "SUBMITTED":
    case "APPROVED":
    case "PROCESSING":
      return "black60"
    case "CANCELED":
    case "REFUNDED":
      return "red100"
    case "FULFILLED":
    case "IN_TRANSIT":
      return "black100"
  }
}
