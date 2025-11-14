import { exhibitions } from "Apps/__tests__/Fixtures/SelectedExhibitions"
import { SelectedExhibitions } from "Components/SelectedExhibitions"
import { MockBoot } from "DevTools/MockBoot"
import { render, screen } from "@testing-library/react"
import { fireEvent } from "@testing-library/react"

describe("SelectedExhibitions", () => {
  const props = {
    exhibitions: exhibitions as any,
    artistID: "andy-warhol",
    totalExhibitions: 100,
    // biome-ignore lint/a11y/useValidAnchor: <explanation>
    ViewAllLink: <a href="#">hi</a>,
  }

  beforeAll(() => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    window.matchMedia = undefined // Immediately set matching media query in Boot
  })

  it("is responsive", () => {
    const { container: smallContainer } = render(
      <MockBoot breakpoint="xs">
        <SelectedExhibitions {...props} />
      </MockBoot>,
    )
    // Check if collapsible behavior exists on small screens
    expect(smallContainer.innerHTML).toContain("Selected exhibitions (3)")

    const { container: largeContainer } = render(
      <MockBoot>
        <SelectedExhibitions {...props} />
      </MockBoot>,
    )
    // On large screens, all exhibitions should be visible without count
    expect(largeContainer.innerHTML).not.toContain("Selected exhibitions (3)")
  })

  it("shows count when collapsed", () => {
    const { container } = render(
      <MockBoot breakpoint="xs">
        <SelectedExhibitions {...props} />
      </MockBoot>,
    )

    expect(container.innerHTML).toContain("Selected exhibitions (3)")
    expect(container.innerHTML).not.toContain("Sculpture on the Move 1946–2016") // second item
  })

  it("shows all exhibitions when clicked", () => {
    const { container } = render(
      <MockBoot breakpoint="xs">
        <SelectedExhibitions {...props} />
      </MockBoot>,
    )

    expect(container.innerHTML).toContain("Selected exhibitions (3)")
    const button = screen.getByRole("button")
    fireEvent.click(button)
    expect(container.innerHTML).toContain("Sculpture on the Move 1946–2016")
    expect(container.innerHTML).not.toContain("Selected exhibitions (3)")
  })
})
