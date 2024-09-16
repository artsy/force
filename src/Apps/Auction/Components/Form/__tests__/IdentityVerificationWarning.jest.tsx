import { render, screen } from "@testing-library/react"
import { IdentityVerificationWarning } from "Apps/Auction/Components/Form/IdentityVerificationWarning"

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
})
