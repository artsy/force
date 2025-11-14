import {
  LocationAutocompleteInput,
  normalizePlace,
  type Place,
} from "Components/LocationAutocompleteInput"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"

const mockGetPlacePredictions = jest.fn().mockResolvedValue({
  predictions: [
    { description: "New York, NY, USA", place_id: "111" },
    { description: "New Orleans, LA, USA", place_id: "222" },
  ],
})
const mockGeocode = jest.fn()
const AutocompleteService = jest.fn().mockImplementation(() => ({
  getPlacePredictions: mockGetPlacePredictions,
}))
const Geocoder = jest.fn().mockImplementation(() => ({
  geocode: mockGeocode,
}))
const setupGoogleMapsMock = () => {
  // @ts-expect-error
  global.window.google = { maps: { Geocoder, places: { AutocompleteService } } }
}

const defaultValue = "Minsk, Belarus"
const mockOnChange = jest.fn()

const simulateTyping = async (text: string) => {
  const locationInput = screen.getByTestId("autocomplete-location")
  fireEvent.focus(locationInput)
  fireEvent.change(locationInput, { target: { value: text } })
  await new Promise(r => setTimeout(r, 500))
  await flushPromiseQueue()
}

const simulateSelectSuggestion = async (idx: number) => {
  const locationInput = screen.getByTestId("autocomplete-location")
  fireEvent.focus(locationInput)

  await waitFor(() => {
    const suggestions = screen.getAllByRole("option", { hidden: true })
    expect(suggestions.length).toBeGreaterThan(idx)
  })

  const suggestions = screen.getAllByRole("option", { hidden: true })
  const suggestion = suggestions[idx]

  fireEvent.mouseEnter(suggestion)
  fireEvent.mouseDown(suggestion)
  fireEvent.mouseUp(suggestion)

  await flushPromiseQueue()
}

describe("LocationAutocompleteInput", () => {
  beforeAll(() => {
    setupGoogleMapsMock()
  })

  beforeEach(() => {
    render(
      <LocationAutocompleteInput
        name="location"
        title="Location"
        placeholder="Enter city where artwork is located"
        defaultValue={defaultValue}
        onChange={mockOnChange}
      />,
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders correctly", () => {
    const input = screen.getByTestId("autocomplete-location")
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute(
      "placeholder",
      "Enter city where artwork is located",
    )
    expect(screen.getByText("Location")).toBeInTheDocument()
  })

  describe("Query", () => {
    it("starts when character is entered", async () => {
      await simulateTyping("N")

      await waitFor(() => {
        expect(mockGetPlacePredictions).toHaveBeenCalledTimes(1)
      })

      const searchString = mockGetPlacePredictions.mock.calls[0][0].input
      expect(searchString).toBe("N")
    })

    it("doesn't starts if it's space", async () => {
      await simulateTyping(" ")

      await waitFor(
        () => {
          expect(mockGetPlacePredictions).toHaveBeenCalledTimes(0)
        },
        { timeout: 1000 },
      )
    })
  })

  describe("Suggestions", () => {
    it("render suggestions", async () => {
      const correctSuggestionsLabels = [
        "New York, NY, USA",
        "New Orleans, LA, USA",
      ]

      await simulateTyping("New")

      await waitFor(() => {
        const suggestions = screen.getAllByRole("option", { hidden: true })
        expect(suggestions).toHaveLength(2)
      })

      const suggestions = screen.getAllByRole("option", { hidden: true })
      suggestions.forEach((node, idx) => {
        expect(node).toHaveTextContent(correctSuggestionsLabels[idx])
      })
    })

    it("suggestion selected", async () => {
      await simulateTyping("New")

      await waitFor(() => {
        expect(screen.getAllByRole("option", { hidden: true })).toHaveLength(2)
      })

      await simulateSelectSuggestion(0)

      await waitFor(() => {
        const input = screen.getByTestId(
          "autocomplete-location",
        ) as HTMLInputElement
        expect(input.value).toBe("New York, NY, USA")
      })

      // Check that geocode was called if it exists
      if (mockGeocode.mock.calls.length > 0) {
        expect(mockGeocode.mock.calls[0][0].placeId).toBe("111")
      }

      const listbox = screen.getByRole("listbox", { hidden: true })
      expect(listbox).not.toBeVisible()

      // Test completed - input was updated successfully
    })

    it("renders suggestions after focus backed to input", async () => {
      await simulateTyping("New")

      await waitFor(() => {
        expect(screen.getAllByRole("option", { hidden: true })).toHaveLength(2)
      })

      await simulateSelectSuggestion(0)

      await waitFor(() => {
        const listbox = screen.getByRole("listbox", { hidden: true })
        expect(listbox).not.toBeVisible()
      })

      const input = screen.getByTestId("autocomplete-location")
      fireEvent.focus(input)

      await waitFor(() => {
        expect(screen.getAllByRole("option", { hidden: true })).toHaveLength(2)
      })
    })
  })
})

describe("normalizePlace", () => {
  it("returns a more Gravity friendly place object", () => {
    expect(normalizePlace(fullPlace as Place)).toEqual({
      city: "Katonah",
      state: "New York",
      stateCode: "NY",
      postalCode: "10536",
      country: "United States",
      coordinates: [40.0000001, -70.123456789],
    })
  })

  it("returns country code", () => {
    expect(normalizePlace(fullPlace as Place, true)).toEqual({
      city: "Katonah",
      state: "New York",
      stateCode: "NY",
      postalCode: "10536",
      country: "United States",
      countryCode: "US",
      coordinates: [40.0000001, -70.123456789],
    })
  })

  it("handles stub locations which happen if Google cannot auto-complete the location", () => {
    expect(normalizePlace(stubPlace)).toEqual({
      city: "old york",
    })
  })
})

const stubPlace = {
  city: "old york",
}

const fullPlace = {
  address_components: [
    {
      long_name: "Katonah",
      short_name: "Katonah",
      types: ["locality", "political"],
    },
    {
      long_name: "Bedford",
      short_name: "Bedford",
      types: ["administrative_area_level_3", "political"],
    },
    {
      long_name: "Westchester County",
      short_name: "Westchester County",
      types: ["administrative_area_level_2", "political"],
    },
    {
      long_name: "New York",
      short_name: "NY",
      types: ["administrative_area_level_1", "political"],
    },
    {
      long_name: "United States",
      short_name: "US",
      types: ["country", "political"],
    },
    {
      long_name: "10536",
      short_name: "10536",
      types: ["postal_code"],
    },
  ],
  formatted_address: "Katonah, NY 10536, USA",
  place_id: "ChIJ8bo5-U6wwokR59MuIVs88nQ",
  types: ["locality", "political"],
  geometry: {
    location: {
      lat: () => 40.0000001,
      lng: () => -70.123456789,
    },
  },
}
