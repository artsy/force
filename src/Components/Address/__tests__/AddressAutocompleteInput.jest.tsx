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
  describe("address autocomplete is enabled for US only", () => {
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

    it("populates all fields from structured components on select (Netherlands)", async () => {
      mockFetch
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue({
            candidates: [
              {
                address_text: "Herengracht 1 1015 BA Amsterdam",
                address_id: "nl-addr-id",
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
                country_iso3: "NLD",
                administrative_area: "Noord-Holland",
                locality: "Amsterdam",
                postal_code: "1015 BA",
                street: "Herengracht 1",
              },
            ],
          }),
          ok: true,
        })

      render(<TestImplementation initialAddress={{ country: "NL" }} />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.paste(line1Input, "Herengracht")

      const dropdown = await screen.findByRole("listbox", { hidden: true })
      await userEvent.click(
        within(dropdown).getByText("Herengracht 1 1015 BA Amsterdam"),
      )
      await flushPromiseQueue()

      expect(mockFetch.mock.calls[1][0]).toContain("/v2/lookup/nl-addr-id")
      expect(mockOnSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          address: {
            addressLine1: "Herengracht 1",
            addressLine2: "",
            city: "Amsterdam",
            region: "Noord-Holland",
            postalCode: "1015 BA",
            country: "NL",
          },
        }),
        0,
      )
    })

    it("fetches components for street-level results (entries > 1) and populates form", async () => {
      // First fetch: autocomplete candidates (entries > 1 means sub-units exist)
      // Second fetch: address_id lookup returns sub-unit list (still ProviderSuggestionInternational)
      // Third fetch: sub-unit address_id lookup returns flat structured components
      mockFetch
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue({
            candidates: [
              {
                address_text: "Unter den Linden 10117 Berlin",
                address_id: "street-id",
                entries: 2,
              },
            ],
          }),
          ok: true,
        })
        // address_id lookup returns 2 sub-unit candidates (entries matches candidate count)
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue({
            candidates: [
              {
                address_text: "Unter den Linden 1 10117 Berlin",
                address_id: "sub-unit-id-1",
                entries: 1,
              },
              {
                address_text: "Unter den Linden 2 10117 Berlin",
                address_id: "sub-unit-id-2",
                entries: 1,
              },
            ],
          }),
          ok: true,
        })
        // first sub-unit components fetch
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
      await userEvent.type(line1Input, "Unter den Linden")

      const dropdown = await screen.findByRole("listbox", { hidden: true })
      await userEvent.click(
        within(dropdown).getByText("Unter den Linden 10117 Berlin"),
      )
      await flushPromiseQueue()

      // Verifies the first sub-unit (not the second) is used
      expect(mockOnSelect).toHaveBeenCalledTimes(1)
      expect(mockOnSelect.mock.calls[0][0].address).toMatchObject({
        addressLine1: "Unter den Linden 1",
        city: "Berlin",
        postalCode: "10117",
        country: "DE",
      })
    })

    it("falls back to full address_text in addressLine1 when components endpoint returns no data", async () => {
      mockFetch
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue({
            candidates: [
              {
                address_text: "1-1 Shibuya Tokyo",
                address_id: "jp-addr-id",
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

      render(<TestImplementation initialAddress={{ country: "JP" }} />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.paste(line1Input, "Shibuya")

      const dropdown = await screen.findByRole("listbox", { hidden: true })
      await userEvent.click(within(dropdown).getByText("1-1 Shibuya Tokyo"))
      await flushPromiseQueue()

      expect(mockOnSelect).toHaveBeenCalledWith(
        expect.objectContaining({
          address: expect.objectContaining({
            addressLine1: "1-1 Shibuya Tokyo",
            city: "",
            postalCode: "",
            country: "JP",
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

    // See TestImplementation for implementation details
    describe("tracking", () => {
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
        })
      })
    })
  })
})
