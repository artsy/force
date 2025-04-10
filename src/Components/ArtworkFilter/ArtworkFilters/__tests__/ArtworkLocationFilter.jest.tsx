import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { ArtworkFilterContextProps } from "Components/ArtworkFilter/ArtworkFilterContext"
import { ArtworkLocationFilter } from "Components/ArtworkFilter/ArtworkFilters/ArtworkLocationFilter"
import {
  createArtworkFilterTestRenderer,
  currentArtworkFilterContext,
} from "Components/ArtworkFilter/ArtworkFilters/__tests__/Utils"
import { useTracking } from "react-tracking"
import { useFlag } from "@unleash/proxy-client-react"

jest.mock("System/Hooks/useAnalyticsContext", () => ({
  useAnalyticsContext: jest.fn(() => ({
    contextPageOwnerId: "id",
    contextPageOwnerSlug: "slug",
    contextPageOwnerType: "type",
  })),
}))
jest.mock("react-tracking")

const artworkFilterContext: Partial<ArtworkFilterContextProps> = {
  aggregations: [
    {
      slice: "LOCATION_CITY",
      counts: [
        { name: "Brooklyn, NY, USA", value: "Brooklyn, NY, USA", count: 42 },
        { name: "Fenny Drayton, UK", value: "Fenny Drayton, UK", count: 42 },
        { name: "Potwin, KS, USA", value: "Potwin, KS, USA", count: 42 },
      ],
    },
  ],
}

const render = createArtworkFilterTestRenderer(artworkFilterContext)

describe(ArtworkLocationFilter, () => {
  it("renders a list of options based on current aggregation", () => {
    render(<ArtworkLocationFilter expanded />)
    expect(screen.getByText("Brooklyn, NY, USA")).toBeInTheDocument()
    expect(screen.getByText("Fenny Drayton, UK")).toBeInTheDocument()
    expect(screen.getByText("Potwin, KS, USA")).toBeInTheDocument()
  })

  it("updates context on filter change", () => {
    render(<ArtworkLocationFilter expanded />)
    expect(currentArtworkFilterContext().filters?.locationCities).toEqual([])

    userEvent.click(screen.getAllByRole("checkbox")[0])
    expect(currentArtworkFilterContext().filters?.locationCities).toEqual([
      "Brooklyn, NY, USA",
    ])

    userEvent.click(screen.getAllByRole("checkbox")[1])
    expect(currentArtworkFilterContext().filters?.locationCities).toEqual([
      "Brooklyn, NY, USA",
      "Fenny Drayton, UK",
    ])
  })

  it("clears local input state after Clear All", () => {
    render(<ArtworkLocationFilter expanded />)
    userEvent.click(screen.getAllByRole("checkbox")[0])
    userEvent.click(screen.getAllByRole("checkbox")[1])
    expect(currentArtworkFilterContext().filters?.locationCities).toEqual([
      "Brooklyn, NY, USA",
      "Fenny Drayton, UK",
    ])

    userEvent.click(screen.getByText("Clear all"))

    expect(currentArtworkFilterContext().filters?.locationCities).toEqual([])
  })

  it("can render in expanded or collapsed state", () => {
    render(<ArtworkLocationFilter />)
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()

    render(<ArtworkLocationFilter expanded={false} />)
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument()

    render(<ArtworkLocationFilter expanded={true} />)
    expect(screen.getAllByRole("checkbox")).toHaveLength(3)
  })

  describe("keyword filtering within facet", () => {
    it("lists only the matching options", () => {
      render(<ArtworkLocationFilter expanded />)
      userEvent.type(screen.getByPlaceholderText("Enter a city"), "fenny")
      expect(screen.getByText("Fenny Drayton, UK")).toBeInTheDocument()
      expect(screen.queryByText("Potwin, KS, USA")).not.toBeInTheDocument()
    })

    describe("when onyx_enhanced-artwork-location-filtering is enabled", () => {
      beforeEach(() => {
        ;(useFlag as jest.Mock).mockImplementation(
          flag => flag === "onyx_enhanced-artwork-location-filtering",
        )
      })

      it("lists options whose visible text matches", () => {
        render(<ArtworkLocationFilter expanded />)
        userEvent.type(
          screen.getByPlaceholderText("Enter a city, country, or region"),
          "usa",
        )
        expect(screen.getByText("Potwin, KS, USA")).toBeInTheDocument()
        expect(screen.queryByText("Fenny Drayton, UK")).not.toBeInTheDocument()
      })

      it("lists options whose invisible text matches", () => {
        render(<ArtworkLocationFilter expanded />)
        userEvent.type(
          screen.getByPlaceholderText("Enter a city, country, or region"),
          "america", // matches a region or synonym defined in custom mapping
        )
        expect(screen.getByText("Potwin, KS, USA")).toBeInTheDocument()
        expect(screen.queryByText("Fenny Drayton, UK")).not.toBeInTheDocument()
      })

      it("enables select-all and clear actions", () => {
        render(<ArtworkLocationFilter expanded />)
        userEvent.type(
          screen.getByPlaceholderText("Enter a city, country, or region"),
          "usa",
        )
        expect(screen.getByText("Select all")).toBeInTheDocument()
        expect(screen.getByText("Clear")).toBeInTheDocument()
      })

      it("updates filter state upon select-all and clear actions", () => {
        render(<ArtworkLocationFilter expanded />)
        userEvent.type(
          screen.getByPlaceholderText("Enter a city, country, or region"),
          "usa",
        )
        userEvent.click(screen.getByText("Select all"))
        expect(currentArtworkFilterContext().filters?.locationCities).toEqual([
          "Brooklyn, NY, USA",
          "Potwin, KS, USA",
        ])
        userEvent.click(screen.getByText("Clear"))
        expect(currentArtworkFilterContext().filters?.locationCities).toEqual(
          [],
        )
      })

      it("fires a select-all tracking event", () => {
        const mockTrackEvent = jest.fn()
        ;(useTracking as jest.Mock).mockImplementation(() => ({
          trackEvent: mockTrackEvent,
        }))

        render(<ArtworkLocationFilter expanded />)
        userEvent.type(
          screen.getByPlaceholderText("Enter a city, country, or region"),
          "usa",
        )
        userEvent.click(screen.getByText("Select all"))

        expect(mockTrackEvent).toHaveBeenCalledWith({
          action: "commercialFilterSelectedAll",
          context_module: "artworkGrid",
          context_owner_type: "type",
          context_owner_id: "id",
          context_owner_slug: "slug",
          facet: "locationCities",
          query: "usa",
        })
      })
    })
  })
})
