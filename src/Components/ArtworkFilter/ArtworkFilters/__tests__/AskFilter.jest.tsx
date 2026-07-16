import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { AskFilter } from "Components/ArtworkFilter/ArtworkFilters/AskFilter"
import { fetchArtworkFilterSuggestions } from "Components/ArtworkFilter/Utils/fetchArtworkFilterSuggestions"
import {
  createArtworkFilterTestRenderer,
  currentArtworkFilterContext,
} from "./Utils"

jest.mock("Components/ArtworkFilter/Utils/fetchArtworkFilterSuggestions")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  useMatchMedia: () => false,
}))

const mockFetch = fetchArtworkFilterSuggestions as jest.Mock

describe("AskFilter", () => {
  const render = createArtworkFilterTestRenderer()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("applies the mapped filters to the context on ask", async () => {
    mockFetch.mockResolvedValueOnce({
      keyword: "brutalist",
      fellOpen: false,
      dropped: [],
      filters: {
        geneIDs: ["gene-sculpture"],
        sizes: ["LARGE"],
        priceRange: "*-5000",
        framed: true,
      },
    })

    render(<AskFilter />)
    userEvent.type(
      screen.getByTestId("askInput"),
      "large brutalist sculpture under 5k",
    )
    userEvent.click(screen.getByTestId("askButton"))

    await waitFor(() => {
      const filters = currentArtworkFilterContext().filters
      expect(filters?.additionalGeneIDs).toEqual(["gene-sculpture"])
      expect(filters?.sizes).toEqual(["LARGE"])
      expect(filters?.priceRange).toEqual("*-5000")
      expect(filters?.framed).toEqual(true)
      expect(filters?.keyword).toEqual("brutalist")
    })
  })

  it("falls back to a plain keyword search when the parser fell open", async () => {
    mockFetch.mockResolvedValueOnce({
      keyword: "asdfqwer",
      fellOpen: true,
      dropped: [],
      filters: {},
    })

    render(<AskFilter />)
    userEvent.type(screen.getByTestId("askInput"), "asdfqwer")
    userEvent.click(screen.getByTestId("askButton"))

    await waitFor(() => {
      expect(currentArtworkFilterContext().filters?.keyword).toEqual("asdfqwer")
    })
  })

  it("falls back to a plain keyword search when the request fails", async () => {
    mockFetch.mockResolvedValueOnce(null)

    render(<AskFilter />)
    userEvent.type(screen.getByTestId("askInput"), "anything at all")
    userEvent.click(screen.getByTestId("askButton"))

    await waitFor(() => {
      expect(currentArtworkFilterContext().filters?.keyword).toEqual(
        "anything at all",
      )
    })
  })
})
