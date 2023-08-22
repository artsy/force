import { screen, fireEvent } from "@testing-library/react"
import { Address } from "Components/AddressForm"
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

export const fireChangeEvent = (input: HTMLElement, value: string) => {
  fireEvent.change(input, {
    target: { value: value },
  })
}

export const fillAddressFields = (address: Address = validAddress) => {
  fireChangeEvent(screen.getByPlaceholderText("Full name"), address.name)
  fireChangeEvent(screen.getByLabelText("Country"), address.country || "US")

  fireChangeEvent(
    screen.getByPlaceholderText("Street address"),
    address.addressLine1 || ""
  )
  fireChangeEvent(
    screen.getByPlaceholderText("Apt, floor, suite, etc."),
    address.addressLine2 || ""
  )

  fireChangeEvent(screen.getByPlaceholderText("City"), "New York")
  fireChangeEvent(
    screen.getByPlaceholderText("ZIP/postal code"),
    address.postalCode || ""
  )
  fireChangeEvent(
    screen.getByPlaceholderText("State, province, or region"),
    address.region || ""
  )

  fireChangeEvent(
    screen.getAllByPlaceholderText(
      "Add phone number including country code"
    )[0],
    address.phoneNumber || ""
  )
}

// export const fillInPhoneNumber = (
//   component: any,
//   inputData: { isPickup?: boolean; value: string }
// ) => {
//   const index = inputData.isPickup ? 0 : 1
//   const input = component
//     .find(Input)
//     .filterWhere(wrapper => wrapper.props().title === "Phone number")
//     .at(index)
//   input.props().onChange({ currentTarget: { value: inputData.value } } as any)
// }

// export const fillCountrySelect = (component, value) => {
//   const input = component.find(CountrySelect)
//   input.props().onSelect(value)
// }

// export const fillAddressForm = (component: any, address: Address) => {
//   fillCountrySelect(component, address.country)
//   fillIn(component, { title: "Full name", value: address.name })
//   fillIn(component, { title: "Address line 1", value: address.addressLine1 })
//   fillIn(component, {
//     title: "Address line 2 (optional)",
//     value: address.addressLine2,
//   })
//   fillIn(component, { title: "City", value: address.city })
//   fillIn(component, {
//     title: "State, province, or region",
//     value: address.region,
//   })
//   fillIn(component, { title: "Postal code", value: address.postalCode })
//   fillInPhoneNumber(component, {
//     value: address.phoneNumber!,
//   })
// }
