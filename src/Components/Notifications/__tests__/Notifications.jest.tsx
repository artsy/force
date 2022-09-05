import { fireEvent, render, screen } from "@testing-library/react"
import { Notifications } from "../Notifications"

describe("Notifications", () => {
  it("should render tabs", () => {
    render(<Notifications />)

    expect(screen.getByText("All")).toBeInTheDocument()
    expect(screen.getByText("Alerts")).toBeInTheDocument()
  })

  it("should render 'Manage your alerts' link for 'Alerts' tab", () => {
    render(<Notifications />)

    fireEvent.click(screen.getByText("Alerts"))

    expect(screen.getByText("Manage your alerts")).toBeInTheDocument()
  })
})
