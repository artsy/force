import { OrderDetailsFulfillmentInfo } from "Apps/Order/Routes/Details/Components/OrderDetailsFulfillmentInfo"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { OrderDetailsFulfillmentInfo_TestQuery } from "__generated__/OrderDetailsFulfillmentInfo_TestQuery.graphql"
import { graphql } from "relay-runtime"

jest.unmock("react-relay")

describe("OrderDetailsFulfillmentInfo", () => {
  const { renderWithRelay } =
    setupTestWrapperTL<OrderDetailsFulfillmentInfo_TestQuery>({
      Component: ({ me }) => <OrderDetailsFulfillmentInfo order={me!.order!} />,
      query: graphql`
        query OrderDetailsFulfillmentInfo_TestQuery @relay_test_operation {
          me {
            order(id: "order-id") {
              ...OrderDetailsFulfillmentInfo_order
            }
          }
        }
      `,
    })

  it("renders shipping information correctly for shipped order", () => {
    renderWithRelay({
      Order: () => ({
        selectedFulfillmentOption: { type: "DOMESTIC_FLAT" },
        fulfillmentDetails: {
          name: "Andy Warhol",
          addressLine1: "222 West 23rd Street",
          city: "New York",
          region: "NY",
          postalCode: "10011",
          country: "US",
          phoneNumber: { display: "+1 (123) 456-7890" },
        },
      }),
    })

    expect(screen.getByText("Ship to")).toBeInTheDocument()
    expect(screen.getByText("Andy Warhol")).toBeInTheDocument()
    expect(screen.getByText("222 West 23rd Street")).toBeInTheDocument()
    expect(screen.getByText("New York, NY, 10011")).toBeInTheDocument()
    expect(screen.getByText("United States")).toBeInTheDocument()
    expect(screen.getByText("+1 (123) 456-7890")).toBeInTheDocument()
  })

  it("renders pickup information correctly", () => {
    renderWithRelay({
      Order: () => ({
        selectedFulfillmentOption: { type: "PICKUP" },
        shippingOrigin: "New York, NY, 10011",
      }),
    })

    expect(screen.getByText("Pickup")).toBeInTheDocument()
    expect(screen.getByText("New York, NY, 10011")).toBeInTheDocument()
  })

  it("renders when only partial fulfillmentDetails is present but fulfillment is unknown", () => {
    renderWithRelay({
      Order: () => ({
        selectedFulfillmentOption: null,
        fulfillmentDetails: {
          name: "Andy Warhol",
          addressLine1: "222 West 23rd Street",
        },
      }),
    })

    expect(screen.getByText("Ship to")).toBeInTheDocument()
    expect(screen.getByText("Andy Warhol")).toBeInTheDocument()
    expect(screen.getByText("222 West 23rd Street")).toBeInTheDocument()
  })

  it("returns null for non pickup orders if fulfillmentDetails are empty", () => {
    const { container } = renderWithRelay({
      Order: () => ({
        selectedFulfillmentOption: { type: "DOMESTIC_FLAT" },
        fulfillmentDetails: {
          name: "",
          addressLine1: "",
          addressLine2: "",
          city: "",
          region: "",
          postalCode: "",
          country: "",
          phoneNumber: null,
        },
      }),
    })

    expect(container).toBeEmptyDOMElement()
  })

  it("returns null for pickup orders if shippingOrigin is not present", () => {
    const { container } = renderWithRelay({
      Order: () => ({
        selectedFulfillmentOption: { type: "PICKUP" },
        shippingOrigin: null,
      }),
    })

    expect(container).toBeEmptyDOMElement()
  })
})
