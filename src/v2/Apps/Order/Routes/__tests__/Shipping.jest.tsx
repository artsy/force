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
import { Input as paletteInput } from "@artsy/palette"
import { createTestEnv } from "v2/DevTools/createTestEnv"
import { commitMutation as _commitMutation, graphql } from "react-relay"
import {
  settingOrderShipmentFailure,
  settingOrderShipmentMissingCountryFailure,
  settingOrderShipmentMissingRegionFailure,
  settingOrderShipmentSuccess,
} from "../__fixtures__/MutationResults"
import { ShippingFragmentContainer, ShippingRoute } from "../Shipping"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import {
  saveAddressSuccess,
  updateAddressSuccess,
} from "../__fixtures__/MutationResults/saveAddress"

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

const pageInfo = {
  startCursor: "aaa",
  endCursor: "bbb",
  hasNextPage: false,
  hasPreviousPage: false,
}

const emptyTestMe: ShippingTestQueryRawResponse["me"] = {
  name: "Test Name",
  email: "test@gmail.com",
  id: "4321",
  addressConnection: {
    edges: [],
    pageInfo,
  },
}

const testMe: ShippingTestQueryRawResponse["me"] = {
  name: "Test Name",
  email: "test@gmail.com",
  id: "4321",
  addressConnection: {
    edges: [
      {
        node: {
          __typename: "UserAddress",
          internalID: "1",
          addressLine1: "1 Main St",
          addressLine2: "",
          addressLine3: "",
          city: "Madrid",
          country: "Spain",
          isDefault: false,
          name: "Test Name",
          phoneNumber: "555-555-5555",
          postalCode: "28001",
          region: "",
          id: "addressID1",
        },
        cursor: "aaa",
      },
      {
        node: {
          __typename: "UserAddress",
          internalID: "2",
          addressLine1: "401 Broadway",
          addressLine2: "Floor 25",
          addressLine3: "",
          city: "New York",
          country: "USA",
          isDefault: true,
          name: "Test Name",
          phoneNumber: "422-424-4242",
          postalCode: "10013",
          region: "NY",
          id: "addressID2",
        },
        cursor: "aaa",
      },
    ],
    pageInfo,
  },
}

class ShippingTestPage extends OrderAppTestPage {
  async selectPickupOption() {
    this.find(`[data-test="pickupOption"]`).last().simulate("click")
    await this.update()
  }
}

describe("Shipping", () => {
  const { mutations, buildPage, routes } = createTestEnv({
    Component: ShippingFragmentContainer,
    defaultData: { order: testOrder, me: emptyTestMe },
    defaultMutationResults: {
      ...settingOrderShipmentSuccess,
      ...saveAddressSuccess,
      ...updateAddressSuccess,
    },
    query: graphql`
      query ShippingTestQuery @raw_response_type {
        order: commerceOrder(id: "unused") {
          ...Shipping_order
        }
        me {
          ...Shipping_me
        }
      }
    `,
    TestPage: ShippingTestPage,
  })
  describe("with no saved addresses", () => {
    it("removes radio group if pickup_available flag is false", async () => {
      const pickupAvailableOrder = cloneDeep(testOrder) as any
      pickupAvailableOrder.lineItems.edges[0].node.artwork.pickup_available = false
      const page = await buildPage({
        mockData: { order: pickupAvailableOrder },
      })
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

    it("commits set shipping mutation with the orderId and save address", async () => {
      const page = await buildPage()

      fillAddressForm(page.root, validAddress)

      expect(mutations.mockFetch).not.toHaveBeenCalled()

      await page.clickSubmit()

      expect(mutations.mockFetch).toHaveBeenCalledTimes(2)
      expect(mutations.mockFetch.mock.calls.map(call => call[0].name)).toEqual([
        "SetShippingMutation",
        "CreateUserAddressMutation",
      ])
      expect(mutations.mockFetch.mock.calls).toMatchSnapshot()
    })

    it("commits the mutation with the orderId when save address is not selected", async () => {
      const page = await buildPage()

      fillAddressForm(page.root, validAddress)

      expect(mutations.mockFetch).not.toHaveBeenCalled()

      page.find(`[data-test="save-address-checkbox"]`).first().simulate("click")

      expect(page.find(ShippingRoute).state().saveAddress).toEqual(false)

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
      expect(mutations.mockFetch.mock.calls.map(call => call[1].input))
        .toMatchInlineSnapshot(`
        Array [
          Object {
            "fulfillmentType": "SHIP",
            "id": "1234",
            "phoneNumber": "8475937743",
            "shipping": Object {
              "addressLine1": "14 Gower's Walk",
              "addressLine2": "Suite 2.5, The Loom",
              "city": "Whitechapel",
              "country": "US",
              "name": "Artsy UK Ltd",
              "phoneNumber": "",
              "postalCode": "E1 8PY",
              "region": "New Brunswick",
            },
          },
          Object {
            "attributes": Object {
              "addressLine1": "14 Gower's Walk",
              "addressLine2": "Suite 2.5, The Loom",
              "city": "Whitechapel",
              "country": "US",
              "name": "Artsy UK Ltd",
              "phoneNumber": "8475937743",
              "postalCode": "E1 8PY",
              "region": "New Brunswick",
            },
          },
        ]
      `)
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
        expect(routes.mockPushRoute).toHaveBeenCalledWith(
          "/orders/1234/payment"
        )
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
        expect(mutations.mockFetch).toBeCalled()
        expect(
          mutations.mockFetch.mock.calls[0][1].input.shipping.name
        ).toEqual("Dr Collector")
        expect(
          mutations.mockFetch.mock.calls[1][1].input.attributes.name
        ).toEqual("Dr Collector")
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
  describe("with saved addresses", () => {
    let page
    beforeEach(async () => {
      page = await buildPage({
        mockData: {
          me: testMe,
        },
      })
    })
    it("does not show the new address form", async () => {
      expect(
        page.find(`[data-test="addressFormCollapse"]`).props().open
      ).toEqual(false)
    })
    it("opens the empty pick-up phone number input", async () => {
      await page.selectPickupOption()
      expect(
        page.find(`[data-test="phoneNumberCollapse"]`).props().open
      ).toEqual(true)
      expect(
        page.find(`[data-test="pickupPhoneNumberForm"]`).props().value
      ).toEqual("")
    })
    it("lists the addresses and renders the add address option", async () => {
      expect(
        page.find(`Radio__BorderedRadio[value="NEW_ADDRESS"]`).length
      ).toEqual(1)
      expect(
        page.find(`Radio__BorderedRadio[data-test="savedAddress"]`).length
      ).toEqual(2)
      expect(page.text()).toContain(
        "Test Name1 Main StMadrid, Spain, 28001555-555-5555"
      )
      expect(page.text()).toContain(
        "Test Name401 BroadwayFloor 25New York, NY, USA, 10013422-424-4242"
      )
    })
    it("saves the default address selection into state", async () => {
      expect(page.find(ShippingRoute).state().selectedSavedAddress).toEqual("1")
    })
    it("commits the mutation with selected address and phone number", async () => {
      await page.clickSubmit()

      expect(mutations.mockFetch).toHaveBeenCalledTimes(1)
      expect(mutations.lastFetchVariables).toMatchInlineSnapshot(`
        Object {
          "input": Object {
            "fulfillmentType": "SHIP",
            "id": "1234",
            "phoneNumber": "422-424-4242",
            "shipping": Object {
              "addressLine1": "401 Broadway",
              "addressLine2": "Floor 25",
              "city": "New York",
              "country": "USA",
              "name": "Test Name",
              "phoneNumber": "422-424-4242",
              "postalCode": "10013",
              "region": "NY",
            },
          },
        }
      `)
    })
    it("when another saved address is selected commits mutation with selected address and phone number", async () => {
      page
        .find(`Radio__BorderedRadio[data-test="savedAddress"]`)
        .first()
        .simulate("click")
      await page.update()
      expect(page.find(ShippingRoute).state().selectedSavedAddress).toEqual("0")
      await page.clickSubmit()

      expect(mutations.mockFetch).toHaveBeenCalledTimes(1)
      expect(mutations.mockFetch.mock.calls[0][0].name).toEqual(
        "SetShippingMutation"
      )
      expect(mutations.lastFetchVariables).toMatchInlineSnapshot(`
        Object {
          "input": Object {
            "fulfillmentType": "SHIP",
            "id": "1234",
            "phoneNumber": "555-555-5555",
            "shipping": Object {
              "addressLine1": "1 Main St",
              "addressLine2": "",
              "city": "Madrid",
              "country": "Spain",
              "name": "Test Name",
              "phoneNumber": "555-555-5555",
              "postalCode": "28001",
              "region": "",
            },
          },
        }
      `)
    })
    describe("editing address", () => {
      it("opens modal with current address values", async () => {
        expect(page.find(ShippingRoute).state().editAddressIndex).toBe(-1)
        await page.find(`[data-test="edit-address"]`).first().simulate("click")
        expect(page.find(ShippingRoute).state().editAddressIndex).toBe(0)

        expect(page.find("AddressModal").length).toBe(1)
        expect(
          page
            .find("AddressModal")
            .find(paletteInput)
            .map(input => input.props().value)
        ).toMatchInlineSnapshot(`
          Array [
            "Test Name",
            "28001",
            "1 Main St",
            "",
            "Madrid",
            "",
            "555-555-5555",
          ]
        `)
      })
      it("sends mutation with updated values when modal form is submitted", async () => {
        page.find(`[data-test="edit-address"]`).first().simulate("click")
        const inputs = page.find("AddressModal").find("input")
        inputs.forEach(input => {
          input.instance().value = `Test input '${input.props().name}'`
          input.simulate("change")
        })
        const countrySelect = page.find("AddressModal").find("select")
        countrySelect.instance().value = `US`
        countrySelect.simulate("change")
        const submit = page.find("AddressModal").find("button").at(0)
        submit.simulate("click")
        await page.update()
        expect(mutations.mockFetch.mock.calls[0][1]).toMatchInlineSnapshot(`
          Object {
            "input": Object {
              "attributes": Object {
                "addressLine1": "Test input 'addressLine1'",
                "addressLine2": "Test input 'addressLine2'",
                "addressLine3": "",
                "city": "Test input 'city'",
                "country": "US",
                "name": "Test input 'name'",
                "phoneNumber": "Test input 'phoneNumber'",
                "postalCode": "Test input 'postalCode'",
                "region": "Test input 'region'",
              },
              "userAddressID": "1",
            },
          }
        `)
      })
    })
  })
})
