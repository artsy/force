import { act, renderHook } from "@testing-library/react-hooks"
import {
  AddressAutocompleteSuggestion,
  useAddressAutocomplete,
} from "Components/Address/useAddressAutocomplete"
import { useFeatureFlag } from "System/useFeatureFlag"
import { getENV } from "Utils/getENV"
import { waitFor } from "@testing-library/react"

jest.mock("react-tracking")
jest.mock("System/useFeatureFlag")
jest.mock("Utils/getENV")

let mockFetch: jest.Mock

describe("useAddressAutocomplete", () => {
  const setupHook = (...args: Parameters<typeof useAddressAutocomplete>) => {
    const result = renderHook(props => useAddressAutocomplete(props), {
      initialProps: args[0],
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
            secondary: "Fl 25",
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
      it("fetches top-level suggestions from the API with correct parameters", async () => {
        mockFetch.mockResolvedValue({
          json: jest.fn().mockResolvedValue({
            suggestions: [
              {
                city: "New York",
                entries: 0,
                secondary: "Fl 25",
                state: "NY",
                street_line: "401 Broadway",
                zipcode: "10013",
              },
            ],
          }),
        })

        const { result } = setupHook({ country: "US" })

        await act(() => {
          result.current.fetchForAutocomplete({ search: "401 Broadway" })
        })

        // Assert that we called the api right
        expect(mockFetch).toHaveBeenCalledWith(
          "https://us-autocomplete-pro.api.smarty.com/lookup?key=smarty-api-key&search=401+Broadway"
        )

        // Assert basic parsed result
        await waitFor(() =>
          expect(result.current.autocompleteOptions).toEqual([
            {
              address: {
                addressLine1: "401 Broadway",
                addressLine2: "Fl 25",
                city: "New York",
                country: "US",
                postalCode: "10013",
                region: "NY",
              },
              entries: 0,
              text: "401 Broadway Fl 25, New York NY 10013",
              value: "401 Broadway Fl 25, New York NY 10013",
            },
          ])
        )
      })

      it("does not fetch for a query of less than 3 characters", async () => {
        const { result } = setupHook({ country: "US" })

        await act(() => {
          result.current.fetchForAutocomplete({ search: "12" })
        })

        expect(mockFetch).not.toHaveBeenCalled()
      })

      it("returns the correct single-line text for an address without multiple entries", async () => {
        const { result } = setupHook({ country: "US" })

        act(() => {
          result.current.fetchForAutocomplete({ search: "401 Broadway" })
        })

        await waitFor(() => result.current.autocompleteOptions.length > 0)

        const formattedAddress = result.current.autocompleteOptions[0].text
        expect(formattedAddress).toBe("401 Broadway Fl 25, New York NY 10013")
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

        const { result } = setupHook({ country: "US" })

        act(() => {
          result.current.fetchForAutocomplete({ search: "402 Broadway" })
        })

        await waitFor(() => result.current.autocompleteOptions.length > 0)

        const formattedAddress = result.current.autocompleteOptions[0].text
        expect(formattedAddress).toBe(
          "402 Broadway Fl 26 (2 entries), New York NY 10014"
        )
      })

      it("resets the suggestions when the country changes", async () => {
        const { result, rerender } = setupHook({ country: "US" })

        act(() => {
          result.current.fetchForAutocomplete({ search: "401 Broadway" })
        })

        await waitFor(() => result.current.autocompleteOptions.length > 0)

        rerender({ country: "UK" })

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
    })

    describe("fetching secondary suggestions", () => {
      it("fetches secondary suggestions from the API with correct parameters", async () => {
        const selectedOption: AddressAutocompleteSuggestion = {
          address: {
            addressLine1: "401 Broadway",
            addressLine2: "Fl 25",
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
            suggestions: [
              {
                city: "New York",
                entries: 1,
                secondary: "Fl 25",
                state: "NY",
                street_line: "401 Broadway",
                zipcode: "10013",
              },
              {
                city: "New York",
                entries: 1,
                secondary: "Lobby",
                state: "NY",
                street_line: "401 Broadway",
                zipcode: "10013",
              },
            ],
          }),
        })

        const { result } = setupHook({ country: "US" })
        await act(() => {
          result.current.fetchSecondarySuggestions(
            "401 Broadway",
            selectedOption
          )
        })

        expect(mockFetch).toHaveBeenCalledWith(
          "https://us-autocomplete-pro.api.smarty.com/lookup?key=smarty-api-key&search=401+Broadway&selected=401+Broadway+Fl+25+%282%29+New+York+NY+10013"
        )
        await waitFor(() =>
          expect(result.current.autocompleteOptions).toEqual([
            {
              address: {
                addressLine1: "401 Broadway",
                addressLine2: "Fl 25",
                city: "New York",
                country: "US",
                postalCode: "10013",
                region: "NY",
              },
              entries: 1,
              text: "401 Broadway Fl 25, New York NY 10013",
              value: "401 Broadway Fl 25, New York NY 10013",
            },
            {
              address: {
                addressLine1: "401 Broadway",
                addressLine2: "Lobby",
                city: "New York",
                country: "US",
                postalCode: "10013",
                region: "NY",
              },
              entries: 1,
              text: "401 Broadway Lobby, New York NY 10013",
              value: "401 Broadway Lobby, New York NY 10013",
            },
          ])
        )
      })
    })
  })

  describe("isAddressAutocompleteEnabled", () => {
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
            expect(result.current.isAddressAutocompleteEnabled).toBe(true)
          })
        })

        describe("selected country is not US", () => {
          it("returns false", () => {
            const { result } = setupHook({ country: "AF" })
            expect(result.current.isAddressAutocompleteEnabled).toBe(false)
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
            expect(result.current.isAddressAutocompleteEnabled).toBe(false)
          })
        })

        describe("selected country is not US", () => {
          it("returns false", () => {
            const { result } = setupHook({ country: "AF" })
            expect(result.current.isAddressAutocompleteEnabled).toBe(false)
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
            expect(result.current.isAddressAutocompleteEnabled).toBe(false)
          })
        })

        describe("selected country is not US", () => {
          it("returns false", () => {
            const { result } = setupHook({ country: "AF" })
            expect(result.current.isAddressAutocompleteEnabled).toBe(false)
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
            expect(result.current.isAddressAutocompleteEnabled).toBe(false)
          })
        })

        describe("selected country is not US", () => {
          it("returns false", () => {
            const { result } = setupHook({ country: "AF" })
            expect(result.current.isAddressAutocompleteEnabled).toBe(false)
          })
        })
      })
    })
  })
})
