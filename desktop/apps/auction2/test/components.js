require('babel-core/register')
require('coffee-script/register')
import * as actions from '../actions'
import auctions from '../reducers'
import ArtistFilter from '../components/artist_filter'
import AuctionGridArtwork from '../components/auction_grid_artwork'
import AuctionListArtwork from '../components/auction_list_artwork'
import FilterSort from '../components/filter_sort'
import MediumFilter from '../components/medium_filter'
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
        lot_number: 2,
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
      const renderedArtwork = renderToString(AuctionGridArtwork({ saleArtwork }))
      renderedArtwork.should.containEql('<em>My Artwork</em>, 2002')
    })

    it('renders an auction list artwork component', () => {
      const renderedArtwork = renderToString(AuctionListArtwork({ saleArtwork }))
      renderedArtwork.should.containEql('<em>My Artwork</em>, 2002')
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

  describe('FilterSort', () => {
    it('selects the correct option', () => {
      const wrapper = shallow(
        <Provider><FilterSort store={initialStore} /></Provider>
      )
      wrapper.render().find('.bordered-pulldown-text').text().should.eql('Lot Number (asc.)')
    })
  })
})
