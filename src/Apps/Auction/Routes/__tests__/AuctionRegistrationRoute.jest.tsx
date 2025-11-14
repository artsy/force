import { screen, waitFor } from "@testing-library/react"
import { useAuctionTracking } from "Apps/Auction/Hooks/useAuctionTracking"
import { useCreateTokenAndSubmit } from "Apps/Auction/Hooks/useCreateTokenAndSubmit"
import { AuctionRegistrationRouteFragmentContainer } from "Apps/Auction/Routes/AuctionRegistrationRoute"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useRouter } from "System/Hooks/useRouter"
import type { AuctionRegistrationRouteRTLTestQuery } from "__generated__/AuctionRegistrationRouteRTLTestQuery.graphql"
import { Formik } from "formik"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("Apps/Auction/Hooks/useCreateTokenAndSubmit")
jest.mock("Apps/Auction/Hooks/useAuctionTracking")
jest.mock("System/Hooks/useRouter")

jest.mock("Components/CreditCardInput/CreditCardInputProvider", () => ({
  CreditCardInputProvider: ({ children }) => children,
}))

jest.mock("Apps/Auction/Components/Form/ErrorStatus", () => ({
  ErrorStatus: () => null,
}))

jest.mock("Apps/Auction/Components/Form/AddressFormWithCreditCard", () => ({
  AddressFormWithCreditCard: () => null,
}))

jest.mock("Apps/Auction/Components/Form/ConditionsOfSaleCheckbox", () => ({
  ConditionsOfSaleCheckbox: () => null,
}))

jest.mock("Apps/Auction/Components/Form/IdentityVerificationWarning", () => ({
  IdentityVerificationWarning: () => null,
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
}))

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  Form: ({ children }) => children,
  Formik: jest.fn(),
}))

describe("AuctionRegistrationRoute", () => {
  const { renderWithRelay } =
    setupTestWrapperTL<AuctionRegistrationRouteRTLTestQuery>({
      Component: (props: any) => {
        return <AuctionRegistrationRouteFragmentContainer {...props} />
      },
      query: graphql`
        query AuctionRegistrationRouteRTLTestQuery @relay_test_operation {
          me {
            ...AuctionRegistrationRoute_me
          }
          sale(id: "foo") {
            ...AuctionRegistrationRoute_sale
          }
        }
      `,
    })

  const mockUseAuctionTracking = useAuctionTracking as jest.Mock
  const mockUseRouter = useRouter as jest.Mock
  const mockFormik = Formik as jest.Mock
  const mockUseCreateTokenAndSubmit = useCreateTokenAndSubmit as jest.Mock

  const values = {}
  const helpers = {
    setSubmitting: jest.fn(),
    setError: jest.fn(),
  }

  const defaultFormikProps = {
    touched: {},
    isSubmitting: false,
    isValid: true,
  }

  beforeAll(() => {
    mockUseAuctionTracking.mockImplementation(() => ({
      tracking: {
        registrationPageView: jest.fn(),
      },
    }))

    mockUseRouter.mockImplementation(() => ({
      router: {
        replace: jest.fn(),
      },
    }))

    mockUseCreateTokenAndSubmit.mockImplementation(() => ({
      createToken: jest.fn(),
    }))

    // Hack to get around mocking Formik
    ;(mockFormik as React.FC<React.PropsWithChildren<unknown>>).displayName =
      "Formik"
    mockFormik.mockImplementation(({ children }) => {
      return children(defaultFormikProps)
    })
  })

  it("redirects to sale home if condition met", async () => {
    const spy = jest.fn()

    mockUseRouter.mockImplementation(() => ({
      router: {
        replace: spy,
      },
    }))

    renderWithRelay({
      Sale: () => ({
        slug: "sale-slug",
        bidder: {
          qualifiedForBidding: true,
        },
      }),
    })

    await flushPromiseQueue()
    expect(spy).toHaveBeenCalledWith("/auction/sale-slug")
  })

  it("redirects to /confirm-registration if credit card on file", async () => {
    const spy = jest.fn()

    mockUseRouter.mockImplementation(() => ({
      router: {
        replace: spy,
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

    await flushPromiseQueue()
    expect(spy).toHaveBeenCalledWith("/auction/sale-slug/confirm-registration")
  })

  it("tracks confirmation page view", async () => {
    const spy = jest.fn()

    mockUseAuctionTracking.mockImplementation(() => ({
      tracking: {
        registrationPageView: spy,
      },
    }))

    renderWithRelay({
      Sale: () => ({
        bidder: {
          qualifiedForBidding: false,
        },
        isClosed: false,
        isLiveOpen: false,
      }),
    })

    await flushPromiseQueue()
    expect(spy).toHaveBeenCalled()
  })

  it("has the correct ModalDialog title", async () => {
    renderWithRelay()

    await waitFor(() => {
      expect(screen.getByText("Register to Bid on Artsy")).toBeInTheDocument()
    })
  })

  it("closes the modal by redirecting to sale home", async () => {
    const spy = jest.fn()

    mockUseRouter.mockImplementation(() => ({
      router: {
        push: spy,
      },
    }))

    renderWithRelay({
      Sale: () => ({
        slug: "sale-slug",
      }),
    })

    await waitFor(() => {
      expect(screen.getByText("Close")).toBeInTheDocument()
    })

    const closeButton = screen.getByText("Close")
    closeButton.click()

    expect(spy).toHaveBeenCalledWith("/auction/sale-slug")
  })

  it("shows identity verification notification", async () => {
    mockFormik.mockImplementation(({ children }) => {
      return (
        <>
          <div>IdentityVerificationWarning</div>
          {children(defaultFormikProps)}
        </>
      )
    })

    renderWithRelay({
      Sale: () => ({
        requireIdentityVerification: true,
        bidder: {
          qualifiedForBidding: false,
        },
      }),
      Me: () => ({
        isIdentityVerified: false,
        hasQualifiedCreditCards: false,
      }),
    })

    await waitFor(() => {
      expect(
        screen.getByText("IdentityVerificationWarning"),
      ).toBeInTheDocument()
    })
  })

  it("hides identity verification notification", async () => {
    mockFormik.mockImplementation(({ children }) => {
      return children(defaultFormikProps)
    })

    renderWithRelay({
      Sale: () => ({
        requireIdentityVerification: false,
      }),
      Me: () => ({
        hasQualifiedCreditCards: false,
      }),
    })

    await waitFor(() => {
      expect(
        screen.queryByText("IdentityVerificationWarning"),
      ).not.toBeInTheDocument()
    })
  })

  it("renders correct components", async () => {
    mockFormik.mockImplementation(({ children }) => {
      return (
        <>
          <div>AddressFormWithCreditCard</div>
          <div>IdentityVerificationWarning</div>
          <button type="submit">Register</button>
          {children(defaultFormikProps)}
        </>
      )
    })

    renderWithRelay({
      Sale: () => ({
        requireIdentityVerification: true,
      }),
    })

    await waitFor(() => {
      expect(screen.getAllByText("Register")).toHaveLength(2)
      expect(screen.getByText("AddressFormWithCreditCard")).toBeInTheDocument()
      expect(
        screen.getByText("IdentityVerificationWarning"),
      ).toBeInTheDocument()
    })
  })

  describe("#handleSubmit", () => {
    it("creates a bidder on submit and tracks registration", async () => {
      const createTokenSpy = jest.fn()
      let formikOnSubmit: jest.Mock = jest.fn()

      mockUseCreateTokenAndSubmit.mockImplementation(() => ({
        createToken: createTokenSpy,
      }))

      mockUseAuctionTracking.mockImplementation(() => ({
        tracking: {
          registrationPageView: jest.fn(),
        },
      }))

      mockFormik.mockImplementation(({ onSubmit, children }) => {
        formikOnSubmit = onSubmit
        return children(defaultFormikProps)
      })

      renderWithRelay({
        Sale: () => ({
          slug: "sale-slug",
          internalID: "saleInternalID",
        }),
      })

      await flushPromiseQueue()

      // Call the onSubmit handler captured from Formik
      await formikOnSubmit(values, helpers)

      expect(createTokenSpy).toHaveBeenCalledWith(values, helpers)
    })
  })
})
