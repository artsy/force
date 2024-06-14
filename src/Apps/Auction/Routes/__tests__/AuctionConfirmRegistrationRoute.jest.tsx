import { Formik } from "formik"
import { flushPromiseQueue } from "DevTools/flushPromiseQueue"
import { useAuctionTracking } from "Apps/Auction/Hooks/useAuctionTracking"
import { useRouter } from "System/Hooks/useRouter"
import { AuctionConfirmRegistrationRouteFragmentContainer } from "Apps/Auction/Routes/AuctionConfirmRegistrationRoute"
import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { redirectToSaleHome } from "Apps/Auction/Routes/AuctionRegistrationRoute"
import { AuctionConfirmRegistrationRouteTestQuery } from "__generated__/AuctionConfirmRegistrationRouteTestQuery.graphql"
import { useCreateBidder } from "Apps/Auction/Queries/useCreateBidder"

jest.unmock("react-relay")

jest.mock("Apps/Auction/Queries/useCreateBidder")
jest.mock("Apps/Auction/Hooks/useAuctionTracking")
jest.mock("System/Hooks/useRouter")
jest.mock("Apps/Auction/Routes/AuctionRegistrationRoute")

jest.mock("Apps/Auction/Components/Form/ConditionsOfSaleCheckbox", () => ({
  ConditionsOfSaleCheckbox: () => null,
}))

jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  ModalDialog: ({ children }) => children,
}))

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  Form: ({ children }) => children,
  Formik: jest.fn(),
}))

describe("AuctionConfirmRegistrationRoute", () => {
  const { getWrapper } = setupTestWrapper<
    AuctionConfirmRegistrationRouteTestQuery
  >({
    Component: (props: any) => {
      return <AuctionConfirmRegistrationRouteFragmentContainer {...props} />
    },
    query: graphql`
      query AuctionConfirmRegistrationRouteTestQuery @relay_test_operation {
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
      "Register for Sale Name"
    )
  })

  it("closes the modal by redirecting to sale home", () => {
    const spy = jest.fn()

    mockUseRouter.mockImplementation(() => ({
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

  it("shows identity verification notification", () => {
    const { wrapper } = getWrapper({
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

    expect(wrapper.find("IdentityVerificationWarning")).toHaveLength(1)
  })

  it("hides identity verification notification", () => {
    const { wrapper } = getWrapper({
      Sale: () => ({
        requireIdentityVerification: false,
      }),
      Me: () => ({
        hasQualifiedCreditCards: true,
      }),
    })

    expect(wrapper.find("IdentityVerificationWarning")).toHaveLength(0)
  })

  it.each([[true], [false]])(
    "hides phone number input if phoneNumber is present and requireIdentityVerification is %s",
    requireIdentityVerification => {
      const { wrapper } = getWrapper({
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

      expect(wrapper.text()).not.toContain(
        "Phone Number*Required for shipping logistics"
      )
      expect(wrapper.text()).not.toContain("and provide a valid phone number")
    }
  )

  it.each([[true], [false]])(
    "shows phone number input if phoneNumber is not present and requireIdentityVerification is %s",
    requireIdentityVerification => {
      const { wrapper } = getWrapper({
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

      expect(wrapper.text()).toContain("Phone Number*Required")
      expect(wrapper.text()).toContain("Required for shipping logistics")
      expect(wrapper.text()).toContain("and provide a valid phone number")
    }
  )

  it("renders correct components", () => {
    const { wrapper } = getWrapper({
      Me: () => ({
        hasQualifiedCreditCards: true,
      }),
    })
    expect(wrapper.text()).toContain(
      "Welcome back. To complete your registration, please confirm that you agree to the Conditions of Sale."
    )
    expect(wrapper.find("ConditionsOfSaleCheckbox")).toHaveLength(1)
    expect(wrapper.find("Button")).toHaveLength(1)
    expect(wrapper.find("Button").text()).toContain("Register")
  })

  it("redirects to sale home if condition met", async () => {
    const spy = jest.fn()

    mockUseRouter.mockImplementation(() => ({
      router: {
        replace: spy,
      },
    }))

    mockRedirectToSaleHome.mockImplementation(() => true)

    getWrapper({
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

    getWrapper({
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

    getWrapper({
      Me: () => ({
        hasQualifiedCreditCards: true,
      }),
    })

    await flushPromiseQueue()
    expect(spy).toHaveBeenCalled()
  })

  it("returns null if no qualified credit card", () => {
    const { wrapper } = getWrapper({
      Me: () => ({
        hasQualifiedCreditCards: false,
      }),
    })

    expect(wrapper.html()).toBeFalsy()
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

      const { wrapper } = getWrapper({
        Sale: () => ({
          slug: "sale-slug",
          internalID: "saleInternalID",
        }),
        Me: () => ({
          hasQualifiedCreditCards: true,
        }),
      })

      ;(wrapper.find("Formik").props() as any).onSubmit(values, helpers)
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
        })
      )

      expect(routerSpy).toHaveBeenCalledWith(
        "/auction/sale-slug?accepted-conditions=true"
      )
    })
  })
})
