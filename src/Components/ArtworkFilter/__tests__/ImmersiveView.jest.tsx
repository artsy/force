import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { ImmersiveView } from "Components/ArtworkFilter/ImmersiveView"
import type { ImmersiveViewTestQuery } from "__generated__/ImmersiveViewTestQuery.graphql"
import { graphql } from "react-relay"

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
      FilterArtworksConnection: () => ({
        edges: [
          { immersiveArtworkNode: { slug: "artwork-1" } },
          { immersiveArtworkNode: { slug: "artwork-2" } },
          { immersiveArtworkNode: { slug: "artwork-3" } },
        ],
      }),
    })

    expect(screen.getByText("artwork-1")).toBeInTheDocument()
    expect(screen.queryByText("artwork-2")).not.toBeInTheDocument()
    expect(screen.queryByText("artwork-3")).not.toBeInTheDocument()
  })

  it("closes", () => {
    renderWithRelay()

    screen.getByRole("button", { name: "Close" }).click()

    expect(mockClose).toHaveBeenCalled()
  })
})
