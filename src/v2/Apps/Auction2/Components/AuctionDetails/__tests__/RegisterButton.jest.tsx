import { screen } from "@testing-library/react"
import { setupTestWrapperTL } from "v2/DevTools/setupTestWrapper"
import { RegisterButtonFragmentContainer } from "../RegisterButton"
import { RegisterButton_Test_Query } from "v2/__generated__/RegisterButton_Test_Query.graphql"
import { graphql } from "react-relay"
import { useTracking } from "v2/System/Analytics/useTracking"

jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")

const { renderWithRelay } = setupTestWrapperTL<RegisterButton_Test_Query>({
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

describe("RegisterButton", () => {
  const mockUseTracking = useTracking as jest.Mock

  beforeEach(() => {
    mockUseTracking.mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
  })

  it("returns null if ecommerce sale", () => {
    renderWithRelay({
      Sale: () => ({
        isAuction: false,
      }),
    })

    expect(screen.queryByTestId("RegisterButton")).not.toBeInTheDocument()
  })

  it("returns null if sale is closed", () => {
    renderWithRelay({
      Sale: () => ({
        isClosed: true,
      }),
    })

    expect(screen.queryByTestId("RegisterButton")).not.toBeInTheDocument()
  })

  describe("live open", () => {
    it("renders correctly", () => {
      renderWithRelay({
        Sale: () => ({
          isLiveOpen: true,
        }),
      })

      expect(screen.queryByText("Enter Live Auction")).toBeInTheDocument()
    })
  })

  describe("qualified for bidding", () => {
    it("renders correctly", () => {
      renderWithRelay({
        Sale: () => ({
          bidder: {
            qualifiedForBidding: true,
          },
        }),
      })

      expect(screen.queryByText("Approved to Bid")).toBeInTheDocument()
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
          identityVerified: false,
          pendingIdentityVerification: {
            internalID: true,
          },
        }),
      })

      expect(screen.queryByText("Verify Identity")).toBeInTheDocument()
      expect(
        screen.queryByText("Identity verification required to bid.")
      ).toBeInTheDocument()
      expect((screen.queryByText("FAQ") as HTMLLinkElement).href).toContain(
        "/identity-verification-faq"
      )
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
          identityVerified: false,
          pendingIdentityVerification: {
            internalID: null,
          },
        }),
      })

      expect(screen.queryByText("Registration Pending")).toBeInTheDocument()
      expect(
        screen.queryByText("Identity verification required to bid.")
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

      expect(screen.queryByText("Registration Pending")).toBeInTheDocument()
      expect(
        screen.queryByText("Reviewing submitted information")
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

      expect(screen.queryByText("Registration Closed")).toBeInTheDocument()
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
          identityVerified: false,
        }),
      })

      expect(screen.queryByText("Register to Bid")).toBeInTheDocument()
      expect(
        screen.queryByText("Identity verification required to bid.")
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

      expect(screen.queryByText("Register to Bid")).toBeInTheDocument()
      expect(
        screen.queryByText("Registration required to bid")
      ).toBeInTheDocument()
    })
  })
})
