import { render, screen } from "@testing-library/react"
import { SignupValueProps } from "../SignupValueProps"
import { useTracking } from "react-tracking"
import { ActionType } from "@artsy/cohesion"
import userEvent from "@testing-library/user-event"

jest.mock("react-tracking")

describe("SignupValueProps", () => {
  const trackEvent = jest.fn()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent,
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders the section title", () => {
    render(<SignupValueProps />)
    expect(screen.getByText("Why Choose Artsy")).toBeInTheDocument()
  })

  it("renders all three value proposition cards", () => {
    render(<SignupValueProps />)

    expect(
      screen.getByText("The world’s largest online art marketplace"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("Transparent art pricing and market data"),
    ).toBeInTheDocument()
    expect(
      screen.getByText("Secure art buying, every time"),
    ).toBeInTheDocument()
  })

  it("tracks clickedBuyerProtection when Artsy Guarantee link is clicked", () => {
    render(<SignupValueProps />)

    const link = screen.getByText("Artsy Guarantee.")

    userEvent.click(link)

    expect(trackEvent).toHaveBeenCalledTimes(1)
    expect(trackEvent).toHaveBeenCalledWith({
      action: ActionType.clickedBuyerProtection,
      context_module: "about",
      context_page_owner_type: "signup",
      context_page_owner_id: null,
      destination_page_owner_type: "articles",
      destination_page_owner_slug: "360048946973-How-does-Artsy-protect-me",
    })
  })
})
