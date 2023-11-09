import { BorderedRadio, Button } from "@artsy/palette"
import {
  Buyer,
  OfferOrderWithShippingDetails,
  OfferOrderWithShippingDetailsAndNote,
  OfferWithTotals,
  Offers,
} from "Apps/__tests__/Fixtures/Order"
import { OfferHistoryItemFragmentContainer } from "Apps/Order/Components/OfferHistoryItem"
import { DateTime } from "luxon"
import { RespondFragmentContainer } from "Apps/Order/Routes/Respond"
import { expectOne } from "DevTools/RootTestPage"
import { graphql } from "react-relay"
import {
  buyerCounterOfferFailed,
  buyerCounterOfferSuccess,
} from "Apps/Order/Routes/__fixtures__/MutationResults/buyerCounterOffer"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapper } from "DevTools/setupTestWrapper"

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

class RespondTestPage extends OrderAppTestPage {
  get offerHistory() {
    return expectOne(this.find(OfferHistoryItemFragmentContainer))
  }

  get showOfferHistoryButton() {
    return expectOne(this.offerHistory.find(Button))
  }

  findRadioWithText(text: string) {
    return this.find(BorderedRadio).filterWhere(elem => {
      return elem.text().includes(text)
    })
  }

  async selectAcceptRadio() {
    const radio = this.findRadioWithText("Accept seller's offer")
    radio.props().onSelect?.({ selected: true, value: "ACCEPT" })
    await this.update()
  }

  async selectDeclineRadio() {
    const radio = this.findRadioWithText("Decline seller's offer")
    radio.props().onSelect?.({ selected: true, value: "DECLINE" })
    await this.update()
  }

  async selectCounterRadio() {
    const radio = this.findRadioWithText("Send counteroffer")
    radio.props().onSelect?.({ selected: true, value: "COUNTER" })
    await this.update()
  }
}

describe("The respond page", () => {
  const pushMock = jest.fn()

  const { getWrapper } = setupTestWrapper({
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
      const { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...testOrder,

          stateExpiresAt: DateTime.fromISO(NOW)
            .plus({ days: 1, hours: 4, minutes: 22, seconds: 59 })
            .toString(),
        }),
      })
      const page = new RespondTestPage(wrapper)

      expect(page.countdownTimer.text()).toContain("01d 04h 22m 59s left")
      expect(page.offerInput.text()).toContain("Your offer")
      expect(page.orderStepper.text()).toMatchInlineSnapshot(`"RespondReview"`)
      expect(page.orderStepperCurrentStep).toBe("Respond")
      expect(page.text()).not.toContain("Your note")
      expect(page.transactionSummary.text()).toMatch("Seller's offerUS$14,000")
      expect(page.artworkSummary.text()).toMatch(
        "Lisa BreslowGramercy Park South"
      )
      expect(page.shippingSummary.text()).toMatch(
        "Ship toJoelle Van Dyne401 Broadway"
      )
      expect(page.paymentSummary.text()).toMatchInlineSnapshot(
        `"•••• 4444   Exp 03/21"`
      )
      expect(page.buyerGuarantee.length).toBe(1)
      expect(page.submitButton.text()).toBe("Continue")

      const radios = page.find(BorderedRadio)
      expect(radios).toHaveLength(3)

      expect(radios.first().text()).toMatch("Accept seller's offer")
      expect(radios.at(1).text()).toMatch("Send counteroffer")
      expect(radios.at(2).text()).toMatch("Decline seller's offer")

      const offerNote = page.find("OfferNote")
      expect(offerNote).toHaveLength(1)
    })

    it("shows a note if there is one", async () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => OfferOrderWithShippingDetailsAndNote,
      })
      const page = new RespondTestPage(wrapper)

      expect(page.text()).toContain("Seller's noteAnother note!")
    })

    it("shows the offer history item", () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new RespondTestPage(wrapper)

      expect(page.showOfferHistoryButton.text()).toMatch("Show offer history")

      page.showOfferHistoryButton.props().onClick({})

      expect(page.offerHistory.text()).toMatch(
        "You (May 21)US$1,200.00Seller (Apr 30)US$1,500.00You (Apr 5)US$1,100.00"
      )
    })

    it("hides offer note button for inquiry order", async () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...testOrder,
          isInquiryOrder: true,
        }),
      })
      const page = new RespondTestPage(wrapper)

      expect(page.find("OfferNote")).toHaveLength(0)
    })
  })

  describe("taking action", () => {
    // let page: RespondTestPage

    afterAll(() => {
      global.setInterval = realSetInterval
    })

    beforeEach(async () => {
      global.setInterval = jest.fn()
      // page = await buildPage()
    })

    it("Accepting the seller's offer works", async () => {
      mockCommitMutation.mockResolvedValue(buyerCounterOfferSuccess)
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new RespondTestPage(wrapper)
      await page.selectAcceptRadio()
      await page.clickSubmit()

      expect(pushMock).toHaveBeenCalledWith(
        `/orders/${testOrder.internalID}/review/accept`
      )
    })

    it("Declining the seller's offer works", async () => {
      mockCommitMutation.mockResolvedValue(buyerCounterOfferSuccess)
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new RespondTestPage(wrapper)
      await page.selectDeclineRadio()
      await page.clickSubmit()

      expect(pushMock).toHaveBeenCalledWith(
        `/orders/${testOrder.internalID}/review/decline`
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
        const { wrapper } = getWrapper({
          CommerceOrder: () => testOrder,
        })
        const page = new RespondTestPage(wrapper)

        await page.selectCounterRadio()
        expect(page.offerInput.props().showError).toBe(false)
        await page.clickSubmit()

        expect(page.offerInput.props().showError).toBe(true)
        expect(mockCommitMutation).not.toHaveBeenCalled()
      })

      it("doesn't let the user continue if the offer value is not positive", async () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => testOrder,
        })
        const page = new RespondTestPage(wrapper)
        await page.selectCounterRadio()
        await page.setOfferAmount(0)

        expect(page.offerInput.props().showError).toBe(false)
        await page.clickSubmit()
        expect(page.offerInput.props().showError).toBe(true)
        expect(mockCommitMutation).not.toHaveBeenCalled()
      })

      it("works when a valid number is inputted", async () => {
        mockCommitMutation.mockResolvedValue(buyerCounterOfferSuccess)
        const { wrapper } = getWrapper({
          CommerceOrder: () => testOrder,
        })
        const page = new RespondTestPage(wrapper)
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
          })
        )
        expect(pushMock).toHaveBeenCalledWith("/orders/2939023/review/counter")
      })

      it("works when a valid number is inputted for a non-usd currency", async () => {
        mockCommitMutation.mockResolvedValue(buyerCounterOfferSuccess)
        const { wrapper } = getWrapper({
          CommerceOrder: () => ({ ...testOrder, currencyCode: "GBP" }),
        })
        const page = new RespondTestPage(wrapper)
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
          })
        )
        expect(pushMock).toHaveBeenCalledWith("/orders/2939023/review/counter")
      })
    })

    it("shows the error modal if submitting a counter offer fails at network level", async () => {
      mockCommitMutation.mockRejectedValue({})
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new RespondTestPage(wrapper)

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
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new RespondTestPage(wrapper)
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
        const { wrapper } = getWrapper({
          CommerceOrder: () => testOrder,
        })
        const page = new RespondTestPage(wrapper)
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
        const { wrapper } = getWrapper({
          CommerceOrder: () => testOrder,
        })
        const page = new RespondTestPage(wrapper)
        await page.selectCounterRadio()
        await page.setOfferAmount(17000)

        await page.clickSubmit()

        expect(mockShowErrorDialog).toHaveBeenLastCalledWith({
          title: "Offer higher than seller's offer",
          message: "You’re making an offer higher than the seller's offer.",
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
  })

  describe("Analytics", () => {
    beforeAll(() => {
      global.setInterval = jest.fn()
    })

    afterAll(() => {
      global.setInterval = realSetInterval
    })

    it("tracks the offer input focus", async () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new RespondTestPage(wrapper)
      await page.selectCounterRadio()

      expect(mockPostEvent).not.toHaveBeenCalled()

      page.offerInput.find("input").simulate("focus")

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toHaveBeenLastCalledWith({
        order_id: "2939023",
        action_type: "Focused on offer input",
        flow: "Make offer",
      })
    })

    it("tracks viwing the low offer speedbump", async () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new RespondTestPage(wrapper)
      await page.selectCounterRadio()
      await page.setOfferAmount(1000)

      expect(mockPostEvent).not.toHaveBeenCalled()

      await page.clickSubmit()

      expect(mockPostEvent).toHaveBeenLastCalledWith({
        order_id: "2939023",
        action_type: "Viewed offer too low",
        flow: "Make offer",
      })
    })

    it("tracks viwing the high offer speedbump", async () => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new RespondTestPage(wrapper)
      await page.selectCounterRadio()
      await page.setOfferAmount(20000)

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
