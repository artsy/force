import { Checkbox, Input } from "@artsy/palette"
import { Address } from "v2/Components/AddressForm"
import { CountrySelect } from "v2/Components/CountrySelect"
import { RootTestPage, expectOne } from "v2/DevTools/RootTestPage"

export const ValidFormValues = {
  name: "Example Name",
  addressLine1: "123 Example Street",
  addressLine2: "Apt 1",
  country: "United States",
  city: "New York",
  region: "NY",
  postalCode: "10012",
  phoneNumber: "+1 555 212 7878",
}

export class RegisterTestPage extends RootTestPage {
  get registerButton() {
    return this.find("button").filterWhere(btn =>
      btn.text().includes("Register")
    )
  }

  get form() {
    return expectOne(this.find("form"))
  }

  get countrySelect() {
    return this.form.find(CountrySelect)
  }

  get formInputs() {
    return this.form.find(Input)
  }

  get agreeToTermsInput() {
    return expectOne(this.form.find(Checkbox))
  }

  fillAddressForm(address: Address) {
    ;[
      { name: "address.name", title: "Name on card", value: address.name },
      {
        name: "address.postalCode",
        title: "Postal code",
        value: address.postalCode,
      },
      {
        name: "address.addressLine1",
        title: "Address line 1",
        value: address.addressLine1,
      },
      {
        name: "address.addressLine2",
        title: "Address line 2 (optional)",
        value: address.addressLine2,
      },
      { name: "address.city", title: "City", value: address.city },
      {
        name: "address.region",
        title: "State, province, or region",
        value: address.region,
      },
      {
        name: "address.phoneNumber",
        title: "Phone number",
        value: address.phoneNumber,
      },
    ].map(({ name, title, value }) => {
      const input = this.formInputs.filterWhere(
        input => input.props().title === title
      )
      input.props().onChange({ target: { name, value } })
    })
    this.countrySelect.props().onSelect?.(address.country)
  }

  async fillFormWithValidValues() {
    this.fillAddressForm(ValidFormValues)
    this.agreeToTermsInput.props().onSelect(true)
    await this.update()
  }

  async submitForm() {
    this.form.simulate("submit")
    await this.update()
  }
}
