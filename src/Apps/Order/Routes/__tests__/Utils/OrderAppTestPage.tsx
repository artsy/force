/* eslint-disable jest/no-standalone-expect */
import { BorderedRadio, Button } from "@artsy/palette"
import { Stepper } from "@artsy/palette"
import { ReactWrapper } from "enzyme"
import { ArtworkSummaryItemFragmentContainer } from "Apps/Order/Components/ArtworkSummaryItem"
import { BuyerGuarantee } from "Apps/Order/Components/BuyerGuarantee"
import { ConditionsOfSaleDisclaimer } from "Apps/Order/Components/ConditionsOfSaleDisclaimer"
import { PaymentMethodSummaryItemFragmentContainer } from "Apps/Order/Components/PaymentMethodSummaryItem"
import { OfferInput } from "Apps/Order/Components/OfferInput"
import { OrderStepper } from "Apps/Order/Components/OrderStepper"
import { PriceOptions } from "Apps/Order/Components/PriceOptions"
import { ShippingArtaSummaryItemFragmentContainer } from "Apps/Order/Components/ShippingArtaSummaryItem"
import { ShippingSummaryItemFragmentContainer } from "Apps/Order/Components/ShippingSummaryItem"
import { TransactionDetailsSummaryItem } from "Apps/Order/Components/TransactionDetailsSummaryItem"
import { CountdownTimer } from "Components/CountdownTimer"
import { RootTestPage, expectOne } from "DevTools/RootTestPage"

export class OrderAppTestPage extends RootTestPage {
  /** COMPONENT SELECTORS **/
  constructor(wrapper?: ReactWrapper) {
    super(wrapper)
  }

  get orderStepper() {
    return expectOne(this.root.find(OrderStepper))
  }

  get orderStepperCurrentStep() {
    const index = this.root.find(Stepper).props().currentStepIndex
    return (this.root.find(OrderStepper).props() as any).steps[index]
  }

  get transactionSummary() {
    return expectOne(this.root.find(TransactionDetailsSummaryItem))
  }

  get artworkSummary() {
    return expectOne(this.root.find(ArtworkSummaryItemFragmentContainer))
  }

  get shippingSummary() {
    return expectOne(this.root.find(ShippingSummaryItemFragmentContainer))
  }

  get paymentSummary() {
    return expectOne(this.root.find(PaymentMethodSummaryItemFragmentContainer))
  }

  get shippingArtaSummary() {
    return expectOne(this.root.find(ShippingArtaSummaryItemFragmentContainer))
  }

  get buyerGuarantee() {
    return expectOne(this.root.find(BuyerGuarantee))
  }

  get countdownTimer() {
    return expectOne(this.root.find(CountdownTimer))
  }

  get conditionsOfSaleDisclaimer() {
    return expectOne(this.root.find(ConditionsOfSaleDisclaimer))
  }

  get modalDialog() {
    return this.root.find('[data-testid="ModalDialog"]')
  }

  get submitButton() {
    return expectOne(this.find(Button).last())
  }

  get offerInput() {
    return expectOne(this.find(OfferInput))
  }

  get priceOptions() {
    return expectOne(this.find(PriceOptions))
  }

  isLoading() {
    return this.submitButton.props().loading
  }

  /** PAGE ACTIONS **/

  async clickSubmit() {
    this.submitButton.simulate("click")
    await this.update()
  }

  async selectCustomAmount() {
    this.priceOptions.find(BorderedRadio).last().simulate("click")
    await this.update()
  }

  async selectPriceOption(option: number) {
    this.priceOptions.find(BorderedRadio).at(option).simulate("click")
    await this.update()
  }

  async selectRandomPriceOption() {
    await this.selectPriceOption(Math.floor(Math.random() * 3))
  }

  async dismissModal() {
    this.modalDialog.find("button").last().simulate("click")
    await this.update()
  }

  async selectPaymentMethod(paymentMethod: string) {
    switch (paymentMethod) {
      case "CreditCard":
        this.find("label[data-test-id='credit-card']").simulate("click")
        break
      case "WireTransfer":
        this.find("label[data-test-id='wire-transfer']").simulate("click")
        break
      case "USBankAccount":
        this.find("label[data-test-id='us-bank-account']").simulate("click")
        break
      case "SEPADebit":
        this.find("label[data-test-id='sepa-debit']").simulate("click")
        break
    }
    await this.update()
  }

  /*** COMMON ASSERTIONS ***/

  async expectNoModal() {
    expect(this.modalDialog.length).toBe(0)
  }

  async expectAndDismissDefaultErrorDialog() {
    await this.expectAndDismissErrorDialogMatching(
      "An error occurred",
      "Something went wrong. Please try again or contact orders@artsy.net."
    )
  }

  async expectAndDismissErrorDialogMatching(
    title: string,
    message: string,
    buttonText?: string
  ) {
    expect(this.modalDialog.text()).toContain(title)
    expect(this.modalDialog.text()).toContain(message)

    if (buttonText) {
      const button = this.modalDialog.find("button")
      expect(button.last().text()).toMatch(buttonText)
    }

    await this.dismissModal()

    expect(this.modalDialog.length).toBe(0)
  }

  async setOfferAmount(amount: number) {
    if (this.find(PriceOptions).length) this.selectCustomAmount()
    this.offerInput.props().onChange(amount)
    await this.update()
  }

  async expectButtonSpinnerWhenSubmitting() {
    expect(this.submitButton.props().loading).toBeFalsy()
    this.clickSubmit()
    expect(this.submitButton.props().loading).toBeTruthy()
    await this.update()
    expect(this.submitButton.props().loading).toBeFalsy()
  }
}
