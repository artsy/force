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

const mockPostEvent = require("v2/Utils/Events").postEvent as jest.Mock

const testOffer: OfferTestQueryRawResponse["order"] = {
  ...UntouchedOfferOrder,
  internalID: "1234",
}

describe("Offer InitialMutation", () => {
  const { buildPage, mutations, routes } = createTestEnv({
    Component: OfferFragmentContainer,
    TestPage: OrderAppTestPage,
    defaultData: {
      order: testOffer,
    },
    defaultMutationResults: {
      ...initialOfferSuccess,
    },
    query: graphql`
      query OfferTestQuery @raw_response_type {
        order: commerceOrder(id: "unused") {
          ...Offer_order
        }
      }
    `,
  })

  describe("the page layout", () => {
    let page: OrderAppTestPage
    beforeAll(async () => {
      page = await buildPage()
    })

    it("has an offer input", () => {
      expect(page.offerInput.text()).toContain("Your offer")
    })

    it("shows the list price just below the input", () => {
      const container = page.find("div#offer-page-left-column")
      expect(container.text()).toContain("List price: $16,000")
    })

    it("can receive input, which updates the transaction summary", () => {
      expect(page.transactionSummary.text()).toContain("Your offer")

      page.setOfferAmount(1)
      expect(page.transactionSummary.text()).toContain("Your offer$1.00")

      page.setOfferAmount(1023)
      expect(page.transactionSummary.text()).toContain("Your offer$1,023.00")
    })

    it("shows final offer binding notice", () => {
      expect(page.text()).toContain(
        "Please note that all final offers are binding"
      )
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

    it("can receive input, which updates the transaction summary", () => {
      expect(page.transactionSummary.text()).toContain("Your offer")

      page.setOfferAmount(1)
      expect(page.transactionSummary.text()).toContain("Your offer£1.00")

      page.setOfferAmount(1023)
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
      expect(container.text()).toContain("List price: $14,000 - 18,000")
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

    it("doesn't let the user continue if they haven't typed anything in", async () => {
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

    it("routes to shipping screen after mutation completes", async () => {
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

  describe("Analaytics", () => {
    let page: OrderAppTestPage
    beforeEach(async () => {
      page = await buildPage()
      mockPostEvent.mockReset()
    })

    it("tracks the offer input focus", () => {
      expect(mockPostEvent).not.toHaveBeenCalled()

      page.find("input").simulate("focus")

      expect(mockPostEvent).toHaveBeenCalledTimes(1)
      expect(mockPostEvent).toHaveBeenLastCalledWith({
        action_type: "Focused on offer input",
        flow: "Make offer",
        order_id: "1234",
      })
    })

    it("tracks viwing the low offer speedbump", async () => {
      await page.setOfferAmount(1000)

      expect(mockPostEvent).not.toHaveBeenCalled()

      await page.clickSubmit()

      expect(mockPostEvent).toHaveBeenLastCalledWith({
        action_type: "Viewed offer too low",
        flow: "Make offer",
        order_id: "1234",
      })
    })

    it("tracks viwing the high offer speedbump", async () => {
      await page.setOfferAmount(20000)

      expect(mockPostEvent).not.toHaveBeenCalled()

      await page.clickSubmit()

      expect(mockPostEvent).toHaveBeenLastCalledWith({
        action_type: "Viewed offer higher than listed price",
        flow: "Make offer",
        order_id: "1234",
      })
    })
  })
})
