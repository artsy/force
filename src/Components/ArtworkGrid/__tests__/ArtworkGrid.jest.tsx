import { ArtworkGrid_artworks$data } from "__generated__/ArtworkGrid_artworks.graphql"
import { MockBoot } from "DevTools/MockBoot"
import { graphql } from "react-relay"
import GridItem, { ArtworkGridItem } from "Components/Artwork/GridItem"
import { ArtworkGridFixture } from "./ArtworkGridFixture"
import ArtworkGrid, {
  ArtworkGridContainer,
  ArtworkGridContainerState,
  createSectionedArtworks,
} from "Components/ArtworkGrid/ArtworkGrid"
import {
  ArtworkGridEmptyState,
  ResetFilterLink,
} from "Components/ArtworkGrid/ArtworkGridEmptyState"
import { setupTestWrapper } from "DevTools/setupTestWrapper"

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
        1.23,
        0.74,
        0.75,
        1.06,
        0.73,
        1.28,
        0.77,
        1.37,
        1.37,
        0.75,
        0.74,
        0.73,
        0.78,
        0.71,
        0.75,
        1.34,
        1.2,
        0.71,
        1.27,
        0.73,
        0.75,
        0.8,
        0.8,
        1.36,
      ]

      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      const artworks = {
        " $refType": null,
        edges: aspectRatios.reduce(
          (acc, aspectRatio) => [...acc, { node: { image: { aspectRatio } } }],
          []
        ),
      } as ArtworkGrid_artworks$data

      function expected(columnsRatios: number[][]) {
        return columnsRatios.map(columnRatios =>
          columnRatios.map(aspectRatio => ({ image: { aspectRatio } }))
        )
      }

      it("tries to lay out artworks in columns such that they are similar in height, based on aspect ratio", () => {
        expect(createSectionedArtworks(artworks, 3)).toEqual(
          expected([
            [1.23, 1.06, 0.77, 0.74, 0.71, 1.2, 0.73, 0.8],
            [0.74, 1.28, 1.37, 0.75, 0.78, 1.34, 1.27, 0.75, 1.36],
            [0.75, 0.73, 1.37, 0.73, 0.75, 0.71, 0.8],
          ])
        )
        expect(createSectionedArtworks(artworks, 4)).toEqual(
          expected([
            [1.23, 0.73, 0.74, 0.75, 0.75],
            [0.74, 1.37, 0.75, 0.71, 0.73, 1.36],
            [0.75, 0.77, 0.78, 1.2, 1.27, 0.8],
            [1.06, 1.28, 1.37, 0.73, 1.34, 0.71, 0.8],
          ])
        )
      })
    })
  })

  describe("when rendering", () => {
    const onClearFilters = jest.fn()
    const onLoadMore = jest.fn()
    let preloadImageCount
    let columnCount

    const { getWrapper } = setupTestWrapper({
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
        query ArtworkGrid_Test_Query @raw_response_type @relay_test_operation {
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
      const { wrapper } = getWrapper({
        FilterArtworksConnection: () => ArtworkGridFixture,
      })

      expect(wrapper.text()).toMatch(ArtworkGridFixture.edges[0].node.title)
      expect(wrapper.find(ArtworkGridItem).length).toBe(4)
    })

    it("Renders empty message if no artworks", async () => {
      const { wrapper } = getWrapper({
        FilterArtworksConnection: () => ({ edges: [] }),
      })

      expect(wrapper.find(ArtworkGridEmptyState).exists()).toBeTruthy()
    })

    it("Can call onClearFilters from empty message", async () => {
      const { wrapper } = getWrapper({
        FilterArtworksConnection: () => ({ edges: [] }),
      })
      wrapper.find(ResetFilterLink).simulate("click")

      expect(onClearFilters).toBeCalled()
    })

    it("#componentDidMount sets state.interval if props.onLoadMore", async () => {
      const { wrapper } = getWrapper({
        FilterArtworksConnection: () => ArtworkGridFixture,
      })
      const artworkGridContainer = await wrapper.find(ArtworkGridContainer)

      const {
        interval,
      } = artworkGridContainer.state() as ArtworkGridContainerState
      expect(interval).toBeGreaterThan(0)
    })

    it("#componentWillUnmount calls #clearInterval if state.interval exists", async () => {
      const { wrapper } = getWrapper({
        FilterArtworksConnection: () => ArtworkGridFixture,
      })
      const artworkGridContainer = await wrapper.find(ArtworkGridContainer)

      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      artworkGridContainer.instance().componentWillUnmount()
      expect(global.clearInterval).toBeCalled()
    })

    it("#maybeLoadMore calls props.onLoadMore if scroll position is at end", async () => {
      jest.useFakeTimers()
      getWrapper({
        FilterArtworksConnection: () => ArtworkGridFixture,
      })

      jest.advanceTimersByTime(150)
      expect(onLoadMore).toBeCalled()
    })

    it("#sectionedArtworks divides artworks into columns", async () => {
      const { wrapper } = getWrapper({
        FilterArtworksConnection: () => ArtworkGridFixture,
      })
      const artworkGridContainer = (await wrapper
        .find(ArtworkGridContainer)
        .instance()) as ArtworkGridContainer
      const artworks = artworkGridContainer.sectionedArtworksForAllBreakpoints(
        ArtworkGridFixture,
        [2, 2, 2, 3]
      )
      expect(artworks[0].length).toBe(2)
    })

    it("Renders artworks if present (2)", async () => {
      const { wrapper } = getWrapper({
        FilterArtworksConnection: () => ArtworkGridFixture,
      })
      const artworkGridContainer = await wrapper.find(ArtworkGridContainer)

      expect(artworkGridContainer.text()).toMatch(
        ArtworkGridFixture.edges[0].node.title
      )
      expect(artworkGridContainer.find(ArtworkGridItem).length).toBe(4)
    })

    it("Should preload same number of images as specified in preloadImageCount", async () => {
      columnCount = 2
      preloadImageCount = 2
      const { wrapper } = getWrapper({
        FilterArtworksConnection: () => ArtworkGridFixture,
      })

      // DOM order looks like:
      // |0|2| - preload
      // |1|3| - lazyload

      const gridItems = wrapper.find(GridItem)

      expect(gridItems.get(0).props.lazyLoad).toBe(false)
      expect(gridItems.get(1).props.lazyLoad).toBe(true)
      expect(gridItems.get(2).props.lazyLoad).toBe(false)
      expect(gridItems.get(3).props.lazyLoad).toBe(true)
    })
  })
})
