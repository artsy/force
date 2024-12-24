import type {
  CommercePaymentMethodEnum,
  Payment_order$data,
} from "__generated__/Payment_order.graphql"
import { getInitialPaymentMethodValue } from "./../orderUtils"

describe("order utils", () => {
  describe("get initial payment method value", () => {
    describe("order payment is valid", () => {
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

    describe("order payment is invalid", () => {
      it("returns US_BANK_ACCOUNT if available payment methods includes it", () => {
        expect(
          getInitialPaymentMethodValue({
            paymentSet: false,
            paymentMethod: "CREDIT_CARD",
            availablePaymentMethods: [
              "US_BANK_ACCOUNT",
              "CREDIT_CARD",
              "WIRE_TRANSFER",
            ],
          } as unknown as Payment_order$data),
        ).toEqual("US_BANK_ACCOUNT")
      })

      it("returns CREDIT_CARD if available payment methods doesn't include US_BANK_ACCOUNT", () => {
        expect(
          getInitialPaymentMethodValue({
            paymentSet: false,
            paymentMethod: "CREDIT_CARD",
            availablePaymentMethods: ["CREDIT_CARD", "WIRE_TRANSFER"],
          } as unknown as Payment_order$data),
        ).toEqual("CREDIT_CARD")
      })

      it("returns WIRE_TRANSFER if available payment methods doesn't include US_BANK_ACCOUNT and CREDIT_CARD", () => {
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
