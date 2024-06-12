import { mount, ReactWrapper } from "enzyme"
import {
  LocationAutocompleteInput,
  normalizePlace,
  Place,
} from "Components/LocationAutocompleteInput"
import { Input } from "@artsy/palette"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"

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
  // @ts-ignore
  global.window.google = { maps: { Geocoder, places: { AutocompleteService } } }
}

let defaultValue = "Minsk, Belarus"
const mockOnChange = jest.fn()

const inputSelector = "input[data-testid='autocomplete-location']"
const optionsSelector = "button[role='option']"

const simulateTyping = async (wrapper: ReactWrapper, text: string) => {
  const locationInput = wrapper.find(inputSelector)
  locationInput
    .simulate("focus")
    .simulate("change", { target: { value: text } })
  await new Promise(r => setTimeout(r, 500))
  await flushPromiseQueue()
  wrapper.update()
}

const simulateSelectSuggestion = async (wrapper: ReactWrapper, idx: number) => {
  wrapper.find(inputSelector).simulate("focus")
  const suggestion = wrapper.find(optionsSelector).at(idx)
  suggestion.simulate("mouseenter").simulate("mousedown").simulate("mouseup")
  await flushPromiseQueue()
  wrapper.update()
}
describe("LocationAutocompleteInput", () => {
  let wrapper: ReactWrapper

  beforeAll(() => {
    setupGoogleMapsMock()
  })

  beforeAll(() => {
    wrapper = mount(
      <LocationAutocompleteInput
        name="location"
        title="Location"
        placeholder="Enter city where artwork is located"
        defaultValue={defaultValue}
        onChange={mockOnChange}
      />
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("renders correctly", () => {
    const input = wrapper.find(Input)
    expect(wrapper.find(inputSelector).length).toBe(1)
    expect(input.prop("placeholder")).toBe(
      "Enter city where artwork is located"
    )
    expect(input.prop("title")).toBe("Location")
  })

  describe("Query", () => {
    it("starts when character is entered", async () => {
      await simulateTyping(wrapper, "N")

      const searchString = mockGetPlacePredictions.mock.calls[0][0].input

      expect(mockGetPlacePredictions).toHaveBeenCalledTimes(1)
      expect(searchString).toBe("N")
    })

    it("doesn't starts if it's space", async () => {
      await simulateTyping(wrapper, " ")

      expect(mockGetPlacePredictions).toHaveBeenCalledTimes(0)
    })
  })

  describe("Suggestions", () => {
    it("render suggestions", async () => {
      const correctSuggestionsLabels = [
        "New York, NY, USA",
        "New Orleans, LA, USA",
      ]
      await simulateTyping(wrapper, "New")

      const suggestions = wrapper.find(optionsSelector)

      suggestions.forEach((node, idx) => {
        expect(node.text()).toBe(correctSuggestionsLabels[idx])
      })
    })

    it("suggestion selected", async () => {
      await simulateTyping(wrapper, "New")
      await simulateSelectSuggestion(wrapper, 0)
      expect(wrapper.find(inputSelector).prop("value")).toBe(
        "New York, NY, USA"
      )

      expect(mockGeocode.mock.calls[0][0].placeId).toBe("111")
      expect(wrapper.find(optionsSelector).length).toBe(0)

      await simulateTyping(wrapper, "New O")
      await simulateSelectSuggestion(wrapper, 1)

      expect(mockGeocode.mock.calls[1][0].placeId).toBe("222")
      expect(wrapper.find(inputSelector).prop("value")).toBe(
        "New Orleans, LA, USA"
      )

      expect(wrapper.find(optionsSelector).length).toBe(0)
    })

    it("renders suggestions after focus backed to input", async () => {
      await simulateTyping(wrapper, "New")
      await simulateSelectSuggestion(wrapper, 0)
      expect(wrapper.find(optionsSelector).length).toBe(0)

      wrapper.find(inputSelector).simulate("focus")
      expect(wrapper.find(optionsSelector).length).toBe(2)
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
