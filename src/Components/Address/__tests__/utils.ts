import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Address } from "Components/Address/utils"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"

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

/**
 * Fill the `<AddressFormFields />` component's inputs with the provided address
 */
export const fillAddressFormFields = async (address: Partial<Address>) => {
  const { country, phoneNumber, ...defaultTextInputs } = address

  if (country) {
    const countrySelect = await screen.findByLabelText(
      ADDRESS_FORM_INPUTS.country.label
    )
    await userEvent.selectOptions(countrySelect, [country])
    await flushPromiseQueue()
  }

  if (phoneNumber) {
    const phoneNumberInput = await screen.findByLabelText(
      ADDRESS_FORM_INPUTS.phoneNumber.label
    )
    await userEvent.paste(phoneNumberInput, phoneNumber)
  }
  await Promise.all(
    Object.entries(defaultTextInputs).map(async ([key, value]) => {
      const input = await screen.findByLabelText(ADDRESS_FORM_INPUTS[key].label)
      await userEvent.paste(input, value)
    })
  )
}
