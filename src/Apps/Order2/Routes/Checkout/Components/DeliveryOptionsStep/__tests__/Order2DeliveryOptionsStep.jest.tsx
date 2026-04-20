import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "react-relay"
import { Order2DeliveryOptionsStep } from "../Order2DeliveryOptionsStep"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"

jest.unmock("react-relay")

let mockCheckoutContext

jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext", () => ({
  useCheckoutContext: () => mockCheckoutContext,
}))

jest.mock(
  "Apps/Order2/Routes/Checkout/Mutations/useOrder2SetOrderFulfillmentOptionMutation",
  () => ({
    useOrder2SetOrderFulfillmentOptionMutation: () => ({
      submitMutation: jest.fn(),
    }),
  }),
)

const makeStep = (name: string, state: string) => ({ name, state })

const baseSteps = [
  makeStep(CheckoutStepName.FULFILLMENT_DETAILS, CheckoutStepState.COMPLETED),
  makeStep(CheckoutStepName.DELIVERY_OPTION, CheckoutStepState.ACTIVE),
]

const orderWithFulfillmentDetails = {
  internalID: "order-123",
  fulfillmentDetails: {
    name: "John Doe",
    addressLine1: "123 Main St",
    addressLine2: null,
    city: "New York",
    region: "NY",
    postalCode: "10001",
    country: "US",
    phoneNumber: { display: "+1 555-123-4567" },
  },
  selectedFulfillmentOption: {
    type: "DOMESTIC_FLAT",
    amount: { display: "$25.00" },
  },
  fulfillmentOptions: [
    { type: "DOMESTIC_FLAT", amount: { display: "$25.00" }, selected: true },
  ],
  mode: "BUY",
  shippingOrigin: "New York, NY",
}

beforeEach(() => {
  jest.clearAllMocks()
  mockCheckoutContext = {
    steps: baseSteps,
    isFulfillmentDetailsSaving: false,
    checkoutTracking: {
      clickedOrderProgression: jest.fn(),
      clickedBuyerProtection: jest.fn(),
      clickedSelectShippingOption: jest.fn(),
    },
    completeStep: jest.fn(),
    setSectionErrorMessage: jest.fn(),
    messages: {},
  }
})

const { renderWithRelay } = setupTestWrapperTL({
  Component: (props: any) => (
    <Order2DeliveryOptionsStep order={props.me.order} />
  ),
  query: graphql`
    query Order2DeliveryOptionsStepTestQuery @relay_test_operation {
      me {
        order(id: "order-id") {
          ...Order2DeliveryOptionsStep_order
        }
      }
    }
  `,
})

describe("Order2DeliveryOptionsStep", () => {
  describe("HIDDEN", () => {
    it("renders nothing", () => {
      mockCheckoutContext.steps = [
        makeStep(CheckoutStepName.DELIVERY_OPTION, CheckoutStepState.HIDDEN),
      ]
      const { container } = renderWithRelay({
        Me: () => ({ order: orderWithFulfillmentDetails }),
      })
      expect(container).toBeEmptyDOMElement()
    })
  })

  describe("UPCOMING", () => {
    it("renders the placeholder", () => {
      mockCheckoutContext.steps = [
        makeStep(
          CheckoutStepName.FULFILLMENT_DETAILS,
          CheckoutStepState.ACTIVE,
        ),
        makeStep(CheckoutStepName.DELIVERY_OPTION, CheckoutStepState.UPCOMING),
      ]
      renderWithRelay({ Me: () => ({ order: orderWithFulfillmentDetails }) })
      expect(screen.getByText("Shipping method")).toBeInTheDocument()
      expect(
        screen.getByText("Methods vary based on location and artwork size"),
      ).toBeInTheDocument()
      expect(screen.queryByRole("button")).not.toBeInTheDocument()
    })
  })

  describe("ACTIVE", () => {
    it("renders the placeholder when fulfillment details are not yet saved", () => {
      renderWithRelay({
        Me: () => ({
          order: {
            ...orderWithFulfillmentDetails,
            fulfillmentDetails: null,
          },
        }),
      })
      expect(screen.getByText("Shipping method")).toBeInTheDocument()
      expect(
        screen.getByText("Methods vary based on location and artwork size"),
      ).toBeInTheDocument()
      expect(screen.queryByRole("button")).not.toBeInTheDocument()
    })

    it("renders the placeholder while fulfillment details are saving", () => {
      mockCheckoutContext.isFulfillmentDetailsSaving = true
      renderWithRelay({ Me: () => ({ order: orderWithFulfillmentDetails }) })
      expect(screen.getByText("Shipping method")).toBeInTheDocument()
      expect(screen.queryByRole("button")).not.toBeInTheDocument()
    })

    it("renders the form with button when fulfillment details are saved (dual-active: FD and DO both ACTIVE)", () => {
      renderWithRelay({ Me: () => ({ order: orderWithFulfillmentDetails }) })
      expect(
        screen.getByRole("button", { name: "Continue to Payment" }),
      ).toBeInTheDocument()
    })
  })
})
