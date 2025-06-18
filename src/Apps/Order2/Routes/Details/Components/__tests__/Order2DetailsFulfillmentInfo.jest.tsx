import { screen } from "@testing-library/react"
import { Order2DetailsFulfillmentInfo } from "Apps/Order2/Routes/Details/Components/Order2DetailsFulfillmentInfo"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { graphql } from "relay-runtime"

import type { Order2DetailsFulfillmentInfo_TestQuery } from "__generated__/Order2DetailsFulfillmentInfo_TestQuery.graphql"

jest.unmock("react-relay")

describe("Order2DetailsFulfillmentInfo", () => {
  const { renderWithRelay } =
    setupTestWrapperTL<Order2DetailsFulfillmentInfo_TestQuery>({
      Component: ({ me }) => (
        <Order2DetailsFulfillmentInfo order={me!.order!} />
      ),
      query: graphql`
        query Order2DetailsFulfillmentInfo_TestQuery @relay_test_operation {
          me {
            order(id: "order-id") {
              ...Order2DetailsFulfillmentInfo_order
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
    expect(screen.getByText("US")).toBeInTheDocument()
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
