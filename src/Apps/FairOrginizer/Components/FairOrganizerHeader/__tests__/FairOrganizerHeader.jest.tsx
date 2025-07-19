import { FairOrganizerHeaderFragmentContainer } from "Apps/FairOrginizer/Components/FairOrganizerHeader/FairOrganizerHeader"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import { DateTime } from "luxon"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("Components/HeaderIcon", () => ({
  HeaderIcon: () => "HeaderIcon",
}))

const { renderWithRelay } = setupTestWrapperTL({
  Component: FairOrganizerHeaderFragmentContainer,
  query: graphql`
    query FairOrganizerHeader_Test_Query @relay_test_operation {
      fairOrganizer(id: "example") {
        ...FairOrganizerHeader_fairOrganizer
      }
    }
  `,
})

describe("FairOrganizerHeader", () => {
  it("displays link to the fair page", () => {
    renderWithRelay({
      Fair: () => ({
        href: "fair/art-paris-2020",
      }),
    })

    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "fair/art-paris-2020")
  })

  it("displays title with organizer name", () => {
    renderWithRelay({
      FairOrganizer: () => ({
        name: "Art Paris",
      }),
    })
    expect(screen.getByText(/Explore Art Paris on Artsy/)).toBeInTheDocument()
  })

  it("displays icon, follow button, and info", () => {
    const { container } = renderWithRelay({})
    expect(container.innerHTML).toContain("HeaderIcon")
    expect(screen.getByRole("button", { name: "Follow" })).toBeInTheDocument()
    expect(screen.getByText("About")).toBeInTheDocument()
  })

  it("displays period", () => {
    renderWithRelay({
      Fair: () => ({
        exhibitionPeriod: "Sep 10 - 19",
      }),
    })
    expect(screen.getByText("Sep 10 - 19")).toBeInTheDocument()
  })

  it("doesn't display timer if event is passed", () => {
    const startAt = DateTime.local().minus({ days: 1 }).toString()
    renderWithRelay({ Fair: () => ({ startAt }) })
    expect(screen.queryByText("Opens in:")).not.toBeInTheDocument()
  })

  it("displays timer if event starts in future", () => {
    const startAt = DateTime.local().plus({ days: 1 }).toString()
    renderWithRelay({ Fair: () => ({ startAt }) })
    expect(screen.getByText("Opens in:")).toBeInTheDocument()
  })
})
