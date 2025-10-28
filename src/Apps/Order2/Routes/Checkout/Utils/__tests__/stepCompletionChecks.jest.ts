import {
  buildInitialSteps,
  isDeliveryOptionComplete,
  isFulfillmentDetailsComplete,
  isOfferComplete,
  isPaymentComplete,
} from "../stepCompletionChecks"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "../../CheckoutContext/types"

describe("stepCompletionChecks", () => {
  describe("isOfferComplete", () => {
    it("returns true for non-OFFER mode orders", () => {
      expect(isOfferComplete({ mode: "BUY", offers: [] })).toBe(true)
    })

    it("returns false when no offers exist", () => {
      expect(isOfferComplete({ mode: "OFFER", offers: [] })).toBe(false)
    })

    it("returns false when offer has zero amount", () => {
      expect(
        isOfferComplete({
          mode: "OFFER",
          offers: [{ amount: { minor: 0 } }],
        }),
      ).toBe(false)
    })

    it("returns false when offer has null amount", () => {
      expect(
        isOfferComplete({
          mode: "OFFER",
          offers: [{ amount: { minor: null } }],
        }),
      ).toBe(false)
    })

    it("returns true when offer has positive amount", () => {
      expect(
        isOfferComplete({
          mode: "OFFER",
          offers: [{ amount: { minor: 50000 } }],
        }),
      ).toBe(true)
    })

    it("checks the most recent offer by createdAt when multiple offers exist", () => {
      expect(
        isOfferComplete({
          mode: "OFFER",
          offers: [
            {
              amount: { minor: 50000 },
              createdAt: "2024-01-01T10:00:00Z",
            },
            {
              amount: { minor: 0 },
              createdAt: "2024-01-01T12:00:00Z", // Most recent, but zero amount
            },
          ],
        }),
      ).toBe(false) // Should check the most recent offer (with 0 amount)
    })

    it("returns true when most recent offer has positive amount", () => {
      expect(
        isOfferComplete({
          mode: "OFFER",
          offers: [
            {
              amount: { minor: 0 },
              createdAt: "2024-01-01T10:00:00Z",
            },
            {
              amount: { minor: 60000 },
              createdAt: "2024-01-01T12:00:00Z", // Most recent with positive amount
            },
          ],
        }),
      ).toBe(true) // Should check the most recent offer (with 60000 amount)
    })
  })

  describe("isFulfillmentDetailsComplete", () => {
    it("returns false when fulfillment details is null", () => {
      expect(
        isFulfillmentDetailsComplete({
          selectedFulfillmentOption: null,
          fulfillmentDetails: null,
        }),
      ).toBe(false)
    })

    it("returns false when fulfillment details is undefined", () => {
      expect(
        isFulfillmentDetailsComplete({
          selectedFulfillmentOption: { type: "PICKUP" },
          fulfillmentDetails: undefined,
        }),
      ).toBe(false)
    })

    it("returns false when fulfillment details is empty object", () => {
      expect(
        isFulfillmentDetailsComplete({
          selectedFulfillmentOption: { type: "PICKUP" },
          fulfillmentDetails: {},
        }),
      ).toBe(false)
    })

    it("returns true when fulfillment details has any data (phone number)", () => {
      expect(
        isFulfillmentDetailsComplete({
          selectedFulfillmentOption: { type: "PICKUP" },
          fulfillmentDetails: {
            phoneNumber: {
              originalNumber: "1234567890",
            },
          },
        }),
      ).toBe(true)
    })

    it("returns true when fulfillment details has any data (address)", () => {
      expect(
        isFulfillmentDetailsComplete({
          selectedFulfillmentOption: { type: "ARTSY_STANDARD" },
          fulfillmentDetails: {
            addressLine1: "123 Main St",
            city: "New York",
            postalCode: "10001",
            country: "US",
            name: "John Doe",
          },
        }),
      ).toBe(true)
    })

    it("returns true when fulfillment details has partial data", () => {
      expect(
        isFulfillmentDetailsComplete({
          selectedFulfillmentOption: { type: "ARTSY_STANDARD" },
          fulfillmentDetails: {
            addressLine1: "123 Main St",
          },
        }),
      ).toBe(true)
    })
  })

  describe("isDeliveryOptionComplete", () => {
    it("returns false when no fulfillment option is selected", () => {
      expect(
        isDeliveryOptionComplete({
          selectedFulfillmentOption: null,
        }),
      ).toBe(false)
    })

    it("returns false for PICKUP orders", () => {
      expect(
        isDeliveryOptionComplete({
          selectedFulfillmentOption: { type: "PICKUP" },
        }),
      ).toBe(false)
    })

    it("returns false for generic SHIP type", () => {
      expect(
        isDeliveryOptionComplete({
          selectedFulfillmentOption: { type: "SHIP" },
        }),
      ).toBe(false)
    })

    it("returns true for ARTSY_STANDARD", () => {
      expect(
        isDeliveryOptionComplete({
          selectedFulfillmentOption: { type: "ARTSY_STANDARD" },
        }),
      ).toBe(true)
    })

    it("returns true for ARTSY_EXPRESS", () => {
      expect(
        isDeliveryOptionComplete({
          selectedFulfillmentOption: { type: "ARTSY_EXPRESS" },
        }),
      ).toBe(true)
    })

    it("returns true for ARTSY_WHITE_GLOVE", () => {
      expect(
        isDeliveryOptionComplete({
          selectedFulfillmentOption: { type: "ARTSY_WHITE_GLOVE" },
        }),
      ).toBe(true)
    })

    it("returns true for DOMESTIC_FLAT", () => {
      expect(
        isDeliveryOptionComplete({
          selectedFulfillmentOption: { type: "DOMESTIC_FLAT" },
        }),
      ).toBe(true)
    })

    it("returns true for INTERNATIONAL_FLAT", () => {
      expect(
        isDeliveryOptionComplete({
          selectedFulfillmentOption: { type: "INTERNATIONAL_FLAT" },
        }),
      ).toBe(true)
    })
  })

  describe("isPaymentComplete", () => {
    it("returns false when no payment method or details exists", () => {
      expect(
        isPaymentComplete({
          paymentMethod: null,
          paymentMethodDetails: null,
        }),
      ).toBe(false)
    })

    it("returns false when paymentMethod exists but details is null", () => {
      expect(
        isPaymentComplete({
          paymentMethod: "CREDIT_CARD",
          paymentMethodDetails: null,
        }),
      ).toBe(false)
    })

    it("returns false when paymentMethod exists but details is empty object", () => {
      expect(
        isPaymentComplete({
          paymentMethod: "CREDIT_CARD",
          paymentMethodDetails: {},
        }),
      ).toBe(false)
    })

    it("returns true when paymentMethod and paymentMethodDetails exist", () => {
      expect(
        isPaymentComplete({
          paymentMethod: "CREDIT_CARD",
          paymentMethodDetails: { internalID: "card_123" },
        }),
      ).toBe(true)
    })

    it("returns true for wire transfer with manual payment", () => {
      expect(
        isPaymentComplete({
          paymentMethod: "WIRE_TRANSFER",
          paymentMethodDetails: { isManualPayment: true },
        }),
      ).toBe(true)
    })
  })

  describe("buildInitialSteps", () => {
    describe("for BUY mode orders", () => {
      it("creates four steps in correct order", () => {
        const steps = buildInitialSteps({
          mode: "BUY",
          selectedFulfillmentOption: null,
          offers: [],
          fulfillmentDetails: null,
          paymentMethod: null,
          paymentMethodDetails: null,
        })

        expect(steps).toHaveLength(4)
        expect(steps.map(s => s.name)).toEqual([
          CheckoutStepName.FULFILLMENT_DETAILS,
          CheckoutStepName.DELIVERY_OPTION,
          CheckoutStepName.PAYMENT,
          CheckoutStepName.CONFIRMATION,
        ])
      })

      it("sets first incomplete step as ACTIVE", () => {
        const steps = buildInitialSteps({
          mode: "BUY",
          selectedFulfillmentOption: null,
          offers: [],
          fulfillmentDetails: null,
          paymentMethod: null,
          paymentMethodDetails: null,
        })

        expect(steps[0].state).toBe(CheckoutStepState.ACTIVE)
        expect(steps[1].state).toBe(CheckoutStepState.UPCOMING)
        expect(steps[2].state).toBe(CheckoutStepState.UPCOMING)
        expect(steps[3].state).toBe(CheckoutStepState.UPCOMING)
      })

      it("marks completed steps as COMPLETED and sets next as ACTIVE", () => {
        const steps = buildInitialSteps({
          mode: "BUY",
          selectedFulfillmentOption: { type: "ARTSY_STANDARD" },
          offers: [],
          fulfillmentDetails: {
            addressLine1: "123 Main St",
            city: "New York",
            postalCode: "10001",
            country: "US",
            name: "John Doe",
            phoneNumber: { originalNumber: "1234567890" },
          },
          paymentMethod: null,
          paymentMethodDetails: null,
        })

        expect(steps[0].state).toBe(CheckoutStepState.COMPLETED) // Fulfillment
        expect(steps[1].state).toBe(CheckoutStepState.COMPLETED) // Delivery
        expect(steps[2].state).toBe(CheckoutStepState.ACTIVE) // Payment
        expect(steps[3].state).toBe(CheckoutStepState.UPCOMING) // Confirmation
      })
    })

    describe("for OFFER mode orders", () => {
      it("adds OFFER_AMOUNT as first step", () => {
        const steps = buildInitialSteps({
          mode: "OFFER",
          selectedFulfillmentOption: null,
          offers: [],
          fulfillmentDetails: null,
          paymentMethod: null,
          paymentMethodDetails: null,
        })

        expect(steps).toHaveLength(5)
        expect(steps[0].name).toBe(CheckoutStepName.OFFER_AMOUNT)
        expect(steps[0].state).toBe(CheckoutStepState.ACTIVE)
      })

      it("marks offer as complete when offer exists", () => {
        const steps = buildInitialSteps({
          mode: "OFFER",
          selectedFulfillmentOption: null,
          offers: [{ amount: { minor: 50000 } }],
          fulfillmentDetails: null,
          paymentMethod: null,
          paymentMethodDetails: null,
        })

        expect(steps[0].name).toBe(CheckoutStepName.OFFER_AMOUNT)
        expect(steps[0].state).toBe(CheckoutStepState.COMPLETED)
        expect(steps[1].name).toBe(CheckoutStepName.FULFILLMENT_DETAILS)
        expect(steps[1].state).toBe(CheckoutStepState.ACTIVE)
      })
    })

    describe("for PICKUP orders", () => {
      it("hides DELIVERY_OPTION step", () => {
        const steps = buildInitialSteps({
          mode: "BUY",
          selectedFulfillmentOption: { type: "PICKUP" },
          offers: [],
          fulfillmentDetails: {
            phoneNumber: { originalNumber: "1234567890" },
          },
          paymentMethod: null,
          paymentMethodDetails: null,
        })

        const deliveryStep = steps.find(
          s => s.name === CheckoutStepName.DELIVERY_OPTION,
        )
        expect(deliveryStep?.state).toBe(CheckoutStepState.HIDDEN)
      })

      it("marks fulfillment complete and payment active for pickup with phone", () => {
        const steps = buildInitialSteps({
          mode: "BUY",
          selectedFulfillmentOption: { type: "PICKUP" },
          offers: [],
          fulfillmentDetails: {
            phoneNumber: { originalNumber: "1234567890" },
          },
          paymentMethod: null,
          paymentMethodDetails: null,
        })

        expect(steps[0].name).toBe(CheckoutStepName.FULFILLMENT_DETAILS)
        expect(steps[0].state).toBe(CheckoutStepState.COMPLETED)

        expect(steps[1].name).toBe(CheckoutStepName.DELIVERY_OPTION)
        expect(steps[1].state).toBe(CheckoutStepState.HIDDEN)

        expect(steps[2].name).toBe(CheckoutStepName.PAYMENT)
        expect(steps[2].state).toBe(CheckoutStepState.ACTIVE)
      })
    })

    describe("with payment complete", () => {
      it("marks payment as COMPLETED when paymentMethod and details exist", () => {
        const steps = buildInitialSteps({
          mode: "BUY",
          selectedFulfillmentOption: { type: "ARTSY_STANDARD" },
          offers: [],
          fulfillmentDetails: {
            addressLine1: "123 Main St",
            city: "New York",
            postalCode: "10001",
            country: "US",
            name: "John Doe",
            phoneNumber: { originalNumber: "1234567890" },
          },
          paymentMethod: "WIRE_TRANSFER",
          paymentMethodDetails: { isManualPayment: true },
        })

        const paymentStep = steps.find(s => s.name === CheckoutStepName.PAYMENT)
        expect(paymentStep?.state).toBe(CheckoutStepState.COMPLETED)
      })
    })
  })
})
