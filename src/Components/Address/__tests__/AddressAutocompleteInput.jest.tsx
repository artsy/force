import { ContextModule, OwnerType } from "@artsy/cohesion"
import { screen, render, within, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import {
  AddressAutocompleteInput,
  AddressAutocompleteInputProps,
  useAddressAutocompleteTracking,
} from "Components/Address/AddressAutocompleteInput"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import compact from "lodash/compact"
import { FC, useState } from "react"
import { useTracking } from "react-tracking"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"

jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(),
}))

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
beforeEach(() => {
  ;(useTracking as jest.Mock).mockImplementation(() => ({
    trackEvent: mockTrackEvent,
  }))
  mockFetch = jest.fn().mockResolvedValue({
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

const TestImplementation: FC<ImplementationProps> = ({
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

  const autocompleteTracking = useAddressAutocompleteTracking({
    contextModule: ContextModule.ordersShipping,
    contextOwnerType: OwnerType.ordersShipping,
    contextPageOwnerId: "1234",
  })

  return (
    <>
      {
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
            autocompleteTracking.selectedAutocompletedAddress(
              suggestion,
              address.line1!
            )
          })}
          onReceiveAutocompleteResult={(input, resultCount) =>
            autocompleteTracking.receivedAutocompleteResult(input, resultCount)
          }
          {...rest}
        />
      }
      <select
        data-testid="AddressForm_country"
        value={address.country}
        onChange={e => {
          setAddress({ ...address, country: e.target.value })
        }}
      >
        <option value="US">United States</option>
        <option value="CA">Canada</option>
      </select>
      <div>
        {formattedAddressLines.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
      <button
        onClick={() => {
          setAddress({ ...address, line2: String(Date.now()) })
          autocompleteTracking.editedAutocompletedAddress("line2")
        }}
      >
        Edit Address
      </button>
    </>
  )
}

describe("AddressAutocompleteInput", () => {
  describe("address autocomplete is enabled for US only", () => {
    beforeEach(() => {
      ;(useFeatureFlag as jest.Mock).mockImplementation(
        featureName => featureName === "address_autocomplete_us"
      )
    })

    it("renders an autocomplete input for a US address", async () => {
      render(<TestImplementation initialAddress={{ country: "US" }} />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.type(line1Input, "40")
      expect(screen.getByLabelText("Clear input")).toBeInTheDocument()
    })

    it("renders a normal input for a non-US address", async () => {
      render(<TestImplementation initialAddress={{ country: "CA" }} />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.type(line1Input, "40")
      expect(screen.queryByLabelText("Clear input")).not.toBeInTheDocument()
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
        })
      )
    })

    it("calls the onClear callback when the user clears the input", async () => {
      render(<TestImplementation />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.type(line1Input, "401 Broadway")

      const clearButton = screen.getByLabelText("Clear input")
      await userEvent.click(clearButton)

      expect(mockOnClear).toHaveBeenCalledTimes(1)
    })

    it("calls the onSelect callback with the option and its index when the user selects a suggestion", async () => {
      render(<TestImplementation />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")
      await userEvent.paste(line1Input, "401 Broadway")

      const dropdown = await screen.findByRole("listbox", { hidden: true })
      const option = within(dropdown).getByText(
        "401 Broadway, New York NY 10013"
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
        0
      )
    })

    it("can use props.disableAutocomplete to force a normal input", async () => {
      render(<TestImplementation disableAutocomplete />)

      const line1Input = screen.getByPlaceholderText("Autocomplete input")

      await userEvent.type(line1Input, "40")
      expect(screen.queryByLabelText("Clear input")).not.toBeInTheDocument()
    })

    // See TestImplementation for implementation details
    describe("tracking", () => {
      it("developer can track when suggested addresses update with hook + `onReceiveAutocompleteResult` prop", async () => {
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

      it("developer can use tracking hook with `onSelect` prop to track when an address is selected", async () => {
        render(<TestImplementation />)

        const line1Input = screen.getByPlaceholderText("Autocomplete input")
        await userEvent.paste(line1Input, "401 Broadway")

        const dropdown = await screen.findByRole("listbox", { hidden: true })
        const option = within(dropdown).getByText(
          "401 Broadway, New York NY 10013"
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

      it("developer can use hook to track when the user edits an autocompleted address", async () => {
        render(<TestImplementation />)

        const line1Input = screen.getByPlaceholderText("Autocomplete input")
        await userEvent.paste(line1Input, "401 Broadway")

        const dropdown = await screen.findByRole("listbox", { hidden: true })
        const option = within(dropdown).getByText(
          "401 Broadway, New York NY 10013"
        )

        await userEvent.click(option)
        await flushPromiseQueue()

        const editAddressButton = screen.getByText("Edit Address")
        await userEvent.click(editAddressButton)

        expect(mockTrackEvent).toHaveBeenCalledWith({
          action: "editedAutocompletedAddress",
          context_module: "ordersShipping",
          context_owner_id: "1234",
          context_owner_type: "orders-shipping",
          field: "line2",
        })
      })
    })
  })
})
