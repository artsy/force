import { render, screen } from "@testing-library/react"
import { Notifications } from "../Notifications"

describe("Notifications", () => {
  it("should render tabs", () => {
    render(<Notifications />)

    expect(screen.getByText("All")).toBeInTheDocument()
    expect(screen.getByText("Alerts")).toBeInTheDocument()
  })
})
