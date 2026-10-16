import { fireEvent, render, screen } from "@testing-library/react"
import { ArtAssistantSearchLink } from "Components/Search/ArtAssistantSearchLink"
import { useEnableArtAssistant } from "Apps/ArtAssistant/hooks/useEnableArtAssistant"
import { MockBoot } from "DevTools/MockBoot"

jest.mock("Apps/ArtAssistant/hooks/useEnableArtAssistant")

describe("Art Assistant search entry", () => {
  it("is hidden without access", () => {
    ;(useEnableArtAssistant as jest.Mock).mockReturnValue(false)
    render(
      <MockBoot>
        <ArtAssistantSearchLink />
      </MockBoot>,
    )
    expect(
      screen.queryByRole("link", { name: "Ask Art Assistant" }),
    ).not.toBeInTheDocument()
  })
  it("links to the page and dismisses the mobile overlay", () => {
    ;(useEnableArtAssistant as jest.Mock).mockReturnValue(true)
    const onNavigate = jest.fn()
    render(
      <MockBoot>
        <ArtAssistantSearchLink onNavigate={onNavigate} />
      </MockBoot>,
    )
    const link = screen.getByRole("link", { name: "Ask Art Assistant" })
    expect(link).toHaveAttribute("href", "/art-assistant")
    fireEvent.click(link)
    expect(onNavigate).toHaveBeenCalledTimes(1)
  })
})
