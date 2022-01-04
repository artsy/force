import { ArtworkGrid_artist } from "v2/__generated__/ArtworkGrid_artist.graphql"
import { ArtworkGrid_artworks } from "v2/__generated__/ArtworkGrid_artworks.graphql"
import { ArtworkGrid_Test_QueryRawResponse } from "v2/__generated__/ArtworkGrid_Test_Query.graphql"
import { renderRelayTree } from "v2/DevTools"
import { cloneDeep } from "lodash"
import { createFragmentContainer, graphql } from "react-relay"
import { ExtractProps } from "v2/Utils/ExtractProps"
import GridItem, { ArtworkGridItem } from "../../Artwork/GridItem"
import { ArtworkGridFixture } from "./ArtworkGridFixture"
import ArtworkGrid, {
  ArtworkGridContainer,
  ArtworkGridContainerState,
  ArtworkGridProps,
  createSectionedArtworks,
} from "../ArtworkGrid"
import {
  ArtworkGridEmptyState,
  ResetFilterLink,
} from "../ArtworkGridEmptyState"

jest.unmock("react-relay")
global.clearInterval = jest.fn()

const TestContainer = createFragmentContainer(
  ({
    artist,
    ...props
  }: ExtractProps<typeof ArtworkGrid> & { artist: ArtworkGrid_artist }) => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    return <ArtworkGrid {...props} artworks={artist.artworks_connection} />
  },
  {
    artist: graphql`
      fragment ArtworkGrid_artist on Artist {
        artworks_connection: artworksConnection(first: 4) {
          ...ArtworkGrid_artworks
        }
      }
    `,
  }
)

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
          (acc, aspect_ratio) => [
            ...acc,
            { node: { image: { aspect_ratio } } },
          ],
          []
        ),
      } as ArtworkGrid_artworks

      function expected(columnsRatios: number[][]) {
        return columnsRatios.map(columnRatios =>
          columnRatios.map(aspect_ratio => ({ image: { aspect_ratio } }))
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
    const getRelayWrapper = async ({
      artworks,
      ...componentProps
    }: Omit<ArtworkGridProps, "artworks"> & {
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      artworks: ArtworkGrid_Test_QueryRawResponse["artist"]["artworks_connection"]
    }) => {
      return await renderRelayTree({
        Component: TestContainer,
        componentProps,
        query: graphql`
          query ArtworkGrid_Test_Query
            @raw_response_type
            @relay_test_operation {
            artist(id: "pablo-picasso") {
              ...ArtworkGrid_artist
            }
          }
        `,
        mockData: {
          artist: { artworks_connection: artworks },
        } as ArtworkGrid_Test_QueryRawResponse,
      })
    }

    let props: Parameters<typeof getRelayWrapper>[0]

    beforeEach(() => {
      props = { artworks: cloneDeep(ArtworkGridFixture) }
    })

    it("Renders artworks if present", async () => {
      const wrapper = await getRelayWrapper(props)
      expect(wrapper.text()).toMatch(ArtworkGridFixture.edges[0].node.title)
      expect(wrapper.find(ArtworkGridItem).length).toBe(4)
    })

    it("Renders empty message if no artworks", async () => {
      const wrapper = await getRelayWrapper({
        artworks: { ...props.artworks, edges: [] },
      })
      expect(wrapper.find(ArtworkGridEmptyState).exists()).toBeTruthy()
    })

    it("Can call onClearFilters from empty message", async () => {
      const onClearFilters = jest.fn()
      const wrapper = await getRelayWrapper({
        onClearFilters,
        artworks: { ...props.artworks, edges: [] },
      })
      wrapper.find(ResetFilterLink).simulate("click")
      expect(onClearFilters).toBeCalled()
    })

    it("#componentDidMount sets state.interval if props.onLoadMore", async () => {
      props.onLoadMore = jest.fn()
      const wrapper = (await getRelayWrapper(props)).find(ArtworkGridContainer)
      const { interval } = wrapper.state() as ArtworkGridContainerState
      expect(interval).toBeGreaterThan(0)
    })

    it("#componentWillUnmount calls #clearInterval if state.interval exists", async () => {
      props.onLoadMore = jest.fn()
      const wrapper = (await getRelayWrapper(props)).find(ArtworkGridContainer)
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      wrapper.instance().componentWillUnmount()
      expect(global.clearInterval).toBeCalled()
    })

    it("#maybeLoadMore calls props.onLoadMore if scroll position is at end", async () => {
      props.onLoadMore = jest.fn()
      const wrapper = (await getRelayWrapper(props))
        .find(ArtworkGridContainer)
        .instance() as ArtworkGridContainer
      wrapper.maybeLoadMore()
      expect(props.onLoadMore).toBeCalled()
    })

    it("#sectionedArtworks divides artworks into columns", async () => {
      const wrapper = (await getRelayWrapper(props))
        .find(ArtworkGridContainer)
        .instance() as ArtworkGridContainer
      const artworks = wrapper.sectionedArtworksForAllBreakpoints(
        (props.artworks as any) as ArtworkGrid_artworks,
        [2, 2, 2, 3]
      )
      expect(artworks[0].length).toBe(2)
    })

    it("Renders artworks if present (2)", async () => {
      const wrapper = (await getRelayWrapper(props)).find(ArtworkGridContainer)
      expect(wrapper.text()).toMatch(ArtworkGridFixture.edges[0].node.title)
      expect(wrapper.find(ArtworkGridItem).length).toBe(4)
    })

    it("Should preload same number of images as specified in preloadImageCount", async () => {
      const wrapper = await getRelayWrapper({
        preloadImageCount: 2,
        columnCount: 2,
        ...props,
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
