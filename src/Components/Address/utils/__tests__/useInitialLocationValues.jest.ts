import { renderHook } from "@testing-library/react-hooks"
import { useInitialLocationValues } from "../useInitialLocationValues"

const mockUseUserLocation = jest.fn()
jest.mock("Utils/Hooks/useUserLocation", () => ({
  useUserLocation: () => mockUseUserLocation(),
}))

describe("useInitialLocationValues", () => {
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

    const { result } = renderHook(() =>
      useInitialLocationValues(mockCountryOptions)
    )
    expect(result.current).toEqual({})
  })

  it("returns empty object when no location country", () => {
    mockUseUserLocation.mockReturnValue({
      location: { city: "New York" },
      loading: false,
    })

    const { result } = renderHook(() =>
      useInitialLocationValues(mockCountryOptions)
    )
    expect(result.current).toEqual({})
  })

  it("returns default US country when location doesn't match", () => {
    mockUseUserLocation.mockReturnValue({
      location: { country: "Unknown Country" },
      loading: false,
    })

    const { result } = renderHook(() =>
      useInitialLocationValues(mockCountryOptions)
    )
    expect(result.current).toEqual({
      selectedCountry: "US",
      phoneNumberCountryCode: "us",
    })
  })

  it("returns matching country when location matches", () => {
    mockUseUserLocation.mockReturnValue({
      location: { country: "Canada" },
      loading: false,
    })

    const { result } = renderHook(() =>
      useInitialLocationValues(mockCountryOptions)
    )
    expect(result.current).toEqual({
      selectedCountry: "CA",
      phoneNumberCountryCode: "ca",
    })
  })

  it("includes phone number country code when matching country is found", () => {
    mockUseUserLocation.mockReturnValue({
      location: { country: "United States" },
      loading: false,
    })

    const { result } = renderHook(() =>
      useInitialLocationValues(mockCountryOptions)
    )
    expect(result.current).toEqual({
      selectedCountry: "US",
      phoneNumberCountryCode: "us", // phone options use lowercase
    })
  })

  describe("when no countryInputOptions are provided", () => {
    it("returns only phoneNumberCountryCode when location matches by country name", () => {
      mockUseUserLocation.mockReturnValue({
        location: { country: "United States" },
        loading: false,
      })

      const { result } = renderHook(() => useInitialLocationValues())

      expect(result.current).toEqual({
        phoneNumberCountryCode: "us",
      })
    })
  })
})
