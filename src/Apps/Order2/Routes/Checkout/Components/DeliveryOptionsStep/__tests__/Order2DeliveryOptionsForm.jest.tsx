import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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

beforeEach(() => {
  jest.clearAllMocks()
  mockCheckoutContext = {
    checkoutTracking: {
      clickedOrderProgression: jest.fn(),
      clickedBuyerProtection: jest.fn(),
      clickedSelectShippingOption: jest.fn(),
    },
    setDeliveryOptionComplete: jest.fn(),
    messages: {},
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

    it("shows white glove description only when white glove is selected", async () => {
      renderWithRelay(multipleOptionsData)

      expect(
        screen.queryByText(
          /Includes custom packing, transportation on a fine art shuttle, and in-home delivery/,
        ),
      ).not.toBeInTheDocument()

      const whiteGloveRadio = screen.getByRole("radio", { name: /White Glove/ })
      await userEvent.click(whiteGloveRadio)

      expect(
        screen.getByText(
          /Includes custom packing, transportation on a fine art shuttle, and in-home delivery/,
        ),
      ).toBeInTheDocument()
    })

    it("allows selecting different delivery options", async () => {
      renderWithRelay(multipleOptionsData)

      const standardRadio = screen.getByRole("radio", { name: /Standard/ })
      const expressRadio = screen.getByRole("radio", { name: /Express/ })

      expect(standardRadio).toBeChecked()

      await userEvent.click(expressRadio)

      expect(expressRadio).toBeChecked()
      expect(standardRadio).not.toBeChecked()
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
})
