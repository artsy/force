import { ShippingTestQuery$rawResponse } from "__generated__/ShippingTestQuery.graphql"
import { cloneDeep } from "lodash"

import {
  UntouchedBuyOrder,
  UntouchedBuyOrderWithArtsyShippingDomesticFromGermany,
  UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
  UntouchedBuyOrderWithArtsyShippingInternationalFromGermany,
  UntouchedBuyOrderWithArtsyShippingInternationalFromUS,
  UntouchedBuyOrderWithShippingQuotes,
} from "Apps/__tests__/Fixtures/Order"
import {
  fillAddressForm,
  validAddress,
} from "Components/__tests__/Utils/addressForm"
import { Input } from "@artsy/palette"
import { graphql } from "react-relay"
import { ShippingFragmentContainer } from "Apps/Order/Routes/Shipping"
import { OrderAppTestPage } from "./Utils/OrderAppTestPage"
import { updateAddressSuccess } from "Apps/Order/Routes/__fixtures__/MutationResults/saveAddress"
import { useTracking } from "react-tracking"
import { MockBoot } from "DevTools/MockBoot"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import * as updateUserAddress from "Apps/Order/Mutations/UpdateUserAddress"
import {
  settingOrderShipmentSuccess,
  settingOrderArtaShipmentSuccess,
} from "Apps/Order/Routes/__fixtures__/MutationResults/setOrderShipping"
import { useFeatureFlag } from "System/useFeatureFlag"

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

jest.mock("System/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(),
}))

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
  location: {
    id: "123",
    country: "United States",
  },
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
  location: {
    id: "123",
    country: "United States",
  },
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
    ;(useFeatureFlag as jest.Mock).mockImplementation(() => false)
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

    describe("Validations", () => {
      describe("for Ship orders", () => {
        describe("with address verfication enabled", () => {
          beforeAll(() => {
            ;(useFeatureFlag as jest.Mock).mockImplementation(
              (featureName: string) => featureName === "address_verification_us"
            )
          })

          afterAll(() => {
            ;(useFeatureFlag as jest.Mock).mockReset()
          })

          it("triggers basic form validation first", async () => {
            const wrapper = getWrapper({
              CommerceOrder: () => testOrder,
              Me: () => emptyTestMe,
            })

            const page = new ShippingTestPage(wrapper)

            await page.clickSubmit()

            const input = page
              .find(Input)
              .filterWhere(wrapper => wrapper.props().title === "Full name")
            expect(input.props().error).toEqual("This field is required")

            expect(
              page.find(`[data-testid="address-verification-flow"]`).exists()
            ).toBe(false)
          })
        })
      })
    })

    describe("with US address verification enabled and international disabled", () => {
      beforeAll(() => {
        ;(useFeatureFlag as jest.Mock).mockImplementation(
          (featureName: string) => featureName === "address_verification_us"
        )
      })

      afterAll(() => {
        ;(useFeatureFlag as jest.Mock).mockReset()
      })

      describe("when the continue button is clicked", () => {
        describe("with US address", () => {
          it("mounts the address verification flow", async () => {
            const wrapper = getWrapper({
              CommerceOrder: () => testOrder,
              Me: () => emptyTestMe,
            })

            const page = new ShippingTestPage(wrapper)

            fillAddressForm(page.root, validAddress)

            await page.clickSubmit()

            expect(
              page.find(`[data-testid="address-verification-flow"]`).exists()
            ).toBe(true)
          })
        })

        describe("with international address", () => {
          it("does not mount the address verification flow", async () => {
            const wrapper = getWrapper({
              CommerceOrder: () => testOrder,
              Me: () => emptyTestMe,
            })

            const page = new ShippingTestPage(wrapper)

            const address = Object.assign({}, validAddress, { country: "GB" })
            fillAddressForm(page.root, address)

            await page.clickSubmit()

            expect(
              page.find(`[data-testid="address-verification-flow"]`).exists()
            ).toBe(false)
          })
        })
      })
    })

    describe("with US address verification disabled and international enabled", () => {
      beforeAll(() => {
        ;(useFeatureFlag as jest.Mock).mockImplementation(
          (featureName: string) => featureName === "address_verification_intl"
        )
      })

      afterAll(() => {
        ;(useFeatureFlag as jest.Mock).mockReset()
      })

      describe("when the continue button is clicked", () => {
        describe("with US address", () => {
          it("does not mount the address verification flow", async () => {
            const wrapper = getWrapper({
              CommerceOrder: () => testOrder,
              Me: () => emptyTestMe,
            })

            const page = new ShippingTestPage(wrapper)

            fillAddressForm(page.root, validAddress)

            await page.clickSubmit()

            expect(
              page.find(`[data-testid="address-verification-flow"]`).exists()
            ).toBe(false)
          })
        })

        describe("with international address", () => {
          it("mounts the address verification flow", async () => {
            const wrapper = getWrapper({
              CommerceOrder: () => testOrder,
              Me: () => emptyTestMe,
            })

            const page = new ShippingTestPage(wrapper)

            const address = Object.assign({}, validAddress, { country: "GB" })
            fillAddressForm(page.root, address)

            await page.clickSubmit()

            expect(
              page.find(`[data-testid="address-verification-flow"]`).exists()
            ).toBe(true)
          })
        })
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

    describe("with address verification enabled", () => {
      beforeAll(() => {
        ;(useFeatureFlag as jest.Mock).mockImplementation(
          (featureName: string) => featureName === "address_verification_us"
        )
      })

      afterAll(() => {
        ;(useFeatureFlag as jest.Mock).mockReset()
      })

      describe("when the continue button is clicked", () => {
        it("does not mount the address verification flow and commits shipping mutation", async () => {
          await page.clickSubmit()

          expect(
            page.find(`[data-testid="address-verification-flow"]`).exists()
          ).toBe(false)
          expect(mockCommitMutation).toHaveBeenCalled()
        })
      })
    })

    describe("Artsy shipping domestic", () => {
      describe("when artwork is located in US", () => {
        describe("when collector is located in US", () => {
          beforeEach(async () => {
            mockCommitMutation.mockResolvedValueOnce(
              settingOrderArtaShipmentSuccess
            )
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
            expect(mockCommitMutation).toHaveBeenCalledTimes(3)
            // the intention here is to trigger the commitMutation again with the same value of the first
            // call once the selected adddress is edited
            expect(mockCommitMutation).toHaveBeenNthCalledWith(
              3,
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
  })
})
