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
  name: "old york",
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
  adr_address:
    '<span class="locality">Katonah</span>, <span class="region">NY</span> <span class="postal-code">10536</span>, <span class="country-name">USA</span>',
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
  icon:
    "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png",
  icon_background_color: "#7B9EB0",
  icon_mask_base_uri:
    "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
  name: "Katonah",
  photos: [
    {
      height: 1364,
      html_attributions: [
        '<a href="https://maps.google.com/maps/contrib/112895812997090311065">June Marie</a>',
      ],
      width: 1755,
    },
    {
      height: 3024,
      html_attributions: [
        '<a href="https://maps.google.com/maps/contrib/109415363621183907891">Anthony C</a>',
      ],
      width: 4032,
    },
    {
      height: 3024,
      html_attributions: [
        '<a href="https://maps.google.com/maps/contrib/100177822708492064518">Henry McLin</a>',
      ],
      width: 4032,
    },
    {
      height: 3024,
      html_attributions: [
        '<a href="https://maps.google.com/maps/contrib/101810069902511603669">Veronica Monge</a>',
      ],
      width: 4032,
    },
    {
      height: 1536,
      html_attributions: [
        '<a href="https://maps.google.com/maps/contrib/114364882155719560016">Stepping Stones - Historic Home of Bill and Lois Wilson</a>',
      ],
      width: 2048,
    },
    {
      height: 2268,
      html_attributions: [
        '<a href="https://maps.google.com/maps/contrib/100053313604302144822">Michael Johansen</a>',
      ],
      width: 4032,
    },
    {
      height: 1960,
      html_attributions: [
        '<a href="https://maps.google.com/maps/contrib/108685100739435310247">Michael Filoromo Jr.</a>',
      ],
      width: 4032,
    },
    {
      height: 2336,
      html_attributions: [
        '<a href="https://maps.google.com/maps/contrib/115368961416054570569">Melissa Williams</a>',
      ],
      width: 4160,
    },
    {
      height: 2448,
      html_attributions: [
        '<a href="https://maps.google.com/maps/contrib/110454434532291976736">Lee-Ann Mertzlufft</a>',
      ],
      width: 3264,
    },
    {
      height: 1836,
      html_attributions: [
        '<a href="https://maps.google.com/maps/contrib/105543927957633736217">John Smith</a>',
      ],
      width: 3264,
    },
  ],
  place_id: "ChIJ8bo5-U6wwokR59MuIVs88nQ",
  reference: "ChIJ8bo5-U6wwokR59MuIVs88nQ",
  types: ["locality", "political"],
  url:
    "https://maps.google.com/?q=Katonah,+NY+10536,+USA&ftid=0x89c2b04ef939baf1:0x74f23c5b212ed3e7",
  utc_offset: -240,
  vicinity: "Katonah",
  html_attributions: [],
  utc_offset_minutes: -240,
}
