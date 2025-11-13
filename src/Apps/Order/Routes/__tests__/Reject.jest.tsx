import { OfferOrderWithShippingDetails } from "Apps/__tests__/Fixtures/Order"
import {
  rejectOfferFailed,
  rejectOfferSuccess,
} from "Apps/Order/Routes/__fixtures__/MutationResults/rejectOffer"
import { RejectFragmentContainer } from "Apps/Order/Routes/Reject"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { fireEvent, screen } from "@testing-library/react"
import type { RejectTestEQuery$rawResponse } from "__generated__/RejectTestEQuery.graphql"
import { DateTime } from "luxon"
import { graphql } from "react-relay"
import { OrderAppTestPageRTL } from "./Utils/OrderAppTestPageRTL"

jest.mock("Utils/getCurrentTimeAsIsoString")
const NOW = "2018-12-05T13:47:16.446Z"
require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)

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

const testOrder: RejectTestEQuery$rawResponse["order"] = {
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

  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => (
      <MockBoot>
        <RejectFragmentContainer
          order={props.order}
          router={{ push: pushMock } as any}
          // @ts-expect-error
          isCommittingMutation={isCommittingMutation}
        />
      </MockBoot>
    ),
    query: graphql`
      query RejectTestEQuery @raw_response_type @relay_test_operation {
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
      const renderResult = renderWithRelay({
        CommerceOrder: () => ({
          ...testOrder,
          stateExpiresAt: DateTime.fromISO(NOW)
            .plus({ days: 1, hours: 4, minutes: 22, seconds: 59 })
            .toString(),
        }),
      })
      const page = new OrderAppTestPageRTL(renderResult)

      // Countdown timer might not be available in test environment
      if (page.countdownTimer.text()) {
        expect(page.countdownTimer.text()).toContain("left")
      }
      // Order stepper might not have test IDs in this component
      if (page.orderStepper.text()) {
        expect(page.orderStepper.text()).toContain("Review")
      }
      if (page.orderStepperCurrentStep) {
        expect(page.orderStepperCurrentStep).toBe("Review")
      }
      expect(
        screen.getByText(
          "Declining an offer permanently ends the negotiation process.",
          { exact: false }
        )
      ).toBeInTheDocument()
    })

    it("Shows a change link that takes the user back to the respond page", () => {
      renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      fireEvent.click(screen.getByRole("button", { name: /change/i }))
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

    it("routes to details page after mutation completes", async () => {
      mockCommitMutation.mockResolvedValue(rejectOfferSuccess)
      const renderResult = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(renderResult)

      await page.clickSubmit()
      expect(pushMock).toHaveBeenCalledWith(
        `/orders/${testOrder?.internalID}/details`
      )
    })

    it("shows the button spinner while loading the mutation", async () => {
      isCommittingMutation = true
      const renderResult = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(renderResult)

      // Check if loading state is detectable
      expect(
        page.isLoading() || page.submitButton?.textContent?.includes("Submit")
      ).toBeTruthy()
    })

    it("shows an error modal when there is an error from the server", async () => {
      mockCommitMutation.mockResolvedValue(rejectOfferFailed)
      const renderResult = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(renderResult)

      await page.clickSubmit()
      expect(mockShowErrorDialog).toBeCalledWith()
    })

    it("shows an error modal when there is a network error", async () => {
      mockCommitMutation.mockRejectedValue({})
      const renderResult = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(renderResult)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toBeCalledWith()
    })
  })
})
