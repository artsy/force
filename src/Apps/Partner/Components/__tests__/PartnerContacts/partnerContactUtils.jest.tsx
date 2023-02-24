import {
  getContactAddressLines,
  getGoogleMapUrl,
  getGoogleStaticMapImageUrl,
} from "Apps/Partner/Components/PartnerContacts/partnerContactUtils"
import { PartnerContactMap_location$data } from "__generated__/PartnerContactMap_location.graphql"

describe("PartnerContactUtils", () => {
  it.each([
    [
      "with all fields",
      {
        city: "city",
        state: "state",
        displayCountry: "United States",
        address: "address",
        address2: "address2",
        postalCode: "postalCode",
      },
      ["address", "address2", "city, state postalCode", "United States"],
    ],
    [
      "without address2",
      {
        city: "city",
        state: "state",
        displayCountry: "United States",
        address: "address",
        postalCode: "postalCode",
      },
      ["address", "city, state postalCode", "United States"],
    ],
    [
      "without address",
      {
        city: "city",
        state: "state",
        displayCountry: "United States",
        postalCode: "postalCode",
      },
      ["city, state postalCode", "United States"],
    ],
    [
      "without city",
      {
        state: "state",
        displayCountry: "United States",
        postalCode: "postalCode",
      },
      ["state postalCode", "United States"],
    ],
    [
      "without state",
      {
        city: "city",
        displayCountry: "United States",
        postalCode: "postalCode",
      },
      ["city postalCode", "United States"],
    ],
    [
      "without postalCode",
      {
        city: "city",
        state: "state",
        displayCountry: "United States",
      },
      ["city, state", "United States"],
    ],
    [
      "without country",
      {
        city: "city",
        state: "state",
      },
      ["city, state"],
    ],
    ["with empty object", {}, []],
    ["with null", null, []],
  ])(
    "getContactAddressLines returns correct value %s",
    (_, location, addressLines) => {
      expect(
        getContactAddressLines(location as PartnerContactMap_location$data)
      ).toEqual(addressLines)
    }
  )

  it("getGoogleMapUrl returns correct result when coordinates not empty", () => {
    expect(
      getGoogleMapUrl({
        coordinates: {
          lat: 1,
          lng: 2,
        },
        city: "city",
        state: "state",
        displayCountry: "United States",
        address: "address",
        postalCode: "postalCode",
      } as PartnerContactMap_location$data)
    ).toEqual("https://maps.google.com/maps?q=1%2C2")
  })

  it("getGoogleMapUrl returns correct result when coordinates empty", () => {
    expect(
      getGoogleMapUrl({
        displayCountry: "United States",
        address: "address",
        postalCode: "postalCode",
      } as PartnerContactMap_location$data)
    ).toEqual(
      "https://maps.google.com/maps?q=address%2C%20postalCode%2C%20United%20States&hnear=address%2C%20postalCode%2C%20United%20States"
    )
  })

  it("getGoogleStaticMapImageUrl returns correct result when coordinates not empty", () => {
    const result = getGoogleStaticMapImageUrl({
      coordinates: {
        lat: 1,
        lng: 2,
      },
      city: "city",
      state: "state",
      displayCountry: "United States",
      address: "address",
      postalCode: "postalCode",
    } as PartnerContactMap_location$data)

    expect(result).toContain("https://maps.googleapis.com/maps/api/staticmap")
    expect(result).toContain("center=1%2C2")
    expect(result).toContain("markers=color%3A0x873ff0%7C1%2C2")
  })

  it("getGoogleStaticMapImageUrl returns correct result when coordinates empty", () => {
    const result = getGoogleStaticMapImageUrl({
      displayCountry: "United States",
      address: "address",
      postalCode: "postalCode",
    } as PartnerContactMap_location$data)

    expect(result).toContain(
      "center=address%2C%20postalCode%2C%20United%20States"
    )
    expect(result).toContain(
      "markers=color%3A0x873ff0%7Caddress%2C%20postalCode%2C%20United%20States"
    )
  })
})
