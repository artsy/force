import { Checkbox } from "@artsy/palette"
import { Address, AddressForm } from "v2/Components/AddressForm"
import { RootTestPage, expectOne } from "v2/DevTools/RootTestPage"

export const ValidFormValues = {
  addressLine1: "123 Example Street",
  addressLine2: "Apt 1",
  city: "New York",
  country: "United States",
  name: "Example Name",
  phoneNumber: "+1 555 212 7878",
  postalCode: "10012",
  region: "NY",
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
  get addressInput() {
    return expectOne(this.form.find(AddressForm))
  }
  get agreeToTermsInput() {
    return expectOne(this.form.find(Checkbox))
  }
  async fillAddressForm(address: Address) {
    this.addressInput.props().onChange(address, "city")
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
