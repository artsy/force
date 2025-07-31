import { useInitialLocationValues } from "../useInitialLocationValues"

const mockUseUserLocation = jest.fn()
jest.mock("Utils/Hooks/useUserLocation", () => ({
  useUserLocation: () => mockUseUserLocation(),
}))

describe("getInitialLocationValues", () => {
  const mockCountryOptions = [
    { text: "", value: "" },
    { text: "United States", value: "US" },
    { text: "Canada", value: "CA" },
    { text: "United Kingdom", value: "GB" },
  ]

  beforeEach(() => {
    mockUseUserLocation.mockClear()
  })

  it("returns empty object when loading", () => {
    mockUseUserLocation.mockReturnValue({
      location: null,
      loading: true,
    })

    const result = useInitialLocationValues(mockCountryOptions)
    expect(result).toEqual({})
  })

  it("returns empty object when no location country", () => {
    mockUseUserLocation.mockReturnValue({
      location: { city: "New York" },
      loading: false,
    })

    const result = useInitialLocationValues(mockCountryOptions)
    expect(result).toEqual({})
  })

  it("returns default US country when location doesn't match", () => {
    mockUseUserLocation.mockReturnValue({
      location: { country: "Unknown Country" },
      loading: false,
    })

    const result = useInitialLocationValues(mockCountryOptions)
    expect(result).toEqual({
      selectedCountry: "US",
      phoneNumberCountryCode: "us",
    })
  })

  it("returns matching country when location matches", () => {
    mockUseUserLocation.mockReturnValue({
      location: { country: "Canada" },
      loading: false,
    })

    const result = useInitialLocationValues(mockCountryOptions)
    expect(result).toEqual({
      selectedCountry: "CA",
      phoneNumberCountryCode: "ca",
    })
  })

  it("includes phone number country code when matching country is found", () => {
    mockUseUserLocation.mockReturnValue({
      location: { country: "United States" },
      loading: false,
    })

    const result = useInitialLocationValues(mockCountryOptions)
    expect(result).toEqual({
      selectedCountry: "US",
      phoneNumberCountryCode: "us", // phone options use lowercase
    })
  })
})
