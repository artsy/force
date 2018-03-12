import ArtistFilter from 'desktop/apps/auction/components/artwork_browser/sidebar/ArtistFilter'
import MediumFilter from 'desktop/apps/auction/components/artwork_browser/sidebar/MediumFilter'
import RangeSlider from 'desktop/apps/auction/components/artwork_browser/sidebar/RangeSlider'
import renderTestComponent from 'desktop/apps/auction/__tests__/utils/renderTestComponent'
import { test } from 'desktop/apps/auction/components/artwork_browser/sidebar/Sidebar'

const { Sidebar } = test

describe('auction/components/artwork_browser/sidebar/Sidebar.test', () => {
  describe('<Sidebar />', () => {
    it('does not render a range slider if sale is closed', () => {
      const { wrapper } = renderTestComponent({
        Component: Sidebar,
        data: {
          app: {
            auction: {
              is_auction: true
            }
          }
        },
        props: {
          isClosed: true
        }
      })

      wrapper.find(RangeSlider).length.should.eql(0)
    })

    it('renders a range slider if sale is not closed', () => {
      const { wrapper } = renderTestComponent({
        Component: Sidebar,
        data: {
          app: {
            auction: {
              is_auction: true
            }
          }
        },
        props: {
          isClosed: false
        }
      })

      wrapper.find(RangeSlider).length.should.eql(1)
    })

    it('if auction, renders lot message in range slider', () => {
      const { wrapper } = renderTestComponent({
        Component: Sidebar,
        data: {
          app: {
            auction: {
              is_auction: true
            }
          }
        },
        props: {
          isSale: true
        }
      })

      wrapper.find('.auction-RangeSlider__info').length.should.eql(1)
    })

    it('if not auction, hide lot message in range slider', () => {
      const { wrapper } = renderTestComponent({
        Component: Sidebar,
        data: {
          app: {
            auction: {
              is_auction: false
            }
          }
        },
        props: {
          isClosed: false
        }
      })

      wrapper.find('.auction-RangeSlider__info').length.should.eql(0)
    })

    it('renders a MediumFilter and an ArtistFilter', () => {
      const { wrapper } = renderTestComponent({
        Component: Sidebar,
        props: {
          isClosed: false
        }
      })

      wrapper.find(ArtistFilter).length.should.eql(1)
      wrapper.find(MediumFilter).length.should.eql(1)
      wrapper.find(RangeSlider).length.should.eql(1)
    })
  })
})
