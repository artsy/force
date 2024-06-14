import { BorderedRadio, Checkbox } from "@artsy/palette"
import { Collapse } from "Apps/Order/Components/Collapse"
import { PaymentTestQuery$rawResponse } from "__generated__/PaymentTestQuery.graphql"
import {
  BuyOrderWithShippingDetails,
  PrivateSaleOrderWithShippingDetails,
  BuyOrderWithBankDebitDetails,
  OfferOrderWithShippingDetails,
} from "Apps/__tests__/Fixtures/Order"
import { AddressForm } from "Components/Address/AddressForm"
import { graphql } from "react-relay"
import { PaymentFragmentContainer } from "Apps/Order/Routes/Payment"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { useTracking } from "react-tracking"
import { CreditCardPickerFragmentContainer } from "Apps/Order/Components/CreditCardPicker"
import { useSetPayment } from "Apps/Order/Mutations/useSetPayment"
import { CommercePaymentMethodEnum } from "__generated__/Payment_order.graphql"
import { MockBoot } from "DevTools/MockBoot"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { BankAccountPickerFragmentContainer } from "Apps/Order/Components/BankAccountPicker"
import { useOrderPaymentContext } from "Apps/Order/Routes/Payment/PaymentContext/OrderPaymentContext"
import { settingOrderPaymentFailed } from "Apps/Order/Routes/__fixtures__/MutationResults/setOrderPayment"

jest.unmock("react-tracking")
jest.unmock("react-relay")
jest.mock("Utils/Events", () => ({
  postEvent: jest.fn(),
}))

jest.mock("Apps/Order/Hooks/useStripePaymentBySetupIntentId", () => ({
  useStripePaymentBySetupIntentId: jest.fn(() => {
    return {
      isProcessingRedirect: false,
      stripeSetupIntentId: "stripeSetupIntentId",
      isPaymentSetupSuccessful: true,
    }
  }),
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
jest.mock("System/Hooks/useSystemContext")
jest.mock("react-tracking")
jest.mock("../Payment/PaymentContext/OrderPaymentContext")

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

const mockJumpTo = jest.fn()
jest.mock("Utils/Hooks/useJump", () => ({
  useJump: () => ({ jumpTo: mockJumpTo }),
  Jump: () => null,
}))

const testOrder: PaymentTestQuery$rawResponse["order"] = {
  ...BuyOrderWithShippingDetails,
  availablePaymentMethods: [
    "CREDIT_CARD",
    "WIRE_TRANSFER",
  ] as CommercePaymentMethodEnum[],
  internalID: "1234",
}

const testOrderWithACH: PaymentTestQuery$rawResponse["order"] = {
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
  const mockSetIsSavingPayment = jest.fn()
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
      return {}
    })
  })

  describe("with Credit Card", () => {
    let page: PaymentTestPage

    beforeEach(() => {
      jest.clearAllMocks()
      ;(useOrderPaymentContext as jest.Mock).mockImplementation(() => {
        return {
          selectedPaymentMethod: "CREDIT_CARD",
          setIsSavingPayment: mockSetIsSavingPayment,
          setSelectedPaymentMethod: jest.fn(),
        }
      })
      const mockTracking = useTracking as jest.Mock
      mockTracking.mockImplementation(() => {
        return {
          trackEvent,
        }
      })
      isCommittingMutation = false
      const { wrapper } = getWrapper({
        CommerceOrder: () => testOrder,
      })
      page = new PaymentTestPage(wrapper)
    })

    it("renders credit card element when credit card is chosen as payment method", () => {
      const creditCardCollapse = page
        .find(CreditCardPickerFragmentContainer)
        .closest(Collapse)
      expect(creditCardCollapse.first().props().open).toBe(true)
    })

    it("shows saving payment preferences interface while setting payment", () => {
      isCommittingMutation = true
      expect(page.find("Saving payment preferences")).toBeTruthy()
    })

    it("shows the default error modal when the payment picker throws an error", async () => {
      CreditCardPickerMock.useThrownError()
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith()
    })

    it("shows a custom error modal with when the payment picker returns a normal error", async () => {
      CreditCardPickerMock.useErrorResult()
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "This is the description of an error.",
        message:
          "Please enter another payment method or contact your bank for more information.",
      })
    })

    it("shows an error modal with the title 'An internal error occurred' and the default message when the payment picker returns an error with the type 'internal_error'", async () => {
      CreditCardPickerMock.useInternalErrorResult()
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "An internal error occurred",
      })
    })

    it("scrolls to top of address form when payment picker returns 'invalid_form'", async () => {
      CreditCardPickerMock.useInvalidFormResult()
      await page.clickSubmit()

      expect(mockJumpTo).toHaveBeenCalled()
    })

    it("tracks when the user selects Credit Card payment method", async () => {
      await page.selectPaymentMethod("CreditCard")

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

    it("commits setOrderPayment mutation with the credit card id", async () => {
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

    it("terminates spinner and takes the user to the review step", async () => {
      mockCommitMutation.mockResolvedValue({})
      await page.clickSubmit()
      expect(mockSetIsSavingPayment).toHaveBeenCalledWith(true)

      await flushPromiseQueue()

      expect(mockSetIsSavingPayment).toHaveBeenCalledWith(false)
      expect(pushMock).toHaveBeenCalledWith("/orders/1234/review")
    })

    it("shows an error modal when there is an error in SetOrderPaymentPayload", async () => {
      mockCommitMutation.mockResolvedValue(settingOrderPaymentFailed)
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith()
    })

    it("shows an error modal when there is a network error", async () => {
      mockCommitMutation.mockRejectedValue({})
      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith()
    })
  })

  describe("Offer-mode orders", () => {
    let page: PaymentTestPage

    beforeEach(() => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => OfferOrderWithShippingDetails,
      })
      page = new PaymentTestPage(wrapper)
    })

    it("shows an active offer stepper if the order is an Offer Order", () => {
      expect(page.orderStepper.text()).toMatchInlineSnapshot(
        `"OfferShippingPaymentReview"`
      )
      expect(page.orderStepperCurrentStep).toBe("Payment")
    })
  })

  describe("bank transfer enabled", () => {
    let page: PaymentTestPage

    const achOrder = {
      ...testOrderWithACH,
      paymentMethod: "US_BANK_ACCOUNT",
      availablePaymentMethods: [
        "CREDIT_CARD",
        "US_BANK_ACCOUNT",
      ] as CommercePaymentMethodEnum[],
    }

    beforeEach(() => {
      jest.clearAllMocks()
      ;(useOrderPaymentContext as jest.Mock).mockImplementation(() => {
        return {
          selectedPaymentMethod: "US_BANK_ACCOUNT",
          setSelectedPaymentMethod: jest.fn(),
          setBankAccountSelection: jest.fn(),
          setIsSavingPayment: jest.fn(),
        }
      })
      isCommittingMutation = false

      const { wrapper } = getWrapper({
        CommerceOrder: () => achOrder,
      })
      page = new PaymentTestPage(wrapper)
    })

    it("renders selection of payment methods", () => {
      expect(page.text()).toContain("Credit card")
      expect(page.text()).toContain("Bank transfer")
    })

    it("renders correct copy for ACH radio button description", () => {
      expect(page.text()).toContain("US bank account only")
    })

    it("tracks the initially-selected payment method on load like any other selection", () => {
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

    it("renders bank element when ACH is chosen as payment method", () => {
      const creditCardCollapse = page
        .find(CreditCardPickerFragmentContainer)
        .closest(Collapse)
      expect(creditCardCollapse.first().props().open).toBe(false)

      const bankDebitCollapse = page
        .find(BankAccountPickerFragmentContainer)
        .closest(Collapse)

      expect(bankDebitCollapse.first().props().open).toBe(true)
    })

    it("renders description body for bank transfer", () => {
      expect(page.text()).toContain(
        "• Payment processing will take 4-7 business days once the gallery accepts the order."
      )
      expect(page.text()).toContain("• Bank transfer is powered by Stripe.")
      expect(page.text()).toContain(
        "• If you can not find your bank, please check your spelling or choose"
      )
      expect(page.text()).toContain(
        "• Search for your bank institution or select from the options below."
      )
    })

    it("tracks when the user selects the ACH payment method", async () => {
      await page.selectPaymentMethod("CreditCard")
      await page.selectPaymentMethod("USBankAccount")

      expect(trackEvent).toHaveBeenLastCalledWith({
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
  })

  describe("only bank transfer enabled", () => {
    let page: PaymentTestPage

    const bankOrder = {
      ...testOrder,
      availablePaymentMethods: [
        "US_BANK_ACCOUNT",
      ] as CommercePaymentMethodEnum[],
    }

    beforeEach(() => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => bankOrder,
      })
      page = new PaymentTestPage(wrapper)
    })

    it("renders bank transfer title", () => {
      expect(page.text()).toContain("Bank transfer payment details")
    })
  })

  describe("SEPA bank transfer enabled", () => {
    let page: PaymentTestPage

    const sepaOrder = {
      ...testOrder,
      paymentMethod: "SEPA_DEBIT",
      availablePaymentMethods: [
        "CREDIT_CARD",
        "SEPA_DEBIT",
      ] as CommercePaymentMethodEnum[],
    }

    beforeEach(() => {
      jest.clearAllMocks()
      ;(useOrderPaymentContext as jest.Mock).mockImplementation(() => {
        return {
          selectedPaymentMethod: "SEPA_DEBIT",
          setSelectedPaymentMethod: jest.fn(),
          setBankAccountSelection: jest.fn(),
          setIsSavingPayment: jest.fn(),
        }
      })
      isCommittingMutation = false

      const { wrapper } = getWrapper({
        CommerceOrder: () => sepaOrder,
      })
      page = new PaymentTestPage(wrapper)
    })

    it("renders selection of payment methods", () => {
      expect(page.text()).toContain("SEPA bank transfer")
      expect(page.text()).toContain("Credit card")
    })

    it("renders bank element when SEPA is chosen as payment method", () => {
      const creditCardCollapse = page
        .find(CreditCardPickerFragmentContainer)
        .closest(Collapse)
      expect(creditCardCollapse.first().props().open).toBe(false)

      const bankDebitCollapse = page
        .find(BankAccountPickerFragmentContainer)
        .closest(Collapse)
      expect(bankDebitCollapse.first().props().open).toBe(true)
    })

    it("renders description body for SEPA when selected", () => {
      expect(page.text()).toContain("• Bank transfer is powered by Stripe.")
      expect(page.text()).toContain(
        "• Enter your billing address in the form below."
      )
      expect(page.text()).toContain(
        "• Your bank account must be denominated in EUR and located in one of the SEPA countries."
      )
      expect(page.text()).toContain(
        "• Once your order is accepted, please allow 7-10 business days for processing your payment. After processing, your order will be prepared for pickup or packed and shipped, depending on your chosen delivery type."
      )
    })

    it("tracks when the user selects SEPA payment method", async () => {
      await page.selectPaymentMethod("SEPADebit")

      expect(trackEvent).toHaveBeenLastCalledWith({
        action: "clickedPaymentMethod",
        amount: "$12,000",
        context_page_owner_type: "orders-payment",
        currency: "USD",
        flow: "BUY",
        order_id: "1234",
        payment_method: "SEPA_DEBIT",
        subject: "click_payment_method",
      })
    })
  })

  describe("only SEPA bank transfer enabled", () => {
    let page: PaymentTestPage

    const sepaOrder = {
      ...testOrder,
      availablePaymentMethods: ["SEPA_DEBIT"] as CommercePaymentMethodEnum[],
    }

    beforeEach(() => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => sepaOrder,
      })
      page = new PaymentTestPage(wrapper)
    })

    it("renders sepa transfer title", () => {
      expect(page.text()).toContain("SEPA bank transfer payment details")
    })
  })

  describe("wire transfer enabled", () => {
    let page: PaymentTestPage

    const wireOrder = {
      ...testOrder,
      availablePaymentMethods: [
        "CREDIT_CARD",
        "WIRE_TRANSFER",
      ] as CommercePaymentMethodEnum[],
    }

    const submitMutationMock = jest.fn().mockResolvedValue({
      commerceSetPayment: {
        orderOrError: {
          id: 1234,
        },
      },
    })

    beforeEach(() => {
      jest.clearAllMocks()
      ;(useOrderPaymentContext as jest.Mock).mockImplementation(() => {
        return {
          selectedPaymentMethod: "WIRE_TRANSFER",
          setSelectedPaymentMethod: jest.fn(),
          setBankAccountSelection: jest.fn(),
          setIsSavingPayment: mockSetIsSavingPayment,
        }
      })
      ;(useSetPayment as jest.Mock).mockImplementation(() => ({
        submitMutation: submitMutationMock,
      }))

      const { wrapper } = getWrapper({
        CommerceOrder: () => wireOrder,
      })
      page = new PaymentTestPage(wrapper)
    })

    it("renders and selects wire tranfer when set as payment method", () => {
      expect(page.text()).toContain("Wire transfer")
      expect(page.find(BorderedRadio).at(1).prop("selected")).toBeTruthy()
    })

    it("renders description body correctly", () => {
      expect(page.text()).toContain(
        "• To pay by wire transfer, complete checkout"
      )
      expect(page.text()).toContain(
        "• Please inform your bank that you will be responsible"
      )
    })

    it("tracks when the user selects Wire payment method", async () => {
      await page.selectPaymentMethod("WireTransfer")

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

    it("sets payment method correctly and transitions to review step when wire transfer is chosen", async () => {
      await page.selectPaymentMethod("CreditCard")
      await page.selectPaymentMethod("WireTransfer")
      await page.clickSubmit()

      expect(mockSetIsSavingPayment).toHaveBeenCalledWith(true)

      expect(submitMutationMock).toHaveBeenCalledWith({
        variables: {
          input: {
            id: "1234",
            paymentMethod: "WIRE_TRANSFER",
          },
        },
      })

      await flushPromiseQueue()

      expect(mockSetIsSavingPayment).toHaveBeenCalledWith(false)
      expect(pushMock).toHaveBeenCalledWith("/orders/1234/review")
    })
  })

  describe("only wire transfer enabled", () => {
    let page: PaymentTestPage

    const wireOrder = {
      ...testOrder,
      availablePaymentMethods: ["WIRE_TRANSFER"] as CommercePaymentMethodEnum[],
    }

    beforeEach(() => {
      const { wrapper } = getWrapper({
        CommerceOrder: () => wireOrder,
      })
      page = new PaymentTestPage(wrapper)
    })

    it("renders wire transfer title", () => {
      expect(page.text()).toContain("Wire transfer payment details")
    })
  })

  describe("Private sale orders", () => {
    let page: PaymentTestPage
    const paymentMethodExpectsMap: Record<
      Exclude<CommercePaymentMethodEnum, "%future added value">,
      () => void
    > = {
      CREDIT_CARD: () => {
        expect(
          page
            .find(CreditCardPickerFragmentContainer)
            .closest(Collapse)
            .first()
            .props().open
        ).toBe(true)
      },
      WIRE_TRANSFER: () => {
        expect(page.text()).toContain(
          "• To pay by wire transfer, complete checkout to view banking"
        )
        expect(page.text()).toContain(
          "• Please inform your bank that you will be responsible for all wire transfer fees."
        )
      },
      US_BANK_ACCOUNT: () => {
        expect(page.text()).toContain(
          "Search for your bank institution or select from the options below."
        )
        expect(
          page
            .find(BankAccountPickerFragmentContainer)
            .closest(Collapse)
            .first()
            .props().open
        ).toBe(true)
      },
      SEPA_DEBIT: () => {
        expect(page.text()).toContain(
          "Your bank account must be denominated in EUR and located in one of the SEPA countries."
        )
        expect(
          page
            .find(BankAccountPickerFragmentContainer)
            .closest(Collapse)
            .first()
            .props().open
        ).toBe(true)
      },
    }

    const privateSaleOrderWithWire = {
      ...PrivateSaleOrderWithShippingDetails,
      availablePaymentMethods: [
        "CREDIT_CARD",
        "WIRE_TRANSFER",
      ] as CommercePaymentMethodEnum[],
    }

    beforeEach(() => {
      jest.clearAllMocks()

      const { wrapper } = getWrapper({
        CommerceOrder: () => privateSaleOrderWithWire,
      })
      page = new PaymentTestPage(wrapper)
    })

    it("shows private sale stepper if the order source is private sale", () => {
      expect(page.orderStepper.text()).toMatchInlineSnapshot(`"PaymentReview"`)
      expect(page.orderStepperCurrentStep).toBe("Payment")
    })

    it("displays additional artwork details from order", () => {
      expect(page.text()).toContain("Artwork Description")
      expect(page.text()).toContain(
        "additional artwork details provided by admin"
      )
    })

    it("displays artwork provenance", () => {
      expect(page.text()).toContain("Artwork Description")
      expect(page.text()).toContain(
        "Provenance: Artwork acquired via an auction in 2000"
      )
    })

    it("displays artwork condition description", () => {
      expect(page.text()).toContain("Artwork Description")
      expect(page.text()).toContain(
        "Condition: Artwork is in perfect condition"
      )
    })

    it("shows avaliable payment methods", () => {
      const paymentMethods = page.find("[data-test='payment-methods']").first()
      expect(paymentMethods.text()).toContain("Wire transfer")
      expect(paymentMethods.text()).toContain("Credit card")
    })

    it.each(
      Object.keys(paymentMethodExpectsMap).map(paymentMethod => [paymentMethod])
    )(
      "shows content for %s if only this payment method avaliable",
      paymentMethod => {
        const order = {
          ...PrivateSaleOrderWithShippingDetails,
          availablePaymentMethods: [
            paymentMethod,
          ] as CommercePaymentMethodEnum[],
        }
        ;(useOrderPaymentContext as jest.Mock).mockImplementation(() => {
          return {
            selectedPaymentMethod: paymentMethod,
            setSelectedPaymentMethod: jest.fn(),
            setBankAccountSelection: jest.fn(),
            setIsSavingPayment: jest.fn(),
          }
        })

        const { wrapper } = getWrapper({
          CommerceOrder: () => order,
        })
        page = new PaymentTestPage(wrapper)

        paymentMethodExpectsMap[paymentMethod]()
        expect(page.find("[data-test='payment-methods']").length).toEqual(0)
        expect(
          page.find(Collapse).filterWhere(x => x.prop("open")).length
        ).toEqual(1)
      }
    )
  })
})
