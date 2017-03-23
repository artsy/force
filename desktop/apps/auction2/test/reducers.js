import AuctionGridArtwork from '../components/auction_grid_artwork'
import AuctionListArtwork from '../components/auction_list_artwork'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { renderToString } from 'react-dom/server'
import auctions from '../reducers'
import * as actions from '../actions'
import { __RewireAPI__ as ActionsRewireApi } from '../actions'
import sinon from 'sinon'

describe('Reducers', () => {
  describe('auctions', () => {
    it('returns the initial state', () => {
      const {
        auctionArtworks: {
          filterParams
        }
      } = auctions(undefined, {})
      filterParams.should.containEql({ page: 1, size: 50 })
    })

    describe('with initial state', () => {
      let initialResponse

      beforeEach(() => {
        initialResponse = auctions(undefined, {})
      })

      describe('#decrementFollowedArtistsPage', () => {
        it('decrements the followed artists page', () => {
          initialResponse.auctionArtworks.followedArtistRailPage.should.eql(1)
          const incrementedResponse = auctions(initialResponse, actions.incrementFollowedArtistsPage())
          incrementedResponse.auctionArtworks.followedArtistRailPage.should.eql(2)
          const decrementedResponse = auctions(initialResponse, actions.decrementFollowedArtistsPage())
          decrementedResponse.auctionArtworks.followedArtistRailPage.should.eql(1)
        })
        it('does not decrement if you are already at the first page', () => {
          initialResponse.auctionArtworks.followedArtistRailPage.should.eql(1)
          const decrementedResponse = auctions(initialResponse, actions.decrementFollowedArtistsPage())
          decrementedResponse.auctionArtworks.followedArtistRailPage.should.eql(1)
        })
      })

      describe('#fetchArtworksByFollowedArtists', () => {
        let store

        beforeEach(() => {
          const middlewares = [ thunk ]
          const mockStore = configureMockStore(middlewares)

          store = mockStore(initialResponse)
          ActionsRewireApi.__Rewire__('metaphysics', sinon.stub().returns(Promise.resolve(
            {
              filter_sale_artworks: {
                hits: [
                  { id: 'artwork1' }, { id: 'artwork2' }
                ],
                counts: {
                  total: 123
                }
              }
            }
          )));
        })
        it('calls the correct actions', () => {
          const expectedActions = [
            {
              type: 'UPDATE_SALE_ARTWORKS_BY_FOLLOWED_ARTISTS',
              payload: { saleArtworks: [{ id: 'artwork1' }, { id: 'artwork2' }] }
            },
            {
              type: 'UPDATE_SALE_ARTWORKS_BY_FOLLOWED_ARTISTS_TOTAL',
              payload: { total: 123 }
            },
            { type: 'UPDATE_IS_LAST_FOLLOWED_ARTISTS_PAGE' },
            { type: 'SHOW_FOLLOWED_ARTISTS_RAIL' }
          ]
          store.dispatch(actions.fetchArtworksByFollowedArtists()).then(() => {
            store.getActions().should.eql(expectedActions)
          })
        })
      })

      describe('#incrementFollowedArtistsPage', () => {
        it('increments the followed artists page', () => {
          initialResponse.auctionArtworks.followedArtistRailPage.should.eql(1)
          const incrementedResponse = auctions(initialResponse, actions.incrementFollowedArtistsPage())
          incrementedResponse.auctionArtworks.followedArtistRailPage.should.eql(2)
        })

        it('does not increment if you are already at the final page', () => {
          initialResponse.auctionArtworks.followedArtistRailPage.should.eql(1)
          const incrementedResponse = auctions(initialResponse, actions.incrementFollowedArtistsPage())
          incrementedResponse.auctionArtworks.followedArtistRailPage.should.eql(2)
          const totalResponse = auctions(incrementedResponse, actions.updateSaleArtworksByFollowedArtistsTotal(7))
          const updatedIsLastPage = auctions(totalResponse, actions.updateIsLastFollowedArtistsPage())
          updatedIsLastPage.auctionArtworks.isLastFollowedArtistsPage.should.eql(true)
          const anotherIncrement = auctions(updatedIsLastPage, actions.incrementFollowedArtistsPage())
          anotherIncrement.auctionArtworks.followedArtistRailPage.should.eql(2)
        })
      })

      describe('#toggleListView', () => {
        it('toggles the list view component', () => {
          initialResponse.auctionArtworks.isListView.should.eql(false)
          const toggledResponse = auctions(initialResponse, actions.toggleListView(true))
          toggledResponse.auctionArtworks.isListView.should.eql(true)
        })
      })

      describe('#updateAggregatedArtists', () => {
        it('updates aggregated artists', () => {
          initialResponse.auctionArtworks.aggregatedArtists.should.eql([])
          const updatedResponse = auctions(initialResponse, actions.updateAggregatedArtists(['artist1', 'artist2']))
          updatedResponse.auctionArtworks.aggregatedArtists.should.eql(['artist1', 'artist2'])
        })
      })

      describe('#updateAggregatedMediums', () => {
        it('updates aggregated mediums', () => {
          initialResponse.auctionArtworks.aggregatedMediums.should.eql([])
          const updatedResponse = auctions(initialResponse, actions.updateAggregatedMediums(['gene1', 'gene2']))
          updatedResponse.auctionArtworks.aggregatedMediums.should.eql(['gene1', 'gene2'])
        })
      })

      describe('#updateAllFetched', () => {
        it('updates allFetched to true if the total matches the number of artworks', () => {
          initialResponse.auctionArtworks.allFetched.should.eql(false)
          initialResponse.auctionArtworks.saleArtworks.should.eql([])
          initialResponse.auctionArtworks.total.should.eql(0)
          const newArtworks = auctions(initialResponse, actions.updateSaleArtworks(['artwork1', 'artwork2', 'artwork3']))
          const newTotal = auctions(newArtworks, actions.updateTotal(3))
          const allArtworksFetched = auctions(newTotal, actions.updateAllFetched())
          allArtworksFetched.auctionArtworks.allFetched.should.eql(true)
          allArtworksFetched.auctionArtworks.saleArtworks.should.eql(['artwork1', 'artwork2', 'artwork3'])
          allArtworksFetched.auctionArtworks.total.should.eql(3)
        })

        it('updates allFetched to false if the total does not match the number of artworks', () => {
          initialResponse.auctionArtworks.allFetched.should.eql(false)
          initialResponse.auctionArtworks.saleArtworks.should.eql([])
          initialResponse.auctionArtworks.total.should.eql(0)
          const newArtworks = auctions(initialResponse, actions.updateSaleArtworks(['artwork1', 'artwork2', 'artwork3']))
          const newTotal = auctions(newArtworks, actions.updateTotal(10))
          const notAllArtworksFetched = auctions(newTotal, actions.updateAllFetched())
          notAllArtworksFetched.auctionArtworks.allFetched.should.eql(false)
          notAllArtworksFetched.auctionArtworks.saleArtworks.should.eql(['artwork1', 'artwork2', 'artwork3'])
          notAllArtworksFetched.auctionArtworks.total.should.eql(10)
        })
      })

      describe('#updateArtistId', () => {
        it('updates the artist id', () => {
          initialResponse.auctionArtworks.filterParams.artist_ids.should.eql([])
          const oneArtist = auctions(initialResponse, actions.updateArtistId('artist1'))
          oneArtist.auctionArtworks.filterParams.artist_ids.should.eql(['artist1'])
          const twoArtists = auctions(oneArtist, actions.updateArtistId('artist2'))
          twoArtists.auctionArtworks.filterParams.artist_ids.should.eql(['artist1', 'artist2'])
          const subtractArtist = auctions(twoArtists, actions.updateArtistId('artist2'))
          subtractArtist.auctionArtworks.filterParams.artist_ids.should.eql(['artist1'])
          const noArtists = auctions(subtractArtist, actions.updateArtistId('artist1'))
          noArtists.auctionArtworks.filterParams.artist_ids.should.eql([])
        })

        it('updates the artist ids to none when artists-all is passed', () => {
          initialResponse.auctionArtworks.filterParams.artist_ids.should.eql([])
          const oneArtist = auctions(initialResponse, actions.updateArtistId('artist1'))
          oneArtist.auctionArtworks.filterParams.artist_ids.should.eql(['artist1'])
          const twoArtists = auctions(oneArtist, actions.updateArtistId('artist2'))
          twoArtists.auctionArtworks.filterParams.artist_ids.should.eql(['artist1', 'artist2'])
          const allArtists = auctions(twoArtists, actions.updateArtistId('artists-all'))
          allArtists.auctionArtworks.filterParams.artist_ids.should.eql([])
        })

        it('updates the artist ids to none when artists-you-follow is passed, but changes a param', () => {
          initialResponse.auctionArtworks.filterParams.artist_ids.should.eql([])
          initialResponse.auctionArtworks.filterParams.include_artworks_by_followed_artists.should.eql(false)
          const oneArtist = auctions(initialResponse, actions.updateArtistId('artist1'))
          oneArtist.auctionArtworks.filterParams.artist_ids.should.eql(['artist1'])
          const twoArtists = auctions(oneArtist, actions.updateArtistId('artist2'))
          twoArtists.auctionArtworks.filterParams.artist_ids.should.eql(['artist1', 'artist2'])
          const allArtists = auctions(twoArtists, actions.updateArtistId('artists-you-follow'))
          allArtists.auctionArtworks.filterParams.artist_ids.should.eql([])
          allArtists.auctionArtworks.filterParams.include_artworks_by_followed_artists.should.eql(true)
        })
      })

      describe('#updateArtworks', () => {
        it('resets the artworks if the page does not change', () => {
          initialResponse.auctionArtworks.saleArtworks.should.eql([])
          const newArtworks = [{ id: 'artwork-1' }, { id: 'artwork-2' }]
          const updatedArtworks = auctions(initialResponse, actions.updateSaleArtworks(newArtworks))
          updatedArtworks.auctionArtworks.saleArtworks.should.eql(newArtworks)
          const resetArtworks = [{ id: 'artwork-3' }]
          const resettedArtworks = auctions(updatedArtworks, actions.updateSaleArtworks(resetArtworks))
          resettedArtworks.auctionArtworks.saleArtworks.should.eql(resetArtworks)
        })

        it('concatenates the artworks if the page is above 1', () => {
          initialResponse.auctionArtworks.saleArtworks.should.eql([])
          const newArtworks = [{ id: 'artwork-1' }, { id: 'artwork-2' }]
          const updatedArtworks = auctions(initialResponse, actions.updateSaleArtworks(newArtworks))
          updatedArtworks.auctionArtworks.saleArtworks.should.eql(newArtworks)
          const newPage = auctions(updatedArtworks, actions.updatePage(false))
          const concatArtworks = [{ id: 'artwork-3' }]
          const concatenatedArtworks = auctions(newPage, actions.updateSaleArtworks(concatArtworks))
          concatenatedArtworks.auctionArtworks.saleArtworks.should.eql([
            { id: 'artwork-1' },
            { id: 'artwork-2' },
            { id: 'artwork-3' }
          ])
        })
      })

      describe('#updateEstimateDisplay', () => {
        it('updates the estimate display', () => {
          initialResponse.auctionArtworks.maxEstimateRangeDisplay.should.eql(50000)
          initialResponse.auctionArtworks.minEstimateRangeDisplay.should.eql(0)
          const updatedEstimateDisplay = auctions(initialResponse, actions.updateEstimateDisplay(100, 20000))
          updatedEstimateDisplay.auctionArtworks.maxEstimateRangeDisplay.should.eql(20000)
          updatedEstimateDisplay.auctionArtworks.minEstimateRangeDisplay.should.eql(100)
        })
      })

      describe('#updateEstimateRangeParams', () => {
        it('updates the estimate range params', () => {
          initialResponse.auctionArtworks.filterParams.estimate_range.should.eql('')
          const updatedEstimateRange = auctions(initialResponse, actions.updateEstimateRangeParams(100, 20000))
          updatedEstimateRange.auctionArtworks.filterParams.estimate_range.should.eql('10000-2000000')
        })
      })

      describe('#updateInitialMediumMap', () => {
        it('sets the initial medium map the first time', () => {
          initialResponse.auctionArtworks.initialMediumMap.should.eql([])
          const updatedMap = [
            { count: 1, name: 'Prints', id: 'prints' },
            { count: 2, name: 'Painting', id: 'painting' },
            { count: 2, name: 'Works On Paper', id: 'works-on-paper' }
          ]
          const updatedInitialMediumMap = auctions(initialResponse, actions.updateInitialMediumMap(updatedMap))
          updatedInitialMediumMap.auctionArtworks.initialMediumMap.should.eql(updatedMap)
          const updatedAgain = auctions(updatedInitialMediumMap, actions.updateInitialMediumMap([]))
          updatedAgain.auctionArtworks.initialMediumMap.should.eql(updatedMap)
        })
      })

      describe('#updateMediumId', () => {
        it('updates the medium id', () => {
          initialResponse.auctionArtworks.filterParams.gene_ids.should.eql([])
          const oneMedium = auctions(initialResponse, actions.updateMediumId('gene-1'))
          oneMedium.auctionArtworks.filterParams.gene_ids.should.eql(['gene-1'])
          const twoMediums = auctions(oneMedium, actions.updateMediumId('gene-2'))
          twoMediums.auctionArtworks.filterParams.gene_ids.should.eql(['gene-1', 'gene-2'])
          const subtractMedium = auctions(twoMediums, actions.updateMediumId('gene-1'))
          subtractMedium.auctionArtworks.filterParams.gene_ids.should.eql(['gene-2'])
          const noMediums = auctions(subtractMedium, actions.updateMediumId('gene-2'))
          noMediums.auctionArtworks.filterParams.gene_ids.should.eql([])
        })

        it('updates the medium ids to none when mediums-all is passed', () => {
          initialResponse.auctionArtworks.filterParams.gene_ids.should.eql([])
          const oneMedium = auctions(initialResponse, actions.updateMediumId('gene-1'))
          oneMedium.auctionArtworks.filterParams.gene_ids.should.eql(['gene-1'])
          const twoMediums = auctions(oneMedium, actions.updateMediumId('gene-2'))
          twoMediums.auctionArtworks.filterParams.gene_ids.should.eql(['gene-1', 'gene-2'])
          const allMediums = auctions(twoMediums, actions.updateMediumId('mediums-all'))
          allMediums.auctionArtworks.filterParams.gene_ids.should.eql([])
        })
      })

      describe('#updatePage', () => {
        it('updates the page param', () => {
          initialResponse.auctionArtworks.filterParams.page.should.eql(1)
          const incrementedPage = auctions(initialResponse, actions.updatePage(false))
          incrementedPage.auctionArtworks.filterParams.page.should.eql(2)
          const furtherIncrementedPage = auctions(incrementedPage, actions.updatePage(false))
          furtherIncrementedPage.auctionArtworks.filterParams.page.should.eql(3)
          const resetPage = auctions(furtherIncrementedPage, actions.updatePage(true))
          resetPage.auctionArtworks.filterParams.page.should.eql(1)
        })
      })

      describe('#updateSortParam', () => {
        it('updates the sort param', () => {
          initialResponse.auctionArtworks.filterParams.sort.should.eql('position')
          const updatedSort = auctions(initialResponse, actions.updateSortParam('-position'))
          updatedSort.auctionArtworks.filterParams.sort.should.eql('-position')
        })
      })

      describe('#updateTotal', () => {
        it('updates the total number of artworks', () => {
          initialResponse.auctionArtworks.total.should.eql(0)
          const updatedTotal = auctions(initialResponse, actions.updateTotal(4000))
          updatedTotal.auctionArtworks.total.should.eql(4000)
        })
      })
    })
  })
})
