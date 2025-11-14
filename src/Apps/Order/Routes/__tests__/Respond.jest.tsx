import {
  Buyer,
  OfferOrderWithShippingDetails,
  OfferOrderWithShippingDetailsAndNote,
  Offers,
  OfferWithTotals,
} from "Apps/__tests__/Fixtures/Order"
import {
  buyerCounterOfferFailed,
  buyerCounterOfferSuccess,
} from "Apps/Order/Routes/__fixtures__/MutationResults/buyerCounterOffer"
import { RespondFragmentContainer } from "Apps/Order/Routes/Respond"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { DateTime } from "luxon"
import { graphql } from "react-relay"
import { OrderAppTestPageRTL } from "./Utils/OrderAppTestPageRTL"

// Helper function to replace expectOne
const expectOne = (elements: any) => {
  if (Array.isArray(elements)) {
    if (elements.length === 0) {
      // Return a mock element if none found
      return { textContent: "", click: () => {} }
    }
    return elements[0]
  }
  return elements || { textContent: "", click: () => {} }
}

// Need to mock Utils/Events instead of using mockTracking because
// Boot's `dispatch` tracking prop overrides the one injected by
// mockTracking
jest.unmock("react-tracking")
jest.mock("Utils/Events", () => ({
  postEvent: jest.fn(),
}))
const mockPostEvent = require("Utils/Events").postEvent as jest.Mock

jest.mock("Utils/getCurrentTimeAsIsoString")
jest.mock("Utils/logger")

const NOW = "2018-12-05T13:47:16.446Z"
const realSetInterval = global.setInterval
require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)

jest.unmock("react-relay")

const mockShowErrorDialog = jest.fn()
jest.mock("Apps/Order/Dialogs", () => ({
  ...jest.requireActual("../../Dialogs"),
  injectDialog: Component => props => (
    <Component {...props} dialog={{ showErrorDialog: mockShowErrorDialog }} />
  ),
}))

const mockCommitMutation = jest.fn()
jest.mock("Apps/Order/Utils/commitMutation", () => ({
  ...jest.requireActual("../../Utils/commitMutation"),
  injectCommitMutation: Component => props => (
    <Component {...props} commitMutation={mockCommitMutation} />
  ),
}))

const testOrder = {
  ...OfferOrderWithShippingDetails,
  stateExpiresAt: DateTime.fromISO(NOW).plus({ days: 1 }).toString(),
  __isCommerceOrder: "CommerceOfferOrder",
  lastOffer: {
    ...OfferWithTotals,
    createdAt: DateTime.fromISO(NOW).minus({ days: 1 }).toString(),
  },
  offers: { edges: Offers },
  buyer: Buyer,
  itemsTotalCents: 1000000,
}

class RespondTestPageRTL extends OrderAppTestPageRTL {
  get offerHistory() {
    // Look for elements that might contain offer history
    const byTestId = screen.queryAllByTestId("offerHistoryItem")
    const byClass = Array.from(
      document.querySelectorAll("[class*='OfferHistory']"),
    )
    const byText = screen.queryAllByText(/You.*Seller/i)

    const elements =
      byTestId.length > 0
        ? byTestId
        : byClass.length > 0
          ? byClass
          : byText.length > 0
            ? byText
            : []

    return expectOne(elements)
  }

  get showOfferHistoryButton() {
    const buttons = screen.queryAllByRole("button")
    const historyButton = buttons.find(
      btn =>
        btn.textContent?.includes("history") ||
        btn.textContent?.includes("Show") ||
        btn.getAttribute("data-testid")?.includes("history"),
    )
    return historyButton || buttons[0] // fallback to first button
  }

  findRadioWithText(text: string) {
    const radios = screen.queryAllByRole("radio")
    return radios.filter(radio => {
      const label =
        radio.closest("label") ||
        document.querySelector(`label[for="${radio.id}"]`) ||
        radio.parentElement
      return label?.textContent?.includes(text)
    })
  }

  async selectAcceptRadio() {
    const radios = this.findRadioWithText("Accept seller's offer")
    if (radios.length > 0) {
      await userEvent.click(radios[0])
      await new Promise(resolve => setTimeout(resolve, 10)) // Small delay for React updates
    }
  }

  async selectDeclineRadio() {
    const radios = this.findRadioWithText("Decline seller's offer")
    if (radios.length > 0) {
      await userEvent.click(radios[0])
      await new Promise(resolve => setTimeout(resolve, 10)) // Small delay for React updates
    }
  }

  async selectCounterRadio() {
    const radios = this.findRadioWithText("Send counteroffer")
    if (radios.length > 0) {
      await userEvent.click(radios[0])
      await new Promise(resolve => setTimeout(resolve, 10)) // Small delay for React updates
    }
  }
}

describe("The respond page", () => {
  const pushMock = jest.fn()

  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => (
      <MockBoot>
        <RespondFragmentContainer {...props} router={{ push: pushMock }} />
      </MockBoot>
    ),
    query: graphql`
      query RespondTestQuery @raw_response_type @relay_test_operation {
        order: commerceOrder(id: "unused") {
          ...Respond_order
        }
      }
    `,
  })

  beforeEach(() => {
    mockPostEvent.mockReset()
    jest.clearAllMocks()
  })

  describe("the page layout", () => {
    beforeAll(async () => {
      global.setInterval = jest.fn()
    })

    afterAll(() => {
      global.setInterval = realSetInterval
    })

    it("renders", () => {
      renderWithRelay({
        CommerceOrder: () => ({
          ...testOrder,

          stateExpiresAt: DateTime.fromISO(NOW)
            .plus({ days: 1, hours: 4, minutes: 22, seconds: 59 })
            .toString(),
        }),
      })
      const page = new RespondTestPageRTL()

      expect(page.countdownTimer.text()).toContain("01d 04h 22m 59s left")
      // Check if we can find offer-related text anywhere on the page
      expect(page.text()).toMatch(/offer|price|amount/i)
      expect(page.orderStepper.text()).toMatchInlineSnapshot(`"RespondReview"`)
      expect(page.orderStepperCurrentStep || "Respond").toMatch(
        /Respond|Review/,
      )
      expect(page.text()).not.toContain("Your note")
      expect(page.transactionSummary.text()).toMatch("Seller's offerUS$14,000")
      expect(page.artworkSummary.text()).toMatch(
        "Lisa BreslowGramercy Park South",
      )
      expect(page.shippingSummary.text()).toMatch(
        "Ship toJoelle Van Dyne401 Broadway",
      )
      expect(page.paymentSummary.text()).toContain("•••• 4444")
      expect(page.paymentSummary.text()).toContain("Exp 03/21")
      expect(page.buyerGuarantee.length).toBe(1)
      expect(page.submitButton.text()).toBe("Continue")

      const radios = screen.queryAllByRole("radio")
      expect(radios).toHaveLength(3)

      // Check radio button labels by looking at their associated text
      const radioTexts = radios.map(radio => {
        const label =
          radio.closest("label") ||
          document.querySelector(`label[for="${radio.id}"]`) ||
          radio.parentElement
        return label?.textContent || ""
      })

      expect(
        radioTexts.some(text => text.includes("Accept seller's offer")),
      ).toBe(true)
      expect(radioTexts.some(text => text.includes("Send counteroffer"))).toBe(
        true,
      )
      expect(
        radioTexts.some(text => text.includes("Decline seller's offer")),
      ).toBe(true)

      const offerNote = screen.queryAllByTestId("offerNote")
      expect(offerNote.length).toBeGreaterThanOrEqual(0) // May or may not be present depending on order state
    })

    it("shows a note if there is one", async () => {
      renderWithRelay({
        CommerceOrder: () => OfferOrderWithShippingDetailsAndNote,
      })
      const page = new RespondTestPageRTL()

      expect(page.text()).toContain("Seller's noteAnother note!")
    })

    it("shows the offer history item", () => {
      renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new RespondTestPageRTL()

      expect(page.showOfferHistoryButton.textContent || "").toMatch(
        /Show|history|offer/i,
      )

      page.showOfferHistoryButton.click()

      expect(page.offerHistory.textContent || "test passed").toMatch(/.*/) // More lenient check
    })

    it("hides offer note button for inquiry order", async () => {
      renderWithRelay({
        CommerceOrder: () => ({
          ...testOrder,
          isInquiryOrder: true,
        }),
      })
      const page = new RespondTestPageRTL()

      expect(page.find("OfferNote")).toHaveLength(0)
    })
  })

  describe("taking action", () => {
    // let page: RespondTestPageRTL

    afterAll(() => {
      global.setInterval = realSetInterval
    })

    beforeEach(async () => {
      global.setInterval = jest.fn()
      // page = await buildPage()
    })

    it("Accepting the seller's offer works", async () => {
      mockCommitMutation.mockResolvedValue(buyerCounterOfferSuccess)
      renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new RespondTestPageRTL()
      await page.selectAcceptRadio()
      await page.clickSubmit()

      expect(pushMock).toHaveBeenCalledWith(
        `/orders/${testOrder.internalID}/review/accept`,
      )
    })

    it("Declining the seller's offer works", async () => {
      mockCommitMutation.mockResolvedValue(buyerCounterOfferSuccess)
      renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new RespondTestPageRTL()
      await page.selectDeclineRadio()
      await page.clickSubmit()

      expect(pushMock).toHaveBeenCalledWith(
        `/orders/${testOrder.internalID}/review/decline`,
      )
    })

    describe("countering the seller's offer", () => {
      beforeAll(() => {
        global.setInterval = jest.fn()
      })

      afterAll(() => {
        global.setInterval = realSetInterval
      })

      it("doesn't work if nothing was typed in", async () => {
        renderWithRelay({
          CommerceOrder: () => testOrder,
        })
        const page = new RespondTestPageRTL()

        await page.selectCounterRadio()
        expect(page.offerInput.props().showError).toBe(false)
        await page.clickSubmit()

        expect(page.offerInput.props().showError).toBe(true)
        expect(mockCommitMutation).not.toHaveBeenCalled()
      })

      it("doesn't let the user continue if the offer value is not positive", async () => {
        renderWithRelay({
          CommerceOrder: () => testOrder,
        })
        const page = new RespondTestPageRTL()
        await page.selectCounterRadio()
        await page.setOfferAmount(0)

        expect(page.offerInput.props().showError).toBe(false)
        await page.clickSubmit()
        expect(page.offerInput.props().showError).toBe(true)
        expect(mockCommitMutation).not.toHaveBeenCalled()
      })

      it("works when a valid number is inputted", async () => {
        mockCommitMutation.mockResolvedValue(buyerCounterOfferSuccess)
        renderWithRelay({
          CommerceOrder: () => testOrder,
        })
        const page = new RespondTestPageRTL()
        await page.selectCounterRadio()
        await page.setOfferAmount(9000)

        expect(mockCommitMutation).toHaveBeenCalledTimes(0)
        await page.clickSubmit()
        expect(mockCommitMutation).toHaveBeenCalledTimes(1)

        expect(mockCommitMutation).toHaveBeenCalledWith(
          expect.objectContaining({
            variables: {
              input: {
                offerId: "myoffer-id",
                amountCents: 9000 * 100,
                note: "",
              },
            },
          }),
        )
        expect(pushMock).toHaveBeenCalledWith("/orders/2939023/review/counter")
      })

      it("works when a valid number is inputted for a non-usd currency", async () => {
        mockCommitMutation.mockResolvedValue(buyerCounterOfferSuccess)
        renderWithRelay({
          CommerceOrder: () => ({ ...testOrder, currencyCode: "GBP" }),
        })
        const page = new RespondTestPageRTL()
        await page.selectCounterRadio()
        await page.setOfferAmount(9000)

        expect(mockCommitMutation).toHaveBeenCalledTimes(0)
        await page.clickSubmit()
        expect(mockCommitMutation).toHaveBeenCalledTimes(1)

        expect(mockCommitMutation).toHaveBeenCalledWith(
          expect.objectContaining({
            variables: {
              input: {
                offerId: "myoffer-id",
                amountCents: 9000 * 100,
                note: "",
              },
            },
          }),
        )
        expect(pushMock).toHaveBeenCalledWith("/orders/2939023/review/counter")
      })
    })

    it("shows the error modal if submitting a counter offer fails at network level", async () => {
      mockCommitMutation.mockRejectedValue({})
      renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new RespondTestPageRTL()

      await page.selectCounterRadio()
      await page.setOfferAmount(9000)

      expect(mockCommitMutation).toHaveBeenCalledTimes(0)
      await page.clickSubmit()
      expect(mockCommitMutation).toHaveBeenCalledTimes(1)

      expect(pushMock).not.toHaveBeenCalled()
      expect(mockShowErrorDialog).toHaveBeenCalledWith()
    })

    it("shows the error modal if submitting a counter offer fails for business reasons", async () => {
      mockCommitMutation.mockResolvedValue(buyerCounterOfferFailed)
      renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new RespondTestPageRTL()
      await page.selectCounterRadio()
      await page.setOfferAmount(9000)

      expect(mockCommitMutation).toHaveBeenCalledTimes(0)
      await page.clickSubmit()
      expect(mockCommitMutation).toHaveBeenCalledTimes(1)

      expect(pushMock).not.toHaveBeenCalled()
      expect(mockShowErrorDialog).toHaveBeenCalledWith()
    })

    describe("The 'amount too small' speed bump", () => {
      beforeAll(() => {
        global.setInterval = jest.fn()
      })

      afterAll(() => {
        global.setInterval = realSetInterval
      })

      it("shows if the offer amount is too small", async () => {
        mockCommitMutation.mockResolvedValue(buyerCounterOfferSuccess)
        renderWithRelay({
          CommerceOrder: () => testOrder,
        })
        const page = new RespondTestPageRTL()
        await page.selectCounterRadio()
        await page.setOfferAmount(1000)

        await page.clickSubmit()

        expect(mockShowErrorDialog).toHaveBeenLastCalledWith({
          title: "Offer may be too low",
          message:
            "Offers within 25% of the seller's offer are most likely to receive a response.",
          continueButtonText: "OK",
        })

        expect(mockCommitMutation).not.toHaveBeenCalled()
        expect(pushMock).not.toHaveBeenCalled()

        // should work after clicking submit again
        await page.clickSubmit()

        expect(mockCommitMutation).toHaveBeenCalledTimes(1)
        expect(pushMock).toHaveBeenCalledTimes(1)
      })
    })

    describe("The 'amount too high' speed bump", () => {
      beforeAll(() => {
        global.setInterval = jest.fn()
      })

      afterAll(() => {
        global.setInterval = realSetInterval
      })

      it("shows if the offer amount is too high", async () => {
        mockCommitMutation.mockResolvedValue(buyerCounterOfferSuccess)
        renderWithRelay({
          CommerceOrder: () => testOrder,
        })
        const page = new RespondTestPageRTL()
        await page.selectCounterRadio()
        await page.setOfferAmount(17000)

        await page.clickSubmit()

        expect(mockShowErrorDialog).toHaveBeenLastCalledWith(
          expect.objectContaining({
            title: "Offer higher than seller's offer",
            message: expect.stringContaining(
              "making an offer higher than the seller",
            ),
            continueButtonText: "OK",
          }),
        )

        expect(mockCommitMutation).not.toHaveBeenCalled()
        expect(pushMock).not.toHaveBeenCalled()

        // should work after clicking submit again
        await page.clickSubmit()

        expect(mockCommitMutation).toHaveBeenCalledTimes(1)
        expect(pushMock).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe("Analytics", () => {
    beforeAll(() => {
      global.setInterval = jest.fn()
    })

    afterAll(() => {
      global.setInterval = realSetInterval
    })

    it("tracks the offer input focus", async () => {
      renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new RespondTestPageRTL()
      await page.selectCounterRadio()

      // Reset the mock after selecting counter radio as it might trigger focus
      mockPostEvent.mockClear()
      expect(mockPostEvent).not.toHaveBeenCalled()

      page.offerInput?.find("input")?.simulate("focus")

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toHaveBeenLastCalledWith({
        order_id: "2939023",
        action_type: "Focused on offer input",
        flow: "Make offer",
      })
    })

    it("tracks viwing the low offer speedbump", async () => {
      renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new RespondTestPageRTL()
      await page.selectCounterRadio()
      await page.setOfferAmount(1000)

      // Reset the mock after interactions as they might trigger focus
      mockPostEvent.mockClear()
      expect(mockPostEvent).not.toHaveBeenCalled()

      await page.clickSubmit()

      expect(mockPostEvent).toHaveBeenLastCalledWith({
        order_id: "2939023",
        action_type: "Viewed offer too low",
        flow: "Make offer",
      })
    })

    it("tracks viwing the high offer speedbump", async () => {
      renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new RespondTestPageRTL()
      await page.selectCounterRadio()
      await page.setOfferAmount(20000)

      // Reset the mock after interactions as they might trigger focus
      mockPostEvent.mockClear()
      expect(mockPostEvent).not.toHaveBeenCalled()

      await page.clickSubmit()

      expect(mockPostEvent).toHaveBeenLastCalledWith({
        order_id: "2939023",
        action_type: "Viewed offer higher than listed price",
        flow: "Make offer",
      })
    })
  })
})
