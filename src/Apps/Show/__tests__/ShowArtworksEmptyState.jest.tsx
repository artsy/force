import { screen } from "@testing-library/react"
import { ShowArtworksEmptyStateFragmentContainer } from "Apps/Show/Components/ShowArtworksEmptyState"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ShowArtworksEmptyStateTestQuery } from "__generated__/ShowArtworksEmptyStateTestQuery.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<ShowArtworksEmptyStateTestQuery>(
  {
    Component: ShowArtworksEmptyStateFragmentContainer,
    query: graphql`
      query ShowArtworksEmptyStateTestQuery @relay_test_operation {
        show(id: "example-show-id") {
          ...ShowArtworksEmptyState_show
        }
      }
    `,
  },
)

describe("ShowArtworksEmptyState", () => {
  describe("fair booth", () => {
    it("renders the correct message for non-closed fair booths", () => {
      renderWithRelay({ Show: () => ({ isFairBooth: true }) })

      expect(
        screen.getByText("This fair booth is currently unavailable."),
      ).toBeInTheDocument()

      expect(
        screen.queryByText(
          "Please check back closer to the fair for artworks.",
        ),
      ).toBeInTheDocument()
    })

    it("renders the correct message for closed fair booths", () => {
      renderWithRelay({
        Show: () => ({ isFairBooth: true, status: "closed" }),
      })

      expect(
        screen.getByText("This fair booth is currently unavailable."),
      ).toBeInTheDocument()
      expect(
        screen.queryByText(
          "Please check back closer to the fair for artworks.",
        ),
      ).not.toBeInTheDocument()
    })
  })

  describe("show", () => {
    it("renders the correct message for non-closed shows", () => {
      renderWithRelay({ Show: () => ({ isFairBooth: false }) })

      expect(
        screen.getByText("This show is currently unavailable."),
      ).toBeInTheDocument()

      expect(
        screen.queryByText(
          "Please check back closer to the show for artworks.",
        ),
      ).toBeInTheDocument()
    })

    it("renders the correct message for closed shows", () => {
      renderWithRelay({
        Show: () => ({ isFairBooth: false, status: "closed" }),
      })

      expect(
        screen.getByText("This show is currently unavailable."),
      ).toBeInTheDocument()
      expect(
        screen.queryByText(
          "Please check back closer to the show for artworks.",
        ),
      ).not.toBeInTheDocument()
    })
  })
})
