/**
 * Address utilities for the new address form (Used in Shipping2)
 * with improvements like state select
 */

import { Address } from "Components/Address/utils"
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
  console.time("fillAddressForm")

  await waitFor(() => {
    const line1Input = screen.getByPlaceholderText("Add street address")
    expect(line1Input).toBeEnabled()
  })

  if (address.country) {
    console.time("selectCountry")
    const country = await screen.findByLabelText("Country")
    await userEvent.selectOptions(country, [address.country])
    console.timeEnd("selectCountry")
  }

  console.time("findInputs")
  const [
    name,
    addressLine1,
    addressLine2,
    city,
    region,
    postalCode,
    phoneNumber,
  ] = await Promise.all([
    screen.findByPlaceholderText("Add full name"),
    screen.findByPlaceholderText("Add street address"),
    screen.findByPlaceholderText("Add apartment, floor, suite, etc."),
    screen.findByPlaceholderText("Add city"),
    screen.findByPlaceholderText("Add state, region or province"),
    screen.findByPlaceholderText("Add ZIP/Postal code"),
    screen
      .findAllByPlaceholderText("Add phone number")
      .then(inputs => inputs[0]),
  ])
  console.timeEnd("findInputs")

  console.time("fillInputs")
  await Promise.all([
    address.name && userEvent.paste(name, address.name),
    address.addressLine1 && userEvent.paste(addressLine1, address.addressLine1),
    address.addressLine2 && userEvent.paste(addressLine2, address.addressLine2),
    address.city && userEvent.paste(city, address.city),
    address.region && userEvent.paste(region, address.region),
    address.postalCode && userEvent.paste(postalCode, address.postalCode),
    address.phoneNumber && userEvent.paste(phoneNumber, address.phoneNumber),
  ])
  console.timeEnd("fillInputs")

  console.timeEnd("fillAddressForm")
}
