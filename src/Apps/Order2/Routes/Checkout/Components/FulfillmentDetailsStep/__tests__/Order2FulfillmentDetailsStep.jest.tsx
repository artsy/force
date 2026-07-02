import { fireEvent, screen } from "@testing-library/react"
import {
  CheckoutStepName,
  CheckoutStepState,
} from "Apps/Order2/Routes/Checkout/CheckoutContext/types"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { Order2FulfillmentDetailsStepTestQuery } from "__generated__/Order2FulfillmentDetailsStepTestQuery.graphql"
import { graphql } from "react-relay"
import { Order2FulfillmentDetailsStep } from "../Order2FulfillmentDetailsStep"

jest.unmock("react-relay")

let mockCheckoutContext: any
jest.mock("Apps/Order2/Routes/Checkout/Hooks/useCheckoutContext", () => ({
  useCheckoutContext: () => mockCheckoutContext,
}))

jest.mock(
  "Apps/Order2/Routes/Checkout/Mutations/useOrder2UnsetOrderFulfillmentOptionMutation",
  () => ({
    useOrder2UnsetOrderFulfillmentOptionMutation: () => ({
      submitMutation: jest.fn(),
    }),
  }),
)

// Stub the editable forms (Formik/heavy) — this test focuses on the step
// rendering the *completed* view with the right props.
jest.mock(
  "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/Order2DeliveryForm",
  () => ({ Order2DeliveryForm: () => <div data-testid="delivery-form" /> }),
)
jest.mock(
  "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/Order2PickupForm",
  () => ({ Order2PickupForm: () => <div data-testid="pickup-form" /> }),
)

const editStep = jest.fn()
const clickedChangeShippingAddress = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
  mockCheckoutContext = {
    steps: [
      {
        name: CheckoutStepName.FULFILLMENT_DETAILS,
        state: CheckoutStepState.COMPLETED,
      },
    ],
    editStep,
    checkoutTracking: {
      clickedChangeShippingAddress,
      clickedFulfillmentTab: jest.fn(),
    },
    setActiveFulfillmentDetailsTab: jest.fn(),
    setUserAddressMode: jest.fn(),
    setIsFulfillmentDetailsSaving: jest.fn(),
  }
})

// Delivery order (no PICKUP option → simple form path, no Tabs).
const deliveryOrder = {
  Order: () => ({
    mode: "BUY",
    fulfillmentDetails: {
      name: "Jane Doe",
      addressLine1: "123 Main St",
      addressLine2: null,
      city: "New York",
      region: "NY",
      postalCode: "10001",
      country: "US",
      phoneNumber: { display: "+1 555-555-5555" },
    },
    selectedFulfillmentOption: { type: "DOMESTIC_FLAT" },
    fulfillmentOptions: [{ type: "DOMESTIC_FLAT", selected: true }],
  }),
}

const { renderWithRelay } =
  setupTestWrapperTL<Order2FulfillmentDetailsStepTestQuery>({
    Component: (props: any) => {
      return (
        <Order2FulfillmentDetailsStep order={props.me.order} me={props.me} />
      )
    },
    query: graphql`
      query Order2FulfillmentDetailsStepTestQuery @relay_test_operation {
        me {
          ...Order2FulfillmentDetailsStep_me
          order(id: "order-id") {
            ...Order2FulfillmentDetailsStep_order
          }
        }
      }
    `,
  })

describe("Order2FulfillmentDetailsStep", () => {
  describe("COMPLETED", () => {
    it("renders the completed view with the address and an Edit affordance", () => {
      renderWithRelay(deliveryOrder)

      expect(screen.getByText("Jane Doe")).toBeInTheDocument()
      expect(
        screen.getByRole("button", { name: "Edit delivery address" }),
      ).toBeInTheDocument()
    })

    it("wires Edit to tracking + editStep", () => {
      renderWithRelay(deliveryOrder)

      fireEvent.click(
        screen.getByRole("button", { name: "Edit delivery address" }),
      )

      expect(clickedChangeShippingAddress).toHaveBeenCalled()
      expect(editStep).toHaveBeenCalledWith(
        CheckoutStepName.FULFILLMENT_DETAILS,
      )
    })
  })

  describe("ACTIVE", () => {
    it("does not render the completed view; shows the form", () => {
      mockCheckoutContext.steps = [
        {
          name: CheckoutStepName.FULFILLMENT_DETAILS,
          state: CheckoutStepState.ACTIVE,
        },
      ]
      renderWithRelay(deliveryOrder)

      expect(
        screen.queryByRole("button", { name: "Edit delivery address" }),
      ).not.toBeInTheDocument()
      expect(screen.getByTestId("delivery-form")).toBeInTheDocument()
    })
  })
})
