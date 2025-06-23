import type {
  CommercePaymentMethodEnum,
  Payment_order$data,
} from "__generated__/Payment_order.graphql"
import { getInitialPaymentMethodValue } from "./../orderUtils"

describe("order utils", () => {
  describe("get initial payment method value", () => {
    describe("when currently selected order payment is valid (paymentSet is true)", () => {
      it.each<[CommercePaymentMethodEnum]>([
        ["CREDIT_CARD"],
        ["US_BANK_ACCOUNT"],
        ["WIRE_TRANSFER"],
      ])("returns %s", paymentMethod => {
        expect(
          getInitialPaymentMethodValue({
            paymentSet: true,
            paymentMethod,
          } as Payment_order$data),
        ).toEqual(paymentMethod)
      })
    })

    describe("when currently selected order payment payment is invalid (paymentSet is false)", () => {
      it("returns undefined if multiple available payment methods are present", () => {
        expect(
          getInitialPaymentMethodValue({
            paymentSet: false,
            paymentMethod: "WIRE_TRANSFER",
            availablePaymentMethods: [
              "US_BANK_ACCOUNT",
              "CREDIT_CARD",
              "WIRE_TRANSFER",
            ],
          } as unknown as Payment_order$data),
        ).toEqual(undefined)
      })

      it("returns WIRE_TRANSFER if available payment methods doesn't include CREDIT_CARD or US_BANK_ACCOUNT", () => {
        expect(
          getInitialPaymentMethodValue({
            paymentSet: false,
            paymentMethod: "CREDIT_CARD",
            availablePaymentMethods: ["WIRE_TRANSFER"],
          } as unknown as Payment_order$data),
        ).toEqual("WIRE_TRANSFER")
      })
    })
  })
})
