import { cloneDeep } from "lodash"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { MockBoot } from "DevTools/MockBoot"
import { ShippingFragmentContainer } from "Apps/Order/Routes/Shipping"
import { graphql } from "react-relay"
import {
  UntouchedBuyOrder,
  UntouchedOfferOrder,
  UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
  UntouchedBuyOrderWithArtsyShippingDomesticFromGermany,
  UntouchedBuyOrderWithShippingQuotes,
  UntouchedBuyOrderWithArtsyShippingInternationalFromUS,
  UntouchedBuyOrderWithArtsyShippingInternationalFromGermany,
} from "Apps/__tests__/Fixtures/Order"
import {
  settingOrderShipmentSuccess,
  settingOrderShipmentFailure,
  settingOrderShipmentMissingCountryFailure,
  settingOrderShipmentMissingRegionFailure,
  settingOrderArtaShipmentDestinationCouldNotBeGeocodedFailure,
  settingOrderArtaShipmentSuccess,
  selectShippingQuoteSuccess,
} from "Apps/Order/Routes/__fixtures__/MutationResults/setOrderShipping"
import {
  saveAddressSuccess,
  updateAddressSuccess,
} from "Apps/Order/Routes/__fixtures__/MutationResults/saveAddress"
import { ShippingTestQuery$rawResponse } from "__generated__/ShippingTestQuery.graphql"
import { screen } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { useFeatureFlag } from "System/Hooks/useFeatureFlag"
import {
  fillAddressForm,
  validAddress,
} from "Components/__tests__/Utils/addressForm"
import userEvent from "@testing-library/user-event"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { queryByAttribute } from "@testing-library/dom"
import { ErrorDialogMessage } from "Apps/Order/Utils/getErrorDialogCopy"
import * as updateUserAddress from "Apps/Order/Mutations/UpdateUserAddress"
import { within } from "@testing-library/dom"
import { createMockEnvironment, MockPayloadGenerator } from "relay-test-utils"

// TODO: Optimize test performance and remove long timeout setting
// Set longer timeout for each test _only_ for this file.
// https://jestjs.io/docs/jest-object#jestsettimeouttimeout
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

const mockShowErrorDialog = jest.fn()
jest.mock("Apps/Order/Dialogs", () => ({
  ...jest.requireActual("../../Dialogs"),
  injectDialog: Component => props => (
    <Component {...props} dialog={{ showErrorDialog: mockShowErrorDialog }} />
  ),
}))

// TODO: We need to mock `commitMutation` from 3 different places due to the
// inconsistent implementation.
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
jest.mock("react-relay", () => ({
  ...jest.requireActual("react-relay"),
  commitMutation: (...args) => mockCommitMutation(args),
}))

const mockJumpTo = jest.fn()
jest.mock("Utils/Hooks/useJump", () => ({
  useJump: () => ({ jumpTo: mockJumpTo }),
  Jump: () => null,
}))

const order: ShippingTestQuery$rawResponse["order"] = {
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

const meWithoutAddress: ShippingTestQuery$rawResponse["me"] = {
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

const meWithAddresses: ShippingTestQuery$rawResponse["me"] = Object.assign(
  {},
  meWithoutAddress,
  {
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
)

const saveAndContinue = async () => {
  await userEvent.click(screen.getByText("Save and Continue"))
  await flushPromiseQueue()
}

const recommendedAddress = {
  addressLine1: "401 Broadway Suite 25",
  addressLine2: null,
  city: "New York",
  region: "NY",
  postalCode: "10013",
  country: "US",
}

const verifyAddressWithSuggestions = async (relayEnv, input, suggested) => {
  const addressLines = addr => {
    return [
      addr.addressLine1,
      addr.addressLine2,
      `${addr.city}, ${addr.region} ${addr.postalCode}`,
      addr.country,
    ]
  }

  const verificationResult = {
    __typename: "VerifyAddressType",
    verificationStatus: "VERIFIED_WITH_CHANGES",
    suggestedAddresses: [
      {
        lines: addressLines(recommendedAddress),
        address: recommendedAddress,
      },
    ],
    inputAddress: {
      lines: addressLines(validAddress),
      address: validAddress,
    },
  }

  const mutation = relayEnv.mock.getMostRecentOperation()
  expect(mutation.request.node.operation.name).toEqual(
    "AddressVerificationFlowQuery"
  )
  expect(mutation.request.variables).toEqual({
    address: {
      addressLine1: input.addressLine1,
      addressLine2: input.addressLine2,
      city: input.city,
      region: input.region,
      postalCode: input.postalCode,
      country: input.country,
    },
  })

  relayEnv.mock.resolveMostRecentOperation(operation => {
    return MockPayloadGenerator.generate(operation, {
      VerifyAddressType: () => verificationResult,
    })
  })
  expect(await screen.findByText("Confirm your delivery address")).toBeVisible()
  expect(await screen.findByText("Recommended")).toBeVisible()
  expect(await screen.findByText("What you entered")).toBeVisible()
}

// FIXME: Times out too frequently in CI
describe.skip("Shipping", () => {
  const pushMock = jest.fn()
  let isCommittingMutation
  let relayEnv

  beforeEach(() => {
    isCommittingMutation = false
    ;(useTracking as jest.Mock).mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
    ;(useFeatureFlag as jest.Mock).mockImplementation(() => false)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  const { renderWithRelay } = setupTestWrapperTL({
    Component: (props: any) => (
      <MockBoot relayEnvironment={relayEnv}>
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
        shippingOnlyOrder.lineItems.edges[0].node.artwork.pickup_available = false

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

      it("sets shipping on order and saves address on user", async () => {
        mockCommitMutation.mockResolvedValueOnce(settingOrderShipmentSuccess)
        renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        await saveAndContinue()

        expect(mockCommitMutation).toHaveBeenCalledTimes(2)

        let mutationArg = mockCommitMutation.mock.calls[0][0]
        expect(mutationArg.mutation.default.operation.name).toEqual(
          "SetShippingMutation"
        )
        expect(mutationArg.variables).toEqual({
          input: {
            id: "1234",
            fulfillmentType: "SHIP",
            phoneNumber: validAddress.phoneNumber,
            shipping: {
              ...validAddress,
              phoneNumber: "",
            },
          },
        })

        mutationArg = mockCommitMutation.mock.calls[1][0][1]
        expect(mutationArg.mutation.default.operation.name).toEqual(
          "CreateUserAddressMutation"
        )
        expect(mutationArg.variables).toEqual({
          input: {
            attributes: validAddress,
          },
        })
      })

      it("sets shipping on order but does not save address if save address is not checked", async () => {
        mockCommitMutation.mockResolvedValueOnce(settingOrderShipmentSuccess)
        renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        userEvent.click(
          screen.getByRole("checkbox", { name: /Save shipping address/ })
        )
        await saveAndContinue()

        expect(mockCommitMutation).toHaveBeenCalledTimes(1)

        let mutationArg = mockCommitMutation.mock.calls[0][0]
        expect(mutationArg.mutation.default.operation.name).toEqual(
          "SetShippingMutation"
        )
        expect(mutationArg.variables).toEqual({
          input: {
            id: "1234",
            fulfillmentType: "SHIP",
            phoneNumber: validAddress.phoneNumber,
            shipping: {
              ...validAddress,
              phoneNumber: "",
            },
          },
        })
      })

      it("routes to payment screen after mutation completes", async () => {
        mockCommitMutation.mockResolvedValueOnce(settingOrderShipmentSuccess)
        renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        await saveAndContinue()

        expect(mockCommitMutation).toHaveBeenCalledTimes(2)
        expect(pushMock).toHaveBeenCalledWith("/orders/1234/payment")
      })

      it("shows the button spinner while loading the mutation", async () => {
        isCommittingMutation = true
        renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithoutAddress,
        })

        const button = screen.getByRole("button", { name: "Save and Continue" })
        expect(queryByAttribute("class", button, /Spinner/)).toBeInTheDocument()
      })

      it("shows an error when there is an error from the server", async () => {
        mockCommitMutation.mockResolvedValueOnce(settingOrderShipmentFailure)
        renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        await saveAndContinue()

        expect(mockShowErrorDialog).toHaveBeenCalledWith()
      })

      it("shows an error when there is a network error", async () => {
        mockCommitMutation.mockRejectedValueOnce({})
        renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        await saveAndContinue()

        expect(mockShowErrorDialog).toHaveBeenCalledWith()
      })

      it("shows an error when there is a missing_country error from the server", async () => {
        mockCommitMutation.mockResolvedValueOnce(
          settingOrderShipmentMissingCountryFailure
        )
        renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        await saveAndContinue()

        expect(mockShowErrorDialog).toHaveBeenCalledWith({
          title: "Invalid address",
          message:
            "There was an error processing your address. Please review and try again.",
        })
      })

      it("shows an error when there is a missing_region error from the server", async () => {
        mockCommitMutation.mockResolvedValueOnce(
          settingOrderShipmentMissingRegionFailure
        )
        renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        await saveAndContinue()

        expect(mockShowErrorDialog).toHaveBeenCalledWith({
          title: "Invalid address",
          message:
            "There was an error processing your address. Please review and try again.",
        })
      })

      it("shows an error when there is a destination_could_not_be_geocodederror from the server", async () => {
        mockCommitMutation.mockResolvedValueOnce(
          settingOrderArtaShipmentDestinationCouldNotBeGeocodedFailure
        )
        renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        await saveAndContinue()

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

      it("resets shipping for order with already persisted shipping info", async () => {
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

        await saveAndContinue()

        expect(mockCommitMutation).toHaveBeenCalledTimes(1)

        const mutationArg = mockCommitMutation.mock.calls[0][0]
        expect(mutationArg.mutation.default.operation.name).toEqual(
          "SetShippingMutation"
        )
        expect(mutationArg.variables).toEqual({
          input: {
            id: "1234",
            fulfillmentType: "SHIP",
            phoneNumber: validAddress.phoneNumber,
            shipping: {
              ...validAddress,
              name: "Dr Collector",
            },
          },
        })
      })

      describe("form validations", () => {
        it("does not submit an empty form", async () => {
          renderWithRelay({
            CommerceOrder: () => order,
            Me: () => meWithoutAddress,
          })

          await saveAndContinue()
          expect(mockCommitMutation).not.toBeCalled()
        })

        it("does not submit an incomplete form", async () => {
          renderWithRelay({
            CommerceOrder: () => order,
            Me: () => meWithoutAddress,
          })

          userEvent.type(screen.getByPlaceholderText("Full name"), "First Last")

          await saveAndContinue()
          expect(mockCommitMutation).not.toBeCalled()
        })

        it("requires some fields", async () => {
          renderWithRelay({
            CommerceOrder: () => order,
            Me: () => meWithoutAddress,
          })

          await saveAndContinue()
          expect(
            screen.getAllByText("This field is required").length
          ).toBeGreaterThanOrEqual(1)
        })

        it("requires a phone number", async () => {
          renderWithRelay({
            CommerceOrder: () => order,
            Me: () => meWithoutAddress,
          })

          await fillAddressForm({
            name: "Erik David",
            addressLine1: "401 Broadway",
            addressLine2: "",
            city: "New York",
            region: "NY",
            postalCode: "10013",
            phoneNumber: "",
            country: "US",
          })
          await saveAndContinue()

          // TODO: form validation is triggered for collapsed form unnecessarily
          expect(screen.getAllByText("This field is required")).toHaveLength(2)
          expect(mockCommitMutation).not.toHaveBeenCalled()
        })

        it("allows a missing postal code and state/province if the selected country is not US or Canada", async () => {
          renderWithRelay({
            CommerceOrder: () => order,
            Me: () => meWithoutAddress,
          })

          await fillAddressForm({
            name: "Erik David",
            addressLine1: "401 Broadway",
            addressLine2: "",
            city: "New York",
            region: "",
            postalCode: "",
            phoneNumber: "5555937743",
            country: "AQ",
          })
          await saveAndContinue()

          expect(
            screen.queryByText("This field is required")
          ).not.toBeInTheDocument()
          expect(mockCommitMutation).toHaveBeenCalled()
        })

        it("only shows validation erros on touched inputs before submission", async () => {
          renderWithRelay({
            CommerceOrder: () => order,
            Me: () => meWithoutAddress,
          })

          const name = screen.getByPlaceholderText("Full name")
          userEvent.type(name, "First Last")
          userEvent.clear(name)

          expect(screen.getByText("This field is required")).toBeInTheDocument()
        })

        it("shows all validation erros including untouched inputs after submission", async () => {
          renderWithRelay({
            CommerceOrder: () => order,
            Me: () => meWithoutAddress,
          })

          const name = screen.getByPlaceholderText("Full name")
          userEvent.type(name, "First Last")
          userEvent.clear(name)

          await saveAndContinue()
          expect(
            screen.getAllByText("This field is required").length
          ).toBeGreaterThan(1)
        })
      })

      describe("address verification", () => {
        describe("with US enabled and international disabled", () => {
          beforeEach(() => {
            ;(useFeatureFlag as jest.Mock).mockImplementation(
              (featureName: string) => featureName === "address_verification_us"
            )
            relayEnv = createMockEnvironment()
          })

          afterEach(() => {
            relayEnv = undefined
          })

          it("triggers basic form validation before address verification", async () => {
            const { env } = renderWithRelay(
              {
                CommerceOrder: () => order,
                Me: () => meWithoutAddress,
              },
              undefined,
              relayEnv
            )

            expect(
              screen.queryByText("This field is required")
            ).not.toBeInTheDocument()

            await fillAddressForm(validAddress)
            userEvent.clear(screen.getByPlaceholderText("Street address"))

            await userEvent.click(screen.getByText("Save and Continue"))

            expect(screen.getByText("This field is required")).toBeVisible()
            expect(env.mock.getAllOperations()).toHaveLength(0)
          })

          it("triggers the flow for US address after clicking continue", async () => {
            const { env } = renderWithRelay(
              {
                CommerceOrder: () => order,
                Me: () => meWithoutAddress,
              },
              undefined,
              relayEnv
            )

            await fillAddressForm(validAddress)
            await userEvent.click(screen.getByText("Save and Continue"))

            await verifyAddressWithSuggestions(
              env,
              validAddress,
              recommendedAddress
            )

            expect(mockCommitMutation).not.toHaveBeenCalled()
          })

          it("uses recommended address", async () => {
            const { env } = renderWithRelay(
              {
                CommerceOrder: () => order,
                Me: () => meWithoutAddress,
              },
              undefined,
              relayEnv
            )

            await fillAddressForm(validAddress)
            await userEvent.click(screen.getByText("Save and Continue"))

            await verifyAddressWithSuggestions(
              env,
              validAddress,
              recommendedAddress
            )

            mockCommitMutation.mockResolvedValueOnce(
              settingOrderShipmentSuccess
            )
            // Clicking "Use This Address" on verification modal automatically
            // sets shipping on the order and proceeds to the next step.
            userEvent.click(screen.getByText("Use This Address"))
            expect(mockCommitMutation).toHaveBeenCalledTimes(1)

            let mutationArg = mockCommitMutation.mock.calls[0][0]
            expect(mutationArg.mutation.default.operation.name).toEqual(
              "SetShippingMutation"
            )
            expect(mutationArg.variables).toEqual({
              input: {
                id: "1234",
                fulfillmentType: "SHIP",
                addressVerifiedBy: "ARTSY",
                phoneNumber: validAddress.phoneNumber,
                shipping: {
                  ...recommendedAddress,
                  name: "Erik David",
                  phoneNumber: "",
                },
              },
            })
          })

          it("goes back and edits address after verification", async () => {
            const { env } = renderWithRelay(
              {
                CommerceOrder: () => order,
                Me: () => meWithoutAddress,
              },
              undefined,
              relayEnv
            )

            await fillAddressForm(validAddress)
            await userEvent.click(screen.getByText("Save and Continue"))

            await verifyAddressWithSuggestions(
              env,
              validAddress,
              recommendedAddress
            )

            // Clicking "Back to Edit" allows users to edit the address form
            // and requires clicking "Save and Continue" to proceed.
            userEvent.click(screen.getByText("Back to Edit"))
            await userEvent.click(screen.getByText("Save and Continue"))
            mockCommitMutation.mockResolvedValueOnce(
              settingOrderShipmentSuccess
            )
            expect(mockCommitMutation).toHaveBeenCalledTimes(1)

            let mutationArg = mockCommitMutation.mock.calls[0][0]
            expect(mutationArg.mutation.default.operation.name).toEqual(
              "SetShippingMutation"
            )
            expect(mutationArg.variables).toEqual({
              input: {
                id: "1234",
                fulfillmentType: "SHIP",
                addressVerifiedBy: "USER",
                phoneNumber: validAddress.phoneNumber,
                shipping: {
                  ...validAddress,
                  phoneNumber: "",
                },
              },
            })
          })

          it("does not triggers the flow for international address after clicking continue", async () => {
            const { env } = renderWithRelay(
              {
                CommerceOrder: () => order,
                Me: () => meWithoutAddress,
              },
              undefined,
              relayEnv
            )

            await fillAddressForm(validAddress)
            userEvent.selectOptions(screen.getByTestId("AddressForm_country"), [
              "TW",
            ])
            await userEvent.click(screen.getByText("Save and Continue"))

            expect(env.mock.getAllOperations()).toHaveLength(0)
          })
        })

        describe("with US disabled and international enabled", () => {
          beforeEach(() => {
            ;(useFeatureFlag as jest.Mock).mockImplementation(
              (featureName: string) =>
                featureName === "address_verification_intl"
            )
            relayEnv = createMockEnvironment()
          })

          afterEach(() => {
            relayEnv = undefined
          })

          it("does not trigger the flow for US address after clicking continue", async () => {
            const { env } = renderWithRelay(
              {
                CommerceOrder: () => order,
                Me: () => meWithoutAddress,
              },
              undefined,
              relayEnv
            )

            await fillAddressForm(validAddress)
            await userEvent.click(screen.getByText("Save and Continue"))

            expect(env.mock.getAllOperations()).toHaveLength(0)
          })

          it("triggers the flow for international address after clicking continue", async () => {
            const { env } = renderWithRelay(
              {
                CommerceOrder: () => order,
                Me: () => meWithoutAddress,
              },
              undefined,
              relayEnv
            )

            await fillAddressForm(validAddress)
            userEvent.selectOptions(screen.getByTestId("AddressForm_country"), [
              "TW",
            ])
            await userEvent.click(screen.getByText("Save and Continue"))

            const mutation = env.mock.getMostRecentOperation()
            expect(mutation.request.node.operation.name).toEqual(
              "AddressVerificationFlowQuery"
            )
            expect(mutation.request.variables).toEqual({
              address: {
                addressLine1: "401 Broadway",
                addressLine2: "",
                city: "New York",
                region: "NY",
                postalCode: "15601",
                country: "TW",
              },
            })
          })
        })
      })

      it("scrolls to top of address form when there are address form errors", async () => {
        renderWithRelay({
          CommerceOrder: () => UntouchedOfferOrder,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm({
          name: "Erik David",
          addressLine1: "401 Broadway",
          addressLine2: "",
          city: "",
          region: "",
          postalCode: "",
          phoneNumber: "8888888888",
          country: "",
        })

        await saveAndContinue()

        expect(mockJumpTo).toBeCalledWith("deliveryAddressTop", {
          behavior: "smooth",
        })
      })

      it("scrolls to top of phone number form when there are phone number errors", async () => {
        renderWithRelay({
          CommerceOrder: () => UntouchedOfferOrder,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm({
          name: "Erik David",
          addressLine1: "401 Broadway",
          addressLine2: "",
          city: "New York",
          region: "NY",
          postalCode: "10013",
          phoneNumber: "",
          country: "US",
        })

        await saveAndContinue()

        expect(mockJumpTo).toBeCalledWith("phoneNumberTop", {
          behavior: "smooth",
        })
      })

      it("scrolls to top of address form when there are both address and phone number errors", async () => {
        renderWithRelay({
          CommerceOrder: () => UntouchedOfferOrder,
          Me: () => meWithoutAddress,
        })

        await saveAndContinue()

        expect(mockJumpTo).toBeCalledWith("deliveryAddressTop", {
          behavior: "smooth",
        })
      })

      it("scrolls to top of shipping quotes when they are fetched after save and continue", async () => {
        mockCommitMutation
          .mockResolvedValueOnce(settingOrderArtaShipmentSuccess)
          .mockImplementationOnce(relayProps => {
            relayProps[1].onCompleted(saveAddressSuccess)
          })
          .mockResolvedValueOnce(selectShippingQuoteSuccess)

        renderWithRelay({
          CommerceOrder: () => UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        await saveAndContinue()

        expect(mockJumpTo).toBeCalledWith("shippingOptionsTop", {
          behavior: "smooth",
        })
      })
    })

    describe("with saved addresses", () => {
      it("does not show the new address form", async () => {
        renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithAddresses,
        })

        // TODO: need a better way to check if the form is collapsed (height 0).
        // Zero height is not considered invisible.
        // https://github.com/testing-library/jest-dom/issues/450
        expect(screen.getByPlaceholderText("Street address")).toHaveAttribute(
          "tabindex",
          "-1"
        )
      })

      it("lists the addresses and renders the add address option", async () => {
        renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithAddresses,
        })

        expect(
          screen.getByRole("radio", { name: /401 Broadway/ })
        ).toBeVisible()
        expect(screen.getByRole("radio", { name: /1 Main St/ })).toBeVisible()
        expect(
          screen.getByRole("button", { name: "Add a new address" })
        ).toBeVisible()
      })

      it("sets shipping with the first saved address and phone number when user submits the form directly", async () => {
        renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithAddresses,
        })

        await saveAndContinue()

        expect(mockCommitMutation).toHaveBeenCalledTimes(1)

        const mutationArg = mockCommitMutation.mock.calls[0][0]
        expect(mutationArg.mutation.default.operation.name).toEqual(
          "SetShippingMutation"
        )
        expect(mutationArg.variables).toEqual({
          input: {
            id: "1234",
            fulfillmentType: "SHIP",
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
        })
      })

      it("sets shipping with the selected saved address and phone number", async () => {
        renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithAddresses,
        })

        userEvent.click(screen.getByRole("radio", { name: /1 Main St/ }))
        await saveAndContinue()

        expect(mockCommitMutation).toHaveBeenCalledTimes(1)

        const mutationArg = mockCommitMutation.mock.calls[0][0]
        expect(mutationArg.mutation.default.operation.name).toEqual(
          "SetShippingMutation"
        )
        expect(mutationArg.variables).toEqual({
          input: {
            id: "1234",
            fulfillmentType: "SHIP",
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
        })
      })

      describe("address verification", () => {
        describe("with address verification enabled", () => {
          beforeEach(() => {
            ;(useFeatureFlag as jest.Mock).mockImplementation(
              (featureName: string) => featureName === "address_verification_us"
            )
            relayEnv = createMockEnvironment()
          })

          afterEach(() => {
            relayEnv = undefined
          })

          it("does not trigger the flow", async () => {
            const { env } = renderWithRelay(
              {
                CommerceOrder: () => order,
                Me: () => meWithAddresses,
              },
              undefined,
              relayEnv
            )

            await userEvent.click(screen.getByText("Save and Continue"))

            // Address verification flow is not triggered.
            expect(env.mock.getAllOperations()).toHaveLength(0)

            // It sets shipping on order directly.
            expect(mockCommitMutation).toHaveBeenCalledTimes(1)

            const mutationArg = mockCommitMutation.mock.calls[0][0]
            expect(mutationArg.mutation.default.operation.name).toEqual(
              "SetShippingMutation"
            )
          })
        })
      })

      describe("editing address", () => {
        it("opens a modal with the address prepopulated", async () => {
          mockCommitMutation.mockResolvedValueOnce(
            settingOrderArtaShipmentSuccess
          )

          renderWithRelay({
            CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
            Me: () => meWithAddresses,
          })
          await flushPromiseQueue()

          // Set shipping on load for the default address
          expect(mockCommitMutation).toHaveBeenCalledTimes(1)
          let mutationArg = mockCommitMutation.mock.calls[0][0]
          expect(mutationArg.mutation.default.operation.name).toEqual(
            "SetShippingMutation"
          )

          const selectedAddress = screen.getByRole("radio", {
            name: /401 Broadway/,
            checked: true,
          })
          await userEvent.click(within(selectedAddress).getByText("Edit"))
          await flushPromiseQueue()

          expect(screen.getByText("Edit address")).toBeVisible()
          expect(screen.getByDisplayValue("401 Broadway")).toBeInTheDocument()
          expect(screen.getByDisplayValue("Floor 25")).toBeInTheDocument()
          expect(screen.getByDisplayValue("New York")).toBeInTheDocument()
          expect(screen.getByDisplayValue("NY")).toBeInTheDocument()
          expect(screen.getByDisplayValue("10013")).toBeInTheDocument()
        })

        it("updates the address after submitting the modal form", async () => {
          mockCommitMutation.mockResolvedValueOnce(
            settingOrderArtaShipmentSuccess
          )

          const updateAddressSpy = jest
            .spyOn(updateUserAddress, "updateUserAddress")
            // @ts-ignore
            .mockImplementationOnce((_, __, ___, ____, onSuccess) => {
              onSuccess(updateAddressSuccess)
            })

          renderWithRelay({
            CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
            Me: () => meWithAddresses,
          })
          await flushPromiseQueue()

          // Set shipping on load for the default address
          expect(mockCommitMutation).toHaveBeenCalledTimes(1)
          let mutationArg = mockCommitMutation.mock.calls[0][0]
          expect(mutationArg.mutation.default.operation.name).toEqual(
            "SetShippingMutation"
          )

          const selectedAddress = screen.getByRole("radio", {
            name: /401 Broadway/,
            checked: true,
          })
          await userEvent.click(within(selectedAddress).getByText("Edit"))

          const modalTitle = screen.getByText("Edit address")
          expect(modalTitle).toBeVisible()

          // TODO: need a better way to get a specific input field from multiple forms
          const addressLine2 = screen.getAllByPlaceholderText(
            /Apt, floor, suite/
          )[0]
          userEvent.clear(addressLine2)
          userEvent.type(addressLine2, "25th fl.")
          userEvent.click(screen.getByRole("button", { name: "Save" }))
          await flushPromiseQueue()

          expect(updateAddressSpy).toHaveBeenCalledTimes(1)
          expect(updateAddressSpy).toHaveBeenCalledWith(
            expect.anything(),
            "2",
            {
              addressLine1: "401 Broadway",
              addressLine2: "25th fl.",
              addressLine3: "",
              city: "New York",
              country: "US",
              name: "Test Name",
              phoneNumber: "422-424-4242",
              postalCode: "10013",
              region: "NY",
            },
            expect.anything(),
            expect.anything(),
            expect.anything()
          )
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
            relayEnv = createMockEnvironment()
          })

          afterEach(() => {
            relayEnv = undefined
          })

          it("uses recommended address", async () => {
            const { env } = renderWithRelay(
              {
                CommerceOrder: () =>
                  UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
                Me: () => meWithoutAddress,
              },
              undefined,
              relayEnv
            )

            await fillAddressForm(validAddress)
            await saveAndContinue()

            await verifyAddressWithSuggestions(
              env,
              validAddress,
              recommendedAddress
            )

            mockCommitMutation
              .mockResolvedValueOnce(settingOrderArtaShipmentSuccess)
              .mockImplementationOnce(relayProps => {
                relayProps[1].onCompleted(saveAddressSuccess)
              })
              .mockResolvedValueOnce(selectShippingQuoteSuccess)

            // Clicking "Use This Address" on verification modal automatically
            // sets shipping on the order and fetching quotes.
            userEvent.click(screen.getByText("Use This Address"))
            await flushPromiseQueue()

            expect(mockCommitMutation).toHaveBeenCalledTimes(2)

            let mutationArg = mockCommitMutation.mock.calls[0][0]
            expect(mutationArg.mutation.default.operation.name).toEqual(
              "SetShippingMutation"
            )
            expect(mutationArg.variables).toEqual({
              input: {
                id: "2939023",
                fulfillmentType: "SHIP_ARTA",
                addressVerifiedBy: "ARTSY",
                phoneNumber: validAddress.phoneNumber,
                shipping: {
                  ...recommendedAddress,
                  name: "Erik David",
                  phoneNumber: "",
                },
              },
            })

            mutationArg = mockCommitMutation.mock.calls[1][0][1]
            expect(mutationArg.mutation.default.operation.name).toEqual(
              "CreateUserAddressMutation"
            )
            expect(mutationArg.variables).toEqual({
              input: {
                attributes: {
                  ...recommendedAddress,
                  name: "Erik David",
                  phoneNumber: "5555937743",
                },
              },
            })

            userEvent.click(screen.getByText(/^Premium/))
            await saveAndContinue()

            expect(mockCommitMutation).toHaveBeenCalledTimes(4)

            mutationArg = mockCommitMutation.mock.calls[2][0]
            expect(mutationArg.mutation.default.operation.name).toEqual(
              "SelectShippingOptionMutation"
            )
            expect(mutationArg.variables).toEqual({
              input: {
                id: "2939023",
                selectedShippingQuoteId: "1eb3ba19-643b-4101-b113-2eb4ef7e30b6",
              },
            })

            mutationArg = mockCommitMutation.mock.calls[3][0][1]
            expect(mutationArg.mutation.default.operation.name).toEqual(
              "UpdateUserAddressMutation"
            )
            expect(mutationArg.variables).toEqual({
              input: {
                userAddressID: "address-id",
                attributes: {
                  ...recommendedAddress,
                  name: "Erik David",
                  phoneNumber: "5555937743",
                },
              },
            })
          })

          it("goes back and edits address after verification", async () => {
            const { env } = renderWithRelay(
              {
                CommerceOrder: () =>
                  UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
                Me: () => meWithoutAddress,
              },
              undefined,
              relayEnv
            )

            await fillAddressForm(validAddress)
            await saveAndContinue()

            await verifyAddressWithSuggestions(
              env,
              validAddress,
              recommendedAddress
            )

            mockCommitMutation
              .mockResolvedValueOnce(settingOrderArtaShipmentSuccess)
              .mockImplementationOnce(relayProps => {
                relayProps[1].onCompleted(saveAddressSuccess)
              })
              .mockResolvedValueOnce(selectShippingQuoteSuccess)

            // Clicking "Back to Edit" allows users to edit the address form
            // and requires clicking "Save and Continue" to proceed.
            userEvent.click(screen.getByText("Back to Edit"))
            await userEvent.click(screen.getByText("Save and Continue"))
            await flushPromiseQueue()

            expect(mockCommitMutation).toHaveBeenCalledTimes(2)

            let mutationArg = mockCommitMutation.mock.calls[0][0]
            expect(mutationArg.mutation.default.operation.name).toEqual(
              "SetShippingMutation"
            )
            expect(mutationArg.variables).toEqual({
              input: {
                id: "2939023",
                fulfillmentType: "SHIP_ARTA",
                addressVerifiedBy: "USER",
                phoneNumber: validAddress.phoneNumber,
                shipping: {
                  ...validAddress,
                  phoneNumber: "",
                },
              },
            })

            mutationArg = mockCommitMutation.mock.calls[1][0][1]
            expect(mutationArg.mutation.default.operation.name).toEqual(
              "CreateUserAddressMutation"
            )
            expect(mutationArg.variables).toEqual({
              input: {
                attributes: {
                  ...validAddress,
                  phoneNumber: "5555937743",
                },
              },
            })

            userEvent.click(screen.getByText(/^Premium/))
            await saveAndContinue()

            expect(mockCommitMutation).toHaveBeenCalledTimes(4)

            mutationArg = mockCommitMutation.mock.calls[2][0]
            expect(mutationArg.mutation.default.operation.name).toEqual(
              "SelectShippingOptionMutation"
            )
            expect(mutationArg.variables).toEqual({
              input: {
                id: "2939023",
                selectedShippingQuoteId: "1eb3ba19-643b-4101-b113-2eb4ef7e30b6",
              },
            })

            mutationArg = mockCommitMutation.mock.calls[3][0][1]
            expect(mutationArg.mutation.default.operation.name).toEqual(
              "UpdateUserAddressMutation"
            )
            expect(mutationArg.variables).toEqual({
              input: {
                userAddressID: "address-id",
                attributes: {
                  ...validAddress,
                  phoneNumber: "5555937743",
                },
              },
            })
          })
        })
      })

      it("sets shipping on order, selects shipping quote, and save address on user", async () => {
        mockCommitMutation
          .mockResolvedValueOnce(settingOrderArtaShipmentSuccess)
          .mockImplementationOnce(relayProps => {
            relayProps[1].onCompleted(saveAddressSuccess)
          })
          .mockResolvedValueOnce(selectShippingQuoteSuccess)

        renderWithRelay({
          CommerceOrder: () => UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        await saveAndContinue()

        // FIXME: `getByRole` can be slow and cause test to time out.
        // https://github.com/testing-library/dom-testing-library/issues/552#issuecomment-625172052
        // expect(screen.getByRole("radio", { name: /Standard/ })).toBeVisible()
        // expect(screen.getByRole("radio", { name: /Express/ })).toBeVisible()
        // expect(screen.getByRole("radio", { name: /White Glove/ })).toBeVisible()
        // expect(screen.getByRole("radio", { name: /Rush/ })).toBeVisible()
        // expect(screen.getByRole("radio", { name: /Premium/ })).toBeVisible()
        expect(mockCommitMutation).toHaveBeenCalledTimes(2)

        let mutationArg = mockCommitMutation.mock.calls[0][0]
        expect(mutationArg.mutation.default.operation.name).toEqual(
          "SetShippingMutation"
        )
        expect(mutationArg.variables).toEqual({
          input: {
            id: "2939023",
            fulfillmentType: "SHIP_ARTA",
            phoneNumber: validAddress.phoneNumber,
            shipping: {
              ...validAddress,
              phoneNumber: "",
            },
          },
        })

        mutationArg = mockCommitMutation.mock.calls[1][0][1]
        expect(mutationArg.mutation.default.operation.name).toEqual(
          "CreateUserAddressMutation"
        )
        expect(mutationArg.variables).toEqual({
          input: {
            attributes: validAddress,
          },
        })

        userEvent.click(screen.getByText(/^Premium/))
        await saveAndContinue()

        expect(mockCommitMutation).toHaveBeenCalledTimes(4)

        mutationArg = mockCommitMutation.mock.calls[2][0]
        expect(mutationArg.mutation.default.operation.name).toEqual(
          "SelectShippingOptionMutation"
        )
        expect(mutationArg.variables).toEqual({
          input: {
            id: "2939023",
            selectedShippingQuoteId: "1eb3ba19-643b-4101-b113-2eb4ef7e30b6",
          },
        })

        // TODO: Why do we need to update address shortly after creating it?
        mutationArg = mockCommitMutation.mock.calls[3][0][1]
        expect(mutationArg.mutation.default.operation.name).toEqual(
          "UpdateUserAddressMutation"
        )
        expect(mutationArg.variables).toEqual({
          input: {
            userAddressID: "address-id",
            attributes: validAddress,
          },
        })
      })

      it("shows an error if Arta doesn't return shipping quotes", async () => {
        const settingOrderArtaShipmentSuccessWithoutQuotes = cloneDeep(
          settingOrderArtaShipmentSuccess
        ) as any
        settingOrderArtaShipmentSuccessWithoutQuotes.commerceSetShipping.orderOrError.order.lineItems.edges[0].node.shippingQuoteOptions.edges = []
        mockCommitMutation.mockResolvedValueOnce(
          settingOrderArtaShipmentSuccessWithoutQuotes
        )

        renderWithRelay({
          CommerceOrder: () => UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        await saveAndContinue()

        expect(
          screen.queryByRole("radio", { name: /Standard/ })
        ).not.toBeInTheDocument()
        // TODO: Why are there 2 error messages?
        expect(
          screen.getAllByText(
            /In order to provide a shipping quote, we need some more information from you./
          )
        ).toHaveLength(2)
      })

      it("removes saved address if save address is deselected after fetching shipping quotes", async () => {
        mockCommitMutation
          .mockResolvedValueOnce(settingOrderArtaShipmentSuccess)
          .mockImplementationOnce(relayProps => {
            relayProps[1].onCompleted(saveAddressSuccess)
          })
          .mockResolvedValueOnce(selectShippingQuoteSuccess)

        renderWithRelay({
          CommerceOrder: () => UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
          Me: () => meWithoutAddress,
        })

        await fillAddressForm(validAddress)
        await saveAndContinue()

        // FIXME: `getByRole` can be slow and cause test to time out.
        // https://github.com/testing-library/dom-testing-library/issues/552#issuecomment-625172052
        // expect(screen.getByRole("radio", { name: /Standard/ })).toBeVisible()
        // expect(screen.getByRole("radio", { name: /Express/ })).toBeVisible()
        // expect(screen.getByRole("radio", { name: /White Glove/ })).toBeVisible()
        // expect(screen.getByRole("radio", { name: /Rush/ })).toBeVisible()
        // expect(screen.getByRole("radio", { name: /Premium/ })).toBeVisible()

        expect(mockCommitMutation).toHaveBeenCalledTimes(2)

        let mutationArg = mockCommitMutation.mock.calls[0][0]
        expect(mutationArg.mutation.default.operation.name).toEqual(
          "SetShippingMutation"
        )
        expect(mutationArg.variables).toEqual({
          input: {
            id: "2939023",
            fulfillmentType: "SHIP_ARTA",
            phoneNumber: validAddress.phoneNumber,
            shipping: {
              ...validAddress,
              phoneNumber: "",
            },
          },
        })

        mutationArg = mockCommitMutation.mock.calls[1][0][1]
        expect(mutationArg.mutation.default.operation.name).toEqual(
          "CreateUserAddressMutation"
        )
        expect(mutationArg.variables).toEqual({
          input: {
            attributes: validAddress,
          },
        })

        userEvent.click(screen.getByText(/^Premium/))
        userEvent.click(screen.getByText(/^Save shipping address/))

        await saveAndContinue()

        expect(mockCommitMutation).toHaveBeenCalledTimes(4)

        mutationArg = mockCommitMutation.mock.calls[2][0]
        expect(mutationArg.mutation.default.operation.name).toEqual(
          "SelectShippingOptionMutation"
        )
        expect(mutationArg.variables).toEqual({
          input: {
            id: "2939023",
            selectedShippingQuoteId: "1eb3ba19-643b-4101-b113-2eb4ef7e30b6",
          },
        })

        mutationArg = mockCommitMutation.mock.calls[3][0][1]
        expect(mutationArg.mutation.default.operation.name).toEqual(
          "DeleteUserAddressMutation"
        )
        expect(mutationArg.variables).toEqual({
          input: {
            userAddressID: "address-id",
          },
        })
      })
    })

    describe("with saved addresses", () => {
      describe("Artsy shipping international only", () => {
        describe("with artwork located in the US", () => {
          it("sets shipping on order if the collector is in the EU", async () => {
            const meWithDefaultAddressInSpain = cloneDeep(
              meWithAddresses
            ) as any
            meWithDefaultAddressInSpain.addressConnection.edges[0].node.isDefault = true // Spain
            meWithDefaultAddressInSpain.addressConnection.edges[1].node.isDefault = false // US

            renderWithRelay({
              CommerceOrder: () =>
                UntouchedBuyOrderWithArtsyShippingInternationalFromUS,
              Me: () => meWithDefaultAddressInSpain,
            })
            await flushPromiseQueue()

            expect(mockCommitMutation).toHaveBeenCalledTimes(1)
            const mutationArg = mockCommitMutation.mock.calls[0][0]
            expect(mutationArg.mutation.default.operation.name).toEqual(
              "SetShippingMutation"
            )
            expect(mutationArg.variables).toEqual({
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
                  phoneNumber: "555-555-5555",
                  postalCode: "28001",
                  region: "",
                },
              },
            })
          })

          it("does not set shipping on order if the collector is in the US", async () => {
            renderWithRelay({
              CommerceOrder: () =>
                UntouchedBuyOrderWithArtsyShippingInternationalFromUS,
              Me: () => meWithAddresses,
            })
            await flushPromiseQueue()

            expect(mockCommitMutation).not.toHaveBeenCalled()
            expect(
              screen.queryByRole("radio", {
                name: /(^Standard|^Express|^White Glove|^Rush|^Premium)/,
              })
            ).not.toBeInTheDocument()
          })
        })

        describe("with artwork located in Germany", () => {
          it("does not set shipping on order if the collector is in the EU", async () => {
            const meWithDefaultAddressInSpain = cloneDeep(
              meWithAddresses
            ) as any
            meWithDefaultAddressInSpain.addressConnection.edges[0].node.isDefault = true // Spain
            meWithDefaultAddressInSpain.addressConnection.edges[1].node.isDefault = false // US

            renderWithRelay({
              CommerceOrder: () =>
                UntouchedBuyOrderWithArtsyShippingInternationalFromGermany,
              Me: () => meWithDefaultAddressInSpain,
            })
            await flushPromiseQueue()

            expect(mockCommitMutation).not.toHaveBeenCalled()
            expect(
              screen.queryByRole("radio", {
                name: /(^Standard|^Express|^White Glove|^Rush|^Premium)/,
              })
            ).not.toBeInTheDocument()
          })

          it("sets shipping on order if the collector is in the US", async () => {
            renderWithRelay({
              CommerceOrder: () =>
                UntouchedBuyOrderWithArtsyShippingInternationalFromGermany,
              Me: () => meWithAddresses,
            })
            await flushPromiseQueue()

            expect(mockCommitMutation).toHaveBeenCalledTimes(1)
            const mutationArg = mockCommitMutation.mock.calls[0][0]
            expect(mutationArg.mutation.default.operation.name).toEqual(
              "SetShippingMutation"
            )
            expect(mutationArg.variables).toEqual({
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
                  phoneNumber: "422-424-4242",
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
          it("sets shipping on order if the collector is in Germany", async () => {
            const meWithDefaultAddressInSpain = cloneDeep(
              meWithAddresses
            ) as any
            meWithDefaultAddressInSpain.addressConnection.edges[0].node.isDefault = true // Spain
            meWithDefaultAddressInSpain.addressConnection.edges[1].node.isDefault = false // US

            renderWithRelay({
              CommerceOrder: () =>
                UntouchedBuyOrderWithArtsyShippingDomesticFromGermany,
              Me: () => meWithDefaultAddressInSpain,
            })
            await flushPromiseQueue()

            expect(mockCommitMutation).toHaveBeenCalledTimes(1)
            const mutationArg = mockCommitMutation.mock.calls[0][0]
            expect(mutationArg.mutation.default.operation.name).toEqual(
              "SetShippingMutation"
            )
            expect(mutationArg.variables).toEqual({
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
                  phoneNumber: "555-555-5555",
                  postalCode: "28001",
                  region: "",
                },
              },
            })
          })

          it("does not set shipping on order if the collector is in the US", async () => {
            renderWithRelay({
              CommerceOrder: () =>
                UntouchedBuyOrderWithArtsyShippingDomesticFromGermany,
              Me: () => meWithAddresses,
            })
            await flushPromiseQueue()

            expect(mockCommitMutation).not.toHaveBeenCalled()
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

            renderWithRelay({
              CommerceOrder: () =>
                UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
              Me: () => meWithDefaultAddressInSpain,
            })
            await flushPromiseQueue()

            expect(mockCommitMutation).not.toHaveBeenCalled()
            expect(
              screen.queryByRole("radio", {
                name: /(^Standard|^Express|^White Glove|^Rush|^Premium)/,
              })
            ).not.toBeInTheDocument()
          })

          describe("with the collector in the US", () => {
            it("sets shipping with the default address on load", async () => {
              mockCommitMutation.mockResolvedValueOnce(
                settingOrderArtaShipmentSuccess
              )

              renderWithRelay({
                CommerceOrder: () =>
                  UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
                Me: () => meWithAddresses,
              })
              await flushPromiseQueue()

              expect(mockCommitMutation).toHaveBeenCalledTimes(1)

              const mutationArg = mockCommitMutation.mock.calls[0][0]
              expect(mutationArg.mutation.default.operation.name).toEqual(
                "SetShippingMutation"
              )
              expect(mutationArg.variables).toEqual({
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
                    phoneNumber: "422-424-4242",
                    postalCode: "10013",
                    region: "NY",
                  },
                },
              })
            })

            it("shows shipping quotes for the default address on load", async () => {
              mockCommitMutation.mockResolvedValueOnce(
                settingOrderArtaShipmentSuccess
              )

              renderWithRelay({
                CommerceOrder: () =>
                  UntouchedBuyOrderWithArtsyShippingDomesticFromUS,
                Me: () => meWithAddresses,
              })
              await flushPromiseQueue()

              expect(
                screen.getAllByRole("radio", {
                  name: /(^Standard|^Express|^White Glove|^Rush|^Premium)/,
                })
              ).toHaveLength(5)
            })

            it("sets shipping on order, shows shipping quotes and saves the pre-selected quote", async () => {
              mockCommitMutation.mockResolvedValueOnce(
                settingOrderArtaShipmentSuccess
              )

              renderWithRelay({
                // Simulate the condition with an order with saved shipping quotes
                CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
                Me: () => meWithAddresses,
              })

              await flushPromiseQueue()
              expect(screen.getByText("Save and Continue")).toBeEnabled()

              await saveAndContinue()

              expect(mockCommitMutation).toHaveBeenCalledTimes(2)

              let mutationArg = mockCommitMutation.mock.calls[0][0]
              expect(mutationArg.mutation.default.operation.name).toEqual(
                "SetShippingMutation"
              )
              expect(mutationArg.variables).toEqual({
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
                    phoneNumber: "422-424-4242",
                    postalCode: "10013",
                    region: "NY",
                  },
                },
              })

              mutationArg = mockCommitMutation.mock.calls[1][0]
              expect(mutationArg.mutation.default.operation.name).toEqual(
                "SelectShippingOptionMutation"
              )
              expect(mutationArg.variables).toEqual({
                input: {
                  id: "2939023",
                  selectedShippingQuoteId:
                    "4a8f8080-23d3-4c0e-9811-7a41a9df6933",
                },
              })
            })

            it("selects a different shipping quote and saves it", async () => {
              mockCommitMutation.mockResolvedValueOnce(
                settingOrderArtaShipmentSuccess
              )

              renderWithRelay({
                // Simulate the condition with an order with saved shipping quotes
                CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
                Me: () => meWithAddresses,
              })
              await flushPromiseQueue()

              userEvent.click(screen.getByText(/^Premium/))
              expect(screen.getByText("Save and Continue")).toBeEnabled()
              await saveAndContinue()

              expect(mockCommitMutation).toHaveBeenCalledTimes(2)

              let mutationArg = mockCommitMutation.mock.calls[0][0]
              expect(mutationArg.mutation.default.operation.name).toEqual(
                "SetShippingMutation"
              )
              expect(mutationArg.variables).toEqual({
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
                    phoneNumber: "422-424-4242",
                    postalCode: "10013",
                    region: "NY",
                  },
                },
              })

              mutationArg = mockCommitMutation.mock.calls[1][0]
              expect(mutationArg.mutation.default.operation.name).toEqual(
                "SelectShippingOptionMutation"
              )
              expect(mutationArg.variables).toEqual({
                input: {
                  id: "2939023",
                  selectedShippingQuoteId:
                    "1eb3ba19-643b-4101-b113-2eb4ef7e30b6",
                },
              })
            })

            it("keeps the submit button enabled after selecting a shipping quote", async () => {
              mockCommitMutation.mockResolvedValueOnce(
                settingOrderArtaShipmentSuccess
              )

              renderWithRelay({
                CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
                Me: () => meWithAddresses,
              })
              await flushPromiseQueue()

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
              mockCommitMutation
                .mockResolvedValueOnce(settingOrderArtaShipmentSuccess)
                .mockResolvedValueOnce(selectShippingQuoteSuccess)

              renderWithRelay({
                CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
                Me: () => meWithAddresses,
              })
              await flushPromiseQueue()
              await saveAndContinue()

              expect(mockCommitMutation).toHaveBeenCalledTimes(2)

              let mutationArg = mockCommitMutation.mock.calls[0][0]
              expect(mutationArg.mutation.default.operation.name).toEqual(
                "SetShippingMutation"
              )
              mutationArg = mockCommitMutation.mock.calls[1][0]
              expect(mutationArg.mutation.default.operation.name).toEqual(
                "SelectShippingOptionMutation"
              )
              expect(pushMock).toHaveBeenCalledWith("/orders/2939023/payment")
            })

            it("reloads shipping quotes after editing the selected address", async () => {
              relayEnv = createMockEnvironment()
              mockCommitMutation
                .mockResolvedValueOnce(settingOrderArtaShipmentSuccess)
                .mockResolvedValueOnce(settingOrderArtaShipmentSuccess)

              const updateAddressResponse = cloneDeep(
                updateAddressSuccess
              ) as any
              // Match the edited address with the selected address to trigger refetching quotes
              updateAddressResponse.updateUserAddress.userAddressOrErrors.internalID =
                "2"
              const updateAddressSpy = jest
                .spyOn(updateUserAddress, "updateUserAddress")
                // @ts-ignore
                .mockImplementationOnce((_, __, ___, ____, onSuccess) => {
                  onSuccess(updateAddressResponse)
                })

              const { env } = renderWithRelay(
                {
                  CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
                  Me: () => meWithAddresses,
                },
                undefined
              )
              await flushPromiseQueue()

              // Set shipping/fetch quotes on load for the default address
              expect(mockCommitMutation).toHaveBeenCalledTimes(1)
              let mutationArg = mockCommitMutation.mock.calls[0][0]
              expect(mutationArg.mutation.default.operation.name).toEqual(
                "SetShippingMutation"
              )

              // Edit the selected address
              const selectedAddress = screen.getByRole("radio", {
                name: /401 Broadway/,
                checked: true,
              })
              await userEvent.click(within(selectedAddress).getByText("Edit"))

              const modalTitle = screen.getByText("Edit address")
              expect(modalTitle).toBeVisible()

              // TODO: need a better way to get a specific input field from multiple forms
              const addressLine2 = screen.getAllByPlaceholderText(
                /Apt, floor, suite/
              )[0]
              userEvent.clear(addressLine2)
              userEvent.paste(addressLine2, "25th fl.")
              userEvent.click(screen.getByText("Save"))

              await flushPromiseQueue()

              expect(updateAddressSpy).toHaveBeenCalledTimes(1)
              expect(updateAddressSpy).toHaveBeenCalledWith(
                expect.anything(),
                "2",
                {
                  addressLine1: "401 Broadway",
                  addressLine2: "25th fl.",
                  addressLine3: "",
                  city: "New York",
                  country: "US",
                  name: "Test Name",
                  phoneNumber: "422-424-4242",
                  postalCode: "10013",
                  region: "NY",
                },
                expect.anything(),
                expect.anything(),
                expect.anything()
              )

              // TODO: This uses relay mock environment to mock the refetch query. Is there a better way?
              const mutation = env.mock.getMostRecentOperation()
              expect(mutation.request.node.operation.name).toEqual(
                "SavedAddressesRefetchQuery"
              )
              expect(mutation.request.variables).toEqual({})

              const updatedMe = cloneDeep(meWithAddresses) as any
              updatedMe.addressConnection.edges[1].node.addressLine2 =
                "25th fl."
              env.mock.resolveMostRecentOperation(operation => {
                return MockPayloadGenerator.generate(operation, {
                  CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
                  Me: () => updatedMe,
                })
              })

              // Wait for the second setShipping mutation to complete before clicking save and continue
              await flushPromiseQueue()
              await saveAndContinue()

              expect(mockCommitMutation).toHaveBeenCalledTimes(3)

              // Set shipping/fetch quotes again for the edited address
              mutationArg = mockCommitMutation.mock.calls[1][0]
              expect(mutationArg.mutation.default.operation.name).toEqual(
                "SetShippingMutation"
              )
              expect(mutationArg.variables).toEqual({
                input: {
                  fulfillmentType: "SHIP_ARTA",
                  id: "2939023",
                  phoneNumber: "422-424-4242",
                  shipping: expect.objectContaining({
                    addressLine1: "1 Main St",
                    addressLine2: "",
                    city: "New York",
                    country: "USA",
                    name: "Bob Ross",
                    phoneNumber: "718-000-0000",
                    postalCode: "10012",
                    region: "NY",
                  }),
                },
              })

              mutationArg = mockCommitMutation.mock.calls[2][0]
              expect(mutationArg.mutation.default.operation.name).toEqual(
                "SelectShippingOptionMutation"
              )
              expect(mutationArg.variables).toEqual({
                input: {
                  id: "2939023",
                  selectedShippingQuoteId:
                    "4a8f8080-23d3-4c0e-9811-7a41a9df6933",
                },
              })
            })

            it("does not reload shipping quotes after editing a non-selected address", async () => {
              relayEnv = createMockEnvironment()
              mockCommitMutation
                .mockResolvedValueOnce(settingOrderArtaShipmentSuccess)
                .mockResolvedValueOnce(settingOrderArtaShipmentSuccess)

              const updateAddressResponse = cloneDeep(
                updateAddressSuccess
              ) as any
              // Match the edited address with the selected address to trigger refetching quotes
              updateAddressResponse.updateUserAddress.userAddressOrErrors.internalID =
                "1"
              const updateAddressSpy = jest
                .spyOn(updateUserAddress, "updateUserAddress")
                // @ts-ignore
                .mockImplementationOnce((_, __, ___, ____, onSuccess) => {
                  onSuccess(updateAddressResponse)
                })

              const { env } = renderWithRelay(
                {
                  CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
                  Me: () => meWithAddresses,
                },
                undefined
              )
              await flushPromiseQueue()

              // Set shipping/fetch quotes on load for the default address
              expect(mockCommitMutation).toHaveBeenCalledTimes(1)
              let mutationArg = mockCommitMutation.mock.calls[0][0]
              expect(mutationArg.mutation.default.operation.name).toEqual(
                "SetShippingMutation"
              )

              // Edit the address that's not selected
              const nonSelectedAddress = screen.getByRole("radio", {
                name: /1 Main St/,
                checked: false,
              })
              await userEvent.click(
                within(nonSelectedAddress).getByText("Edit")
              )

              const modalTitle = screen.getByText("Edit address")
              expect(modalTitle).toBeVisible()

              // TODO: need a better way to get a specific input field from multiple forms
              const addressLine2 = screen.getAllByPlaceholderText(
                /Apt, floor, suite/
              )[0]
              userEvent.clear(addressLine2)
              userEvent.paste(addressLine2, "25th fl.")
              userEvent.click(screen.getByText("Save"))

              await flushPromiseQueue()

              expect(updateAddressSpy).toHaveBeenCalledTimes(1)
              expect(updateAddressSpy).toHaveBeenCalledWith(
                expect.anything(),
                "1",
                {
                  addressLine1: "1 Main St",
                  addressLine2: "25th fl.",
                  addressLine3: "",
                  city: "Madrid",
                  country: "ES",
                  name: "Test Name",
                  phoneNumber: "555-555-5555",
                  postalCode: "28001",
                  region: "",
                },
                expect.anything(),
                expect.anything(),
                expect.anything()
              )

              // TODO: This uses relay mock environment to mock the refetch query. Is there a better way?
              const mutation = env.mock.getMostRecentOperation()
              expect(mutation.request.node.operation.name).toEqual(
                "SavedAddressesRefetchQuery"
              )
              expect(mutation.request.variables).toEqual({})

              const updatedMe = cloneDeep(meWithAddresses) as any
              updatedMe.addressConnection.edges[1].node.addressLine2 =
                "25th fl."
              env.mock.resolveMostRecentOperation(operation => {
                return MockPayloadGenerator.generate(operation, {
                  CommerceOrder: () => UntouchedBuyOrderWithShippingQuotes,
                  Me: () => updatedMe,
                })
              })

              // Wait for the second setShipping mutation to complete before clicking save and continue
              await flushPromiseQueue()
              await saveAndContinue()

              expect(mockCommitMutation).toHaveBeenCalledTimes(2)

              mutationArg = mockCommitMutation.mock.calls[1][0]
              expect(mutationArg.mutation.default.operation.name).toEqual(
                "SelectShippingOptionMutation"
              )
              expect(mutationArg.variables).toEqual({
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

      userEvent.click(screen.getByRole("radio", { name: /Arrange for pickup/ }))
      const phoneNumber = screen.getAllByPlaceholderText(
        "Add phone number including country code"
      )[1]
      // TODO: need a better way to check the input is displayed/expanded (height > 0)
      expect(phoneNumber).toHaveAttribute("tabindex", "0")
      expect(phoneNumber).toHaveValue("")
    })

    it("sets pickup on order", async () => {
      mockCommitMutation.mockResolvedValueOnce(settingOrderShipmentSuccess)
      renderWithRelay({
        CommerceOrder: () => order,
        Me: () => meWithoutAddress,
      })

      userEvent.click(screen.getByRole("radio", { name: /Arrange for pickup/ }))
      userEvent.type(
        screen.getAllByPlaceholderText(
          "Add phone number including country code"
        )[0],
        "2813308004"
      )
      await saveAndContinue()

      expect(mockCommitMutation).toHaveBeenCalledTimes(1)

      let mutationArg = mockCommitMutation.mock.calls[0][0]
      expect(mutationArg.mutation.default.operation.name).toEqual(
        "SetShippingMutation"
      )
      expect(mutationArg.variables).toEqual({
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
      })
    })

    it("disables submission without a phone number", async () => {
      renderWithRelay({
        CommerceOrder: () => order,
        Me: () => meWithoutAddress,
      })

      userEvent.click(screen.getByRole("radio", { name: /Arrange for pickup/ }))
      expect(
        screen.getByRole("button", {
          name: "Save and Continue",
        }) as HTMLInputElement
      ).toBeDisabled()
    })
  })
})
