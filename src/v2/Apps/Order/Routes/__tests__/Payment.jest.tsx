import { BorderedRadio, Checkbox, Collapse } from "@artsy/palette"
import { PaymentTestQueryRawResponse } from "v2/__generated__/PaymentTestQuery.graphql"
import {
  BuyOrderWithShippingDetails,
  OfferOrderWithShippingDetails,
} from "v2/Apps/__tests__/Fixtures/Order"
import { AddressForm } from "v2/Components/AddressForm"
import { graphql } from "react-relay"
import { settingOrderPaymentFailed } from "../__fixtures__/MutationResults"
import { PaymentFragmentContainer } from "../Payment"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import { useSystemContext, useTracking } from "v2/System"
import { useFeatureFlag } from "v2/System/useFeatureFlag"
import { PaymentPickerFragmentContainer } from "../../Components/PaymentPicker"
import { BankDebitProvider } from "v2/Components/BankDebitForm/BankDebitProvider"
import { useSetPayment } from "../../Components/Mutations/useSetPayment"
import { CommercePaymentMethodEnum } from "v2/__generated__/Payment_order.graphql"
import { MockBoot } from "v2/DevTools"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"

jest.unmock("react-tracking")
jest.unmock("react-relay")
jest.mock("v2/Utils/Events", () => ({
  postEvent: jest.fn(),
}))

jest.mock("../../Components/Mutations/useSetPayment", () => {
  const originalUseSetPayment = jest.requireActual(
    "../../Components/Mutations/useSetPayment"
  )

  return {
    useSetPayment: jest
      .fn()
      .mockImplementation(originalUseSetPayment.useSetPayment),
  }
})

const paymentPickerMock = jest.requireActual(
  "../../Components/__mocks__/PaymentPicker"
)

jest.mock(
  "v2/Apps/Order/Components/PaymentPicker",
  // not sure why this is neccessary :(
  // should just work without this extra argument
  () => {
    return jest.requireActual("../../Components/__mocks__/PaymentPicker")
  }
)
jest.mock(
  "v2/Components/BankDebitForm/BankDebitProvider",
  // not sure why this is neccessary :(
  // should just work without this extra argument
  () => {
    return jest.requireActual("../../Components/__mocks__/BankDebitProvider")
  }
)
jest.mock("v2/System/useSystemContext")
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
const trackEvent = jest.fn()

const testOrder: PaymentTestQueryRawResponse["order"] = {
  ...BuyOrderWithShippingDetails,
  internalID: "1234",
}

class PaymentTestPage extends OrderAppTestPage {
  get nameInput() {
    return this.find("input[placeholder='Add full name']")
  }

  get sameAddressCheckbox() {
    return this.find(Checkbox)
  }

  get addressForm() {
    return this.find(AddressForm)
  }

  async toggleSameAddressCheckbox() {
    this.sameAddressCheckbox.simulate("click")
    await this.update()
  }

  setName(name: string) {
    ;(this.nameInput.instance() as any).value = name
    this.nameInput.simulate("change")
  }
}

describe("Payment", () => {
  const pushMock = jest.fn()
  let isCommittingMutation

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => (
      <MockBoot>
        <PaymentFragmentContainer
          router={{ push: pushMock } as any}
          order={props.order}
          // @ts-ignore
          isCommittingMutation={isCommittingMutation}
        />
      </MockBoot>
    ),
    query: graphql`
      query PaymentTestQuery @raw_response_type @relay_test_operation {
        me {
          ...Payment_me
        }
        order: commerceOrder(id: "unused") {
          ...Payment_order
        }
      }
    `,
  })

  beforeAll(() => {
    ;(useSystemContext as jest.Mock).mockImplementation(() => {
      return {
        featureFlags: {
          stripe_ACH: {
            flagEnabled: false,
          },
        },
        mediator: {
          on: jest.fn(),
          off: jest.fn(),
          ready: jest.fn(),
          trigger: jest.fn(),
        },
      }
    })
  })

  beforeEach(() => {
    jest.clearAllMocks()
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    isCommittingMutation = false
  })

  it("shows the button spinner while loading the mutation", async () => {
    isCommittingMutation = true
    let wrapper = getWrapper()
    let page = new PaymentTestPage(wrapper)

    expect(page.isLoading()).toBeTruthy()
  })

  it("shows the default error modal when the payment picker throws an error", async () => {
    paymentPickerMock.useThrownError()
    let wrapper = getWrapper({
      CommerceOrder: () => testOrder,
    })
    let page = new PaymentTestPage(wrapper)
    await page.clickSubmit()

    expect(mockShowErrorDialog).toHaveBeenCalledWith()
  })

  it("shows a custom error modal with when the payment picker returns a normal error", async () => {
    paymentPickerMock.useErrorResult()
    let wrapper = getWrapper({
      CommerceOrder: () => testOrder,
    })
    let page = new PaymentTestPage(wrapper)
    await page.clickSubmit()

    expect(mockShowErrorDialog).toHaveBeenCalledWith({
      title: "This is the description of an error.",
      message:
        "Please enter another payment method or contact your bank for more information.",
    })
  })

  it("shows an error modal with the title 'An internal error occurred' and the default message when the payment picker returns an error with the type 'internal_error'", async () => {
    paymentPickerMock.useInternalErrorResult()
    let wrapper = getWrapper({
      CommerceOrder: () => testOrder,
    })
    let page = new PaymentTestPage(wrapper)
    await page.clickSubmit()

    expect(mockShowErrorDialog).toHaveBeenCalledWith({
      title: "An internal error occurred",
    })
  })

  it("commits setOrderPayment mutation with the credit card id", async () => {
    let wrapper = getWrapper({
      CommerceOrder: () => testOrder,
    })
    let page = new PaymentTestPage(wrapper)
    await page.clickSubmit()

    expect(mockCommitMutation).toHaveBeenCalledWith(
      expect.objectContaining({
        variables: {
          input: {
            paymentMethod: "CREDIT_CARD",
            paymentMethodId: "credit-card-id",
            id: "1234",
          },
        },
      })
    )
  })

  it("takes the user to the review step", async () => {
    mockCommitMutation.mockResolvedValue({})
    let wrapper = getWrapper({
      CommerceOrder: () => testOrder,
    })
    let page = new PaymentTestPage(wrapper)
    await page.clickSubmit()

    expect(pushMock).toHaveBeenCalledWith("/orders/1234/review")
  })

  it("shows an error modal when there is an error in SetOrderPaymentPayload", async () => {
    mockCommitMutation.mockResolvedValue(settingOrderPaymentFailed)
    let wrapper = getWrapper({
      CommerceOrder: () => testOrder,
    })
    let page = new PaymentTestPage(wrapper)
    await page.clickSubmit()

    expect(mockShowErrorDialog).toHaveBeenCalledWith()
  })

  it("shows an error modal when there is a network error", async () => {
    mockCommitMutation.mockRejectedValue({})
    let wrapper = getWrapper({
      CommerceOrder: () => testOrder,
    })
    let page = new PaymentTestPage(wrapper)
    await page.clickSubmit()

    expect(mockShowErrorDialog).toHaveBeenCalledWith()
  })

  describe("Offer-mode orders", () => {
    it("shows an active offer stepper if the order is an Offer Order", async () => {
      let wrapper = getWrapper({
        CommerceOrder: () => OfferOrderWithShippingDetails,
      })
      let page = new PaymentTestPage(wrapper)

      expect(page.orderStepper.text()).toMatchInlineSnapshot(
        `"CheckOfferNavigate rightCheckShippingNavigate rightPaymentNavigate rightReview"`
      )
      expect(page.orderStepperCurrentStep).toBe("Payment")
    })
  })

  describe("stripe ACH enabled", () => {
    let achOrder

    beforeAll(() => {
      ;(useSystemContext as jest.Mock).mockImplementation(() => {
        return {
          featureFlags: {
            stripe_ACH: {
              flagEnabled: true,
            },
          },
          mediator: {
            on: jest.fn(),
            off: jest.fn(),
            ready: jest.fn(),
            trigger: jest.fn(),
          },
        }
      })

      achOrder = {
        ...testOrder,
        availablePaymentMethods: [
          "CREDIT_CARD",
          "US_BANK_ACCOUNT",
        ] as CommercePaymentMethodEnum[],
      }
    })

    it("renders selection of payment methods", async () => {
      let wrapper = getWrapper({
        CommerceOrder: () => achOrder,
      })
      let page = new PaymentTestPage(wrapper)

      expect(page.text()).toContain("Credit card")
      expect(page.text()).toContain("Bank transfer")
    })

    it("tracks when the user selects the credit card payment method", async () => {
      let wrapper = getWrapper({
        CommerceOrder: () => achOrder,
      })
      let page = new PaymentTestPage(wrapper)
      page.selectPaymentMethod(1)

      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedChangePaymentMethod",
        amount: "$12,000",
        context_page_owner_type: "orders-payment",
        currency: "USD",
        flow: "BUY",
        order_id: "1234",
        payment_method: "CREDIT_CARD",
        subject: "click_payment_method",
      })
    })

    it("tracks when the user selects the bank payment method", async () => {
      let wrapper = getWrapper({
        CommerceOrder: () => achOrder,
      })
      let page = new PaymentTestPage(wrapper)
      page.selectPaymentMethod(0)

      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedChangePaymentMethod",
        amount: "$12,000",
        context_page_owner_type: "orders-payment",
        currency: "USD",
        flow: "BUY",
        order_id: "1234",
        payment_method: "US_BANK_ACCOUNT",
        subject: "click_payment_method",
      })
    })

    it("renders credit card element when credit card is chosen as payment method", async () => {
      let wrapper = getWrapper({
        CommerceOrder: () => achOrder,
      })
      let page = new PaymentTestPage(wrapper)
      page.selectPaymentMethod(1)

      const creditCardCollapse = page
        .find(PaymentPickerFragmentContainer)
        .closest(Collapse)
      expect(creditCardCollapse.first().props().open).toBe(true)
      const bankDebitCollapse = page.find(BankDebitProvider).closest(Collapse)
      expect(bankDebitCollapse.first().props().open).toBe(false)
    })

    it("renders bank element when bank transfer is chosen as payment method", async () => {
      let wrapper = getWrapper({
        CommerceOrder: () => achOrder,
      })
      let page = new PaymentTestPage(wrapper)
      page.selectPaymentMethod(0)

      const creditCardCollapse = page
        .find(PaymentPickerFragmentContainer)
        .closest(Collapse)
      expect(creditCardCollapse.first().props().open).toBe(false)
      const bankDebitCollapse = page.find(BankDebitProvider).closest(Collapse)
      expect(bankDebitCollapse.first().props().open).toBe(true)
    })

    // Ran in to the error when following `createTestEnv`
    // Invariant Violation: commitMutation: expected "environment" to be an instance of "RelayModernEnvironment"
    it.todo("creates a bank debit setup")
  })

  describe("wire transfer enabled", () => {
    beforeAll(() => {
      ;(useSystemContext as jest.Mock).mockImplementation(() => {
        return {
          featureFlags: {
            wire_transfer: {
              flagEnabled: true,
            },
          },
          mediator: {
            on: jest.fn(),
            off: jest.fn(),
            ready: jest.fn(),
            trigger: jest.fn(),
          },
        }
      })
    })

    it("returns true when wire_transfer is enabled", () => {
      const result = useFeatureFlag("wire_transfer")
      expect(result).toBe(true)
    })

    it("does not render wire tranfer as option for uneligible partners", async () => {
      let wrapper = getWrapper({
        CommerceOrder: () => testOrder,
      })
      let page = new PaymentTestPage(wrapper)
      expect(page.text()).not.toContain("Wire transfer")
    })

    it("preselects payment method from the order", async () => {
      const order = {
        ...testOrder,
        paymentMethod: "WIRE_TRANSFER" as CommercePaymentMethodEnum,
        availablePaymentMethods: [
          "CREDIT_CARD",
          "WIRE_TRANSFER",
        ] as CommercePaymentMethodEnum[],
      }
      let wrapper = getWrapper({
        CommerceOrder: () => order,
      })
      let page = new PaymentTestPage(wrapper)

      expect(page.find(BorderedRadio).at(1).prop("selected")).toBeTruthy()
    })

    it("renders wire transfer as option for eligible partners", async () => {
      const order = {
        ...testOrder,
        availablePaymentMethods: [
          "CREDIT_CARD",
          "WIRE_TRANSFER",
        ] as CommercePaymentMethodEnum[],
      }
      let wrapper = getWrapper({
        CommerceOrder: () => order,
      })
      let page = new PaymentTestPage(wrapper)

      expect(page.text()).toContain("Wire transfer")
    })

    it("tracks when the user selects the wire transfer method", async () => {
      const order = {
        ...testOrder,
        availablePaymentMethods: [
          "CREDIT_CARD",
          "WIRE_TRANSFER",
        ] as CommercePaymentMethodEnum[],
      }
      let wrapper = getWrapper({
        CommerceOrder: () => order,
      })
      let page = new PaymentTestPage(wrapper)
      page.selectPaymentMethod(1)

      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedChangePaymentMethod",
        amount: "$12,000",
        context_page_owner_type: "orders-payment",
        currency: "USD",
        flow: "BUY",
        order_id: "1234",
        payment_method: "WIRE_TRANSFER",
        subject: "click_payment_method",
      })
    })

    it("transitions to review step when wire transfer is chosen", async () => {
      const submitMutationMock = jest.fn().mockResolvedValue({
        commerceSetPayment: {
          orderOrError: {
            id: 1234,
          },
        },
      })
      ;(useSetPayment as jest.Mock).mockImplementation(() => ({
        submitMutation: submitMutationMock,
      }))

      const order = {
        ...testOrder,
        availablePaymentMethods: [
          "CREDIT_CARD",
          "WIRE_TRANSFER",
        ] as CommercePaymentMethodEnum[],
      }

      let wrapper = getWrapper({
        CommerceOrder: () => order,
      })
      let page = new PaymentTestPage(wrapper)
      await page.selectPaymentMethod(1)
      await page.clickSubmit()

      expect(submitMutationMock).toHaveBeenCalledWith({
        variables: {
          input: {
            id: "1234",
            paymentMethod: "WIRE_TRANSFER",
          },
        },
      })
      expect(pushMock).toHaveBeenCalledWith("/orders/1234/review")
    })
  })
})
