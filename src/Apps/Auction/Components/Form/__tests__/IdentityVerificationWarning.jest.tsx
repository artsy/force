import { render, screen } from "@testing-library/react"
import { IdentityVerificationWarning } from "Apps/Auction/Components/Form/IdentityVerificationWarning"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

jest.mock("System/Hooks/useFeatureFlag")

describe("IdentityVerificationWarning", () => {
  it("renders correct components", () => {
    render(<IdentityVerificationWarning />)
    expect(
      screen.getByText(
        "This auction requires Artsy to verify your identity before bidding."
      )
    ).toBeInTheDocument()
  })

  it("shows /conditions-of-sale link", () => {
    render(<IdentityVerificationWarning />)
    expect(
      screen.getByRole("link", {
        name: "Conditions of Sale",
      })
    ).toHaveAttribute("href", "/conditions-of-sale")
  })

  describe("when showNewDisclaimer is true", () => {
    beforeAll(() => {
      ;(useFeatureFlag as jest.Mock).mockImplementation(
        (f: string) => f === "diamond_new-terms-and-conditions"
      )
    })

    afterAll(() => {
      ;(useFeatureFlag as jest.Mock).mockReset()
    })

    it("does not show /conditions-of-sale link", () => {
      render(<IdentityVerificationWarning />)
      expect(
        screen.queryByRole("link", {
          name: "Conditions of Sale",
        })
      ).not.toBeInTheDocument()
    })
  })
})
