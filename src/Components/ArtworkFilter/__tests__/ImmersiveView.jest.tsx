import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { ImmersiveView } from "Components/ArtworkFilter/ImmersiveView"
import type { ImmersiveViewTestQuery } from "__generated__/ImmersiveViewTestQuery.graphql"
import { graphql } from "react-relay"
import { ImmersiveView_filtered_artworks$data } from "__generated__/ImmersiveView_filtered_artworks.graphql"

jest.unmock("react-relay")

const mockClose = jest.fn()

const { renderWithRelay } = setupTestWrapperTL<ImmersiveViewTestQuery>({
  Component: props => (
    <ImmersiveView artworks={props.filtered_artworks!} onClose={mockClose} />
  ),
  query: graphql`
    query ImmersiveViewTestQuery @relay_test_operation {
      filtered_artworks: artworksConnection {
        ...ImmersiveView_filtered_artworks
      }
    }
  `,
})

describe("ImmersiveView", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders correctly", () => {
    renderWithRelay({
      FilterArtworksConnection: () => filterArtworksConnectionData,
    })

    expect(screen.getByText("Artwork 1")).toBeInTheDocument()
    expect(screen.getByRole("img", { name: "Artwork 1" })).toHaveAttribute(
      "src",
      "https://example.com/artwork-1.jpg",
    )

    expect(screen.queryByText("Artwork 2")).not.toBeInTheDocument()
    expect(screen.queryByText("Artwork 3")).not.toBeInTheDocument()
  })

  it("closes", () => {
    renderWithRelay()

    screen.getByRole("button", { name: "Close" }).click()

    expect(mockClose).toHaveBeenCalled()
  })
})

const filterArtworksConnectionData: Pick<
  ImmersiveView_filtered_artworks$data,
  "edges"
> = {
  edges: [
    {
      immersiveArtworkNode: {
        slug: "artwork-1",
        formattedMetadata: "Artwork 1",
        image: {
          url: "https://example.com/artwork-1.jpg",
        },
      },
    },
    {
      immersiveArtworkNode: {
        slug: "artwork-2",
        formattedMetadata: "Artwork 2",
        image: {
          url: "https://example.com/artwork-2.jpg",
        },
      },
    },
    {
      immersiveArtworkNode: {
        slug: "artwork-3",
        formattedMetadata: "Artwork 3",
        image: {
          url: "https://example.com/artwork-3.jpg",
        },
      },
    },
  ],
}
