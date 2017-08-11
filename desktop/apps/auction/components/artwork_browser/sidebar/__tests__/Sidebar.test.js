import ArtistFilter from 'desktop/apps/auction/components/artwork_browser/sidebar/ArtistFilter'
import MediumFilter from 'desktop/apps/auction/components/artwork_browser/sidebar/MediumFilter'
import RangeSlider from 'desktop/apps/auction/components/artwork_browser/sidebar/RangeSlider'
import renderTestComponent from 'desktop/apps/auction/__tests__/utils/renderTestComponent'
import { test } from 'desktop/apps/auction/components/artwork_browser/sidebar/Sidebar'

const { Sidebar } = test

describe('auction/components/artwork_browser/sidebar/Sidebar.test', () => {
  describe('<Sidebar />', () => {
    it('does not render a range slidere if sale is closed', () => {
      const { wrapper } = renderTestComponent({
        Component: Sidebar,
        props: {
          isClosed: true
        }
      })

      wrapper.find(RangeSlider).length.should.eql(0)
    })

    it('renders a range slidere if sale is not closed', () => {
      const { wrapper } = renderTestComponent({
        Component: Sidebar,
        props: {
          isClosed: false
        }
      })

      wrapper.find(RangeSlider).length.should.eql(1)
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
