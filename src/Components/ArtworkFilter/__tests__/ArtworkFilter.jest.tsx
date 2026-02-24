import { fireEvent, screen } from "@testing-library/react"
import { useFlag } from "@unleash/proxy-client-react"
import { ArtworkFilter, getTotalCountLabel } from "Components/ArtworkFilter"
import { initialArtworkFilterState } from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtworkQueryFilter } from "Components/ArtworkFilter/ArtworkQueryFilter"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import omit from "lodash/omit"
import { useTracking } from "react-tracking"
import { ArtworkFilterFixture } from "./fixtures/ArtworkFilter.fixture"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("Components/Pagination/useComputeHref")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: () => ({
    match: {
      location: { query: {}, pathname: "" },
    },
  }),
}))

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "example-order-id",
    contextPageOwnerSlug: "example-owner-slug",
    contextPageOwnerType: "example-owner-type",
  })),
}))

describe("ArtworkFilter", () => {
  const onFilterClick = jest.fn()
  const onChange = jest.fn()
  let sortOptionsMock
  let filters
  let breakpoint

  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => (
      <MockBoot breakpoint={breakpoint}>
        <ArtworkFilter
          {...(props as any)}
          onFilterClick={onFilterClick}
          onChange={onChange}
          sortOptions={sortOptionsMock}
          filters={{ ...initialArtworkFilterState, ...filters }}
        />
      </MockBoot>
    ),
    query: ArtworkQueryFilter,
  })

  const trackEvent = jest.fn()

  beforeEach(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    breakpoint = "lg"
    filters = {
      colors: ["yellow", "pink"],
    }
    sortOptionsMock = [
      { value: "sortTest1", text: "Sort Test 1" },
      { value: "sortTest2", text: "Sort Test 2" },
    ]
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe("tracks clicks", () => {
    it("on filter", () => {
      renderWithRelay()

      fireEvent.click(screen.getByText("Purchase"))

      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "commercialFilterParamsChanged",
          context_module: "artworkGrid",
          // `current` and `changed` are sent as
          // JSON blobs, and verified below
        }),
      )

      const { current, changed } = trackEvent.mock.calls[0][0]

      expect(JSON.parse(current)).toMatchObject(
        omit(
          {
            ...initialArtworkFilterState,
            ...filters,
            acquireable: true,
          },
          "keyword",
        ),
      )

      expect(JSON.parse(changed)).toMatchObject({
        acquireable: true,
      })
    })

    it("on page change", async () => {
      renderWithRelay({
        Viewer: () => ({
          filtered_artworks: {
            pageInfo: {
              hasNextPage: true,
              endCursor: "cursor1",
            },
            pageCursors: {
              around: [
                {
                  cursor: "cursor1",
                  page: 1,
                  isCurrent: true,
                },
                {
                  cursor: "cursor2",
                  page: 2,
                  isCurrent: false,
                },
                {
                  cursor: "cursor3",
                  page: 3,
                  isCurrent: false,
                },
                {
                  cursor: "cursor4",
                  page: 4,
                  isCurrent: false,
                },
              ],
              first: null,
              last: {
                cursor: "cursor4=",
                page: 4,
                isCurrent: false,
              },
              previous: null,
            },
          },
        }),
      })

      fireEvent.click(screen.getByText("3"))

      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "clickedChangePage",
          context_module: "artworkGrid",
          page_current: 1,
          page_changed: 3,
        }),
      )
    })

    it("on immersive view option viewed", () => {
      ;(useFlag as jest.Mock).mockImplementation(
        flag => flag === "onyx_enable-immersive-view",
      )

      renderWithRelay({
        Viewer: () => ({
          ...ArtworkFilterFixture.viewer,
        }),
      })

      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "immersiveViewOptionViewed",
          context_module: "artworkGrid",
          context_page_owner_type: "example-owner-type",
          context_page_owner_id: "example-order-id",
        }),
      )
    })

    it("on immersive view button click", () => {
      ;(useFlag as jest.Mock).mockImplementation(
        flag => flag === "onyx_enable-immersive-view",
      )

      renderWithRelay({
        Viewer: () => ({
          ...ArtworkFilterFixture.viewer,
        }),
      })

      fireEvent.click(screen.getByRole("button", { name: "Immersive View" }))

      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "clickedImmersiveView",
          context_module: "artworkGrid",
          context_page_owner_type: "example-owner-type",
          context_page_owner_id: "example-order-id",
        }),
      )
    })
  })

  describe("desktop", () => {
    beforeEach(() => {
      ;(useFlag as jest.Mock).mockImplementation(
        flag => flag === "onyx_enable-immersive-view",
      )
    })

    it("renders default UI items", () => {
      renderWithRelay({
        Viewer: () => ({
          ...ArtworkFilterFixture.viewer,
        }),
      })

      expect(screen.getByRole("navigation")).toBeInTheDocument()
      expect(screen.getAllByText("Andy Warhol")).toHaveLength(3)
      expect(screen.getAllByText("Yellow")).toHaveLength(2)
      expect(screen.getByText("All Filters")).toBeInTheDocument()
      expect(
        screen.getByRole("button", { name: "Immersive View" }),
      ).toBeInTheDocument()
    })

    it("triggers #onFilterClick on filter click, passing back the changed value and current filter state", () => {
      renderWithRelay()
      fireEvent.click(screen.getByText("Purchase"))

      expect(onFilterClick).toHaveBeenCalledWith("acquireable", true, {
        ...initialArtworkFilterState,
        ...filters,
        acquireable: true,
      })
    })

    it("triggers #onBrickClick on brick click", () => {
      renderWithRelay({
        Viewer: () => ({
          ...ArtworkFilterFixture.viewer,
        }),
      })

      fireEvent.click(
        screen.getAllByAltText("Andy Warhol, ‘Kenny Burrell’, 1956")[0],
      )

      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedMainArtworkGrid",
        context_module: "artworkGrid",
        context_page_owner_id: "example-order-id",
        context_page_owner_slug: "example-owner-slug",
        context_page_owner_type: "example-owner-type",
        destination_page_owner_id: "5d041931e607c200127ef3c1",
        destination_page_owner_slug: "andy-warhol-kenny-burrell",
        destination_page_owner_type: "artwork",
        position: 0,
        signal_label: "",
        sort: "-decayed_merch",
        type: "thumbnail",
      })
    })

    it("triggers #onChange when filters change, passing back filter state", () => {
      renderWithRelay()
      fireEvent.click(screen.getByText("Purchase"))

      expect(onChange).toHaveBeenCalledWith({
        ...initialArtworkFilterState,
        ...filters,
        acquireable: true,
      })
    })

    it("does not render sort if options not passed", () => {
      sortOptionsMock = undefined
      renderWithRelay()
      expect(screen.queryByRole("option")).not.toBeInTheDocument()
    })

    describe("immersive view", () => {
      it("enables the immersive view when there are artworks", async () => {
        renderWithRelay({
          Viewer: () => ({
            ...ArtworkFilterFixture.viewer,
          }),
        })

        fireEvent.click(screen.getByRole("button", { name: "Immersive View" }))
        expect(screen.getByTestId("immersive-view")).toBeInTheDocument()
      })

      it("disables the immersive view when there are no artworks", async () => {
        renderWithRelay({
          Viewer: () => ({
            filtered_artworks: {
              edges: [],
              counts: { total: 0 },
            },
          }),
        })

        const button = screen.getByRole("button", { name: "Immersive View" })
        expect(button).toBeDisabled()
        fireEvent.click(button)
        expect(screen.queryByTestId("immersive-view")).not.toBeInTheDocument()
      })
    })

    describe("total count label", () => {
      it("computs total count correctly", () => {
        let label = getTotalCountLabel({ total: "0", isAuctionArtwork: false })
        expect(label).toEqual("0 Artworks")
        label = getTotalCountLabel({ total: "1", isAuctionArtwork: false })
        expect(label).toEqual("1 Artwork")
        label = getTotalCountLabel({ total: "10", isAuctionArtwork: false })
        expect(label).toEqual("10 Artworks")
        label = getTotalCountLabel({ total: "1", isAuctionArtwork: true })
        expect(label).toEqual("1 Lot")
        label = getTotalCountLabel({ total: "10", isAuctionArtwork: true })
        expect(label).toEqual("10 Lots")
      })

      it("renders total count", () => {
        renderWithRelay({
          FilterArtworksConnection: () => ({
            counts: {
              total: 10,
            },
          }),
        })
        expect(screen.getByText("10 Artworks:")).toBeInTheDocument()
      })
    })
  })

  describe("mobile", () => {
    it("renders default UI items", async () => {
      breakpoint = "xs"
      renderWithRelay({
        Viewer: () => ({
          ...ArtworkFilterFixture.viewer,
        }),
      })

      expect(screen.getAllByRole("button")[0]).toHaveTextContent("Filter")
      expect(
        screen.queryByRole("button", { name: "Immersive View" }),
      ).not.toBeInTheDocument()
    })

    it("toggles mobile action sheet", () => {
      breakpoint = "xs"
      renderWithRelay()

      expect(
        screen.queryByTestId("FiltersWithScrollIntoView"),
      ).not.toBeInTheDocument()
      fireEvent.click(screen.getAllByRole("button")[0])

      expect(screen.getByText("Clear all")).toBeInTheDocument()

      fireEvent.click(screen.getByText("Purchase"))
      fireEvent.click(screen.getByText("Show Results"))

      expect(screen.queryByText("Clear all")).not.toBeInTheDocument()
    })
  })
})
