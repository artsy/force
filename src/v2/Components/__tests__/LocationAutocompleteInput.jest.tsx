import { normalizePlace } from "../LocationAutocompleteInput"

describe("normalizePlace", () => {
  it("returns a more Gravity friendly place object", () => {
    expect(normalizePlace(fullPlace)).toEqual({
      city: "Katonah",
      state: "New York",
      stateCode: "NY",
      postalCode: "10536",
      country: "United States",
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
  geometry: {
    location: {
      lat: () => 41.2587043,
      lng: () => -73.6854137,
    },
    viewport: {
      south: 41.24574093184339,
      west: -73.69507691334579,
      north: 41.26628995634204,
      east: -73.67639103901101,
    },
  },
  place_id: "ChIJ8bo5-U6wwokR59MuIVs88nQ",
  types: ["locality", "political"],
}
