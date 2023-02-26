import { ShippingTestQuery$rawResponse } from "__generated__/ShippingTestQuery.graphql"
import { cloneDeep } from "lodash"

import {
  UntouchedBuyOrder,
  UntouchedOfferOrder,
  UntouchedBuyOrderWithArtsyShippingDomesticFromGermany,
  UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
  UntouchedBuyOrderWithArtsyShippingInternationalFromGermany,
  UntouchedBuyOrderWithArtsyShippingInternationalFromUS,
  UntouchedBuyOrderWithShippingQuotes,
} from "Apps/__tests__/Fixtures/Order"
import {
  fillAddressForm,
  fillIn,
  fillInPhoneNumber,
  validAddress,
} from "Components/__tests__/Utils/addressForm"
import { CountrySelect } from "Components/CountrySelect"
import { Input } from "@artsy/palette"
import { graphql } from "react-relay"
import { ShippingFragmentContainer } from "Apps/Order/Routes/Shipping"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import {
  saveAddressSuccess,
  updateAddressSuccess,
} from "Apps/Order/Routes/__fixtures__/MutationResults/saveAddress"
import { useTracking } from "react-tracking"
import { flushPromiseQueue, MockBoot } from "DevTools"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import * as updateUserAddress from "Apps/Order/Mutations/UpdateUserAddress"
import * as deleteUserAddress from "Apps/Order/Mutations/DeleteUserAddress"
import {
  settingOrderShipmentSuccess,
  settingOrderShipmentFailure,
  settingOrderShipmentMissingCountryFailure,
  settingOrderShipmentMissingRegionFailure,
  settingOrderArtaShipmentSuccess,
  selectShippingQuoteSuccess,
} from "Apps/Order/Routes/__fixtures__/MutationResults/setOrderShipping"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("Utils/Hooks/useMatchMedia", () => ({
  __internal__useMatchMedia: () => ({}),
}))

jest.mock("@artsy/palette", () => {
  return {
    ...jest.requireActual("@artsy/palette"),
    ModalDialog: ({ title, children, onClose, footer }) => {
      return (
        <div data-testid="ModalDialog">
          <button onClick={onClose}>close</button>
          {title}
          {children}
          {footer}
        </div>
      )
    },
  }
})

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
jest.mock("relay-runtime", () => ({
  ...jest.requireActual("relay-runtime"),
  commitMutation: (...args) => mockCommitMutation(args),
}))

const testOrder: ShippingTestQuery$rawResponse["order"] = {
  ...UntouchedBuyOrder,
  internalID: "1234",
  id: "1234",
}

const ArtsyShippingDomesticFromUSOrder: ShippingTestQuery$rawResponse["order"] = {
  ...UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
  __typename: "CommerceBuyOrder",
  mode: "BUY",
  internalID: "1234",
  id: "1234",
}

const ArtsyShippingInternationalFromUSTestOrder: ShippingTestQuery$rawResponse["order"] = {
  ...UntouchedBuyOrderWithArtsyShippingInternationalFromUS,
  __typename: "CommerceBuyOrder",
  mode: "BUY",
  internalID: "1234",
  id: "1234",
}

const ArtsyShippingDomesticFromGermanyOrder: ShippingTestQuery$rawResponse["order"] = {
  ...UntouchedBuyOrderWithArtsyShippingDomesticFromGermany,
  __typename: "CommerceBuyOrder",
  mode: "BUY",
  internalID: "1234",
  id: "1234",
}

const ArtsyShippingInternationalFromGermanyOrder: ShippingTestQuery$rawResponse["order"] = {
  ...UntouchedBuyOrderWithArtsyShippingInternationalFromGermany,
  __typename: "CommerceBuyOrder",
  mode: "BUY",
  internalID: "1234",
  id: "1234",
}

const pageInfo = {
  startCursor: "aaa",
  endCursor: "bbb",
  hasNextPage: false,
  hasPreviousPage: false,
}

const emptyTestMe: ShippingTestQuery$rawResponse["me"] = {
  name: "Test Name",
  email: "test@gmail.com",
  id: "4321",
  addressConnection: {
    totalCount: 0,
    edges: [],
    pageInfo,
  },
}

const testMe: ShippingTestQuery$rawResponse["me"] = {
  name: "Test Name",
  email: "test@gmail.com",
  id: "4321",
  addressConnection: {
    totalCount: 0,
    edges: [
      {
        node: {
          __typename: "UserAddress",
          internalID: "1",
          addressLine1: "1 Main St",
          addressLine2: "",
          addressLine3: "",
          city: "Madrid",
          country: "ES",
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
          country: "US",
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
  const pushMock = jest.fn()
  let isCommittingMutation

  beforeEach(() => {
    isCommittingMutation = false
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
  })

  const { getWrapper } = setupTestWrapper({
    Component: (props: any) => (
      <MockBoot>
        <ShippingFragmentContainer
          router={{ push: pushMock } as any}
          order={props.order}
          me={props.me}
          // @ts-ignore
          isCommittingMutation={isCommittingMutation}
        />
      </MockBoot>
    ),
    query: graphql`
      query ShippingTestQuery @raw_response_type @relay_test_operation {
        order: commerceOrder(id: "unused") {
          ...Shipping_order
        }
        me {
          ...Shipping_me
        }
      }
    `,
  })

  describe("with no saved addresses", () => {
    it("removes radio group if pickup_available flag is false", async () => {
      const pickupAvailableOrder = cloneDeep(testOrder) as any
      pickupAvailableOrder.lineItems.edges[0].node.artwork.pickup_available = false
      const wrapper = getWrapper({
        CommerceOrder: () => pickupAvailableOrder,
      })
      const page = new ShippingTestPage(wrapper)

      expect(page.find(`[data-test="shipping-options"]`).length).toEqual(0)
    })

    it("disables country select when onlyShipsDomestically is true and artwork is not in EU local zone", async () => {
      const domesticShippingOnlyOrder = cloneDeep(testOrder) as any
      domesticShippingOnlyOrder.lineItems.edges[0].node.artwork.onlyShipsDomestically = true
      domesticShippingOnlyOrder.lineItems.edges[0].node.artwork.euShippingOrigin = false
      const wrapper = getWrapper({
        CommerceOrder: () => domesticShippingOnlyOrder,
      })
      const page = new ShippingTestPage(wrapper)

      expect(page.find(CountrySelect).props().disabled).toBe(true)
    })

    it("does not disable select when onlyShipsDomestically is true but artwork is located in EU local zone", async () => {
      const domesticShippingEUOrder = cloneDeep(testOrder) as any
      domesticShippingEUOrder.lineItems.edges[0].node.artworkShipsDomestically = true
      domesticShippingEUOrder.lineItems.edges[0].node.artwork.euShippingOrigin = true
      const wrapper = getWrapper({
        CommerceOrder: () => domesticShippingEUOrder,
      })
      const page = new ShippingTestPage(wrapper)

      expect(page.find(CountrySelect).props().disabled).toBe(false)
    })

    it("commits set shipping mutation with the orderId and save address", async () => {
      mockCommitMutation.mockResolvedValueOnce(settingOrderShipmentSuccess)
      const wrapper = getWrapper({
        CommerceOrder: () => testOrder,
        Me: () => emptyTestMe,
      })
      const page = new ShippingTestPage(wrapper)

      fillAddressForm(page.root, validAddress)

      await page.clickSubmit()

      expect(mockCommitMutation).toHaveBeenCalledTimes(2)
      expect(mockCommitMutation).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          variables: {
            input: {
              id: "1234",
              fulfillmentType: "SHIP",
              phoneNumber: validAddress.phoneNumber,
              shipping: {
                ...validAddress,
                phoneNumber: "",
              },
            },
          },
        })
      )
      expect(mockCommitMutation).toHaveBeenNthCalledWith(
        2,
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({
            variables: {
              input: {
                attributes: validAddress,
              },
            },
          }),
        ])
      )
    })

    it("commits the mutation with the orderId when save address is not selected", async () => {
      mockCommitMutation.mockResolvedValueOnce(settingOrderShipmentSuccess)
      const wrapper = getWrapper({
        CommerceOrder: () => testOrder,
        Me: () => emptyTestMe,
      })
      const page = new ShippingTestPage(wrapper)

      fillAddressForm(page.root, validAddress)

      expect(mockCommitMutation).not.toHaveBeenCalled()

      page.find(`[data-test="save-address-checkbox"]`).first().simulate("click")

      await page.clickSubmit()

      expect(mockCommitMutation).toHaveBeenCalledTimes(1)
      expect(mockCommitMutation).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            input: {
              id: "1234",
              fulfillmentType: "SHIP",
              phoneNumber: validAddress.phoneNumber,
              shipping: {
                ...validAddress,
                phoneNumber: "",
              },
            },
          },
        })
      )
    })

    it("commits the mutation with shipping option", async () => {
      mockCommitMutation.mockResolvedValueOnce(settingOrderShipmentSuccess)
      const wrapper = getWrapper({
        CommerceOrder: () => testOrder,
        Me: () => emptyTestMe,
      })
      const page = new ShippingTestPage(wrapper)

      const address = {
        ...validAddress,
        region: "New Brunswick",
        country: "US",
      }
      fillAddressForm(page.root, address)

      await page.clickSubmit()
      expect(mockCommitMutation).toHaveBeenCalledTimes(2)
      expect(mockCommitMutation).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          variables: {
            input: {
              id: "1234",
              fulfillmentType: "SHIP",
              phoneNumber: address.phoneNumber,
              shipping: {
                ...address,
                phoneNumber: "",
              },
            },
          },
        })
      )
      expect(mockCommitMutation).toHaveBeenNthCalledWith(
        2,
        expect.arrayContaining([
          expect.anything(),
          expect.objectContaining({
            variables: {
              input: {
                attributes: address,
              },
            },
          }),
        ])
      )
    })

    it("commits the mutation with pickup option", async () => {
      mockCommitMutation.mockResolvedValueOnce(settingOrderShipmentSuccess)
      const wrapper = getWrapper({
        CommerceOrder: () => testOrder,
        Me: () => emptyTestMe,
      })
      const page = new ShippingTestPage(wrapper)

      await page.selectPickupOption()
      fillInPhoneNumber(page.root, { isPickup: true, value: "2813308004" })
      expect(mockCommitMutation).not.toHaveBeenCalled()

      await page.clickSubmit()
      expect(mockCommitMutation).toHaveBeenCalledTimes(1)
      expect(mockCommitMutation).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            input: {
              id: "1234",
              fulfillmentType: "PICKUP",
              shipping: {
                addressLine1: "",
                addressLine2: "",
                country: "US",
                name: "",
                city: "",
                postalCode: "",
                region: "",
                phoneNumber: "",
              },
              phoneNumber: "2813308004",
            },
          },
        })
      )
    })

    describe("mutation", () => {
      it("routes to payment screen after mutation completes", async () => {
        mockCommitMutation.mockResolvedValueOnce(settingOrderShipmentSuccess)
        const wrapper = getWrapper({
          CommerceOrder: () => testOrder,
          Me: () => emptyTestMe,
        })
        const page = new ShippingTestPage(wrapper)

        fillAddressForm(page.root, validAddress)
        await page.clickSubmit()

        expect(pushMock).toHaveBeenCalledWith("/orders/1234/payment")
      })

      it("shows the button spinner while loading the mutation", async () => {
        isCommittingMutation = true
        const wrapper = getWrapper()
        const page = new ShippingTestPage(wrapper)

        fillAddressForm(page.root, validAddress)

        expect(page.isLoading()).toBeTruthy()
      })

      it("shows an error modal when there is an error from the server", async () => {
        mockCommitMutation.mockResolvedValueOnce(settingOrderShipmentFailure)
        const wrapper = getWrapper({
          CommerceOrder: () => testOrder,
          Me: () => emptyTestMe,
        })
        const page = new ShippingTestPage(wrapper)

        fillAddressForm(page.root, validAddress)
        await page.clickSubmit()

        expect(mockShowErrorDialog).toHaveBeenCalledWith()
      })

      it("shows an error modal when there is a network error", async () => {
        mockCommitMutation.mockRejectedValueOnce({})
        const wrapper = getWrapper({
          CommerceOrder: () => testOrder,
          Me: () => emptyTestMe,
        })
        const page = new ShippingTestPage(wrapper)

        fillAddressForm(page.root, validAddress)
        await page.clickSubmit()

        expect(mockShowErrorDialog).toHaveBeenCalledWith()
      })

      it("shows a validation error modal when there is a missing_country error from the server", async () => {
        mockCommitMutation.mockResolvedValueOnce(
          settingOrderShipmentMissingCountryFailure
        )
        const wrapper = getWrapper({
          CommerceOrder: () => testOrder,
          Me: () => emptyTestMe,
        })
        const page = new ShippingTestPage(wrapper)

        fillAddressForm(page.root, validAddress)
        await page.clickSubmit()

        expect(mockShowErrorDialog).toHaveBeenCalledWith({
          title: "Invalid address",
          message:
            "There was an error processing your address. Please review and try again.",
        })
      })

      it("shows a validation error modal when there is a missing_region error from the server", async () => {
        mockCommitMutation.mockResolvedValueOnce(
          settingOrderShipmentMissingRegionFailure
        )
        const wrapper = getWrapper({
          CommerceOrder: () => testOrder,
          Me: () => emptyTestMe,
        })
        const page = new ShippingTestPage(wrapper)

        fillAddressForm(page.root, validAddress)
        await page.clickSubmit()

        expect(mockShowErrorDialog).toHaveBeenCalledWith({
          title: "Invalid address",
          message:
            "There was an error processing your address. Please review and try again.",
        })
      })
    })

    describe("Artsy domestic shipping", () => {
      it("commits set shipping mutation and save address", async () => {
        mockCommitMutation.mockResolvedValueOnce(settingOrderShipmentSuccess)
        const wrapper = getWrapper({
          CommerceOrder: () => ArtsyShippingDomesticFromUSOrder,
          Me: () => emptyTestMe,
        })
        const page = new ShippingTestPage(wrapper)

        const address = {
          ...validAddress,
          region: "New Brunswick",
          country: "US",
        }
        fillAddressForm(page.root, address)

        await page.clickSubmit()

        expect(mockCommitMutation).toHaveBeenCalledTimes(2)
        expect(mockCommitMutation).toHaveBeenNthCalledWith(
          1,
          expect.objectContaining({
            variables: {
              input: {
                id: "1234",
                fulfillmentType: "SHIP_ARTA",
                phoneNumber: validAddress.phoneNumber,
                shipping: {
                  ...address,
                  phoneNumber: "",
                },
              },
            },
          })
        )
        expect(mockCommitMutation).toHaveBeenNthCalledWith(
          2,
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({
              variables: {
                input: {
                  attributes: address,
                },
              },
            }),
          ])
        )
      })

      it("commits selectShippingOption mutation and save address", async () => {
        mockCommitMutation.mockResolvedValueOnce(
          settingOrderArtaShipmentSuccess
        )
        const wrapper = getWrapper({
          CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
          Me: () => emptyTestMe,
        })
        const page = new ShippingTestPage(wrapper)

        const address = {
          ...validAddress,
          region: "New Brunswick",
          country: "US",
        }
        fillAddressForm(page.root, address)

        page
          .find(`[data-test="save-address-checkbox"]`)
          .first()
          .simulate("click")

        await page.clickSubmit()

        expect(mockCommitMutation).toHaveBeenCalledTimes(1)

        page.find(`[data-test="shipping-quotes"]`).last().simulate("click")

        expect(page.submitButton.props().disabled).toBeFalsy()

        mockCommitMutation.mockResolvedValueOnce(selectShippingQuoteSuccess)
        page
          .find(`[data-test="save-address-checkbox"]`)
          .first()
          .simulate("click")

        await page.clickSubmit()

        expect(mockCommitMutation).toHaveBeenCalledTimes(3)
        expect(mockCommitMutation).toHaveBeenNthCalledWith(
          2,
          expect.objectContaining({
            variables: {
              input: {
                id: "2939023",
                selectedShippingQuoteId: "1eb3ba19-643b-4101-b113-2eb4ef7e30b6",
              },
            },
          })
        )
        expect(mockCommitMutation).toHaveBeenNthCalledWith(
          3,
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({
              variables: {
                input: {
                  attributes: address,
                },
              },
            }),
          ])
        )
      })

      it("show error message if arta doesn't return shipping quotes", async () => {
        const settingOrderArtaShipmentSuccessWithoutQuotes = cloneDeep(
          settingOrderArtaShipmentSuccess
        ) as any
        settingOrderArtaShipmentSuccessWithoutQuotes.commerceSetShipping.orderOrError.order.lineItems.edges[0].node.shippingQuoteOptions.edges = []
        mockCommitMutation.mockResolvedValueOnce(
          settingOrderArtaShipmentSuccessWithoutQuotes
        )
        const wrapper = getWrapper({
          CommerceOrder: () => ArtsyShippingDomesticFromUSOrder,
          Me: () => emptyTestMe,
        })
        const page = new ShippingTestPage(wrapper)

        fillAddressForm(page.root, {
          ...validAddress,
          region: "New Brunswick",
          country: "US",
        })

        await page.clickSubmit()

        expect(page.find(`[data-test="shipping-quotes"]`)).toHaveLength(0)
        expect(page.find(`[data-test="artaErrorMessage"]`)).not.toHaveLength(0)
      })

      it("save address only once", async () => {
        mockCommitMutation
          .mockReturnValueOnce(settingOrderArtaShipmentSuccess)
          .mockImplementationOnce(relayProps => {
            relayProps[1].onCompleted(saveAddressSuccess)
          })
          .mockReturnValueOnce(selectShippingQuoteSuccess)
        const wrapper = getWrapper({
          CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
          Me: () => emptyTestMe,
        })
        const updateUserAddressSpy = jest.spyOn(
          updateUserAddress,
          "updateUserAddress"
        )
        const page = new ShippingTestPage(wrapper)

        const address = {
          ...validAddress,
          region: "New Brunswick",
          country: "US",
        }
        fillAddressForm(page.root, address)

        await page.clickSubmit()

        expect(mockCommitMutation).toHaveBeenCalledTimes(2)
        expect(mockCommitMutation).toHaveBeenNthCalledWith(
          1,
          expect.objectContaining({
            variables: {
              input: {
                fulfillmentType: "SHIP_ARTA",
                id: "2939023",
                phoneNumber: validAddress.phoneNumber,
                shipping: {
                  ...address,
                  phoneNumber: "",
                },
              },
            },
          })
        )
        expect(mockCommitMutation).toHaveBeenNthCalledWith(
          2,
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({
              variables: {
                input: { attributes: address },
              },
            }),
          ])
        )

        page.find(`[data-test="shipping-quotes"]`).last().simulate("click")

        await page.clickSubmit()

        expect(mockCommitMutation).toHaveBeenCalledTimes(3)
        expect(mockCommitMutation).toHaveBeenNthCalledWith(
          3,
          expect.objectContaining({
            variables: {
              input: {
                id: "2939023",
                selectedShippingQuoteId: "1eb3ba19-643b-4101-b113-2eb4ef7e30b6",
              },
            },
          })
        )
        expect(updateUserAddressSpy).toHaveBeenCalledWith(
          expect.anything(),
          "address-id",
          address,
          expect.anything(),
          expect.anything(),
          expect.anything()
        )
      })

      it("remove previously saved address if save address is not selected", async () => {
        mockCommitMutation
          .mockReturnValueOnce(settingOrderArtaShipmentSuccess)
          .mockImplementationOnce(relayProps => {
            relayProps[1].onCompleted(saveAddressSuccess)
          })
          .mockReturnValueOnce(selectShippingQuoteSuccess)
        const deleteUserAddressSpy = jest.spyOn(
          deleteUserAddress,
          "deleteUserAddress"
        )

        const wrapper = getWrapper({
          CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
          Me: () => emptyTestMe,
        })
        const page = new ShippingTestPage(wrapper)

        const address = {
          ...validAddress,
          region: "New Brunswick",
          country: "US",
        }
        fillAddressForm(page.root, address)

        await page.clickSubmit()

        expect(mockCommitMutation).toHaveBeenCalledTimes(2)
        expect(mockCommitMutation).toHaveBeenNthCalledWith(
          1,
          expect.objectContaining({
            variables: {
              input: {
                fulfillmentType: "SHIP_ARTA",
                id: "2939023",
                phoneNumber: validAddress.phoneNumber,
                shipping: {
                  ...address,
                  phoneNumber: "",
                },
              },
            },
          })
        )
        expect(mockCommitMutation).toHaveBeenNthCalledWith(
          2,
          expect.arrayContaining([
            expect.anything(),
            expect.objectContaining({
              variables: {
                input: { attributes: address },
              },
            }),
          ])
        )

        page.find(`[data-test="shipping-quotes"]`).last().simulate("click")
        page
          .find(`[data-test="save-address-checkbox"]`)
          .first()
          .simulate("click")

        await page.clickSubmit()

        expect(mockCommitMutation).toHaveBeenCalledTimes(3)
        expect(mockCommitMutation).toHaveBeenNthCalledWith(
          3,
          expect.objectContaining({
            variables: {
              input: {
                id: "2939023",
                selectedShippingQuoteId: "1eb3ba19-643b-4101-b113-2eb4ef7e30b6",
              },
            },
          })
        )
        expect(deleteUserAddressSpy).toHaveBeenCalledWith(
          expect.anything(),
          "address-id",
          expect.anything(),
          expect.anything()
        )
      })
    })

    describe("with previously filled-in data", () => {
      let page: ShippingTestPage

      beforeEach(async () => {
        const wrapper = getWrapper({
          CommerceOrder: () => ({
            ...testOrder,
            requestedFulfillment: {
              ...validAddress,
              __typename: "CommerceShip",
              name: "Dr Collector",
            },
          }),
          Me: () => emptyTestMe,
        })
        page = new ShippingTestPage(wrapper)
      })

      it("includes already-filled-in data if available", () => {
        const input = page
          .find(Input)
          .filterWhere(wrapper => wrapper.props().title === "Full name")

        expect(input.props().value).toBe("Dr Collector")
      })

      it("includes already-filled-in data in mutation if re-sent", async () => {
        await page.clickSubmit()

        expect(mockCommitMutation).toHaveBeenCalledTimes(1)
        expect(mockCommitMutation).toHaveBeenCalledWith(
          expect.objectContaining({
            variables: {
              input: {
                fulfillmentType: "SHIP",
                id: "1234",
                phoneNumber: validAddress.phoneNumber,
                shipping: {
                  ...validAddress,
                  name: "Dr Collector",
                },
              },
            },
          })
        )
      })
    })

    describe("Validations", () => {
      let page: ShippingTestPage
      beforeEach(async () => {
        const wrapper = getWrapper({
          CommerceOrder: () => testOrder,
          Me: () => emptyTestMe,
        })
        page = new ShippingTestPage(wrapper)
      })

      describe("for Ship orders", () => {
        it("does not submit an empty form for a SHIP order", async () => {
          await page.clickSubmit()

          expect(mockCommitMutation).not.toBeCalled()
        })

        it("does not submit the mutation with an incomplete form for a SHIP order", async () => {
          fillIn(page.root, { title: "Full name", value: "Air Bud" })
          await page.clickSubmit()

          expect(mockCommitMutation).not.toBeCalled()
        })

        it("does submit the mutation with a complete form for a SHIP order", async () => {
          fillAddressForm(page.root, validAddress)
          await page.clickSubmit()

          expect(mockCommitMutation).toBeCalled()
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

          await flushPromiseQueue()
          page.update()

          const input = page
            .find(Input)
            .filterWhere(wrapper => wrapper.props().title === "Postal code")
          expect(input.props().error).toBeFalsy()
          expect(mockCommitMutation).toHaveBeenCalled()
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

        it("after submit, shows all validation errors on inputs that have not been touched", async () => {
          fillIn(page.root, { title: "Full name", value: "Erik David" })

          await flushPromiseQueue()
          await page.clickSubmit()

          const cityInput = page
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

          expect(mockCommitMutation).not.toHaveBeenCalled()
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

          await flushPromiseQueue()
          page.update()

          expect(mockCommitMutation).toHaveBeenCalled()
        })
      })

      it("does submit the mutation with a non-ship order", async () => {
        await page.selectPickupOption()
        fillInPhoneNumber(page.root, { isPickup: true, value: "2813308004" })
        await page.clickSubmit()

        expect(mockCommitMutation).toHaveBeenCalled()
      })

      it("does not submit the mutation with an incomplete form for a PICKUP order", async () => {
        await page.selectPickupOption()
        await page.clickSubmit()

        expect(mockCommitMutation).not.toHaveBeenCalled()
      })
    })

    describe("Offer-mode orders", () => {
      it("shows an active offer stepper if the order is an Offer Order", async () => {
        const wrapper = getWrapper({
          CommerceOrder: () => UntouchedOfferOrder,
          Me: () => emptyTestMe,
        })
        const page = new ShippingTestPage(wrapper)

        expect(page.orderStepper.text()).toMatchInlineSnapshot(
          `"OfferCheckNavigate rightShippingNavigate rightPaymentNavigate rightReviewNavigate right"`
        )
        expect(page.orderStepperCurrentStep).toBe("Shipping")
      })
    })
  })
  describe("with saved addresses", () => {
    let page: ShippingTestPage

    beforeEach(async () => {
      const wrapper = getWrapper({
        CommerceOrder: () => testOrder,
        Me: () => testMe,
      })
      page = new ShippingTestPage(wrapper)
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

    it("commits correct phone number for pickup orders", async () => {
      const mockPhoneNumber = "12345678"
      await page.selectPickupOption()
      fillInPhoneNumber(page.root, { isPickup: true, value: mockPhoneNumber })

      await flushPromiseQueue()
      await page.clickSubmit()

      expect(mockCommitMutation).toHaveBeenCalledWith(
        expect.objectContaining({
          variables: {
            input: {
              fulfillmentType: "PICKUP",
              id: "1234",
              phoneNumber: mockPhoneNumber,
              shipping: {
                addressLine1: "401 Broadway",
                addressLine2: "Floor 25",
                city: "New York",
                country: "US",
                phoneNumber: "422-424-4242",
                postalCode: "10013",
                region: "NY",
                name: "Test Name",
              },
            },
          },
        })
      )
    })

    it("lists the addresses and renders the add address option", async () => {
      expect(
        page
          .find('[role="radio"]')
          .hostNodes()
          .map(node => node.text())
      ).toEqual([
        "Shipping",
        "Arrange for pickup (free)After your order is confirmed, a specialist will contact you to coordinate pickup.",
        "Test Name1 Main StMadrid, ES, 28001555-555-5555Edit",
        "Test Name401 BroadwayFloor 25New York, NY, US, 10013422-424-4242Edit",
      ])

      expect(page.text()).toContain(
        "Test Name1 Main StMadrid, ES, 28001555-555-5555Edit"
      )
      expect(page.text()).toContain(
        "Test Name401 BroadwayFloor 25New York, NY, US, 10013422-424-4242Edit"
      )
    })

    it("commits mutation with saved address and phone number when user submits form directly", async () => {
      await page.clickSubmit()

      expect(mockCommitMutation).toBeCalledTimes(1)
      expect(mockCommitMutation).toBeCalledWith(
        expect.objectContaining({
          variables: {
            input: {
              fulfillmentType: "SHIP",
              id: "1234",
              phoneNumber: "422-424-4242",
              shipping: {
                addressLine1: "401 Broadway",
                addressLine2: "Floor 25",
                city: "New York",
                country: "US",
                name: "Test Name",
                phoneNumber: "422-424-4242",
                postalCode: "10013",
                region: "NY",
              },
            },
          },
        })
      )
    })

    it("when another saved address is selected commits mutation with selected address and phone number", async () => {
      page.find(`[data-test="savedAddress"]`).first().simulate("click")
      await page.update()
      await page.clickSubmit()

      expect(mockCommitMutation).toHaveBeenCalledTimes(1)
      expect(mockCommitMutation).toBeCalledWith(
        expect.objectContaining({
          variables: {
            input: {
              fulfillmentType: "SHIP",
              id: "1234",
              phoneNumber: "555-555-5555",
              shipping: {
                addressLine1: "1 Main St",
                addressLine2: "",
                city: "Madrid",
                country: "ES",
                name: "Test Name",
                phoneNumber: "555-555-5555",
                postalCode: "28001",
                region: "",
              },
            },
          },
        })
      )
    })

    it("does not commit set shipping mutation if address in Europe", async () => {
      const collectorWithDefaultAddressInEurope = cloneDeep(testMe) as any
      collectorWithDefaultAddressInEurope.addressConnection.edges[0].node.isDefault = true
      collectorWithDefaultAddressInEurope.addressConnection.edges[1].node.isDefault = false

      const wrapper = getWrapper({
        CommerceOrder: () => ArtsyShippingDomesticFromUSOrder,
        Me: () => collectorWithDefaultAddressInEurope,
      })
      page = new ShippingTestPage(wrapper)
      await page.update()

      expect(mockCommitMutation).not.toHaveBeenCalled()
    })

    describe("Artsy shipping international", () => {
      describe("when artwork is located in the US", () => {
        describe("when collector is located in EU", () => {
          const collectorWithDefaultAddressInEurope = cloneDeep(testMe) as any
          beforeEach(async () => {
            // sets collector's default address to a Spain address
            collectorWithDefaultAddressInEurope.addressConnection.edges[0].node.isDefault = true
            // US address
            collectorWithDefaultAddressInEurope.addressConnection.edges[1].node.isDefault = false
          })

          it("commits the set shipping mutation", async () => {
            const wrapper = getWrapper({
              CommerceOrder: () => ArtsyShippingInternationalFromUSTestOrder,
              Me: () => collectorWithDefaultAddressInEurope,
            })
            const page = new ShippingTestPage(wrapper)
            await page.update()

            expect(mockCommitMutation).toHaveBeenCalledTimes(1)
          })
        })

        describe("when collector is located in US", () => {
          it("does not commit set shipping mutation", async () => {
            const wrapper = getWrapper({
              CommerceOrder: () => ArtsyShippingInternationalFromUSTestOrder,
              Me: () => testMe,
            })
            const page = new ShippingTestPage(wrapper)
            await page.update()

            expect(mockCommitMutation).not.toHaveBeenCalled()
          })
        })
      })

      describe("when artwork is located in the Germany", () => {
        describe("when collector is located in EU", () => {
          const collectorWithDefaultAddressInEurope = cloneDeep(testMe) as any

          beforeEach(async () => {
            // sets collector's default address to a Spain address
            collectorWithDefaultAddressInEurope.addressConnection.edges[0].node.isDefault = true
            // US address
            collectorWithDefaultAddressInEurope.addressConnection.edges[1].node.isDefault = false
          })

          it("does not commit set shipping mutation", async () => {
            const wrapper = getWrapper({
              CommerceOrder: () => ArtsyShippingInternationalFromGermanyOrder,
              Me: () => collectorWithDefaultAddressInEurope,
            })
            const page = new ShippingTestPage(wrapper)
            await page.update()

            expect(mockCommitMutation).not.toHaveBeenCalled()
          })
        })

        describe("when collector is located in US", () => {
          it("does commit set shipping mutation", async () => {
            const wrapper = getWrapper({
              CommerceOrder: () => ArtsyShippingInternationalFromGermanyOrder,
              Me: () => testMe,
            })
            const page = new ShippingTestPage(wrapper)
            await page.update()

            expect(mockCommitMutation).toHaveBeenCalledTimes(1)
          })
        })
      })
    })

    describe("Artsy shipping domestic", () => {
      describe("when artwork is located in Germany", () => {
        describe("when collector is located in EU", () => {
          const collectorWithDefaultAddressInEurope = cloneDeep(testMe) as any

          beforeEach(async () => {
            // sets collector's default address to a Spain address
            collectorWithDefaultAddressInEurope.addressConnection.edges[0].node.isDefault = true
            // US address
            collectorWithDefaultAddressInEurope.addressConnection.edges[1].node.isDefault = false
          })

          it("does commit set shipping mutation", async () => {
            const wrapper = getWrapper({
              CommerceOrder: () => ArtsyShippingDomesticFromGermanyOrder,
              Me: () => collectorWithDefaultAddressInEurope,
            })
            const page = new ShippingTestPage(wrapper)
            await page.update()

            expect(mockCommitMutation).toHaveBeenCalledTimes(1)
          })
        })

        describe("when collector is located in US", () => {
          it("does not commit set shipping mutation", async () => {
            const wrapper = getWrapper({
              CommerceOrder: () => ArtsyShippingDomesticFromGermanyOrder,
              Me: () => testMe,
            })
            const page = new ShippingTestPage(wrapper)
            await page.update()

            expect(mockCommitMutation).not.toHaveBeenCalled()
          })
        })
      })

      describe("when artwork is located in US", () => {
        describe("when collector is located in EU", () => {
          let collectorWithDefaultAddressInEurope
          beforeEach(async () => {
            const collectorWithDefaultAddressInEurope = cloneDeep(testMe) as any
            // sets collector's default address to a Spain address
            collectorWithDefaultAddressInEurope.addressConnection.edges[0].node.isDefault = true
            // US collector address
            collectorWithDefaultAddressInEurope.addressConnection.edges[1].node.isDefault = false
          })

          it("does not show shipping quotes", async () => {
            const wrapper = getWrapper({
              CommerceOrder: () => ArtsyShippingDomesticFromUSOrder,
              Me: () => collectorWithDefaultAddressInEurope,
            })
            const page = new ShippingTestPage(wrapper)
            await page.update()

            expect(page.find(`[data-test="shipping-quotes"]`)).toHaveLength(0)
          })
        })

        describe("when collector is located in US", () => {
          beforeEach(async () => {
            mockCommitMutation.mockResolvedValueOnce(
              settingOrderArtaShipmentSuccess
            )
          })

          it("commits set shipping mutation", async () => {
            const wrapper = getWrapper({
              CommerceOrder: () => ArtsyShippingDomesticFromUSOrder,
              Me: () => testMe,
            })
            const page = new ShippingTestPage(wrapper)
            await page.update()

            expect(mockCommitMutation).toHaveBeenCalledTimes(1)
            expect(mockCommitMutation).toHaveBeenCalledWith(
              expect.objectContaining({
                variables: {
                  input: {
                    fulfillmentType: "SHIP_ARTA",
                    id: "1234",
                    phoneNumber: "422-424-4242",
                    shipping: {
                      addressLine1: "401 Broadway",
                      addressLine2: "Floor 25",
                      city: "New York",
                      country: "US",
                      name: "Test Name",
                      phoneNumber: "422-424-4242",
                      postalCode: "10013",
                      region: "NY",
                    },
                  },
                },
              })
            )
          })

          it("shows shipping quotes after set shipping mutation commited", async () => {
            const wrapper = getWrapper({
              CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
              Me: () => testMe,
            })
            const page = new ShippingTestPage(wrapper)

            await page.update()

            expect(
              page.find("ShippingQuotes").find("BorderedRadio")
            ).toHaveLength(5)
          })

          it("default selects the first quote and submit button is enabled", async () => {
            const wrapper = getWrapper({
              CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
              Me: () => testMe,
            })
            const page = new ShippingTestPage(wrapper)

            expect(page.submitButton.props().disabled).toBeFalsy()

            await page.clickSubmit()

            expect(mockCommitMutation).toHaveBeenLastCalledWith(
              expect.objectContaining({
                variables: {
                  input: {
                    id: "2939023",
                    selectedShippingQuoteId:
                      "4a8f8080-23d3-4c0e-9811-7a41a9df6933",
                  },
                },
              })
            )
          })

          it("submit button enabled if shipping quote is selected", () => {
            const wrapper = getWrapper({
              CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
              Me: () => testMe,
            })
            const page = new ShippingTestPage(wrapper)

            page.find(`[data-test="shipping-quotes"]`).last().simulate("click")

            expect(page.submitButton.props().disabled).toBeFalsy()
          })

          it("commits selectShippingOption mutation with correct input", async () => {
            const wrapper = getWrapper({
              CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
              Me: () => testMe,
            })
            const page = new ShippingTestPage(wrapper)

            page.find(`[data-test="shipping-quotes"]`).last().simulate("click")

            await page.clickSubmit()

            expect(mockCommitMutation).toHaveBeenLastCalledWith(
              expect.objectContaining({
                variables: {
                  input: {
                    id: "2939023",
                    selectedShippingQuoteId:
                      "1eb3ba19-643b-4101-b113-2eb4ef7e30b6",
                  },
                },
              })
            )
          })

          it("routes to payment screen after selectShippingOption mutation completes", async () => {
            mockCommitMutation.mockResolvedValueOnce(
              settingOrderArtaShipmentSuccess
            )
            const wrapper = getWrapper({
              CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
              Me: () => emptyTestMe,
            })
            const page = new ShippingTestPage(wrapper)

            page.find(`[data-test="shipping-quotes"]`).last().simulate("click")

            await page.clickSubmit()

            expect(mockCommitMutation).toHaveBeenCalledTimes(2)
            expect(pushMock).toHaveBeenCalledWith("/orders/2939023/payment")
          })

          it("reload shipping quotes after selected address edited", async () => {
            const updateAddressSpy = jest
              .spyOn(updateUserAddress, "updateUserAddress")
              // @ts-ignore
              .mockImplementationOnce((_, __, ___, ____, onSuccess) => {
                onSuccess(updateAddressSuccess)
              })

            const wrapper = getWrapper({
              CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
              Me: () => testMe,
            })
            const page = new ShippingTestPage(wrapper)

            await page.update()

            page
              .find(`[data-test="editAddressInShipping"]`)
              .last()
              .simulate("click")
            const inputs = page.find("AddressModal").find("input")
            inputs.forEach(input => {
              if (input.props().name === "postalCode") {
                // @ts-ignore
                input.instance().value = `15601`
              } else {
                // @ts-ignore
                input.instance().value = `Test input '${input.props().name}'`
              }

              input.simulate("change")
            })
            const countrySelect = page
              .find("AddressModal")
              .find("select")
              .first()
            // @ts-ignore
            countrySelect.instance().value = `US`
            countrySelect.simulate("change")

            const newAddress = {
              addressLine1: "Test input 'addressLine1'",
              addressLine2: "Test input 'addressLine2'",
              city: "Test input 'city'",
              country: "US",
              name: "Test input 'name'",
              postalCode: "15601",
              region: "Test input 'region'",
            }

            const form = page.find("form").first()
            // @ts-ignore
            form.props().onSubmit()

            // await page.update()
            await page.clickSubmit()

            page
              .find("SavedAddresses")
              .props()
              // @ts-ignore
              .onAddressEdit({
                userAddressOrErrors: {
                  internalID: "2",
                  ...newAddress,
                },
              })

            expect(updateAddressSpy).toHaveBeenCalledTimes(1)
            expect(updateAddressSpy).toHaveBeenCalledWith(
              expect.anything(),
              "2",
              {
                ...newAddress,
                addressLine3: "",
                phoneNumber: "422-424-4242",
              },
              expect.anything(),
              expect.anything(),
              expect.anything()
            )
            expect(mockCommitMutation).toHaveBeenCalledTimes(2)
            // the intention here is to trigger the commitMutation again with the same value of the first
            // call once the selected adddress is edited
            expect(mockCommitMutation).toHaveBeenNthCalledWith(
              2,
              expect.objectContaining({
                variables: {
                  input: {
                    fulfillmentType: "SHIP_ARTA",
                    id: "2939023",
                    phoneNumber: "422-424-4242",
                    shipping: {
                      ...newAddress,
                      phoneNumber: "",
                    },
                  },
                },
              })
            )
          })

          it("does not reload shipping quotes after edit not selected address", async () => {
            mockCommitMutation.mockResolvedValueOnce(
              settingOrderArtaShipmentSuccess
            )
            const updateAddressSpy = jest
              .spyOn(updateUserAddress, "updateUserAddress")
              // @ts-ignore
              .mockImplementationOnce((_, __, ___, ____, onSuccess) => {
                onSuccess(updateAddressSuccess)
              })
            const wrapper = getWrapper({
              CommerceOrder: () => ArtsyShippingDomesticFromUSOrder,
              Me: () => testMe,
            })
            const page = new ShippingTestPage(wrapper)

            await page.update()

            expect(mockCommitMutation).toBeCalledTimes(1)

            page
              .find(`[data-test="editAddressInShipping"]`)
              .first()
              .simulate("click")
            const inputs = page.find("AddressModal").find("input")
            inputs.forEach(input => {
              if (input.props().name === "postalCode") {
                // @ts-ignore
                input.instance().value = `15601`
              } else {
                // @ts-ignore
                input.instance().value = `Test input '${input.props().name}'`
              }
              input.simulate("change")
            })
            const countrySelect = page
              .find("AddressModal")
              .find("select")
              .first()
            // @ts-ignore
            countrySelect.instance().value = `US`
            countrySelect.simulate("change")

            const form = page.find("form").first()
            // @ts-ignore
            form.props().onSubmit()

            await page.update()

            expect(updateAddressSpy).toBeCalledTimes(1)
            expect(updateAddressSpy).toHaveBeenCalledWith(
              expect.anything(),
              expect.anything(),
              {
                addressLine1: "Test input 'addressLine1'",
                addressLine2: "Test input 'addressLine2'",
                addressLine3: "",
                city: "Test input 'city'",
                country: "US",
                name: "Test input 'name'",
                phoneNumber: "555-555-5555",
                postalCode: "15601",
                region: "Test input 'region'",
              },
              expect.anything(),
              expect.anything(),
              expect.anything()
            )
            expect(mockCommitMutation).toHaveBeenCalledTimes(1)
          })
        })
      })
    })

    describe("editing address", () => {
      let page: ShippingTestPage
      let updateUserAddressSpy: jest.SpyInstance
      beforeEach(() => {
        const wrapper = getWrapper({
          CommerceOrder: () => testOrder,
          Me: () => testMe,
        })
        page = new ShippingTestPage(wrapper) as any
        updateUserAddressSpy = jest.spyOn(
          updateUserAddress,
          "updateUserAddress"
        )
      })

      it("opens modal with correct title and action properties", async () => {
        await page
          .find(`[data-test="editAddressInShipping"]`)
          .first()
          .simulate("click")
        expect(
          // @ts-ignore
          page.find("AddressModal").at(0).props().modalDetails
        ).toStrictEqual({
          addressModalTitle: "Edit address",
          addressModalAction: "editUserAddress",
        })
      })

      it("opens modal with current address values", async () => {
        await page
          .find(`[data-test="editAddressInShipping"]`)
          .first()
          .simulate("click")

        expect(page.find("AddressModal").length).toBe(1)
        expect(
          page
            .find("AddressModal")
            .find(Input)
            .map(input => input.props().value)
        ).toMatchInlineSnapshot(`
          Array [
            "Test Name",
            "28001",
            "1 Main St",
            "",
            "Madrid",
            "",
          ]
        `)
      })

      it("sends mutation with updated values when modal form is submitted", async () => {
        page
          .find(`[data-test="editAddressInShipping"]`)
          .first()
          .simulate("click")
        const inputs = page.find("AddressModal").find("input")
        inputs.forEach(input => {
          if (input.props().name === "postalCode") {
            // @ts-ignore
            input.instance().value = `15601`
          } else {
            // @ts-ignore
            input.instance().value = `Test input '${input.props().name}'`
          }
          input.simulate("change")
        })
        const countrySelect = page.find("AddressModal").find("select").first()
        // @ts-ignore
        countrySelect.instance().value = `US`
        countrySelect.simulate("change")

        const form = page.find("form").first()
        // @ts-ignore
        form.props().onSubmit()

        await page.update()
        expect(updateUserAddressSpy).toHaveBeenCalledWith(
          expect.anything(),
          "1",
          {
            addressLine1: "Test input 'addressLine1'",
            addressLine2: "Test input 'addressLine2'",
            addressLine3: "",
            city: "Test input 'city'",
            country: "US",
            name: "Test input 'name'",
            phoneNumber: "555-555-5555",
            postalCode: "15601",
            region: "Test input 'region'",
          },
          expect.anything(),
          expect.anything(),
          expect.anything()
        )
      })
    })
  })
})
