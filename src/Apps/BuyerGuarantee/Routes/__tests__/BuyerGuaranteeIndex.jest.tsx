import { BuyerGuaranteeIndex } from "Apps/BuyerGuarantee/Routes/BuyerGuaranteeIndex"
import { MockBoot } from "DevTools/MockBoot"
import { render, screen } from "@testing-library/react"

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => false,
}))

describe("BuyerGuaranteeIndex", () => {
  it("renders correctly", () => {
    const { container } = render(
      <MockBoot>
        <BuyerGuaranteeIndex />
      </MockBoot>,
    )

    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument()
    expect(container.firstChild).not.toBeNull()
  })
})
