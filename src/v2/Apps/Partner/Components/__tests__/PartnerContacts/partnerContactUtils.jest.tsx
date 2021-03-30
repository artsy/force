import { PartnerContactCard_location } from "v2/__generated__/PartnerContactCard_location.graphql"
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
        country: "country",
        address: "address",
        address2: "address2",
        postalCode: "postalCode",
      },
      ["address", "address2", "city, state postalCode", "country"],
    ],
    [
      "without address2",
      {
        city: "city",
        state: "state",
        country: "country",
        address: "address",
        postalCode: "postalCode",
      },
      ["address", "city, state postalCode", "country"],
    ],
    [
      "without address",
      {
        city: "city",
        state: "state",
        country: "country",
        postalCode: "postalCode",
      },
      ["city, state postalCode", "country"],
    ],
    [
      "without city",
      {
        state: "state",
        country: "country",
        postalCode: "postalCode",
      },
      ["state postalCode", "country"],
    ],
    [
      "without state",
      {
        city: "city",
        country: "country",
        postalCode: "postalCode",
      },
      ["city postalCode", "country"],
    ],
    [
      "without postalCode",
      {
        city: "city",
        state: "state",
        country: "country",
      },
      ["city, state", "country"],
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
      location: PartnerContactCard_location,
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
        country: "country",
        address: "address",
        postalCode: "postalCode",
      } as PartnerContactCard_location)
    ).toEqual("https://maps.google.com/maps?q=1%2C2")
  })

  it("getGoogleMapUrl returns correct result when coordinates empty", () => {
    expect(
      getGoogleMapUrl({
        country: "country",
        address: "address",
        postalCode: "postalCode",
      } as PartnerContactCard_location)
    ).toEqual(
      "https://maps.google.com/maps?q=address%2C%20postalCode%2C%20country&hnear=address%2C%20postalCode%2C%20country"
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
      country: "country",
      address: "address",
      postalCode: "postalCode",
    } as PartnerContactCard_location)

    expect(result).toContain("https://maps.googleapis.com/maps/api/staticmap")
    expect(result).toContain("center=1%2C2")
    expect(result).toContain("markers=color%3A0x873ff0%7C1%2C2")
  })

  it("getGoogleStaticMapImageUrl returns correct result when coordinates empty", () => {
    const result = getGoogleStaticMapImageUrl({
      country: "country",
      address: "address",
      postalCode: "postalCode",
    } as PartnerContactCard_location)

    expect(result).toContain("center=address%2C%20postalCode%2C%20country")
    expect(result).toContain(
      "markers=color%3A0x873ff0%7Caddress%2C%20postalCode%2C%20country"
    )
  })
})
