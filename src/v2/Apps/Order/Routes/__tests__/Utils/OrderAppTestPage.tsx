import { Button } from "@artsy/palette"
import { Stepper } from "@artsy/palette"
import { ArtworkSummaryItemFragmentContainer } from "v2/Apps/Order/Components/ArtworkSummaryItem"
import { BuyerGuarantee } from "v2/Apps/Order/Components/BuyerGuarantee"
import { ConditionsOfSaleDisclaimer } from "v2/Apps/Order/Components/ConditionsOfSaleDisclaimer"
import { CreditCardSummaryItemFragmentContainer } from "v2/Apps/Order/Components/CreditCardSummaryItem"
import { OfferInput } from "v2/Apps/Order/Components/OfferInput"
import { OrderStepper } from "v2/Apps/Order/Components/OrderStepper"
import { ShippingArtaSummaryItemFragmentContainer } from "v2/Apps/Order/Components/ShippingArtaSummaryItem"
import { ShippingSummaryItemFragmentContainer } from "v2/Apps/Order/Components/ShippingSummaryItem"
import { TransactionDetailsSummaryItem } from "v2/Apps/Order/Components/TransactionDetailsSummaryItem"
import { CountdownTimer } from "v2/Components/CountdownTimer"
import { ModalButton, ModalDialog } from "v2/Components/Modal/ModalDialog"
import { RootTestPage, expectOne } from "v2/DevTools/RootTestPage"

export class OrderAppTestPage extends RootTestPage {
  /** COMPONENT SELECTORS **/

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
    return expectOne(this.root.find(CreditCardSummaryItemFragmentContainer))
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
    return expectOne(this.root.find(ModalDialog))
  }

  get submitButton() {
    return expectOne(this.find(Button).last())
  }

  get offerInput() {
    return expectOne(this.find(OfferInput))
  }

  /** PAGE ACTIONS **/

  async clickSubmit() {
    this.submitButton.simulate("click")
    await this.update()
  }

  async dismissModal() {
    this.modalDialog.find(ModalButton).last().simulate("click")
    await this.update()
  }

  /*** COMMON ASSERTIONS ***/

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
    expect(this.modalDialog.props().show).toBe(true)
    expect(this.modalDialog.text()).toContain(title)
    expect(this.modalDialog.text()).toContain(message)
    if (buttonText) {
      const button = this.modalDialog.find(ModalButton)
      expect(button.length).toBe(1)
      expect(button.text()).toMatch(buttonText)
    }

    await this.dismissModal()

    expect(this.modalDialog.props().show).toBe(false)
  }

  async setOfferAmount(amount: number) {
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
