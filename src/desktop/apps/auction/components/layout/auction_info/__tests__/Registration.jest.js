import renderTestComponent from "desktop/apps/auction/__tests__/utils/renderTestComponent"
import { test } from "desktop/apps/auction/components/layout/auction_info/Registration"

const { Registration } = test

describe("auction/components/layout/auction_info/Registration.test", () => {
  describe("<Registration />", () => {
    it("doesnt render when isClosed is true", () => {
      const { wrapper } = renderTestComponent({
        Component: Registration,
        props: {
          isClosed: true,
          isRegistrationEnded: false,
          showContactInfo: true,
          userNeedsIdentityVerification: false,
          auction: { attributes: {} },
          user: {},
        },
      })

      expect(wrapper.find(".auction2-registration__wrapper").length).toBe(0)
    })

    it("returns Approved if user has a qualified bidder registration", () => {
      const { wrapper } = renderTestComponent({
        Component: Registration,
        props: {
          isClosed: false,
          userRegistration: { qualified_for_bidding: true },
          isRegistrationEnded: false,
          showContactInfo: true,
          user: {},
          auction: { attributes: {} },
        },
      })

      expect(wrapper.text()).toMatch("Approved to Bid")
    })

    describe("sale requires identity verification", () => {
      const auction = {
        attributes: {
          requireIdentityVerification: true,
        },
      }
      it("returns Registration Pending when not qualified for bidding and verified", () => {
        const { wrapper } = renderTestComponent({
          Component: Registration,
          props: {
            isClosed: false,
            isRegistrationEnded: false,
            userRegistration: { qualified_for_bidding: false },
            showContactInfo: true,
            auction,
            user: {
              identityVerified: true,
            },
          },
        })

        wrapper.find("button").text().should.containEql("Registration pending")
        wrapper.text().should.containEql("Reviewing submitted information")
      })

      it("Has CTA with link for user to complete id verificaiton if that is blocking their registration", () => {
        const { wrapper } = renderTestComponent({
          Component: Registration,
          props: {
            isClosed: false,
            isRegistrationEnded: false,
            showContactInfo: true,
            userRegistration: { qualified_for_bidding: false },
            auction,
            user: {
              identityVerified: false,
              pendingIdentityVerificationId: "idv-id",
            },
          },
        })

        const button = wrapper.find("a").first()
        expect(button.text()).toContain("Verify identity")
        expect(button.prop("href")).toEqual("/identity-verification/idv-id")
        wrapper
          .text()
          .should.containEql("Identity verification required to bid.")
      })
    })

    it("returns Registration Closed if if registration is ended + not registered", () => {
      const { wrapper } = renderTestComponent({
        Component: Registration,
        props: {
          isClosed: false,
          isRegistrationEnded: true,
          showContactInfo: true,
          userRegistration: undefined,
          user: {},
          auction: { attributes: {} },
        },
      })

      expect(wrapper.text()).toMatch("Registration closed")
      expect(wrapper.text()).toMatch("Registration required to bid")
    })

    describe("user not registered", () => {
      const userRegistration = null
      it("Button says 'Register to Bid' + 'registration required' by default", () => {
        const { wrapper } = renderTestComponent({
          Component: Registration,
          props: {
            isClosed: false,
            isRegistrationEnded: false,
            showContactInfo: true,
            userRegistration,
            auction: {
              attributes: {
                requireIdentityVerification: false,
              },
            },
            user: {
              identityVerified: false,
            },
          },
        })

        expect(wrapper.find("button").text()).toBe("Register to bid")
        expect(wrapper.text()).toMatch("Registration required to bid")
      })

      it("'Register to bid' button plus ID verification message if applicable to that user+sale", () => {
        const { wrapper } = renderTestComponent({
          Component: Registration,
          props: {
            isClosed: false,
            isRegistrationEnded: false,
            userRegistration,
            showContactInfo: true,
            numBidders: 0,
            auction: { attributes: { requireIdentityVerification: true } },
            user: { identityVerified: false },
          },
        })

        expect(wrapper.find("button").text()).toBe("Register to bid")
        expect(wrapper.text()).toMatch("Identity verification required to bid.")
      })
    })

    describe("contact info", () => {
      it("hides contact info if specified", () => {
        const { wrapper } = renderTestComponent({
          Component: Registration,
          props: {
            isClosed: false,
            isQualifiedForBidding: true,
            showContactInfo: false,
            isRegistrationEnded: false,
            numBidders: 0,
            auction: { attributes: { requireIdentityVerification: false } },
            user: {},
          },
        })

        expect(wrapper.text()).not.toMatch("Questions?")
        expect(wrapper.text()).not.toMatch("How to Bid on Artsy")
      })

      it("displays contact info if specified", () => {
        const { wrapper } = renderTestComponent({
          Component: Registration,
          props: {
            isClosed: false,
            isQualifiedForBidding: true,
            showContactInfo: true,
            isRegistrationEnded: false,
            numBidders: 0,
            auction: { attributes: { requireIdentityVerification: false } },
            user: {},
          },
        })

        expect(wrapper.text()).toMatch("Questions?")
        expect(wrapper.text()).toMatch("How to Bid on Artsy")
      })
    })
  })
})
