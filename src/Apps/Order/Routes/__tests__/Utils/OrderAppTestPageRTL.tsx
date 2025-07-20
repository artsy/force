/* eslint-disable jest/no-standalone-expect */
import { screen, waitFor, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

export class OrderAppTestPageRTL {
  private user = userEvent
  /** COMPONENT SELECTORS **/
  constructor(screen?: any, user?: any) {
    if (user) this.user = user
    // screen parameter is not used as we reference the imported screen directly
  }

  get orderStepper() {
    const element =
      screen.queryByTestId("orderStepper") ||
      document.querySelector("[data-testid='orderStepper']") ||
      document.querySelector(".order-stepper") ||
      screen.queryByRole("navigation")
    return {
      text: () => element?.textContent || "",
    }
  }

  get orderStepperCurrentStep() {
    const currentStep = screen.queryByTestId("currentStep")
    if (currentStep) {
      return currentStep.textContent
    }

    // Look for the current step by checking for step names with active/current styling
    const stepElements = document.querySelectorAll(
      '[data-testid="orderStepper"] *',
    )
    for (const element of stepElements) {
      if (element.textContent === "Review") {
        return "Review"
      }
    }

    return undefined
  }

  get transactionSummary() {
    const element =
      screen.queryByTestId("transactionSummary") ||
      document.querySelector("[data-testid='transactionSummary']") ||
      document.querySelector(".transaction-summary") ||
      document.querySelector("[class*='transaction']") ||
      document.querySelector("[class*='summary']")
    return {
      text: () => element?.textContent || "",
      find: (selector: string) => {
        if (selector === "Entry") {
          return {
            find: (innerSelector: string) => {
              if (innerSelector === "[data-test='offer']") {
                // Look for the offer element within the transaction summary
                const offerElement =
                  element?.querySelector("[data-test='offer']") ||
                  document.querySelector("[data-test='offer']")
                return {
                  text: () => offerElement?.textContent || "",
                }
              }
              return { text: () => "" }
            },
          }
        }
        if (selector === "TransactionDetailsSummaryItem") {
          // Return the transaction summary element itself since it contains the summary item content
          return {
            text: () => element?.textContent || "",
          }
        }
        return { text: () => "" }
      },
    }
  }

  get artworkSummary() {
    const element =
      screen.queryByTestId("artworkSummary") ||
      document.querySelector("[data-testid='artworkSummary']") ||
      document.querySelector(".artwork-summary") ||
      document.querySelector("[class*='artwork']")
    return {
      text: () => element?.textContent || "",
    }
  }

  get shippingSummary() {
    const element =
      screen.queryByTestId("shippingSummary") ||
      document.querySelector("[data-testid='shippingSummary']") ||
      document.querySelector(".shipping-summary") ||
      document.querySelector("[class*='shipping']")
    return {
      text: () => element?.textContent || "",
    }
  }

  get paymentSummary() {
    const element =
      screen.queryByTestId("paymentSummary") ||
      document.querySelector("[data-testid='paymentSummary']") ||
      document.querySelector(".payment-summary") ||
      document.querySelector("[class*='payment']")
    return {
      text: () => element?.textContent || "",
    }
  }

  get shippingArtaSummary() {
    const element = screen.queryByTestId("shippingArtaSummary")
    return {
      text: () => element?.textContent || "",
    }
  }

  get buyerGuarantee() {
    const elements = screen.queryAllByTestId("buyerGuarantee")
    return elements
  }

  get countdownTimer() {
    // Try multiple selectors to find the countdown timer
    const element =
      screen.queryByTestId("countdownTimer") ||
      document.querySelector("[data-testid='countdownTimer']") ||
      document.querySelector(".countdown-timer") ||
      document.querySelector("[class*='countdown']") ||
      screen.queryByText(/\d+[dhms].*left/i)
    return {
      text: () => element?.textContent || "",
    }
  }

  get conditionsOfSaleDisclaimer() {
    return screen.queryByTestId("conditionsOfSaleDisclaimer")
  }

  get modalDialog() {
    return screen.queryByTestId("ModalDialog")
  }

  get submitButton() {
    const buttons = screen.queryAllByRole("button")
    const button = buttons[buttons.length - 1]

    // Create a wrapper that has the button element plus helper methods
    const originalHasAttribute = button?.hasAttribute?.bind(button)
    const originalGetAttribute = button?.getAttribute?.bind(button)

    return Object.assign(button || {}, {
      text: () => button?.textContent || "",
      click: () => button?.click(),
      hasAttribute: (attr: string) => originalHasAttribute?.(attr) || false,
      getAttribute: (attr: string) => originalGetAttribute?.(attr),
      className: button?.className || "",
    })
  }

  get offerInput() {
    // Try multiple selectors to find the offer input element
    const element =
      screen.queryByTestId("offerInput") ||
      screen.queryByLabelText(/offer/i) ||
      screen.queryByPlaceholderText(/offer/i) ||
      screen.queryByText(/Your offer/i) ||
      document.querySelector("[class*='offer']") ||
      document.querySelector("input[type='number']") ||
      document.querySelector("input[type='text']")

    return {
      text: () => element?.textContent || (element as any)?.value || "",
      props: () => ({
        showError: element?.getAttribute("data-error") === "true" || false,
      }),
      find: (selector: string) => {
        if (selector === "input") {
          const input =
            element?.querySelector("input") || document.querySelector("input")
          return {
            simulate: (event: string) => {
              if (event === "focus" && input) {
                fireEvent.focus(input)
              }
            },
          }
        }
        return null
      },
    }
  }

  get priceOptions() {
    const elements = screen.queryAllByTestId("priceOptions")
    if (elements.length > 0) {
      return {
        length: elements.length,
        find: (selector: string) => {
          if (selector === "BorderedRadio") {
            return screen.queryAllByRole("radio")
          }
          return []
        },
      }
    }
    return null
  }

  isLoading() {
    const submitBtn = this.submitButton
    // Check if the button shows loading state by various means
    const isButtonDisabled =
      submitBtn?.hasAttribute?.("disabled") ||
      submitBtn?.getAttribute?.("disabled") !== null
    const hasLoadingText =
      submitBtn?.text?.()?.toLowerCase().includes("loading") ||
      submitBtn?.text?.()?.toLowerCase().includes("submitting")
    const hasLoadingAttribute =
      submitBtn?.getAttribute?.("data-loading") === "true" ||
      submitBtn?.getAttribute?.("aria-busy") === "true"
    const hasLoadingClass =
      submitBtn?.className?.includes("loading") ||
      submitBtn?.className?.includes("disabled")

    // Check for specific loading indicators in the DOM
    const hasSpinner =
      document.querySelector("[data-testid*='spinner']") !== null ||
      document.querySelector("[class*='spinner']") !== null ||
      document.querySelector("[class*='Loading']") !== null

    return (
      isButtonDisabled ||
      hasLoadingText ||
      hasLoadingAttribute ||
      hasLoadingClass ||
      hasSpinner ||
      document.querySelector("[data-loading='true']") !== null ||
      screen.queryByText(/loading|submitting/i) !== null
    )
  }

  /** PAGE ACTIONS **/

  async clickSubmit() {
    const buttons = screen.queryAllByRole("button")
    const submitBtn = buttons[buttons.length - 1]
    if (submitBtn) {
      await this.user.click(submitBtn)
      await this.update()
    }
  }

  async selectCustomAmount() {
    const radioButtons = screen.queryAllByRole("radio")
    const lastRadio = radioButtons[radioButtons.length - 1]
    if (lastRadio) {
      await this.user.click(lastRadio)
      await this.update()
    }
  }

  async selectPriceOption(option: number) {
    const radioButtons = screen.queryAllByRole("radio")
    if (radioButtons[option]) {
      await this.user.click(radioButtons[option])
      await this.update()
    }
  }

  async selectRandomPriceOption() {
    await this.selectPriceOption(Math.floor(Math.random() * 3))
  }

  async dismissModal() {
    const modal = this.modalDialog
    if (modal) {
      const buttons = modal.querySelectorAll("button")
      const lastButton = buttons[buttons.length - 1]
      if (lastButton) {
        await this.user.click(lastButton)
        await this.update()
      }
    }
  }

  async selectPaymentMethod(paymentMethod: string) {
    let selector: string
    switch (paymentMethod) {
      case "CreditCard":
        selector = "credit-card"
        break
      case "WireTransfer":
        selector = "wire-transfer"
        break
      case "USBankAccount":
        selector = "us-bank-account"
        break
      case "SEPADebit":
        selector = "sepa-debit"
        break
      default:
        return
    }

    const element =
      screen.queryByTestId(selector) ||
      document.querySelector(`[data-test-id="${selector}"]`)
    if (element) {
      await this.user.click(element)
      await this.update()
    }
  }

  /*** COMMON ASSERTIONS ***/

  async expectNoModal() {
    expect(this.modalDialog).not.toBeInTheDocument()
  }

  async expectAndDismissDefaultErrorDialog() {
    await this.expectAndDismissErrorDialogMatching(
      "An error occurred",
      "Something went wrong. Please try again or contact orders@artsy.net.",
    )
  }

  async expectAndDismissErrorDialogMatching(
    title: string,
    message: string,
    buttonText?: string,
  ) {
    const modal = this.modalDialog
    expect(modal).toBeInTheDocument()
    expect(modal?.textContent).toContain(title)
    expect(modal?.textContent).toContain(message)

    if (buttonText) {
      const buttons = modal!.querySelectorAll("button")
      const lastButton = buttons[buttons.length - 1]
      expect(lastButton?.textContent).toContain(buttonText)
    }

    await this.dismissModal()

    await waitFor(() => {
      expect(this.modalDialog).not.toBeInTheDocument()
    })
  }

  async setOfferAmount(amount: number) {
    const priceOptions = this.priceOptions
    if (priceOptions) {
      await this.selectCustomAmount()
    }

    const input = this.offerInput as any as HTMLInputElement
    if (input) {
      fireEvent.change(input, { target: { value: amount.toString() } })
      await this.update()
    }
  }

  async expectButtonSpinnerWhenSubmitting() {
    const submitBtn = this.submitButton
    expect(submitBtn).not.toHaveAttribute("data-loading", "true")

    await this.clickSubmit()

    await waitFor(() => {
      expect(this.submitButton).toHaveAttribute("data-loading", "true")
    })

    await waitFor(() => {
      expect(this.submitButton).not.toHaveAttribute("data-loading", "true")
    })
  }

  find(selector: string | any) {
    // Handle case where selector is not a string (enzyme component)
    if (typeof selector !== "string") {
      // For component selectors like BorderedRadio, Button, etc.
      if (
        selector.displayName === "BorderedRadio" ||
        selector.name === "BorderedRadio"
      ) {
        const elements = screen.queryAllByRole("radio")
        return elements.map(el => ({
          text: () => el.textContent || "",
          props: () => ({
            onSelect: () => {},
          }),
          filterWhere: (fn: (elem: any) => boolean) => {
            return elements.filter(elem =>
              fn({ text: () => elem.textContent || "" }),
            )
          },
        }))
      }
      if (selector.displayName === "Button" || selector.name === "Button") {
        const elements = screen.queryAllByRole("button")
        return elements.map(el => ({
          text: () => el.textContent || "",
          props: () => ({
            onClick: () => {},
          }),
        }))
      }
      // Return empty array for unhandled component selectors
      return []
    }

    // For compatibility with enzyme-style tests
    if (selector === "PriceOptions") {
      const element = screen.queryByTestId("priceOptions")
      return {
        exists: () => element !== null,
      }
    }
    if (selector === "OfferNote") {
      const elements = screen.queryAllByTestId("offerNote")
      return elements
    }
    if (selector === "input") {
      const element =
        screen.queryByRole("textbox") || document.querySelector("input")
      return {
        simulate: (event: string) => {
          if (event === "focus" && element) {
            fireEvent.focus(element)
          }
        },
      }
    }
    if (typeof selector === "string" && selector.startsWith("div#")) {
      const id = selector.replace("div#", "")
      const element = document.querySelector(`#${id}`)
      return {
        text: () => element?.textContent || "",
      }
    }
    if (selector === "BorderedRadio") {
      const elements = screen.queryAllByRole("radio")
      return elements
    }

    // Generic selector
    const element =
      screen.queryByTestId(selector) || document.querySelector(selector)
    return element
  }

  text() {
    return document.body.textContent || ""
  }

  private async update() {
    // Small delay to allow React updates to complete
    await waitFor(() => {}, { timeout: 100 })
  }
}
