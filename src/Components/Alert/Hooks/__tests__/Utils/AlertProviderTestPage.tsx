import { RootTestPage } from "DevTools/RootTestPage"

export class AlertProviderTestPage extends RootTestPage {
  get createAlertButton() {
    return this.find("Button[data-testid='createAlert']")
  }

  get submitCreateAlertButton() {
    return this.find("Button[data-testid='submitCreateAlert']")
  }

  get addFilters() {
    return this.find("Clickable[data-testid='addFilters']")
  }

  get setFiltersButton() {
    return this.find("Button[data-testid='setFilters']")
  }

  async clickCreateAlertButton() {
    this.createAlertButton.simulate("click")
    await this.update()
  }

  async clickSubmitCreateAlertButton() {
    this.submitCreateAlertButton.simulate("click")
    await this.update()
  }

  async clickAddFiltersButton() {
    this.addFilters.simulate("click")
    await this.update()
  }

  async clickSetFiltersButton() {
    this.setFiltersButton.simulate("click")
    await this.update()
  }
}
