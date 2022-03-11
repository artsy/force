import { Formik } from "formik"
import { flushPromiseQueue } from "v2/DevTools"
import { useAuctionTracking } from "v2/Apps/Auction2/Hooks/useAuctionTracking"
import { useRouter } from "v2/System/Router/useRouter"
import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { graphql } from "react-relay"
import { Auction2RegistrationRouteFragmentContainer } from "v2/Apps/Auction2/Routes/Auction2RegistrationRoute"
import { Auction2RegistrationRouteTestQuery } from "v2/__generated__/Auction2RegistrationRouteTestQuery.graphql"
import { useCreateTokenAndSubmit } from "v2/Apps/Auction2/Hooks/useCreateTokenAndSubmit"

jest.unmock("react-relay")

jest.mock("v2/Apps/Auction2/Hooks/useCreateTokenAndSubmit")
jest.mock("v2/Apps/Auction2/Hooks/useAuctionTracking")
jest.mock("v2/System/Router/useRouter")

jest.mock("v2/Components/CreditCardInput/CreditCardInputProvider", () => ({
  CreditCardInputProvider: ({ children }) => children,
}))

jest.mock("v2/Apps/Auction2/Components/Form/ErrorStatus", () => ({
  ErrorStatus: () => null,
}))

jest.mock("v2/Apps/Auction2/Components/Form/AddressFormWithCreditCard", () => ({
  AddressFormWithCreditCard: () => null,
}))

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

describe("Auction2RegistrationRoute", () => {
  const { getWrapper } = setupTestWrapper<Auction2RegistrationRouteTestQuery>({
    Component: (props: any) => {
      return <Auction2RegistrationRouteFragmentContainer {...props} />
    },
    query: graphql`
      query Auction2RegistrationRouteTestQuery @relay_test_operation {
        me {
          ...Auction2RegistrationRoute_me
        }
        sale(id: "foo") {
          ...Auction2RegistrationRoute_sale
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

  beforeEach(() => {
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
    ;(mockFormik as React.FC).displayName = "Formik"
    mockFormik.mockImplementation(({ children }) => {
      return children(defaultFormikProps)
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it("redirects to sale home if condition met", async () => {
    const spy = jest.fn()

    mockUseRouter.mockImplementation(() => ({
      router: {
        replace: spy,
      },
    }))

    getWrapper({
      Sale: () => ({
        slug: "sale-slug",
        bidder: {
          qualifiedForBidding: true,
        },
      }),
    })

    await flushPromiseQueue()
    expect(spy).toHaveBeenCalledWith("/auction2/sale-slug")
  })

  it("tracks confirmation page view", async () => {
    const spy = jest.fn()

    mockUseAuctionTracking.mockImplementation(() => ({
      tracking: {
        registrationPageView: spy,
      },
    }))

    getWrapper({
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

  it("has the correct ModalDialog title", () => {
    const wrapper = getWrapper()
    expect((wrapper.find("ModalDialog").props() as any).title).toEqual(
      "Register to Bid on Artsy"
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
      Sale: () => ({
        requireIdentityVerification: true,
      }),
    })
    expect(wrapper.text()).toContain("Register")
    expect(wrapper.find("AddressFormWithCreditCard")).toHaveLength(1)
    expect(wrapper.find("IdentityVerificationWarning")).toHaveLength(1)
    expect(wrapper.find("Button")).toHaveLength(1)
    expect(wrapper.find("Button").text()).toContain("Register")
  })

  describe("#handleSubmit", () => {
    it("creates a bidder on submit and tracks registration", async () => {
      const createTokenSpy = jest.fn()

      mockUseCreateTokenAndSubmit.mockImplementation(() => ({
        createToken: createTokenSpy,
      }))

      mockUseAuctionTracking.mockImplementation(() => ({
        tracking: {
          registrationPageView: jest.fn(),
        },
      }))

      const wrapper = getWrapper({
        Sale: () => ({
          slug: "sale-slug",
          internalID: "saleInternalID",
        }),
      })

      ;(wrapper.find("Formik").props() as any).onSubmit(values, helpers)
      await flushPromiseQueue()

      expect(createTokenSpy).toHaveBeenCalledWith(values, helpers)
    })
  })
})
