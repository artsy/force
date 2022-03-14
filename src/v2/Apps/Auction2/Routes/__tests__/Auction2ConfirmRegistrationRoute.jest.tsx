import { Formik } from "formik"
import { flushPromiseQueue } from "v2/DevTools"
import { useAuctionTracking } from "v2/Apps/Auction2/Hooks/useAuctionTracking"
import { useRouter } from "v2/System/Router/useRouter"
import { Auction2ConfirmRegistrationRouteFragmentContainer } from "../Auction2ConfirmRegistrationRoute"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { redirectToSaleHome } from "v2/Apps/Auction2/Routes/Auction2RegistrationRoute"
import { Auction2ConfirmRegistrationRouteTestQuery } from "v2/__generated__/Auction2ConfirmRegistrationRouteTestQuery.graphql"
import { useCreateBidder } from "v2/Apps/Auction2/Queries/useCreateBidder"

jest.unmock("react-relay")

jest.mock("v2/Apps/Auction2/Queries/useCreateBidder")
jest.mock("v2/Apps/Auction2/Hooks/useAuctionTracking")
jest.mock("v2/System/Router/useRouter")
jest.mock("v2/Apps/Auction2/Routes/Auction2RegistrationRoute")

jest.mock("v2/Apps/Auction2/Components/Form/ConditionsOfSaleCheckbox", () => ({
  ConditionsOfSaleCheckbox: () => null,
}))

jest.mock(
  "v2/Apps/Auction2/Components/Form/IdentityVerificationWarning",
  () => ({
    IdentityVerificationWarning: () => null,
  })
)

jest.mock("@artsy/palette", () => ({
  ...jest.requireActual("@artsy/palette"),
  ModalDialog: ({ children }) => children,
}))

jest.mock("formik", () => ({
  ...jest.requireActual("formik"),
  Form: ({ children }) => children,
  Formik: jest.fn(),
}))

describe("Auction2ConfirmRegistrationRoute", () => {
  const { getWrapper } = setupTestWrapper<
    Auction2ConfirmRegistrationRouteTestQuery
  >({
    Component: (props: any) => {
      return <Auction2ConfirmRegistrationRouteFragmentContainer {...props} />
    },
    query: graphql`
      query Auction2ConfirmRegistrationRouteTestQuery @relay_test_operation {
        me {
          ...Auction2ConfirmRegistrationRoute_me
        }
        sale(id: "foo") {
          ...Auction2ConfirmRegistrationRoute_sale
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
    touched: {},
    isSubmitting: false,
    isValid: true,
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

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("has the correct ModalDialog title", () => {
    const wrapper = getWrapper({
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

    const wrapper = getWrapper({
      Sale: () => ({
        slug: "sale-slug",
      }),
      Me: () => ({
        hasQualifiedCreditCards: true,
      }),
    })

    ;(wrapper.find("ModalDialog").props() as any).onClose()
    expect(spy).toHaveBeenCalledWith("/auction2/sale-slug")
  })

  it("shows identity verification notification", () => {
    const wrapper = getWrapper({
      Sale: () => ({
        requireIdentityVerification: true,
        bidder: {
          qualifiedForBidding: false,
        },
      }),
      Me: () => ({
        identityVerified: false,
        hasQualifiedCreditCards: true,
      }),
    })

    expect(wrapper.find("IdentityVerificationWarning")).toHaveLength(1)
  })

  it("hides identity verification notification", () => {
    const wrapper = getWrapper({
      Sale: () => ({
        requireIdentityVerification: false,
      }),
      Me: () => ({
        hasQualifiedCreditCards: true,
      }),
    })

    expect(wrapper.find("IdentityVerificationWarning")).toHaveLength(0)
  })

  it("renders correct components", () => {
    const wrapper = getWrapper({
      Me: () => ({
        hasQualifiedCreditCards: true,
      }),
    })
    expect(wrapper.text()).toContain(
      "Welcome back. To complete your registration, please confirm that you agree to the Conditions of Sale"
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
    expect(spy).toHaveBeenCalledWith("/auction2/sale-slug")
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
    expect(spy).toHaveBeenCalledWith("/auction2/sale-slug/register")
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
    const wrapper = getWrapper({
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

      const wrapper = getWrapper({
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
        "/auction2/sale-slug?accepted-conditions=true"
      )
    })
  })
})
