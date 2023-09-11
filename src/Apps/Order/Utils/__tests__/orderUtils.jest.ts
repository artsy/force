import {
  getInitialPaymentMethodValue,
  isPaymentSet,
  lastOfferNote,
} from "./../orderUtils"
import {
  CommercePaymentMethodEnum,
  Payment_order$data,
} from "__generated__/Payment_order.graphql"

describe("order utils", () => {
  describe("is payment valid", () => {
    it("returns false if payment method unknown", () => {
      expect(isPaymentSet({ __typename: "%other" })).toEqual(false)
    })

    it("returns false if payment method details empty", () => {
      expect(isPaymentSet(null)).toEqual(false)
    })

    describe("credit card", () => {
      it("returns true", () => {
        expect(isPaymentSet({ __typename: "CreditCard", id: "id" })).toEqual(
          true
        )
      })
    })

    describe("wire transfer", () => {
      it("returns true", () => {
        expect(
          isPaymentSet({ __typename: "WireTransfer", isManualPayment: true })
        ).toEqual(true)
      })
    })

    describe("bank account", () => {
      it("returns true", () => {
        expect(isPaymentSet({ __typename: "BankAccount", id: "id" })).toEqual(
          true
        )
      })
    })
  })

  describe("get initial payment method value", () => {
    describe("order payment is valid", () => {
      it.each<
        [CommercePaymentMethodEnum, Payment_order$data["paymentMethodDetails"]]
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
          } as Payment_order$data)
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
          } as unknown) as Payment_order$data)
        ).toEqual("US_BANK_ACCOUNT")
      })

      it("returns CREDIT_CARD if available payment methods doesn't include US_BANK_ACCOUNT", () => {
        expect(
          getInitialPaymentMethodValue(({
            paymentMethodDetails: null,
            paymentMethod: "CREDIT_CARD",
            availablePaymentMethods: ["CREDIT_CARD", "WIRE_TRANSFER"],
          } as unknown) as Payment_order$data)
        ).toEqual("CREDIT_CARD")
      })

      it("returns WIRE_TRANSFER if available payment methods doesn't include US_BANK_ACCOUNT and CREDIT_CARD", () => {
        expect(
          getInitialPaymentMethodValue(({
            paymentMethodDetails: null,
            paymentMethod: "CREDIT_CARD",
            availablePaymentMethods: ["WIRE_TRANSFER"],
          } as unknown) as Payment_order$data)
        ).toEqual("WIRE_TRANSFER")
      })
    })
  })

  describe("last offer note", () => {
    it("returns empty string if note is empty", () => {
      expect(lastOfferNote("")).toEqual("")
    })

    it("returns empty string if note is default", () => {
      expect(
        lastOfferNote("I sent an offer for $1,000 on Untitled Artwork")
      ).toEqual("")
    })

    it("returns note if note is custom", () => {
      expect(lastOfferNote("This is my note")).toEqual("This is my note")
    })
  })
})
