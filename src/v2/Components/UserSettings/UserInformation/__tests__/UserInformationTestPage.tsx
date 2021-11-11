import { RootTestPage } from "v2/DevTools/RootTestPage"

export class UserInformationTestPage extends RootTestPage {
  async clickSubmitButton() {
    this.find("button[type='submit']").simulate("submit")
    await this.update()
  }

  async changeEmailInput() {
    const input = this.find("QuickInput input[name='email']")
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    input.props().onChange({
      // @ts-ignore
      currentTarget: { id: "email", value: "new-email@email.com" },
    })
    input.simulate("blur")
    await this.update()
  }

  async changeNameInput(value = "New name") {
    const input = this.find("QuickInput input[name='name']")
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    input.props().onChange({
      // @ts-ignore
      currentTarget: { id: "name", value },
    })
    input.simulate("blur")
    await this.update()
  }
}
