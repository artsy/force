import { ConnectedModalDialog } from "Apps/Order/Dialogs"
import { AcceptFragmentContainer } from "Apps/Order/Routes/Accept"
import {
  acceptOfferFailed,
  acceptOfferInsufficientInventoryFailure,
  acceptOfferPaymentFailed,
  acceptOfferPaymentFailedInsufficientFunds,
  acceptOfferSuccess,
  acceptOfferWithActionRequired,
} from "Apps/Order/Routes/__fixtures__/MutationResults/acceptOffer"
import {
  Buyer,
  OfferOrderWithShippingDetails,
  OfferWithTotals,
  Offers,
} from "Apps/__tests__/Fixtures/Order"
import { MockBoot } from "DevTools/MockBoot"
import { mockLocation } from "DevTools/mockLocation"
import { mockStripe } from "DevTools/mockStripe"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import type { Router } from "found"
import { DateTime } from "luxon"
import { commitMutation as _commitMutation, graphql } from "react-relay"
import { useTracking } from "react-tracking"
// eslint-disable-next-line no-restricted-imports
import { Provider } from "unstated"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"

jest.unmock("react-relay")

jest.mock("Utils/getCurrentTimeAsIsoString")
jest.mock("react-tracking")
const NOW = "2018-12-05T13:47:16.446Z"
require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)

jest.mock("@stripe/stripe-js", () => {
  let mock: ReturnType<typeof mockStripe> | null = null
  return {
    loadStripe: () => {
      if (mock === null) {
        mock = mockStripe()
      }
      return mock
    },
    _mockStripe: () => mock,
    _mockReset: () => (mock = mockStripe()),
  }
})

const { _mockStripe } = require("@stripe/stripe-js")

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

const realSetInterval = global.setInterval

const testOrder = {
  ...OfferOrderWithShippingDetails,
  stateExpiresAt: DateTime.fromISO(NOW).plus({ days: 1 }).toString(),
  lastOffer: {
    ...OfferWithTotals,
    createdAt: DateTime.fromISO(NOW).minus({ days: 1 }).toString(),
    amount: "$sellers.offer",
    fromParticipant: "SELLER",
  },
  offers: { edges: Offers },
  buyer: Buyer,
  creditCardId: "creditCardId",
}

describe("Accept seller offer", () => {
  const pushMock: jest.Mock<Router["push"]> = jest.fn()
  const commitMutation = jest.fn()
  let isCommittingMutation = false

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => (
      <MockBoot>
        <Provider>
          <AcceptFragmentContainer
            router={{ push: pushMock } as any}
            route={{ onTransition: jest.fn } as any}
            order={props.order}
            dialog={{} as any}
            isCommittingMutation={isCommittingMutation}
            commitMutation={commitMutation}
          />
          <ConnectedModalDialog />
        </Provider>
      </MockBoot>
    ),
    query: graphql`
      query AcceptTestQuery @raw_response_type @relay_test_operation {
        order: commerceOrder(id: "test-id") {
          ...Accept_order
        }
      }
    `,
  })

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
  })

  beforeEach(() => {
    mockLocation()
  })

  afterEach(() => {
    pushMock.mockReset()
    commitMutation.mockReset()
    isCommittingMutation = false
  })

  describe("with default data", () => {
    beforeAll(async () => {
      global.setInterval = jest.fn()
    })

    afterAll(() => {
      global.setInterval = realSetInterval
    })

    it("renders", async () => {
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
      expect(page.orderStepperCurrentStep).toBe(`Review`)
      expect(page.transactionSummary.text()).toMatch(
        "Accept seller's offerChange",
      )
      expect(page.transactionSummary.text()).toMatch(
        "Seller's offerUS$sellers.offer",
      )
      expect(page.artworkSummary.text()).toMatch(
        "Lisa BreslowGramercy Park South",
      )
      expect(page.shippingSummary.text()).toMatch(
        "Ship toJoelle Van Dyne401 Broadway",
      )
      expect(page.paymentSummary.text()).toMatchInlineSnapshot(
        `"•••• 4444   Exp 03/21"`,
      )
      expect(page.buyerGuarantee.length).toBe(1)
      expect(page.submitButton.text()).toBe("Submit")
    })
  })

  describe("mutation", () => {
    beforeEach(async () => {
      global.setInterval = jest.fn()
    })

    afterEach(() => {
      global.setInterval = realSetInterval
    })

    it("routes to details page after mutation completes", async () => {
      commitMutation.mockReturnValue(acceptOfferSuccess)
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPage(wrapper)

      await page.clickSubmit()
      expect(pushMock).toHaveBeenCalledWith(
        `/orders/${testOrder.internalID}/details`,
      )
    })

    it("shows the button spinner while loading the mutation", () => {
      isCommittingMutation = true
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPage(wrapper)

      expect(page.isLoading()).toBeTruthy()
    })

    it("shows an error modal when there is an error from the server", async () => {
      commitMutation.mockReturnValue(acceptOfferFailed)
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPage(wrapper)

      await page.clickSubmit()
      await page.expectAndDismissDefaultErrorDialog()
    })

    it("shows SCA modal when required", async () => {
      commitMutation.mockReturnValue(acceptOfferWithActionRequired)
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPage(wrapper)
      await page.clickSubmit()

      expect(_mockStripe().handleCardAction).toBeCalledWith("client-secret")
    })

    it("shows an error modal if there is a capture_failed error", async () => {
      commitMutation.mockReturnValue(acceptOfferPaymentFailed)
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPage(wrapper)

      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Charge failed",
        "Payment has been declined. Please contact your card provider or bank institution, then press “Submit” again. Alternatively, use another payment method.",
      )
      expect(pushMock).toHaveBeenCalledWith(
        `/orders/${testOrder.internalID}/payment/new`,
      )
    })

    it("shows an error modal if there is a capture_failed error with insufficient_funds", async () => {
      commitMutation.mockReturnValue(acceptOfferPaymentFailedInsufficientFunds)
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPage(wrapper)

      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Insufficient funds",
        "There aren’t enough funds available on the card you provided. Please use a new card. Alternatively, contact your card provider, then press “Submit” again.",
      )
      expect(pushMock).toHaveBeenCalledWith(
        `/orders/${testOrder.internalID}/payment/new`,
      )
    })

    it("shows an error modal and routes the user to the artist page if there is insufficient inventory", async () => {
      commitMutation.mockReturnValue(acceptOfferInsufficientInventoryFailure)
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPage(wrapper)

      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Not available",
        "Sorry, the work is no longer available.",
      )
      const artworkId = testOrder.lineItems.edges[0].node.artwork.slug
      expect(pushMock).toHaveBeenCalledWith(`/artwork/${artworkId}`)
    })
  })
})
