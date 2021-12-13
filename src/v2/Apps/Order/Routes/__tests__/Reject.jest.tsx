import { RejectTestQueryRawResponse } from "v2/__generated__/RejectTestQuery.graphql"
import { OfferOrderWithShippingDetails } from "v2/Apps/__tests__/Fixtures/Order"
import { StepSummaryItem } from "v2/Components/StepSummaryItem"
import { createTestEnv } from "v2/DevTools/createTestEnv"
import { DateTime } from "luxon"
import { graphql } from "react-relay"
import {
  rejectOfferFailed,
  rejectOfferSuccess,
} from "../__fixtures__/MutationResults/rejectOffer"
import { RejectFragmentContainer } from "../Reject"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"

jest.mock("v2/Utils/getCurrentTimeAsIsoString")
const NOW = "2018-12-05T13:47:16.446Z"
require("v2/Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)

jest.unmock("react-relay")
const realSetInterval = global.setInterval

const testOrder: RejectTestQueryRawResponse["order"] = {
  ...OfferOrderWithShippingDetails,
  stateExpiresAt: DateTime.fromISO(NOW).plus({ days: 1 }).toString(),
  lastOffer: {
    internalID: "last-offer-id",
    id: "last-offer-id",
    createdAt: DateTime.fromISO(NOW).minus({ days: 1 }).toString(),
  },
}

describe("Buyer rejects seller offer", () => {
  const { mutations, buildPage, routes, ...hooks } = createTestEnv({
    Component: RejectFragmentContainer,
    query: graphql`
      query RejectTestQuery @raw_response_type {
        order: commerceOrder(id: "unused") {
          ...Reject_order
        }
      }
    `,
    defaultData: {
      order: testOrder,
      system: {
        time: {
          unix: 222,
        },
      },
    },
    defaultMutationResults: {
      ...rejectOfferSuccess,
    },
    TestPage: OrderAppTestPage,
  })

  beforeEach(hooks.clearErrors)

  afterEach(hooks.clearMocksAndErrors)

  describe("the page layout", () => {
    let page: OrderAppTestPage
    beforeAll(async () => {
      global.setInterval = jest.fn()
      page = await buildPage({
        mockData: {
          order: {
            ...testOrder,
            stateExpiresAt: DateTime.fromISO(NOW)
              .plus({ days: 1, hours: 4, minutes: 22, seconds: 59 })
              .toString(),
          },
        },
      })
    })

    afterAll(() => {
      global.setInterval = realSetInterval
    })

    it("Shows the countdown timer", () => {
      expect(page.countdownTimer.text()).toContain("01d 04h 22m 59s left")
    })

    it("Shows the stepper", () => {
      expect(page.orderStepper.text()).toMatchInlineSnapshot(
        `"CheckRespondNavigate rightReview"`
      )
      expect(page.orderStepperCurrentStep).toBe("Review")
    })

    it("Shows a message explaining the consequences of a rejection", () => {
      expect(page.find(StepSummaryItem).text()).toContain(
        "Declining an offer permanently ends the negotiation process."
      )
    })

    it("Shows a change link that takes the user back to the respond page", () => {
      page.root.find("Clickable[data-test='change-link']").simulate("click")
      expect(routes.mockPushRoute).toHaveBeenCalledWith(
        `/orders/${testOrder.internalID}/respond`
      )
    })
  })

  describe("taking action", () => {
    let page: OrderAppTestPage
    beforeEach(async () => {
      global.setInterval = jest.fn()
      page = await buildPage()
    })

    afterAll(() => {
      global.setInterval = realSetInterval
    })

    it("routes to status page after mutation completes", async () => {
      await page.clickSubmit()
      expect(routes.mockPushRoute).toHaveBeenCalledWith(
        `/orders/${testOrder.internalID}/status`
      )
    })

    it("shows the button spinner while loading the mutation", async () => {
      await page.expectButtonSpinnerWhenSubmitting()
    })

    it("shows an error modal when there is an error from the server", async () => {
      mutations.useResultsOnce(rejectOfferFailed)
      await page.clickSubmit()
      await page.expectAndDismissDefaultErrorDialog()
    })

    it("shows an error modal when there is a network error", async () => {
      mutations.mockNetworkFailureOnce()
      await page.clickSubmit()
      await page.expectAndDismissDefaultErrorDialog()
    })
  })
})
