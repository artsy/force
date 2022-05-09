import { Checkbox } from "@artsy/palette"
import { PaymentTestQueryRawResponse } from "v2/__generated__/PaymentTestQuery.graphql"
import {
  BuyOrderWithShippingDetails,
  OfferOrderWithShippingDetails,
} from "v2/Apps/__tests__/Fixtures/Order"
import { AddressForm } from "v2/Components/AddressForm"
import { createTestEnv } from "v2/DevTools/createTestEnv"
import { graphql } from "react-relay"
import * as paymentPickerMock from "../../Components/__mocks__/PaymentPicker"
import {
  settingOrderPaymentFailed,
  settingOrderPaymentSuccess,
} from "../__fixtures__/MutationResults"
import { PaymentFragmentContainer } from "../Payment"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import { useSystemContext } from "v2/System"
import { useFeatureFlag } from "v2/System/useFeatureFlag"
import { PaymentPickerFragmentContainer } from "../../Components/PaymentPicker"
import { BankDebitProvider } from "v2/Components/BankDebitForm/BankDebitProvider"

jest.unmock("react-tracking")
jest.unmock("react-relay")
jest.mock("v2/Utils/Events", () => ({
  postEvent: jest.fn(),
}))
jest.mock(
  "v2/Apps/Order/Components/PaymentPicker",
  // not sure why this is neccessary :(
  // should just work without this extra argument
  () => {
    return require("../../Components/__mocks__/PaymentPicker")
  }
)
jest.mock(
  "v2/Components/BankDebitForm/BankDebitProvider",
  // not sure why this is neccessary :(
  // should just work without this extra argument
  () => {
    return require("../../Components/__mocks__/BankDebitProvider")
  }
)
jest.mock("v2/System/useSystemContext")

const testOrder: PaymentTestQueryRawResponse["order"] = {
  ...BuyOrderWithShippingDetails,
  internalID: "1234",
}

const setupTestEnv = () => {
  return createTestEnv({
    Component: PaymentFragmentContainer,
    defaultData: {
      order: testOrder,
      me: { creditCards: { edges: [] } },
    },
    defaultMutationResults: {
      ...settingOrderPaymentSuccess,
    },
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
    TestPage: class PaymentTestPage extends OrderAppTestPage {
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
    },
  })
}

describe("Payment", () => {
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


  // eslint-disable-next-line jest/expect-expect
  it("shows the button spinner while loading the mutation", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()
    await page.expectButtonSpinnerWhenSubmitting()
  })

  // eslint-disable-next-line jest/expect-expect
  it("shows the default error modal when the payment picker throws an error", async () => {
    paymentPickerMock.useThrownError()
    const env = setupTestEnv()
    const page = await env.buildPage()
    await page.clickSubmit()
    await page.expectAndDismissDefaultErrorDialog()
  })

  // eslint-disable-next-line jest/expect-expect
  it("shows a custom error modal with when the payment picker returns a normal error", async () => {
    paymentPickerMock.useErrorResult()
    const env = setupTestEnv()
    const page = await env.buildPage()
    await page.clickSubmit()
    await page.expectAndDismissErrorDialogMatching(
      "This is the description of an error.",
      "Please enter another payment method or contact your bank for more information."
    )
  })

  // eslint-disable-next-line jest/expect-expect
  it("shows an error modal with the title 'An internal error occurred' and the default message when the payment picker returns an error with the type 'internal_error'", async () => {
    paymentPickerMock.useInternalErrorResult()
    const env = setupTestEnv()
    const page = await env.buildPage()
    await page.clickSubmit()
    await page.expectAndDismissErrorDialogMatching(
      "An internal error occurred",
      "Please try again or contact orders@artsy.net."
    )
  })

  it("commits setOrderPayment mutation with the credit card id", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()
    await page.clickSubmit()

    expect(env.mutations.lastFetchVariables).toMatchObject({
      input: {
        creditCardId: "credit-card-id",
        id: "1234",
      },
    })
  })

  it("takes the user to the review step", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()
    await page.clickSubmit()
    expect(env.routes.mockPushRoute).toHaveBeenCalledWith("/orders/1234/review")
  })

  // eslint-disable-next-line jest/expect-expect
  it("shows an error modal when there is an error in SetOrderPaymentPayload", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()
    env.mutations.useResultsOnce(settingOrderPaymentFailed)
    await page.clickSubmit()
    await page.expectAndDismissDefaultErrorDialog()
  })

  // eslint-disable-next-line jest/expect-expect
  it("shows an error modal when there is a network error", async () => {
    const env = setupTestEnv()
    const page = await env.buildPage()
    env.mutations.mockNetworkFailureOnce()

    await page.clickSubmit()
    await page.expectAndDismissDefaultErrorDialog()
  })

  describe("Offer-mode orders", () => {
    it("shows an active offer stepper if the order is an Offer Order", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage({
        mockData: {
          order: {
            ...OfferOrderWithShippingDetails,
          },
        },
      })
      expect(page.orderStepper.text()).toMatchInlineSnapshot(
        `"CheckOfferNavigate rightCheckShippingNavigate rightPaymentNavigate rightReview"`
      )
      expect(page.orderStepperCurrentStep).toBe("Payment")
    })
  })

  describe("stripe ACH enabled", () => {
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
    })

    it("returns true when the feature is enabled", () => {
      const result = useFeatureFlag("stripe_ACH")
      expect(result).toBe(true)
    })

    it("renders selection of payment methods", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()
      expect(page.text()).toContain("Credit card")
      expect(page.text()).toContain("Bank transfer")
    })

    it("renders credit card element when credit card is chosen as payment method", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()
      page.selectPaymentMethod(0)
      expect(page.find(PaymentPickerFragmentContainer).length).toBe(1)
    })

    it("renders bank element when bank transfer is chosen as payment method", async () => {
      const env = setupTestEnv()
      const page = await env.buildPage()
      page.selectPaymentMethod(1)
      expect(page.find(BankDebitProvider).length).toBe(1)
    })
  })
})
