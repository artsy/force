import { fireEvent, render, screen } from "@testing-library/react"
import { Order2FulfillmentDetailsCompletedView } from "Apps/Order2/Routes/Checkout/Components/FulfillmentDetailsStep/Order2FulfillmentDetailsCompletedView"
import { MockBoot } from "DevTools/MockBoot"

const deliveryProps = {
  isPickup: false,
  fulfillmentDetails: {
    name: "Jane Doe",
    addressLine1: "123 Main St",
    addressLine2: null,
    city: "New York",
    region: "NY",
    postalCode: "10001",
    country: "US",
    phoneNumber: "+1 555-555-5555",
  },
}

const renderView = (props = {}) => {
  return render(
    <MockBoot>
      <Order2FulfillmentDetailsCompletedView {...deliveryProps} {...props} />
    </MockBoot>,
  )
}

describe("Order2FulfillmentDetailsCompletedView", () => {
  it("renders the Edit affordance and calls onEdit when clicked (delivery)", () => {
    const onEdit = jest.fn()
    renderView({ onEdit })

    fireEvent.click(
      screen.getByRole("button", { name: "Edit delivery address" }),
    )

    expect(onEdit).toHaveBeenCalledTimes(1)
  })

  it("does not render the Edit affordance when onEdit is omitted (view-only)", () => {
    renderView()

    expect(
      screen.queryByRole("button", { name: "Edit delivery address" }),
    ).not.toBeInTheDocument()
  })

  it("renders the Edit affordance and calls onEdit when clicked (pickup)", () => {
    const onEdit = jest.fn()
    renderView({ isPickup: true, onEdit })

    fireEvent.click(screen.getByRole("button", { name: "Edit pickup details" }))

    expect(onEdit).toHaveBeenCalledTimes(1)
  })
})
