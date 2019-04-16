import renderTestComponent from "desktop/apps/auction/__tests__/utils/renderTestComponent"
import { test } from "desktop/apps/auction/components/layout/auction_info/Registration"

const { Registration } = test

xdescribe("auction/components/layout/auction_info/Registration.test", () => {
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
        },
      })

      expect(wrapper.find(".auctino2-registration__wrapper").length).toBe(0)
    })

    it("returns Registration Pending when not qualified for bidding", () => {
      const { wrapper } = renderTestComponent({
        Component: Registration,
        props: {
          isClosed: false,
          isQualifiedForBidding: false,
          isRegistrationEnded: false,
          showContactInfo: true,
          numBidders: 0,
        },
      })

      wrapper.text().should.containEql("Registration pending")
    })

    it("returns Approved if the number of bidders is greater than 0", () => {
      const { wrapper } = renderTestComponent({
        Component: Registration,
        props: {
          isClosed: false,
          isQualifiedForBidding: true,
          numBidders: 2,
          isRegistrationEnded: false,
          showContactInfo: true,
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
        },
      })

      expect(wrapper.text()).toMatch("Register to bid")
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
          },
        })

        expect(wrapper.text()).toMatch("Questions?")
        expect(wrapper.text()).toMatch("How to Bid on Artsy")
      })
    })
  })
})
