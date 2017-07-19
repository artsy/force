import renderTestComponent from 'desktop/apps/auction2/__tests__/utils/renderTestComponent'
import FilterSort from 'desktop/apps/auction2/components/artwork_browser/header/FilterSort'
import HeaderDesktop from 'desktop/apps/auction2/components/artwork_browser/header/HeaderDesktop'

describe('auction/components/artwork_browser/header/HeaderDesktop.test', () => {
  describe('<HeaderDesktop />', () => {
    it('renders a <FilterSort /> component', () => {
      const { wrapper } = renderTestComponent({
        Component: HeaderDesktop
      })

      wrapper.find(FilterSort).length.should.eql(1)
    })

    it('renders a grid icon', () => {
      const { wrapper } = renderTestComponent({
        Component: HeaderDesktop
      })

      wrapper.find('.auction2-artworks-header-desktop__grid').length.should.eql(1)
    })

    it('renders a default grid icon', () => {
      const { wrapper } = renderTestComponent({
        Component: HeaderDesktop
      })

      wrapper.find('.auction2-artworks-header-desktop__grid .active').length.should.eql(1)
    })

    it('renders a list icon', () => {
      const { wrapper } = renderTestComponent({
        Component: HeaderDesktop
      })

      wrapper.find('.auction2-artworks-header-desktop__list').length.should.eql(1)
    })

    it('toggles a sort on click', () => {
      const { wrapper } = renderTestComponent({
        Component: HeaderDesktop
      })

      const { store } = wrapper.props()

      wrapper.find('.auction2-artworks-header-desktop__list').simulate('click')
      store.getState().artworkBrowser.isListView.should.eql(true)
      wrapper.find('.auction2-artworks-header-desktop__list .active').length.should.eql(1)
      wrapper.find('.auction2-artworks-header-desktop__grid .active').length.should.eql(0)

      wrapper.find('.auction2-artworks-header-desktop__grid').simulate('click')
      store.getState().artworkBrowser.isListView.should.eql(false)
      wrapper.find('.auction2-artworks-header-desktop__list .active').length.should.eql(0)
      wrapper.find('.auction2-artworks-header-desktop__grid .active').length.should.eql(1)
    })
  })
})
