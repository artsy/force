import { CuritorialRailsTabBar } from "Apps/Auctions/Components/CuritorialRailsTabBar"
import { render, screen } from "@testing-library/react"

jest.unmock("react-relay")

describe("CuritorialRailsTabBar", () => {
  it("shows default tabs", async () => {
    render(<CuritorialRailsTabBar />)

    expect(screen.queryAllByText("Curators’ Picks")[0]).toBeInTheDocument()
    expect(screen.queryByText("Trending Lots")).toBeInTheDocument()
    expect(screen.queryByText("Lots for You")).not.toBeInTheDocument()
  })
})
