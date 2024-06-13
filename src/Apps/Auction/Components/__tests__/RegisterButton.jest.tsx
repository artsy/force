import { setupTestWrapper } from "DevTools/setupTestWrapper"
import { RegisterButtonFragmentContainer } from "Apps/Auction/Components/RegisterButton"
import { RegisterButton_Test_Query } from "__generated__/RegisterButton_Test_Query.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"
import { useAuctionTracking } from "Apps/Auction/Hooks/useAuctionTracking"
import { useRouter } from "System/Hooks/useRouter"
import { useAuthDialog } from "Components/AuthDialog"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("Apps/Auction/Hooks/useAuctionTracking")
jest.mock("System/Hooks/useRouter")
jest.mock("Components/AuthDialog/useAuthDialog")

describe("RegisterButton", () => {
  const mockUseTracking = useTracking as jest.Mock
  const mockUseAuctionTracking = useAuctionTracking as jest.Mock
  const mockUseRouter = useRouter as jest.Mock

  const { getWrapper } = setupTestWrapper<RegisterButton_Test_Query>({
    Component: RegisterButtonFragmentContainer,
    query: graphql`
      query RegisterButton_Test_Query {
        sale(id: "foo") {
          ...RegisterButton_sale
        }
        me {
          ...RegisterButton_me
        }
      }
    `,
  })

  beforeAll(() => {
    mockUseAuctionTracking.mockImplementation(() => ({
      tracking: {
        clickedRegisterButton: jest.fn(),
        clickedVerifyIdentity: jest.fn(),
        enterLiveAuction: jest.fn(),
      },
    }))

    mockUseTracking.mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
    ;(useAuthDialog as jest.Mock).mockImplementation(() => {
      return { showAuthDialog: jest.fn() }
    })

    mockUseRouter.mockImplementation(() => ({
      router: {
        push: jest.fn(),
      },
    }))
  })

  it("returns null if ecommerce sale", () => {
    const { wrapper } = getWrapper({
      Sale: () => ({
        isAuction: false,
      }),
    })

    expect(wrapper.html()).toBeFalsy()
  })

  it("returns null if sale is closed", () => {
    const { wrapper } = getWrapper({
      Sale: () => ({
        isClosed: true,
      }),
    })

    expect(wrapper.html()).toBeFalsy()
  })

  describe("live open", () => {
    it("renders correctly", () => {
      const { wrapper } = getWrapper({
        Sale: () => ({
          isLiveOpen: true,
        }),
      })

      expect(wrapper.text()).toContain("Enter Live Auction")
    })
  })

  describe("qualified for bidding", () => {
    it("renders correctly", () => {
      const { wrapper } = getWrapper({
        Sale: () => ({
          isPreview: false,
          bidder: {
            qualifiedForBidding: true,
          },
          registrationStatus: {
            internalID: "foo",
          },
        }),
      })

      expect(wrapper.text()).toContain("Approved to Bid")
    })
  })

  describe("should prompt ID verification", () => {
    it("renders correctly", () => {
      const { wrapper } = getWrapper({
        Sale: () => ({
          requireIdentityVerification: true,
          bidder: {
            qualifiedForBidding: false,
          },
        }),
        Me: () => ({
          isIdentityVerified: false,
          pendingIdentityVerification: {
            internalID: true,
          },
        }),
      })

      expect(wrapper.text()).toContain("Verify Identity")
      expect(wrapper.text()).toContain("Identity verification required to bid.")
      expect(wrapper.html()).toContain("/identity-verification-faq")
    })
  })

  describe("registration pending", () => {
    it("renders correctly without identity verification", () => {
      const { wrapper } = getWrapper({
        Sale: () => ({
          requireIdentityVerification: true,
          bidder: {
            qualifiedForBidding: false,
          },
        }),
        Me: () => ({
          isIdentityVerified: false,
          pendingIdentityVerification: {
            internalID: null,
          },
        }),
      })

      expect(wrapper.text()).toContain("Registration Pending")
      expect(wrapper.text()).toContain("Identity verification required to bid.")
    })

    it("renders correctly with identity verification", () => {
      const { wrapper } = getWrapper({
        Sale: () => ({
          requireIdentityVerification: false,
          bidder: {
            qualifiedForBidding: false,
          },
        }),
      })

      expect(wrapper.text()).toContain("Registration Pending")
      expect(wrapper.text()).toContain("Reviewing submitted information")
    })
  })

  describe("registration closed", () => {
    it("renders correctly", () => {
      const { wrapper } = getWrapper({
        Sale: () => ({
          isRegistrationClosed: true,
        }),
      })

      expect(wrapper.text()).toContain("Registration Closed")
    })
  })

  describe("registration open", () => {
    it("renders correctly with identity verification", () => {
      const { wrapper } = getWrapper({
        Sale: () => ({
          isClosed: false,
          isLiveOpen: false,
          isRegistrationClosed: false,
          requireIdentityVerification: true,
        }),
        Me: () => ({
          isIdentityVerified: false,
        }),
      })

      expect(wrapper.text()).toContain("Register to Bid")
      expect(wrapper.text()).toContain("Identity verification required to bid.")
    })

    it("renders correctly without identity verification", () => {
      const { wrapper } = getWrapper({
        Sale: () => ({
          isClosed: false,
          isLiveOpen: false,
          isRegistrationClosed: false,
          requireIdentityVerification: false,
        }),
      })

      expect(wrapper.text()).toContain("Register to Bid")
      expect(wrapper.text()).toContain("Registration required to bid")
    })

    it("opens auth modal if no me", () => {
      const showAuthDialog = jest.fn()

      ;(useAuthDialog as jest.Mock).mockImplementation(() => {
        return { showAuthDialog }
      })

      const { wrapper } = getWrapper({
        Me: () => ({
          internalID: null,
        }),
        Sale: () => ({
          slug: "sale-slug",
          isClosed: false,
          isLiveOpen: false,
          requireIdentityVerification: false,
          isRegistrationClosed: false,
        }),
      })

      ;(wrapper.find("ButtonAction").props() as any).onClick()

      expect(showAuthDialog).toHaveBeenCalledWith({
        mode: "Login",
        analytics: {
          contextModule: "auctionSidebar",
          intent: "registerToBid",
        },
        options: {
          title: expect.any(Function),
          redirectTo: "/auction/sale-slug/register",
        },
      })
    })

    it("redirects to register if no credit cards", () => {
      const spy = jest.fn()

      mockUseRouter.mockImplementation(() => ({
        router: {
          push: spy,
        },
      }))

      const { wrapper } = getWrapper({
        Me: () => ({
          hasCreditCards: false,
        }),
        Sale: () => ({
          slug: "sale-slug",
          isClosed: false,
          isLiveOpen: false,
          requireIdentityVerification: false,
          isRegistrationClosed: false,
        }),
      })

      ;(wrapper.find("ButtonAction").props() as any).onClick()
      expect(spy).toHaveBeenCalledWith("/auction/sale-slug/register")
    })

    it("redirects to confirm registration if all conditions met", () => {
      const spy = jest.fn()

      mockUseRouter.mockImplementation(() => ({
        router: {
          push: spy,
        },
      }))

      const { wrapper } = getWrapper({
        Me: () => ({
          hasCreditCards: true,
        }),
        Sale: () => ({
          slug: "sale-slug",
          isClosed: false,
          isLiveOpen: false,
          requireIdentityVerification: false,
          isRegistrationClosed: false,
        }),
      })

      ;(wrapper.find("ButtonAction").props() as any).onClick()
      expect(spy).toHaveBeenCalledWith(
        "/auction/sale-slug/confirm-registration"
      )
    })
  })

  describe("tracking", () => {
    it("LIVE_OPEN", () => {
      const registerSpy = jest.fn()
      const enterLiveAuctionSpy = jest.fn()

      mockUseAuctionTracking.mockImplementation(() => ({
        tracking: {
          clickedRegisterButton: registerSpy,
          enterLiveAuction: enterLiveAuctionSpy,
        },
      }))

      const { wrapper } = getWrapper({
        Sale: () => ({
          isLiveOpen: true,
          liveURLIfOpen: "live-url",
        }),
      })

      ;(wrapper.find("ButtonAction").props() as any).onClick()
      expect(registerSpy).toHaveBeenCalled()
      expect(enterLiveAuctionSpy).toHaveBeenCalledWith({ url: "live-url" })
    })

    it("VERIFY_IDENTITY", () => {
      const spy = jest.fn()

      mockUseAuctionTracking.mockImplementation(() => ({
        tracking: {
          clickedVerifyIdentity: spy,
        },
      }))

      const { wrapper } = getWrapper({
        Me: () => ({
          internalID: "me-id",
          isIdentityVerified: false,
          pendingIdentityVerification: {
            internalID: "foo",
          },
        }),
        Sale: () => ({
          slug: "sale-slug",
          status: "sale-status",
          isClosed: false,
          isLiveOpen: false,
          isRegistrationClosed: false,
          requireIdentityVerification: true,
          registrationStatus: null,
          bidder: null,
        }),
      })

      ;(wrapper.find("ButtonAction").props() as any).onClick()
      expect(spy).toHaveBeenCalledWith({
        auctionSlug: "sale-slug",
        auctionState: "sale-status",
        userID: "me-id",
      })
    })

    it("REGISTRATION_OPEN", () => {
      const spy = jest.fn()

      mockUseAuctionTracking.mockImplementation(() => ({
        tracking: {
          clickedRegisterButton: spy,
        },
      }))

      const { wrapper } = getWrapper({
        Me: () => ({
          hasCreditCards: true,
        }),
        Sale: () => ({
          slug: "sale-slug",
          isClosed: false,
          isLiveOpen: false,
          requireIdentityVerification: false,
          isRegistrationClosed: false,
        }),
      })

      ;(wrapper.find("ButtonAction").props() as any).onClick()
      expect(spy).toHaveBeenCalled()
    })
  })
})
