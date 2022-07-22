import { Button } from "@artsy/palette"
import { RootTestPage } from "DevTools/RootTestPage"

export class RequestConditionReportTestPage extends RootTestPage {
  get requestButton() {
    return this.find("button").filterWhere(btn =>
      btn.text().includes("Request condition report")
    )
  }
  get loginButton() {
    return this.find(Button).filterWhere(btn => btn.text().includes("Log in"))
  }

  async clickRequestConditionReportButton() {
    this.requestButton.simulate("click")
    await this.update()
  }

  async clickLogInButton() {
    this.loginButton.simulate("click")
    await this.update()
  }
}
