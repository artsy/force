import { BorderedRadio, Checkbox, Collapse } from "@artsy/palette"
import { PaymentTestQueryRawResponse } from "__generated__/PaymentTestQuery.graphql"
import {
  BuyOrderWithShippingDetails,
  BuyOrderWithBankDebitDetails,
  OfferOrderWithShippingDetails,
} from "Apps/__tests__/Fixtures/Order"
import { AddressForm } from "Components/AddressForm"
import { graphql } from "react-relay"
import { settingOrderPaymentFailed } from "../__fixtures__/MutationResults"
import { PaymentFragmentContainer } from "../Payment"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import { useSystemContext } from "System"
import { useTracking } from "react-tracking"
import { CreditCardPickerFragmentContainer } from "../../Components/CreditCardPicker"
import { BankDebitProvider } from "Components/BankDebitForm/BankDebitProvider"
import { useSetPayment } from "../../Mutations/useSetPayment"
import { CommercePaymentMethodEnum } from "__generated__/Payment_order.graphql"
import { MockBoot } from "DevTools"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { ReactWrapper } from "enzyme"
import { BankAccountPickerFragmentContainer } from "Apps/Order/Components/BankAccountPicker"

jest.unmock("react-tracking")
jest.unmock("react-relay")
jest.mock("Utils/Events", () => ({
  postEvent: jest.fn(),
}))

jest.mock("../../Mutations/useSetPayment", () => {
  const originalUseSetPayment = jest.requireActual(
    "../../Mutations/useSetPayment"
  )

  return {
    useSetPayment: jest
      .fn()
      .mockImplementation(originalUseSetPayment.useSetPayment),
  }
})

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
jest.mock(
  "Components/BankDebitForm/BankDebitProvider",
  // not sure why this is neccessary :(
  // should just work without this extra argument
  () => {
    return jest.requireActual("../../Components/__mocks__/BankDebitProvider")
  }
)
jest.mock("System/useSystemContext")
jest.mock("react-tracking")

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
const trackEvent = jest.fn()

const testOrder: PaymentTestQueryRawResponse["order"] = {
  ...BuyOrderWithShippingDetails,
  internalID: "1234",
}
const testOrderWithACH: PaymentTestQueryRawResponse["order"] = {
  ...BuyOrderWithBankDebitDetails,
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
          me={props.me}
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

  let wrapper

  beforeEach(() => {
    jest.clearAllMocks()
    const mockTracking = useTracking as jest.Mock
    mockTracking.mockImplementation(() => {
      return {
        trackEvent,
      }
    })
    isCommittingMutation = false
    wrapper = getWrapper({
      CommerceOrder: () => testOrder,
    })
  })

  it("shows processing payment interface while setting payment", async () => {
    isCommittingMutation = true
    let wrapper = getWrapper()
    let page = new PaymentTestPage(wrapper)

    expect(page.find("Processing payment")).toBeTruthy()
  })

  it("shows the default error modal when the payment picker throws an error", async () => {
    CreditCardPickerMock.useThrownError()
    let wrapper = getWrapper({
      CommerceOrder: () => testOrder,
    })
    let page = new PaymentTestPage(wrapper)
    await page.clickSubmit()

    expect(mockShowErrorDialog).toHaveBeenCalledWith()
  })

  it("shows a custom error modal with when the payment picker returns a normal error", async () => {
    CreditCardPickerMock.useErrorResult()
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
    CreditCardPickerMock.useInternalErrorResult()
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
        `"OfferCheckNavigate rightShippingCheckNavigate rightPaymentNavigate rightReviewNavigate right"`
      )
      expect(page.orderStepperCurrentStep).toBe("Payment")
    })
  })

  describe("stripe ACH enabled", () => {
    let page: PaymentTestPage
    let wrapper: ReactWrapper

    const achOrder = {
      ...testOrder,
      paymentMethod: "US_BANK_ACCOUNT",
      availablePaymentMethods: [
        "CREDIT_CARD",
        "US_BANK_ACCOUNT",
      ] as CommercePaymentMethodEnum[],
    }

    beforeEach(() => {
      wrapper = getWrapper({
        CommerceOrder: () => achOrder,
      })
      page = new PaymentTestPage(wrapper)
    })

    it("renders selection of payment methods", async () => {
      expect(page.text()).toContain("Credit card")
      expect(page.text()).toContain("Bank transfer")
    })

    it("renders credit card element when credit card is chosen as payment method", async () => {
      page.selectPaymentMethod("CreditCard")

      const creditCardCollapse = page
        .find(CreditCardPickerFragmentContainer)
        .closest(Collapse)
      expect(creditCardCollapse.first().props().open).toBe(true)
      const bankDebitCollapse = page.find(BankDebitProvider).closest(Collapse)
      expect(bankDebitCollapse.first().props().open).toBe(false)
    })

    it("renders bank element when bank transfer is chosen as payment method", async () => {
      page.selectPaymentMethod("USBankAccount")
      const creditCardCollapse = page
        .find(CreditCardPickerFragmentContainer)
        .closest(Collapse)
      expect(creditCardCollapse.first().props().open).toBe(false)
      const bankDebitCollapse = page
        .find(BankAccountPickerFragmentContainer)
        .closest(Collapse)
      expect(bankDebitCollapse.first().props().open).toBe(true)
    })

    it("renders description body for bank transfer when selected", async () => {
      page.selectPaymentMethod("USBankAccount")

      expect(page.text()).toContain("• Bank transfer is powered by Stripe.")
      expect(page.text()).toContain(
        "• If you can not find your bank, please check your spelling or choose"
      )
      expect(page.text()).toContain(
        "• Search for your bank institution or select from the options below."
      )
    })
  })

  describe("wire transfer enabled", () => {
    let page

    const wireOrder = {
      ...testOrder,
      availablePaymentMethods: [
        "CREDIT_CARD",
        "WIRE_TRANSFER",
      ] as CommercePaymentMethodEnum[],
    }

    beforeAll(() => {
      const wrapper = getWrapper({
        CommerceOrder: () => wireOrder,
      })

      page = new PaymentTestPage(wrapper)
    })

    it("renders wire tranfer as option for eligible partners", async () => {
      expect(page.text()).toContain("Wire transfer")
    })

    it("does not preselect wire transfer as the payment method", async () => {
      expect(page.find(BorderedRadio).at(1).prop("selected")).toBeFalsy()
    })

    it("renders description body for wire transfer when selected", async () => {
      await page.selectPaymentMethod("WireTransfer")

      expect(page.text()).toContain(
        "• To pay by wire transfer, complete checkout"
      )
      expect(page.text()).toContain(
        "• Please inform your bank that you will be responsible"
      )
    })

    it("transitions to review step when wire transfer is chosen", async () => {
      await page.selectPaymentMethod("CreditCard")
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

      await page.selectPaymentMethod("WireTransfer")
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

  describe("tracking", () => {
    let page

    const order = {
      ...testOrderWithACH,
      availablePaymentMethods: [
        "US_BANK_ACCOUNT",
        "CREDIT_CARD",
        "WIRE_TRANSFER",
      ] as CommercePaymentMethodEnum[],
    }

    beforeAll(() => {
      const wrapper = getWrapper({
        CommerceOrder: () => order,
      })

      page = new PaymentTestPage(wrapper)
    })

    it("tracks the initially-selected payment method on load like any other selection", async () => {
      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedPaymentMethod",
        amount: "$12,000",
        context_page_owner_type: "orders-payment",
        currency: "USD",
        flow: "BUY",
        order_id: "1234",
        payment_method: "US_BANK_ACCOUNT",
        subject: "click_payment_method",
      })
    })

    it("tracks when the user selects the ACH payment method", () => {
      page.selectPaymentMethod(1)
      page.selectPaymentMethod(0)

      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedPaymentMethod",
        amount: "$12,000",
        context_page_owner_type: "orders-payment",
        currency: "USD",
        flow: "BUY",
        order_id: "1234",
        payment_method: "US_BANK_ACCOUNT",
        subject: "click_payment_method",
      })
    })

    it("tracks when the user selects Credit Card payment method", () => {
      page.selectPaymentMethod(1)

      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedPaymentMethod",
        amount: "$12,000",
        context_page_owner_type: "orders-payment",
        currency: "USD",
        flow: "BUY",
        order_id: "1234",
        payment_method: "CREDIT_CARD",
        subject: "click_payment_method",
      })
    })

    it("tracks when the user selects Wire payment method", () => {
      page.selectPaymentMethod(2)

      expect(trackEvent).toHaveBeenCalledWith({
        action: "clickedPaymentMethod",
        amount: "$12,000",
        context_page_owner_type: "orders-payment",
        currency: "USD",
        flow: "BUY",
        order_id: "1234",
        payment_method: "WIRE_TRANSFER",
        subject: "click_payment_method",
      })
    })
  })
})
