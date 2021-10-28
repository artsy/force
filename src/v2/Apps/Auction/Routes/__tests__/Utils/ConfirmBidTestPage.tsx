import { Checkbox, Input, Select } from "@artsy/palette"

import { ValidFormValues } from "v2/Apps/Auction/Routes/__tests__/Utils/RegisterTestPage"
import { Address, AddressForm } from "v2/Components/AddressForm"
import { RootTestPage, expectOne } from "v2/DevTools/RootTestPage"
import { CountrySelect } from "v2/Components/CountrySelect"

export class ConfirmBidTestPage extends RootTestPage {
  get confirmBidButton() {
    return this.find("button").filterWhere(btn =>
      btn.text().includes("Confirm bid")
    )
  }

  get selectBidAmountInput() {
    return expectOne(this.find("select"))
  }

  get bidAmountLargeSelect() {
    return expectOne(this.find(Select))
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

  get formInputs() {
    return this.form.find(Input)
  }

  get countrySelect() {
    return this.form.find(CountrySelect)
  }

  async selectBidAmount(value: string) {
    return this.bidAmountLargeSelect.props().onSelect(value)
  }

  async fillAddressForm(address: Address) {
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
    await this.update()
  }

  async fillFormWithValidValues() {
    this.fillAddressForm(ValidFormValues)
  }

  async agreeToTerms() {
    this.agreeToTermsInput.props().onSelect(true)
    await this.update()
  }

  async submitForm() {
    this.form.simulate("submit")
    await this.update()
  }
}
