import { Address } from "Components/Address/AddressForm"
import { CountrySelect } from "Components/CountrySelect"
import { Input } from "@artsy/palette"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

export const validAddress: Address = {
  name: "Erik David",
  addressLine1: "401 Broadway",
  addressLine2: "",
  city: "New York",
  region: "NY",
  postalCode: "15601",
  phoneNumber: "5555937743",
  country: "US",
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

export const fillAddressForm = (component: any, address: Address) => {
  fillCountrySelect(component, address.country)
  fillIn(component, { title: "Full name", value: address.name })
  fillIn(component, { title: "Address line 1", value: address.addressLine1 })
  fillIn(component, {
    title: "Address line 2 (optional)",
    value: address.addressLine2,
  })
  fillIn(component, { title: "City", value: address.city })
  fillIn(component, {
    title: "State, province, or region",
    value: address.region,
  })
  fillIn(component, { title: "Postal code", value: address.postalCode })
  fillInPhoneNumber(component, {
    value: address.phoneNumber!,
  })
}

export const fillAddressFormTL = (address: Address) => {
  const name = screen.getByPlaceholderText("Full name")
  const country = screen.getByRole("combobox")
  const addressLine1 = screen.getByPlaceholderText("Street address")
  const addressLine2 = screen.getByPlaceholderText("Apt, floor, suite, etc.")
  const city = screen.getByPlaceholderText("City")
  const region = screen.getByPlaceholderText("State, province, or region")
  const postalCode = screen.getByPlaceholderText("ZIP/postal code")
  const phoneNumber = screen.getAllByPlaceholderText(
    "Add phone number including country code"
  )[0]

  userEvent.paste(name, address.name)
  userEvent.selectOptions(country, [address.country])
  userEvent.paste(addressLine1, address.addressLine1)
  userEvent.paste(addressLine2, address.addressLine2)
  userEvent.paste(city, address.city)
  userEvent.paste(region, address.region)
  userEvent.paste(postalCode, address.postalCode)
  userEvent.paste(phoneNumber, address.phoneNumber!)
}
