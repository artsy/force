import { graphql } from "react-relay"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { CellArtistSeriesFragmentContainer_Test_Query } from "__generated__/CellArtistSeriesFragmentContainer_Test_Query.graphql"
import { screen } from "@testing-library/react"
import { CellArtistSeriesFragmentContainer } from "Components/Cells/CellArtistSeries"

jest.unmock("react-relay")

const { renderWithRelay } = setupTestWrapperTL<
  CellArtistSeriesFragmentContainer_Test_Query
>({
  Component: CellArtistSeriesFragmentContainer,
  query: graphql`
    query CellArtistSeriesFragmentContainer_Test_Query @relay_test_operation {
      artistSeries(id: "example") {
        ...CellArtistSeries_artistSeries
      }
    }
  `,
})

describe("CellArtistSeries", () => {
  it("renders the component", () => {
    renderWithRelay({
      ArtistSeries: () => ({
        title: "Example ArtistSeries",
        artworksCountMessage: "8 available",
      }),
    })

    expect(screen.getByText("Example ArtistSeries")).toBeInTheDocument()
    expect(screen.getByText("8 available")).toBeInTheDocument()
  })
})
