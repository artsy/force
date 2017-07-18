import renderTestComponent from 'desktop/apps/auction2/__tests__/utils/renderTestComponent'
import HeaderMobile from 'desktop/apps/auction2/components/artwork_browser/header/HeaderMobile'
import sinon from 'sinon'
import { __RewireAPI__ as RoutesRewireApi } from 'desktop/apps/auction2/actions/filter'

describe('auction/components/artwork_browser/header/HeaderMobile.test', () => {
  describe('<HeaderMobile />', () => {
    afterEach(() => {
      RoutesRewireApi.__ResetDependency__('metaphysics')
    })

    it('default sort is Default', () => {
      const { wrapper } = renderTestComponent({
        Component: HeaderMobile
      })

      wrapper.find('select').find('option').first().html().should.containEql('Default')
    })

    it('calls updateSort on select change', () => {
      const { wrapper } = renderTestComponent({
        Component: HeaderMobile
      })

      const { store } = wrapper.props()
      const updateSort = 'bidder_positions_count'

      const auctionQueries = {
        filter_sale_artworks: {
          aggregations: [
            {
              slice: 'ARTIST',
              counts: 10
            },
            {
              slice: 'MEDIUM',
              counts: 13
            }
          ],
          counts: 10,
          hits: [
            {
              artwork: {
                _id: 'foo'
              }
            }
          ]
        }
      }

      RoutesRewireApi.__Rewire__('metaphysics', sinon.stub().returns(Promise.resolve(auctionQueries)))

      wrapper.find('select').simulate('change', {
        target: {
          value: updateSort
        }
      })

      store.getState().auctionArtworks.filterParams.sort.should.eql(updateSort)
    })
  })
})
