import { screen, waitFor } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2PickupFormTestQuery } from "__generated__/Order2PickupFormTestQuery.graphql"
import { graphql } from "react-relay"
import { Order2PickupForm } from "../Order2PickupForm"

jest.unmock("react-relay")

let mockCheckoutContext

jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext", () => ({
  useCheckoutContext: () => mockCheckoutContext,
}))

beforeEach(() => {
  jest.clearAllMocks()

  mockCheckoutContext = {
    completeStep: jest.fn(),
    checkoutTracking: { clickedOrderProgression: jest.fn() },
    setCheckoutMode: jest.fn(),
  }
})

const { renderWithRelay } = setupTestWrapperTL<Order2PickupFormTestQuery>({
  Component: (props: any) => (
    <Order2PickupForm order={props.me.order} me={props.me} />
  ),
  query: graphql`
    query Order2PickupFormTestQuery @relay_test_operation {
      me {
        ...Order2PickupForm_me
        order(id: "order-id") {
          ...Order2PickupForm_order
        }
      }
    }
  `,
})

const baseOrderProps = {
  internalID: "order-id",
  mode: "BUY",
  fulfillmentOptions: [{ type: "PICKUP" }],
  selectedFulfillmentOption: null,
  fulfillmentDetails: null,
  shippingOrigin: null,
}

describe("Order2PickupForm", () => {
  it("pre-fills phone from me data when there are no existing fulfillment details", async () => {
    renderWithRelay({
      Me: () => ({
        phoneNumber: {
          display: "212-555-0100",
          originalNumber: "2125550100",
          regionCode: "us",
        },
        order: { ...baseOrderProps },
      }),
    })

    await waitFor(() => {
      expect(screen.getByDisplayValue("212-555-0100")).toBeInTheDocument()
    })
  })

  it("pre-fills phone from existing PICKUP fulfillment details", async () => {
    renderWithRelay({
      Me: () => ({
        phoneNumber: null,
        order: {
          ...baseOrderProps,
          selectedFulfillmentOption: { type: "PICKUP" },
          fulfillmentDetails: {
            phoneNumber: {
              originalNumber: "2125550199",
              regionCode: "us",
              countryCode: "1",
            },
          },
        },
      }),
    })

    await waitFor(() => {
      expect(screen.getByDisplayValue("2125550199")).toBeInTheDocument()
    })
  })

  it("prefers existing PICKUP fulfillment details over me phone", async () => {
    renderWithRelay({
      Me: () => ({
        phoneNumber: {
          display: "212-555-0100",
          originalNumber: "2125550100",
          regionCode: "us",
        },
        order: {
          ...baseOrderProps,
          selectedFulfillmentOption: { type: "PICKUP" },
          fulfillmentDetails: {
            phoneNumber: {
              originalNumber: "2125550199",
              regionCode: "us",
              countryCode: "1",
            },
          },
        },
      }),
    })

    await waitFor(() => {
      expect(screen.getByDisplayValue("2125550199")).toBeInTheDocument()
    })
  })

  it("falls back to me phone when fulfillment type is not PICKUP", async () => {
    renderWithRelay({
      Me: () => ({
        phoneNumber: {
          display: "212-555-0100",
          originalNumber: "2125550100",
          regionCode: "us",
        },
        order: {
          ...baseOrderProps,
          selectedFulfillmentOption: { type: "ARTSY_STANDARD" },
          fulfillmentDetails: {
            phoneNumber: {
              originalNumber: "2125550199",
              regionCode: "us",
              countryCode: "1",
            },
          },
        },
      }),
    })

    await waitFor(() => {
      expect(screen.getByDisplayValue("212-555-0100")).toBeInTheDocument()
    })
  })
})
