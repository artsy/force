import * as filterActions from 'desktop/apps/auction2/actions/filter'
import renderTestComponent from 'desktop/apps/auction2/__tests__/utils/renderTestComponent'
import FilterSort from 'desktop/apps/auction2/components/artwork_browser/header/FilterSort'

describe('auction/components/artwork_browser/header/FilterSort.test', () => {
  describe('<FilterSort />', () => {
    it('updates the sort with the current selected sort state', () => {
      const { wrapper } = renderTestComponent({
        Component: FilterSort
      })

      const { store } = wrapper.props()
      const { auctionArtworks } = store.getState()
      const defaultSort = auctionArtworks.filterParams.sort
      const sortMap = auctionArtworks.sortMap

      wrapper.find('.bordered-pulldown-text').html().should.containEql(sortMap[defaultSort])
    })

    it('dispatches an updateSortAction action on sort change', () => {
      const { wrapper } = renderTestComponent({
        Component: FilterSort
      })

      const { store } = wrapper.props()
      const { auctionArtworks } = store.getState()
      const sortMap = auctionArtworks.sortMap
      const updateSort = 'bidder_positions_count'
      store.dispatch(filterActions.updateSortParam(updateSort))
      wrapper.find('.bordered-pulldown-text').html().should.containEql(sortMap[updateSort])
    })
  })
})
