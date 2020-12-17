import { Address } from "v2/Components/AddressForm"
import { CountrySelect } from "v2/Components/CountrySelect"
import Input from "v2/Components/Input"

export const validAddress: Address = {
  addressLine1: "14 Gower's Walk",
  addressLine2: "Suite 2.5, The Loom",
  city: "Whitechapel",
  country: "UK",
  name: "Artsy UK Ltd",
  phoneNumber: "8475937743",
  postalCode: "E1 8PY",
  region: "London",
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
