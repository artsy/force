import { FairOrganizerPastEventsRailFragmentContainer as FairOrganizerPastEventsRail } from "Apps/FairOrginizer/Components/FairOrganizerPastEventsRail"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { FairOrganizerPastEventsRailTestQuery } from "__generated__/FairOrganizerPastEventsRailTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

describe("FairOrganizerPastEventsRail", () => {
  const { renderWithRelay } =
    setupTestWrapperTL<FairOrganizerPastEventsRailTestQuery>({
      Component: FairOrganizerPastEventsRail,
      query: graphql`
        query FairOrganizerPastEventsRailTestQuery @relay_test_operation {
          fairOrganizer(id: "the-armory-show") {
            ...FairOrganizerPastEventsRail_fairOrganizer
          }
        }
      `,
    })

  it("renders correctly", () => {
    renderWithRelay({
      CroppedImageUrl: () => ({
        width: 325,
        height: 140,
      }),
      FairConnection: () => ({
        edges: [
          {
            node: {
              name: "Banksy",
              slug: "banksy",
            },
          },
          {
            node: {
              name: "Kaws",
              slug: "kaws",
            },
          },
        ],
      }),
    })

    const links = screen.getAllByRole("link")
    expect(links).toHaveLength(2)
    expect(links[0]).toHaveAttribute("href", "/fair/banksy")
  })

  it("does not render rail if no collections", () => {
    const { container } = renderWithRelay({
      FairConnection: () => ({
        edges: null,
      }),
    })

    expect(container.firstChild).toBeNull()
  })
})
