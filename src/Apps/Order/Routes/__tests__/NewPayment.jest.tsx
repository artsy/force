import { NewPaymentTestQuery$rawResponse } from "__generated__/NewPaymentTestQuery.graphql"
import {
  OfferOrderWithShippingDetails,
  OfferWithTotals,
} from "Apps/__tests__/Fixtures/Order"
import { DateTime } from "luxon"
import { graphql } from "react-relay"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import { mockLocation } from "DevTools/mockLocation"
import { mockStripe } from "DevTools/mockStripe"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { MockBoot } from "DevTools/MockBoot"
import { NewPaymentFragmentContainer } from "Apps/Order/Routes/NewPayment"
import {
  fixFailedPaymentSuccess,
  fixFailedPaymentInsufficientInventoryFailure,
  fixFailedPaymentFailure,
  fixFailedPaymentWithActionRequired,
} from "Apps/Order/Routes/__fixtures__/MutationResults/fixFailedPayment"

jest.unmock("react-tracking")
jest.unmock("react-relay")
jest.mock("Utils/Events", () => ({
  postEvent: jest.fn(),
}))

jest.mock("@stripe/stripe-js", () => {
  let mock = null
  return {
    loadStripe: () => {
      if (mock === null) {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        mock = mockStripe()
      }
      return mock
    },
    _mockStripe: () => mock,
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    _mockReset: () => (mock = mockStripe()),
  }
})

const { _mockStripe } = require("@stripe/stripe-js")

const CreditCardPickerMock = jest.requireActual(
  "../../Components/__mocks__/CreditCardPicker"
)

jest.mock(
  "Apps/Order/Components/CreditCardPicker",
  // not sure why this is neccessary :(
  // should just work without this extra argument
  () => {
    return jest.requireActual("../../Components/__mocks__/CreditCardPicker")
  }
)

const realSetInterval = global.setInterval

jest.mock("Utils/getCurrentTimeAsIsoString")
const NOW = "2018-12-05T13:47:16.446Z"
require("Utils/getCurrentTimeAsIsoString").__setCurrentTime(NOW)

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

const testOrder: NewPaymentTestQuery$rawResponse["order"] = {
  ...OfferOrderWithShippingDetails,
  internalID: "1234",
  state: "SUBMITTED",
  stateExpiresAt: DateTime.fromISO(NOW).plus({ days: 1 }).toString(),
  lastOffer: {
    ...OfferWithTotals,
    createdAt: DateTime.fromISO(NOW).minus({ days: 1 }).toString(),
  },
}

describe("Payment", () => {
  const pushMock = jest.fn()
  let isCommittingMutation

  beforeAll(() => {
    window.sd = { STRIPE_PUBLISHABLE_KEY: "" }
  })

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => (
      <MockBoot>
        {/* @ts-ignore */}
        <NewPaymentFragmentContainer
          router={{ push: pushMock } as any}
          route={{ onTransition: jest.fn() } as any}
          order={props.order}
          // @ts-ignore
          isCommittingMutation={isCommittingMutation}
        />
      </MockBoot>
    ),
    query: graphql`
      query NewPaymentTestQuery @raw_response_type @relay_test_operation {
        me {
          ...NewPayment_me
        }
        order: commerceOrder(id: "unused") {
          ...NewPayment_order
        }
      }
    `,
  })

  beforeEach(() => {
    jest.clearAllMocks()
    mockLocation()
    isCommittingMutation = false
    global.setInterval = jest.fn()
  })

  afterEach(() => {
    global.setInterval = realSetInterval
  })

  it("shows the countdown timer", async () => {
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
  })

  it("shows the button spinner while loading the mutation", async () => {
    isCommittingMutation = true
    let { wrapper } = getWrapper()
    let page = new OrderAppTestPage(wrapper)

    expect(page.isLoading()).toBeTruthy()
  })

  it("commits fixFailedPayment mutation with Gravity credit card id", async () => {
    let { wrapper } = getWrapper({ CommerceOrder: () => testOrder })
    let page = new OrderAppTestPage(wrapper)
    await page.clickSubmit()

    expect(mockCommitMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          input: {
            creditCardId: "credit-card-id",
            offerId: "myoffer-id",
            orderId: "1234",
          },
        },
      })
    )
  })

  it("takes the user to the status page", async () => {
    mockCommitMutation.mockResolvedValue(fixFailedPaymentSuccess)
    let { wrapper } = getWrapper({ CommerceOrder: () => testOrder })
    let page = new OrderAppTestPage(wrapper)
    await page.clickSubmit()

    expect(pushMock).toHaveBeenCalledWith("/orders/1234/status")
  })

  it("does not do anything when there are form errors", async () => {
    let { wrapper } = getWrapper({ CommerceOrder: () => testOrder })
    let page = new OrderAppTestPage(wrapper)
    CreditCardPickerMock.useInvalidFormResult()
    await page.clickSubmit()

    expect(mockShowErrorDialog).not.toHaveBeenCalled()
  })

  it("shows the default error modal when the payment picker throws an error", async () => {
    CreditCardPickerMock.useThrownError()
    let { wrapper } = getWrapper({ CommerceOrder: () => testOrder })
    let page = new OrderAppTestPage(wrapper)

    await page.clickSubmit()
    expect(mockShowErrorDialog).toHaveBeenCalledWith()
  })

  it("shows an error modal and redirects to artist page when not enough inventory", async () => {
    mockCommitMutation.mockResolvedValueOnce(
      fixFailedPaymentInsufficientInventoryFailure
    )
    let { wrapper } = getWrapper({ CommerceOrder: () => testOrder })
    let page = new OrderAppTestPage(wrapper)
    await page.clickSubmit()

    expect(mockShowErrorDialog).toHaveBeenCalledWith({
      title: "Not available",
      message: "Sorry, the work is no longer available.",
    })
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    const artworkId = testOrder.lineItems.edges[0].node.artwork.slug
    expect(pushMock).toHaveBeenCalledWith(`/artwork/${artworkId}`)
  })

  it("shows a custom error modal with when the payment picker returns a normal error", async () => {
    CreditCardPickerMock.useErrorResult()
    let { wrapper } = getWrapper({ CommerceOrder: () => testOrder })
    let page = new OrderAppTestPage(wrapper)
    await page.clickSubmit()

    expect(mockShowErrorDialog).toHaveBeenCalledWith({
      title: "This is the description of an error.",
      message:
        "Please enter another payment method or contact your bank for more information.",
    })
  })

  it("shows an error modal with the title 'An internal error occurred' and the default message when the payment picker returns an error with the type 'internal_error'", async () => {
    CreditCardPickerMock.useInternalErrorResult()
    let { wrapper } = getWrapper({ CommerceOrder: () => testOrder })
    let page = new OrderAppTestPage(wrapper)
    await page.clickSubmit()

    expect(mockShowErrorDialog).toHaveBeenCalledWith({
      title: "An internal error occurred",
    })
  })

  it("shows an error modal when fixing the failed payment fails", async () => {
    mockCommitMutation.mockResolvedValueOnce(fixFailedPaymentFailure)
    let { wrapper } = getWrapper({ CommerceOrder: () => testOrder })
    let page = new OrderAppTestPage(wrapper)
    await page.clickSubmit()

    expect(mockShowErrorDialog).toHaveBeenCalledWith({
      title: "Charge failed",
      message:
        "Payment has been declined. Please contact your card provider or bank institution, then press “Continue” again. Alternatively, use another payment method.",
    })
  })

  it("shows an error modal when there is a network error", async () => {
    mockCommitMutation.mockRejectedValue({})
    let { wrapper } = getWrapper({ CommerceOrder: () => testOrder })
    let page = new OrderAppTestPage(wrapper)
    await page.clickSubmit()

    expect(mockShowErrorDialog).toHaveBeenCalledWith()
  })

  it("shows SCA modal when required", async () => {
    mockCommitMutation.mockResolvedValue(fixFailedPaymentWithActionRequired)
    let { wrapper } = getWrapper({ CommerceOrder: () => testOrder })
    let page = new OrderAppTestPage(wrapper)
    await page.clickSubmit()

    expect(_mockStripe().handleCardAction).toBeCalledWith("client-secret")
  })
})
