import { RootTestPage, expectOne } from "v2/DevTools/RootTestPage"

export class UserInformationTestPage extends RootTestPage {
  get submitButton() {
    return expectOne(
      this.find("button").filterWhere(btn =>
        btn.text().includes("Save changes")
      )
    )
  }

  get emailInput() {
    return expectOne(
      this.find("QuickInput").filterWhere(input =>
        input.props().name.includes("email")
      )
    )
  }

  get nameInput() {
    return expectOne(
      this.find("QuickInput").filterWhere(input =>
        input.props().name.includes("name")
      )
    )
  }

  get phoneInput() {
    return expectOne(
      this.find("QuickInput").filterWhere(input =>
        input.props().name.includes("phone")
      )
    )
  }

  get paddleNumberInput() {
    return expectOne(
      this.find("QuickInput").filterWhere(input =>
        input.props().name.includes("paddleNumber")
      )
    )
  }

  get passwordInput() {
    return this.find("PasswordInput").filterWhere(input =>
      input.props().name.includes("password")
    )
  }

  async clickSubmitButton() {
    this.submitButton.simulate("submit")
    await this.update()
  }

  async changeEmailInput() {
    this.emailInput.simulate("change", {
      target: { value: "new-email@email.com" },
    })
    await this.update()
  }

  async changeNameInput(value = "New name") {
    // @ts-ignore
    this.nameInput.props().onChange({ target: { id: "name", value } })
    await this.update()
  }
}
