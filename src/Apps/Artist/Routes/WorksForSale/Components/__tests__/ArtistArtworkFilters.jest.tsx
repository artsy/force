import {
  RenderOptions,
  render as originalRender,
  screen,
} from "@testing-library/react"
import { ArtistArtworkFilters } from "Apps/Artist/Routes/WorksForSale/Components/ArtistArtworkFilters"
import { ArtworkFilterContextProvider } from "Components/ArtworkFilter/ArtworkFilterContext"
import { ReactElement } from "react"
import { useFeatureFlag } from "System/useFeatureFlag"

const render = (ui: ReactElement, options: RenderOptions = {}) =>
  originalRender(ui, { wrapper: Wrapper, ...options })

const Wrapper: React.FC = ({ children }) => {
  return (
    <ArtworkFilterContextProvider
      aggregations={[
        {
          slice: "ARTIST_SERIES",
          counts: [{ name: "Series Name", value: "series-value", count: 42 }],
        },
        {
          slice: "MATERIALS_TERMS",
          counts: [
            { name: "Material Name", value: "material-value", count: 42 },
          ],
        },
        {
          slice: "LOCATION_CITY",
          counts: [{ name: "City Name", value: "city-value", count: 42 }],
        },
        {
          slice: "PARTNER",
          counts: [{ name: "Partner Name", value: "partner-value", count: 42 }],
        },
      ]}
    >
      {children}
    </ArtworkFilterContextProvider>
  )
}

jest.mock("System/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(() => true),
}))

it("renders all expected filters", () => {
  render(<ArtistArtworkFilters />)

  expect(screen.getByText("Keyword Search")).toBeInTheDocument()
  expect(screen.getByText("Rarity")).toBeInTheDocument()
  expect(screen.getByText("Medium")).toBeInTheDocument()
  expect(screen.getByText("Price")).toBeInTheDocument()
  expect(screen.getByText("Ways to Buy")).toBeInTheDocument()
  expect(screen.getByText("Material")).toBeInTheDocument()
  expect(screen.getByText("Artwork Location")).toBeInTheDocument()
  expect(screen.getByText("Time Period")).toBeInTheDocument()
  expect(screen.getByText("Color")).toBeInTheDocument()
  expect(screen.getByText("Galleries and Institutions")).toBeInTheDocument()
})

describe("feature flag: onyx_enable-artist-series-filter", () => {
  describe("when the feature flag is enabled", () => {
    beforeEach(() => {
      ;(useFeatureFlag as jest.Mock).mockImplementation(() => true)
    })
    it("renders the Artist Series filter", () => {
      render(<ArtistArtworkFilters />)
      expect(screen.getByText("Artist Series")).toBeInTheDocument()
    })
  })
  describe("when the feature flag is disabled", () => {
    beforeEach(() => {
      ;(useFeatureFlag as jest.Mock).mockImplementation(() => false)
    })
    it("does not render the Artist Series filter", () => {
      render(<ArtistArtworkFilters />)
      expect(screen.queryByText("Artist Series")).not.toBeInTheDocument()
    })
  })
})

describe("feature flag: onyx_availability", () => {
  const mockUseFeatureFlag = useFeatureFlag as jest.Mock

  describe("when the feature flag is enabled", () => {
    beforeEach(() => {
      mockUseFeatureFlag.mockImplementation(() => true)
    })
    it("renders the Availability filter", () => {
      render(<ArtistArtworkFilters />)
      expect(screen.getByText("Availability")).toBeInTheDocument()
    })
  })
  describe("when the feature flag is disabled", () => {
    beforeEach(() => {
      mockUseFeatureFlag.mockImplementation(() => false)
    })
    it("does not render the Availability filter", () => {
      render(<ArtistArtworkFilters />)
      expect(screen.queryByText("Availability")).not.toBeInTheDocument()
    })
  })
})
