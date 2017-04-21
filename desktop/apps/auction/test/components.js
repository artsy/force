require('babel-core/register')
require('coffee-script/register')
import * as actions from '../client/actions'
import auctions from '../client/reducers'
import ArtistFilter from '../components/artist_filter'
import AuctionGridArtwork from '../components/auction_grid_artwork'
import AuctionListArtwork from '../components/auction_list_artwork'
import FilterSort from '../components/filter_sort'
import MediumFilter from '../components/medium_filter'
import RangeSlider from '../components/range_slider'
import Sidebar from '../components/sidebar'
import { shallow } from 'enzyme'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

describe('React components', () => {
  let initialStore

  beforeEach(() => {
    initialStore = createStore(auctions)
  })

  describe('AuctionArtwork', () => {
    let saleArtwork

    beforeEach(() => {
      saleArtwork = {
        lot_label: '2',
        current_bid: {
          display: '$100'
        },
        counts: {
          bidder_positions: 2
        },
        artwork: {
          _id: '123',
          title: 'My Artwork',
          date: '2002',
          artists: {
            name: 'Andy Warhol'
          },
          images: [{
            image_url: 'my_image.jpg'
          }]
        }
      }
    })

    it('renders an auction grid artwork component', () => {
      const wrapper = shallow(
        <Provider><AuctionGridArtwork store={initialStore} saleArtwork={saleArtwork} /></Provider>
      )
      wrapper.render().html().should.containEql('$100')
      wrapper.render().html().should.containEql('<em>My Artwork</em>, 2002')
    })

    it('renders an auction list artwork component', () => {
      const wrapper = shallow(
        <Provider><AuctionListArtwork store={initialStore} saleArtwork={saleArtwork} /></Provider>
      )
      wrapper.render().html().should.containEql('$100')
      wrapper.render().html().should.containEql('<em>My Artwork</em>, 2002')
    })

    it('renders an auction grid artwork component without a bid status if the auction is closed', () => {
      const initialStoreClosedAuction = createStore(auctions, { auctionArtworks: { isClosed: true } })
      const wrapper = shallow(
        <Provider><AuctionGridArtwork store={initialStoreClosedAuction} saleArtwork={saleArtwork} /></Provider>
      )
      wrapper.render().html().should.not.containEql('$100')
    })

    it('renders an auction list artwork component without a bid status if the auction is closed', () => {
      const initialStoreClosedAuction = createStore(auctions, { auctionArtworks: { isClosed: true } })
      const wrapper = shallow(
        <Provider><AuctionListArtwork store={initialStoreClosedAuction} saleArtwork={saleArtwork} /></Provider>
      )
      wrapper.render().html().should.not.containEql('$100')
    })
  })

  describe('Sidebar', () => {
    beforeEach(() => {
      Sidebar.__Rewire__('ArtistFilter', React.createClass({ render: () => <div className='artist-filter'></div> }))
      Sidebar.__Rewire__('MediumFilter', React.createClass({ render: () => <div className='medium-filter'></div> }))
      Sidebar.__Rewire__('RangeSlider', React.createClass({ render: () => <div className='range-slider'></div> }))
    })

    afterEach(() => {
      Sidebar.__ResetDependency__('ArtistFilter')
      Sidebar.__ResetDependency__('MediumFilter')
      Sidebar.__ResetDependency__('RangeSlider')
    })

    it('renders the range filter if the auction is open', () => {
      const wrapper = shallow(
        <Provider><Sidebar store={initialStore} /></Provider>
      )
      wrapper.render().find('.medium-filter').length.should.eql(1)
      wrapper.render().find('.artist-filter').length.should.eql(1)
      wrapper.render().find('.range-slider').length.should.eql(1)
    })

    it('does not render the range filter if the auction is closed', () => {
      const initialStoreClosedAuction = createStore(auctions, { auctionArtworks: { isClosed: true } })
      const wrapper = shallow(
        <Provider><Sidebar store={initialStoreClosedAuction} /></Provider>
      )
      wrapper.render().find('.medium-filter').length.should.eql(1)
      wrapper.render().find('.artist-filter').length.should.eql(1)
      wrapper.render().find('.range-slider').length.should.eql(0)
    })
  })

  describe('ArtistFilter', () => {
    let aggregatedArtists

    beforeEach(() => {
      aggregatedArtists = [
        { id: 'artist-1', name: 'Artist 1', count: 23 },
        { id: 'artist-2', name: 'Artist 2', count: 44 },
        { id: 'artist-3', name: 'Artist 3', count: 57 }
      ]
    })

    describe('no artists selected', () => {
      it('contains all of the aggregated artists and checks the artists-all box', () => {
        initialStore.dispatch(actions.updateAggregatedArtists(aggregatedArtists))
        const wrapper = shallow(
          <Provider><ArtistFilter store={initialStore} /></Provider>
        )
        const rendered = wrapper.render()
        rendered.find('.artsy-checkbox').length.should.eql(4)
        const renderedText = rendered.text()
        renderedText.should.containEql('All')
        renderedText.should.containEql('Artist 1(23)')
        renderedText.should.containEql('Artist 2(44)')
        renderedText.should.containEql('Artist 3(57)')
        rendered.find('input[value="artists-all"]:checked').length.should.eql(1)
      })
    })

    describe('some artists selected', () => {
      it('checks the correct artist boxes', () => {
        initialStore.dispatch(actions.updateAggregatedArtists(aggregatedArtists))
        initialStore.dispatch(actions.updateArtistId('artist-1'))
        const wrapper = shallow(
          <Provider><ArtistFilter store={initialStore} /></Provider>
        )
        const rendered = wrapper.render()
        rendered.find('.artsy-checkbox').length.should.eql(4)
        const renderedText = rendered.text()
        renderedText.should.containEql('All')
        renderedText.should.containEql('Artist 1(23)')
        renderedText.should.containEql('Artist 2(44)')
        renderedText.should.containEql('Artist 3(57)')
        rendered.find('input[value="artists-all"]:checked').length.should.eql(0)
        rendered.find('input[value="artist-1"]:checked').length.should.eql(1)
      })
    })
  })

  describe('MediumFilter', () => {
    let aggregatedMediums

    beforeEach(() => {
      aggregatedMediums = [
        { id: 'painting', name: 'Painting', count: 23 },
        { id: 'work-on-paper', name: 'Works on Paper', count: 44 },
        { id: 'design', name: 'Design', count: 57 }
      ]
    })

    describe('no mediums selected', () => {
      it('checks the mediums-all box', () => {
        initialStore.dispatch(actions.updateInitialMediumMap(aggregatedMediums))
        initialStore.dispatch(actions.updateAggregatedMediums(aggregatedMediums))
        const wrapper = shallow(
          <Provider><MediumFilter store={initialStore} /></Provider>
        )
        const rendered = wrapper.render()
        rendered.find('.artsy-checkbox').length.should.eql(4)
        const renderedText = rendered.text()
        renderedText.should.containEql('All')
        renderedText.should.containEql('Painting(23)')
        renderedText.should.containEql('Works on Paper(44)')
        renderedText.should.containEql('Design(57)')
        rendered.find('input[value="mediums-all"]:checked').length.should.eql(1)
      })
    })

    describe('some mediums selected', () => {
      it('checks the correct medium boxes', () => {
        initialStore.dispatch(actions.updateInitialMediumMap(aggregatedMediums))
        initialStore.dispatch(actions.updateAggregatedMediums(aggregatedMediums))
        initialStore.dispatch(actions.updateMediumId('painting'))
        const wrapper = shallow(
          <Provider><MediumFilter store={initialStore} /></Provider>
        )
        const rendered = wrapper.render()
        rendered.find('.artsy-checkbox').length.should.eql(4)
        const renderedText = rendered.text()
        renderedText.should.containEql('All')
        renderedText.should.containEql('Painting(23)')
        renderedText.should.containEql('Works on Paper(44)')
        renderedText.should.containEql('Design(57)')
        rendered.find('input[value="mediums-all"]:checked').length.should.eql(0)
        rendered.find('input[value="painting"]:checked').length.should.eql(1)
      })
    })
  })

  describe('RangeSlider', () => {
    it('renders the range correctly initially', () => {
      const wrapper = shallow(
        <Provider><RangeSlider store={initialStore} /></Provider>
      )
      const rendered = wrapper.render()
      rendered.find('.auction-range-slider__caption').length.should.eql(1)
      const renderedText = rendered.text()
      renderedText.should.containEql('$0 - 50,000+')
    })
    it('renders the range correctly for a middle bucket', () => {
      initialStore.dispatch(actions.updateEstimateDisplay(200, 4000))
      const wrapper = shallow(
        <Provider><RangeSlider store={initialStore} /></Provider>
      )
      const rendered = wrapper.render()
      rendered.find('.auction-range-slider__caption').length.should.eql(1)
      const renderedText = rendered.text()
      renderedText.should.containEql('$200 - 4,000')
    })
    it('renders the range correctly for an upper bucket', () => {
      initialStore.dispatch(actions.updateEstimateDisplay(500, 50000))
      const wrapper = shallow(
        <Provider><RangeSlider store={initialStore} /></Provider>
      )
      const rendered = wrapper.render()
      rendered.find('.auction-range-slider__caption').length.should.eql(1)
      const renderedText = rendered.text()
      renderedText.should.containEql('$500 - 50,000+')
    })
  })

  describe('FilterSort', () => {
    it('selects the correct option', () => {
      const wrapper = shallow(
        <Provider><FilterSort store={initialStore} /></Provider>
      )
      wrapper.render().find('.bordered-pulldown-text').text().should.eql('Lot Number (asc.)')
    })
  })
})
