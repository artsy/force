import { setupTestWrapper } from "v2/DevTools/setupTestWrapper"
import { RegisterButtonFragmentContainer } from "../RegisterButton"
import { RegisterButton_Test_Query } from "v2/__generated__/RegisterButton_Test_Query.graphql"
import { graphql } from "react-relay"
import { useTracking } from "v2/System/Analytics/useTracking"

jest.unmock("react-relay")
jest.mock("v2/System/Analytics/useTracking")

describe("RegisterButton", () => {
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

  const mockUseTracking = useTracking as jest.Mock

  beforeEach(() => {
    mockUseTracking.mockImplementation(() => ({
      trackEvent: jest.fn(),
    }))
  })

  it("returns null if ecommerce sale", () => {
    const wrapper = getWrapper({
      Sale: () => ({
        isAuction: false,
      }),
    })

    expect(wrapper.html()).toBeFalsy()
  })

  it("returns null if sale is closed", () => {
    const wrapper = getWrapper({
      Sale: () => ({
        isClosed: true,
      }),
    })

    expect(wrapper.html()).toBeFalsy()
  })

  describe("live open", () => {
    it("renders correctly", () => {
      const wrapper = getWrapper({
        Sale: () => ({
          isLiveOpen: true,
        }),
      })

      expect(wrapper.text()).toContain("Enter Live Auction")
    })
  })

  describe("qualified for bidding", () => {
    it("renders correctly", () => {
      const wrapper = getWrapper({
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
      const wrapper = getWrapper({
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

      expect(wrapper.text()).toContain("Verify Identity")
      expect(wrapper.text()).toContain("Identity verification required to bid.")
      expect(wrapper.html()).toContain("/identity-verification-faq")
    })
  })

  describe("registration pending", () => {
    it("renders correctly without identity verification", () => {
      const wrapper = getWrapper({
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

      expect(wrapper.text()).toContain("Registration Pending")
      expect(wrapper.text()).toContain("Identity verification required to bid.")
    })

    it("renders correctly with identity verification", () => {
      const wrapper = getWrapper({
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
      const wrapper = getWrapper({
        Sale: () => ({
          isRegistrationClosed: true,
        }),
      })

      expect(wrapper.text()).toContain("Registration Closed")
    })
  })

  describe("registration open", () => {
    it("renders correctly with identity verification", () => {
      const wrapper = getWrapper({
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

      expect(wrapper.text()).toContain("Register to Bid")
      expect(wrapper.text()).toContain("Identity verification required to bid.")
    })

    it("renders correctly without identity verification", () => {
      const wrapper = getWrapper({
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
  })
})
