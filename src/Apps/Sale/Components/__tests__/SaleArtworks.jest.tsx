import { screen } from "@testing-library/react"
import { SaleArtworkFilterRefetchContainer } from "Apps/Sale/Components/SaleArtworks"
import {
  artistAggregation,
  partnerAggregation,
  locationCityAggregation,
  mediumAggregation,
  materialsTermsAggregation,
  artistNationalityAggregation,
} from "Apps/__tests__/Fixtures/aggregations"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { SaleArtworks_Test_Query } from "__generated__/SaleArtworks_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: { query: {}, pathname: "" },
      params: { slug: "" },
    },
  }),
}))

const { renderWithRelay } = setupTestWrapperTL<SaleArtworks_Test_Query>({
  Component: ({ viewer }) => (
    <MockBoot user={{ id: "percy-z" }}>
      <SaleArtworkFilterRefetchContainer viewer={viewer!} />
    </MockBoot>
  ),
  query: graphql`
    query SaleArtworks_Test_Query @relay_test_operation {
      viewer {
        ...SaleArtworksFilter_viewer
      }
    }
  `,
})

describe("SaleArtworks", () => {
  it("renders correctly", () => {
    renderWithRelay({
      Artwork: () => ({
        title: "Artwork title",
      }),
    })

    expect(screen.getByText("Artwork title")).toBeInTheDocument()
  })

  it("renders filters", () => {
    renderWithRelay({
      FilterArtworksConnection: () => ({
        counts: {
          followedArtists: 10,
        },
        aggregations: [
          artistAggregation,
          partnerAggregation,
          locationCityAggregation,
          mediumAggregation,
          materialsTermsAggregation,
          artistNationalityAggregation,
        ],
      }),
    })

    expect(screen.getByText("Artists")).toBeInTheDocument()

    // Quick filters share same label
    expect(screen.getAllByText("Rarity")).toHaveLength(2)
    expect(screen.getAllByText("Medium")).toHaveLength(2)

    expect(screen.getByText("Price")).toBeInTheDocument()
    expect(screen.getByText("Size")).toBeInTheDocument()
    expect(screen.getByText("Ways to Buy")).toBeInTheDocument()
    expect(screen.getByText("Material")).toBeInTheDocument()
    expect(
      screen.getByText("Artist Nationality or Ethnicity")
    ).toBeInTheDocument()
    expect(screen.getByText("Artwork Location")).toBeInTheDocument()
    expect(screen.getByText("Time Period")).toBeInTheDocument()
    expect(screen.getByText("Color")).toBeInTheDocument()
    expect(screen.getByText("Galleries and Institutions")).toBeInTheDocument()
  })

  it("renders sort input", () => {
    renderWithRelay()

    expect(screen.getByText("Sort: Curated")).toBeInTheDocument()
  })
})
