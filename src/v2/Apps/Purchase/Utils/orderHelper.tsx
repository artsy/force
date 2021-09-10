import {
  CheckCircleFillIcon,
  PendingCircleIcon,
  XCircleIcon,
} from "@artsy/palette"
import React from "react"
import {
  CommerceOrderStateEnum,
  OrderRow_order,
} from "v2/__generated__/OrderRow_order.graphql"

export type OrderRowLineItem = NonNullable<
  NonNullable<NonNullable<OrderRow_order["lineItems"]>["edges"]>[0]
>["node"]

export type OrderState = Exclude<
  CommerceOrderStateEnum,
  "ABANDONED" | "PENDING" | "%future added value"
>
export type ShipmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COLLECTED"
  | "IN_TRANSIT"
  | "COMPLETED"
  | "CANCELED"

enum ORDER_STATUSES {
  Pending = "Pending",
  Confirmed = "Confirmed",
  Delivered = "Delivered",
  Canceled = "Canceled",
  Refunded = "Refunded",
}

enum SHIPMENT_STATUSES {
  Processing = "Processing",
  InTransit = "In transit",
  Delivered = "Delivered",
  Canceled = "Canceled",
}

const orderStatusesMap = {
  SUBMITTED: ORDER_STATUSES.Pending,
  APPROVED: ORDER_STATUSES.Confirmed,
  FULFILLED: ORDER_STATUSES.Delivered,
  CANCELLED: ORDER_STATUSES.Canceled,
  REFUNDED: ORDER_STATUSES.Refunded,
  PENDING: SHIPMENT_STATUSES.Processing,
  CONFIRMED: SHIPMENT_STATUSES.Processing,
  COLLECTED: SHIPMENT_STATUSES.InTransit,
  IN_TRANSIT: SHIPMENT_STATUSES.InTransit,
  COMPLETED: SHIPMENT_STATUSES.Delivered,
  CANCELED: SHIPMENT_STATUSES.Canceled,
}

export function getOrderStatus(
  orderState: OrderState,
  orderLineItem?: OrderRowLineItem
): string {
  if (
    orderState === "CANCELED" ||
    orderState === "REFUNDED" ||
    !orderLineItem?.shipment?.status
  ) {
    return orderStatusesMap[orderState].toLowerCase()
  }

  const shipment: ShipmentStatus = orderLineItem.shipment.status.toUpperCase() as ShipmentStatus

  return orderStatusesMap[shipment]?.toLowerCase()
}

export const getOrderIcon = (status: string) => {
  switch (status) {
    case "pending":
    case "confirmed":
    case "processing":
    case "in transit":
      return <PendingCircleIcon fill="black60" />
    case "canceled":
    case "refunded":
      return <XCircleIcon fill="red100" />
    case "delivered":
      return <CheckCircleFillIcon />
  }
}

export const getOrderColor = (status: string) => {
  switch (status) {
    case "pending":
    case "processing":
    case "confirmed":
      return "black60"
    case "canceled":
    case "refunded":
      return "red100"
    case "delivered":
    case "completed":
    case "in transit":
      return "black100"
  }
}
