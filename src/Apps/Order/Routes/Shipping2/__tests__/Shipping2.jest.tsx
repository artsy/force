/* eslint-disable jest/no-disabled-tests */
import { cloneDeep, merge } from "lodash"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { MockBoot } from "DevTools/MockBoot"
import { ShippingRouteWithDialog } from "Apps/Order/Routes/Shipping2"
import { graphql } from "react-relay"
import {
  UntouchedBuyOrder,
  UntouchedOfferOrder,
  UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
  UntouchedBuyOrderWithArtsyShippingDomesticFromGermany,
  UntouchedBuyOrderWithShippingQuotes,
  UntouchedBuyOrderWithArtsyShippingInternationalFromUS,
  UntouchedBuyOrderWithArtsyShippingInternationalFromGermany,
  BuyOrderWithArtaShippingDetails,
} from "Apps/__tests__/Fixtures/Order"
import {
  settingOrderShipmentSuccess,
  settingOrderArtaShipmentSuccess,
  selectShippingQuoteSuccess,
} from "Apps/Order/Routes/__fixtures__/MutationResults/setOrderShipping"
import {
  saveAddressSuccess,
  updateAddressSuccess,
} from "Apps/Order/Routes/__fixtures__/MutationResults/saveAddress"
import {
  Shipping2TestQuery,
  Shipping2TestQuery$rawResponse,
} from "__generated__/Shipping2TestQuery.graphql"
import { screen, waitFor } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import {
  clickSaveAddress,
  fillAddressForm,
  validAddress,
} from "Components/__tests__/Utils/addressForm2"
import userEvent from "@testing-library/user-event"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { queryByAttribute } from "@testing-library/dom"
import { ErrorDialogMessage } from "Apps/Order/Utils/getErrorDialogCopy"
import { within } from "@testing-library/dom"
import { MockEnvironment, createMockEnvironment } from "relay-test-utils"
import { useRouter } from "System/Hooks/useRouter"

jest.setTimeout(10000)

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

jest.mock("System/Hooks/useFeatureFlag", () => ({
  useFeatureFlag: jest.fn(),
}))

jest.mock("System/Hooks/useRouter", () => ({
  useRouter: jest.fn().mockReturnValue({
    router: jest.fn(),
  }),
}))

const mockShowErrorDialog = jest.fn()
jest.mock("Apps/Order/Dialogs", () => ({
  ...jest.requireActual("Apps/Order/Dialogs"),
  injectDialog: Component => props => (
    <Component {...props} dialog={{ showErrorDialog: mockShowErrorDialog }} />
  ),
}))

const order = {
  ...UntouchedBuyOrder,
}

const pageInfo = {
  startCursor: "aaa",
  endCursor: "bbb",
  hasNextPage: false,
  hasPreviousPage: false,
}

const meWithoutAddress: Shipping2TestQuery$rawResponse["me"] = {
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
  },
}

const meWithAddresses: Shipping2TestQuery$rawResponse["me"] = Object.assign(
  {},
  meWithoutAddress,
  {
    addressConnection: {
      totalCount: 2,
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
)

const saveAndContinue = async () => {
  await waitFor(() => userEvent.click(screen.getByText("Save and Continue")))
}

const validAddressBeforeVerification = {
  ...validAddress,
  addressLine1: "401 Broadway",
  addressLine2: "Suite 25",
  city: "New York",
  region: "NY",
  postalCode: "10013",
  country: "US",
}
const recommendedAddress = {
  addressLine1: "401 Broadway Suite 25",
  addressLine2: null,
  city: "New York",
  region: "NY",
  postalCode: "10013",
  country: "US",
}

const verifyAddressWithSuggestions = async (
  mockResolveLastOperation,
  input = validAddressBeforeVerification,
  suggested = recommendedAddress
) => {
  const addressLines = addr => {
    return [
      addr.addressLine1,
      addr.addressLine2,
      `${addr.city}, ${addr.region} ${addr.postalCode}`,
      addr.country,
    ]
  }

  const suggestedAddress = suggested
    ? { ...recommendedAddress, ...suggested }
    : recommendedAddress

  const { operationName, operationVariables } = await waitFor(() => {
    return mockResolveLastOperation({
      VerifyAddressPayload: () => ({
        verifyAddressOrError: {
          __typename: "VerifyAddressType",
          verificationStatus: "VERIFIED_WITH_CHANGES",
          suggestedAddresses: [
            {
              lines: addressLines(suggestedAddress),
              address: suggestedAddress,
            },
          ],
          inputAddress: {
            lines: addressLines(validAddress),
            address: validAddress,
          },
        },
      }),
    })
  })

  expect(operationName).toBe("AddressVerificationFlowQuery")
  expect(operationVariables).toEqual({
    address: {
      addressLine1: input.addressLine1,
      addressLine2: input.addressLine2,
      city: input.city,
      region: input.region,
      postalCode: input.postalCode,
      country: input.country,
    },
  })

  expect(await screen.findByText("Confirm your delivery address")).toBeVisible()
  expect(await screen.findByText("Recommended")).toBeVisible()
  expect(await screen.findByText("What you entered")).toBeVisible()
}

const resolveSaveFulfillmentDetails = async (
  mockResolveLastOperation,
  /* A mockResolver for the CommerceSetShipping payload */
  commerceSetShipping,
  /* if you submitted the form with a different address than validAddress,
   pass it here to override the address in the mutation response. */
  responseAddress?: any
) => {
  await flushPromiseQueue()
  const payload = responseAddress
    ? merge({}, commerceSetShipping, {
        orderOrError: {
          order: { requestedFulfillment: responseAddress },
        },
      })
    : commerceSetShipping

  return await mockResolveLastOperation({
    CommerceSetShippingPayload: () => payload,
  })
}

const getAllPendingOperationNames = (env: MockEnvironment) => {
  return env.mock.getAllOperations().map(op => op.request.node.operation.name)
}

let mockTrackEvent: jest.Mock

// FIXME: CI Timeouts likely due to fillAddressForm() duration...
describe.skip("Shipping", () => {
  const mockUseRouter = useRouter as jest.Mock
  const mockPush = jest.fn()

  beforeEach(() => {
    HTMLElement.prototype.scrollIntoView = jest.fn()
    mockTrackEvent = jest.fn()
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent: mockTrackEvent,
    }))
    ;(useFeatureFlag as jest.Mock).mockImplementation(() => false)

    mockUseRouter.mockReturnValue({
      router: {
        push: mockPush,
      },
    })
  })

  let mockRelayEnv
  // create the mock environment here so we can pass it into our MockBoot
  // component
  const renderWithRelay: typeof renderWithRelayRaw = (
    resolvers,
    componentProps = {},
    relayEnv = createMockEnvironment()
  ) => {
    mockRelayEnv = relayEnv
    return renderWithRelayRaw(resolvers, componentProps, relayEnv)
  }

  const { renderWithRelay: renderWithRelayRaw } = setupTestWrapperTL<
    Shipping2TestQuery
  >({
    Component: props => {
      return (
        <MockBoot relayEnvironment={mockRelayEnv}>
          <ShippingRouteWithDialog order={props.order!} me={props.me!} />
        </MockBoot>
      )
    },
    query: graphql`
      query Shipping2TestQuery @relay_test_operation @raw_response_type {
        order: commerceOrder(id: "unused") {
          ...Shipping2_order
        }
        me {
          ...Shipping2_me
        }
      }
    `,
  })

  describe("with partner shipping", () => {
    describe("with no saved address", () => {
      it("shows an active offer stepper if it's an offer order", async () => {
        renderWithRelay({
          CommerceOrder: () => UntouchedOfferOrder,
          Me: () => meWithoutAddress,
        })

        expect(screen.getAllByRole("button", { name: "Offer" }).length).toBe(1)
      })

      it("renders fulfillment selection if artwork is available for pickup", async () => {
        renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithoutAddress,
        })

        expect(screen.getByText("Delivery method")).toBeVisible()
        expect(screen.getByRole("radio", { name: "Shipping" })).toBeVisible()
        expect(
          screen.getByRole("radio", { name: /Arrange for pickup/ })
        ).toBeVisible()
      })

      it("does not render fulfillment selection if artwork is not available for pickup", async () => {
        const shippingOnlyOrder = cloneDeep(order) as any
        shippingOnlyOrder.lineItems.edges[0].node.artwork.pickupAvailable = false

        renderWithRelay({
          CommerceOrder: () => shippingOnlyOrder,
          Me: () => meWithoutAddress,
        })

        expect(screen.queryByText("Delivery method")).not.toBeInTheDocument()
        expect(
          screen.queryByRole("radio", { name: "Shipping" })
        ).not.toBeInTheDocument()
        expect(
          screen.queryByRole("radio", { name: /Arrange for pickup/ })
        ).not.toBeInTheDocument()
      })

      it("sets and disables country select if artwork only ships domestically and is not in the EU", async () => {
        const domesticShippingNonEUOrder = cloneDeep(order) as any
        const artwork =
          domesticShippingNonEUOrder.lineItems.edges[0].node.artwork

        Object.assign(artwork, {
          onlyShipsDomestically: true,
          euShippingOrigin: false,
          shippingCountry: "US",
        })

        renderWithRelay({
          CommerceOrder: () => domesticShippingNonEUOrder,
          Me: () => meWithoutAddress,
        })

        expect(screen.getByTestId("AddressForm_country")).toHaveValue("US")
        expect(screen.getByTestId("AddressForm_country")).toBeDisabled()
      })

      it("sets and enables country select if artwork only ships domestically and is in the EU", async () => {
        const domesticShippingEUOrder = cloneDeep(order) as any
        const artwork = domesticShippingEUOrder.lineItems.edges[0].node.artwork

        Object.assign(artwork, {
          onlyShipsDomestically: true,
          euShippingOrigin: true,
          shippingCountry: "IT",
        })

        renderWithRelay({
          CommerceOrder: () => domesticShippingEUOrder,
          Me: () => meWithoutAddress,
        })

        expect(screen.getByTestId("AddressForm_country")).toHaveValue("IT")
        expect(screen.getByTestId("AddressForm_country")).toBeEnabled()
      })

      it("sets shipping on order, saves address on user and advances to payment", async () => {
        const { mockResolveLastOperation, env } = renderWithRelay({
          CommerceOrder: () => ({ ...order, __id: order.id }),
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)

        await saveAndContinue()

        const createAddressOperation = await mockResolveLastOperation({
          CreateUserAddressPayload: () => saveAddressSuccess.createUserAddress,
          Me: () => ({
            ...meWithoutAddress,
            addressConnection: {
              totalCount: 0,
              edges: [
                {
                  node: {
                    ...saveAddressSuccess.createUserAddress
                      ?.userAddressOrErrors,
                  },
                },
              ],
            },
          }),
        })

        expect(createAddressOperation.operationName).toBe(
          "useCreateSavedAddressMutation"
        )
        expect(createAddressOperation.operationVariables).toMatchObject({
          input: {
            attributes: validAddress,
          },
        })

        await flushPromiseQueue()

        const fulfillmentRequest = await resolveSaveFulfillmentDetails(
          mockResolveLastOperation,
          settingOrderShipmentSuccess.commerceSetShipping
        )

        expect(fulfillmentRequest.operationName).toBe(
          "useSaveFulfillmentDetailsMutation"
        )
        expect(fulfillmentRequest.operationVariables).toMatchObject({
          input: {
            id: "2939023",
            fulfillmentType: "SHIP",
            phoneNumber: validAddress.phoneNumber,
            shipping: {
              ...validAddress,
              phoneNumber: "",
            },
          },
        })

        await waitFor(() => {
          expect(getAllPendingOperationNames(env)).toEqual([])
          expect(mockPush).toHaveBeenCalledWith("/orders/2939023/payment")
        })
      })

      it("save address not checked: sets shipping on order and advances to payment without saving address", async () => {
        const { env, mockResolveLastOperation } = renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        await clickSaveAddress()

        await saveAndContinue()

        const fulfillmentRequest = await resolveSaveFulfillmentDetails(
          mockResolveLastOperation,
          settingOrderShipmentSuccess.commerceSetShipping
        )

        expect(fulfillmentRequest.operationName).toBe(
          "useSaveFulfillmentDetailsMutation"
        )
        await waitFor(() => {
          expect(getAllPendingOperationNames(env)).toEqual([])
          expect(mockPush).toHaveBeenCalledWith("/orders/2939023/payment")
        })
        expect(() => env.mock.getMostRecentOperation()).toThrow()
      })

      it("shows a loading spinner while operations are pending", async () => {
        const { mockResolveLastOperation, env } = renderWithRelay({
          CommerceOrder: () => ({ ...order, __id: order.id }),
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        await saveAndContinue()

        const getSpinner = () => {
          const button = screen.getByRole("button", {
            name: "Save and Continue",
          })
          return queryByAttribute("class", button, /Spinner/)
        }

        await waitFor(() => {
          expect(getSpinner()).toBeInTheDocument()
        })

        await mockResolveLastOperation({
          CreateUserAddressPayload: () => saveAddressSuccess.createUserAddress,
        })

        await resolveSaveFulfillmentDetails(
          mockResolveLastOperation,
          settingOrderShipmentSuccess.commerceSetShipping
        )

        await waitFor(() => {
          expect(getSpinner()).not.toBeInTheDocument()
          expect(getAllPendingOperationNames(env)).toEqual([])
          expect(mockPush).toHaveBeenCalledWith("/orders/2939023/payment")
        })
      })

      it("shows a generic error when there is an unrecognized error code in the exchange result", async () => {
        const { mockResolveLastOperation } = renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        await saveAndContinue()

        await flushPromiseQueue()

        await mockResolveLastOperation({
          CreateUserAddressPayload: () => saveAddressSuccess.createUserAddress,
        })

        await flushPromiseQueue()

        await resolveSaveFulfillmentDetails(mockResolveLastOperation, {
          orderOrError: {
            __typename: "CommerceOrderWithMutationFailure",
            error: {
              type: "validation",
              code: "something_new",
              data: null,
            },
          },
        })

        await waitFor(() => {
          expect(mockShowErrorDialog).toHaveBeenCalledWith()
        })
      })

      it("shows an error when an exchange mutation throws an error", async () => {
        const { mockRejectLastOperation } = renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        await clickSaveAddress()

        await saveAndContinue()

        await waitFor(() =>
          mockRejectLastOperation(new Error("##TEST_ERROR## wrong number"))
        )
        await waitFor(() => expect(mockShowErrorDialog).toHaveBeenCalledWith())
      })

      it("shows an error when there is a missing_country error from the server", async () => {
        const { mockResolveLastOperation } = renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        await clickSaveAddress()

        await saveAndContinue()

        await resolveSaveFulfillmentDetails(mockResolveLastOperation, {
          orderOrError: {
            __typename: "CommerceOrderWithMutationFailure",
            error: {
              type: "validation",
              code: "missing_country",
              data: null,
            },
          },
        })
        await waitFor(() =>
          expect(mockShowErrorDialog).toHaveBeenCalledWith({
            title: "Invalid address",
            message:
              "There was an error processing your address. Please review and try again.",
          })
        )
      })

      it("shows an error when there is a missing_region error from the server", async () => {
        const { mockResolveLastOperation } = renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        await clickSaveAddress()

        await saveAndContinue()

        await resolveSaveFulfillmentDetails(mockResolveLastOperation, {
          orderOrError: {
            __typename: "CommerceOrderWithMutationFailure",
            error: {
              type: "validation",
              code: "missing_region",
              data: null,
            },
          },
        })
        await waitFor(() =>
          expect(mockShowErrorDialog).toHaveBeenCalledWith({
            title: "Invalid address",
            message:
              "There was an error processing your address. Please review and try again.",
          })
        )
      })

      it("shows an error when there is a destination_could_not_be_geocodederror from the server", async () => {
        const { mockResolveLastOperation } = renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        await clickSaveAddress()

        await saveAndContinue()

        await resolveSaveFulfillmentDetails(mockResolveLastOperation, {
          orderOrError: {
            __typename: "CommerceOrderWithMutationFailure",
            error: {
              type: "arta",
              code: "destination_could_not_be_geocoded",
              data:
                '{"status":422,"errors":{"destination":["could not be geocoded"]}}',
            },
          },
        })
        expect(mockShowErrorDialog).toHaveBeenCalledWith({
          title: "Cannot calculate shipping",
          message: (
            <ErrorDialogMessage message="Please confirm that your address details are correct and try again. If the issue continues contact orders@artsy.net." />
          ),
        })
      })

      it("pre-populates address form for order with already persisted shipping info", async () => {
        renderWithRelay({
          CommerceOrder: () => ({
            ...order,
            requestedFulfillment: {
              ...validAddress,
              __typename: "CommerceShip",
              name: "Dr Collector",
            },
          }),
          Me: () => meWithoutAddress,
        })

        expect(screen.getByPlaceholderText("Full name")).toHaveValue(
          "Dr Collector"
        )
      })

      describe("address verification", () => {
        describe("with US enabled and international disabled", () => {
          beforeEach(() => {
            ;(useFeatureFlag as jest.Mock).mockImplementation(
              (featureName: string) => featureName === "address_verification_us"
            )
          })

          it("triggers basic form validation before address verification", async () => {
            const { env } = renderWithRelay({
              CommerceOrder: () => order,
              Me: () => meWithoutAddress,
            })

            expect(
              screen.queryByText(/[\w\s]is required/)
            ).not.toBeInTheDocument()

            await fillAddressForm({ ...validAddress, addressLine1: undefined })

            await flushPromiseQueue()
            expect(
              screen.queryByText(/[\w\s]is required/)
            ).not.toBeInTheDocument()

            await userEvent.click(screen.getByText("Save and Continue"))

            await waitFor(() => {
              expect(
                screen.getByText("Street address is required")
              ).toBeVisible()
            })
            expect(env.mock.getAllOperations().length).toEqual(0)
          })

          it("triggers the flow for US address after clicking continue", async () => {
            const { env, mockResolveLastOperation } = renderWithRelay({
              CommerceOrder: () => order,
              Me: () => meWithoutAddress,
            })

            await fillAddressForm(validAddressBeforeVerification)

            await saveAndContinue()

            await verifyAddressWithSuggestions(
              mockResolveLastOperation,
              validAddressBeforeVerification,
              recommendedAddress
            )

            expect(env.mock.getAllOperations().length).toEqual(0)
          })

          it("uses recommended address", async () => {
            const { mockResolveLastOperation } = renderWithRelay({
              CommerceOrder: () => order,
              Me: () => meWithoutAddress,
            })

            await fillAddressForm(validAddressBeforeVerification)

            await saveAndContinue()

            await verifyAddressWithSuggestions(
              mockResolveLastOperation,
              validAddressBeforeVerification,
              recommendedAddress
            )

            await userEvent.click(screen.getByText("Use This Address"))

            await flushPromiseQueue()
            const createAddressOperation = await mockResolveLastOperation({
              CreateUserAddressPayload: () =>
                saveAddressSuccess.createUserAddress,
            })

            expect(createAddressOperation.operationName).toBe(
              "useCreateSavedAddressMutation"
            )

            await flushPromiseQueue()
            const fulfillmentOperation = await resolveSaveFulfillmentDetails(
              mockResolveLastOperation,
              settingOrderShipmentSuccess.commerceSetShipping
            )

            expect(fulfillmentOperation.operationName).toBe(
              "useSaveFulfillmentDetailsMutation"
            )
            expect(fulfillmentOperation.operationVariables).toEqual({
              input: {
                id: "2939023",
                fulfillmentType: "SHIP",
                addressVerifiedBy: "ARTSY",
                phoneNumber: validAddress.phoneNumber,
                shipping: {
                  ...recommendedAddress,
                  name: "Joelle Van Dyne",
                  phoneNumber: "",
                },
              },
            })
          })

          it("goes back and edits address after verification", async () => {
            const { mockResolveLastOperation } = renderWithRelay({
              CommerceOrder: () => order,
              Me: () => meWithoutAddress,
            })

            await fillAddressForm(validAddressBeforeVerification)
            await clickSaveAddress()

            await saveAndContinue()

            await verifyAddressWithSuggestions(
              mockResolveLastOperation,
              validAddressBeforeVerification,
              recommendedAddress
            )

            // Clicking "Back to Edit" allows users to edit the address form
            // and requires clicking "Save and Continue" to proceed.
            await userEvent.click(screen.getByText("Back to Edit"))
            await userEvent.paste(
              screen.getByPlaceholderText("City"),
              ": the big apple"
            )

            await flushPromiseQueue()

            await saveAndContinue()

            const fulfillmentOperation = await resolveSaveFulfillmentDetails(
              mockResolveLastOperation,
              settingOrderShipmentSuccess.commerceSetShipping
            )

            expect(fulfillmentOperation.operationName).toBe(
              "useSaveFulfillmentDetailsMutation"
            )
            expect(fulfillmentOperation.operationVariables).toEqual({
              input: {
                id: "2939023",
                fulfillmentType: "SHIP",
                addressVerifiedBy: "USER",
                phoneNumber: validAddress.phoneNumber,
                shipping: {
                  ...validAddressBeforeVerification,
                  city: "New York: the big apple",

                  name: "Joelle Van Dyne",
                  phoneNumber: "",
                },
              },
            })
          })

          it("does not triggers the flow for international address after clicking continue", async () => {
            const { mockResolveLastOperation } = renderWithRelay({
              CommerceOrder: () => order,
              Me: () => meWithoutAddress,
            })

            await fillAddressForm(validAddress)
            await clickSaveAddress()

            await userEvent.selectOptions(
              screen.getByTestId("AddressForm_country"),
              ["TW"]
            )

            await saveAndContinue()

            await flushPromiseQueue()

            const operation = mockResolveLastOperation({})

            expect(operation.operationName).toBe(
              "useSaveFulfillmentDetailsMutation"
            )
          })
        })

        describe("with US disabled and international enabled", () => {
          let inputAddress
          beforeEach(() => {
            ;(useFeatureFlag as jest.Mock).mockImplementation(
              (featureName: string) =>
                featureName === "address_verification_intl"
            )
            inputAddress = { ...validAddress, country: "TW" }
          })

          it("does not trigger the flow for US address after clicking continue", async () => {
            const { mockResolveLastOperation } = renderWithRelay({
              CommerceOrder: () => order,
              Me: () => meWithoutAddress,
            })

            await fillAddressForm(validAddress)
            await clickSaveAddress()

            await saveAndContinue()
            await flushPromiseQueue()

            const operation = mockResolveLastOperation({})
            expect(operation.operationName).toBe(
              "useSaveFulfillmentDetailsMutation"
            )
          })

          it("triggers the flow for international address after clicking continue", async () => {
            const { mockResolveLastOperation } = renderWithRelay({
              CommerceOrder: () => order,
              Me: () => meWithoutAddress,
            })

            await fillAddressForm(inputAddress)
            await clickSaveAddress()

            await userEvent.selectOptions(
              screen.getByTestId("AddressForm_country"),
              ["TW"]
            )
            await flushPromiseQueue()

            await saveAndContinue()

            await flushPromiseQueue()
            await verifyAddressWithSuggestions(
              mockResolveLastOperation,
              inputAddress,
              {
                ...inputAddress,
                addressLine1: "<recommended change>",
              }
            )
            await userEvent.click(screen.getByText("Use This Address"))
            await flushPromiseQueue()
            const fulfillmentRequest = await resolveSaveFulfillmentDetails(
              mockResolveLastOperation,
              settingOrderShipmentSuccess.commerceSetShipping
            )

            expect(fulfillmentRequest.operationName).toBe(
              "useSaveFulfillmentDetailsMutation"
            )
            expect(fulfillmentRequest.operationVariables).toEqual({
              input: {
                id: "2939023",
                fulfillmentType: "SHIP",
                addressVerifiedBy: "ARTSY",
                phoneNumber: validAddress.phoneNumber,
                shipping: {
                  ...inputAddress,
                  addressLine1: "<recommended change>",
                  name: "Joelle Van Dyne",
                  phoneNumber: "",
                },
              },
            })
          })
        })
      })
    })

    // e.g.: Should valid saved address be automatically saved to show shipping quotes?
    describe("with saved addresses", () => {
      it("does not show the new address form", async () => {
        const { mockResolveLastOperation } = renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithAddresses,
        })

        await resolveSaveFulfillmentDetails(
          mockResolveLastOperation,
          settingOrderShipmentSuccess.commerceSetShipping
        )
        // TODO: need a better way to check if the form is collapsed (height 0).
        // Zero height is not considered invisible.
        // https://github.com/testing-library/jest-dom/issues/450
        expect(screen.getByTestId("addressFormCollapse")).toHaveStyle({
          height: "0px",
        })
        expect(screen.getByPlaceholderText("Street address")).toHaveAttribute(
          "tabindex",
          "-1"
        )
      })

      it("lists the addresses and renders the add address option", async () => {
        const { mockResolveLastOperation } = renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithAddresses,
        })

        await resolveSaveFulfillmentDetails(
          mockResolveLastOperation,
          settingOrderShipmentSuccess.commerceSetShipping
        )

        expect(
          screen.getByRole("radio", { name: /401 Broadway/ })
        ).toBeVisible()
        expect(screen.getByRole("radio", { name: /1 Main St/ })).toBeVisible()
        expect(
          screen.getByRole("button", { name: "Add a new address" })
        ).toBeVisible()
      })

      it("automatically saves the default saved address on load if valid (without tracking)", async () => {
        const { mockResolveLastOperation } = renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithAddresses,
        })

        const automaticFulfillmentMutation = await resolveSaveFulfillmentDetails(
          mockResolveLastOperation,
          settingOrderShipmentSuccess.commerceSetShipping
        )

        expect(automaticFulfillmentMutation.operationName).toEqual(
          "useSaveFulfillmentDetailsMutation"
        )
        expect(automaticFulfillmentMutation.operationVariables).toEqual({
          input: {
            id: "2939023",
            fulfillmentType: "SHIP",
            phoneNumber: "422-424-4242",
            shipping: {
              addressLine1: "401 Broadway",
              addressLine2: "Floor 25",
              city: "New York",
              country: "US",
              name: "Test Name",
              phoneNumber: "",
              postalCode: "10013",
              region: "NY",
            },
          },
        })

        expect(mockTrackEvent).not.toHaveBeenCalled()
      })

      it("sets shipping again when the user clicks to select address", async () => {
        const { mockResolveLastOperation } = renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithAddresses,
        })

        await resolveSaveFulfillmentDetails(
          mockResolveLastOperation,
          settingOrderShipmentSuccess.commerceSetShipping
        )

        await userEvent.click(screen.getByRole("radio", { name: /1 Main St/ }))

        expect(mockTrackEvent).toHaveBeenCalledWith({
          action: "clickedShippingAddress",
          context_module: "ordersShipping",
          context_page_owner_id: "2939023",
          context_page_owner_type: "orders-shipping",
        })

        const fulfillmentMutation = await resolveSaveFulfillmentDetails(
          mockResolveLastOperation,
          settingOrderShipmentSuccess.commerceSetShipping
        )
        expect(fulfillmentMutation.operationName).toEqual(
          "useSaveFulfillmentDetailsMutation"
        )
        expect(fulfillmentMutation.operationVariables).toEqual({
          input: {
            id: "2939023",
            fulfillmentType: "SHIP",
            phoneNumber: "555-555-5555",
            shipping: {
              addressLine1: "1 Main St",
              addressLine2: "",
              city: "Madrid",
              country: "ES",
              name: "Test Name",
              phoneNumber: "",
              postalCode: "28001",
              region: "",
            },
          },
        })
      })

      describe("address verification", () => {
        describe("with address verification enabled", () => {
          beforeEach(() => {
            ;(useFeatureFlag as jest.Mock).mockImplementation(
              (featureName: string) => featureName === "address_verification_us"
            )
          })

          it("does not trigger the flow", async () => {
            const { mockResolveLastOperation } = renderWithRelay({
              CommerceOrder: () => order,
              Me: () => meWithAddresses,
            })

            const automaticFulfillmentMutation = await resolveSaveFulfillmentDetails(
              mockResolveLastOperation,
              settingOrderShipmentSuccess.commerceSetShipping
            )

            expect(automaticFulfillmentMutation.operationName).toEqual(
              "useSaveFulfillmentDetailsMutation"
            )

            await userEvent.click(
              screen.getByRole("radio", { name: /1 Main St/ })
            )

            const manualFulfillmentMutation = await waitFor(() =>
              mockResolveLastOperation({})
            )
            expect(manualFulfillmentMutation.operationName).toBe(
              "useSaveFulfillmentDetailsMutation"
            )
          })
        })
      })

      describe("editing address", () => {
        it("opens a modal with the address prepopulated", async () => {
          const { mockResolveLastOperation } = renderWithRelay({
            CommerceOrder: () => order,
            Me: () => meWithAddresses,
          })

          await resolveSaveFulfillmentDetails(
            mockResolveLastOperation,
            settingOrderShipmentSuccess.commerceSetShipping
          )

          const selectedAddress = screen.getAllByTestId("savedAddress")[1]
          expect(selectedAddress).toHaveTextContent("401 Broadway")

          await userEvent.click(within(selectedAddress).getByText("Edit"))

          await waitFor(async () => {
            const addressModal = screen.getByTestId("AddressModal")
            expect(screen.getByText("Edit address")).toBeVisible()
            expect(
              within(addressModal).getByDisplayValue("401 Broadway")
            ).toBeVisible()
            expect(
              within(addressModal).getByDisplayValue("Floor 25")
            ).toBeVisible()
            expect(
              within(addressModal).getByDisplayValue("New York")
            ).toBeVisible()
            expect(within(addressModal).getByDisplayValue("NY")).toBeVisible()
            expect(
              within(addressModal).getByDisplayValue("10013")
            ).toBeVisible()
          })
        })

        it("updates the address after submitting the modal form, then saves the address to the order", async () => {
          const { mockResolveLastOperation } = renderWithRelay({
            CommerceOrder: () => order,
            Me: () => meWithAddresses,
          })

          await resolveSaveFulfillmentDetails(
            mockResolveLastOperation,
            settingOrderShipmentSuccess.commerceSetShipping
          )

          const selectedAddress = screen.getAllByTestId("savedAddress")[1]
          expect(selectedAddress).toHaveTextContent("401 Broadway")

          await userEvent.click(within(selectedAddress).getByText("Edit"))

          const modalTitle = await screen.findByText("Edit address")
          expect(modalTitle).toBeVisible()

          // TODO: need a better way to get a specific input field from multiple forms
          await waitFor(async () => {
            const addressModal = screen.getByTestId("AddressModal")
            const addressLine2 = within(addressModal).getByPlaceholderText(
              /Apt, floor, suite/
            )
            await userEvent.clear(addressLine2)
            await userEvent.paste(addressLine2, "25th fl.")
          })

          userEvent.click(screen.getByRole("button", { name: "Save" }))

          await flushPromiseQueue()

          const updateAddressResult = {
            userAddressOrErrors: {
              ...saveAddressSuccess.createUserAddress!.userAddressOrErrors,
              addressLine2: "25th fl.",
            },
          }
          const updateAddressOperation = await mockResolveLastOperation({
            UpdateUserAddressPayload: () => updateAddressResult,
          })

          expect(updateAddressOperation.operationName).toEqual(
            "useUpdateSavedAddressMutation"
          )
          expect(updateAddressOperation.operationVariables).toMatchObject({
            input: {
              attributes: {
                addressLine1: "401 Broadway",
                addressLine2: "25th fl.",
                city: "New York",
                country: "US",
                name: "Test Name",
                phoneNumber: "422-424-4242",
                postalCode: "10013",
                region: "NY",
              },
              userAddressID: "2",
            },
          })

          await flushPromiseQueue()

          const saveFulfillmentOperation = await resolveSaveFulfillmentDetails(
            mockResolveLastOperation,
            settingOrderShipmentSuccess.commerceSetShipping
          )

          expect(saveFulfillmentOperation.operationName).toEqual(
            "useSaveFulfillmentDetailsMutation"
          )

          // Fixme: Save address with correct new value
          expect(
            saveFulfillmentOperation.operationVariables.input.shipping
              .addressLine2
          ).toEqual("25th fl.")
        })
      })
    })
  })

  describe("with Artsy shipping", () => {
    describe("with no saved address", () => {
      describe("address verification", () => {
        describe("with US enabled and international disabled", () => {
          beforeEach(() => {
            ;(useFeatureFlag as jest.Mock).mockImplementation(
              (featureName: string) => featureName === "address_verification_us"
            )
          })

          it("uses recommended address", async () => {
            const { mockResolveLastOperation, env } = renderWithRelay({
              CommerceOrder: () =>
                UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
              Me: () => meWithoutAddress,
            })

            await fillAddressForm(validAddress)
            await saveAndContinue()

            await verifyAddressWithSuggestions(
              mockResolveLastOperation,
              validAddress,
              recommendedAddress
            )

            await userEvent.click(screen.getByText("Use This Address"))

            await flushPromiseQueue()

            const createAddressOperation = await mockResolveLastOperation({
              CreateUserAddressPayload: () =>
                merge({}, saveAddressSuccess.createUserAddress, {
                  userAddressOrErrors: {
                    ...recommendedAddress,
                    __typename: "UserAddress",
                  },
                }),
            })
            expect(createAddressOperation.operationName).toBe(
              "useCreateSavedAddressMutation"
            )

            await flushPromiseQueue()

            const fulfillmentOperation = await resolveSaveFulfillmentDetails(
              mockResolveLastOperation,
              settingOrderArtaShipmentSuccess.commerceSetShipping,
              recommendedAddress
            )

            expect(fulfillmentOperation.operationName).toBe(
              "useSaveFulfillmentDetailsMutation"
            )
            expect(fulfillmentOperation.operationVariables).toEqual({
              input: {
                id: "2939023",
                fulfillmentType: "SHIP_ARTA",
                addressVerifiedBy: "ARTSY",
                phoneNumber: validAddress.phoneNumber,
                shipping: {
                  ...recommendedAddress,
                  name: "Joelle Van Dyne",
                  phoneNumber: "",
                },
              },
            })

            await flushPromiseQueue()

            await waitFor(() => userEvent.click(screen.getByText(/^Premium/)))

            await flushPromiseQueue()

            await saveAndContinue()
            await flushPromiseQueue()
            const selectNewShippingOptionOperation = await mockResolveLastOperation(
              {
                CommerceSelectShippingOptionPayload: () =>
                  selectShippingQuoteSuccess.commerceSelectShippingOption,
              }
            )
            expect(selectNewShippingOptionOperation.operationName).toBe(
              "useSelectShippingQuoteMutation"
            )

            await flushPromiseQueue()
            expect(getAllPendingOperationNames(env)).toEqual([])
            expect(mockPush).toHaveBeenCalledWith("/orders/2939023/payment")
          })

          it("goes back and edits address after verification", async () => {
            const { mockResolveLastOperation, env } = renderWithRelay({
              CommerceOrder: () =>
                UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
              Me: () => meWithoutAddress,
            })

            await fillAddressForm(validAddressBeforeVerification)

            await saveAndContinue()

            await verifyAddressWithSuggestions(
              mockResolveLastOperation,
              validAddressBeforeVerification,
              recommendedAddress
            )

            // Clicking "Back to Edit" allows users to edit the address form
            // and requires clicking "Save and Continue" to proceed.
            userEvent.click(screen.getByText("Back to Edit"))

            await saveAndContinue()
            await flushPromiseQueue()

            const createAddressOperation = await mockResolveLastOperation({
              CreateUserAddressPayload: () =>
                saveAddressSuccess.createUserAddress,
            })
            expect(createAddressOperation.operationName).toBe(
              "useCreateSavedAddressMutation"
            )

            await flushPromiseQueue()

            const fulfillmentOperation = await resolveSaveFulfillmentDetails(
              mockResolveLastOperation,
              settingOrderArtaShipmentSuccess.commerceSetShipping
            )

            expect(fulfillmentOperation.operationName).toBe(
              "useSaveFulfillmentDetailsMutation"
            )
            expect(fulfillmentOperation.operationVariables).toEqual({
              input: {
                id: "2939023",
                fulfillmentType: "SHIP_ARTA",
                addressVerifiedBy: "USER",
                phoneNumber: validAddress.phoneNumber,
                shipping: {
                  ...validAddress,
                  name: "Joelle Van Dyne",
                  phoneNumber: "",
                },
              },
            })

            await flushPromiseQueue()
            await saveAndContinue()
            const selectShippingOptionOperation = await mockResolveLastOperation(
              {
                CommerceSelectShippingOptionPayload: () =>
                  selectShippingQuoteSuccess.commerceSelectShippingOption,
              }
            )
            expect(selectShippingOptionOperation.operationName).toBe(
              "useSelectShippingQuoteMutation"
            )

            await flushPromiseQueue()
            expect(getAllPendingOperationNames(env)).toEqual([])
            expect(mockPush).toHaveBeenCalledWith("/orders/2939023/payment")
          })
        })
      })

      it("shows an error if Arta doesn't return shipping quotes", async () => {
        const settingOrderArtaShipmentSuccessWithoutQuotes = cloneDeep(
          settingOrderArtaShipmentSuccess
        ) as any
        settingOrderArtaShipmentSuccessWithoutQuotes.commerceSetShipping.orderOrError.order.lineItems.edges[0].node.shippingQuoteOptions.edges = []

        const { mockResolveLastOperation } = renderWithRelay({
          CommerceOrder: () => UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        await clickSaveAddress()

        await saveAndContinue()

        await resolveSaveFulfillmentDetails(
          mockResolveLastOperation,
          settingOrderArtaShipmentSuccessWithoutQuotes.commerceSetShipping
        )

        expect(
          screen.queryByRole("radio", { name: /Standard/ })
        ).not.toBeInTheDocument()
        expect(
          screen.getByText(
            /In order to provide a shipping quote, we need some more information from you./
          )
        ).toBeInTheDocument()
      })

      it("hides shipping quotes and updates shipping address plus saved address if user edits address fields", async () => {
        const { mockResolveLastOperation, env } = renderWithRelay({
          CommerceOrder: () => UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        await saveAndContinue()

        await flushPromiseQueue()
        const saveAddressOperation = await mockResolveLastOperation({
          CreateUserAddressPayload: () => saveAddressSuccess.createUserAddress,
          Me: () => ({
            ...meWithoutAddress,
            addressConnection: {
              totalCount: 0,
              edges: [
                {
                  node: {
                    ...saveAddressSuccess.createUserAddress
                      ?.userAddressOrErrors,
                  },
                },
              ],
            },
          }),
        })

        expect(saveAddressOperation.operationName).toBe(
          "useCreateSavedAddressMutation"
        )

        await flushPromiseQueue()

        await resolveSaveFulfillmentDetails(
          mockResolveLastOperation,
          settingOrderArtaShipmentSuccess.commerceSetShipping
        )

        await flushPromiseQueue()

        const addressLine1 = screen.getByPlaceholderText("Street address")
        const addressLine2 = screen.getByPlaceholderText(
          "Apt, floor, suite, etc."
        )
        await userEvent.clear(addressLine2)
        await userEvent.tab()
        await userEvent.paste(addressLine1, " Suite 25")

        await waitFor(() => {
          const shippingBox = screen.getByTestId("ShippingQuotes_collapse")

          expect(shippingBox).toHaveStyle({ height: "0px" })
        })

        await flushPromiseQueue()

        await saveAndContinue()

        const updatedUserAddress = {
          ...updateAddressSuccess?.updateUserAddress?.userAddressOrErrors,
          __typename: "UserAddress",
          addressLine1: "401 Broadway Suite 25",
          addressLine2: "",
        }

        await flushPromiseQueue()
        const updateAddressOperation = await mockResolveLastOperation({
          UpdateUserAddressPayload: () => ({
            userAddressOrErrors: updatedUserAddress,
          }),
          Me: () => ({
            ...meWithoutAddress,
            addressConnection: {
              totalCount: 1,
              edges: [
                {
                  node: updatedUserAddress,
                },
              ],
            },
          }),
        })

        await flushPromiseQueue()

        expect(updateAddressOperation.operationName).toBe(
          "useUpdateSavedAddressMutation"
        )
        expect(updateAddressOperation.operationVariables).toEqual({
          input: {
            attributes: {
              name: "Joelle Van Dyne",
              phoneNumber: "120938120983",
              addressLine1: "401 Broadway Suite 25",
              addressLine2: "",
              city: "New York",
              region: "NY",
              country: "US",
              postalCode: "10013",
            },
            userAddressID: "address-id",
          },
        })

        await resolveSaveFulfillmentDetails(
          mockResolveLastOperation,
          settingOrderArtaShipmentSuccess.commerceSetShipping,
          { addressLine1: "401 Broadway Suite 25", addressLine2: "" }
        )

        await flushPromiseQueue()

        const premiumShipping = await screen.findByRole("radio", {
          name: /Premium/,
        })

        await userEvent.click(premiumShipping)

        await saveAndContinue()

        await flushPromiseQueue()

        const selectShippingOptionOperation = await mockResolveLastOperation({
          CommerceSelectShippingOptionPayload: () =>
            selectShippingQuoteSuccess.commerceSelectShippingOption,
        })

        expect(selectShippingOptionOperation.operationName).toBe(
          "useSelectShippingQuoteMutation"
        )
        expect(selectShippingOptionOperation.operationVariables).toEqual({
          input: {
            id: "2939023",
            selectedShippingQuoteId: "1eb3ba19-643b-4101-b113-2eb4ef7e30b6",
          },
        })
        await flushPromiseQueue()
        expect(getAllPendingOperationNames(env)).toEqual([])
        expect(mockPush).toHaveBeenCalledWith("/orders/2939023/payment")
      })

      it("saves address upon selecting shipping quote if address is checked and it wasn't saved before", async () => {
        const { mockResolveLastOperation, env } = renderWithRelay({
          CommerceOrder: () => UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        await clickSaveAddress()

        await saveAndContinue()

        const fulfillmentOperation = await resolveSaveFulfillmentDetails(
          mockResolveLastOperation,
          settingOrderArtaShipmentSuccess.commerceSetShipping
        )
        expect(fulfillmentOperation.operationName).toBe(
          "useSaveFulfillmentDetailsMutation"
        )

        // FIXME: `getByRole` can be slow and cause test to time out.
        // https://github.com/testing-library/dom-testing-library/issues/552#issuecomment-625172052
        const premiumShipping = await screen.findByRole("radio", {
          name: /Premium/,
        })
        await userEvent.click(premiumShipping)
        await clickSaveAddress()

        await saveAndContinue()

        await flushPromiseQueue()
        const saveAddressOperation = await mockResolveLastOperation({
          CreateUserAddressPayload: () => saveAddressSuccess.createUserAddress,
        })

        expect(saveAddressOperation.operationName).toBe(
          "useCreateSavedAddressMutation"
        )
        expect(saveAddressOperation.operationVariables).toEqual({
          input: {
            attributes: {
              addressLine1: "401 Broadway",
              addressLine2: "Suite 25",
              city: "New York",
              country: "US",
              name: "Joelle Van Dyne",
              phoneNumber: "120938120983",
              postalCode: "10013",
              region: "NY",
            },
          },
        })

        await flushPromiseQueue()

        const selectShippingOptionOperation = await mockResolveLastOperation({
          CommerceSelectShippingOptionPayload: () =>
            selectShippingQuoteSuccess.commerceSelectShippingOption,
        })
        expect(selectShippingOptionOperation.operationName).toBe(
          "useSelectShippingQuoteMutation"
        )

        await flushPromiseQueue()

        expect(getAllPendingOperationNames(env)).toEqual([])
        expect(mockPush).toHaveBeenCalledWith("/orders/2939023/payment")
      })

      it("removes saved address upon selecting shipping quote if save-address is unchecked after initially saving it", async () => {
        const { mockResolveLastOperation } = renderWithRelay({
          CommerceOrder: () => UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        await saveAndContinue()

        await flushPromiseQueue()
        const saveAddressOperation = await mockResolveLastOperation({
          CreateUserAddressPayload: () => saveAddressSuccess.createUserAddress,
        })

        expect(saveAddressOperation.operationName).toBe(
          "useCreateSavedAddressMutation"
        )
        await flushPromiseQueue()

        const fulfillmentOperation = await resolveSaveFulfillmentDetails(
          mockResolveLastOperation,
          settingOrderArtaShipmentSuccess.commerceSetShipping,
          validAddress
        )
        expect(fulfillmentOperation.operationName).toBe(
          "useSaveFulfillmentDetailsMutation"
        )

        // FIXME: `getByRole` can be slow and cause test to time out.
        // https://github.com/testing-library/dom-testing-library/issues/552#issuecomment-625172052
        const premiumShipping = await screen.findByRole("radio", {
          name: /Premium/,
        })
        await userEvent.click(premiumShipping)

        await clickSaveAddress()
        await flushPromiseQueue()

        await saveAndContinue()
        await flushPromiseQueue()

        const deleteAddressOperation = await mockResolveLastOperation({
          // DeleteUserAddressPayload: () => saveAddressSuccess,
        })
        expect(deleteAddressOperation.operationName).toBe(
          "useDeleteSavedAddressMutation"
        )

        await flushPromiseQueue()

        const selectShippingOptionOperation = await mockResolveLastOperation({
          CommerceSelectShippingOptionPayload: () =>
            selectShippingQuoteSuccess.commerceSelectShippingOption,
        })
        expect(selectShippingOptionOperation.operationName).toBe(
          "useSelectShippingQuoteMutation"
        )

        expect(deleteAddressOperation.operationVariables).toEqual({
          input: {
            userAddressID: "address-id",
          },
        })
      })
    })

    describe("with saved addresses", () => {
      it("re-saves an already-saved shipping address on load to refresh shipping quotes without saving address", async () => {
        const { mockResolveLastOperation, env } = renderWithRelay({
          CommerceOrder: () => BuyOrderWithArtaShippingDetails,
          Me: () => meWithoutAddress,
        })

        await waitFor(() => {
          const shippingBox = screen.getByTestId("ShippingQuotes_collapse")
          expect(shippingBox).toHaveStyle({ height: "0px" })
        })

        const fulfillmentOperation = await resolveSaveFulfillmentDetails(
          mockResolveLastOperation,
          settingOrderArtaShipmentSuccess.commerceSetShipping
        )
        expect(fulfillmentOperation.operationName).toBe(
          "useSaveFulfillmentDetailsMutation"
        )
        expect(fulfillmentOperation.operationVariables).toEqual({
          input: {
            fulfillmentType: "SHIP_ARTA",
            id: "2939023",
            phoneNumber: "120938120983",
            shipping: {
              addressLine1: "401 Broadway",
              addressLine2: "Suite 25",
              city: "New York",
              country: "US",
              name: "Joelle Van Dyne",
              phoneNumber: "",
              postalCode: "10013",
              region: "NY",
            },
          },
        })

        await flushPromiseQueue()
        expect(getAllPendingOperationNames(env)).toEqual([])
      })

      // TODO: EMI-1526 https://artsyproduct.atlassian.net/browse/EMI-1526
      describe("Artsy shipping international only", () => {
        describe("with artwork located in the US", () => {
          it("sets shipping on order if the collector is in the EU", async () => {
            const meWithDefaultAddressInSpain = cloneDeep(
              meWithAddresses
            ) as any

            meWithDefaultAddressInSpain.addressConnection.edges[0].node.isDefault = true // Spain
            meWithDefaultAddressInSpain.addressConnection.edges[1].node.isDefault = false // US

            const { mockResolveLastOperation } = renderWithRelay({
              CommerceOrder: () =>
                UntouchedBuyOrderWithArtsyShippingInternationalFromUS,
              Me: () => meWithDefaultAddressInSpain,
            })

            const fulfillmentRequest = await resolveSaveFulfillmentDetails(
              mockResolveLastOperation,
              settingOrderShipmentSuccess.commerceSetShipping
            )

            expect(fulfillmentRequest.operationName).toBe(
              "useSaveFulfillmentDetailsMutation"
            )
            expect(fulfillmentRequest.operationVariables).toEqual({
              input: {
                id: "2939023",
                fulfillmentType: "SHIP_ARTA",
                phoneNumber: "555-555-5555",
                shipping: {
                  addressLine1: "1 Main St",
                  addressLine2: "",
                  city: "Madrid",
                  country: "ES",
                  name: "Test Name",
                  phoneNumber: "",
                  postalCode: "28001",
                  region: "",
                },
              },
            })
          })
        })

        describe("with artwork located in Germany", () => {
          it("does not set shipping on order automatically if the collector is in the EU", async () => {
            // TODO: Why would we want this behavior? We can now set shipping on all valid saved addresses-
            // no need to check whether it needs artsy shipping.
            const meWithDefaultAddressInSpain = cloneDeep(
              meWithAddresses
            ) as any
            meWithDefaultAddressInSpain.addressConnection.edges[0].node.isDefault = true // Spain
            meWithDefaultAddressInSpain.addressConnection.edges[1].node.isDefault = false // US

            const { env, mockResolveLastOperation } = renderWithRelay({
              CommerceOrder: () =>
                UntouchedBuyOrderWithArtsyShippingInternationalFromGermany,
              Me: () => meWithDefaultAddressInSpain,
            })

            await resolveSaveFulfillmentDetails(
              mockResolveLastOperation,
              settingOrderShipmentSuccess.commerceSetShipping
            )

            expect(getAllPendingOperationNames(env)).toEqual([])
            expect(
              screen.queryByRole("radio", {
                name: /(^Standard|^Express|^White Glove|^Rush|^Premium)/,
              })
            ).not.toBeInTheDocument()
          })

          it("sets shipping on order automatically if the collector is in the US", async () => {
            const { mockResolveLastOperation } = renderWithRelay({
              CommerceOrder: () =>
                UntouchedBuyOrderWithArtsyShippingInternationalFromGermany,
              Me: () => meWithAddresses,
            })

            const fulfillmentRequest = await resolveSaveFulfillmentDetails(
              mockResolveLastOperation,
              settingOrderShipmentSuccess.commerceSetShipping
            )

            expect(fulfillmentRequest.operationName).toBe(
              "useSaveFulfillmentDetailsMutation"
            )
            expect(fulfillmentRequest.operationVariables).toEqual({
              input: {
                id: "2939023",
                fulfillmentType: "SHIP_ARTA",
                phoneNumber: "422-424-4242",
                shipping: {
                  addressLine1: "401 Broadway",
                  addressLine2: "Floor 25",
                  city: "New York",
                  country: "US",
                  name: "Test Name",
                  phoneNumber: "",
                  postalCode: "10013",
                  region: "NY",
                },
              },
            })
          })
        })
      })

      describe("Artsy shipping domestic only", () => {
        describe("with artwork located in Germany", () => {
          // TODO: Like the test above, these tests assume we don't want to automatically set shipping
          // unless the default address would require artsy shipping. That is no longer the case-
          // We can safely set the shipping. See alsoped test above (~L1957)
          it("sets shipping on order if the collector is in the EU", async () => {
            const meWithDefaultAddressInSpain = cloneDeep(
              meWithAddresses
            ) as any
            meWithDefaultAddressInSpain.addressConnection.edges[0].node.isDefault = true // Spain
            meWithDefaultAddressInSpain.addressConnection.edges[1].node.isDefault = false // US

            const { mockResolveLastOperation } = renderWithRelay({
              CommerceOrder: () =>
                UntouchedBuyOrderWithArtsyShippingDomesticFromGermany,
              Me: () => meWithDefaultAddressInSpain,
            })

            const fulfillmentRequest = await resolveSaveFulfillmentDetails(
              mockResolveLastOperation,
              settingOrderShipmentSuccess.commerceSetShipping
            )

            expect(fulfillmentRequest.operationName).toBe(
              "useSaveFulfillmentDetailsMutation"
            )
            expect(fulfillmentRequest.operationVariables).toEqual({
              input: {
                id: "2939023",
                fulfillmentType: "SHIP_ARTA",
                phoneNumber: "555-555-5555",
                shipping: {
                  addressLine1: "1 Main St",
                  addressLine2: "",
                  city: "Madrid",
                  country: "ES",
                  name: "Test Name",
                  phoneNumber: "",
                  postalCode: "28001",
                  region: "",
                },
              },
            })
          })

          it("does not set shipping on order if the collector is in the US", async () => {
            const { env, mockResolveLastOperation } = renderWithRelay({
              CommerceOrder: () =>
                UntouchedBuyOrderWithArtsyShippingDomesticFromGermany,
              Me: () => meWithAddresses,
            })

            await resolveSaveFulfillmentDetails(
              mockResolveLastOperation,
              settingOrderShipmentSuccess.commerceSetShipping
            )

            expect(getAllPendingOperationNames(env)).toEqual([])
            expect(
              screen.queryByRole("radio", {
                name: /(^Standard|^Express|^White Glove|^Rush|^Premium)/,
              })
            ).not.toBeInTheDocument()
          })
        })

        describe("with artwork located in the US", () => {
          it("does not fetch or show shipping quotes if the collector is in the EU", async () => {
            const meWithDefaultAddressInSpain = cloneDeep(
              meWithAddresses
            ) as any
            meWithDefaultAddressInSpain.addressConnection.edges[0].node.isDefault = true // Spain
            meWithDefaultAddressInSpain.addressConnection.edges[1].node.isDefault = false // US

            const { env, mockResolveLastOperation } = renderWithRelay({
              CommerceOrder: () =>
                UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
              Me: () => meWithDefaultAddressInSpain,
            })

            await resolveSaveFulfillmentDetails(
              mockResolveLastOperation,
              settingOrderShipmentSuccess.commerceSetShipping
            )

            expect(getAllPendingOperationNames(env)).toEqual([])
            expect(
              screen.queryByRole("radio", {
                name: /(^Standard|^Express|^White Glove|^Rush|^Premium)/,
              })
            ).not.toBeInTheDocument()
          })

          describe("with the collector in the US", () => {
            it("sets shipping with the default address on load", async () => {
              const { mockResolveLastOperation } = renderWithRelay({
                CommerceOrder: () =>
                  UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
                Me: () => meWithAddresses,
              })

              const fulfillmentRequest = await resolveSaveFulfillmentDetails(
                mockResolveLastOperation,
                settingOrderArtaShipmentSuccess.commerceSetShipping
              )

              expect(fulfillmentRequest.operationName).toBe(
                "useSaveFulfillmentDetailsMutation"
              )
              expect(fulfillmentRequest.operationVariables.input).toEqual({
                id: "2939023",
                fulfillmentType: "SHIP_ARTA",
                phoneNumber: "422-424-4242",
                shipping: {
                  addressLine1: "401 Broadway",
                  addressLine2: "Floor 25",
                  city: "New York",
                  country: "US",
                  name: "Test Name",
                  phoneNumber: "",
                  postalCode: "10013",
                  region: "NY",
                },
              })
            })

            it("shows shipping quotes for the default address on load", async () => {
              const { mockResolveLastOperation } = renderWithRelay({
                CommerceOrder: () =>
                  UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
                Me: () => meWithAddresses,
              })
              const fulfillmentRequest = await resolveSaveFulfillmentDetails(
                mockResolveLastOperation,
                settingOrderArtaShipmentSuccess.commerceSetShipping
              )

              expect(fulfillmentRequest.operationName).toBe(
                "useSaveFulfillmentDetailsMutation"
              )

              expect(
                screen.getAllByRole("radio", {
                  name: /(^Standard|^Express|^White Glove|^Rush|^Premium)/,
                })
              ).toHaveLength(5)
            })

            it("sets shipping on order, shows shipping quotes and saves the pre-selected quote", async () => {
              const { mockResolveLastOperation } = renderWithRelay({
                // Simulate the condition with an order with saved shipping quotes
                CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
                Me: () => meWithAddresses,
              })

              const fulfillmentRequest = await resolveSaveFulfillmentDetails(
                mockResolveLastOperation,
                settingOrderArtaShipmentSuccess.commerceSetShipping
              )

              expect(fulfillmentRequest.operationName).toBe(
                "useSaveFulfillmentDetailsMutation"
              )

              expect(screen.getByText("Save and Continue")).toBeEnabled()

              await flushPromiseQueue()
              await saveAndContinue()

              await flushPromiseQueue()
              const selectShippingOptionOperation = await mockResolveLastOperation(
                {}
              )

              expect(selectShippingOptionOperation.operationName).toEqual(
                "useSelectShippingQuoteMutation"
              )
              expect(selectShippingOptionOperation.operationVariables).toEqual({
                input: {
                  id: "2939023",
                  selectedShippingQuoteId:
                    "4a8f8080-23d3-4c0e-9811-7a41a9df6933",
                },
              })
            })

            it("selects a different shipping quote and saves it", async () => {
              const { mockResolveLastOperation } = renderWithRelay({
                // Simulate the condition with an order with saved shipping quotes
                CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
                Me: () => meWithAddresses,
              })
              const fulfillmentRequest = await resolveSaveFulfillmentDetails(
                mockResolveLastOperation,
                settingOrderArtaShipmentSuccess.commerceSetShipping
              )

              expect(fulfillmentRequest.operationName).toBe(
                "useSaveFulfillmentDetailsMutation"
              )
              expect(fulfillmentRequest.operationVariables).toEqual({
                input: {
                  id: "2939023",
                  fulfillmentType: "SHIP_ARTA",
                  phoneNumber: "422-424-4242",
                  shipping: {
                    addressLine1: "401 Broadway",
                    addressLine2: "Floor 25",
                    city: "New York",
                    country: "US",
                    name: "Test Name",
                    phoneNumber: "",
                    postalCode: "10013",
                    region: "NY",
                  },
                },
              })

              userEvent.click(screen.getByText(/^Premium/))
              expect(screen.getByText("Save and Continue")).toBeEnabled()
              await saveAndContinue()

              await flushPromiseQueue()
              const selectShippingOptionOperation = await mockResolveLastOperation(
                {}
              )
              expect(selectShippingOptionOperation.operationName).toEqual(
                "useSelectShippingQuoteMutation"
              )
              expect(selectShippingOptionOperation.operationVariables).toEqual({
                input: {
                  id: "2939023",
                  selectedShippingQuoteId:
                    "1eb3ba19-643b-4101-b113-2eb4ef7e30b6",
                },
              })
            })

            it("keeps the submit button enabled after selecting a shipping quote", async () => {
              const { mockResolveLastOperation } = renderWithRelay({
                // Simulate the condition with an order with saved shipping quotes
                CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
                Me: () => meWithAddresses,
              })
              await resolveSaveFulfillmentDetails(
                mockResolveLastOperation,
                settingOrderArtaShipmentSuccess.commerceSetShipping
              )

              const premiumShipping = screen.getByRole("radio", {
                name: /^Premium/,
              })
              expect(premiumShipping).not.toBeChecked()

              userEvent.click(premiumShipping)
              await flushPromiseQueue()

              expect(premiumShipping).toBeChecked()
              expect(
                screen.getByRole("button", { name: "Save and Continue" })
              ).toBeEnabled()
            })

            it("routes to payment screen after saving shipping option", async () => {
              const { mockResolveLastOperation, env } = renderWithRelay({
                // Simulate the condition with an order with saved shipping quotes
                CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
                Me: () => meWithAddresses,
              })
              const fulfillmentRequest = await resolveSaveFulfillmentDetails(
                mockResolveLastOperation,
                settingOrderArtaShipmentSuccess.commerceSetShipping
              )
              expect(fulfillmentRequest.operationName).toBe(
                "useSaveFulfillmentDetailsMutation"
              )
              await saveAndContinue()

              await flushPromiseQueue()
              const selectShippingOptionOperation = await mockResolveLastOperation(
                {
                  CommerceSelectShippingOptionPayload: () =>
                    selectShippingQuoteSuccess.commerceSelectShippingOption,
                }
              )
              expect(selectShippingOptionOperation.operationName).toEqual(
                "useSelectShippingQuoteMutation"
              )

              expect(getAllPendingOperationNames(env)).toEqual([])
              expect(mockPush).toHaveBeenCalledWith("/orders/2939023/payment")
            })

            it("reloads shipping quotes after editing the selected address", async () => {
              // const updateAddressResponse = cloneDeep(
              //   updateAddressSuccess
              // ) as any
              // // Match the edited address with the selected address to trigger refetching quotes
              // updateAddressResponse.updateUserAddress.userAddressOrErrors.internalID =
              //   "2"
              // const updateAddressSpy = jest
              //   .spyOn(updateUserAddress, "updateUserAddress")
              //   // @ts-ignore
              //   .mockImplementationOnce((_, __, ___, ____, onSuccess) => {
              //     onSuccess(updateAddressResponse)
              //   })

              const { mockResolveLastOperation } = renderWithRelay({
                CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
                Me: () => meWithAddresses,
              })

              await resolveSaveFulfillmentDetails(
                mockResolveLastOperation,
                settingOrderArtaShipmentSuccess.commerceSetShipping
              )

              const selectedAddress = screen.getAllByTestId("savedAddress")[1]
              expect(selectedAddress).toHaveTextContent("401 Broadway")

              await userEvent.click(within(selectedAddress).getByText("Edit"))

              const modalTitle = await screen.findByText("Edit address")
              expect(modalTitle).toBeVisible()

              // TODO: need a better way to get a specific input field from multiple forms
              await waitFor(async () => {
                const addressModal = screen.getByTestId("AddressModal")
                const addressLine2 = within(addressModal).getByPlaceholderText(
                  /Apt, floor, suite/
                )
                await userEvent.clear(addressLine2)
                await userEvent.paste(addressLine2, "25th fl.")
              })

              userEvent.click(screen.getByRole("button", { name: "Save" }))

              await flushPromiseQueue()

              const updateAddressOperation = await mockResolveLastOperation({
                UpdateUserAddressPayload: () => ({
                  ...saveAddressSuccess.createUserAddress,
                  addressLine2: "25th fl.",
                }),
                Me: () => ({
                  ...meWithAddresses,
                  addressConnection: {
                    totalCount: 2,
                    edges: [
                      meWithAddresses.addressConnection!.edges![0],

                      {
                        node: {
                          ...meWithAddresses.addressConnection!.edges![1],
                          addressLine2: "25th fl.",
                        },
                      },
                    ],
                  },
                }),
              })

              expect(updateAddressOperation.operationName).toEqual(
                "useUpdateSavedAddressMutation"
              )
              expect(updateAddressOperation.operationVariables).toMatchObject({
                input: {
                  attributes: {
                    addressLine1: "401 Broadway",
                    addressLine2: "25th fl.",
                    city: "New York",
                    country: "US",
                    name: "Test Name",
                    phoneNumber: "422-424-4242",
                    postalCode: "10013",
                    region: "NY",
                  },
                  userAddressID: "2",
                },
              })

              await flushPromiseQueue()

              const saveFulfillmentOperation = await resolveSaveFulfillmentDetails(
                mockResolveLastOperation,
                settingOrderShipmentSuccess.commerceSetShipping
              )

              expect(saveFulfillmentOperation.operationName).toEqual(
                "useSaveFulfillmentDetailsMutation"
              )

              await saveAndContinue()

              await flushPromiseQueue()
              const selectShippingOptionOperation = await mockResolveLastOperation(
                {
                  CommerceSelectShippingOptionPayload: () =>
                    selectShippingQuoteSuccess.commerceSelectShippingOption,
                }
              )

              expect(selectShippingOptionOperation.operationName).toEqual(
                "useSelectShippingQuoteMutation"
              )
              expect(selectShippingOptionOperation.operationVariables).toEqual({
                input: {
                  id: "2939023",
                  selectedShippingQuoteId:
                    "4a8f8080-23d3-4c0e-9811-7a41a9df6933",
                },
              })
            })
          })
        })
      })
    })
  })

  describe("with pickup", () => {
    it("shows an empty phone number input with saved addresses", async () => {
      renderWithRelay({
        CommerceOrder: () => order,
        Me: () => meWithAddresses,
      })

      await userEvent.click(
        screen.getByRole("radio", { name: /Arrange for pickup/ })
      )

      const phoneNumber = screen.getByPlaceholderText(
        "Add phone number including country code"
      )
      // TODO: need a better way to check the input is displayed/expanded (height > 0)
      expect(phoneNumber).toHaveAttribute("tabindex", "0")
      expect(phoneNumber).toHaveValue("")
    })

    it("sets pickup on order and advances to payment", async () => {
      const { mockResolveLastOperation, env } = renderWithRelay({
        CommerceOrder: () => order,
        Me: () => meWithoutAddress,
      })

      await userEvent.click(
        screen.getByRole("radio", { name: /Arrange for pickup/ })
      )

      await flushPromiseQueue()
      await userEvent.paste(
        screen.getAllByPlaceholderText(
          "Add phone number including country code"
        )[0],
        "2813308004"
      )

      await flushPromiseQueue()
      await saveAndContinue()

      const fulfillmentRequest = await resolveSaveFulfillmentDetails(
        mockResolveLastOperation,
        {
          orderOrError: {
            __typename: "CommerceOrderWithMutationSuccess",
            order: {
              id: "2939023",
              requestedFulfillment: {
                __typename: "CommercePickup",
                phoneNumber: "2813308004",
              },
            },
          },
        }
      )

      expect(fulfillmentRequest.operationName).toBe(
        "useSaveFulfillmentDetailsMutation"
      )
      expect(fulfillmentRequest.operationVariables).toMatchObject({
        input: {
          id: "2939023",
          fulfillmentType: "PICKUP",
          shipping: {
            addressLine1: "",
            addressLine2: "",
            country: "",
            name: "",
            city: "",
            postalCode: "",
            region: "",
            phoneNumber: "",
          },
          phoneNumber: "2813308004",
        },
      })
      await waitFor(() => {
        expect(getAllPendingOperationNames(env)).toEqual([])
        expect(mockPush).toHaveBeenCalledWith("/orders/2939023/payment")
      })
    })

    it("disables submission without a phone number", async () => {
      const { env } = renderWithRelay({
        CommerceOrder: () => order,
        Me: () => meWithoutAddress,
      })

      userEvent.click(screen.getByRole("radio", { name: /Arrange for pickup/ }))

      await flushPromiseQueue()
      await saveAndContinue()

      expect(screen.getByText("Phone number is required")).toBeInTheDocument()

      expect(env.mock.getAllOperations()).toHaveLength(0)
    })
  })
})
