import ArtworkGrid, {
  createSectionedArtworks,
} from "Components/ArtworkGrid/ArtworkGrid"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import type { ArtworkGrid_artworks$data } from "__generated__/ArtworkGrid_artworks.graphql"
import { graphql } from "react-relay"
import { screen, fireEvent } from "@testing-library/react"
import { ArtworkGridFixture } from "./ArtworkGridFixture"

jest.unmock("react-relay")
global.clearInterval = jest.fn()
jest.mock("Components/Sticky", () => ({
  Sticky: ({ children }) => children({ stuck: false }),
  StickyProvider: ({ children }) => children,
}))

describe("ArtworkGrid", () => {
  describe("state", () => {
    describe("concerning column layout", () => {
      const aspectRatios = [
        1.23, 0.74, 0.75, 1.06, 0.73, 1.28, 0.77, 1.37, 1.37, 0.75, 0.74, 0.73,
        0.78, 0.71, 0.75, 1.34, 1.2, 0.71, 1.27, 0.73, 0.75, 0.8, 0.8, 1.36,
      ]

      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const artworks = {
        " $refType": null,
        edges: aspectRatios.reduce(
          (acc, aspectRatio) => [...acc, { node: { image: { aspectRatio } } }],
          [],
        ),
      } as ArtworkGrid_artworks$data

      function expected(columnsRatios: number[][]) {
        return columnsRatios.map(columnRatios =>
          columnRatios.map(aspectRatio => ({ image: { aspectRatio } })),
        )
      }

      it("tries to lay out artworks in columns such that they are similar in height, based on aspect ratio", () => {
        expect(createSectionedArtworks(artworks, 3)).toEqual(
          expected([
            [1.23, 1.06, 0.77, 0.74, 0.71, 1.2, 0.73, 0.8],
            [0.74, 1.28, 1.37, 0.75, 0.78, 1.34, 1.27, 0.75, 1.36],
            [0.75, 0.73, 1.37, 0.73, 0.75, 0.71, 0.8],
          ]),
        )
        expect(createSectionedArtworks(artworks, 4)).toEqual(
          expected([
            [1.23, 0.73, 0.74, 0.75, 0.75],
            [0.74, 1.37, 0.75, 0.71, 0.73, 1.36],
            [0.75, 0.77, 0.78, 1.2, 1.27, 0.8],
            [1.06, 1.28, 1.37, 0.73, 1.34, 0.71, 0.8],
          ]),
        )
      })
    })
  })

  describe("when rendering", () => {
    const onClearFilters = jest.fn()
    const onLoadMore = jest.fn()
    let preloadImageCount
    let columnCount

    const { renderWithRelay } = setupTestWrapperTL({
      Component: (props: any) => {
        return (
          <MockBoot>
            <ArtworkGrid
              {...props}
              artworks={props.artworksConnection}
              onClearFilters={onClearFilters}
              onLoadMore={onLoadMore}
              columnCount={columnCount}
              preloadImageCount={preloadImageCount}
            />
          </MockBoot>
        )
      },
      query: graphql`
        query ArtworkGridTestQuery @raw_response_type @relay_test_operation {
          artworksConnection(first: 4) {
            ...ArtworkGrid_artworks
          }
        }
      `,
    })

    beforeEach(() => {
      jest.clearAllMocks()
      preloadImageCount = undefined
      columnCount = undefined
    })

    it("Renders artworks if present", async () => {
      renderWithRelay({
        FilterArtworksConnection: () => ArtworkGridFixture,
      })

      expect(
        screen.getByText(ArtworkGridFixture.edges[0].node.title),
      ).toBeInTheDocument()
      expect(screen.getAllByTestId("artwork-link")).toHaveLength(4)
    })

    it("Renders empty message if no artworks", async () => {
      renderWithRelay({
        FilterArtworksConnection: () => ({ edges: [] }),
      })

      expect(screen.getByText("Clear all filters")).toBeInTheDocument()
      expect(
        screen.getByText(/Change your filter criteria to view more works/),
      ).toBeInTheDocument()
    })

    it("Can call onClearFilters from empty message", async () => {
      renderWithRelay({
        FilterArtworksConnection: () => ({ edges: [] }),
      })

      const resetLink = screen.getByText("Clear all filters")
      fireEvent.click(resetLink)

      expect(onClearFilters).toBeCalled()
    })

    it("#maybeLoadMore calls props.onLoadMore if scroll position is at end", async () => {
      jest.useFakeTimers()
      renderWithRelay({
        FilterArtworksConnection: () => ArtworkGridFixture,
      })

      jest.advanceTimersByTime(150)
      expect(onLoadMore).toBeCalled()
    })
  })
})
