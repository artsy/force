import { graphql } from "react-relay"
import {
  UntouchedOfferOrder,
  UntouchedOfferOrderInPounds,
  UntouchedOfferOrderWithRange,
  UntouchedOfferOrderMultipleEditionSets,
  UntouchedOfferOrderSingleEditionSet,
  UntouchedOfferOrderSingleEditionSetNoPrice,
  UntouchedOfferOrderPriceHidden,
} from "Apps/__tests__/Fixtures/Order"
import { OfferFragmentContainer } from "Apps/Order/Routes/Offer"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { MockBoot } from "DevTools/MockBoot"
import {
  initialOfferFailedAmountIsInvalid,
  initialOfferFailedCannotOffer,
  initialOfferSuccess,
} from "Apps/Order/Routes/__fixtures__/MutationResults/initialOffer"

// Need to mock Utils/Events instead of using mockTracking because
// Boot's `dispatch` tracking prop overrides the one injected by
// mockTracking
jest.unmock("react-tracking")
jest.unmock("react-relay")

jest.mock("Utils/Events", () => ({
  postEvent: jest.fn(),
}))

jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

const mockJumpTo = jest.fn()
jest.mock("Utils/Hooks/useJump", () => {
  const actual = jest.requireActual("Utils/Hooks/useJump")
  return {
    ...actual,
    useJump: () => ({ jumpTo: mockJumpTo }),
  }
})

jest.mock("Utils/user", () => ({
  getUser: jest.fn(),
  userHasLabFeature: jest.fn().mockReturnValue(false),
}))

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

const mockPostEvent = require("Utils/Events").postEvent as jest.Mock

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

const testOffer = {
  ...UntouchedOfferOrder,
  internalID: "1234",
}

describe("Offer InitialMutation", () => {
  const pushMock = jest.fn()
  let isCommittingMutation

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => (
      <MockBoot>
        <OfferFragmentContainer
          {...props}
          router={{ push: pushMock }}
          isCommittingMutation={isCommittingMutation}
        />
      </MockBoot>
    ),
    query: graphql`
      query OfferTestQuery @raw_response_type @relay_test_operation {
        order: commerceOrder(id: "unused") {
          ...Offer_order
        }
      }
    `,
  })

  beforeEach(() => {
    jest.clearAllMocks()
    isCommittingMutation = false
  })

  describe("the page layout", () => {
    it("has 4 price options - unique artwork", () => {
      let { wrapper } = getWrapper({
        CommerceOrder: () => testOffer,
      })
      let page = new OrderAppTestPage(wrapper)

      expect(page.priceOptions).toHaveLength(1)
      expect(page.priceOptions.find("BorderedRadio")).toHaveLength(4)
      expect(page.text()).toContain("All offers are binding")
    })
    it("has price options - single edition with price", () => {
      let { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...UntouchedOfferOrderSingleEditionSet,
          internalID: "1234",
        }),
      })
      let page = new OrderAppTestPage(wrapper)

      expect(page.priceOptions).toHaveLength(1)
      expect(page.priceOptions.find("BorderedRadio")).toHaveLength(4)
    })
    it("doesn't have price options - single edition without price", () => {
      let { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...UntouchedOfferOrderSingleEditionSetNoPrice,
          internalID: "1234",
        }),
      })
      let page = new OrderAppTestPage(wrapper)
      expect(page.find("PriceOptions").exists()).toBeFalsy()
    })
    it("doesn't have price options - multiple editions", () => {
      let { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...UntouchedOfferOrderMultipleEditionSets,
          internalID: "1234",
        }),
      })
      let page = new OrderAppTestPage(wrapper)
      expect(page.find("PriceOptions").exists()).toBeFalsy()
    })

    it("can receive input, which updates the transaction summary", async () => {
      let { wrapper } = getWrapper({
        CommerceOrder: () => testOffer,
      })
      let page = new OrderAppTestPage(wrapper)

      expect(page.transactionSummary.text()).toContain("Your offer")
      await page.setOfferAmount(1)
      expect(page.transactionSummary.text()).toContain("Your offerUS$1.00")

      await page.setOfferAmount(1023)
      expect(page.transactionSummary.text()).toContain("Your offerUS$1,023.00")
    })

    it("can select a price option which updates the transaction summary", async () => {
      let { wrapper } = getWrapper({
        CommerceOrder: () => testOffer,
      })
      let page = new OrderAppTestPage(wrapper)

      expect(page.transactionSummary.text()).toContain("Your offer")

      await page.selectPriceOption(0)
      expect(page.transactionSummary.text()).toContain("Your offerUS$16,000.00")

      await page.selectPriceOption(1)
      expect(page.transactionSummary.text()).toContain("Your offerUS$14,400.00")

      await page.selectPriceOption(2)
      expect(page.transactionSummary.text()).toContain("Your offerUS$12,800.00")
    })
  })

  describe("a non-usd currency", () => {
    const offer = { ...testOffer, ...UntouchedOfferOrderInPounds }

    it("can receive input, which updates the transaction summary", async () => {
      let { wrapper } = getWrapper({
        CommerceOrder: () => offer,
      })
      let page = new OrderAppTestPage(wrapper)

      expect(page.transactionSummary.text()).toContain("Your offer")
      await page.setOfferAmount(1)
      expect(page.transactionSummary.text()).toContain("Your offer£1.00")

      await page.setOfferAmount(1023)
      expect(page.transactionSummary.text()).toContain("Your offer£1,023.00")
    })
  })

  describe("an offer on the work with range display", () => {
    const offer = { ...testOffer, ...UntouchedOfferOrderWithRange }

    it("shows the list price as a range", () => {
      let { wrapper } = getWrapper({
        CommerceOrder: () => offer,
      })
      let page = new OrderAppTestPage(wrapper)

      const container = page.find("div#offer-page-left-column")
      expect(container.text()).toContain("List price: US$14,000 - 18,000")
    })

    it("does not show the offer is too small warning", async () => {
      let { wrapper } = getWrapper({
        CommerceOrder: () => offer,
      })
      let page = new OrderAppTestPage(wrapper)

      await page.setOfferAmount(1000)
      await page.clickSubmit()
      expect(mockCommitMutation).toHaveBeenCalledTimes(1)
    })

    it("does not show the offer amount is too high warning", async () => {
      let { wrapper } = getWrapper({
        CommerceOrder: () => offer,
      })
      let page = new OrderAppTestPage(wrapper)

      await page.setOfferAmount(17000)
      await page.clickSubmit()
      expect(mockCommitMutation).toHaveBeenCalledTimes(1)
    })
  })

  describe("a offer note", () => {
    describe("non inquiry order offer", () => {
      it("displays OfferNote button", () => {
        let { wrapper } = getWrapper({
          CommerceOrder: () => testOffer,
        })
        let page = new OrderAppTestPage(wrapper)

        const offerNote = page.find("OfferNote")
        expect(offerNote).toHaveLength(1)
      })
    })

    describe("inquiry order offer", () => {
      it("hides the OfferNote button for an inquiry order", () => {
        let { wrapper } = getWrapper({
          CommerceOrder: () => ({ ...testOffer, isInquiryOrder: true }),
        })
        let page = new OrderAppTestPage(wrapper)

        const offerNote = page.find("OfferNote")
        expect(offerNote).toHaveLength(0)
      })
    })
  })

  describe("mutation", () => {
    it("doesn't let the user continue if custom amount is invalid", async () => {
      let { wrapper } = getWrapper({
        CommerceOrder: () => testOffer,
      })
      let page = new OrderAppTestPage(wrapper)
      page.selectCustomAmount()

      await page.setOfferAmount(0)

      expect(page.offerInput.text()).not.toMatch(
        "Offer amount missing or invalid."
      )
      await page.clickSubmit()
      expect(mockCommitMutation).not.toHaveBeenCalled()
      expect(page.offerInput.text()).toMatch("Offer amount missing or invalid.")
    })

    it("lets the user continue with list price as offer if they haven't clicked any option", async () => {
      let { wrapper } = getWrapper({
        CommerceOrder: () => testOffer,
      })
      let page = new OrderAppTestPage(wrapper)
      await page.setOfferAmount(16000)
      await page.clickSubmit()

      expect(mockCommitMutation).toHaveBeenCalled()
    })

    it("routes to shipping screen after mutation completes - option", async () => {
      mockCommitMutation.mockResolvedValue(initialOfferSuccess)
      let { wrapper } = getWrapper({
        CommerceOrder: () => testOffer,
      })
      let page = new OrderAppTestPage(wrapper)
      await page.selectRandomPriceOption()
      await page.clickSubmit()

      expect(mockCommitMutation).toHaveBeenCalled()
      expect(pushMock).toHaveBeenCalledWith("/orders/1234/shipping")
    })

    // TODO: add the test when the feature flag is retired:
    // "adds a custom note given no note present"

    it("routes to shipping screen after mutation completes - custom amount", async () => {
      mockCommitMutation.mockResolvedValue(initialOfferSuccess)
      let { wrapper } = getWrapper({
        CommerceOrder: () => testOffer,
      })
      let page = new OrderAppTestPage(wrapper)
      await page.setOfferAmount(16000)
      await page.clickSubmit()

      expect(mockCommitMutation).toHaveBeenCalled()
      expect(pushMock).toHaveBeenCalledWith("/orders/1234/shipping")
    })

    it("shows the button spinner while committing the mutation", async () => {
      isCommittingMutation = true
      let { wrapper } = getWrapper({
        CommerceOrder: () => testOffer,
      })
      let page = new OrderAppTestPage(wrapper)

      expect(page.isLoading()).toBeTruthy()
    })

    it("shows an error modal when there is an error from the server", async () => {
      mockCommitMutation.mockResolvedValue(initialOfferFailedCannotOffer)
      let { wrapper } = getWrapper({
        CommerceOrder: () => testOffer,
      })
      let page = new OrderAppTestPage(wrapper)
      await page.setOfferAmount(16000)
      await page.clickSubmit()

      expect(mockCommitMutation).toHaveBeenCalled()
      expect(mockShowErrorDialog).lastCalledWith()
    })

    it("shows a helpful error message in a modal when there is an error from the server because the amount is invalid", async () => {
      mockCommitMutation.mockResolvedValue(initialOfferFailedAmountIsInvalid)
      let { wrapper } = getWrapper({
        CommerceOrder: () => testOffer,
      })
      let page = new OrderAppTestPage(wrapper)
      await page.setOfferAmount(16000)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "Invalid offer",
        message:
          "The offer amount is either missing or invalid. Please try again.",
      })
    })

    it("shows no modal warning when an offer made on work with hidden price", async () => {
      mockCommitMutation.mockResolvedValue(initialOfferSuccess)
      let { wrapper } = getWrapper({
        CommerceOrder: () => ({
          ...UntouchedOfferOrderPriceHidden,
          internalID: "1234",
          __isCommerceOrder: "",
          price: "",
        }),
      })
      let page = new OrderAppTestPage(wrapper)

      await page.setOfferAmount(2)
      await page.clickSubmit()
      expect(mockCommitMutation).toHaveBeenCalledTimes(1)
      expect(mockShowErrorDialog).not.toHaveBeenCalled()
    })

    it("jumps to the custom amount input if custom amount is invalid", async () => {
      let { wrapper } = getWrapper({
        CommerceOrder: () => testOffer,
      })
      let page = new OrderAppTestPage(wrapper)
      page.selectCustomAmount()

      await page.setOfferAmount(0)
      await page.clickSubmit()
      expect(mockJumpTo).toHaveBeenCalledWith("price-option-custom", {
        behavior: "smooth",
      })
    })

    describe("The 'amount too small' speed bump", () => {
      it("shows if the offer amount is too small", async () => {
        let { wrapper } = getWrapper({
          CommerceOrder: () => ({
            ...UntouchedOfferOrderMultipleEditionSets,
            internalID: "1234",
          }),
        })
        let page = new OrderAppTestPage(wrapper)
        await page.setOfferAmount(1000)
        await page.clickSubmit()

        expect(mockCommitMutation).not.toHaveBeenCalled()
        expect(mockShowErrorDialog).toHaveBeenCalledWith({
          title: "Offer may be too low",
          message:
            "Offers within 20% of the list price are most likely to receive a response.",
          continueButtonText: "OK",
        })
        expect(mockCommitMutation).not.toHaveBeenCalled()

        await page.clickSubmit()
        expect(mockCommitMutation).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe("Analytics", () => {
    it("tracks the offer input focus", () => {
      let { wrapper } = getWrapper({
        CommerceOrder: () => testOffer,
      })
      let page = new OrderAppTestPage(wrapper)

      expect(mockPostEvent).not.toHaveBeenCalled()
      page.selectCustomAmount()
      page.find("input").simulate("focus")

      expect(mockPostEvent).toHaveBeenLastCalledWith({
        action_type: "Focused on offer input",
        flow: "Make offer",
        order_id: "1234",
      })
    })

    it.skip("tracks viwing the low offer speedbump", async () => {
      const trackData = {
        action_type: "Viewed offer too low",
        flow: "Make offer",
        order_id: "1234",
      }
      let { wrapper } = getWrapper({
        CommerceOrder: () => testOffer,
      })
      let page = new OrderAppTestPage(wrapper)

      await page.setOfferAmount(1000)

      expect(mockPostEvent).not.toHaveBeenLastCalledWith(trackData)

      await page.clickSubmit()

      expect(mockPostEvent).toHaveBeenLastCalledWith(trackData)
    })
  })
})
