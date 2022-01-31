import { BorderedRadio, Checkbox, Collapse, Link, Input } from "@artsy/palette"
import { PaymentPicker_me$data } from "v2/__generated__/PaymentPicker_me.graphql"
import { PaymentPickerTestQuery$rawResponse } from "v2/__generated__/PaymentPickerTestQuery.graphql"
import {
  BuyOrderPickup,
  BuyOrderWithShippingDetails,
  OfferOrderWithShippingDetails,
  ShippingDetails,
} from "v2/Apps/__tests__/Fixtures/Order"
import { creatingCreditCardSuccess } from "v2/Apps/Order/Routes/__fixtures__/MutationResults"
import { injectCommitMutation } from "v2/Apps/Order/Utils/commitMutation"
import {
  fillCountrySelect,
  fillIn,
  validAddress,
} from "v2/Components/__tests__/Utils/addressForm"
import { Address, AddressForm } from "v2/Components/AddressForm"
import { createTestEnv } from "v2/DevTools/createTestEnv"
import { RootTestPage } from "v2/DevTools/RootTestPage"
import { graphql } from "react-relay"
import { PaymentPicker, PaymentPickerFragmentContainer } from "../PaymentPicker"
import type { Token, StripeError } from "@stripe/stripe-js"
import { mockStripe } from "v2/DevTools/mockStripe"

jest.mock("sharify", () => ({
  data: {
    STRIPE_PUBLISHABLE_KEY: "",
  },
}))

jest.unmock("react-relay")
jest.unmock("react-tracking")
jest.mock("v2/Utils/Events", () => ({
  postEvent: jest.fn(),
}))

const mockPostEvent = require("v2/Utils/Events").postEvent as jest.Mock

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

const { _mockStripe, _mockReset } = require("@stripe/stripe-js")

_mockReset()
_mockStripe().createToken.mockImplementation(() =>
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
      .find('[role="radio"]')
      .hostNodes()
      .simulate("click")
    await this.update()
  }
}

const defaultData: PaymentPickerTestQuery$rawResponse = {
  me: {
    id: "my-id",
    creditCards: {
      edges: [],
    },
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
      query PaymentPickerTestQuery @raw_response_type @relay_test_operation {
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
      query PaymentPickerEigenTestQuery
        @raw_response_type
        @relay_test_operation {
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
    _mockReset()
    _mockStripe().createToken.mockImplementation(() =>
      Promise.resolve({ error: "bad error" })
    )
    env.clearErrors()
    eigenEnv.clearErrors()
  })

  afterEach(() => {
    env.clearMocksAndErrors()
    eigenEnv.clearMocksAndErrors()
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

  it("does not pre-populate with available details when returning to the payment route", async () => {
    const page = await env.buildPage({
      mockData: {
        order: {
          ...BuyOrderPickup,
          id: "1234",
          creditCard: {
            internalID: "credit-card-id",
            name: "Artsy UK Ltd",
            street1: "14 Gower's Walk",
            street2: "Suite 2.5, The Loom",
            city: "London",
            state: "Whitechapel",
            country: "UK",
            postalCode: "E1 8PY",
            expirationMonth: 12,
            expirationYear: 2022,
            lastDigits: "1234",
            brand: "Visa",
          },
        },
      },
    })

    expect(page.addressForm.props().value).toEqual({
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

  it("always uses the billing address for stripe tokenization when the user selected 'pick' shipping option", async () => {
    const page = await env.buildPage({
      mockData: {
        order: {
          ...BuyOrderPickup,
          id: "1234",
          creditCard: null,
        },
      },
    })

    fillAddressForm(page.root, validAddress)

    await page.getCreditCardId()

    expect(_mockStripe().createToken).toHaveBeenLastCalledWith(null, {
      name: "Artsy UK Ltd",
      address_line1: "14 Gower's Walk",
      address_line2: "Suite 2.5, The Loom",
      address_city: "Whitechapel",
      address_state: "London",
      address_zip: "E1 8PY",
      address_country: "UK",
    })
  })

  it("tokenizes credit card information using shipping address as billing address", async () => {
    const page = await env.buildPage()

    await page.getCreditCardId()

    expect(_mockStripe().createToken).toHaveBeenLastCalledWith(null, {
      name: "Joelle Van Dyne",
      address_line1: "401 Broadway",
      address_line2: "Suite 25",
      address_city: "New York",
      address_state: "NY",
      address_zip: "10013",
      address_country: "US",
    })
  })

  it("tokenizes credit card information with a different billing address", async () => {
    const page = await env.buildPage()
    await page.toggleSameAddressCheckbox()
    fillAddressForm(page.root, validAddress)
    await page.getCreditCardId()

    expect(_mockStripe().createToken).toHaveBeenLastCalledWith(null, {
      name: "Artsy UK Ltd",
      address_line1: "14 Gower's Walk",
      address_line2: "Suite 2.5, The Loom",
      address_city: "Whitechapel",
      address_state: "London",
      address_zip: "E1 8PY",
      address_country: "UK",
    })
  })

  it("commits createCreditCard mutation with stripe token id", async () => {
    const stripeToken: { token: Token } = {
      token: {
        id: "tokenId",
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        object: null,
        client_ip: null,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        created: null,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        livemode: null,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        type: null,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        used: null,
      },
    }

    _mockStripe().createToken.mockReturnValue(Promise.resolve(stripeToken))

    const page = await env.buildPage()
    await page.getCreditCardId()

    expect(env.mutations.mockFetch.mock.calls[0][1]).toMatchObject({
      input: {
        token: "tokenId",
      },
    })
  })

  it("shows an error message when CreateToken passes in an error", async () => {
    const stripeError: { error: StripeError } = {
      error: {
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        type: null,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        charge: null,
        message: "Your card number is invalid.",
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        code: null,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        decline_code: null,
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        param: null,
      },
    }

    _mockStripe().createToken.mockReturnValue(Promise.resolve(stripeError))

    const page = await env.buildPage()

    expect(page.root.text()).not.toContain("Your card number is invalid.")

    await page.getCreditCardId()

    expect(page.root.text()).toContain("Your card number is invalid.")
  })

  describe("when the user has existing credit cards", () => {
    const cards: Array<NonNullable<
      NonNullable<
        NonNullable<
          NonNullable<PaymentPicker_me$data["creditCards"]>["edges"]
        >[0]
      >["node"]
    >> = [
      {
        internalID: "card-id-1",
        brand: "MasterCard",
        lastDigits: "1234",
        expirationMonth: 1,
        expirationYear: 2018,
      },
      {
        internalID: "card-id-2",
        brand: "Visa",
        lastDigits: "2345",
        expirationMonth: 1,
        expirationYear: 2019,
      },
    ]

    const orderCard = {
      id: "card-id-2",
      internalID: "card-id-2",
      name: "Chareth Cutestory",
      street1: "1 Art st",
      street2: null,
      city: "New York",
      state: "NY",
      country: "USA",
      postalCode: "90210",
      brand: "Visa",
      lastDigits: "2345",
      expirationMonth: 1,
      expirationYear: 2019,
    }

    const unsavedOrderCard = {
      id: "card-id-3",
      internalID: "card-id-3",
      name: "Chareth Cutestory",
      street1: "101 Art st",
      street2: null,
      city: "New York",
      state: "NY",
      country: "USA",
      postalCode: "90210",
      brand: "Visa",
      lastDigits: "6789",
      expirationMonth: 12,
      expirationYear: 2022,
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
          type: "success",
          creditCardId: "card-id-1",
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
          type: "success",
          creditCardId: "card-id-1",
        })
      })
      it("returns the relevante credit card id if you select a different card", async () => {
        await page.clickRadio(1)
        expect(await page.getCreditCardId()).toMatchObject({
          type: "success",
          creditCardId: "card-id-2",
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
      _mockStripe().createToken.mockReturnValue(
        Promise.resolve({ token: { id: "tokenId", postalCode: "1324" } })
      )
      const page = await env.buildPage()
      expect(page.saveCardCheckbox.props().selected).toBe(true)
      await page.getCreditCardId()
      expect(env.mutations.lastFetchVariables.input.oneTimeUse).toBe(false)
    })

    it("can also not save new cards", async () => {
      _mockStripe().createToken.mockReturnValue(
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
        subject: "use shipping address",
        flow: "buy now",
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

      await page.update()
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
      _mockStripe().createToken.mockReturnValue(
        Promise.resolve({ token: { id: "tokenId" } })
      )
      const page = await env.buildPage()
      await page.toggleSameAddressCheckbox()

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

      fillAddressForm(page.root, address)
      await page.update()
      await page.getCreditCardId()
      expect(_mockStripe().createToken).toBeCalled()
      expect(env.mutations.mockFetch).toBeCalledTimes(1)
    })

    it("allows a missing state/province if the selected country is not US or Canada", async () => {
      _mockStripe().createToken.mockReturnValue(
        Promise.resolve({ token: { id: "tokenId" } })
      )
      const page = await env.buildPage()
      await page.toggleSameAddressCheckbox()

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
      fillAddressForm(page.root, address)

      await page.update()
      await page.getCreditCardId()

      expect(_mockStripe().createToken).toBeCalled()
      expect(env.mutations.mockFetch).toBeCalledTimes(1)
    })
    it("overwrites null shipping address items with empty string when shipping address is selected for billing", async () => {
      const defaultDataWithIncompleteShipping = {
        ...defaultData,
        order: {
          ...BuyOrderWithShippingDetails,
          creditCard: null,
          buyerPhoneNumber: 123456,
          requestedFulfillment: {
            ...ShippingDetails.requestedFulfillment,
            addressLine2: null,
          },
        },
      }
      const page = await env.buildPage({
        mockData: defaultDataWithIncompleteShipping,
      })
      await page.getCreditCardId()

      expect(_mockStripe().createToken).toHaveBeenCalledWith(
        null,
        expect.objectContaining({
          address_line2: "",
        })
      )
    })
  })
})
