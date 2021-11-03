import {
  getOrderDisplayStateString,
  getOrderIcon,
  getOrderColor,
} from "v2/Apps/Purchase/Utils/orderHelper"
import {
  CheckCircleFillIcon,
  PendingCircleIcon,
  XCircleIcon,
} from "@artsy/palette"

import { CommerceOrderDisplayStateEnum } from "v2/__generated__/OrderRow_order.graphql"

describe("getOrderDisplayStateString", () => {
  it.each([
    ["SUBMITTED", "Pending"],
    ["APPROVED", "Confirmed"],
    ["PROCESSING", "Processing"],
    ["IN_TRANSIT", "In transit"],
    ["CANCELED", "Canceled"],
    ["FULFILLED", "Delivered"],
    ["REFUNDED", "Refunded"],
  ])(
    "returns correct string based on the display state. displayState: %d, display string: %d",
    (displayState: CommerceOrderDisplayStateEnum, displayString: string) => {
      expect(getOrderDisplayStateString(displayState)).toEqual(displayString)
    }
  )
})

describe("getOrderColor", () => {
  it("returns black60", () => {
    expect(getOrderColor("SUBMITTED")).toBe("black60")
    expect(getOrderColor("APPROVED")).toBe("black60")
    expect(getOrderColor("PROCESSING")).toBe("black60")
  })

  it("returns red100", () => {
    expect(getOrderColor("CANCELED")).toBe("red100")
    expect(getOrderColor("REFUNDED")).toBe("red100")
  })

  it("returns black100", () => {
    expect(getOrderColor("FULFILLED")).toBe("black100")
    expect(getOrderColor("IN_TRANSIT")).toBe("black100")
  })
})

describe("getOrderIcon", () => {
  const PendingIcon = <PendingCircleIcon fill="black60" />
  const XIcon = <XCircleIcon fill="red100" />
  const CheckIcon = <CheckCircleFillIcon />

  it("returns PendingCircleIcon", () => {
    expect(getOrderIcon("SUBMITTED")).toStrictEqual(PendingIcon)
    expect(getOrderIcon("APPROVED")).toStrictEqual(PendingIcon)
    expect(getOrderIcon("PROCESSING")).toStrictEqual(PendingIcon)
    expect(getOrderIcon("IN_TRANSIT")).toStrictEqual(PendingIcon)
  })

  it("returns XCircleIcon", () => {
    expect(getOrderIcon("CANCELED")).toStrictEqual(XIcon)
    expect(getOrderIcon("REFUNDED")).toStrictEqual(XIcon)
  })

  it("returns CheckCircleFillIcon", () => {
    expect(getOrderIcon("FULFILLED")).toStrictEqual(CheckIcon)
  })
})
