import { act, renderHook } from "@testing-library/react-hooks"
import {
  AddressAutocompleteSuggestion,
  useAddressAutocomplete,
} from "Components/Address/useAddressAutocomplete"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { getENV } from "Utils/getENV"
import { waitFor } from "@testing-library/react"
import { throttle } from "lodash"
import { useTracking } from "react-tracking"

jest.mock("react-tracking")
jest.mock("System/Hooks/useFeatureFlag")
jest.mock("Utils/getENV")
jest.mock("lodash/throttle", () => jest.fn(fn => fn))

const mockuseTracking = useTracking as jest.Mock
const trackingSpy = jest.fn()

let mockFetch: jest.Mock

type HookProps = Parameters<typeof useAddressAutocomplete>
let hookOptions = { enableSecondarySuggestions: false }

describe("useAddressAutocomplete", () => {
  const setupHook = (...args: HookProps) => {
    const result = renderHook(props => useAddressAutocomplete(...props), {
      initialProps: args,
    })
    return result
  }

  beforeAll(() => {
    mockFetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        suggestions: [
          {
            city: "New York",
            entries: 0,
            secondary: "Fl 13",
            state: "NY",
            street_line: "401 Broadway",
            zipcode: "10013",
          },
        ],
      }),
    })

    // @ts-ignore
    global.fetch = mockFetch
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  beforeEach(() => {
    jest.clearAllMocks()

    mockuseTracking.mockImplementation(() => ({
      trackEvent: trackingSpy,
    }))
  })

  describe("when the US address autocomplete feature flag is enabled", () => {
    beforeAll(() => {
      ;(useFeatureFlag as jest.Mock).mockImplementation(
        featureName => featureName === "address_autocomplete_us"
      )
      ;(getENV as jest.Mock).mockImplementation(() => {
        return {
          key: "smarty-api-key",
        }
      })
    })
    afterAll(jest.resetAllMocks)

    describe("fetching for autocomplete suggestions", () => {
      describe("fetching secondary suggestions enabled", () => {
        beforeEach(() => {
          hookOptions = { enableSecondarySuggestions: true }
        })
        it("returns the first 5 results in the correct shape", async () => {
          const suggestions = Array.from({ length: 10 }, (_, i) => ({
            city: "New York",
            entries: 0,
            secondary: `Fl 13`,
            state: "NY",
            street_line: `40${i + 1} Broadway`,
            zipcode: "10013",
          }))
          mockFetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({
              suggestions,
            }),
          })
          const { result } = setupHook({ country: "US" }, hookOptions)

          await act(() => {
            result.current.fetchForAutocomplete({ search: "401 Broadway" })
          })
          // Assert basic parsed result
          await waitFor(() => {
            expect(result.current.autocompleteOptions.length).toBe(5)
            expect(
              result.current.autocompleteOptions.map(
                ao => ao.address.addressLine1
              )
            ).toEqual([
              "401 Broadway",
              "402 Broadway",
              "403 Broadway",
              "404 Broadway",
              "405 Broadway",
            ])

            expect(result.current.autocompleteOptions[0]).toEqual({
              address: {
                addressLine1: "401 Broadway",
                addressLine2: "Fl 13",
                city: "New York",
                country: "US",
                postalCode: "10013",
                region: "NY",
              },
              entries: 0,
              text: "401 Broadway Fl 13, New York NY 10013",
              value: "401 Broadway Fl 13, New York NY 10013",
            })
          })
        })
      })

      describe("fetching secondary suggestions not enabled", () => {
        beforeEach(() => {
          hookOptions = { enableSecondarySuggestions: false }
          const suggestions = Array.from({ length: 10 }, (_, i) => ({
            city: "New York",
            entries: 10,
            secondary: `Fl`,
            state: "NY",
            street_line: `401 Broadway`,
            zipcode: "10013",
          })).concat(
            {
              city: "New York",
              entries: 10,
              secondary: `Fl 1`,
              state: "NY",
              street_line: `402 Broadway`,
              zipcode: "10013",
            },
            {
              city: "New York",
              entries: 0,
              secondary: `Basement`,
              state: "NY",
              street_line: `401 Broadway`,
              zipcode: "10013",
            }
          )

          mockFetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({
              suggestions,
            }),
          })
        })

        it("returns simplified, deduplicated results without considering secondary information", async () => {
          const { result } = setupHook({ country: "US" }, hookOptions)

          await act(() => {
            result.current.fetchForAutocomplete({ search: "401 Broadway" })
          })

          await waitFor(() => {
            expect(result.current.autocompleteOptions.length).toBe(2)
            expect(
              result.current.autocompleteOptions.map(
                ao => ao.address.addressLine1
              )
            ).toEqual(["401 Broadway", "402 Broadway"])

            expect(result.current.autocompleteOptions[0]).toEqual({
              address: {
                addressLine1: "401 Broadway",
                addressLine2: "",
                city: "New York",
                country: "US",
                postalCode: "10013",
                region: "NY",
              },
              entries: null,
              text: "401 Broadway, New York NY 10013",
              value: "401 Broadway, New York NY 10013",
            })
            expect(result.current.autocompleteOptions[1]).toEqual({
              address: {
                addressLine1: "402 Broadway",
                addressLine2: "",
                city: "New York",
                country: "US",
                postalCode: "10013",
                region: "NY",
              },
              entries: null,
              text: "402 Broadway, New York NY 10013",
              value: "402 Broadway, New York NY 10013",
            })
          })
        })

        it("returns the correct single-line text for an address with multiple entries", async () => {
          mockFetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({
              suggestions: [
                {
                  city: "New York",
                  entries: 0,
                  secondary: "Fl 26",
                  state: "NY",
                  street_line: "402 Broadway",
                  zipcode: "10014",
                },
              ],
            }),
          })

          const { result } = setupHook({ country: "US" })

          act(() => {
            result.current.fetchForAutocomplete({ search: "402 Broadway" })
          })

          await waitFor(() => result.current.autocompleteOptions.length > 0)

          const formattedAddress = result.current.autocompleteOptions[0].text
          expect(formattedAddress).toBe("402 Broadway, New York NY 10014")
        })

        it("returns the first 5 results in the correct shape", async () => {
          mockFetch.mockResolvedValue({
            json: jest.fn().mockResolvedValue({
              suggestions: Array.from({ length: 10 }, (_, i) => ({
                city: "New York",
                entries: 1,
                secondary: `Fl 1${i + 10}`,
                state: "NY",
                street_line: `40${i + 1} Broadway`,
                zipcode: "10013",
              })),
            }),
          })
          const { result } = setupHook({ country: "US" }, hookOptions)

          await act(() => {
            result.current.fetchForAutocomplete({ search: "401 Broadway" })
          })
          // Assert basic parsed result
          await waitFor(() => {
            expect(result.current.autocompleteOptions.length).toBe(5)
            expect(
              result.current.autocompleteOptions.map(
                ao => ao.address.addressLine1
              )
            ).toEqual([
              "401 Broadway",
              "402 Broadway",
              "403 Broadway",
              "404 Broadway",
              "405 Broadway",
            ])

            expect(result.current.autocompleteOptions[0]).toEqual({
              address: {
                addressLine1: "401 Broadway",
                addressLine2: "",
                city: "New York",
                country: "US",
                postalCode: "10013",
                region: "NY",
              },
              entries: null,
              text: "401 Broadway, New York NY 10013",
              value: "401 Broadway, New York NY 10013",
            })
          })
        })

        it("returns the correct single-line text for an address without multiple entries", async () => {
          const { result } = setupHook({ country: "US" }, hookOptions)

          act(() => {
            result.current.fetchForAutocomplete({ search: "401 Broadway" })
          })

          await waitFor(() => result.current.autocompleteOptions.length > 0)

          const formattedAddress = result.current.autocompleteOptions[0].text
          expect(formattedAddress).toBe("401 Broadway, New York NY 10013")
        })
      })

      it("does not fetch for a query of less than 3 characters", async () => {
        const { result } = setupHook({ country: "US" })

        await act(() => {
          result.current.fetchForAutocomplete({ search: "12" })
        })

        expect(mockFetch).not.toHaveBeenCalled()
      })

      it("fetches top-level suggestions from the API with correct parameters", async () => {
        const { result } = setupHook({ country: "US" }, hookOptions)

        await act(() => {
          result.current.fetchForAutocomplete({ search: "401 Broadway" })
        })

        expect(mockFetch).toHaveBeenCalledWith(
          "https://us-autocomplete-pro.api.smarty.com/lookup?key=smarty-api-key&search=401+Broadway"
        )
      })

      it("sets line 2 to an empty string if the value is missing", async () => {
        mockFetch.mockResolvedValue({
          json: jest.fn().mockResolvedValue({
            suggestions: [
              {
                city: "New York",
                entries: 2,
                state: "NY",
                street_line: "402 Broadway",
                zipcode: "10014",
              },
            ],
          }),
        })

        const { result } = setupHook({ country: "US" })

        act(() => {
          result.current.fetchForAutocomplete({ search: "402 Broadway" })
        })

        await waitFor(() => result.current.autocompleteOptions.length > 0)

        const option = result.current.autocompleteOptions[0]
        expect(option.address.addressLine2).toEqual("")
      })

      it("resets the suggestions when the country changes", async () => {
        const { result, rerender } = setupHook({ country: "US" })

        act(() => {
          result.current.fetchForAutocomplete({ search: "401 Broadway" })
        })

        await waitFor(() => result.current.autocompleteOptions.length > 0)

        rerender([{ country: "UK" }])

        expect(result.current.autocompleteOptions).toEqual([])
      })

      it("resets the suggestions without fetching when the search term is too short", async () => {
        const { result } = setupHook({ country: "US" })

        act(() => {
          result.current.fetchForAutocomplete({ search: "401 Broadway" })
        })

        expect(mockFetch).toHaveBeenCalledTimes(1)
        await waitFor(() => result.current.autocompleteOptions.length > 0)

        mockFetch.mockClear()

        act(() => {
          result.current.fetchForAutocomplete({ search: "40" })
        })

        expect(result.current.autocompleteOptions).toEqual([])
        expect(mockFetch).not.toHaveBeenCalled()
      })

      it("throttles calls to the Smarty API", async () => {
        const { result } = setupHook({ country: "US" })

        act(() => {
          result.current.fetchForAutocomplete({ search: "401 Broadway" })
        })

        expect(throttle).toHaveBeenCalledTimes(1)
        expect(throttle).toHaveBeenCalledWith(expect.any(Function), 500, {
          leading: true,
          trailing: true,
        })
      })
    })

    describe("fetching secondary suggestions not enabled", () => {
      it("fetchSecondaySuggestions() does nothing", async () => {
        const selectedOption: AddressAutocompleteSuggestion = {
          address: {
            addressLine1: "401 Broadway",
            addressLine2: "Fl 13",
            city: "New York",
            country: "US",
            postalCode: "10013",
            region: "NY",
          },
          entries: 2,
          value: "401 Broadway, New York NY 10013",
          text: "401 Broadway, New York NY 10013",
        }

        const { result } = setupHook({ country: "US" })
        await act(() => {
          result.current.fetchSecondarySuggestions(
            "401 Broadway",
            selectedOption
          )
        })

        expect(mockFetch).not.toHaveBeenCalled()
      })
    })
    describe("fetching secondary suggestions enabled", () => {
      beforeEach(() => {
        hookOptions = { enableSecondarySuggestions: true }
      })
      it("fetches secondary suggestions from the API with correct parameters", async () => {
        const selectedOption: AddressAutocompleteSuggestion = {
          address: {
            addressLine1: "401 Broadway",
            addressLine2: "Fl 13",
            city: "New York",
            country: "US",
            postalCode: "10013",
            region: "NY",
          },
          entries: 2,
          value: "401 Broadway, New York NY 10013",
          text: "401 Broadway, New York NY 10013",
        }

        mockFetch.mockResolvedValue({
          json: jest.fn().mockResolvedValue({
            suggestions: Array.from({ length: 10 }, (_, i) => ({
              city: "New York",
              entries: 1,
              secondary: `Fl 1${i}`,
              state: "NY",
              street_line: `401 Broadway`,
              zipcode: "10013",
            })),
          }),
        })

        const { result } = setupHook({ country: "US" }, hookOptions)
        await act(() => {
          result.current.fetchSecondarySuggestions(
            "401 Broadway",
            selectedOption
          )
        })

        expect(mockFetch).toHaveBeenCalledWith(
          "https://us-autocomplete-pro.api.smarty.com/lookup?key=smarty-api-key&search=401+Broadway&selected=401+Broadway+Fl+13+%282%29+New+York+NY+10013"
        )
        await waitFor(() => {
          expect(result.current.autocompleteOptions.length).toBe(5)
          expect(
            result.current.autocompleteOptions.map(
              ao => ao.address.addressLine2
            )
          ).toEqual(["Fl 10", "Fl 11", "Fl 12", "Fl 13", "Fl 14"])
          expect(result.current.autocompleteOptions[0]).toEqual({
            address: {
              addressLine1: "401 Broadway",
              addressLine2: "Fl 10",
              city: "New York",
              country: "US",
              postalCode: "10013",
              region: "NY",
            },
            entries: 1,
            text: "401 Broadway Fl 10, New York NY 10013",
            value: "401 Broadway Fl 10, New York NY 10013",
          })
        })
      })
      it("returns the correct single-line text for an address with multiple entries", async () => {
        mockFetch.mockResolvedValue({
          json: jest.fn().mockResolvedValue({
            suggestions: [
              {
                city: "New York",
                entries: 2,
                secondary: "Fl 26",
                state: "NY",
                street_line: "402 Broadway",
                zipcode: "10014",
              },
            ],
          }),
        })

        const { result } = setupHook({ country: "US" }, hookOptions)

        act(() => {
          result.current.fetchForAutocomplete({ search: "402 Broadway" })
        })

        await waitFor(() => result.current.autocompleteOptions.length > 0)

        const formattedAddress = result.current.autocompleteOptions[0].text
        expect(formattedAddress).toBe(
          "402 Broadway Fl 26 (2 entries), New York NY 10014"
        )
      })
    })
  })

  describe("enabled", () => {
    describe("feature flag is enabled", () => {
      beforeAll(() => {
        ;(useFeatureFlag as jest.Mock).mockImplementation(
          featureName => featureName === "address_autocomplete_us"
        )
      })

      describe("API key is availaible", () => {
        beforeAll(() => {
          ;(getENV as jest.Mock).mockImplementation(() => {
            return {
              key: "smarty-api-key",
            }
          })
        })

        describe("selected country is US", () => {
          it("returns true", () => {
            const { result } = setupHook({ country: "US" })
            expect(result.current.enabled).toBe(true)
          })
        })

        describe("selected country is not US", () => {
          it("returns false", () => {
            const { result } = setupHook({ country: "AF" })
            expect(result.current.enabled).toBe(false)
          })
        })
      })

      describe("API key is missing", () => {
        beforeAll(() => {
          ;(getENV as jest.Mock).mockImplementation(() => null)
        })

        describe("selected country is US", () => {
          it("returns false", () => {
            const { result } = setupHook({ country: "US" })
            expect(result.current.enabled).toBe(false)
          })
        })

        describe("selected country is not US", () => {
          it("returns false", () => {
            const { result } = setupHook({ country: "AF" })
            expect(result.current.enabled).toBe(false)
          })
        })
      })
    })

    describe("feature flag is disabled", () => {
      beforeAll(() => {
        ;(useFeatureFlag as jest.Mock).mockImplementation(featureName => false)
      })

      describe("API key is availaible", () => {
        beforeAll(() => {
          ;(getENV as jest.Mock).mockImplementation(() => {
            return {
              key: "smarty-api-key",
            }
          })
        })

        describe("selected country is US", () => {
          it("returns false", () => {
            const { result } = setupHook({ country: "US" })
            expect(result.current.enabled).toBe(false)
          })
        })

        describe("selected country is not US", () => {
          it("returns false", () => {
            const { result } = setupHook({ country: "AF" })
            expect(result.current.enabled).toBe(false)
          })
        })
      })

      describe("API key is missing", () => {
        beforeAll(() => {
          ;(getENV as jest.Mock).mockImplementation(() => null)
        })

        describe("selected country is US", () => {
          it("returns false", () => {
            const { result } = setupHook({ country: "US" })
            expect(result.current.enabled).toBe(false)
          })
        })

        describe("selected country is not US", () => {
          it("returns false", () => {
            const { result } = setupHook({ country: "AF" })
            expect(result.current.enabled).toBe(false)
          })
        })
      })
    })
  })
})
