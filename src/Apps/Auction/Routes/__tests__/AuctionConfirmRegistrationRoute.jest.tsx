import { useAuctionTracking } from "Apps/Auction/Hooks/useAuctionTracking"
import { useCreateBidder } from "Apps/Auction/Queries/useCreateBidder"
import { AuctionConfirmRegistrationRouteFragmentContainer } from "Apps/Auction/Routes/AuctionConfirmRegistrationRoute"
import { redirectToSaleHome } from "Apps/Auction/Routes/AuctionRegistrationRoute"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useRouter } from "System/Hooks/useRouter"
import { screen } from "@testing-library/react"
import type { AuctionConfirmRegistrationRouteQuery } from "__generated__/AuctionConfirmRegistrationRouteQuery.graphql"
import { Formik } from "formik"
import { graphql } from "react-relay"

jest.unmock("react-relay")

jest.mock("Apps/Auction/Queries/useCreateBidder")
jest.mock("Apps/Auction/Hooks/useAuctionTracking")
jest.mock("System/Hooks/useRouter")
jest.mock("Apps/Auction/Routes/AuctionRegistrationRoute")

jest.mock("Apps/Auction/Components/Form/ConditionsOfSaleCheckbox", () => ({
  ConditionsOfSaleCheckbox: () => <div>ConditionsOfSaleCheckbox</div>,
}))

jest.mock("Apps/Auction/Components/Form/IdentityVerificationWarning", () => ({
  IdentityVerificationWarning: () => <div>IdentityVerificationWarning</div>,
}))

jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  ModalDialog: ({ children, title, onClose }) => (
    <div data-testid="modal-dialog" data-title={title}>
      <button type="button" onClick={onClose} data-testid="modal-close">
        Close
      </button>
      {children}
    </div>
  ),
}))

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  Form: ({ children }) => <form>{children}</form>,
  Formik: jest.fn(),
}))

describe("AuctionConfirmRegistrationRoute", () => {
  const { renderWithRelay } =
    setupTestWrapperTL<AuctionConfirmRegistrationRouteQuery>({
      Component: (props: any) => {
        return <AuctionConfirmRegistrationRouteFragmentContainer {...props} />
      },
      query: graphql`
        query AuctionConfirmRegistrationRouteQuery @relay_test_operation {
          me {
            ...AuctionConfirmRegistrationRoute_me
          }
          sale(id: "foo") {
            ...AuctionConfirmRegistrationRoute_sale
          }
        }
      `,
    })

  const mockUseAuctionTracking = useAuctionTracking as jest.Mock
  const mockUseRouter = useRouter as jest.Mock
  const mockFormik = Formik as jest.Mock
  const mockRedirectToSaleHome = redirectToSaleHome as jest.Mock
  const mockUseCreateBidder = useCreateBidder as jest.Mock

  const values = {}
  const helpers = {
    setSubmitting: jest.fn(),
    setError: jest.fn(),
  }

  const defaultFormikProps = {
    errors: {},
    touched: {},
    isSubmitting: false,
    isValid: true,
    values: {},
  }

  beforeEach(() => {
    mockUseAuctionTracking.mockImplementation(() => ({
      tracking: {
        confirmRegistrationPageView: jest.fn(),
      },
    }))

    mockUseRouter.mockImplementation(() => ({
      router: {
        replace: jest.fn(),
      },
    }))

    mockRedirectToSaleHome.mockImplementation(() => false)

    mockUseCreateBidder.mockImplementation(() => ({
      submitMutation: jest.fn(),
    }))

    // Hack to get around mocking Formik
    ;(mockFormik as React.FC<React.PropsWithChildren<unknown>>).displayName =
      "Formik"
    mockFormik.mockImplementation(({ children }) => {
      return children(defaultFormikProps)
    })
  })

  it("has the correct ModalDialog title", () => {
    renderWithRelay({
      Sale: () => ({
        name: "Sale Name",
      }),
      Me: () => ({
        hasQualifiedCreditCards: true,
      }),
    })

    expect(screen.getByTestId("modal-dialog")).toHaveAttribute(
      "data-title",
      "Register for Sale Name",
    )
  })

  it("closes the modal by redirecting to sale home", () => {
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
      Me: () => ({
        hasQualifiedCreditCards: true,
      }),
    })

    const closeButton = screen.getByTestId("modal-close")
    closeButton.click()
    expect(spy).toHaveBeenCalledWith("/auction/sale-slug")
  })

  it("shows identity verification notification", () => {
    renderWithRelay({
      Sale: () => ({
        requireIdentityVerification: true,
        bidder: {
          qualifiedForBidding: false,
        },
      }),
      Me: () => ({
        isIdentityVerified: false,
        hasQualifiedCreditCards: true,
      }),
    })

    expect(screen.getByText("IdentityVerificationWarning")).toBeInTheDocument()
  })

  it("hides identity verification notification", () => {
    renderWithRelay({
      Sale: () => ({
        requireIdentityVerification: false,
      }),
      Me: () => ({
        hasQualifiedCreditCards: true,
      }),
    })

    expect(
      screen.queryByText("IdentityVerificationWarning"),
    ).not.toBeInTheDocument()
  })

  it.each([[true], [false]])(
    "hides phone number input if phoneNumber is present and requireIdentityVerification is %s",
    requireIdentityVerification => {
      renderWithRelay({
        Sale: () => ({
          requireIdentityVerification,
        }),
        Me: () => ({
          hasQualifiedCreditCards: true,
          phoneNumber: {
            originalNumber: "+1 (123) 456-7890",
          },
        }),
      })

      expect(screen.queryByText("Phone Number")).not.toBeInTheDocument()
      expect(screen.queryByText("*Required")).not.toBeInTheDocument()
      expect(
        screen.queryByText("and provide a valid phone number"),
      ).not.toBeInTheDocument()
    },
  )

  it.each([[true], [false]])(
    "shows phone number input if phoneNumber is not present and requireIdentityVerification is %s",
    requireIdentityVerification => {
      renderWithRelay({
        Sale: () => ({
          requireIdentityVerification,
        }),
        Me: () => ({
          hasQualifiedCreditCards: true,
          phoneNumber: {
            originalNumber: null,
          },
        }),
      })

      expect(screen.getByText("Phone Number")).toBeInTheDocument()
      expect(screen.getByText("*Required")).toBeInTheDocument()
      expect(
        screen.getByText("Required for shipping logistics"),
      ).toBeInTheDocument()
    },
  )

  it("renders correct components", () => {
    renderWithRelay({
      Me: () => ({
        hasQualifiedCreditCards: true,
      }),
    })
    expect(
      screen.getByText(
        "Welcome back. To complete your registration, please confirm that you agree to the Conditions of Sale.",
      ),
    ).toBeInTheDocument()
    expect(screen.getByText("ConditionsOfSaleCheckbox")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Register" })).toBeInTheDocument()
  })

  it("redirects to sale home if condition met", async () => {
    const spy = jest.fn()

    mockUseRouter.mockImplementation(() => ({
      router: {
        replace: spy,
      },
    }))

    mockRedirectToSaleHome.mockImplementation(() => true)

    renderWithRelay({
      Sale: () => ({
        slug: "sale-slug",
      }),
    })

    await flushPromiseQueue()
    expect(spy).toHaveBeenCalledWith("/auction/sale-slug")
  })

  it("redirects to /register if no credit card on file", async () => {
    const spy = jest.fn()

    mockUseRouter.mockImplementation(() => ({
      router: {
        replace: spy,
      },
    }))

    mockRedirectToSaleHome.mockImplementation(() => false)

    renderWithRelay({
      Sale: () => ({
        slug: "sale-slug",
      }),
      Me: () => ({
        hasQualifiedCreditCards: false,
      }),
    })

    await flushPromiseQueue()
    expect(spy).toHaveBeenCalledWith("/auction/sale-slug/register")
  })

  it("tracks confirmation page view", async () => {
    const spy = jest.fn()

    mockUseAuctionTracking.mockImplementation(() => ({
      tracking: {
        confirmRegistrationPageView: spy,
      },
    }))

    mockRedirectToSaleHome.mockImplementation(() => false)

    renderWithRelay({
      Me: () => ({
        hasQualifiedCreditCards: true,
      }),
    })

    await flushPromiseQueue()
    expect(spy).toHaveBeenCalled()
  })

  it("returns null if no qualified credit card", () => {
    const { container } = renderWithRelay({
      Me: () => ({
        hasQualifiedCreditCards: false,
      }),
    })

    expect(container.firstChild).toBeFalsy()
  })

  describe("#handleSubmit", () => {
    it("creates a bidder on submit and tracks registration", async () => {
      const submitMutationSpy = jest.fn(() => ({
        createBidder: {
          bidder: {
            internalID: "bidderInternalID",
          },
        },
      }))

      mockUseCreateBidder.mockImplementation(() => ({
        submitMutation: submitMutationSpy,
      }))

      const trackingSpy = jest.fn()
      const routerSpy = jest.fn()

      mockUseAuctionTracking.mockImplementation(() => ({
        tracking: {
          registrationSubmitted: trackingSpy,
          confirmRegistrationPageView: jest.fn(),
        },
      }))

      mockUseRouter.mockImplementation(() => ({
        router: {
          push: routerSpy,
        },
      }))

      let onSubmitCallback
      mockFormik.mockImplementation(({ onSubmit, children }) => {
        onSubmitCallback = onSubmit
        return children(defaultFormikProps)
      })

      renderWithRelay({
        Sale: () => ({
          slug: "sale-slug",
          internalID: "saleInternalID",
        }),
        Me: () => ({
          hasQualifiedCreditCards: true,
        }),
      })

      onSubmitCallback(values, helpers)
      await flushPromiseQueue()

      expect(submitMutationSpy).toHaveBeenCalledWith({
        variables: {
          input: {
            saleID: "saleInternalID",
          },
        },
      })

      expect(trackingSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          bidderID: "bidderInternalID",
        }),
      )

      expect(routerSpy).toHaveBeenCalledWith(
        "/auction/sale-slug?accepted-conditions=true",
      )
    })
  })
})
