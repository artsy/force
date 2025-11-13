import {
  BuyOrderWithBankDebitDetails,
  BuyOrderWithShippingDetails,
  OfferOrderWithShippingDetails,
  PrivateSaleOrderWithShippingDetails,
} from "Apps/__tests__/Fixtures/Order"
import { useSetPayment } from "Apps/Order/Mutations/useSetPayment"
import { settingOrderPaymentFailed } from "Apps/Order/Routes/__fixtures__/MutationResults/setOrderPayment"
import { PaymentFragmentContainer } from "Apps/Order/Routes/Payment"
import { useOrderPaymentContext } from "Apps/Order/Routes/Payment/PaymentContext/OrderPaymentContext"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useSystemContext } from "System/Hooks/useSystemContext"
import { screen } from "@testing-library/react"
import type { CommercePaymentMethodEnum } from "__generated__/Payment_order.graphql"
import type { PaymentTestQuery$rawResponse } from "__generated__/PaymentTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { OrderAppTestPageRTL } from "./Utils/OrderAppTestPageRTL"

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

describe("Payment", () => {
  const pushMock = jest.fn()
  const mockSetIsSavingPayment = jest.fn()
  let isCommittingMutation

  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => (
      <MockBoot>
        <PaymentFragmentContainer
          router={{ push: pushMock } as any}
          order={props.order}
          me={props.me}
          // @ts-expect-error
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
    beforeEach(() => {
      jest.clearAllMocks()
      ;(useOrderPaymentContext as jest.Mock).mockImplementation(() => {
        return {
          selectedPaymentMethod: "CREDIT_CARD",
          setIsSavingPayment: mockSetIsSavingPayment,
          setSelectedPaymentMethod: jest.fn(),
          isLoading: false,
          setIsLoading: jest.fn(),
        }
      })
      const mockTracking = useTracking as jest.Mock
      mockTracking.mockImplementation(() => {
        return {
          trackEvent,
        }
      })
      isCommittingMutation = false
    })

    it("renders credit card element when credit card is chosen as payment method", () => {
      renderWithRelay({
        CommerceOrder: () => testOrder,
      })

      expect(screen.getByTestId("credit-card-form")).toBeInTheDocument()
    })

    it("shows saving payment preferences interface while setting payment", () => {
      ;(useOrderPaymentContext as jest.Mock).mockImplementation(() => {
        return {
          selectedPaymentMethod: "CREDIT_CARD",
          setIsSavingPayment: mockSetIsSavingPayment,
          setSelectedPaymentMethod: jest.fn(),
          isLoading: false,
          setIsLoading: jest.fn(),
          isSavingPayment: true, // This will trigger the spinner
        }
      })

      renderWithRelay({
        CommerceOrder: () => testOrder,
      })

      expect(screen.getByText("Saving payment preferences")).toBeInTheDocument()
    })

    it("shows the default error modal when the payment picker throws an error", async () => {
      CreditCardPickerMock.useThrownError()
      const { user } = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)

      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith()
    })

    it("shows a custom error modal with when the payment picker returns a normal error", async () => {
      CreditCardPickerMock.useErrorResult()
      const { user } = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)

      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "This is the description of an error.",
        message:
          "Please enter another payment method or contact your bank for more information.",
      })
    })

    it("shows an error modal with the title 'An internal error occurred' and the default message when the payment picker returns an error with the type 'internal_error'", async () => {
      CreditCardPickerMock.useInternalErrorResult()
      const { user } = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)

      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith({
        title: "An internal error occurred",
      })
    })

    it("scrolls to top of address form when payment picker returns 'invalid_form'", async () => {
      CreditCardPickerMock.useInvalidFormResult()
      const { user } = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)

      await page.clickSubmit()

      expect(mockJumpTo).toHaveBeenCalled()
    })

    it("tracks when the user selects Credit Card payment method", async () => {
      const { user } = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)

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
      const { user } = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)

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
      const { user } = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)

      await page.clickSubmit()
      expect(mockSetIsSavingPayment).toHaveBeenCalledWith(true)

      await flushPromiseQueue()

      expect(mockSetIsSavingPayment).toHaveBeenCalledWith(false)
      expect(pushMock).toHaveBeenCalledWith("/orders/1234/review")
    })

    it("shows an error modal when there is an error in SetOrderPaymentPayload", async () => {
      mockCommitMutation.mockResolvedValue(settingOrderPaymentFailed)
      const { user } = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)

      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith()
    })

    it("shows an error modal when there is a network error", async () => {
      mockCommitMutation.mockRejectedValue({})
      const { user } = renderWithRelay({
        CommerceOrder: () => testOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)

      await page.clickSubmit()

      expect(mockShowErrorDialog).toHaveBeenCalledWith()
    })

    it("does not show language about card networks with no saved card", () => {
      const meWithoutCreditCards: PaymentTestQuery$rawResponse["me"] = {
        id: "123",
        creditCards: {
          edges: [],
        },
        bankAccounts: {
          edges: [],
        },
      }
      renderWithRelay({
        CommerceOrder: () => testOrder,
        Me: () => meWithoutCreditCards,
      })

      expect(
        screen.queryByText(
          'To change the co-badged card network for this purchase, select "Add another card".'
        )
      ).not.toBeInTheDocument()
    })

    it("shows language about card networks with saved credit card", () => {
      renderWithRelay({
        CommerceOrder: () => testOrder,
      })

      expect(
        screen.getAllByText(
          /To change the co-badged card network for this purchase, select.*Add another card/
        )[0]
      ).toBeInTheDocument()
    })
  })

  describe("Offer-mode orders", () => {
    beforeEach(() => {
      ;(useOrderPaymentContext as jest.Mock).mockImplementation(() => {
        return {
          selectedPaymentMethod: "CREDIT_CARD",
          setIsSavingPayment: mockSetIsSavingPayment,
          setSelectedPaymentMethod: jest.fn(),
          isLoading: false,
          setIsLoading: jest.fn(),
        }
      })
    })

    it("shows an active offer stepper if the order is an Offer Order", () => {
      renderWithRelay({
        CommerceOrder: () => OfferOrderWithShippingDetails,
      })

      expect(screen.getByText("Offer")).toBeInTheDocument()
      expect(screen.getAllByText("Shipping")[0]).toBeInTheDocument()
      expect(screen.getAllByText("Payment")[0]).toBeInTheDocument()
      expect(screen.getByText("Review")).toBeInTheDocument()
    })
  })

  describe("bank transfer enabled", () => {
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
          isLoading: false,
          setIsLoading: jest.fn(),
        }
      })
      isCommittingMutation = false
    })

    it("renders selection of payment methods", () => {
      renderWithRelay({
        CommerceOrder: () => achOrder,
      })

      expect(screen.getByText("Credit card")).toBeInTheDocument()
      expect(screen.getByText("ACH bank transfer")).toBeInTheDocument()
    })

    it("renders correct copy for ACH radio button description", () => {
      renderWithRelay({
        CommerceOrder: () => achOrder,
      })

      expect(screen.getByText("US bank account only")).toBeInTheDocument()
    })

    it("renders bank element when ACH is chosen as payment method", () => {
      renderWithRelay({
        CommerceOrder: () => achOrder,
      })

      const creditCardForm = screen.getByTestId("credit-card-form")
      expect(creditCardForm).toHaveStyle({ height: "0px" })

      const bankAccountForm = screen.getByTestId("bank-account-form")
      expect(bankAccountForm).toHaveStyle({ height: "auto" })
    })

    it("renders description body for bank transfer", () => {
      renderWithRelay({
        CommerceOrder: () => achOrder,
      })

      expect(
        screen.getAllByText(
          /Payment processing will take 4-7 business days once the gallery accepts the order/
        )[0]
      ).toBeInTheDocument()
      expect(
        screen.getAllByText(/Bank transfer is powered by Stripe/)[0]
      ).toBeInTheDocument()
      expect(
        screen.getAllByText(
          /If you can not find your bank, please check your spelling or choose/
        )[0]
      ).toBeInTheDocument()
      expect(
        screen.getAllByText(
          /Search for your bank institution or select from the options below/
        )[0]
      ).toBeInTheDocument()
    })

    it("tracks when the user selects the ACH payment method", async () => {
      const { user } = renderWithRelay({
        CommerceOrder: () => achOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)

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
    const bankOrder = {
      ...testOrder,
      availablePaymentMethods: [
        "US_BANK_ACCOUNT",
      ] as CommercePaymentMethodEnum[],
    }

    beforeEach(() => {
      ;(useOrderPaymentContext as jest.Mock).mockImplementation(() => {
        return {
          selectedPaymentMethod: "US_BANK_ACCOUNT",
          setSelectedPaymentMethod: jest.fn(),
          setBankAccountSelection: jest.fn(),
          setIsSavingPayment: jest.fn(),
          isLoading: false,
          setIsLoading: jest.fn(),
        }
      })
    })

    it("renders bank transfer title", () => {
      renderWithRelay({
        CommerceOrder: () => bankOrder,
      })

      expect(
        screen.getAllByText("Bank transfer payment details")[0]
      ).toBeInTheDocument()
    })
  })

  describe("SEPA bank transfer enabled", () => {
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
          isLoading: false,
          setIsLoading: jest.fn(),
        }
      })
      isCommittingMutation = false
    })

    it("renders selection of payment methods", () => {
      renderWithRelay({
        CommerceOrder: () => sepaOrder,
      })

      expect(screen.getByText("SEPA bank transfer")).toBeInTheDocument()
      expect(screen.getByText("Credit card")).toBeInTheDocument()
    })

    it("renders bank element when SEPA is chosen as payment method", () => {
      renderWithRelay({
        CommerceOrder: () => sepaOrder,
      })

      const creditCardForm = screen.getByTestId("credit-card-form")
      expect(creditCardForm).toHaveStyle({ height: "0px" })

      const sepaForm = screen.getByTestId("sepa-bank-account-form")
      expect(sepaForm).toHaveStyle({ height: "auto" })
    })

    it("renders description body for SEPA when selected", () => {
      renderWithRelay({
        CommerceOrder: () => sepaOrder,
      })

      expect(
        screen.getAllByText(/Bank transfer is powered by Stripe/)[0]
      ).toBeInTheDocument()
      expect(
        screen.getAllByText(/Enter your billing address in the form below/)[0]
      ).toBeInTheDocument()
      expect(
        screen.getAllByText(
          /Your bank account must be denominated in EUR and located in one of the SEPA countries/
        )[0]
      ).toBeInTheDocument()
      expect(
        screen.getAllByText(
          /Once your order is accepted, please allow 7-10 business days for processing your payment/
        )[0]
      ).toBeInTheDocument()
    })

    it("tracks when the user selects SEPA payment method", async () => {
      const { user } = renderWithRelay({
        CommerceOrder: () => sepaOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)

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
    const sepaOrder = {
      ...testOrder,
      availablePaymentMethods: ["SEPA_DEBIT"] as CommercePaymentMethodEnum[],
    }

    beforeEach(() => {
      ;(useOrderPaymentContext as jest.Mock).mockImplementation(() => {
        return {
          selectedPaymentMethod: "SEPA_DEBIT",
          setSelectedPaymentMethod: jest.fn(),
          setBankAccountSelection: jest.fn(),
          setIsSavingPayment: jest.fn(),
          isLoading: false,
          setIsLoading: jest.fn(),
        }
      })
    })

    it("renders sepa transfer title", () => {
      renderWithRelay({
        CommerceOrder: () => sepaOrder,
      })

      expect(
        screen.getAllByText("SEPA bank transfer payment details")[0]
      ).toBeInTheDocument()
    })
  })

  describe("wire transfer enabled", () => {
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
          isLoading: false,
          setIsLoading: jest.fn(),
        }
      })
      ;(useSetPayment as jest.Mock).mockImplementation(() => ({
        submitMutation: submitMutationMock,
      }))
    })

    it("renders and selects wire tranfer when set as payment method", () => {
      renderWithRelay({
        CommerceOrder: () => wireOrder,
      })

      expect(screen.getByText("Wire transfer")).toBeInTheDocument()
      const wireRadio = screen
        .getByText("Wire transfer")
        .closest('[role="radio"]')
      expect(wireRadio).toHaveAttribute("aria-checked", "true")
    })

    it("renders description body correctly", () => {
      renderWithRelay({
        CommerceOrder: () => wireOrder,
      })

      expect(
        screen.getAllByText(/To pay by wire transfer, complete checkout/)[0]
      ).toBeInTheDocument()
      expect(
        screen.getAllByText(
          /Please inform your bank that you will be responsible/
        )[0]
      ).toBeInTheDocument()
    })

    it("tracks when the user selects Wire payment method", async () => {
      const { user } = renderWithRelay({
        CommerceOrder: () => wireOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)

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
      const { user } = renderWithRelay({
        CommerceOrder: () => wireOrder,
      })
      const page = new OrderAppTestPageRTL(screen, user)

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
    const wireOrder = {
      ...testOrder,
      availablePaymentMethods: ["WIRE_TRANSFER"] as CommercePaymentMethodEnum[],
    }

    beforeEach(() => {
      ;(useOrderPaymentContext as jest.Mock).mockImplementation(() => {
        return {
          selectedPaymentMethod: "WIRE_TRANSFER",
          setSelectedPaymentMethod: jest.fn(),
          setBankAccountSelection: jest.fn(),
          setIsSavingPayment: jest.fn(),
          isLoading: false,
          setIsLoading: jest.fn(),
        }
      })
    })

    it("renders wire transfer title", () => {
      renderWithRelay({
        CommerceOrder: () => wireOrder,
      })

      expect(
        screen.getAllByText("Wire transfer payment details")[0]
      ).toBeInTheDocument()
    })
  })

  describe("Private sale orders", () => {
    const paymentMethodExpectsMap: Record<
      Exclude<CommercePaymentMethodEnum, "%future added value">,
      () => void
    > = {
      CREDIT_CARD: () => {
        expect(screen.getByTestId("credit-card-form")).toBeInTheDocument()
      },
      WIRE_TRANSFER: () => {
        expect(
          screen.getAllByText(
            /To pay by wire transfer, complete checkout to view banking/
          )[0]
        ).toBeInTheDocument()
        expect(
          screen.getAllByText(
            /Please inform your bank that you will be responsible for all wire transfer fees/
          )[0]
        ).toBeInTheDocument()
      },
      US_BANK_ACCOUNT: () => {
        expect(
          screen.getAllByText(
            /Search for your bank institution or select from the options below/
          )[0]
        ).toBeInTheDocument()
        expect(screen.getByTestId("bank-account-form")).toBeInTheDocument()
      },
      SEPA_DEBIT: () => {
        expect(
          screen.getAllByText(
            /Your bank account must be denominated in EUR and located in one of the SEPA countries/
          )[0]
        ).toBeInTheDocument()
        expect(screen.getByTestId("sepa-bank-account-form")).toBeInTheDocument()
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
      ;(useOrderPaymentContext as jest.Mock).mockImplementation(() => {
        return {
          selectedPaymentMethod: "CREDIT_CARD",
          setSelectedPaymentMethod: jest.fn(),
          setBankAccountSelection: jest.fn(),
          setIsSavingPayment: jest.fn(),
          isLoading: false,
          setIsLoading: jest.fn(),
        }
      })
    })

    it("shows private sale stepper if the order source is private sale", () => {
      renderWithRelay({
        CommerceOrder: () => privateSaleOrderWithWire,
      })

      expect(screen.getByText("Payment")).toBeInTheDocument()
      expect(screen.getByText("Review")).toBeInTheDocument()
    })

    it("displays additional artwork details from order", () => {
      renderWithRelay({
        CommerceOrder: () => privateSaleOrderWithWire,
      })

      expect(screen.getByText("Artwork Description")).toBeInTheDocument()
      expect(
        screen.getByText("additional artwork details provided by admin")
      ).toBeInTheDocument()
    })

    it("displays artwork provenance", () => {
      renderWithRelay({
        CommerceOrder: () => privateSaleOrderWithWire,
      })

      expect(screen.getByText("Artwork Description")).toBeInTheDocument()
      expect(
        screen.getByText("Provenance: Artwork acquired via an auction in 2000")
      ).toBeInTheDocument()
    })

    it("displays artwork condition description", () => {
      renderWithRelay({
        CommerceOrder: () => privateSaleOrderWithWire,
      })

      expect(screen.getByText("Artwork Description")).toBeInTheDocument()
      expect(
        screen.getByText("Condition: Artwork is in perfect condition")
      ).toBeInTheDocument()
    })

    it("shows avaliable payment methods", () => {
      renderWithRelay({
        CommerceOrder: () => privateSaleOrderWithWire,
      })

      expect(screen.getByText("Wire transfer")).toBeInTheDocument()
      expect(screen.getByText("Credit card")).toBeInTheDocument()
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
            isLoading: false,
            setIsLoading: jest.fn(),
          }
        })

        renderWithRelay({
          CommerceOrder: () => order,
        })

        paymentMethodExpectsMap[paymentMethod]()
        expect(screen.queryByTestId("payment-methods")).not.toBeInTheDocument()
      }
    )
  })
})
