import { screen, fireEvent } from "@testing-library/react"
import { useTracking } from "v2/System/Analytics/useTracking"
import { ArtworkFilter, BaseArtworkFilter } from "v2/Components/ArtworkFilter"
import { MockBoot } from "v2/DevTools"
import { renderToString } from "v2/DevTools/__tests__/MockRelayRendererFixtures"
import { ArtworkQueryFilter } from "../ArtworkQueryFilter"
import { ArtworkFilterFixture } from "./fixtures/ArtworkFilter.fixture"
import { initialArtworkFilterState } from "../ArtworkFilterContext"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { SavedSearchEntity } from "v2/Components/SavedSearchAlert/types"
import { OwnerType } from "@artsy/cohesion"

jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")
jest.mock("v2/Components/Pagination/useComputeHref")
jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

const savedSearchEntity: SavedSearchEntity = {
  type: OwnerType.artist,
  placeholder: "Test Artist",
  artists: [
    {
      id: "test-artist-id",
      name: "Test Artist",
      slug: "test-artist-slug",
    },
  ],
}

describe("ArtworkFilter", () => {
  const onFilterClick = jest.fn()
  const onChange = jest.fn()
  let sortOptionsMock
  let filters
  let breakpoint
  let enableCreateAlert

  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => (
      <MockBoot breakpoint={breakpoint}>
        <ArtworkFilter
          {...(props as any)}
          enableCreateAlert={enableCreateAlert}
          savedSearchEntity={savedSearchEntity}
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
    jest.resetAllMocks()
    ;(useTracking as jest.Mock).mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    breakpoint = "lg"
    filters = {
      colors: ["yellow", "pink"],
    }
    enableCreateAlert = false
    sortOptionsMock = [
      { value: "sortTest1", text: "Sort Test 1" },
      { value: "sortTest2", text: "Sort Test 2" },
    ]
  })

  it("renders filters pills when enableCreateAlert is true, savedSearchEntity are passed and there are selected filters", async () => {
    enableCreateAlert = true
    renderWithRelay()

    expect(screen.getAllByText("Yellow")[1]).toBeInTheDocument()
    expect(screen.getAllByText("Yellow")[1]).toHaveTextContent("Close")
    expect(screen.getAllByText("Pink")[1]).toBeInTheDocument()
    expect(screen.getAllByText("Pink")[1]).toHaveTextContent("Close")
  })

  it("removes pill after click on it", async () => {
    enableCreateAlert = true
    renderWithRelay()

    fireEvent.click(screen.getAllByText("Yellow")[1])

    expect(screen.getAllByText("Yellow")).not.toHaveLength(2)
    expect(screen.getAllByText("Pink")[1]).toBeInTheDocument()
    expect(screen.getAllByText("Pink")[1]).toHaveTextContent("Close")
  })

  describe("without any filtered artworks", () => {
    it("renders null", async () => {
      const props = {
        viewer: { filtered_artworks: null },
      } as any
      const filterComponent = <BaseArtworkFilter {...props} />
      expect(renderToString(filterComponent)).toBeFalsy()
    })
  })

  describe("tracks clicks", () => {
    it("on filter", () => {
      renderWithRelay()

      fireEvent.click(screen.getByText("Buy Now"))

      expect(trackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "commercialFilterParamsChanged",
          context_module: "artworkGrid",
          context_owner_id: undefined,
          context_owner_slug: undefined,
          context_owner_type: "home",
          // `current` and `changed` are sent as
          // JSON blobs, and verified below
        })
      )

      const { current, changed } = trackEvent.mock.calls[0][0]

      expect(JSON.parse(current)).toMatchObject({
        ...initialArtworkFilterState,
        ...filters,
        acquireable: true,
      })

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
          context_page_owner_id: undefined,
          context_page_owner_slug: undefined,
          context_page_owner_type: "home",
          page_current: 1,
          page_changed: 3,
        })
      )
    })
  })

  describe("desktop", () => {
    it("renders default UI items", () => {
      renderWithRelay({
        Viewer: () => ({
          ...ArtworkFilterFixture.viewer,
        }),
      })

      expect(screen.getByRole("navigation")).toBeInTheDocument()
      expect(screen.getAllByText("Andy Warhol")).toHaveLength(30)
      expect(screen.getAllByRole("option")).toHaveLength(2)
      expect(screen.getByText("Yellow")).toBeInTheDocument()
    })

    it("triggers #onFilterClick on filter click, passing back the changed value and current filter state", () => {
      renderWithRelay()
      fireEvent.click(screen.getByText("Buy Now"))

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
        screen.getAllByAltText("Andy Warhol, ‘Kenny Burrell’, 1956")[0]
      )

      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedMainArtworkGrid",
        context_module: "artworkGrid",
        context_page_owner_id: undefined,
        context_page_owner_slug: undefined,
        context_page_owner_type: "home",
        destination_page_owner_id: "5d041931e607c200127ef3c1",
        destination_page_owner_slug: "andy-warhol-kenny-burrell",
        destination_page_owner_type: "artwork",
        position: 0,
        sort: "-decayed_merch",
        type: "thumbnail",
      })
    })

    it("triggers #onChange when filters change, passing back filter state", () => {
      renderWithRelay()
      fireEvent.click(screen.getByText("Buy Now"))

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

    it("renders a sort filter if filters are passed in and updates filter state on change", () => {
      filters = { sort: "sortTest1" }
      renderWithRelay()
      fireEvent.change(screen.getByRole("combobox"), {
        target: { value: "sortTest2" },
      })

      expect(onChange).toHaveBeenLastCalledWith({
        ...initialArtworkFilterState,
        ...filters,
        sort: "sortTest2",
      })
    })
  })

  describe("mobile", () => {
    it("renders default UI items", () => {
      breakpoint = "xs"
      renderWithRelay({
        Viewer: () => ({
          ...ArtworkFilterFixture.viewer,
        }),
      })

      expect(screen.getAllByText("Andy Warhol")).toHaveLength(30)
      expect(screen.getAllByRole("button")[0]).toHaveTextContent("Filter")
    })

    it("toggles mobile action sheet", () => {
      breakpoint = "xs"
      renderWithRelay()

      expect(
        screen.queryByTestId("FiltersWithScrollIntoView")
      ).not.toBeInTheDocument()
      fireEvent.click(screen.getAllByRole("button")[0])

      expect(screen.getByText("Clear all")).toBeInTheDocument()
      expect(document.body).toHaveStyle("overflow-y: hidden")

      fireEvent.click(screen.getByText("Buy Now"))
      fireEvent.click(screen.getByText("Show Results"))

      expect(screen.queryByText("Clear all")).not.toBeInTheDocument()
      expect(document.body).toHaveStyle("overflow-y: visible")
    })
  })
})
