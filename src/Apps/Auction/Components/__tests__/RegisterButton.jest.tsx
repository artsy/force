import { RegisterButtonFragmentContainer } from "Apps/Auction/Components/RegisterButton"
import { useAuctionTracking } from "Apps/Auction/Hooks/useAuctionTracking"
import { useAuthDialog } from "Components/AuthDialog"
import { setupTestWrapperTL } from "DevTools/setupTestWrapperTL"
import { useRouter } from "System/Hooks/useRouter"
import { fireEvent, screen } from "@testing-library/react"
import type { RegisterButtonTestQuery } from "__generated__/RegisterButtonTestQuery.graphql"
import { graphql } from "react-relay"
import { useTracking } from "react-tracking"

jest.unmock("react-relay")
jest.mock("react-tracking")
jest.mock("Apps/Auction/Hooks/useAuctionTracking")
jest.mock("System/Hooks/useRouter")
jest.mock("Components/AuthDialog/useAuthDialog")

describe("RegisterButton", () => {
  const mockUseTracking = useTracking as jest.Mock
  const mockUseAuctionTracking = useAuctionTracking as jest.Mock
  const mockUseRouter = useRouter as jest.Mock

  const { renderWithRelay } = setupTestWrapperTL<RegisterButtonTestQuery>({
    Component: RegisterButtonFragmentContainer,
    query: graphql`
      query RegisterButtonTestQuery {
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
    const { container } = renderWithRelay({
      Sale: () => ({
        isAuction: false,
      }),
    })

    expect(container.firstChild).toBeFalsy()
  })

  it("returns null if sale is closed", () => {
    const { container } = renderWithRelay({
      Sale: () => ({
        isClosed: true,
      }),
    })

    expect(container.firstChild).toBeFalsy()
  })

  describe("live open", () => {
    it("renders correctly", () => {
      renderWithRelay({
        Sale: () => ({
          isLiveOpen: true,
        }),
      })

      expect(screen.getByText("Enter Live Auction")).toBeInTheDocument()
    })
  })

  describe("qualified for bidding", () => {
    it("renders correctly", () => {
      renderWithRelay({
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

      expect(screen.getByText("Approved to Bid")).toBeInTheDocument()
    })
  })

  describe("should prompt ID verification", () => {
    it("renders correctly", () => {
      renderWithRelay({
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

      expect(screen.getByText("Verify Identity")).toBeInTheDocument()
      expect(
        screen.getByText("Identity verification required to bid."),
      ).toBeInTheDocument()
      expect(
        screen.getByRole("link", { name: /verify identity/i }),
      ).toBeInTheDocument()
    })
  })

  describe("registration pending", () => {
    it("renders correctly without identity verification", () => {
      renderWithRelay({
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

      expect(screen.getByText("Registration Pending")).toBeInTheDocument()
      expect(
        screen.getByText("Identity verification required to bid."),
      ).toBeInTheDocument()
    })

    it("renders correctly with identity verification", () => {
      renderWithRelay({
        Sale: () => ({
          requireIdentityVerification: false,
          bidder: {
            qualifiedForBidding: false,
          },
        }),
      })

      expect(screen.getByText("Registration Pending")).toBeInTheDocument()
      expect(
        screen.getByText("Reviewing submitted information"),
      ).toBeInTheDocument()
    })
  })

  describe("registration closed", () => {
    it("renders correctly", () => {
      renderWithRelay({
        Sale: () => ({
          isRegistrationClosed: true,
        }),
      })

      expect(screen.getByText("Registration Closed")).toBeInTheDocument()
    })
  })

  describe("registration open", () => {
    it("renders correctly with identity verification", () => {
      renderWithRelay({
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

      expect(screen.getByText("Register to Bid")).toBeInTheDocument()
      expect(
        screen.getByText("Identity verification required to bid."),
      ).toBeInTheDocument()
    })

    it("renders correctly without identity verification", () => {
      renderWithRelay({
        Sale: () => ({
          isClosed: false,
          isLiveOpen: false,
          isRegistrationClosed: false,
          requireIdentityVerification: false,
        }),
      })

      expect(screen.getByText("Register to Bid")).toBeInTheDocument()
      expect(
        screen.getByText("Registration required to bid"),
      ).toBeInTheDocument()
    })

    it("opens auth modal if no me", () => {
      const showAuthDialog = jest.fn()
      ;(useAuthDialog as jest.Mock).mockImplementation(() => {
        return { showAuthDialog }
      })

      renderWithRelay({
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

      const button = screen.getByText("Register to Bid")
      fireEvent.click(button)

      expect(showAuthDialog).toHaveBeenCalledWith({
        analytics: {
          contextModule: "auctionSidebar",
          intent: "registerToBid",
        },
        options: {
          title: expect.any(String),
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

      renderWithRelay({
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

      const button = screen.getByText("Register to Bid")
      fireEvent.click(button)
      expect(spy).toHaveBeenCalledWith("/auction/sale-slug/register")
    })

    it("redirects to confirm registration if all conditions met", () => {
      const spy = jest.fn()

      mockUseRouter.mockImplementation(() => ({
        router: {
          push: spy,
        },
      }))

      renderWithRelay({
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

      const button = screen.getByText("Register to Bid")
      fireEvent.click(button)
      expect(spy).toHaveBeenCalledWith(
        "/auction/sale-slug/confirm-registration",
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

      renderWithRelay({
        Sale: () => ({
          isLiveOpen: true,
          liveURLIfOpen: "live-url",
        }),
      })

      const button = screen.getByRole("link")
      fireEvent.click(button)
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

      renderWithRelay({
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

      const button = screen.getByText("Verify Identity")
      fireEvent.click(button)
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

      renderWithRelay({
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

      const button = screen.getByText("Register to Bid")
      fireEvent.click(button)
      expect(spy).toHaveBeenCalled()
    })
  })
})
