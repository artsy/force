import { render, screen } from "@testing-library/react"
import { ArtAssistantDebugPanel } from "Apps/ArtAssistant/Components/ArtAssistantDebugPanel"
import { MockBoot } from "DevTools/MockBoot"

describe("Art Assistant debug panel", () => {
  it("shows received tool details without requiring the panel to be expanded", () => {
    render(
      <MockBoot>
        <ArtAssistantDebugPanel
          debug={{
            hasRequestedDetails: true,
            events: [
              {
                type: "call",
                toolName: "search",
                detail: "Search arguments",
                elapsedMs: 10,
              },
            ],
          }}
        />
      </MockBoot>,
    )
    expect(screen.getByText("Search arguments")).toBeVisible()
    expect(screen.queryByText(/server isn’t providing/)).not.toBeInTheDocument()
  })

  it("explains when the server withholds requested debug details", () => {
    render(
      <MockBoot>
        <ArtAssistantDebugPanel
          debug={{
            hasRequestedDetails: true,
            events: [
              {
                type: "call",
                toolName: "search",
                summary: "Searching artworks",
                detail: null,
                elapsedMs: 10,
              },
            ],
          }}
        />
      </MockBoot>,
    )
    expect(screen.getByText("Searching artworks")).toBeVisible()
    expect(
      screen.getByText(/server isn’t providing detailed tool data/),
    ).toBeVisible()
  })
})
