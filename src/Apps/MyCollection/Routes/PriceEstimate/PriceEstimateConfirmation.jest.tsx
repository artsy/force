import { render, screen } from "@testing-library/react"
import { PriceEstimateConfirmation } from "./PriceEstimateConfirmation"

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      params: {
        artworkID: "some-id",
      },
    },
  }),
}))

jest.mock("Components/MetaTags", () => ({
  MetaTags: () => "MetaTags",
}))

describe("Price Estimate Confirmation page", () => {
  beforeEach(() => {
    render(<PriceEstimateConfirmation />)
  })

  it("renders correctly", () => {
    expect(screen.getByText("Price Estimate Request Sent")).toBeInTheDocument()
    expect(
      screen.getByText(
        "An Artsy Specialist will evaluate your artwork and contact you with a free price estimate.",
      ),
    ).toBeInTheDocument()
  })

  it("the button has the right link", () => {
    const links = screen.getAllByRole("link")
    expect(links[0]).toHaveAttribute("href", "/collector-profile/my-collection")
    expect(links[1]).toHaveAttribute(
      "href",
      "/collector-profile/my-collection/artwork/some-id",
    )
  })
})
