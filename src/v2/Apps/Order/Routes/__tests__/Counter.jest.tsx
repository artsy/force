import { CounterTestQueryRawResponse } from "v2/__generated__/CounterTestQuery.graphql"
import {
  OfferOrderWithShippingDetails,
  OfferWithTotals,
  Offers,
} from "v2/Apps/__tests__/Fixtures/Order"
import { DateTime } from "luxon"
import { graphql, commitMutation as _commitMutation } from "react-relay"
import {
  insufficientInventoryResponse,
  submitPendingOfferFailed,
  submitPendingOfferSuccess,
} from "../__fixtures__/MutationResults/submitPendingOffer"
import { CounterFragmentContainer } from "../Counter"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import { useTracking } from "v2/System"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { MockBoot } from "v2/DevTools"

jest.mock("v2/Utils/getCurrentTimeAsIsoString")
const NOW = "2018-12-05T13:47:16.446Z"
require("v2/Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)
jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")

const mockShowErrorDialog = jest.fn()
jest.mock("v2/Apps/Order/Dialogs", () => ({
  ...jest.requireActual("../../Dialogs"),
  injectDialog: Component => props => (
    <Component {...props} dialog={{ showErrorDialog: mockShowErrorDialog }} />
  ),
}))

const mockCommitMutation = jest.fn()
jest.mock("v2/Apps/Order/Utils/commitMutation", () => ({
  ...jest.requireActual("../../Utils/commitMutation"),
  injectCommitMutation: Component => props => (
    <Component {...props} commitMutation={mockCommitMutation} />
  ),
}))

const realSetInterval = global.setInterval

const testOrder: CounterTestQueryRawResponse["order"] = {
  ...OfferOrderWithShippingDetails,
  stateExpiresAt: DateTime.fromISO(NOW).plus({ days: 1 }).toString(),
  lastOffer: {
    ...OfferWithTotals,
    internalID: "lastOffer",
    id: "lastOffer",
    createdAt: DateTime.fromISO(NOW).minus({ days: 1 }).toString(),
    amount: "$sellers.offer",
  },
  myLastOffer: {
    ...OfferWithTotals,
    internalID: "myLastOffer",
    id: "myLastOffer",
    amount: "$your.offer",
    fromParticipant: "BUYER",
  },
  offers: { edges: Offers },
}

describe("Submit Pending Counter Offer", () => {
  const pushMock = jest.fn()
  let isCommittingMutation
  const commerceOrder = {
    ...testOrder,
    stateExpiresAt: DateTime.fromISO(NOW)
      .plus({ days: 1, hours: 4, minutes: 22, seconds: 59 })
      .toString(),
  }

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
    jest.restoreAllMocks()
  })

  beforeEach(() => {
    isCommittingMutation = false
  })

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => (
      <MockBoot>
        <CounterFragmentContainer
          router={{ push: pushMock } as any}
          order={props.order}
          // @ts-ignore
          isCommittingMutation={isCommittingMutation}
        />
      </MockBoot>
    ),
    query: graphql`
      query CounterTestQuery @raw_response_type @relay_test_operation {
        order: commerceOrder(id: "") {
          ...Counter_order
        }
      }
    `,
  })

  describe("with default data", () => {
    beforeAll(async () => {
      global.setInterval = jest.fn()
    })

    afterAll(() => {
      global.setInterval = realSetInterval
    })

    it("renders", () => {
      let wrapper = getWrapper({
        CommerceOrder: () => commerceOrder,
      })
      let page = new OrderAppTestPage(wrapper)

      expect(page.countdownTimer.text()).toContain("01d 04h 22m 59s left")
      expect(page.orderStepper.text()).toMatchInlineSnapshot(
        `"CheckRespondNavigate rightReview"`
      )
      expect(page.orderStepperCurrentStep).toBe("Review")
      expect(
        page.transactionSummary.find("Entry").find("[data-test='offer']").text()
      ).toMatch("Your offerUS$your.offer")
      expect(
        page.transactionSummary.find("TransactionDetailsSummaryItem").text()
      ).toMatch("Your counterofferChange")
      expect(page.transactionSummary.text()).toMatch(
        "Seller's offerUS$sellers.offer"
      )
      expect(page.artworkSummary.text()).toMatch(
        "Lisa BreslowGramercy Park South"
      )
      expect(page.shippingSummary.text()).toMatch(
        "Ship toLockedJoelle Van Dyne401 Broadway"
      )
      expect(page.paymentSummary.text()).toMatchInlineSnapshot(
        `"Lockedvisa•••• 4444   Exp 03/21"`
      )
      expect(page.buyerGuarantee.length).toBe(1)
      expect(page.submitButton.text()).toBe("Submit")
      expect(page.conditionsOfSaleDisclaimer.text()).toMatch(
        "By clicking Submit, I agree to Artsy’s Conditions of Sale."
      )
    })

    it("loading given isCommitingMutation", async () => {
      isCommittingMutation = true
      let wrapper = getWrapper({
        CommerceOrder: () => testOrder,
      })
      let page = new OrderAppTestPage(wrapper)

      expect(page.isLoading()).toBeTruthy()
    })
  })

  describe("mutation", () => {
    beforeEach(async () => {
      global.setInterval = jest.fn()
    })

    afterEach(() => {
      global.setInterval = realSetInterval
    })

    it("routes to status page after mutation completes", async () => {
      mockCommitMutation.mockResolvedValue(submitPendingOfferSuccess)
      let wrapper = getWrapper({
        CommerceOrder: () => commerceOrder,
      })
      let page = new OrderAppTestPage(wrapper)

      await page.clickSubmit()
      expect(pushMock).toHaveBeenCalledWith(
        `/orders/${testOrder.internalID}/status`
      )
    })

    it("shows an error modal with proper error when there is insufficient inventory", async () => {
      mockCommitMutation.mockReturnValue(insufficientInventoryResponse)
      let wrapper = getWrapper({
        CommerceOrder: () => commerceOrder,
      })
      let page = new OrderAppTestPage(wrapper)

      await page.clickSubmit()
      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "This work has already been sold.",
        message: "Please contact orders@artsy.net with any questions.",
      })
    })

    it("shows generic error modal when there is an error from the server", async () => {
      mockCommitMutation.mockReturnValue(submitPendingOfferFailed)
      let wrapper = getWrapper({
        CommerceOrder: () => commerceOrder,
      })
      let page = new OrderAppTestPage(wrapper)

      await page.clickSubmit()
      expect(mockShowErrorDialog).toHaveBeenCalledWith()
    })

    it("shows an error modal when there is a network error", async () => {
      mockCommitMutation.mockRejectedValue({})
      let wrapper = getWrapper({
        CommerceOrder: () => commerceOrder,
      })
      let page = new OrderAppTestPage(wrapper)

      await page.clickSubmit()
      expect(mockShowErrorDialog).toHaveBeenCalledWith()
    })
  })
})
