import { fireEvent, render, screen } from "@testing-library/react"
import { useFlag } from "@unleash/proxy-client-react"
import { ArtAssistantSearchLink } from "Components/Search/ArtAssistantSearchLink"
import { MockBoot } from "DevTools/MockBoot"

describe("Art Assistant search entry", () => {
  const user = { id: "user", accessToken: "token" }
  const renderLink = (props = {}) => {
    return render(
      <MockBoot user={user} context={{ user }}>
        <ArtAssistantSearchLink {...props} />
      </MockBoot>,
    )
  }

  beforeEach(() => {
    ;(useFlag as jest.Mock).mockReturnValue(true)
  })

  it("is hidden without access", () => {
    ;(useFlag as jest.Mock).mockReturnValue(false)
    renderLink()
    expect(
      screen.queryByRole("link", { name: "Ask Art Assistant" }),
    ).not.toBeInTheDocument()
  })

  it("links to the page and dismisses the mobile overlay", () => {
    const onNavigate = jest.fn()
    renderLink({ onNavigate })
    const link = screen.getByRole("link", { name: "Ask Art Assistant" })
    expect(link).toHaveAttribute("href", "/art-assistant")
    fireEvent.click(link)
    expect(onNavigate).toHaveBeenCalledTimes(1)
  })
})
