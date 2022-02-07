import { OfferTestQueryRawResponse } from "v2/__generated__/OfferTestQuery.graphql"
import { createTestEnv } from "v2/DevTools/createTestEnv"
import { graphql } from "react-relay"
import {
  UntouchedOfferOrder,
  UntouchedOfferOrderInPounds,
  UntouchedOfferOrderWithRange,
} from "../../../__tests__/Fixtures/Order"
import {
  initialOfferFailedAmountIsInvalid,
  initialOfferFailedCannotOffer,
  initialOfferSuccess,
} from "../__fixtures__/MutationResults"
import { OfferFragmentContainer } from "../Offer"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"

// Need to mock Utils/Events instead of using mockTracking because
// Boot's `dispatch` tracking prop overrides the one injected by
// mockTracking
jest.unmock("react-tracking")
jest.unmock("react-relay")

jest.mock("v2/Utils/Events", () => ({
  postEvent: jest.fn(),
}))

jest.mock("v2/Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

const mockPostEvent = require("v2/Utils/Events").postEvent as jest.Mock

const testOffer: OfferTestQueryRawResponse["order"] = {
  ...UntouchedOfferOrder,
  internalID: "1234",
}

describe("Offer InitialMutation", () => {
  const { buildPage, mutations, routes, ...hooks } = createTestEnv({
    Component: OfferFragmentContainer,
    TestPage: OrderAppTestPage,
    defaultData: {
      order: testOffer,
    },
    defaultMutationResults: {
      ...initialOfferSuccess,
    },
    query: graphql`
      query OfferTestQuery @raw_response_type @relay_test_operation {
        order: commerceOrder(id: "unused") {
          ...Offer_order
        }
      }
    `,
  })

  beforeEach(hooks.clearErrors)

  afterEach(hooks.clearMocksAndErrors)

  describe("the page layout", () => {
    let page: OrderAppTestPage
    beforeAll(async () => {
      page = await buildPage()
    })

    it("has 4 price options", () => {
      expect(page.priceOptions).toHaveLength(1)
      expect(page.priceOptions.find("BorderedRadio")).toHaveLength(4)
    })

    it("shows the list price", () => {
      const container = page.find("div#offer-page-left-column")
      expect(container.text()).toContain("List price: US$16,000")
    })

    it("can receive input, which updates the transaction summary", async () => {
      expect(page.transactionSummary.text()).toContain("Your offer")
      await page.setOfferAmount(1)
      expect(page.transactionSummary.text()).toContain("Your offerUS$1.00")

      await page.setOfferAmount(1023)
      expect(page.transactionSummary.text()).toContain("Your offerUS$1,023.00")
    })

    it("can select a price option which updates the transaction summary", async () => {
      expect(page.transactionSummary.text()).toContain("Your offer")

      await page.selectPriceOption(0)
      expect(page.transactionSummary.text()).toContain("Your offerUS$12,800.00")

      await page.selectPriceOption(1)
      expect(page.transactionSummary.text()).toContain("Your offerUS$13,600.00")

      await page.selectPriceOption(2)
      expect(page.transactionSummary.text()).toContain("Your offerUS$14,400.00")
    })

    it("shows final offer binding notice", () => {
      expect(page.text()).toContain("All offers are binding")
    })
  })

  describe("a non-usd currency", () => {
    let page: OrderAppTestPage
    beforeAll(async () => {
      page = await buildPage({
        mockData: {
          order: {
            ...testOffer,
            ...UntouchedOfferOrderInPounds,
          },
        },
      })
    })

    it("shows the list price just below the input", () => {
      const container = page.find("div#offer-page-left-column")
      expect(container.text()).toContain("List price: £16,000")
    })

    it("can receive input, which updates the transaction summary", async () => {
      expect(page.transactionSummary.text()).toContain("Your offer")
      await page.setOfferAmount(1)
      expect(page.transactionSummary.text()).toContain("Your offer£1.00")

      await page.setOfferAmount(1023)
      expect(page.transactionSummary.text()).toContain("Your offer£1,023.00")
    })
  })

  describe("an offer on the work with range display", () => {
    let page: OrderAppTestPage
    beforeAll(async () => {
      page = await buildPage({
        mockData: {
          order: {
            ...testOffer,
            ...UntouchedOfferOrderWithRange,
          },
        },
      })
    })

    it("shows the list price as a range", () => {
      const container = page.find("div#offer-page-left-column")
      expect(container.text()).toContain("List price: US$14,000 - 18,000")
    })

    it("does not show the offer is too small warning", async () => {
      await page.setOfferAmount(1000)
      await page.clickSubmit()
      expect(mutations.mockFetch).toHaveBeenCalledTimes(1)
    })

    it("does not show the offer amount is too high warning", async () => {
      await page.setOfferAmount(17000)
      await page.clickSubmit()
      expect(mutations.mockFetch).toHaveBeenCalledTimes(1)
    })
  })

  describe("a offer note", () => {
    let page: OrderAppTestPage

    describe("non inquiry order offer", () => {
      beforeAll(async () => {
        page = await buildPage()
      })

      it("displays OfferNote button", () => {
        const offerNote = page.find("OfferNote")
        expect(offerNote).toHaveLength(1)
      })
    })

    describe("inquiry order offer", () => {
      beforeAll(async () => {
        page = await buildPage({
          mockData: {
            order: {
              ...testOffer,
              isInquiryOrder: true,
            },
          },
        })
      })

      it("hides the OfferNote button for an inquiry order", () => {
        const offerNote = page.find("OfferNote")
        expect(offerNote).toHaveLength(0)
      })
    })
  })

  describe("mutation", () => {
    let page: OrderAppTestPage
    beforeEach(async () => {
      page = await buildPage()
    })

    it("doesn't let the user continue if they haven't clicked any option", async () => {
      await page.clickSubmit()
      expect(mutations.mockFetch).not.toHaveBeenCalled()
      expect(page.offerInput.text()).toMatch("Offer amount missing or invalid.")
    })

    it("doesn't let the user continue if they haven't typed anything in", async () => {
      page.selectCustomAmount()
      expect(page.offerInput.text()).not.toMatch(
        "Offer amount missing or invalid."
      )
      await page.clickSubmit()
      expect(mutations.mockFetch).not.toHaveBeenCalled()
      expect(page.offerInput.text()).toMatch("Offer amount missing or invalid.")
    })

    it("doesn't let the user continue if the offer value is not positive", async () => {
      await page.setOfferAmount(0)
      expect(page.offerInput.text()).not.toMatch(
        "Offer amount missing or invalid."
      )
      await page.clickSubmit()
      expect(mutations.mockFetch).not.toHaveBeenCalled()
      expect(page.offerInput.text()).toMatch("Offer amount missing or invalid.")
    })

    it("routes to shipping screen after mutation completes - option", async () => {
      await page.selectRandomPriceOption()
      await page.clickSubmit()
      expect(mutations.mockFetch).toHaveBeenCalled()
      expect(routes.mockPushRoute).toHaveBeenCalledWith("/orders/1234/shipping")
    })

    it("routes to shipping screen after mutation completes - custom amount", async () => {
      await page.setOfferAmount(16000)
      await page.clickSubmit()
      expect(mutations.mockFetch).toHaveBeenCalled()
      expect(routes.mockPushRoute).toHaveBeenCalledWith("/orders/1234/shipping")
    })

    it("shows the button spinner while committing the mutation", async () => {
      await page.setOfferAmount(15000)
      await page.expectButtonSpinnerWhenSubmitting()
    })

    it("shows an error modal when there is an error from the server", async () => {
      mutations.useResultsOnce(initialOfferFailedCannotOffer)
      await page.setOfferAmount(16000)
      await page.clickSubmit()
      await page.expectAndDismissDefaultErrorDialog()
      expect(mutations.mockFetch).toHaveBeenCalled()
    })

    it("shows a helpful error message in a modal when there is an error from the server because the amount is invalid", async () => {
      mutations.useResultsOnce(initialOfferFailedAmountIsInvalid)

      await page.setOfferAmount(16000)
      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Invalid offer",
        "The offer amount is either missing or invalid. Please try again."
      )
    })

    describe("The 'amount too small' speed bump", () => {
      it("shows if the offer amount is too small", async () => {
        await page.setOfferAmount(1000)
        await page.clickSubmit()

        expect(mutations.mockFetch).not.toHaveBeenCalled()

        await page.expectAndDismissErrorDialogMatching(
          "Offer may be too low",
          "Offers within 25% of the list price are most likely to receive a response",
          "OK"
        )

        expect(mutations.mockFetch).not.toHaveBeenCalled()

        await page.clickSubmit()
        expect(page.modalDialog.props().show).toBeFalsy()

        expect(mutations.mockFetch).toHaveBeenCalledTimes(1)
      })
    })

    describe("The 'amount too high' speed bump", () => {
      it("shows if the offer amount is too high", async () => {
        await page.setOfferAmount(17000)
        await page.clickSubmit()

        expect(mutations.mockFetch).not.toHaveBeenCalled()

        await page.expectAndDismissErrorDialogMatching(
          "Offer higher than list price",
          "You’re making an offer higher than the list price",
          "OK"
        )

        expect(mutations.mockFetch).not.toHaveBeenCalled()

        await page.clickSubmit()

        expect(mutations.mockFetch).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe("Analytics", () => {
    let page: OrderAppTestPage
    beforeEach(async () => {
      page = await buildPage()
      mockPostEvent.mockReset()
    })

    it("tracks the offer input focus", () => {
      expect(mockPostEvent).not.toHaveBeenCalled()
      page.selectCustomAmount()
      page.find("input").simulate("focus")

      expect(mockPostEvent).toHaveBeenLastCalledWith({
        action_type: "Focused on offer input",
        flow: "Make offer",
        order_id: "1234",
      })
    })

    it("tracks viwing the low offer speedbump", async () => {
      const trackData = {
        action_type: "Viewed offer too low",
        flow: "Make offer",
        order_id: "1234",
      }
      await page.setOfferAmount(1000)

      expect(mockPostEvent).not.toHaveBeenLastCalledWith(trackData)

      await page.clickSubmit()

      expect(mockPostEvent).toHaveBeenLastCalledWith(trackData)
    })

    it("tracks viwing the high offer speedbump", async () => {
      const trackData = {
        action_type: "Viewed offer higher than listed price",
        flow: "Make offer",
        order_id: "1234",
      }
      await page.setOfferAmount(20000)

      expect(mockPostEvent).not.toHaveBeenLastCalledWith(trackData)

      await page.clickSubmit()

      expect(mockPostEvent).toHaveBeenLastCalledWith(trackData)
    })
  })
})
