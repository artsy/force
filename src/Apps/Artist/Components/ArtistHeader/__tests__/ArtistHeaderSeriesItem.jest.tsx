import { screen } from "@testing-library/react"
import { ArtistHeaderSeriesItem } from "Apps/Artist/Components/ArtistHeader/ArtistHeaderSeriesItem"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useRouter } from "System/Hooks/useRouter"
import type { ArtistHeaderSeriesItem_Test_Query } from "__generated__/ArtistHeaderSeriesItem_Test_Query.graphql"
import { graphql } from "react-relay"

jest.unmock("react-relay")
jest.mock("System/Hooks/useRouter")

beforeAll(() => {
  ;(useRouter as jest.Mock).mockImplementation(() => ({
    match: {
      location: {
        query: {},
      },
    },
  }))
})

const { renderWithRelay } =
  setupTestWrapperTL<ArtistHeaderSeriesItem_Test_Query>({
    Component: (props: any) => {
      return (
        <ArtistHeaderSeriesItem
          artistSeries={props.artistSeries}
          width={props.width}
        />
      )
    },
    query: graphql`
      query ArtistHeaderSeriesItem_Test_Query @relay_test_operation {
        artistSeries(id: "example") {
          ...ArtistHeaderSeriesItem_artistSeries
        }
      }
    `,
  })

const ARTIST_SERIES = {
  slug: "roy-lichtenstein-crying-girl",
  title: "Crying Girl",
  forSaleArtworksCount: 26,
  image: {
    cropped: {
      src: "https://example.com/image.jpg",
      srcSet: "https://example.com/image.jpg 1x",
    },
  },
}

const COMPONENT_PROPS = { width: 140 }

describe("ArtistHeaderSeriesItem", () => {
  it("renders the series title", () => {
    renderWithRelay({ ArtistSeries: () => ARTIST_SERIES }, COMPONENT_PROPS)

    expect(screen.getByText("Crying Girl")).toBeInTheDocument()
  })

  it("renders the number of works available", () => {
    renderWithRelay({ ArtistSeries: () => ARTIST_SERIES }, COMPONENT_PROPS)

    expect(screen.getByText("26 available")).toBeInTheDocument()
  })

  it("links to the series page", () => {
    renderWithRelay({ ArtistSeries: () => ARTIST_SERIES }, COMPONENT_PROPS)

    expect(screen.getByRole("link")).toHaveAttribute(
      "href",
      "/artist-series/roy-lichtenstein-crying-girl",
    )
  })

  it("hides the cover image from assistive technology", () => {
    const { container } = renderWithRelay(
      { ArtistSeries: () => ARTIST_SERIES },
      COMPONENT_PROPS,
    )

    expect(container.querySelector("img")).toHaveAttribute("alt", "")
  })

  it("renders a placeholder when the series has no image", () => {
    const { container } = renderWithRelay(
      { ArtistSeries: () => ({ ...ARTIST_SERIES, image: null }) },
      COMPONENT_PROPS,
    )

    expect(container.querySelector("img")).not.toBeInTheDocument()
    expect(screen.getByText("Crying Girl")).toBeInTheDocument()
  })
})
