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
          isQualifiedForBidding: true,
          isRegistrationEnded: false,
          showContactInfo: true,
          numBidders: 0,
          userNeedsIdentityVerification: false,
        },
      })

      expect(wrapper.find(".auctino2-registration__wrapper").length).toBe(0)
    })

    it("returns Registration Pending when not qualified for bidding and verified", () => {
      const { wrapper } = renderTestComponent({
        Component: Registration,
        props: {
          isClosed: false,
          isQualifiedForBidding: false,
          isRegistrationEnded: false,
          showContactInfo: true,
          numBidders: 0,
          userNeedsIdentityVerification: false,
        },
      })

      wrapper.text().should.containEql("Registration pending")
      wrapper.text().should.containEql("Reviewing submitted information")
    })

    it("returns Registration Pending when not qualified for bidding and not verified", () => {
      const { wrapper } = renderTestComponent({
        Component: Registration,
        props: {
          isClosed: false,
          isQualifiedForBidding: false,
          isRegistrationEnded: false,
          showContactInfo: true,
          numBidders: 1,
          userNeedsIdentityVerification: true,
        },
      })

      wrapper.text().should.containEql("Registration pending")
      wrapper.text().should.containEql("Identity verification required to bid.")
    })

    it("returns Approved if the number of bidders is greater than 0 and verified", () => {
      const { wrapper } = renderTestComponent({
        Component: Registration,
        props: {
          isClosed: false,
          isQualifiedForBidding: true,
          numBidders: 1,
          isRegistrationEnded: false,
          showContactInfo: true,
          userNeedsIdentityVerification: false,
        },
      })

      expect(wrapper.text()).toMatch("Approved to Bid")
    })

    it("returns Approved if the number of bidders is greater than 0 and unverified", () => {
      const { wrapper } = renderTestComponent({
        Component: Registration,
        props: {
          isClosed: false,
          isQualifiedForBidding: true,
          numBidders: 1,
          isRegistrationEnded: false,
          showContactInfo: true,
          userNeedsIdentityVerification: true,
        },
      })

      expect(wrapper.text()).toMatch("Approved to Bid")
    })

    it("returns Registration Closed if if registration is ended", () => {
      const { wrapper } = renderTestComponent({
        Component: Registration,
        props: {
          isClosed: false,
          isQualifiedForBidding: true,
          isRegistrationEnded: true,
          showContactInfo: true,
          numBidders: 0,
          userNeedsIdentityVerification: false,
        },
      })

      expect(wrapper.text()).toMatch("Registration closed")
      expect(wrapper.text()).toMatch("Registration required to bid")
    })

    it("returns Register to Bid by default", () => {
      const { wrapper } = renderTestComponent({
        Component: Registration,
        props: {
          isClosed: false,
          isQualifiedForBidding: true,
          isRegistrationEnded: false,
          showContactInfo: true,
          numBidders: 0,
          userNeedsIdentityVerification: false,
        },
      })

      expect(wrapper.text()).toMatch("Register to bid")
      expect(wrapper.text()).toMatch("Registration required to bid")
    })

    it("returns Register to Bid by default with IDV required", () => {
      const { wrapper } = renderTestComponent({
        Component: Registration,
        props: {
          isClosed: false,
          isQualifiedForBidding: true,
          isRegistrationEnded: false,
          showContactInfo: true,
          numBidders: 0,
          userNeedsIdentityVerification: true,
        },
      })

      expect(wrapper.text()).toMatch("Register to bid")
      expect(wrapper.text()).toMatch("Identity verification required to bid.")
    })

    describe("mobile mode", () => {
      it("hides contact info if mobile", () => {
        const { wrapper } = renderTestComponent({
          Component: Registration,
          props: {
            isClosed: false,
            isQualifiedForBidding: true,
            showContactInfo: false,
            isRegistrationEnded: false,
            numBidders: 0,
            userNeedsIdentityVerification: false,
          },
        })

        expect(wrapper.text()).not.toMatch("Questions?")
        expect(wrapper.text()).not.toMatch("How to Bid on Artsy")
      })
    })

    describe("desktop mode", () => {
      it("displays contact info", () => {
        const { wrapper } = renderTestComponent({
          Component: Registration,
          props: {
            isClosed: false,
            isQualifiedForBidding: true,
            showContactInfo: true,
            isRegistrationEnded: false,
            numBidders: 0,
            userNeedsIdentityVerification: false,
          },
        })

        expect(wrapper.text()).toMatch("Questions?")
        expect(wrapper.text()).toMatch("How to Bid on Artsy")
      })
    })
  })
})
