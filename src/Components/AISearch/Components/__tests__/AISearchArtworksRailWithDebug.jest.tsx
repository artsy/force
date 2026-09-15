import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AISearchArtworksRailWithDebug } from "Components/AISearch/Components/AISearchArtworksRailWithDebug"
import type { AISearchDebugEntry } from "Components/AISearch/Utils/aiSearchTypes"
import { MockBoot } from "DevTools/MockBoot"

const ENTRIES: AISearchDebugEntry[] = [
  {
    id: "artworksConnection-0",
    toolName: "artworksConnection",
    activity: "SEARCHING_ARTWORKS",
    query: "artworksConnection(keyword: “Warhol”, first: 10)",
    resultSummary: null,
    status: "OK",
  },
]

const renderRail = (entries = ENTRIES) => {
  render(
    <MockBoot>
      <AISearchArtworksRailWithDebug
        title="Works from the results"
        entries={entries}
        getItems={() => {
          return [<div key="artwork">An artwork card</div>]
        }}
      />
    </MockBoot>,
  )
}

describe("AISearchArtworksRailWithDebug", () => {
  it("offers the toggle beside the rail title, collapsed", () => {
    renderRail()

    expect(screen.getByText("Works from the results")).toBeInTheDocument()
    expect(screen.getByText("Debug: 1 query")).toBeInTheDocument()
    expect(screen.queryByText(/artworksConnection\(/)).not.toBeInTheDocument()
  })

  it("reveals the agent's queries above the cards when toggled", async () => {
    renderRail()

    await userEvent.click(screen.getByText("Debug: 1 query"))

    const query = screen.getByText(
      "artworksConnection(keyword: “Warhol”, first: 10)",
    )
    const card = screen.getByText("An artwork card")

    expect(query).toBeInTheDocument()
    // Node.DOCUMENT_POSITION_FOLLOWING: the queries precede the cards.
    expect(query.compareDocumentPosition(card) & 4).toBeTruthy()
  })

  it("collapses again on a second click", async () => {
    renderRail()

    await userEvent.click(screen.getByText("Debug: 1 query"))
    await userEvent.click(screen.getByText("Hide"))

    expect(screen.queryByText(/artworksConnection\(/)).not.toBeInTheDocument()
  })

  it("always renders the cards, toggle or not", () => {
    renderRail()

    expect(screen.getByText("An artwork card")).toBeInTheDocument()
  })
})
