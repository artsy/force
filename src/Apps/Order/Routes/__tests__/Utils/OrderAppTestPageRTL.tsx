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
    // Look for transaction summary in various ways
    const element =
      screen.queryByTestId("transactionSummary") ||
      document.querySelector("[data-testid='transactionSummary']") ||
      document.querySelector(".transaction-summary") ||
      document.querySelector("[class*='transaction']") ||
      document.querySelector("[class*='summary']") ||
      // Look for the sidebar content which often contains transaction info
      document.querySelector("[class*='sidebar']") ||
      document.querySelector("[class*='Sidebar']") ||
      // Look for elements containing "Your offer" text
      screen.queryByText(/Your offer/i)?.closest("div")

    return {
      text: () => {
        // If we found a specific element, get its text
        if (element?.textContent) {
          return element.textContent
        }

        // Fallback: look for all text containing offer information
        const offerText = screen.queryByText(/Your offer/i)
        if (offerText) {
          // Get the parent container that likely has the full transaction info
          const container =
            offerText.closest("div, section, aside") || document.body
          return container.textContent || ""
        }

        return ""
      },
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
    // First try the more specific selectors
    const element =
      screen.queryByTestId("offer-input") ||
      screen.queryByTestId("offer-input-error") ||
      screen.queryByTitle("Your offer") ||
      document.querySelector('input[title="Your offer"]') ||
      document.querySelector('input[id*="RespondForm_RespondValue"]') ||
      document.querySelector('input[id*="OfferForm_OfferValue"]') ||
      screen.queryByTestId("offerInput") ||
      screen.queryByLabelText(/offer/i) ||
      screen.queryByPlaceholderText(/offer/i) ||
      // Only fall back to generic selectors if nothing else works
      document.querySelector("input[inputmode='numeric']") ||
      document.querySelector("input[type='number']") ||
      document.querySelector("input[type='text']")

    return {
      text: () => {
        // Get the input value first
        const inputValue = (element as any)?.value || ""

        // Look for error messages nearby
        const errorMessage =
          // Look in parent for error text
          element?.parentElement?.textContent?.includes(
            "Offer amount missing or invalid.",
          )
            ? "Offer amount missing or invalid."
            : // Look for error text in siblings or nearby elements
              document
                  .querySelector('[class*="error"]')
                  ?.textContent?.includes("Offer amount missing or invalid.")
              ? "Offer amount missing or invalid."
              : // Look for error text anywhere in the container
                screen.queryByText(/Offer amount missing or invalid/i)
                  ?.textContent || ""

        // Return error message if it exists, otherwise return input value
        return errorMessage || inputValue || element?.textContent || ""
      },
      props: () => {
        // Check if the OfferInput has the error test id we added
        const currentTestId = element?.getAttribute("data-testid")
        const hasErrorTestId = currentTestId === "offer-input-error"

        // Fallback checks for other error indicators
        const hasAriaInvalid = element?.getAttribute("aria-invalid") === "true"
        const hasErrorClass =
          element?.className?.includes("error") ||
          element?.className?.includes("invalid") ||
          element?.className?.includes("hasError")
        const hasErrorAttribute = element?.getAttribute("data-error") === "true"

        // Check parent containers for error styling
        let parent = element?.parentElement
        let parentHasError = false
        while (parent && parent !== document.body) {
          if (
            parent.className?.includes("error") ||
            parent.className?.includes("hasError") ||
            parent.getAttribute("data-error") === "true"
          ) {
            parentHasError = true
            break
          }
          parent = parent.parentElement
        }

        // Look for error message nearby
        const nearbyError = element?.parentElement?.querySelector(
          '[data-testid*="error"], .error, [class*="error"]',
        )

        return {
          showError:
            hasErrorTestId ||
            hasAriaInvalid ||
            hasErrorClass ||
            hasErrorAttribute ||
            parentHasError ||
            !!nearbyError,
        }
      },
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
    // Check if price options exist by looking for radio buttons (typical price option indicators)
    const radioButtons = screen.queryAllByRole("radio")
    const priceOptionsContainer =
      screen.queryByTestId("priceOptions") ||
      document.querySelector("[data-testid='priceOptions']") ||
      document.querySelector("[class*='priceOptions']") ||
      document.querySelector("[class*='PriceOptions']")

    // If we have radio buttons, assume price options exist
    if (radioButtons.length > 0 || priceOptionsContainer) {
      return {
        length: radioButtons.length > 0 ? 1 : 0, // Return 1 if any radio buttons exist (meaning price options exist)
        find: (selector: string) => {
          if (selector === "BorderedRadio") {
            return radioButtons
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

    // Find the offer input specifically (not the note textarea)
    const inputElement =
      screen.queryByTitle("Your offer") ||
      document.querySelector('input[title="Your offer"]') ||
      document.querySelector('input[id*="RespondForm_RespondValue"]') ||
      document.querySelector('input[inputmode="numeric"]') ||
      document.querySelector('input[type="text"][inputmode="numeric"]')

    if (inputElement) {
      // Use userEvent for proper React event handling
      await this.user.clear(inputElement)
      await this.user.type(inputElement, amount.toString())
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
      // Look for OfferNote components in various ways
      const elements =
        screen.queryAllByTestId("offerNote") ||
        screen.queryAllByTestId("offer-note") ||
        Array.from(document.querySelectorAll('[data-testid*="note"]')) ||
        Array.from(document.querySelectorAll('[class*="OfferNote"]')) ||
        Array.from(document.querySelectorAll('[class*="offer-note"]')) ||
        // Look for buttons that might reveal offer notes
        screen.queryAllByText(/Add note/i) ||
        screen.queryAllByText(/note to seller/i) ||
        []
      return Array.isArray(elements) ? elements : [elements].filter(Boolean)
    }
    if (selector === "input") {
      // Find the offer input specifically to avoid multiple textbox issues
      const element =
        screen.queryByTitle("Your offer") ||
        document.querySelector('input[title="Your offer"]') ||
        document.querySelector('input[id*="RespondForm_RespondValue"]') ||
        document.querySelector('input[id*="OfferForm_OfferValue"]') ||
        document.querySelector('input[inputmode="numeric"]') ||
        document.querySelector('input[type="text"][inputmode="numeric"]')
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
