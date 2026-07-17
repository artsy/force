import { render, screen } from "@testing-library/react"
import { HammerPriceIndexApp } from "Apps/Games/Routes/HammerPrice/HammerPriceIndexApp"
import { hammerPriceProgressStore } from "Apps/Games/Routes/HammerPrice/Utils/gameProgressStore"
import { MockBoot } from "DevTools/MockBoot"

describe("HammerPriceIndexApp", () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it("lists browsable puzzles newest first with links", () => {
    render(
      <MockBoot>
        <HammerPriceIndexApp />
      </MockBoot>,
    )

    expect(screen.getByText("Hammer Price")).toBeInTheDocument()

    const links = screen.getAllByRole("link")

    expect(links.length).toBeGreaterThan(0)
    expect(links[0]).toHaveAttribute(
      "href",
      expect.stringContaining("/games/hammer-price/puzzles/"),
    )

    expect(screen.getByText(/Mark Rothko/)).toBeInTheDocument()
    expect(screen.getAllByText("Not started").length).toBeGreaterThan(0)
  })

  it("shows completion state from persisted progress", () => {
    hammerPriceProgressStore.saveProgress({
      puzzleId: "hp-2026-07-14",
      guesses: ["98385000"],
      updatedAt: "2026-07-14T00:00:00.000Z",
    })

    render(
      <MockBoot>
        <HammerPriceIndexApp />
      </MockBoot>,
    )

    expect(screen.getByText("Solved 1/6")).toBeInTheDocument()
  })
})
