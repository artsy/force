import { render, screen } from "@testing-library/react"
import { MarketingGoogleSignInSection } from "Apps/Marketing/Components/MarketingGoogleSignInSection"
import { MockBoot } from "DevTools/MockBoot"

describe("MarketingGoogleSignInSection", () => {
  const renderSection = () => {
    return render(
      <MockBoot>
        <MarketingGoogleSignInSection />
      </MockBoot>,
    )
  }

  it("explains which Google data is shared and why", () => {
    renderSection()

    expect(
      screen.getByRole("heading", { name: "Sign in with Google" }),
    ).toBeInTheDocument()
    expect(
      screen.getByText(/Google shares your name, email address and profile/),
    ).toBeInTheDocument()
  })

  it("links to the privacy policy", () => {
    renderSection()

    expect(
      screen.getByRole("link", { name: "Privacy Policy" }),
    ).toHaveAttribute("href", "/privacy")
  })
})
