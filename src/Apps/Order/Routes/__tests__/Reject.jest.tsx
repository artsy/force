import { RejectTestQuery$rawResponse } from "__generated__/RejectTestQuery.graphql"
import { OfferOrderWithShippingDetails } from "Apps/__tests__/Fixtures/Order"
import { StepSummaryItem } from "Components/StepSummaryItem"
import { DateTime } from "luxon"
import { graphql } from "react-relay"
import {
  rejectOfferFailed,
  rejectOfferSuccess,
} from "Apps/Order/Routes/__fixtures__/MutationResults/rejectOffer"
import { RejectFragmentContainer } from "Apps/Order/Routes/Reject"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { MockBoot } from "DevTools/MockBoot"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { RouterLink } from "System/Components/RouterLink"

jest.mock("Utils/getCurrentTimeAsIsoString")
const NOW = "2018-12-05T13:47:16.446Z"
require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)
jest.mock("System/Hooks/useFeatureFlag")

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

const testOrder: RejectTestQuery$rawResponse["order"] = {
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
      const { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...testOrder,
          stateExpiresAt: DateTime.fromISO(NOW)
            .plus({ days: 1, hours: 4, minutes: 22, seconds: 59 })
            .toString(),
        }),
      })
      const page = new OrderAppTestPage(wrapper)

      expect(page.countdownTimer.text()).toContain("01d 04h 22m 59s left")
      expect(page.orderStepper.text()).toMatchInlineSnapshot(`"RespondReview"`)
      expect(page.orderStepperCurrentStep).toBe("Review")
      expect(page.find(StepSummaryItem).text()).toContain(
        "Declining an offer permanently ends the negotiation process."
      )
      expect(page.conditionsOfSaleDisclaimer.text()).toMatch(
        "By clicking Submit, I agree to Artsy’s Conditions of Sale."
      )
      expect(
        page.conditionsOfSaleDisclaimer.find(RouterLink).props().to
      ).toEqual("/conditions-of-sale")
    })

    describe("when new disclaimers are enabled", () => {
      beforeAll(() => {
        ;(useFeatureFlag as jest.Mock).mockImplementation(
          (f: string) => f === "diamond_new-terms-and-conditions"
        )
      })

      afterAll(() => {
        ;(useFeatureFlag as jest.Mock).mockReset()
      })

      it("renders the new disclaimer", () => {
        const { wrapper } = getWrapper({
          CommerceOrder: () => testOrder,
        })
        const page = new OrderAppTestPage(wrapper)

        expect(page.conditionsOfSaleDisclaimer.text()).toMatch(
          "By clicking Submit, I agree to Artsy’s General Terms and Conditions of Sale."
        )
        expect(
          page.conditionsOfSaleDisclaimer.find(RouterLink).props().to
        ).toEqual("/terms")
      })
    })

    it("Shows a change link that takes the user back to the respond page", () => {
      const { wrapper } = getWrapper({
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
      const { wrapper } = getWrapper({
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
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPage(wrapper)

      expect(page.isLoading()).toBeTruthy()
    })

    it("shows an error modal when there is an error from the server", async () => {
      mockCommitMutation.mockResolvedValue(rejectOfferFailed)
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPage(wrapper)

      await page.clickSubmit()
      expect(mockShowErrorDialog).toBeCalledWith()
    })

    it("shows an error modal when there is a network error", async () => {
      mockCommitMutation.mockRejectedValue({})
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPage(wrapper)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toBeCalledWith()
    })
  })
})
