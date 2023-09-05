import { act, renderHook } from "@testing-library/react-hooks"
import {
  AddressAutocompleteSuggestion,
  useAddressAutocomplete,
} from "Components/Address/useAddressAutocomplete"
import { useFeatureFlag } from "System/useFeatureFlag"
import { waitFor } from "@testing-library/react"

jest.mock("react-tracking")
jest.mock("System/useFeatureFlag")
jest.mock("Utils/getENV", () => ({
  getENV: jest.fn().mockImplementation(() => {
    return {
      key: "smarty-api-key",
    }
  }),
}))

let mockFetch: jest.Mock

describe("useAddressAutocomplete", () => {
  const setupHook = (...args: Parameters<typeof useAddressAutocomplete>) => {
    const result = renderHook(() => useAddressAutocomplete(...args))
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

      it.todo("does not fetch for a query of less than 5 characters")
      it.todo(
        "Returns the correct single-line text for an address without multiple entries"
      )
      it.todo(
        "Returns the correct single-line text for an address with multiple entries"
      )
      it.todo("resets the suggestions when the country changes")
      it.todo(
        "resets the suggestions without fetching when the search term is too short"
      )
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
})
