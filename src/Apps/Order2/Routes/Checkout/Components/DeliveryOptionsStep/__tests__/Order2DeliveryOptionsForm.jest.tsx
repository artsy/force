import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"
import { Order2DeliveryOptionsForm } from "../Order2DeliveryOptionsForm"

jest.unmock("react-relay")

const mockCheckoutContext: any = {
  checkoutTracking: {
    clickedOrderProgression: jest.fn(),
    clickedBuyerProtection: jest.fn(),
  },
  setDeliveryOptionComplete: jest.fn(),
}

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

    it("displays buyer guarantee link", () => {
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

      const guaranteeLink = screen.getByRole("link")
      expect(guaranteeLink).toBeInTheDocument()
      expect(guaranteeLink).toHaveAttribute("target", "_blank")
      expect(guaranteeLink).toHaveAttribute(
        "href",
        "https://support.artsy.net/s/article/The-Artsy-Guarantee",
      )
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

      const timeEstimates = screen.getAllByText(/Estimated delivery between/)
      expect(timeEstimates.length).toBeGreaterThan(0)
    })

    it("shows white glove description only when white glove is selected", async () => {
      renderWithRelay(multipleOptionsData)

      expect(
        screen.queryByText(
          /custom packing, transportation on a fine art shuttle/,
        ),
      ).not.toBeInTheDocument()

      const whiteGloveRadio = screen.getByRole("radio", { name: /White Glove/ })
      await userEvent.click(whiteGloveRadio)

      expect(
        screen.getByText(
          /custom packing, transportation on a fine art shuttle/,
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
})
