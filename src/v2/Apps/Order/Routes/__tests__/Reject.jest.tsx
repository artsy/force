import { RejectTestQueryRawResponse } from "v2/__generated__/RejectTestQuery.graphql"
import { OfferOrderWithShippingDetails } from "v2/Apps/__tests__/Fixtures/Order"
import { StepSummaryItem } from "v2/Components/StepSummaryItem"
import { DateTime } from "luxon"
import { graphql } from "react-relay"
import {
  rejectOfferFailed,
  rejectOfferSuccess,
} from "../__fixtures__/MutationResults/rejectOffer"
import { RejectFragmentContainer } from "../Reject"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { MockBoot } from "v2/DevTools"

jest.mock("v2/Utils/getCurrentTimeAsIsoString")
const NOW = "2018-12-05T13:47:16.446Z"
require("v2/Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    ModalDialog: ({ title, children, onClose, footer }) => {
      return (
        <div data-testid="ModalDialog">
          <button onClick={onClose}>close</button>
          {title}
          {children}
          {footer}
        </div>
      )
    },
  }
})

jest.unmock("react-relay")
const realSetInterval = global.setInterval

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

const testOrder: RejectTestQueryRawResponse["order"] = {
  ...OfferOrderWithShippingDetails,
  __isCommerceOrder: "CommerceOfferOrder",
  __typename: "CommerceOfferOrder",
  stateExpiresAt: DateTime.fromISO(NOW).plus({ days: 1 }).toString(),
  lastOffer: {
    internalID: "last-offer-id",
    id: "last-offer-id",
    createdAt: DateTime.fromISO(NOW).minus({ days: 1 }).toString(),
  },
}

describe("Buyer rejects seller offer", () => {
  const pushMock = jest.fn()
  let isCommittingMutation
  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => (
      <MockBoot>
        <RejectFragmentContainer
          order={props.order}
          router={{ push: pushMock } as any}
          // @ts-ignore
          isCommittingMutation={isCommittingMutation}
        />
      </MockBoot>
    ),
    query: graphql`
      query RejectTestQuery @raw_response_type @relay_test_operation {
        order: commerceOrder(id: "unused") {
          ...Reject_order
        }
      }
    `,
  })

  beforeEach(() => {
    isCommittingMutation = false
  })

  describe("the page layout", () => {
    afterAll(() => {
      global.setInterval = realSetInterval
    })

    it("renders", () => {
      const wrapper = getWrapper({
        CommerceOrder: () => ({
          ...testOrder,
          stateExpiresAt: DateTime.fromISO(NOW)
            .plus({ days: 1, hours: 4, minutes: 22, seconds: 59 })
            .toString(),
        }),
      })
      const page = new OrderAppTestPage(wrapper)

      expect(page.countdownTimer.text()).toContain("01d 04h 22m 59s left")
      expect(page.orderStepper.text()).toMatchInlineSnapshot(
        `"CheckRespondNavigate rightReview"`
      )
      expect(page.orderStepperCurrentStep).toBe("Review")
      expect(page.find(StepSummaryItem).text()).toContain(
        "Declining an offer permanently ends the negotiation process."
      )
    })

    it("Shows a change link that takes the user back to the respond page", () => {
      const wrapper = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPage(wrapper)

      page.root.find("Clickable[data-test='change-link']").simulate("click")
      expect(pushMock).toHaveBeenCalledWith(
        `/orders/${testOrder?.internalID}/respond`
      )
    })
  })

  describe("taking action", () => {
    beforeEach(async () => {
      global.setInterval = jest.fn()
    })

    afterAll(() => {
      global.setInterval = realSetInterval
    })

    it("routes to status page after mutation completes", async () => {
      mockCommitMutation.mockResolvedValue(rejectOfferSuccess)
      const wrapper = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPage(wrapper)

      await page.clickSubmit()
      expect(pushMock).toHaveBeenCalledWith(
        `/orders/${testOrder?.internalID}/status`
      )
    })

    it("shows the button spinner while loading the mutation", async () => {
      isCommittingMutation = true
      const wrapper = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPage(wrapper)

      expect(page.isLoading()).toBeTruthy()
    })

    it("shows an error modal when there is an error from the server", async () => {
      mockCommitMutation.mockResolvedValue(rejectOfferFailed)
      const wrapper = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPage(wrapper)

      await page.clickSubmit()
      expect(mockShowErrorDialog).toBeCalledWith()
    })

    it("shows an error modal when there is a network error", async () => {
      mockCommitMutation.mockRejectedValue({})
      const wrapper = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPage(wrapper)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toBeCalledWith()
    })
  })
})
