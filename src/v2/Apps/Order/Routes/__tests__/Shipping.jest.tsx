import { ShippingTestQueryRawResponse } from "v2/__generated__/ShippingTestQuery.graphql"
import { cloneDeep } from "lodash"

import { RadioGroup } from "@artsy/palette"
import {
  UntouchedBuyOrder,
  UntouchedOfferOrder,
} from "v2/Apps/__tests__/Fixtures/Order"
import {
  fillCountrySelect,
  fillIn,
  fillInPhoneNumber,
  validAddress,
} from "v2/Components/__tests__/Utils/addressForm"
import { Address } from "v2/Components/AddressForm"
import { CountrySelect } from "v2/Components/CountrySelect"
import Input from "v2/Components/Input"
import { createTestEnv } from "v2/DevTools/createTestEnv"
import { commitMutation as _commitMutation, graphql } from "react-relay"
import {
  settingOrderShipmentFailure,
  settingOrderShipmentMissingCountryFailure,
  settingOrderShipmentMissingRegionFailure,
  settingOrderShipmentSuccess,
} from "../__fixtures__/MutationResults"
import { ShippingFragmentContainer } from "../Shipping"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"

jest.unmock("react-relay")

const fillAddressForm = (component: any, address: Address) => {
  fillIn(component, { title: "Full name", value: address.name })
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
  fillInPhoneNumber(component, {
    value: address.phoneNumber,
  })
  fillCountrySelect(component, address.country)
}

const testOrder: ShippingTestQueryRawResponse["order"] = {
  ...UntouchedBuyOrder,
  internalID: "1234",
  id: "1234",
}

class ShippingTestPage extends OrderAppTestPage {
  async selectPickupOption() {
    this.find("Radio").last().simulate("click")
    await this.update()
  }
}

describe("Shipping", () => {
  const { mutations, buildPage, routes } = createTestEnv({
    Component: ShippingFragmentContainer,
    defaultData: { order: testOrder },
    defaultMutationResults: {
      ...settingOrderShipmentSuccess,
    },
    query: graphql`
      query ShippingTestQuery @raw_response_type {
        order: commerceOrder(id: "unused") {
          ...Shipping_order
        }
      }
    `,
    TestPage: ShippingTestPage,
  })

  it("removes radio group if pickup_available flag is false", async () => {
    const pickupAvailableOrder = cloneDeep(testOrder) as any
    pickupAvailableOrder.lineItems.edges[0].node.artwork.pickup_available = false
    const page = await buildPage({ mockData: { order: pickupAvailableOrder } })
    expect(page.find(RadioGroup).length).toEqual(0)
  })

  it("disables country select when onlyShipsDomestically is true and artwork is not in EU local zone", async () => {
    const domesticShippingOnlyOrder = cloneDeep(testOrder) as any
    domesticShippingOnlyOrder.lineItems.edges[0].node.artwork.onlyShipsDomestically = true
    domesticShippingOnlyOrder.lineItems.edges[0].node.artwork.euShippingOrigin = false
    const page = await buildPage({
      mockData: { order: domesticShippingOnlyOrder },
    })
    expect(page.find(CountrySelect).props().disabled).toBe(true)
  })

  it("does not disable select when onlyShipsDomestically is true but artwork is located in EU local zone", async () => {
    const domesticShippingEUOrder = cloneDeep(testOrder) as any
    domesticShippingEUOrder.lineItems.edges[0].node.artwork.onlyShipsDomestically = true
    domesticShippingEUOrder.lineItems.edges[0].node.artwork.euShippingOrigin = true
    const page = await buildPage({
      mockData: { order: domesticShippingEUOrder },
    })
    expect(page.find(CountrySelect).props().disabled).toBe(false)
  })

  it("commits the mutation with the orderId", async () => {
    const page = await buildPage()

    fillAddressForm(page.root, validAddress)

    expect(mutations.mockFetch).not.toHaveBeenCalled()
    await page.clickSubmit()

    expect(mutations.mockFetch).toHaveBeenCalledTimes(1)
    expect(mutations.lastFetchVariables).toMatchInlineSnapshot(`
      Object {
        "input": Object {
          "fulfillmentType": "SHIP",
          "id": "1234",
          "phoneNumber": "8475937743",
          "shipping": Object {
            "addressLine1": "14 Gower's Walk",
            "addressLine2": "Suite 2.5, The Loom",
            "city": "Whitechapel",
            "country": "UK",
            "name": "Artsy UK Ltd",
            "phoneNumber": "",
            "postalCode": "E1 8PY",
            "region": "London",
          },
        },
      }
    `)
  })

  it("commits the mutation with shipping option", async () => {
    const page = await buildPage()

    fillAddressForm(page.root, {
      ...validAddress,
      region: "New Brunswick",
      country: "US",
    })

    await page.clickSubmit()
    expect(mutations.lastFetchVariables.input.shipping.region).toBe(
      "New Brunswick"
    )
    expect(mutations.lastFetchVariables.input.shipping.country).toBe("US")
  })

  it("commits the mutation with pickup option", async () => {
    const page = await buildPage()
    await page.selectPickupOption()
    fillInPhoneNumber(page.root, { isPickup: true, value: "2813308004" })
    expect(mutations.mockFetch).not.toHaveBeenCalled()
    await page.clickSubmit()
    expect(mutations.mockFetch).toHaveBeenCalledTimes(1)
    expect(mutations.lastFetchVariables.input.fulfillmentType).toBe("PICKUP")
  })

  describe("mutation", () => {
    let page: ShippingTestPage
    beforeEach(async () => {
      page = await buildPage()
    })

    it("routes to payment screen after mutation completes", async () => {
      fillAddressForm(page.root, validAddress)
      await page.clickSubmit()
      expect(routes.mockPushRoute).toHaveBeenCalledWith("/orders/1234/payment")
    })

    it("shows the button spinner while loading the mutation", async () => {
      fillAddressForm(page.root, validAddress)
      await page.expectButtonSpinnerWhenSubmitting()
    })

    it("shows an error modal when there is an error from the server", async () => {
      mutations.useResultsOnce(settingOrderShipmentFailure)
      fillAddressForm(page.root, validAddress)
      await page.clickSubmit()
      await page.expectAndDismissDefaultErrorDialog()
    })

    it("shows an error modal when there is a network error", async () => {
      fillAddressForm(page.root, validAddress)
      mutations.mockNetworkFailureOnce()
      await page.clickSubmit()
      await page.expectAndDismissDefaultErrorDialog()
    })

    it("shows a validation error modal when there is a missing_country error from the server", async () => {
      mutations.useResultsOnce(settingOrderShipmentMissingCountryFailure)
      fillAddressForm(page.root, validAddress)
      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Invalid address",
        "There was an error processing your address. Please review and try again."
      )
    })

    it("shows a validation error modal when there is a missing_region error from the server", async () => {
      mutations.useResultsOnce(settingOrderShipmentMissingRegionFailure)
      fillAddressForm(page.root, validAddress)
      await page.clickSubmit()
      await page.expectAndDismissErrorDialogMatching(
        "Invalid address",
        "There was an error processing your address. Please review and try again."
      )
    })
  })

  describe("with previously filled-in data", () => {
    let page: ShippingTestPage
    beforeEach(async () => {
      page = await buildPage({
        mockData: {
          order: {
            ...testOrder,
            requestedFulfillment: {
              ...validAddress,
              __typename: "CommerceShip",
              name: "Dr Collector",
            },
          },
        },
      })
    })

    it("includes already-filled-in data if available", () => {
      const input = page
        .find(Input)
        .filterWhere(wrapper => wrapper.props().title === "Full name")

      expect(input.props().value).toBe("Dr Collector")
    })

    it("includes already-filled-in data in mutation if re-sent", async () => {
      await page.clickSubmit()
      expect(mutations.lastFetchVariables.input).toMatchObject({
        shipping: {
          name: "Dr Collector",
        },
      })
    })
  })

  describe("Validations", () => {
    let page: ShippingTestPage
    beforeEach(async () => {
      page = await buildPage()
    })

    describe("for Ship orders", () => {
      it("does not submit an empty form for a SHIP order", async () => {
        await page.clickSubmit()
        expect(mutations.mockFetch).not.toBeCalled()
      })

      it("does not submit the mutation with an incomplete form for a SHIP order", async () => {
        fillIn(page.root, { title: "Full name", value: "Air Bud" })
        await page.clickSubmit()
        expect(mutations.mockFetch).not.toBeCalled()
      })

      it("does submit the mutation with a complete form for a SHIP order", async () => {
        fillAddressForm(page.root, validAddress)
        await page.clickSubmit()
        expect(mutations.mockFetch).toBeCalled()
      })

      it("says a required field is required for a SHIP order", async () => {
        await page.clickSubmit()
        const input = page
          .find(Input)
          .filterWhere(wrapper => wrapper.props().title === "Full name")
        expect(input.props().error).toEqual("This field is required")
      })

      it("allows a missing postal code if the selected country is not US or Canada", async () => {
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
        await page.clickSubmit()

        const input = page
          .find(Input)
          .filterWhere(wrapper => wrapper.props().title === "Postal code")
        expect(input.props().error).toBeFalsy()

        expect(mutations.mockFetch).toBeCalled()
      })

      it("before submit, only shows a validation error on inputs that have been touched", async () => {
        fillIn(page.root, { title: "Full name", value: "Erik David" })
        fillIn(page.root, { title: "Address line 1", value: "" })

        await page.update()

        const [addressInput, cityInput] = [
          "Address line 1",
          "City",
        ].map(label =>
          page
            .find(Input)
            .filterWhere(wrapper => wrapper.props().title === label)
        )

        expect(addressInput.props().error).toBeTruthy()
        expect(cityInput.props().error).toBeFalsy()
      })

      it("after submit, shows all validation errors on inputs that have been touched", async () => {
        fillIn(page.root, { title: "Full name", value: "Erik David" })

        await page.clickSubmit()

        const cityInput = page.root
          .find(Input)
          .filterWhere(wrapper => wrapper.props().title === "City")

        expect(cityInput.props().error).toBeTruthy()
      })

      it("does not submit the mutation without a phone number", async () => {
        const address = {
          name: "Erik David",
          addressLine1: "401 Broadway",
          addressLine2: "",
          city: "New York",
          region: "",
          postalCode: "7Z",
          phoneNumber: "",
          country: "AQ",
        }
        fillAddressForm(page.root, address)
        await page.clickSubmit()
        expect(mutations.mockFetch).not.toBeCalled()
      })

      it("allows a missing state/province if the selected country is not US or Canada", async () => {
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
        await page.clickSubmit()
        expect(mutations.mockFetch).toBeCalled()
      })
    })

    it("does submit the mutation with a non-ship order", async () => {
      await page.selectPickupOption()
      fillInPhoneNumber(page.root, { isPickup: true, value: "2813308004" })
      await page.clickSubmit()
      expect(mutations.mockFetch).toBeCalled()
    })

    it("does not submit the mutation with an incomplete form for a PICKUP order", async () => {
      await page.selectPickupOption()
      await page.clickSubmit()
      expect(mutations.mockFetch).not.toBeCalled()
    })
  })

  describe("Offer-mode orders", () => {
    it("shows an active offer stepper if the order is an Offer Order", async () => {
      const page = await buildPage({
        mockData: {
          order: UntouchedOfferOrder,
        },
      })
      expect(page.orderStepper.text()).toMatchInlineSnapshot(
        `"CheckOffer Navigate rightShippingNavigate rightPaymentNavigate rightReview"`
      )
      expect(page.orderStepperCurrentStep).toBe("Shipping")
    })
  })
})
