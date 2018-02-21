import renderTestComponent from 'desktop/apps/auction/__tests__/utils/renderTestComponent'
import { test } from 'desktop/apps/auction/components/layout/auction_info/Registration'

const { Registration } = test

describe('auction/components/layout/auction_info/Registration.test', () => {
  describe('<Registration />', () => {
    it('doesnt render when isClosed is true', () => {
      const { wrapper } = renderTestComponent({
        Component: Registration,
        props: {
          isClosed: true
        }
      })

      wrapper.find('.auctino2-registration__wrapper').length.should.equal(0)
    })

    it('returns Registration Pending when not qualified for bidding', () => {
      const { wrapper } = renderTestComponent({
        Component: Registration,
        props: {
          isQualifiedForBidding: false
        }
      })

      wrapper.text().should.containEql('Registration pending')
    })

    it('returns Approved if the number of bidders is greater than 0', () => {
      const { wrapper } = renderTestComponent({
        Component: Registration,
        props: {
          isQualifiedForBidding: true,
          numBidders: 2
        }
      })

      wrapper.text().should.containEql('Approved to Bid')
    })

    it('returns Registration Closed if if registration is ended', () => {
      const { wrapper } = renderTestComponent({
        Component: Registration,
        props: {
          isQualifiedForBidding: true,
          isRegistrationEnded: true
        }
      })

      wrapper.text().should.containEql('Registration closed')
      wrapper.text().should.containEql('Registration required to bid')
    })

    it('returns Register to Bid by default', () => {
      const { wrapper } = renderTestComponent({
        Component: Registration,
        props: {
          isQualifiedForBidding: true,
          isRegistrationEnded: false
        }
      })

      wrapper.text().should.containEql('Register to bid')
    })

    describe('mobile mode', () => {
      it('hides contact info if mobile', () => {
        const { wrapper } = renderTestComponent({
          Component: Registration,
          props: {
            showContactInfo: false
          }
        })

        wrapper.text().should.not.containEql('Questions?')
        wrapper.text().should.not.containEql('How to Bid on Artsy')
      })
    })

    describe('desktop mode', () => {
      it('displays contact info', () => {
        const { wrapper } = renderTestComponent({
          Component: Registration,
          props: {
            showContactInfo: true
          }
        })

        wrapper.text().should.containEql('Questions?')
        wrapper.text().should.containEql('How to Bid on Artsy')
      })
    })
  })
})
