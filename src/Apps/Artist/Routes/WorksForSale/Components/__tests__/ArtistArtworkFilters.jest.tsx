import {
  RenderOptions,
  render as originalRender,
  screen,
} from "@testing-library/react"
import { ArtistArtworkFilters } from "Apps/Artist/Routes/WorksForSale/Components/ArtistArtworkFilters"
import { ArtworkFilterContextProvider } from "Components/ArtworkFilter/ArtworkFilterContext"
import { ReactElement } from "react"

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

jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(() => true),
}))

it("renders all expected filters", () => {
  render(<ArtistArtworkFilters />)

  expect(screen.getByText("Keyword Search")).toBeInTheDocument()
  expect(screen.getByText("Rarity")).toBeInTheDocument()
  expect(screen.getByText("Medium")).toBeInTheDocument()
  expect(screen.getByText("Price")).toBeInTheDocument()
  expect(screen.getByText("Artist Series")).toBeInTheDocument()
  expect(screen.getByText("Size")).toBeInTheDocument()
  expect(screen.getByText("Availability")).toBeInTheDocument()
  expect(screen.getByText("Ways to Buy")).toBeInTheDocument()
  expect(screen.getByText("Material")).toBeInTheDocument()
  expect(screen.getByText("Artwork Location")).toBeInTheDocument()
  expect(screen.getByText("Time Period")).toBeInTheDocument()
  expect(screen.getByText("Color")).toBeInTheDocument()
  expect(screen.getByText("Galleries and Institutions")).toBeInTheDocument()
})
