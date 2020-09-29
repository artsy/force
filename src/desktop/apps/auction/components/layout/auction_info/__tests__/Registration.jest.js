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
          userRegistration: { qualifiedForBidding: true },
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
        isClosed: false,
        requireIdentityVerification: true,
        isRegistrationEnded: false,
      }
      it("returns Registration Pending when not qualified for bidding but verified", () => {
        const { wrapper } = renderTestComponent({
          Component: Registration,
          props: {
            userRegistration: { qualifiedForBidding: false },
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

      it("Has CTA with link for user to complete id verification if that is blocking their registration", () => {
        const { wrapper } = renderTestComponent({
          Component: Registration,
          props: {
            showContactInfo: true,
            userRegistration: { qualifiedForBidding: false },
            auction,
            user: {
              identityVerified: false,
              pendingIdentityVerification: {
                internalID: "idv-id",
              },
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
          showContactInfo: true,
          userRegistration: undefined,
          user: {},
          auction: {
            isClosed: false,
            isRegistrationEnded: true,
          },
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
            showContactInfo: true,
            userRegistration,
            auction: {
              isClosed: false,
              isRegistrationEnded: false,
              requireIdentityVerification: false,
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
            userRegistration,
            showContactInfo: true,
            auction: {
              requireIdentityVerification: true,
              isClosed: false,
              isRegistrationEnded: false,
            },
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
            showContactInfo: false,
            auction: {
              isClosed: false,
              isRegistrationEnded: false,
              requireIdentityVerification: false,
            },
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
            showContactInfo: true,
            auction: {
              isClosed: false,
              isQualifiedForBidding: true,
              requireIdentityVerification: false,
              isRegistrationEnded: false,
            },
            user: {},
          },
        })

        expect(wrapper.text()).toMatch("Questions?")
        expect(wrapper.text()).toMatch("How to Bid on Artsy")
      })
    })
  })
})
