import { Button, Sans } from "@artsy/palette"
import { CreditCardInput } from "v2/Apps/Order/Components/CreditCardInput"
import { mount } from "enzyme"
import React from "react"

import { creatingCreditCardFailed } from "v2/Apps/Order/Routes/__fixtures__/MutationResults"

jest.mock("react-relay", () => ({
  commitMutation: jest.fn(),
  createFragmentContainer: component => component,
  createRefetchContainer: component => component,
}))

jest.mock("react-stripe-elements", () => ({
  CardElement: ({ hidePostalCode, onReady, ...props }) => <div {...props} />,
  injectStripe: args => args,
}))

import {
  fillCountrySelect,
  fillIn,
  validAddress,
} from "v2/Components/__tests__/Utils/addressForm"
import { Address, AddressForm } from "v2/Components/AddressForm"
import { ErrorModal } from "v2/Components/Modal/ErrorModal"
import { ModalButton } from "v2/Components/Modal/ModalDialog"
import PaymentForm, {
  PaymentFormProps,
} from "v2/Components/Payment/PaymentForm"
import { MockBoot } from "v2/DevTools"
import { RelayProp, commitMutation } from "react-relay"
import Input from "../../Input"

const mutationMock = commitMutation as jest.Mock<any>

const fillAddressForm = (component: any, address: Address) => {
  fillIn(component, { title: "Name on card", value: address.name })
  fillIn(component, { title: "Address line 1", value: address.addressLine1 })
  fillIn(component, {
    title: "Address line 2 (optional)",
    value: address.addressLine2,
  })
  fillIn(component, { title: "City", value: address.city })
  fillIn(component, {
    title: "State, province, or region",
    value: address.region,
  })
  fillIn(component, { title: "Postal code", value: address.postalCode })
  fillCountrySelect(component, address.country)
}

describe("PaymentForm", () => {
  let stripeMock
  let testPaymentFormProps: PaymentFormProps

  function getWrapper() {
    return mount(
      <MockBoot breakpoint="xs">
        <PaymentForm {...testPaymentFormProps} />
      </MockBoot>
    )
  }

  beforeEach(() => {
    mutationMock.mockReset()

    stripeMock = {
      createToken: jest.fn(),
    }

    testPaymentFormProps = {
      me: { id: "1234", creditCards: [] },
      relay: { environment: {} } as RelayProp,
      stripe: stripeMock,
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
    stripeMock.createToken.mockReturnValue({ then: thenMock })

    const paymentWrapper = getWrapper()
    fillAddressForm(paymentWrapper, validAddress)
    paymentWrapper.find(Button).simulate("click")

    expect(stripeMock.createToken).toHaveBeenCalledWith({
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
    const stripeToken: stripe.TokenResponse = {
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

    stripeMock.createToken.mockReturnValue({
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
    const stripeError: stripe.TokenResponse = {
      error: {
        type: null,
        charge: null,
        message: "Your card number is invalid.",
        code: null,
        decline_code: null,
        param: null,
      },
    }

    stripeMock.createToken.mockReturnValue({
      then: func => func(stripeError),
    })

    const paymentWrapper = getWrapper()
    fillAddressForm(paymentWrapper, validAddress)
    paymentWrapper.find(Button).simulate("click")

    expect(
      paymentWrapper
        .find(CreditCardInput)
        .find(Sans)
        .html()
    ).toContain("Your card number is invalid.")
  })

  it("shows an error modal when there is an error in CreateCreditCardPayload", () => {
    stripeMock.createToken.mockReturnValue({
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
    stripeMock.createToken.mockReturnValue({
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
      stripeMock.createToken.mockReturnValue({ then: jest.fn() })

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
      expect(stripeMock.createToken).toBeCalled()
    })

    it("allows a missing state/province if the selected country is not US or Canada", () => {
      const paymentWrapper = getWrapper()
      stripeMock.createToken.mockReturnValue({ then: jest.fn() })
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
      expect(stripeMock.createToken).toBeCalled()
    })
  })
})
