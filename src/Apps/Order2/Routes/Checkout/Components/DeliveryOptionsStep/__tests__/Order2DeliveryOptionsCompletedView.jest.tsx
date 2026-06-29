import { fireEvent, render, screen } from "@testing-library/react"
import { Order2DeliveryOptionsCompletedView } from "Apps/Order2/Routes/Checkout/Components/DeliveryOptionsStep/Order2DeliveryOptionsCompletedView"
import { MockBoot } from "DevTools/MockBoot"

const baseProps = {
  label: "Standard",
  timeEstimatePrefix: "Est. delivery",
  timeEstimateRange: "3–5 days after shipping",
  price: "$42",
  shippingOrigin: "New York, NY",
  shippingRadius: null,
}

const renderView = (props = {}) => {
  return render(
    <MockBoot>
      <Order2DeliveryOptionsCompletedView {...baseProps} {...props} />
    </MockBoot>,
  )
}

describe("Order2DeliveryOptionsCompletedView", () => {
  it("renders the Edit affordance and calls onEdit when clicked", () => {
    const onEdit = jest.fn()
    renderView({ onEdit })

    const editButton = screen.getByRole("button", {
      name: "Edit shipping method",
    })
    fireEvent.click(editButton)

    expect(onEdit).toHaveBeenCalledTimes(1)
  })

  it("does not render the Edit affordance when onEdit is omitted (view-only)", () => {
    renderView()

    expect(
      screen.queryByRole("button", { name: "Edit shipping method" }),
    ).not.toBeInTheDocument()
  })
})
