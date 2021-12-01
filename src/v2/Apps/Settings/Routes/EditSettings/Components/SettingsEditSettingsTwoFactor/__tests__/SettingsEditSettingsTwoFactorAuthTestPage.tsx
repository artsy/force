import { RootTestPage, expectOne } from "v2/DevTools/RootTestPage"

export class SettingsEditSettingsTwoFactorAuthTestPage extends RootTestPage {
  get appSetupButton() {
    return expectOne(
      this.find("AppSecondFactor")
        .find("Button")
        .filterWhere(btn => btn.text().includes("Set up"))
    )
  }

  get smsSetupButton() {
    return expectOne(
      this.find("SmsSecondFactor")
        .find("Button")
        .filterWhere(btn => btn.text().includes("Set up"))
    )
  }

  get backupShowButton() {
    return expectOne(
      this.find("BackupSecondFactor")
        .find("Button")
        .filterWhere(btn => btn.text().includes("Show"))
    )
  }

  get backupSetupButton() {
    return expectOne(
      this.find("BackupSecondFactor")
        .find("Button")
        .filterWhere(btn => btn.text().includes("Set up"))
    )
  }

  get backupRegenerateButton() {
    return expectOne(
      this.find("BackupSecondFactor")
        .find("Button")
        .filterWhere(btn => btn.text().includes("Regenerate"))
    )
  }

  get backupModal() {
    return expectOne(this.find("BackupSecondFactor").find("Modal"))
  }

  get backupModalDoneButton() {
    return expectOne(
      this.backupModal
        .find("Button")
        .filterWhere(btn => btn.text().includes("Done"))
    )
  }

  async clickAppSetupButton() {
    this.appSetupButton.simulate("click")
    await this.update()
  }

  async clickSmsSetupButton() {
    this.smsSetupButton.simulate("click")
    await this.update()
  }

  async clickBackupShowButton() {
    this.backupShowButton.simulate("click")
    await this.update()
  }

  async clickBackupSetupButton() {
    this.backupSetupButton.simulate("click")
    await this.update()
  }

  async clickBackupModalCloseButton() {
    this.backupModalDoneButton.simulate("click")
    await this.update()
  }

  async clickBackupRegenerateButton() {
    this.backupRegenerateButton.simulate("click")
    await this.update()
  }
}
