import AuctionGridArtwork from '../components/auction_grid_artwork'
import AuctionListArtwork from '../components/auction_list_artwork'
import { renderToString } from 'react-dom/server'
import auctions from '../reducers'
import * as actions from '../actions'

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
      })

      describe('#updateArtworks', () => {
        it('updates the artworks', () => {
          initialResponse.auctionArtworks.artworks.should.eql([])
          const newArtworks = [{ id: 'artwork-1' }, { id: 'artwork-2' }]
          const updatedArtworks = auctions(initialResponse, actions.updateArtworks(newArtworks))
          updatedArtworks.auctionArtworks.artworks.should.eql(newArtworks)
        })
      })

      describe('#updateEstimateDisplay', () => {
        it('updates the estimate display', () => {
          initialResponse.auctionArtworks.maxEstimateRangeDisplay.should.eql(50000)
          initialResponse.auctionArtworks.minEstimateRangeDisplay.should.eql(50)
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

      describe('#updateSortParam', () => {
        it('updates the sort param', () => {
          initialResponse.auctionArtworks.filterParams.sort.should.eql('lot_number')
          const updatedSort = auctions(initialResponse, actions.updateSortParam('-lot_number'))
          updatedSort.auctionArtworks.filterParams.sort.should.eql('-lot_number')
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
