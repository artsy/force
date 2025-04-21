import { screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { Address } from "Components/Address/utils"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { act } from "react"

export const ADDRESS_FORM_INPUTS: Record<
  keyof Address,
  { label: string; placeholder: string | null }
> = {
  name: { label: "Full name", placeholder: "Add full name" },
  country: {
    label: "Country",
    placeholder: null,
  },
  postalCode: {
    label: "ZIP/Postal code",
    placeholder: "Add ZIP/Postal code",
  },
  addressLine1: {
    label: "Street address",
    placeholder: "Add street address",
  },
  addressLine2: {
    label: "Apt, floor, suite, etc. (optional)",
    placeholder: "Add apartment, floor, suite, etc.",
  },
  city: { label: "City", placeholder: "Add city" },
  region: {
    label: "State, region or province",
    placeholder: "Add state, region or province",
  },
  phoneNumber: { label: "Phone number", placeholder: "Add phone number" },
}

export const hasCorrectAddressFormFields = ({
  withLegacyPhoneInput,
}: { withLegacyPhoneInput?: boolean } = {}): boolean => {
  const expectedInputs = withLegacyPhoneInput
    ? Object.values(ADDRESS_FORM_INPUTS)
    : Object.entries(ADDRESS_FORM_INPUTS)
        .filter(([input, _spec]) => input !== "phoneNumber")
        .map(([_, spec]) => spec)
  Object.values(expectedInputs).forEach(({ label, placeholder }) => {
    const input = screen.getByLabelText(label)
    expect(input).toBeInTheDocument()
    if (placeholder) {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(input).toHaveAttribute("placeholder", placeholder)
    } else {
      // eslint-disable-next-line jest/no-conditional-expect
      expect(input).not.toHaveAttribute("placeholder")
    }
  })
  return true
}

/**
 * Fill the `<AddressFormFields />` component's inputs with the provided address
 * Options:
 * - `clearInputs`: Clear text inputs before filling them
 * - `wrapperTestId`: The test ID of the wrapper element containing the inputs
 */
export const fillAddressFormFields = async (
  address: Partial<Address>,
  options: { clearInputs?: boolean; wrapperTestId?: string } = {},
) => {
  const { clearInputs = false, wrapperTestId = "addressFormFields" } = options

  const wrapper = screen.getByTestId(wrapperTestId)
  const { country, phoneNumber, ...defaultTextInputs } = address

  // Country input can trigger ui updates
  if (country) {
    await act(async () => {
      const countrySelect = within(wrapper).getByLabelText(
        ADDRESS_FORM_INPUTS.country.label,
      )

      userEvent.selectOptions(countrySelect, [country])
      await flushPromiseQueue()
    })
  }

  Object.entries(defaultTextInputs).length > 0 &&
    act(() => {
      Object.entries(defaultTextInputs).forEach(([key, value]) => {
        const input = within(wrapper).getByLabelText(
          ADDRESS_FORM_INPUTS[key].label,
        )
        if (clearInputs) {
          userEvent.clear(input)
        }
        userEvent.paste(input, value)
      })
    })

  if (phoneNumber) {
    act(() => {
      const phoneNumberInput = within(wrapper).getByLabelText(
        ADDRESS_FORM_INPUTS.phoneNumber.label,
      )
      if (clearInputs) {
        userEvent.clear(phoneNumberInput)
      }
      userEvent.paste(phoneNumberInput, phoneNumber)
    })
  }
}
