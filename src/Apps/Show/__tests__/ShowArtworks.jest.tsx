import { ShowArtworksRefetchContainer } from "Apps/Show/Components/ShowArtworks"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import type { ShowArtworks_Test_Query } from "__generated__/ShowArtworks_Test_Query.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: { location: { query: {}, pathname: "" } },
  }),
}))

const { renderWithRelay } = setupTestWrapperTL<ShowArtworks_Test_Query>({
  Component: ({ show }) => <ShowArtworksRefetchContainer show={show!} />,
  query: graphql`
    query ShowArtworks_Test_Query @relay_test_operation {
      show(id: "catty-show") {
        ...ShowArtworks_show
      }
    }
  `,
})

describe("ShowArtworks", () => {
  const trackEvent = jest.fn()

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
  })

  it("renders artwork grid", () => {
    renderWithRelay({ Show: () => ({ __typename: "Show" }) })

    expect(screen.getByTestId("metadata-artwork-link")).toBeInTheDocument()
  })

  it("renders filters in correct order", () => {
    renderWithRelay({
      FilterArtworksConnection: () => ({
        counts: {
          followedArtists: 10,
        },
        aggregations: [
          { slice: "ARTIST" },
          { slice: "ARTIST_NATIONALITY" },
          { slice: "MEDIUM" },
          { slice: "MATERIALS_TERMS" },
        ],
      }),
    })

    const expectedFilters = [
      "Keyword Search",
      "Artists",
      "Rarity",
      "Medium",
      "Price",
      "Size",
      "Availability",
      "Ways to Buy",
      "Material",
      "Artist Nationality or Ethnicity",
      "Time Period",
      "Color",
    ]

    const expandedButtons = screen.getAllByRole("button", { expanded: true })

    const filterButtons = expandedButtons.filter(button => {
      const buttonText = button.textContent
      return expectedFilters.some(filterName =>
        buttonText?.includes(filterName),
      )
    })

    expect(filterButtons.length).toBeGreaterThan(0)

    const actualFilterOrder = filterButtons
      .map(button => {
        const buttonText = button.textContent || ""
        return (
          expectedFilters.find(filterName => buttonText.includes(filterName)) ||
          ""
        )
      })
      .filter(Boolean)

    actualFilterOrder.forEach((filterName, index) => {
      if (index > 0) {
        const currentFilterIndex = expectedFilters.indexOf(filterName)
        const previousFilterIndex = expectedFilters.indexOf(
          actualFilterOrder[index - 1],
        )

        expect(currentFilterIndex).toBeGreaterThan(previousFilterIndex)
      }
    })
  })
})
