import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AISearchDebugPanel } from "Components/AISearch/Components/AISearchDebugPanel"
import type { AISearchDebugEntry } from "Components/AISearch/Utils/aiSearchTypes"
import { MockBoot } from "DevTools/MockBoot"

const entry = (
  overrides: Partial<AISearchDebugEntry> = {},
): AISearchDebugEntry => {
  return {
    id: "artworksConnection-0",
    toolName: "artworksConnection",
    activity: "SEARCHING_ARTWORKS",
    query: "artworksConnection(keyword: “Warhol”, first: 10)",
    resultSummary: null,
    status: "OK",
    ...overrides,
  }
}

const renderPanel = async (entries: AISearchDebugEntry[]) => {
  render(
    <MockBoot>
      <AISearchDebugPanel entries={entries} />
    </MockBoot>,
  )

  const toggle = screen.queryByText(/Debug:/)

  if (toggle) {
    await userEvent.click(toggle)
  }
}

describe("AISearchDebugPanel", () => {
  it("renders nothing when the turn disclosed no queries", async () => {
    await renderPanel([])

    expect(screen.queryByText(/Debug:/)).not.toBeInTheDocument()
  })

  it("shows the query the agent ran and how it resolved", async () => {
    await renderPanel([entry()])

    expect(screen.getByText("Debug: 1 query")).toBeInTheDocument()
    expect(
      screen.getByText("artworksConnection(keyword: “Warhol”, first: 10)"),
    ).toBeInTheDocument()
    expect(screen.getByText(/artworksConnection — ok/)).toBeInTheDocument()
  })

  it("counts every query in the label", async () => {
    await renderPanel([entry(), entry({ id: "artistsConnection-1" })])

    expect(screen.getByText("Debug: 2 queries")).toBeInTheDocument()
  })

  it("surfaces a failed call with its detail", async () => {
    await renderPanel([
      entry({ status: "FAILED", resultSummary: "Upstream timed out" }),
    ])

    expect(screen.getByText(/artworksConnection — failed/)).toBeInTheDocument()
    expect(screen.getByText("Upstream timed out")).toBeInTheDocument()
  })
})
