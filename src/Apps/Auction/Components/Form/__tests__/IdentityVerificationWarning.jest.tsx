import { render, screen } from "@testing-library/react"
import { IdentityVerificationWarning } from "Apps/Auction/Components/Form/IdentityVerificationWarning"

describe("IdentityVerificationWarning", () => {
  it("renders correct components", () => {
    render(<IdentityVerificationWarning />)
    expect(
      screen.getByText(
        "This auction requires Artsy to verify your identity before bidding."
      )
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "After you register, you’ll receive an email with a link to complete identity verification."
      )
    ).toBeInTheDocument()
  })
})
