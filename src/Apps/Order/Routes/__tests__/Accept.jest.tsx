import {
  Buyer,
  OfferOrderWithShippingDetails,
  OfferWithTotals,
  Offers,
} from "Apps/__tests__/Fixtures/Order"
import { DateTime } from "luxon"
import { graphql, commitMutation as _commitMutation } from "react-relay"
import { AcceptFragmentContainer } from "Apps/Order/Routes/Accept"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import { mockLocation } from "DevTools/mockLocation"
import { useTracking } from "react-tracking"
import { mockStripe } from "DevTools/mockStripe"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { Router } from "found"
import { MockBoot } from "DevTools/MockBoot"
import { ConnectedModalDialog } from "Apps/Order/Dialogs"
import {
  acceptOfferSuccess,
  acceptOfferFailed,
  acceptOfferPaymentFailed,
  acceptOfferPaymentFailedInsufficientFunds,
  acceptOfferInsufficientInventoryFailure,
  acceptOfferWithActionRequired,
} from "Apps/Order/Routes/__fixtures__/MutationResults/acceptOffer"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import { RouterLink } from "System/Components/RouterLink"

jest.unmock("react-relay")

jest.mock("Utils/getCurrentTimeAsIsoString")
jest.mock("react-tracking")
const NOW = "2018-12-05T13:47:16.446Z"
require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)
jest.mock("System/Hooks/useFeatureFlag")

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
        <AcceptFragmentContainer
          router={{ push: pushMock } as any}
          route={{ onTransition: jest.fn } as any}
          order={props.order}
          dialog={{} as any}
          isCommittingMutation={isCommittingMutation}
          commitMutation={commitMutation}
        />
        <ConnectedModalDialog />
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
      let { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...testOrder,
          stateExpiresAt: DateTime.fromISO(NOW)
            .plus({ days: 1, hours: 4, minutes: 22, seconds: 59 })
            .toString(),
        }),
      })
      let page = new OrderAppTestPage(wrapper)

      expect(page.countdownTimer.text()).toContain("01d 04h 22m 59s left")
      expect(page.orderStepper.text()).toMatchInlineSnapshot(`"RespondReview"`)
      expect(page.orderStepperCurrentStep).toBe(`Review`)
      expect(page.transactionSummary.text()).toMatch(
        "Accept seller's offerChange"
      )
      expect(page.transactionSummary.text()).toMatch(
        "Seller's offerUS$sellers.offer"
      )
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
      expect(page.submitButton.text()).toBe("Submit")
      expect(page.conditionsOfSaleDisclaimer.text()).toMatchInlineSnapshot(
        `"By clicking Submit, I agree to Artsy’s Conditions of Sale."`
      )
      expect(
        page.conditionsOfSaleDisclaimer.find(RouterLink).props().to
      ).toEqual("/conditions-of-sale")
    })

    describe("when the new disclaimer is enabled", () => {
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
  })

  describe("mutation", () => {
    beforeEach(async () => {
      global.setInterval = jest.fn()
    })

    afterEach(() => {
      global.setInterval = realSetInterval
    })

    it("routes to status page after mutation completes", async () => {
      commitMutation.mockReturnValue(acceptOfferSuccess)
      let { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      let page = new OrderAppTestPage(wrapper)

      await page.clickSubmit()
      expect(pushMock).toHaveBeenCalledWith(
        `/orders/${testOrder.internalID}/status`
      )
    })

    it("shows the button spinner while loading the mutation", () => {
      isCommittingMutation = true
      let { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      let page = new OrderAppTestPage(wrapper)

      expect(page.isLoading()).toBeTruthy()
    })

    it("shows an error modal when there is an error from the server", async () => {
      commitMutation.mockReturnValue(acceptOfferFailed)
      let { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      let page = new OrderAppTestPage(wrapper)

      await page.clickSubmit()
      await page.expectAndDismissDefaultErrorDialog()
    })

    it("shows SCA modal when required", async () => {
      commitMutation.mockReturnValue(acceptOfferWithActionRequired)
      let { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      let page = new OrderAppTestPage(wrapper)
      await page.clickSubmit()

      expect(_mockStripe().handleCardAction).toBeCalledWith("client-secret")
    })

    it("shows an error modal if there is a capture_failed error", async () => {
      commitMutation.mockReturnValue(acceptOfferPaymentFailed)
      let { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      let page = new OrderAppTestPage(wrapper)

      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Charge failed",
        "Payment has been declined. Please contact your card provider or bank institution, then press “Submit” again. Alternatively, use another payment method."
      )
      expect(pushMock).toHaveBeenCalledWith(
        `/orders/${testOrder.internalID}/payment/new`
      )
    })

    it("shows an error modal if there is a capture_failed error with insufficient_funds", async () => {
      commitMutation.mockReturnValue(acceptOfferPaymentFailedInsufficientFunds)
      let { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      let page = new OrderAppTestPage(wrapper)

      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Insufficient funds",
        "There aren’t enough funds available on the card you provided. Please use a new card. Alternatively, contact your card provider, then press “Submit” again."
      )
      expect(pushMock).toHaveBeenCalledWith(
        `/orders/${testOrder.internalID}/payment/new`
      )
    })

    it("shows an error modal and routes the user to the artist page if there is insufficient inventory", async () => {
      commitMutation.mockReturnValue(acceptOfferInsufficientInventoryFailure)
      let { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      let page = new OrderAppTestPage(wrapper)

      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Not available",
        "Sorry, the work is no longer available."
      )
      const artworkId = testOrder.lineItems.edges[0].node.artwork.slug
      expect(pushMock).toHaveBeenCalledWith(`/artwork/${artworkId}`)
    })
  })
})
