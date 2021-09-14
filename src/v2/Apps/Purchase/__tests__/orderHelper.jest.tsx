import React from "react"
import {
  getOrderStatus,
  getOrderIcon,
  getOrderColor,
} from "../Utils/orderHelper"
import {
  CheckCircleFillIcon,
  PendingCircleIcon,
  XCircleIcon,
} from "@artsy/palette"

describe("getOrderStatus", () => {
  let mockLineItem: any
  describe("without shipment status", () => {
    mockLineItem = { shipment: null }
    it("returns correct statuses", () => {
      expect(getOrderStatus("SUBMITTED", mockLineItem)).toBe("pending")
      expect(getOrderStatus("APPROVED", mockLineItem)).toBe("confirmed")
      expect(getOrderStatus("FULFILLED", mockLineItem)).toBe("delivered")
      expect(getOrderStatus("CANCELED", mockLineItem)).toBe("canceled")
      expect(getOrderStatus("REFUNDED", mockLineItem)).toBe("refunded")
    })
  })

  describe("with shipment status", () => {
    it("returns correct statuses", () => {
      mockLineItem = { shipment: { status: "pending" } }
      expect(getOrderStatus("APPROVED", mockLineItem)).toBe("processing")
      mockLineItem = { shipment: { status: "confirmed" } }
      expect(getOrderStatus("APPROVED", mockLineItem)).toBe("processing")
      mockLineItem = { shipment: { status: "collected" } }
      expect(getOrderStatus("APPROVED", mockLineItem)).toBe("in transit")
      mockLineItem = { shipment: { status: "in_transit" } }
      expect(getOrderStatus("APPROVED", mockLineItem)).toBe("in transit")
      mockLineItem = { shipment: { status: "completed" } }
      expect(getOrderStatus("APPROVED", mockLineItem)).toBe("delivered")
      mockLineItem = { shipment: { status: "canceled" } }
      expect(getOrderStatus("APPROVED", mockLineItem)).toBe("canceled")
    })
  })

  describe("CANCELED/REFUNDED order states", () => {
    it("CANCELED overrides any shipment status", () => {
      mockLineItem = { shipment: { status: "pending" } }
      expect(getOrderStatus("CANCELED", mockLineItem)).toBe("canceled")
      mockLineItem = { shipment: { status: "confirmed" } }
      expect(getOrderStatus("CANCELED", mockLineItem)).toBe("canceled")
      mockLineItem = { shipment: { status: "collected" } }
      expect(getOrderStatus("CANCELED", mockLineItem)).toBe("canceled")
      mockLineItem = { shipment: { status: "in_transit" } }
      expect(getOrderStatus("CANCELED", mockLineItem)).toBe("canceled")
      mockLineItem = { shipment: { status: "completed" } }
      expect(getOrderStatus("CANCELED", mockLineItem)).toBe("canceled")
      mockLineItem = { shipment: { status: "canceled" } }
      expect(getOrderStatus("CANCELED", mockLineItem)).toBe("canceled")
    })

    it("REFUNDED overrides any shipment status", () => {
      mockLineItem = { shipment: { status: "pending" } }
      expect(getOrderStatus("REFUNDED", mockLineItem)).toBe("refunded")
      mockLineItem = { shipment: { status: "confirmed" } }
      expect(getOrderStatus("REFUNDED", mockLineItem)).toBe("refunded")
      mockLineItem = { shipment: { status: "collected" } }
      expect(getOrderStatus("REFUNDED", mockLineItem)).toBe("refunded")
      mockLineItem = { shipment: { status: "in_transit" } }
      expect(getOrderStatus("REFUNDED", mockLineItem)).toBe("refunded")
      mockLineItem = { shipment: { status: "completed" } }
      expect(getOrderStatus("REFUNDED", mockLineItem)).toBe("refunded")
      mockLineItem = { shipment: { status: "canceled" } }
      expect(getOrderStatus("REFUNDED", mockLineItem)).toBe("refunded")
    })
  })
})

describe("getOrderColor", () => {
  it("returns black60", () => {
    expect(getOrderColor("pending")).toBe("black60")
    expect(getOrderColor("processing")).toBe("black60")
    expect(getOrderColor("confirmed")).toBe("black60")
  })

  it("returns red100", () => {
    expect(getOrderColor("canceled")).toBe("red100")
    expect(getOrderColor("refunded")).toBe("red100")
  })

  it("returns black100", () => {
    expect(getOrderColor("delivered")).toBe("black100")
    expect(getOrderColor("completed")).toBe("black100")
    expect(getOrderColor("in transit")).toBe("black100")
  })
})

describe("getOrderIcon", () => {
  const PendingIcon = <PendingCircleIcon fill="black60" />
  const XIcon = <XCircleIcon fill="red100" />
  const CheckIcon = <CheckCircleFillIcon />

  it("returns PendingCircleIcon", () => {
    expect(getOrderIcon("pending")).toStrictEqual(PendingIcon)
    expect(getOrderIcon("confirmed")).toStrictEqual(PendingIcon)
    expect(getOrderIcon("processing")).toStrictEqual(PendingIcon)
    expect(getOrderIcon("in transit")).toStrictEqual(PendingIcon)
  })

  it("returns XCircleIcon", () => {
    expect(getOrderIcon("canceled")).toStrictEqual(XIcon)
    expect(getOrderIcon("refunded")).toStrictEqual(XIcon)
  })

  it("returns CheckCircleFillIcon", () => {
    expect(getOrderIcon("delivered")).toStrictEqual(CheckIcon)
  })
})
