import { countries as countryPhoneOptions } from "Utils/countries"
import { sortCountriesForCountryInput } from "../sortCountriesForCountryInput"

describe("sortCountriesForCountryInput", () => {
  it("sorts countries with blank first and US second by default", () => {
    const result = sortCountriesForCountryInput(countryPhoneOptions.slice(0, 5))
    expect(result[0]).toEqual({ text: "", value: "" })
    expect(result[1].value).toBe("US")
  })

  it("sorts remaining countries alphabetically by name", () => {
    const testCountries = [
      { name: "Zimbabwe", value: "zw", countryCode: "+263", text: "Zimbabwe" },
      { name: "Albania", value: "al", countryCode: "+355", text: "Albania" },
      { name: "Brazil", value: "br", countryCode: "+55", text: "Brazil" },
      {
        name: "United States",
        value: "us",
        countryCode: "+1",
        text: "United States",
      },
    ]

    const result = sortCountriesForCountryInput(testCountries)

    expect(result[0]).toEqual({ text: "", value: "" })
    expect(result[1]).toEqual({ text: "United States", value: "US" })
    expect(result[2]).toEqual({ text: "Albania", value: "AL" })
    expect(result[3]).toEqual({ text: "Brazil", value: "BR" })
    expect(result[4]).toEqual({ text: "Zimbabwe", value: "ZW" })
  })
})
