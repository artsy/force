import { cloneDeep } from "lodash"
import { setupTestWrapperTL } from "DevTools/setupTestWrapper"
import { MockBoot } from "DevTools/MockBoot"
import { ShippingFragmentContainer } from "Apps/Order/Routes/Shipping"
import { graphql } from "react-relay"
import { UntouchedBuyOrder } from "Apps/__tests__/Fixtures/Order"
import { settingOrderShipmentSuccess } from "Apps/Order/Routes/__fixtures__/MutationResults/setOrderShipping"
import { ShippingTestQuery$rawResponse } from "__generated__/ShippingTestQuery.graphql"
import { screen } from "@testing-library/react"
import { useTracking } from "react-tracking"
import { useFeatureFlag } from "System/useFeatureFlag"
import {
  fillAddressFormTL,
  validAddress,
} from "Components/__tests__/Utils/addressForm"
import userEvent from "@testing-library/user-event"

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

const order: ShippingTestQuery$rawResponse["order"] = {
  ...UntouchedBuyOrder,
  internalID: "1234",
  id: "1234",
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
    pageInfo: {
      startCursor: "aaa",
      endCursor: "bbb",
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
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

  const { renderWithRelay } = setupTestWrapperTL({
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

  describe("with partner shipping", () => {
    describe("with no saved address", () => {
      it("shows an active offer stepper if it's an offer order", async () => {})

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

        expect(screen.getByRole("combobox")).toHaveValue("US")
        expect(screen.getByRole("combobox")).toBeDisabled()
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

        expect(screen.getByRole("combobox")).toHaveValue("IT")
        expect(screen.getByRole("combobox")).toBeEnabled()
      })

      it("sets shipping on order and saves address on user", async () => {
        mockCommitMutation.mockResolvedValueOnce(settingOrderShipmentSuccess)
        renderWithRelay({
          CommerceOrder: () => order,
          Me: () => meWithoutAddress,
        })

        fillAddressFormTL(validAddress)
        await userEvent.click(
          screen.getByRole("button", { name: "Save and Continue" })
        )

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

      it("sets shipping on order but does not save address if save address is not checked", async () => {})

      it("routes to payment screen after mutation completes", async () => {})

      it("shows the button spinner while loading the mutation", async () => {})

      it("shows an error when there is an error from the server", async () => {})

      it("shows an error when there is a network error", async () => {})

      it("shows an error when there is a missing_country error from the server", async () => {})

      it("shows an error when there is a missing_region error from the server", async () => {})

      it("pre-populates address form for order with already persisted shipping info", async () => {})

      it("resets shipping for order with already persisted shipping info", async () => {})

      describe("form validations", () => {
        it("does not submit an empty form", async () => {})

        it("does not submit an incomplete form", async () => {})

        it("requires some fields", async () => {})

        it("requires a phone number", async () => {})

        it("allows a missing postal code if the selected country is not US or Canada", async () => {})

        it("allows a missing state/province if the selected country is not US or Canada", async () => {})

        it("only shows validation erros on touched inputs before submission", async () => {})

        it("shows all validation erros including untouched inputs after submission", async () => {})
      })

      describe("address verification", () => {
        describe("with US enabled and international disabled", () => {
          it("triggers the flow for US address after clicking continue", async () => {})

          it("does not triggers the flow for international address after clicking continue", async () => {})
        })

        describe("with US disabled and international enabled", () => {
          it("does not triggers tthe flow for US address after clicking continue", async () => {})

          it("triggers the flow for international address after clicking continue", async () => {})
        })

        it("triggers basic form validation before address verification", async () => {})
      })
    })

    describe("with saved addresses", () => {
      it("does not show the new address form", async () => {})

      it("lists the addresses and renders the add address option", async () => {})

      it("sets shipping with the first saved address and phone number when user submits the form directly", async () => {})

      it("sets shipping with the selected saved address and phone number", async () => {})

      describe("address verification", () => {
        describe("with address verification enabled", () => {
          it("does not trigger the flow", async () => {})
        })
      })

      describe("editing address", () => {
        it("opens a modal with the address prepopulated", async () => {})

        it("updates the address after submitting the modal form", async () => {})
      })
    })
  })

  describe("with Artsy shipping", () => {
    describe("with no saved address", () => {
      it("sets shipping on order, selects shipping quote, and save address on user", async () => {})

      it("shows an error if Arta doesn't return shipping quotes", async () => {})

      it("saves address only once", async () => {})

      it("removes previously saved address if save address is not selected", async () => {})
    })

    describe("with saved addresses", () => {
      describe("Artsy shipping international", () => {
        describe("with artwork located in the US", () => {
          it("sets shipping on order if the collector is in the EU", async () => {})

          it("does not set shipping on order if the collector is in the US", async () => {})
        })

        describe("with artwork located in Germany", () => {
          it("does not set shipping on order if the collector is in the EU", async () => {})

          it("sets shipping on order if the collector is in the US", async () => {})
        })
      })

      describe("Artsy shipping domestic", () => {
        describe("with artwork located in Germany", () => {
          it("sets shipping on order if the collector is in Germany", async () => {})

          it("does not set shipping on order if the collector is in the US", async () => {})
        })

        describe("with artwork located in the US", () => {
          it("does not show shipping quote if the collector is in the EU", async () => {})

          describe("with the collector in the US", () => {
            it("sets shipping", async () => {})

            it("shows shipping quotes after committing set shipping mutation", async () => {})

            it("selects the first quote and enables the submit button", async () => {})

            it("keeps the submit button enabled after selecting a shipping quote", async () => {})

            it("commits selectShippingOption mutation twice with correct input", async () => {})

            it("routes to payment screen after selectShippingOption mutation completes", async () => {})

            it("reloads shipping quotes after editing the selected address", async () => {})

            it("does not reload shipping quotes after editing a non-selected address", async () => {})
          })
        })
      })
    })
  })

  describe("with pickup", () => {
    it("shows an empty phone number input", async () => {})

    it("sets pickup on order", async () => {})

    it("does not submit an incomplete form", async () => {})
  })
})
