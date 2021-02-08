import { Button, Sans } from "@artsy/palette"
import { CreditCardInput } from "v2/Apps/Order/Components/CreditCardInput"
import { mount } from "enzyme"
import React from "react"
import type { Token, StripeError } from '@stripe/stripe-js'
import { creatingCreditCardFailed } from "v2/Apps/Order/Routes/__fixtures__/MutationResults"
import {
  fillCountrySelect,
  fillIn,
  validAddress,
} from "v2/Components/__tests__/Utils/addressForm"
import { Address, AddressForm } from "v2/Components/AddressForm"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import { ModalButton } from "v2/Components/Modal/ModalDialog"
import { PaymentFormInjectedStripe, PaymentFormProps, StripeProps } from "v2/Components/Payment/PaymentForm"
import { MockBoot } from "v2/DevTools"
import { RelayProp, commitMutation } from "react-relay"
import Input from "../../Input"
import { Elements } from "@stripe/react-stripe-js"
import { mockStripe } from "v2/DevTools/mockStripe"

jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
  createRefetchContainer: component => component,
}))

jest.mock("@stripe/stripe-js", () => {
  let mock = null
  return {
    loadStripe: () => {
      if (mock === null) {
        mock = mockStripe()
      }
      return mock
    },
    _mockStripe: () => mock,
    _mockReset: () => mock = mockStripe(),
  }
})

const { _mockStripe, _mockReset, loadStripe } = require("@stripe/stripe-js")


const mutationMock = commitMutation as jest.Mock<any>

const fillAddressForm = (component: any, address: Address) => {
  fillIn(component, { title: "Name on card", value: address.name })
  fillIn(component, { title: "Address line 1", value: address.addressLine1 })
  fillIn(component, { title: "Address line 2 (optional)", value: address.addressLine2 })
  fillIn(component, { title: "City", value: address.city })
  fillIn(component, { title: "State, province, or region", value: address.region })
  fillIn(component, { title: "Postal code", value: address.postalCode })
  fillCountrySelect(component, address.country)
}

describe("PaymentForm", () => {
  let testPaymentFormProps: PaymentFormProps & StripeProps

  function getWrapper() {
    const stripePromise = loadStripe('');
    return mount(
      <MockBoot breakpoint="xs">
        <Elements stripe={stripePromise}>
          <PaymentFormInjectedStripe
            {...testPaymentFormProps}
          />
        </Elements>
      </MockBoot>
    )
  }

  beforeEach(() => {
    mutationMock.mockReset()
    _mockReset()

    testPaymentFormProps = {
      me: {
        id: "1234",
        internalID: "1234",
        creditCards: {} as any,
        " $refType": "UserSettingsPayments_me",
      },
      relay: { environment: {} } as RelayProp,
    } as any
  })

  it("shows an empty address form", () => {
    const paymentWrapper = getWrapper()

    expect(paymentWrapper.find(AddressForm).props().value).toEqual({
      name: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      region: "",
      postalCode: "",
      country: "US",
      phoneNumber: "",
    })
  })

  it("tokenizes the credit card with the entered address as the billing address", () => {
    const thenMock = jest.fn()
    _mockStripe().createToken.mockReturnValue({ then: thenMock })

    const paymentWrapper = getWrapper()
    fillAddressForm(paymentWrapper, validAddress)
    paymentWrapper.find(Button).simulate("click")

    expect(_mockStripe().createToken).toHaveBeenCalledWith(null, {
      name: "Artsy UK Ltd",
      address_line1: "14 Gower's Walk",
      address_line2: "Suite 2.5, The Loom",
      address_city: "Whitechapel",
      address_state: "London",
      address_zip: "E1 8PY",
      address_country: "UK",
    })
    expect(thenMock.mock.calls.length).toBe(1)
  })

  it("commits createCreditCard mutation with stripe token id", () => {
    const stripeToken: { token: Token } = {
      token: {
        id: "tokenId",
        object: null,
        client_ip: null,
        created: null,
        livemode: null,
        type: null,
        used: null,
      },
    }

    _mockStripe().createToken.mockReturnValue({
      then: func => func(stripeToken),
    })

    const paymentWrapper = getWrapper()
    fillAddressForm(paymentWrapper, validAddress)
    paymentWrapper.find(Button).simulate("click")

    expect(mutationMock.mock.calls[0][1]).toMatchObject({
      variables: {
        input: {
          token: "tokenId",
        },
      },
    })
  })

  it("shows an error message if you do not enter a credit card number", () => {
    const stripeError: { error: StripeError } = {
      error: {
        type: null,
        charge: null,
        message: "Your card number is invalid.",
        code: null,
        decline_code: null,
        param: null,
      },
    }

    _mockStripe().createToken.mockReturnValue({
      then: func => func(stripeError),
    })

    const paymentWrapper = getWrapper()
    fillAddressForm(paymentWrapper, validAddress)
    paymentWrapper.find(Button).simulate("click")

    expect(paymentWrapper.find(CreditCardInput).find(Sans).html()).toContain(
      "Your card number is invalid."
    )
  })

  it("shows an error modal when there is an error in CreateCreditCardPayload", () => {
    _mockStripe().createToken.mockReturnValue({
      then: func => func({ token: { id: "tokenId" } }),
    })

    mutationMock.mockImplementationOnce((_, { onCompleted }) =>
      onCompleted(creatingCreditCardFailed)
    )

    const paymentWrapper = getWrapper()
    fillAddressForm(paymentWrapper, validAddress)
    paymentWrapper.find(Button).simulate("click")

    expect(paymentWrapper.find(ErrorModal).props().show).toBe(true)
    expect(paymentWrapper.find(ErrorModal).props().detailText).toBe(
      "No such token: fake-token"
    )

    paymentWrapper.find(ModalButton).simulate("click")

    expect(paymentWrapper.find(ErrorModal).props().show).toBe(false)
  })

  it("shows an error modal when there is a network error", () => {
    _mockStripe().createToken.mockReturnValue({
      then: func => func({ token: { id: "tokenId" } }),
    })

    mutationMock.mockImplementationOnce((_, { onError }) =>
      onError(new TypeError("Network request failed"))
    )

    const paymentWrapper = getWrapper()
    fillAddressForm(paymentWrapper, validAddress)
    paymentWrapper.find(Button).simulate("click")

    expect(paymentWrapper.find(ErrorModal).props().show).toBe(true)
  })

  describe("Validations", () => {
    it("says a required field is required", () => {
      const paymentWrapper = getWrapper()
      paymentWrapper.find(Button).simulate("click")

      paymentWrapper.update()
      const input = paymentWrapper
        .find(Input)
        .filterWhere(wrapper => wrapper.props().title === "Name on card")
      expect(input.props().error).toEqual("This field is required")
    })

    it("after submit, shows all validation errors on inputs that have been touched", () => {
      const paymentWrapper = getWrapper()
      fillIn(paymentWrapper, { title: "Name on card", value: "Erik David" })

      paymentWrapper.find(Button).simulate("click")

      const cityInput = paymentWrapper
        .find(Input)
        .filterWhere(wrapper => wrapper.props().title === "City")

      expect(cityInput.props().error).toBeTruthy()
    })

    it("does not submit an empty form with billing address", () => {
      const paymentWrapper = getWrapper()
      paymentWrapper.find(Button).simulate("click")
      expect(commitMutation).not.toBeCalled()
    })

    it("does not submit the mutation with an incomplete billing address", () => {
      const paymentWrapper = getWrapper()
      fillIn(paymentWrapper, { title: "Name on card", value: "Air Bud" })
      paymentWrapper.find(Button).simulate("click")
      expect(commitMutation).not.toBeCalled()
    })

    it("allows a missing postal code if the selected country is not US or Canada", () => {
      const paymentWrapper = getWrapper()
      _mockStripe().createToken.mockReturnValue({ then: jest.fn() })

      const address = {
        name: "Erik David",
        addressLine1: "401 Broadway",
        addressLine2: "",
        city: "New York",
        region: "NY",
        postalCode: "",
        phoneNumber: "5555937743",
        country: "AQ",
      }
      fillAddressForm(paymentWrapper, address)
      paymentWrapper.find(Button).simulate("click")
      expect(_mockStripe().createToken).toBeCalled()
    })

    it("allows a missing state/province if the selected country is not US or Canada", () => {
      const paymentWrapper = getWrapper()
      _mockStripe().createToken.mockReturnValue({ then: jest.fn() })
      const address = {
        name: "Erik David",
        addressLine1: "401 Broadway",
        addressLine2: "",
        city: "New York",
        region: "",
        postalCode: "7Z",
        phoneNumber: "5555937743",
        country: "AQ",
      }
      fillAddressForm(paymentWrapper, address)
      paymentWrapper.find(Button).simulate("click")
      expect(_mockStripe().createToken).toBeCalled()
    })
  })
})
