import { getInitialPaymentMethodValue } from "./../orderUtils"
import { isPaymentValid } from "../orderUtils"
import {
  CommercePaymentMethodEnum,
  Payment_order,
} from "v2/__generated__/Payment_order.graphql"

describe("order utils", () => {
  describe("is payment valid", () => {
    it("returns false if payment method unknown", () => {
      expect(isPaymentValid({ __typename: "%other" })).toEqual(false)
    })

    it("returns false if payment method details empty", () => {
      expect(isPaymentValid(null)).toEqual(false)
    })

    describe("credit card", () => {
      it("returns true", () => {
        expect(isPaymentValid({ __typename: "CreditCard", id: "id" })).toEqual(
          true
        )
      })
    })

    describe("wire transfer", () => {
      it("returns true", () => {
        expect(
          isPaymentValid({ __typename: "WireTransfer", isManualPayment: true })
        ).toEqual(true)
      })
    })

    describe("bank account", () => {
      it("returns true", () => {
        expect(isPaymentValid({ __typename: "BankAccount", id: "id" })).toEqual(
          true
        )
      })
    })
  })

  describe("get initial payment method value", () => {
    describe("order payment is valid", () => {
      it.each<
        [CommercePaymentMethodEnum, Payment_order["paymentMethodDetails"]]
      >([
        ["CREDIT_CARD", { __typename: "CreditCard", id: "id" }],
        ["US_BANK_ACCOUNT", { __typename: "BankAccount", id: "id" }],
        [
          "WIRE_TRANSFER",
          { __typename: "WireTransfer", isManualPayment: true },
        ],
      ])("returns %s", (paymentMethod, paymentMethodDetails) => {
        expect(
          getInitialPaymentMethodValue({
            paymentMethodDetails,
            paymentMethod,
          } as Payment_order)
        ).toEqual(paymentMethod)
      })
    })

    describe("order payment is invalid", () => {
      it("returns US_BANK_ACCOUNT if available payment methods includes it", () => {
        expect(
          getInitialPaymentMethodValue(({
            paymentMethodDetails: null,
            paymentMethod: "CREDIT_CARD",
            availablePaymentMethods: [
              "US_BANK_ACCOUNT",
              "CREDIT_CARD",
              "WIRE_TRANSFER",
            ],
          } as unknown) as Payment_order)
        ).toEqual("US_BANK_ACCOUNT")
      })

      it("returns CREDIT_CARD if available payment methods doesn't include US_BANK_ACCOUNT", () => {
        expect(
          getInitialPaymentMethodValue(({
            paymentMethodDetails: null,
            paymentMethod: "CREDIT_CARD",
            availablePaymentMethods: ["CREDIT_CARD", "WIRE_TRANSFER"],
          } as unknown) as Payment_order)
        ).toEqual("CREDIT_CARD")
      })
    })
  })
})
