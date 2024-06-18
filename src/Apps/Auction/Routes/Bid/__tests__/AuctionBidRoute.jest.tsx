import { graphql } from "react-relay"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { AuctionBidRouteFragmentContainer } from "Apps/Auction/Routes/Bid/AuctionBidRoute"
import { AuctionBidRouteTestQuery } from "__generated__/AuctionBidRouteTestQuery.graphql"
import { useAuctionTracking } from "Apps/Auction/Hooks/useAuctionTracking"
import { useRouter } from "System/Hooks/useRouter"
import { useSubmitBid } from "Apps/Auction/Routes/Bid/useSubmitBid"
import { Formik } from "formik"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"

jest.unmock("react-relay")

jest.mock("Apps/Auction/Hooks/useAuctionTracking")
jest.mock("System/Hooks/useRouter")
jest.mock("Apps/Auction/Routes/Bid/useSubmitBid", () => ({
  useSubmitBid: jest.fn(),
}))

jest.mock("Components/CreditCardInput/CreditCardInputProvider", () => ({
  CreditCardInputProvider: ({ children }) => children,
}))

jest.mock("Apps/Auction/Components/Form/ConditionsOfSaleCheckbox", () => ({
  ConditionsOfSaleCheckbox: () => null,
}))

jest.mock("Apps/Auction/Routes/Bid/Components/PricingTransparency", () => ({
  PricingTransparencyQueryRenderer: () => null,
}))

jest.mock("Apps/Auction/Components/Form/AddressFormWithCreditCard", () => ({
  AddressFormWithCreditCard: () => null,
}))

jest.mock("Apps/Auction/Components/Form/ErrorStatus", () => ({
  ErrorStatus: () => null,
}))

jest.mock("Apps/Auction/Routes/Bid/Components/AuctionLotInfo", () => ({
  AuctionLotInfoFragmentContainer: () => null,
}))

jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  ModalDialog: ({ children }) => children,
  useDidMount: () => true,
}))

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  Form: ({ children }) => children,
  Formik: jest.fn(),
}))

describe("AuctionBidRoute", () => {
  const mockUseAuctionTracking = useAuctionTracking as jest.Mock
  const mockUseRouter = useRouter as jest.Mock
  const mockUseSubmitBid = useSubmitBid as jest.Mock
  const mockFormik = Formik as jest.Mock

  const { getWrapper } = setupTestWrapper<AuctionBidRouteTestQuery>({
    Component: (props: any) => {
      return (
        <AuctionBidRouteFragmentContainer
          {...props}
          requiresPaymentInformation
          requiresCheckbox
        />
      )
    },
    query: graphql`
      query AuctionBidRouteTestQuery @relay_test_operation {
        artwork(id: "foo") {
          ...AuctionBidRoute_artwork
        }
        me {
          ...AuctionBidRoute_me
        }
        sale(id: "foo") {
          ...AuctionBidRoute_sale
        }
      }
    `,
  })

  const values = {}
  const helpers = {}

  const defaultFormikProps = {
    values,
    touched: {},
    errors: {},
    isSubmitting: false,
    isValid: true,
    setFieldError: jest.fn(),
    setFieldValue: jest.fn(),
    setFieldTouched: jest.fn(),
  }

  beforeAll(() => {
    mockUseAuctionTracking.mockImplementation(() => ({
      tracking: {
        bidPageView: jest.fn(),
      },
    }))

    mockUseRouter.mockImplementation(() => ({
      match: {
        location: {
          query: {
            bid: "1000",
          },
        },
        params: {
          foo: "bar",
        },
      },
    }))

    mockUseSubmitBid.mockImplementation(() => ({
      submitBid: jest.fn(),
    }))

    // Hack to get around mocking Formik
    ;(mockFormik as React.FC).displayName = "Formik"
    mockFormik.mockImplementation(({ children }) => {
      return children(defaultFormikProps)
    })
  })

  it("has the correct ModalDialog title", () => {
    const { wrapper } = getWrapper({
      Sale: () => ({
        name: "Sale Name",
      }),
      Me: () => ({
        hasQualifiedCreditCards: true,
      }),
    })

    expect((wrapper.find("ModalDialog").props() as any).title).toEqual(
      "Confirm Your Bid"
    )
  })

  it("closes the modal by redirecting to sale home", () => {
    const spy = jest.fn()

    mockUseRouter.mockImplementation(() => ({
      match: {
        params: {
          foo: "bar",
        },
      },
      router: {
        push: spy,
      },
    }))

    const { wrapper } = getWrapper({
      Sale: () => ({
        slug: "sale-slug",
      }),
      Me: () => ({
        hasQualifiedCreditCards: true,
      }),
    })

    ;(wrapper.find("ModalDialog").props() as any).onClose()
    expect(spy).toHaveBeenCalledWith("/auction/sale-slug")
  })

  it("renders correct components", () => {
    const { wrapper } = getWrapper({
      Sale: () => ({
        bidder: null,
      }),
    })

    expect(wrapper.find("AuctionLotInfoFragmentContainer")).toHaveLength(1)
    expect(wrapper.text()).toContain("Set Your Max Bid")
    expect(wrapper.find("Select")).toHaveLength(1)
    expect(wrapper.find("PricingTransparencyQueryRenderer")).toHaveLength(1)
    expect(wrapper.find("AddressFormWithCreditCard")).toHaveLength(1)
    expect(wrapper.find("ConditionsOfSaleCheckbox")).toHaveLength(1)
    expect(wrapper.find("Button")).toHaveLength(1)
    expect(wrapper.find("Button").text()).toContain("Confirm Bid")
    expect(wrapper.find("ErrorStatus")).toHaveLength(1)
  })

  it("doesn't ask for credit card info if user has one on file", () => {
    const { wrapper } = getWrapper({
      Sale: () => ({
        bidder: null,
      }),
      Me: () => ({
        hasQualifiedCreditCards: true,
      }),
    })

    expect(wrapper.find("AddressFormWithCreditCard")).toHaveLength(0)
    expect(wrapper.find("ConditionsOfSaleCheckbox")).toHaveLength(1)
  })

  it("submits bid", async () => {
    const spy = jest.fn()

    mockUseSubmitBid.mockImplementation(() => ({
      submitBid: spy,
    }))

    const { wrapper } = getWrapper()
    ;(wrapper.find("Formik").props() as any).onSubmit(values, helpers)

    expect(spy).toHaveBeenCalledWith(values, helpers)
  })

  it("tracks bid page view on load", async () => {
    const spy = jest.fn()

    mockUseAuctionTracking.mockImplementation(() => ({
      tracking: {
        bidPageView: spy,
      },
    }))

    getWrapper()
    await flushPromiseQueue()
    expect(spy).toHaveBeenCalled()
  })

  it("sets formik fields on Select select and tracks click", () => {
    const spy = jest.fn()

    mockUseAuctionTracking.mockImplementation(() => ({
      tracking: {
        maxBidSelected: spy,
      },
    }))

    const { wrapper } = getWrapper()
    ;(wrapper.find("Select").props() as any).onSelect("1000")

    expect(spy).toHaveBeenCalledWith({
      bidderID: "<Bidder-mock-id-6>",
      maxBid: "1000",
    })

    expect(defaultFormikProps.setFieldError).toHaveBeenCalledWith(
      "selectedBid",
      undefined
    )
    expect(defaultFormikProps.setFieldValue).toHaveBeenCalledWith(
      "selectedBid",
      "1000"
    )
    expect(defaultFormikProps.setFieldTouched).toHaveBeenCalledWith(
      "selectedBid"
    )
  })
})
