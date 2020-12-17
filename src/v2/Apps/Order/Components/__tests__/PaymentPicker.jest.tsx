import { BorderedRadio, Checkbox, Collapse, Link } from "@artsy/palette"
import { PaymentPicker_me } from "v2/__generated__/PaymentPicker_me.graphql"
import { PaymentPickerTestQueryRawResponse } from "v2/__generated__/PaymentPickerTestQuery.graphql"
import {
  BuyOrderPickup,
  BuyOrderWithShippingDetails,
  OfferOrderWithShippingDetails,
} from "v2/Apps/__tests__/Fixtures/Order"
import { creatingCreditCardSuccess } from "v2/Apps/Order/Routes/__fixtures__/MutationResults"
import { injectCommitMutation } from "v2/Apps/Order/Utils/commitMutation"
import {
  fillCountrySelect,
  fillIn,
  validAddress,
} from "v2/Components/__tests__/Utils/addressForm"
import { Address, AddressForm } from "v2/Components/AddressForm"
import { Input } from "v2/Components/Input"
import { createTestEnv } from "v2/DevTools/createTestEnv"
import { RootTestPage } from "v2/DevTools/RootTestPage"
import React from "react"
import { graphql } from "react-relay"
import { PaymentPicker, PaymentPickerFragmentContainer } from "../PaymentPicker"

jest.unmock("react-relay")
jest.unmock("react-tracking")
jest.mock("v2/Utils/Events", () => ({
  postEvent: jest.fn(),
}))

const mockPostEvent = require("v2/Utils/Events").postEvent as jest.Mock

jest.mock("react-stripe-elements", () => {
  // tslint:disable-next-line:no-shadowed-variable
  const stripeMock = {
    createToken: jest.fn(),
  }
  return {
    CardElement: ({ onReady, hidePostalCode, ...props }) => <div {...props} />,
    __stripeMock: stripeMock,
    injectStripe: Component => props => (
      <Component stripe={stripeMock} {...props} />
    ),
  }
})

const createTokenMock = require("react-stripe-elements").__stripeMock
  .createToken as jest.Mock

createTokenMock.mockImplementation(() =>
  Promise.resolve({ error: "bad error" })
)

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

class PaymentPickerTestPage extends RootTestPage {
  getCreditCardId: PaymentPicker["getCreditCardId"] = async () => {
    const result = (this.find(
      PaymentPicker
    ).instance() as any).getCreditCardId()
    await this.update()
    return result
  }

  get nameInput() {
    return this.find("input[placeholder='Add full name']")
  }

  get sameAddressCheckbox() {
    return this.find(Checkbox).filterWhere(cb =>
      cb.text().includes("are the same")
    )
  }

  get saveCardCheckbox() {
    return this.find(Checkbox).filterWhere(cb => cb.text().includes("Save"))
  }

  get addressForm() {
    return this.find(AddressForm)
  }

  get addressFormIsVisible() {
    return this.find(Collapse).at(1).props().open
  }

  get useNewCardSectionIsVisible() {
    return this.find(Collapse).at(0).props().open
  }

  async toggleSameAddressCheckbox() {
    this.sameAddressCheckbox.simulate("click")
    await this.update()
  }

  setName(name: string) {
    ;(this.nameInput.instance() as any).value = name
    this.nameInput.simulate("change")
  }

  get radios() {
    return this.find(BorderedRadio)
  }

  async clickRadio(atIndex: number) {
    this.find(BorderedRadio)
      .at(atIndex)
      .find('input[type="radio"]')
      .simulate("change")
    await this.update()
  }
}

const defaultData: PaymentPickerTestQueryRawResponse = {
  me: {
    creditCards: {
      edges: [],
    },
    id: "my-id",
  },
  order: {
    ...BuyOrderWithShippingDetails,
    creditCard: null,
  },
}

describe("PaymentPickerFragmentContainer", () => {
  const env = createTestEnv({
    Component: injectCommitMutation(PaymentPickerFragmentContainer as any),
    TestPage: PaymentPickerTestPage,
    defaultData,
    defaultMutationResults: {
      ...creatingCreditCardSuccess,
    },
    query: graphql`
      query PaymentPickerTestQuery @raw_response_type {
        me {
          ...PaymentPicker_me
        }
        order: commerceOrder(id: "unused") {
          ...PaymentPicker_order
        }
      }
    `,
    systemContextProps: { isEigen: false },
  })

  const eigenEnv = createTestEnv({
    Component: injectCommitMutation(PaymentPickerFragmentContainer as any),
    TestPage: PaymentPickerTestPage,
    defaultData,
    defaultMutationResults: {
      ...creatingCreditCardSuccess,
    },
    query: graphql`
      query PaymentPickerEigenTestQuery @raw_response_type {
        me {
          ...PaymentPicker_me
        }
        order: commerceOrder(id: "unused") {
          ...PaymentPicker_order
        }
      }
    `,
    systemContextProps: { isEigen: true },
  })

  beforeEach(() => {
    mockPostEvent.mockReset()
    createTokenMock.mockReset()
    createTokenMock.mockImplementation(() =>
      Promise.resolve({ error: "bad error" })
    )
  })

  describe("with no existing cards", () => {
    let page: PaymentPickerTestPage
    let eigenPage: PaymentPickerTestPage
    beforeAll(async () => {
      page = await env.buildPage()
      eigenPage = await eigenEnv.buildPage()
    })
    it("always shows the 'use new card' section", () => {
      expect(page.useNewCardSectionIsVisible).toBeTruthy()
    })
    it("does not show any radio buttons", () => {
      expect(page.radios).toHaveLength(0)
    })
    it("does not show the 'manage cards' link if not eigen", () => {
      expect(page.find(Link)).toHaveLength(0)
    })
    it("does not show the 'manage cards' link if eigen", () => {
      expect(eigenPage.find(Link)).toHaveLength(0)
    })
  })

  it("always shows the billing address form without checkbox when the user selected 'pick' shipping option", async () => {
    const page = await env.buildPage({
      mockData: {
        order: BuyOrderPickup,
      },
    })
    expect(page.sameAddressCheckbox).toHaveLength(0)
    expect(page.text()).not.toMatch(
      "Billing and shipping addresses are the same."
    )
    expect(page.addressFormIsVisible).toBe(true)
  })

  it("removes all data when the billing address form is hidden", async () => {
    const page = await env.buildPage()
    // expand address form
    expect(page.sameAddressCheckbox.props().selected).toBe(true)
    expect(page.addressFormIsVisible).toBe(false)
    await page.toggleSameAddressCheckbox()
    page.setName("Dr Collector")

    expect((page.nameInput.instance() as any).value).toEqual("Dr Collector")

    // hide address form
    page.toggleSameAddressCheckbox()

    expect(page.addressFormIsVisible).toBe(false)

    // expand address form again
    page.toggleSameAddressCheckbox()

    expect(page.addressFormIsVisible).toBe(true)

    // expect name to be empty
    expect((page.nameInput.instance() as any).value).toEqual("")
  })

  it("does not pre-populate with available details when returning to the payment route", async () => {
    const page = await env.buildPage({
      mockData: {
        order: {
          ...BuyOrderPickup,
          creditCard: {
            city: "London",
            country: "UK",
            expirationMonth: 12,
            brand: "Visa",
            expirationYear: 2022,
            internalID: "credit-card-id",
            lastDigits: "1234",
            name: "Artsy UK Ltd",
            postalCode: "E1 8PY",
            state: "Whitechapel",
            street1: "14 Gower's Walk",
            street2: "Suite 2.5, The Loom",
          },
          id: "1234",
        },
      },
    })

    expect(page.addressForm.props().value).toEqual({
      addressLine1: "",
      addressLine2: "",
      city: "",
      country: "US",
      name: "",
      phoneNumber: "",
      postalCode: "",
      region: "",
    })
  })

  it("always uses the billing address for stripe tokenization when the user selected 'pick' shipping option", async () => {
    const page = await env.buildPage({
      mockData: {
        order: {
          ...BuyOrderPickup,
          creditCard: null,
          id: "1234",
        },
      },
    })

    fillAddressForm(page.root, validAddress)

    await page.getCreditCardId()

    expect(createTokenMock).toHaveBeenCalledWith({
      address_city: "Whitechapel",
      address_country: "UK",
      address_line1: "14 Gower's Walk",
      address_line2: "Suite 2.5, The Loom",
      address_state: "London",
      address_zip: "E1 8PY",
      name: "Artsy UK Ltd",
    })
  })

  it("tokenizes credit card information using shipping address as billing address", async () => {
    const page = await env.buildPage()

    await page.getCreditCardId()

    expect(createTokenMock).toHaveBeenCalledWith({
      address_city: "New York",
      address_country: "US",
      address_line1: "401 Broadway",
      address_line2: "Suite 25",
      address_state: "NY",
      address_zip: "10013",
      name: "Joelle Van Dyne",
    })
  })

  it("tokenizes credit card information with a different billing address", async () => {
    const page = await env.buildPage()
    await page.toggleSameAddressCheckbox()
    fillAddressForm(page.root, validAddress)
    await page.getCreditCardId()

    expect(createTokenMock).toHaveBeenCalledWith({
      address_city: "Whitechapel",
      address_country: "UK",
      address_line1: "14 Gower's Walk",
      address_line2: "Suite 2.5, The Loom",
      address_state: "London",
      address_zip: "E1 8PY",
      name: "Artsy UK Ltd",
    })
  })

  it("commits createCreditCard mutation with stripe token id", async () => {
    const stripeToken: stripe.TokenResponse = {
      token: {
        client_ip: null,
        created: null,
        id: "tokenId",
        livemode: null,
        object: null,
        type: null,
        used: null,
      },
    }

    createTokenMock.mockReturnValue(Promise.resolve(stripeToken))

    const page = await env.buildPage()
    await page.getCreditCardId()

    expect(env.mutations.mockFetch.mock.calls[0][1]).toMatchObject({
      input: {
        token: "tokenId",
      },
    })
  })

  it("shows an error message when CreateToken passes in an error", async () => {
    const stripeError: stripe.TokenResponse = {
      error: {
        charge: null,
        code: null,
        decline_code: null,
        message: "Your card number is invalid.",
        param: null,
        type: null,
      },
    }

    createTokenMock.mockReturnValue(Promise.resolve(stripeError))

    const page = await env.buildPage()

    expect(page.root.text()).not.toContain("Your card number is invalid.")

    await page.getCreditCardId()

    expect(page.root.text()).toContain("Your card number is invalid.")
  })

  describe("when the user has existing credit cards", () => {
    const cards: Array<PaymentPicker_me["creditCards"]["edges"][0]["node"]> = [
      {
        brand: "MasterCard",
        expirationMonth: 1,
        expirationYear: 2018,
        internalID: "card-id-1",
        lastDigits: "1234",
      },
      {
        brand: "Visa",
        expirationMonth: 1,
        expirationYear: 2019,
        internalID: "card-id-2",
        lastDigits: "2345",
      },
    ]

    const orderCard = {
      brand: "Visa",
      city: "New York",
      country: "USA",
      expirationMonth: 1,
      expirationYear: 2019,
      id: "card-id-2",
      internalID: "card-id-2",
      lastDigits: "2345",
      name: "Chareth Cutestory",
      postalCode: "90210",
      state: "NY",
      street1: "1 Art st",
      street2: null,
    }

    const unsavedOrderCard = {
      brand: "Visa",
      city: "New York",
      country: "USA",
      expirationMonth: 12,
      expirationYear: 2022,
      id: "card-id-3",
      internalID: "card-id-3",
      lastDigits: "6789",
      name: "Chareth Cutestory",
      postalCode: "90210",
      state: "NY",
      street1: "101 Art st",
      street2: null,
    }

    const orderWithoutCard = {
      ...BuyOrderPickup,
      creditCard: null,
    }

    const orderWithCard = {
      ...BuyOrderPickup,
      creditCard: orderCard,
    }

    const orderWithUnsavedCard = {
      ...BuyOrderPickup,
      creditCard: unsavedOrderCard,
    }

    function getPage(_cards: typeof cards, _order) {
      return env.buildPage({
        mockData: {
          me: {
            creditCards: {
              edges: _cards.map(node => ({ node })),
            },
          },
          order: _order,
        },
      })
    }

    function getEigenPage(_cards: typeof cards, _order) {
      return eigenEnv.buildPage({
        mockData: {
          me: {
            creditCards: {
              edges: _cards.map(node => ({ node })),
            },
          },
          order: _order,
        },
      })
    }

    describe("with one card", () => {
      let page: PaymentPickerTestPage
      let eigenPage: PaymentPickerTestPage
      beforeAll(async () => {
        page = await getPage(cards.slice(0, 1), orderWithoutCard)
        eigenPage = await getEigenPage(cards.slice(0, 1), orderWithoutCard)
      })
      it("has two radio buttons", async () => {
        expect(page.radios).toHaveLength(2)
      })
      it("shows the 'manage cards' link if not eigen", () => {
        expect(page.find(Link)).toHaveLength(1)
        expect(page.find(Link).props().href).toMatchInlineSnapshot(
          `"/user/payments"`
        )
      })
      it("has no 'manage cards' link if eigen", () => {
        expect(eigenPage.find(Link)).toHaveLength(0)
      })
      it("has the credit card option at the top", async () => {
        expect(page.radios.at(0).text()).toMatchInlineSnapshot(
          `"mastercard•••• 1234   Exp 01/18"`
        )
      })
      it("has the 'use new card' option at the bottom", async () => {
        expect(page.radios.at(1).text()).toMatchInlineSnapshot(
          `"Add another card."`
        )
      })
      it("starts with the top radio selected", async () => {
        expect(page.radios.at(0).props().selected).toBeTruthy()
        expect(page.radios.at(1).props().selected).toBeFalsy()
      })

      it("hides the 'use new card' stuff initially", async () => {
        expect(page.useNewCardSectionIsVisible).toBeFalsy()
      })
      it("returns the relevant credit card id if requested", async () => {
        expect(await page.getCreditCardId()).toMatchObject({
          creditCardId: "card-id-1",
          type: "success",
        })
      })
      it("shows the 'use new card' section when you select that option", async () => {
        await page.clickRadio(1)
        expect(page.useNewCardSectionIsVisible).toBeTruthy()
      })
      it("hides the 'use new card' section if you select the card again", async () => {
        await page.clickRadio(0)
        expect(page.useNewCardSectionIsVisible).toBeFalsy()
      })
    })

    describe("with two cards", () => {
      let page: PaymentPickerTestPage
      let eigenPage: PaymentPickerTestPage
      beforeAll(async () => {
        page = await getPage(cards, orderWithoutCard)
        eigenPage = await getEigenPage(cards, orderWithoutCard)
      })
      it("has three radio buttons", async () => {
        expect(page.radios).toHaveLength(3)
      })
      it("shows the 'manage cards' link if not eigen", () => {
        expect(page.find(Link)).toHaveLength(1)
        expect(page.find(Link).props().href).toMatchInlineSnapshot(
          `"/user/payments"`
        )
      })
      it("shows the 'manage cards' link if eigen", () => {
        expect(eigenPage.find(Link)).toHaveLength(0)
      })
      it("has the credit card options at the top", async () => {
        expect(page.radios.at(0).text()).toMatchInlineSnapshot(
          `"mastercard•••• 1234   Exp 01/18"`
        )
        expect(page.radios.at(1).text()).toMatchInlineSnapshot(
          `"visa•••• 2345   Exp 01/19"`
        )
      })
      it("has the 'use new card' option at the bottom", async () => {
        expect(page.radios.at(2).text()).toMatchInlineSnapshot(
          `"Add another card."`
        )
      })
      it("starts with the top radio selected", async () => {
        expect(page.radios.at(0).props().selected).toBeTruthy()
        expect(page.radios.at(1).props().selected).toBeFalsy()
        expect(page.radios.at(2).props().selected).toBeFalsy()
      })
      it("hides the 'use new card' stuff initially", async () => {
        expect(page.useNewCardSectionIsVisible).toBeFalsy()
      })
      it("returns the relevant credit card id if requested", async () => {
        expect(await page.getCreditCardId()).toMatchObject({
          creditCardId: "card-id-1",
          type: "success",
        })
      })
      it("returns the relevante credit card id if you select a different card", async () => {
        await page.clickRadio(1)
        expect(await page.getCreditCardId()).toMatchObject({
          creditCardId: "card-id-2",
          type: "success",
        })
      })
      it("shows the 'use new card' section when you select that option", async () => {
        await page.clickRadio(2)
        expect(page.useNewCardSectionIsVisible).toBeTruthy()
      })
    })

    describe("when returning to the payment page when the initial card is saved", () => {
      let page: PaymentPickerTestPage
      beforeAll(async () => {
        page = await getPage(cards, orderWithCard)
      })
      describe("with two cards", () => {
        it("the card associated with the order is selected", async () => {
          expect(page.radios.at(1).props().selected).toBeTruthy()
          expect(page.radios.at(0).props().selected).toBeFalsy()
          expect(page.radios.at(2).props().selected).toBeFalsy()
        })
      })
    })
    describe("when returning to the payment page when the initial card is not saved", () => {
      let page: PaymentPickerTestPage
      beforeAll(async () => {
        page = await getPage(cards, orderWithUnsavedCard)
      })
      describe("with two saved cards", () => {
        it("shows a radio button for the unsaved card", async () => {
          expect(page.radios).toHaveLength(4)
          expect(page.radios.at(0).text()).toMatchInlineSnapshot(
            `"visa•••• 6789   Exp 12/22"`
          )
        })
        it("the card associated with the order is selected", async () => {
          expect(page.radios.at(0).props().selected).toBeTruthy()
          expect(page.radios.at(1).props().selected).toBeFalsy()
          expect(page.radios.at(2).props().selected).toBeFalsy()
          expect(page.radios.at(3).props().selected).toBeFalsy()
        })
      })
    })
  })

  describe("saving a card", () => {
    it("by default saves new cards", async () => {
      createTokenMock.mockReturnValue(
        Promise.resolve({ token: { id: "tokenId", postalCode: "1324" } })
      )
      const page = await env.buildPage()
      expect(page.saveCardCheckbox.props().selected).toBe(true)
      await page.getCreditCardId()
      expect(env.mutations.lastFetchVariables.input.oneTimeUse).toBe(false)
    })

    it("can also not save new cards", async () => {
      createTokenMock.mockReturnValue(
        Promise.resolve({ token: { id: "tokenId" } })
      )
      const page = await env.buildPage()
      expect(page.saveCardCheckbox.props().selected).toBe(true)
      page.saveCardCheckbox.simulate("click")
      await page.update()
      expect(page.saveCardCheckbox.props().selected).toBe(false)
      await page.getCreditCardId()
      expect(env.mutations.lastFetchVariables.input.oneTimeUse).toBe(true)
    })
  })

  describe("Analytics", () => {
    it("tracks click when use shipping address checkbox transitions from checked to unchecked but not from unchecked to checked", async () => {
      const page = await env.buildPage()
      // Initial state is checked
      await page.toggleSameAddressCheckbox()
      expect(mockPostEvent).toBeCalledWith({
        action_type: "Click",
        flow: "buy now",
        subject: "use shipping address",
        type: "checkbox",
      })
      expect(mockPostEvent).toHaveBeenCalledTimes(1)

      mockPostEvent.mockClear()

      // State is now unchecked
      await page.toggleSameAddressCheckbox()

      expect(mockPostEvent).not.toBeCalled()
    })

    it("doesn't track clicks on the address checkbox when order status is not pending", async () => {
      const page = await env.buildPage({
        mockData: {
          order: {
            ...OfferOrderWithShippingDetails,
            state: "SUBMITTED",
          },
        },
      })
      await page.toggleSameAddressCheckbox()
      expect(mockPostEvent).not.toHaveBeenCalled()
    })
  })

  describe("Validations", () => {
    it("says a required field is required with billing address exposed", async () => {
      const page = await env.buildPage()
      await page.toggleSameAddressCheckbox()
      await page.getCreditCardId()

      const input = page
        .find(Input)
        .filterWhere(wrapper => wrapper.props().title === "Name on card")
      expect(input.props().error).toEqual("This field is required")
    })

    it("before submit, only shows a validation error on inputs that have been touched", async () => {
      const page = await env.buildPage()
      await page.toggleSameAddressCheckbox()

      fillIn(page.root, { title: "Name on card", value: "Erik David" })
      fillIn(page.root, { title: "Address line 1", value: "" })
      page.root.update()

      const [addressInput, cityInput] = ["Address line 1", "City"].map(label =>
        page.find(Input).filterWhere(wrapper => wrapper.props().title === label)
      )

      expect(addressInput.props().error).toBeTruthy()
      expect(cityInput.props().error).toBeFalsy()
    })

    it("after submit, shows all validation errors on inputs that have been touched", async () => {
      const page = await env.buildPage()
      await page.toggleSameAddressCheckbox()

      fillIn(page.root, { title: "Name on card", value: "Erik David" })

      await page.getCreditCardId()

      const cityInput = page
        .find(Input)
        .filterWhere(wrapper => wrapper.props().title === "City")

      expect(cityInput.props().error).toBeTruthy()
    })

    it("does not submit an empty form with billing address exposed", async () => {
      const page = await env.buildPage()
      await page.toggleSameAddressCheckbox()
      await page.getCreditCardId()

      expect(env.mutations.mockFetch).not.toBeCalled()
    })

    it("does not submit the mutation with an incomplete form with billing address exposed", async () => {
      const page = await env.buildPage()
      await page.toggleSameAddressCheckbox()
      await page.getCreditCardId()
      expect(env.mutations.mockFetch).not.toBeCalled()
    })

    it("allows a missing postal code if the selected country is not US or Canada", async () => {
      createTokenMock.mockReturnValue(
        Promise.resolve({ token: { id: "tokenId" } })
      )
      const page = await env.buildPage()
      await page.toggleSameAddressCheckbox()

      const address = {
        addressLine1: "401 Broadway",
        addressLine2: "",
        city: "New York",
        country: "AQ",
        name: "Erik David",
        phoneNumber: "5555937743",
        postalCode: "",
        region: "NY",
      }

      fillAddressForm(page.root, address)
      await page.getCreditCardId()
      expect(createTokenMock).toBeCalled()
      expect(env.mutations.mockFetch).toBeCalledTimes(1)
    })

    it("allows a missing state/province if the selected country is not US or Canada", async () => {
      createTokenMock.mockReturnValue(
        Promise.resolve({ token: { id: "tokenId" } })
      )
      const page = await env.buildPage()
      await page.toggleSameAddressCheckbox()

      const address = {
        addressLine1: "401 Broadway",
        addressLine2: "",
        city: "New York",
        country: "AQ",
        name: "Erik David",
        phoneNumber: "5555937743",
        postalCode: "7Z",
        region: "",
      }
      fillAddressForm(page.root, address)

      await page.getCreditCardId()

      expect(createTokenMock).toBeCalled()
      expect(env.mutations.mockFetch).toBeCalledTimes(1)
    })
  })
})
