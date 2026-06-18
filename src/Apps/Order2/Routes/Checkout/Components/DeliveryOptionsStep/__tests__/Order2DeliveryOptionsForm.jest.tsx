import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"
import { Order2DeliveryOptionsForm } from "../Order2DeliveryOptionsForm"

jest.unmock("react-relay")

let mockCheckoutContext

jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext", () => ({
  useCheckoutContext: () => mockCheckoutContext,
}))

const mockSetOrderFulfillmentOption = jest.fn()

jest.mock(
  "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderFulfillmentOptionMutation",
  () => ({
    useOrder2SetOrderFulfillmentOptionMutation: () => ({
      submitMutation: mockSetOrderFulfillmentOption,
    }),
  }),
)

const mockShippingQuoteViewed = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
  mockCheckoutContext = {
    checkoutTracking: {
      clickedOrderProgression: jest.fn(),
      clickedBuyerProtection: jest.fn(),
      clickedSelectShippingOption: jest.fn(),
      shippingQuoteViewed: mockShippingQuoteViewed,
    },
    completeStep: jest.fn(),
    setSectionErrorMessage: jest.fn(),
    messages: {},
    steps: [],
  }
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => (
    <Order2DeliveryOptionsForm order={props.me.order} />
  ),
  query: graphql`
    query Order2DeliveryOptionsFormTestQuery @relay_test_operation {
      me {
        order(id: "order-id") {
          ...Order2DeliveryOptionsForm_order
        }
      }
    }
  `,
})

describe("Order2DeliveryOptionsForm", () => {
  describe("with single delivery option", () => {
    it("renders single shipping option without radio buttons", () => {
      renderWithRelay({
        Me: () => ({
          order: {
            internalID: "order-123",
            fulfillmentOptions: [
              {
                type: "ARTSY_STANDARD",
                amount: { display: "$25.00" },
                selected: true,
              },
            ],
          },
        }),
      })

      expect(screen.getByText("Shipping method")).toBeInTheDocument()
      expect(screen.getByText("Standard")).toBeInTheDocument()
      expect(screen.getByText("$25.00")).toBeInTheDocument()
      expect(screen.getByText("Continue to Payment")).toBeInTheDocument()

      expect(screen.queryByRole("radio")).not.toBeInTheDocument()
    })

    it("shows white glove description only when white glove is selected", async () => {
      renderWithRelay({
        Me: () => ({
          order: {
            internalID: "order-123",
            fulfillmentOptions: [
              {
                type: "ARTSY_WHITE_GLOVE",
                amount: { display: "$25.00" },
                selected: true,
              },
            ],
          },
        }),
      })

      expect(
        screen.getByText(
          /Includes custom packing, transportation on a fine art shuttle, and in-home delivery/,
        ),
      ).toBeInTheDocument()
    })
  })

  describe("with multiple delivery options", () => {
    const multipleOptionsData = {
      Me: () => ({
        order: {
          internalID: "order-123",
          fulfillmentOptions: [
            {
              type: "ARTSY_STANDARD",
              amount: { display: "$25.00" },
              selected: true,
            },
            {
              type: "ARTSY_EXPRESS",
              amount: { display: "$50.00" },
              selected: false,
            },
            {
              type: "ARTSY_WHITE_GLOVE",
              amount: { display: "$200.00" },
              selected: false,
            },
          ],
        },
      }),
    }

    it("displays shipping and returns link", () => {
      renderWithRelay(multipleOptionsData)

      const guaranteeLink = screen.getByRole("link")
      expect(guaranteeLink).toBeInTheDocument()
      expect(guaranteeLink).toHaveAttribute("target", "_blank")
      expect(guaranteeLink).toHaveAttribute(
        "href",
        "https://support.artsy.net/s/article/Shipping-and-Returns-FAQs",
      )
    })

    it("renders radio group with multiple shipping options", () => {
      renderWithRelay(multipleOptionsData)

      const radios = screen.getAllByRole("radio")
      expect(radios).toHaveLength(3)

      expect(screen.getByText("Standard")).toBeInTheDocument()
      expect(screen.getByText("Express")).toBeInTheDocument()
      expect(screen.getByText("White Glove")).toBeInTheDocument()

      expect(screen.getByText("$25.00")).toBeInTheDocument()
      expect(screen.getByText("$50.00")).toBeInTheDocument()
      expect(screen.getByText("$200.00")).toBeInTheDocument()
    })

    it("displays time estimates for delivery options", () => {
      renderWithRelay(multipleOptionsData)

      const timeEstimates = screen.getAllByText(/Est. delivery/)
      expect(timeEstimates.length).toBeGreaterThan(0)
    })

    it("shows white glove description when white glove option is selected by server", () => {
      renderWithRelay({
        Me: () => ({
          order: {
            internalID: "order-123",
            fulfillmentOptions: [
              {
                type: "ARTSY_STANDARD",
                amount: { display: "$25.00" },
                selected: false,
              },
              {
                type: "ARTSY_EXPRESS",
                amount: { display: "$50.00" },
                selected: false,
              },
              {
                type: "ARTSY_WHITE_GLOVE",
                amount: { display: "$200.00" },
                selected: true,
              },
            ],
          },
        }),
      })

      expect(
        screen.getByText(
          /Includes custom packing, transportation on a fine art shuttle, and in-home delivery/,
        ),
      ).toBeInTheDocument()
    })

    it("renders all delivery options with correct initial selection", () => {
      renderWithRelay(multipleOptionsData)

      const standardRadio = screen.getByRole("radio", { name: /Standard/ })
      const expressRadio = screen.getByRole("radio", { name: /Express/ })
      const whiteGloveRadio = screen.getByRole("radio", { name: /White Glove/ })

      expect(standardRadio).toBeChecked()
      expect(expressRadio).not.toBeChecked()
      expect(whiteGloveRadio).not.toBeChecked()
    })

    it("calls mutation when selecting a delivery option", async () => {
      renderWithRelay(multipleOptionsData)

      const expressRadio = screen.getByRole("radio", { name: /Express/ })
      await userEvent.click(expressRadio)

      await waitFor(() => {
        expect(mockSetOrderFulfillmentOption).toHaveBeenCalledWith({
          variables: {
            input: {
              id: "order-123",
              fulfillmentOption: { type: "ARTSY_EXPRESS" },
            },
          },
        })
      })
    })

    it("calls clickedSelectShippingOption tracking when selecting a shipping option", async () => {
      renderWithRelay(multipleOptionsData)

      const expressRadio = screen.getByRole("radio", { name: /Express/ })
      await userEvent.click(expressRadio)

      expect(
        mockCheckoutContext.checkoutTracking.clickedSelectShippingOption,
      ).toHaveBeenCalledWith("ARTSY_EXPRESS")

      const whiteGloveRadio = screen.getByRole("radio", { name: /White Glove/ })
      await userEvent.click(whiteGloveRadio)

      expect(
        mockCheckoutContext.checkoutTracking.clickedSelectShippingOption,
      ).toHaveBeenCalledWith("ARTSY_WHITE_GLOVE")
    })
  })

  describe("filtering pickup options", () => {
    it("filters out PICKUP options from delivery options", () => {
      renderWithRelay({
        Me: () => ({
          order: {
            internalID: "order-123",
            fulfillmentOptions: [
              {
                type: "ARTSY_STANDARD",
                amount: { display: "$25.00" },
                selected: true,
              },
              {
                type: "PICKUP",
                amount: { display: "$0.00" },
                selected: false,
              },
            ],
          },
        }),
      })

      expect(screen.getByText("Standard")).toBeInTheDocument()
      expect(screen.queryByText("Pickup")).not.toBeInTheDocument()
    })
  })

  describe("SHIPPING_TBD option", () => {
    it("renders SHIPPING_TBD option with seller confirmation message", () => {
      renderWithRelay({
        Me: () => ({
          order: {
            internalID: "order-123",
            shippingOrigin: "New York, NY",
            fulfillmentOptions: [
              {
                type: "SHIPPING_TBD",
                amount: { display: null },
                selected: true,
              },
            ],
          },
        }),
      })

      expect(
        screen.getByText("Shipping to be confirmed by seller"),
      ).toBeInTheDocument()
      expect(
        screen.getByText(/Shipping details will be updated after checkout/),
      ).toBeInTheDocument()
      expect(screen.getByText("Ships from New York, NY")).toBeInTheDocument()
    })

    it("selects SHIPPING_TBD when 'Continue to Payment' is clicked for OFFER orders", async () => {
      mockCheckoutContext.isOffer = true
      mockSetOrderFulfillmentOption.mockResolvedValue({
        setOrderFulfillmentOption: {
          orderOrError: {
            __typename: "OrderMutationSuccess",
            order: {
              internalID: "order-123",
            },
          },
        },
      })

      renderWithRelay({
        Me: () => ({
          order: {
            internalID: "order-123",
            mode: "OFFER",
            shippingOrigin: "New York, NY",
            fulfillmentOptions: [
              {
                type: "SHIPPING_TBD",
                amount: { display: null },
                selected: false,
              },
            ],
            selectedFulfillmentOption: null,
          },
        }),
      })

      const continueButton = screen.getByRole("button", {
        name: "Continue to Payment",
      })

      await userEvent.click(continueButton)

      await waitFor(() => {
        expect(mockSetOrderFulfillmentOption).toHaveBeenCalledWith({
          variables: {
            input: {
              id: "order-123",
              fulfillmentOption: { type: "SHIPPING_TBD" },
            },
          },
        })
      })

      expect(mockCheckoutContext.completeStep).toHaveBeenCalledWith(
        CheckoutStepName.DELIVERY_OPTION,
      )
    })

    it("does not select SHIPPING_TBD for BUY orders", async () => {
      renderWithRelay({
        Me: () => ({
          order: {
            internalID: "order-123",
            mode: "BUY",
            shippingOrigin: "New York, NY",
            fulfillmentOptions: [
              {
                type: "SHIPPING_TBD",
                amount: { display: null },
                selected: false,
              },
            ],
            selectedFulfillmentOption: null,
          },
        }),
      })

      const continueButton = screen.getByRole("button", {
        name: "Continue to Payment",
      })

      // Button should be disabled because BUY orders require a valid fulfillment option
      expect(continueButton).toBeDisabled()

      // Should not call the mutation for BUY orders
      expect(mockSetOrderFulfillmentOption).not.toHaveBeenCalled()

      // Should not complete the step since no valid option is selected
      expect(mockCheckoutContext.completeStep).not.toHaveBeenCalled()
    })
  })

  describe("with no delivery options", () => {
    it("shows an error message when there are no fulfillment options", () => {
      renderWithRelay({
        Me: () => ({
          order: {
            internalID: "order-123",
            fulfillmentOptions: [],
          },
        }),
      })

      expect(
        screen.getByText(
          "Unable to find shipping quotes. Please contact orders@artsy.net.",
        ),
      ).toBeInTheDocument()
      expect(screen.queryByRole("radio")).not.toBeInTheDocument()
    })

    it("shows an error message when only PICKUP options exist", () => {
      renderWithRelay({
        Me: () => ({
          order: {
            internalID: "order-123",
            fulfillmentOptions: [
              {
                type: "PICKUP",
                amount: { display: "$0.00" },
                selected: true,
              },
            ],
          },
        }),
      })

      expect(
        screen.getByText(
          "Unable to find shipping quotes. Please contact orders@artsy.net.",
        ),
      ).toBeInTheDocument()
    })

    it("disables the submit button", () => {
      renderWithRelay({
        Me: () => ({
          order: {
            internalID: "order-123",
            fulfillmentOptions: [],
          },
        }),
      })

      expect(
        screen.getByRole("button", { name: "Continue to Payment" }),
      ).toBeDisabled()
    })
  })

  describe("shipping origin", () => {
    it("displays 'Ships from' when shipping origin is available", () => {
      renderWithRelay({
        Me: () => ({
          order: {
            internalID: "order-123",
            shippingOrigin: "New York, NY",
            fulfillmentOptions: [
              {
                type: "ARTSY_STANDARD",
                amount: { display: "$25.00" },
                selected: true,
              },
            ],
          },
        }),
      })

      expect(screen.getByText("Ships from New York, NY")).toBeInTheDocument()
    })

    it("does not display 'Ships from' when shipping origin is not available", () => {
      renderWithRelay({
        Me: () => ({
          order: {
            internalID: "order-123",
            shippingOrigin: null,
            fulfillmentOptions: [
              {
                type: "ARTSY_STANDARD",
                amount: { display: "$25.00" },
                selected: true,
              },
            ],
          },
        }),
      })

      expect(screen.queryByText(/Ships from/)).not.toBeInTheDocument()
    })
  })

  describe("shippingQuoteViewed tracking", () => {
    const artaOptionsData = {
      Me: () => ({
        order: {
          internalID: "order-123",
          fulfillmentOptions: [
            {
              type: "ARTSY_STANDARD",
              shippingQuoteId: "quote-standard-id",
              amount: { display: "$25.00", minor: 2500, currencyCode: "USD" },
              selected: true,
            },
            {
              type: "ARTSY_EXPRESS",
              shippingQuoteId: "quote-express-id",
              amount: { display: "$50.00", minor: 5000, currencyCode: "USD" },
              selected: false,
            },
          ],
        },
      }),
    }

    it("tracks shippingQuoteViewed when step is active and Arta options are present", async () => {
      mockCheckoutContext.steps = [
        {
          name: CheckoutStepName.DELIVERY_OPTION,
          state: CheckoutStepState.ACTIVE,
        },
      ]

      renderWithRelay(artaOptionsData)

      await waitFor(() => {
        expect(mockShippingQuoteViewed).toHaveBeenCalledTimes(1)
        expect(mockShippingQuoteViewed).toHaveBeenCalledWith([
          {
            id: "quote-standard-id",
            type: "arta",
            subtype: "standard",
            price_minor: 2500,
            price_currency: "USD",
            timeline: "Est. delivery 3-5 days after shipping",
          },
          {
            id: "quote-express-id",
            type: "arta",
            subtype: "express",
            price_minor: 5000,
            price_currency: "USD",
            timeline: "Est. delivery 2 days after shipping",
          },
        ])
      })
    })

    it("does not track shippingQuoteViewed when step is not active", async () => {
      mockCheckoutContext.steps = [
        {
          name: CheckoutStepName.DELIVERY_OPTION,
          state: CheckoutStepState.UPCOMING,
        },
      ]

      renderWithRelay(artaOptionsData)

      await waitFor(() => {
        expect(mockShippingQuoteViewed).not.toHaveBeenCalled()
      })
    })

    it("does not track shippingQuoteViewed when there are no Arta options", async () => {
      mockCheckoutContext.steps = [
        {
          name: CheckoutStepName.DELIVERY_OPTION,
          state: CheckoutStepState.ACTIVE,
        },
      ]

      renderWithRelay({
        Me: () => ({
          order: {
            internalID: "order-123",
            fulfillmentOptions: [
              {
                type: "DOMESTIC_FLAT",
                shippingQuoteId: null,
                amount: { display: "$10.00", minor: 1000, currencyCode: "USD" },
                selected: true,
              },
            ],
          },
        }),
      })

      await waitFor(() => {
        expect(mockShippingQuoteViewed).not.toHaveBeenCalled()
      })
    })
  })
})
