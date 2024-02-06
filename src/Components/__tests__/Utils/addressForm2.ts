/**
 * Address utilities for the new address form (Used in Shipping2)
 * with improvements like state select
 */

import { Address } from "Components/Address/AddressForm"
import { CountrySelect } from "Components/CountrySelect"
import { Input } from "@artsy/palette"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

export const validAddress: Address = {
  name: "Joelle Van Dyne",
  addressLine1: "401 Broadway",
  addressLine2: "Suite 25",
  city: "New York",
  region: "NY",
  phoneNumber: "120938120983",
  country: "US",
  postalCode: "10013",
}

export const fillIn = (
  component: any,
  inputData: { title: string; value: string }
) => {
  const input = component
    .find(Input)
    .filterWhere(wrapper => wrapper.props().title === inputData.title)
  input.props().onChange({ currentTarget: { value: inputData.value } } as any)
}

export const fillInPhoneNumber = (
  component: any,
  inputData: { isPickup?: boolean; value: string }
) => {
  const index = inputData.isPickup ? 0 : 1
  const input = component
    .find(Input)
    .filterWhere(wrapper => wrapper.props().title === "Phone number")
    .at(index)
  input.props().onChange({ currentTarget: { value: inputData.value } } as any)
}

export const fillCountrySelect = (component, value) => {
  const input = component.find(CountrySelect)
  input.props().onSelect(value)
}

export const clickSaveAddress = async () => {
  await userEvent.click(
    screen.getByRole("checkbox", { name: /Save shipping address/ })
  )
}

export const fillAddressForm = async (address: Partial<Address>) => {
  await waitFor(() => {
    const line1Input = screen.getByPlaceholderText("Street address")
    expect(line1Input).toBeEnabled()
  })

  if (address.country) {
    const country = await screen.findByTestId(/Form_country/)
    await userEvent.selectOptions(country, [address.country])
  }

  const [
    name,
    addressLine1,
    addressLine2,
    city,
    region,
    postalCode,
    phoneNumber,
  ] = await Promise.all([
    screen.findByPlaceholderText("Full name"),
    screen.findByPlaceholderText("Street address"),
    screen.findByPlaceholderText("Apt, floor, suite, etc."),
    screen.findByPlaceholderText("City"),
    screen.findByPlaceholderText(
      address.country === "US" ? "State" : "State, province, or region"
    ),
    screen.findByPlaceholderText(
      address.country === "US" ? "ZIP code" : /ZIP\/Postal code/,
      { exact: false }
    ),
    screen
      .findAllByPlaceholderText("Add phone number including country code")
      .then(inputs => inputs[0]),
  ])

  await Promise.all([
    address.name && userEvent.paste(name, address.name),
    address.addressLine1 && userEvent.paste(addressLine1, address.addressLine1),
    address.addressLine2 && userEvent.paste(addressLine2, address.addressLine2),
    address.city && userEvent.paste(city, address.city),
    address.region && userEvent.paste(region, address.region),
    address.postalCode && userEvent.paste(postalCode, address.postalCode),
    address.phoneNumber && userEvent.paste(phoneNumber, address.phoneNumber),
  ])
}
