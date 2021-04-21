import { PartnerContactMap_location } from "v2/__generated__/PartnerContactMap_location.graphql"
import {
  getContactAddressLines,
  getGoogleMapUrl,
  getGoogleStaticMapImageUrl,
} from "../../PartnerContacts"

describe("PartnerContactUtils", () => {
  it.each([
    [
      "with all fields",
      {
        city: "city",
        state: "state",
        country: "US",
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
        country: "US",
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
        country: "US",
        postalCode: "postalCode",
      },
      ["city, state postalCode", "United States"],
    ],
    [
      "without city",
      {
        state: "state",
        country: "US",
        postalCode: "postalCode",
      },
      ["state postalCode", "United States"],
    ],
    [
      "without state",
      {
        city: "city",
        country: "US",
        postalCode: "postalCode",
      },
      ["city postalCode", "United States"],
    ],
    [
      "without postalCode",
      {
        city: "city",
        state: "state",
        country: "US",
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
    (
      name: string,
      location: PartnerContactMap_location,
      addressLines: Array<string>
    ) => {
      expect(getContactAddressLines(location)).toEqual(addressLines)
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
        country: "US",
        address: "address",
        postalCode: "postalCode",
      } as PartnerContactMap_location)
    ).toEqual("https://maps.google.com/maps?q=1%2C2")
  })

  it("getGoogleMapUrl returns correct result when coordinates empty", () => {
    expect(
      getGoogleMapUrl({
        country: "US",
        address: "address",
        postalCode: "postalCode",
      } as PartnerContactMap_location)
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
      country: "US",
      address: "address",
      postalCode: "postalCode",
    } as PartnerContactMap_location)

    expect(result).toContain("https://maps.googleapis.com/maps/api/staticmap")
    expect(result).toContain("center=1%2C2")
    expect(result).toContain("markers=color%3A0x873ff0%7C1%2C2")
  })

  it("getGoogleStaticMapImageUrl returns correct result when coordinates empty", () => {
    const result = getGoogleStaticMapImageUrl({
      country: "US",
      address: "address",
      postalCode: "postalCode",
    } as PartnerContactMap_location)

    expect(result).toContain(
      "center=address%2C%20postalCode%2C%20United%20States"
    )
    expect(result).toContain(
      "markers=color%3A0x873ff0%7Caddress%2C%20postalCode%2C%20United%20States"
    )
  })
})
