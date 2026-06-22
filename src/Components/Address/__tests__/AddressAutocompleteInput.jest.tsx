import { ContextModule, OwnerType } from "@artsy/cohesion"
import { render, screen, waitFor, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  AddressAutocompleteInput,
  type AddressAutocompleteInputProps,
  _cancelThrottlesForTest,
} from "Components/Address/AddressAutocompleteInput"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import compact from "lodash/compact"
import { type FC, useState } from "react"
import { useTracking } from "react-tracking"

jest.mock("Utils/getENV", () => ({
  getENV: jest.fn().mockImplementation(() => {
    return {
      key: "smarty-api-key",
    }
  }),
}))

const mockTrackEvent = jest.fn()
jest.mock("react-tracking")

let mockFetch: jest.Mock

jest.mock("@unleash/proxy-client-react", () => ({
  useFlag: jest.fn(
    flag =>
      flag === "address_autocomplete_us" ||
      flag === "emerald_address-autocomplete-international",
  ),
}))

beforeEach(() => {
  _cancelThrottlesForTest()
  ;(useTracking as jest.Mock).mockImplementation(() => ({
    trackEvent: mockTrackEvent,
  }))
  mockFetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue({
      suggestions: [
        {
          city: "New York",
          entries: 2,
          secondary: "Fl 25",
          state: "NY",
          street_line: "401 Broadway",
          zipcode: "10013",
        },
      ],
    }),
  })

  global.fetch = mockFetch
})

afterEach(() => {
  jest.clearAllMocks()
})

interface ImplementationProps extends Partial<AddressAutocompleteInputProps> {
  initialAddress?: {
    line1?: string
    line2?: string
    city?: string
    region?: string
    postalCode?: string
    country: string
  }
}

const mockOnChange = jest.fn()
const mockOnClear = jest.fn()
const mockOnSelect = jest.fn()

const TestImplementation: FC<React.PropsWithChildren<ImplementationProps>> = ({
  initialAddress = { country: "US" },
  ...rest
}) => {
  const [address, setAddress] = useState(initialAddress)

  const formattedAddressLines = compact([
    address.line1,
    address.line2,
    `${address.city}, ${address.region} ${address.postalCode}`,
    address.country,
  ])

  return (
    <>
      <AddressAutocompleteInput
        data-testid="autocomplete-input"
        placeholder="Autocomplete input"
        address={address}
        value={address.line1}
        onChange={mockOnChange.mockImplementation(e => {
          setAddress({ ...address, line1: e.target.value })
        })}
        onClear={mockOnClear.mockImplementation(() => {
          setAddress({ ...address, line1: "" })
        })}
        onSelect={mockOnSelect.mockImplementation(suggestion => {
          setAddress({
            ...address,
            line1: suggestion.address.addressLine1,
            line2: suggestion.address.addressLine2,
            city: suggestion.address.city,
            region: suggestion.address.region,
            postalCode: suggestion.address.postalCode,
          })
        })}
        trackingValues={{
          contextModule: ContextModule.ordersShipping,
          contextOwnerType: OwnerType.ordersShipping,
          contextPageOwnerId: "1234",
        }}
        {...rest}
      />
      <select
        data-testid="AddressForm_country"
        value={address.country}
        onChange={e => {
          setAddress({ ...address, country: e.target.value })
        }}
      >
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="GB">United Kingdom</option>
        <option value="DE">Germany</option>
        <option value="JP">Japan</option>
      </select>
      <div>
        {formattedAddressLines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          setAddress({ ...address, line2: String(Date.now()) })
        }}
      >
        Edit Address
      </button>
    </>
  )
}

describe("AddressAutocompleteInput", () => {
  describe("US address autocomplete", () => {
    it("renders an autocomplete input for a US address", async () => {
      render(<TestImplementation initialAddress={{ country: "US" }} />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.type(line1Input, "40")
      expect(screen.getByLabelText("Clear input")).toBeInTheDocument()
    })

    it("renders a normal input for a US address when the US flag is disabled", async () => {
      const { useFlag } = jest.requireMock("@unleash/proxy-client-react")
      useFlag.mockImplementation(() => false)

      render(<TestImplementation initialAddress={{ country: "US" }} />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.type(line1Input, "40")
      expect(screen.queryByLabelText("Clear input")).not.toBeInTheDocument()

      useFlag.mockImplementation(
        (flag: string) =>
          flag === "address_autocomplete_us" ||
          flag === "emerald_address-autocomplete-international",
      )
    })

    it("shows suggestions for a US address", async () => {
      render(<TestImplementation />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.type(line1Input, "401 Broadway")

      const listbox = await screen.findByRole("listbox", { hidden: true })

      expect(listbox).toHaveTextContent("401 Broadway, New York NY 10013")
    })

    it("does not fetch for a query of less than 3 characters", async () => {
      render(<TestImplementation />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.type(line1Input, "40")

      expect(mockFetch).not.toHaveBeenCalled()
    })

    it("resets the suggestions when the user clears the input", async () => {
      render(<TestImplementation />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.type(line1Input, "401 Broadway")

      const listbox = await screen.findByRole("listbox", { hidden: true })

      expect(listbox).toHaveTextContent("401 Broadway, New York NY 10013")

      const clearButton = screen.getByLabelText("Clear input")
      await userEvent.click(clearButton)

      expect(listbox).not.toBeInTheDocument()
    })

    it("resets the suggestions when the country changes", async () => {
      render(<TestImplementation />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.type(line1Input, "401 Broadway")

      const listbox = await screen.findByRole("listbox", { hidden: true })

      expect(listbox).toHaveTextContent("401 Broadway, New York NY 10013")

      const countrySelect = screen.getByTestId("AddressForm_country")
      await userEvent.selectOptions(countrySelect, ["Canada"])

      expect(listbox).not.toBeInTheDocument()
    })

    it("resets suggestions when the search term is too short", async () => {
      render(<TestImplementation />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.type(line1Input, "401")

      const listbox = await screen.findByRole("listbox", { hidden: true })
      expect(listbox).toBeInTheDocument()

      await userEvent.type(line1Input, "{backspace}")

      expect(listbox).not.toBeInTheDocument()
    })

    it("calls the onChange callback when the user types", async () => {
      render(<TestImplementation />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.type(line1Input, "401 Broadway")

      expect(mockOnChange).toHaveBeenCalledWith(
        expect.objectContaining({
          target: expect.objectContaining({ value: "401 Broadway" }),
        }),
      )
    })

    it("calls the onClear callback when the user clears the input", async () => {
      render(<TestImplementation />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.type(line1Input, "401 Broadway")

      const clearButton = await screen.findByLabelText("Clear input")
      await userEvent.click(clearButton)

      expect(mockOnClear).toHaveBeenCalledTimes(1)
    })

    it("calls the onSelect callback with the option and its index when the user selects a suggestion", async () => {
      render(<TestImplementation />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.paste(line1Input, "401 Broadway")

      const dropdown = await screen.findByRole("listbox", { hidden: true })
      const option = within(dropdown).getByText(
        "401 Broadway, New York NY 10013",
      )

      await userEvent.click(option)
      await flushPromiseQueue()

      expect(mockOnSelect).toHaveBeenCalledTimes(1)
      expect(mockOnSelect).toHaveBeenCalledWith(
        {
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
        },
        0,
      )
    })

    it("can use props.disableAutocomplete to force a normal input", async () => {
      render(<TestImplementation disableAutocomplete />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")

      await userEvent.type(line1Input, "40")
      expect(screen.queryByLabelText("Clear input")).not.toBeInTheDocument()
    })
  })

  describe("International address autocomplete", () => {
    it("contains exactly the expected countries in SUPPORTED_INTERNATIONAL_COUNTRY_CODES", () => {
      const { SUPPORTED_INTERNATIONAL_COUNTRY_CODES } = jest.requireActual(
        "Components/Address/AddressAutocompleteInput",
      )

      const expectedCountries = ["GB", "DE", "CH", "IT", "FR"]
      expect(SUPPORTED_INTERNATIONAL_COUNTRY_CODES.size).toBe(
        expectedCountries.length,
      )

      // Verify the exact counties in SUPPORTED_INTERNATIONAL_COUNTRY_CODES
      const actualCountries = Array.from(SUPPORTED_INTERNATIONAL_COUNTRY_CODES)
      expect(actualCountries.sort()).toEqual(expectedCountries.sort())
    })

    it("renders a normal input for a non-US address when international flag is off", async () => {
      const { useFlag } = jest.requireMock("@unleash/proxy-client-react")
      useFlag.mockImplementation(
        (flag: string) => flag === "address_autocomplete_us",
      )

      render(<TestImplementation initialAddress={{ country: "GB" }} />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.type(line1Input, "10 Downing")
      expect(screen.queryByLabelText("Clear input")).not.toBeInTheDocument()

      useFlag.mockImplementation(
        (flag: string) =>
          flag === "address_autocomplete_us" ||
          flag === "emerald_address-autocomplete-international",
      )
    })

    it("renders an autocomplete input for a non-US address when international flag is on", async () => {
      render(<TestImplementation initialAddress={{ country: "GB" }} />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      // Type 2 chars (below 3-char fetch threshold) so loading stays false
      await userEvent.type(line1Input, "10")
      expect(screen.getByLabelText("Clear input")).toBeInTheDocument()
    })

    it("only makes autocomplete requests for countries in SUPPORTED_INTERNATIONAL_COUNTRY_CODES", async () => {
      // Test with a supported country (GB)
      const { rerender } = render(
        <TestImplementation initialAddress={{ country: "GB" }} />,
      )

      let line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.type(line1Input, "10 Downing")

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled()
      })

      mockFetch.mockClear()

      // Test with an unsupported but Smarty-supported country (NL)
      rerender(<TestImplementation initialAddress={{ country: "NL" }} />)

      line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.type(line1Input, "Herengracht 1")

      // Should render as normal input, not autocomplete
      expect(screen.queryByLabelText("Clear input")).not.toBeInTheDocument()
      expect(mockFetch).not.toHaveBeenCalled()
    })

    it("shows suggestions for an international address", async () => {
      mockFetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          candidates: [
            {
              address_text: "10 Downing St SW1A 2AA London",
              address_id: "abc123",
              entries: 1,
            },
          ],
        }),
        ok: true,
      })

      render(<TestImplementation initialAddress={{ country: "GB" }} />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.type(line1Input, "10 Downing")

      const listbox = await screen.findByRole("listbox", { hidden: true })
      expect(listbox).toHaveTextContent("10 Downing St SW1A 2AA London")
    })

    it("populates all fields from structured components on select (Germany)", async () => {
      mockFetch
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue({
            candidates: [
              {
                address_text: "Unter den Linden 1 10117 Berlin",
                address_id: "de-addr-id",
                entries: 1,
              },
            ],
          }),
          ok: true,
        })
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue({
            candidates: [
              {
                country_iso3: "DEU",
                administrative_area: "Berlin",
                locality: "Berlin",
                postal_code: "10117",
                street: "Unter den Linden 1",
              },
            ],
          }),
          ok: true,
        })

      render(<TestImplementation initialAddress={{ country: "DE" }} />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.paste(line1Input, "Unter den Linden")

      const dropdown = await screen.findByRole("listbox", { hidden: true })
      await userEvent.click(
        within(dropdown).getByText("Unter den Linden 1 10117 Berlin"),
      )
      await flushPromiseQueue()

      expect(mockFetch).toHaveBeenCalledTimes(2)
      expect(mockFetch.mock.calls[1][0]).toContain("/v2/lookup/de-addr-id")
      expect(mockOnSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          address: {
            addressLine1: "Unter den Linden 1",
            addressLine2: "",
            city: "Berlin",
            region: "Berlin",
            postalCode: "10117",
            country: "DE",
          },
        }),
        0,
      )
    })

    it("populates all fields from structured components on select (UK)", async () => {
      mockFetch
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue({
            candidates: [
              {
                address_text: "10 Ashwood Close Worthing BN11 2AF",
                address_id: "uk-addr-id",
                entries: 1,
              },
            ],
          }),
          ok: true,
        })
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue({
            candidates: [
              {
                country_iso3: "GBR",
                administrative_area: "West Sussex",
                locality: "Worthing",
                postal_code: "BN11 2AF",
                street: "10 Ashwood Close",
              },
            ],
          }),
          ok: true,
        })

      render(<TestImplementation initialAddress={{ country: "GB" }} />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.paste(line1Input, "10 Ashwood")

      const dropdown = await screen.findByRole("listbox", { hidden: true })
      await userEvent.click(
        within(dropdown).getByText("10 Ashwood Close Worthing BN11 2AF"),
      )
      await flushPromiseQueue()

      expect(mockFetch.mock.calls[1][0]).toContain("/v2/lookup/uk-addr-id")
      expect(mockOnSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          address: {
            addressLine1: "10 Ashwood Close",
            addressLine2: "",
            city: "Worthing",
            region: "West Sussex",
            postalCode: "BN11 2AF",
            country: "GB",
          },
        }),
        0,
      )
    })

    it("filters out international suggestions with entries > 1", async () => {
      mockFetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          candidates: [
            {
              address_text: "Unter den Linden 1 10117 Berlin",
              address_id: "unit-id-1",
              entries: 1,
            },
            {
              address_text: "Unter den Linden 10117 Berlin",
              address_id: "street-id",
              entries: 5,
            },
          ],
        }),
        ok: true,
      })

      render(<TestImplementation initialAddress={{ country: "DE" }} />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.type(line1Input, "Unter den Linden")

      const listbox = await screen.findByRole("listbox", { hidden: true })
      expect(listbox).toHaveTextContent("Unter den Linden 1 10117 Berlin")
      expect(listbox).not.toHaveTextContent("Unter den Linden 10117 Berlin")
    })

    it("falls back to full address_text in addressLine1 when components endpoint returns no data", async () => {
      mockFetch
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue({
            candidates: [
              {
                address_text: "Via Roma 1 00100 Roma",
                address_id: "it-addr-id",
                entries: 1,
              },
            ],
          }),
          ok: true,
        })
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue({ candidates: [] }),
          ok: true,
        })

      render(<TestImplementation initialAddress={{ country: "IT" }} />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.paste(line1Input, "Via Roma")

      const dropdown = await screen.findByRole("listbox", { hidden: true })
      await userEvent.click(within(dropdown).getByText("Via Roma 1 00100 Roma"))
      await flushPromiseQueue()

      expect(mockOnSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          address: expect.objectContaining({
            addressLine1: "Via Roma 1 00100 Roma",
            city: "",
            postalCode: "",
            country: "IT",
          }),
        }),
        0,
      )
    })

    it("uses structured components from address_id lookup on selection", async () => {
      mockFetch
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue({
            candidates: [
              {
                address_text: "Krausenstr. 9-10 10117 Berlin",
                address_id: "addr-id-123",
                entries: 1,
              },
            ],
          }),
          ok: true,
        })
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue({
            candidates: [
              {
                country_iso3: "DEU",
                administrative_area: "Berlin",
                locality: "Berlin",
                postal_code: "10117",
                street: "Krausenstr. 9-10",
              },
            ],
          }),
          ok: true,
        })

      render(<TestImplementation initialAddress={{ country: "DE" }} />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.paste(line1Input, "Krausenstr")

      const dropdown = await screen.findByRole("listbox", { hidden: true })
      await userEvent.click(
        within(dropdown).getByText("Krausenstr. 9-10 10117 Berlin"),
      )
      await flushPromiseQueue()

      expect(mockFetch).toHaveBeenCalledTimes(2)
      expect(mockFetch.mock.calls[1][0]).toContain("/v2/lookup/addr-id-123")
      expect(mockOnSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          address: {
            addressLine1: "Krausenstr. 9-10",
            addressLine2: "",
            city: "Berlin",
            region: "Berlin",
            postalCode: "10117",
            country: "DE",
          },
        }),
        0,
      )
    })

    it("defaults fields Smarty omits to empty strings on selection", async () => {
      mockFetch
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue({
            candidates: [
              {
                address_text: "10 Downing Street London SW1A 2AA",
                address_id: "gb-addr-id",
                entries: 1,
              },
            ],
          }),
          ok: true,
        })
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue({
            // Smarty omits administrative_area when it has no value for it.
            candidates: [
              {
                country_iso3: "GBR",
                locality: "London",
                postal_code: "SW1A 2AA",
                street: "10 Downing Street",
              },
            ],
          }),
          ok: true,
        })

      render(<TestImplementation initialAddress={{ country: "GB" }} />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.paste(line1Input, "10 Downing")

      const dropdown = await screen.findByRole("listbox", { hidden: true })
      await userEvent.click(
        within(dropdown).getByText("10 Downing Street London SW1A 2AA"),
      )
      await flushPromiseQueue()

      expect(mockOnSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          address: {
            addressLine1: "10 Downing Street",
            addressLine2: "",
            city: "London",
            region: "",
            postalCode: "SW1A 2AA",
            country: "GB",
          },
        }),
        0,
      )
    })

    it("falls back to full address_text in addressLine1 when components endpoint returns no components", async () => {
      mockFetch
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue({
            candidates: [
              {
                address_text: "Unter den Linden 1 10117 Berlin",
                address_id: "addr-no-components",
                entries: 1,
              },
            ],
          }),
          ok: true,
        })
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue({ candidates: [] }),
          ok: true,
        })

      render(<TestImplementation initialAddress={{ country: "DE" }} />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.paste(line1Input, "Unter den Linden")

      const dropdown = await screen.findByRole("listbox", { hidden: true })
      await userEvent.click(
        within(dropdown).getByText("Unter den Linden 1 10117 Berlin"),
      )
      await flushPromiseQueue()

      expect(mockOnSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          address: expect.objectContaining({
            addressLine1: "Unter den Linden 1 10117 Berlin",
            city: "",
            postalCode: "",
          }),
        }),
        0,
      )
    })

    it("resets international suggestions when the country changes", async () => {
      mockFetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          candidates: [
            {
              address_text: "10 Downing St SW1A 2AA London",
              address_id: "abc123",
              entries: 1,
            },
          ],
        }),
        ok: true,
      })

      render(<TestImplementation initialAddress={{ country: "GB" }} />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.type(line1Input, "10 Downing")

      const listbox = await screen.findByRole("listbox", { hidden: true })
      expect(listbox).toBeInTheDocument()

      const countrySelect = screen.getByTestId("AddressForm_country")
      await userEvent.selectOptions(countrySelect, ["Germany"])

      expect(listbox).not.toBeInTheDocument()
    })

    it("keeps the autocomplete input active and shows no suggestions if the international API errors", async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        status: 401,
        json: jest.fn().mockResolvedValue({}),
      })

      render(<TestImplementation initialAddress={{ country: "GB" }} />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      // Type 2 chars (below fetch threshold) to confirm autocomplete is still rendered
      await userEvent.type(line1Input, "10")
      expect(screen.getByLabelText("Clear input")).toBeInTheDocument()

      // Type a 3rd char to trigger the failing fetch
      await userEvent.type(line1Input, " D")
      await waitFor(() => {
        // No suggestions shown, but input remains as autocomplete (clear button still present)
        expect(
          screen.queryByRole("listbox", { hidden: true }),
        ).not.toBeInTheDocument()
        expect(screen.getByLabelText("Clear input")).toBeInTheDocument()
      })
    })
  })

  describe("Tracking", () => {
    it.skip("tracks when autocomplete results are received", async () => {
      render(<TestImplementation />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.type(line1Input, "401 Broadway")

      await screen.findByRole("listbox", { hidden: true })

      expect(mockTrackEvent).toHaveBeenCalledWith({
        action: "addressAutoCompletionResult",
        context_module: "ordersShipping",
        context_owner_id: "1234",
        context_owner_type: "orders-shipping",
        input: "401 Broadway",
        suggested_addresses_results: 1,
        country: "US",
      })
      mockFetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue({
          suggestions: [
            {
              city: "New York",
              entries: 2,
              secondary: "Fl 25",
              state: "NY",
              street_line: "156 Quincy",
              zipcode: "10013",
            },
            {
              city: "Brooklyn",
              entries: 2,
              secondary: "Apt 1",
              state: "NY",
              street_line: "156 Quincy",
              zipcode: "11216",
            },
          ],
        }),
      })
      await userEvent.clear(line1Input)
      await userEvent.type(line1Input, "156 Quincy")
      await waitFor(() => {
        expect(mockTrackEvent).toHaveBeenCalledWith({
          action: "addressAutoCompletionResult",
          context_module: "ordersShipping",
          context_owner_id: "1234",
          context_owner_type: "orders-shipping",
          input: "156 Quincy",
          suggested_addresses_results: 2,
          country: "US",
        })
      })
    })

    it("tracks when an address is selected", async () => {
      render(<TestImplementation />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.paste(line1Input, "401 Broadway")

      const dropdown = await screen.findByRole("listbox", { hidden: true })
      const option = within(dropdown).getByText(
        "401 Broadway, New York NY 10013",
      )

      await userEvent.click(option)
      await flushPromiseQueue()

      expect(mockTrackEvent).toHaveBeenCalledWith({
        action: "selectedItemFromAddressAutoCompletion",
        context_module: "ordersShipping",
        context_owner_id: "1234",
        context_owner_type: "orders-shipping",
        input: "401 Broadway",
        item: "401 Broadway, New York NY 10013",
        country: "US",
      })
    })

    it("tracks the country code when an international address is selected", async () => {
      mockFetch
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue({
            candidates: [
              {
                address_text: "Unter den Linden 1 10117 Berlin",
                address_id: "de-addr-id",
                entries: 1,
              },
            ],
          }),
          ok: true,
        })
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue({
            candidates: [
              {
                country_iso3: "DEU",
                administrative_area: "Berlin",
                locality: "Berlin",
                postal_code: "10117",
                street: "Unter den Linden 1",
              },
            ],
          }),
          ok: true,
        })

      render(<TestImplementation initialAddress={{ country: "DE" }} />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.paste(line1Input, "Unter den Linden")

      const dropdown = await screen.findByRole("listbox", { hidden: true })
      await userEvent.click(
        within(dropdown).getByText("Unter den Linden 1 10117 Berlin"),
      )
      await flushPromiseQueue()

      expect(mockTrackEvent).toHaveBeenCalledWith(
        expect.objectContaining({
          action: "selectedItemFromAddressAutoCompletion",
          country: "DE",
        }),
      )
    })
  })
})
