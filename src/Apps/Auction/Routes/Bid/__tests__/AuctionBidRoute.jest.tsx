import { screen, waitFor } from "@testing-library/react"
import { useAuctionTracking } from "Apps/Auction/Hooks/useAuctionTracking"
import { AuctionBidRouteFragmentContainer } from "Apps/Auction/Routes/Bid/AuctionBidRoute"
import { useSubmitBid } from "Apps/Auction/Routes/Bid/useSubmitBid"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useRouter } from "System/Hooks/useRouter"
import type { AuctionBidRouteRTLTestQuery } from "__generated__/AuctionBidRouteRTLTestQuery.graphql"
import { Formik } from "formik"
import { graphql } from "react-relay"

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
  ConditionsOfSaleCheckbox: () => <div>ConditionsOfSaleCheckbox</div>,
}))

jest.mock("Apps/Auction/Routes/Bid/Components/PricingTransparency", () => ({
  PricingTransparencyQueryRenderer: () => (
    <div>PricingTransparencyQueryRenderer</div>
  ),
}))

jest.mock("Apps/Auction/Components/Form/AddressFormWithCreditCard", () => ({
  AddressFormWithCreditCard: () => <div>AddressFormWithCreditCard</div>,
}))

jest.mock("Apps/Auction/Components/Form/ErrorStatus", () => ({
  ErrorStatus: () => <div>ErrorStatus</div>,
}))

jest.mock("Apps/Auction/Routes/Bid/Components/AuctionLotInfo", () => ({
  AuctionLotInfoFragmentContainer: () => (
    <div>AuctionLotInfoFragmentContainer</div>
  ),
}))

jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  ModalDialog: ({ children, title, onClose }) => (
    <div>
      <div>{title}</div>
      <button onClick={onClose}>Close</button>
      {children}
    </div>
  ),
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

  const { renderWithRelay } = setupTestWrapperTL<AuctionBidRouteRTLTestQuery>({
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
      query AuctionBidRouteRTLTestQuery @relay_test_operation {
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
    ;(mockFormik as React.FC<React.PropsWithChildren<unknown>>).displayName =
      "Formik"
    mockFormik.mockImplementation(({ children }) => {
      return children(defaultFormikProps)
    })
  })

  it("has the correct ModalDialog title", async () => {
    renderWithRelay({
      Sale: () => ({
        name: "Sale Name",
      }),
      Me: () => ({
        hasQualifiedCreditCards: true,
      }),
    })

    await waitFor(() => {
      expect(screen.getByText("Confirm Your Bid")).toBeInTheDocument()
    })
  })

  it("closes the modal by redirecting to sale home", async () => {
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

    renderWithRelay({
      Sale: () => ({
        slug: "sale-slug",
      }),
      Me: () => ({
        hasQualifiedCreditCards: true,
      }),
    })

    await waitFor(() => {
      expect(screen.getByText("Close")).toBeInTheDocument()
    })

    const closeButton = screen.getByText("Close")
    closeButton.click()

    expect(spy).toHaveBeenCalledWith("/auction/sale-slug")
  })

  it("renders correct components", async () => {
    mockFormik.mockImplementation(({ children }) => {
      return (
        <>
          <div>Set Your Max Bid</div>
          <select data-testid="select">
            <option>Select bid</option>
          </select>
          <button type="submit">Confirm Bid</button>
          {children(defaultFormikProps)}
        </>
      )
    })

    renderWithRelay({
      Sale: () => ({
        bidder: null,
      }),
    })

    await waitFor(() => {
      expect(
        screen.getByText("AuctionLotInfoFragmentContainer"),
      ).toBeInTheDocument()
      expect(screen.getByText("Set Your Max Bid")).toBeInTheDocument()
      expect(screen.getByTestId("select")).toBeInTheDocument()
      expect(
        screen.getByText("PricingTransparencyQueryRenderer"),
      ).toBeInTheDocument()
      expect(screen.getByText("AddressFormWithCreditCard")).toBeInTheDocument()
      expect(screen.getByText("ConditionsOfSaleCheckbox")).toBeInTheDocument()
      expect(screen.getByText("Confirm Bid")).toBeInTheDocument()
      expect(screen.getByText("ErrorStatus")).toBeInTheDocument()
    })
  })

  it("doesn't ask for credit card info if user has one on file", async () => {
    mockFormik.mockImplementation(({ children }) => {
      return children(defaultFormikProps)
    })

    renderWithRelay({
      Sale: () => ({
        bidder: null,
      }),
      Me: () => ({
        hasQualifiedCreditCards: true,
      }),
    })

    await waitFor(() => {
      expect(
        screen.queryByText("AddressFormWithCreditCard"),
      ).not.toBeInTheDocument()
      expect(screen.getByText("ConditionsOfSaleCheckbox")).toBeInTheDocument()
    })
  })

  it("submits bid", async () => {
    const spy = jest.fn()
    let formikOnSubmit: jest.Mock

    mockUseSubmitBid.mockImplementation(() => ({
      submitBid: spy,
    }))

    mockFormik.mockImplementation(({ onSubmit, children }) => {
      formikOnSubmit = onSubmit
      return children(defaultFormikProps)
    })

    renderWithRelay()

    await flushPromiseQueue()

    // Call the onSubmit handler captured from Formik
    await formikOnSubmit(values, helpers)

    expect(spy).toHaveBeenCalledWith(values, helpers)
  })

  it("tracks bid page view on load", async () => {
    const spy = jest.fn()

    mockUseAuctionTracking.mockImplementation(() => ({
      tracking: {
        bidPageView: spy,
      },
    }))

    renderWithRelay()
    await flushPromiseQueue()
    expect(spy).toHaveBeenCalled()
  })

  it("sets formik fields on Select select and tracks click", async () => {
    const spy = jest.fn()
    let selectOnSelect: jest.Mock

    mockUseAuctionTracking.mockImplementation(() => ({
      tracking: {
        maxBidSelected: spy,
      },
    }))

    mockFormik.mockImplementation(({ children }) => {
      return (
        <>
          <div>
            <button
              data-testid="select-trigger"
              onClick={() => selectOnSelect && selectOnSelect("1000")}
            >
              Select bid
            </button>
          </div>
          {children({
            ...defaultFormikProps,
            setFieldError: jest.fn(),
            setFieldValue: jest.fn(),
            setFieldTouched: jest.fn(),
          })}
        </>
      )
    })

    // Mock the Select component that uses onSelect
    jest.mock("@artsy/palette", () => ({
      ...jest.requireActual("@artsy/palette"),
      Select: ({ onSelect }) => {
        selectOnSelect = onSelect
        return (
          <button data-testid="select-trigger" onClick={() => onSelect("1000")}>
            Select bid
          </button>
        )
      },
    }))

    renderWithRelay()

    await waitFor(() => {
      expect(screen.getByTestId("select-trigger")).toBeInTheDocument()
    })

    // Simulate select
    const selectButton = screen.getByTestId("select-trigger")
    selectButton.click()

    expect(spy).toHaveBeenCalledWith({
      bidderID: "<Bidder-mock-id-6>",
      maxBid: "1000",
    })

    expect(defaultFormikProps.setFieldError).toHaveBeenCalledWith(
      "selectedBid",
      undefined,
    )
    expect(defaultFormikProps.setFieldValue).toHaveBeenCalledWith(
      "selectedBid",
      "1000",
    )
    expect(defaultFormikProps.setFieldTouched).toHaveBeenCalledWith(
      "selectedBid",
    )
  })
})
