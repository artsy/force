import * as actions from 'desktop/apps/auction2/actions/artworkBrowser'
import ArtistFilter from 'desktop/apps/auction2/components/artwork_browser/sidebar/ArtistFilter'
import GridArtwork from 'desktop/apps/auction2/components/artwork_browser/main/artwork/GridArtwork'
import ListArtwork from 'desktop/apps/auction2/components/artwork_browser/main/artwork/ListArtwork'
import FilterSort from 'desktop/apps/auction2/components/artwork_browser/header/FilterSort'
import MediumFilter from 'desktop/apps/auction2/components/artwork_browser/sidebar/MediumFilter'
import RangeSlider from 'desktop/apps/auction2/components/artwork_browser/sidebar/RangeSlider'
import Sidebar from 'desktop/apps/auction2/components/artwork_browser/sidebar/Sidebar'
import auctions from 'desktop/apps/auction2/reducers'
import React from 'react'
import renderTestComponent from 'desktop/apps/auction2/__tests__/utils/renderTestComponent'
import { createStore } from 'redux'

describe('auction/components/artwork_browser/ArtworkBrowser.test.js', () => {
  describe('<ArtworkDisplay />', () => {
    let saleArtwork

    beforeEach(() => {
      saleArtwork = {
        lot_label: '2',
        isClosed: true,
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
      const { wrapper } = renderTestComponent({
        Component: GridArtwork,
        props: {
          artwork: saleArtwork
        }
      })

      wrapper.html().should.containEql('$100')
      wrapper.html().should.containEql('<em>My Artwork</em>, 2002')
    })

    it('renders an auction list artwork component', () => {
      const { wrapper } = renderTestComponent({
        Component: ListArtwork,
        props: {
          artwork: saleArtwork
        }
      })

      wrapper.html().should.containEql('$100')
      wrapper.html().should.containEql('<em>My Artwork</em>, 2002')
    })

    it('renders an auction grid artwork component without a bid status if the auction is closed', () => {
      const { wrapper } = renderTestComponent({
        Component: GridArtwork,
        data: {
          artworkBrowser: {
            isClosed: true
          }
        },
        props: {
          artwork: saleArtwork
        }
      })

      wrapper.html().should.not.containEql('$100')
    })

    it('renders an auction list artwork component without a bid status if the auction is closed', () => {
      const { wrapper } = renderTestComponent({
        Component: ListArtwork,
        data: {
          artworkBrowser: {
            isClosed: true
          }
        },
        props: {
          artwork: saleArtwork
        }
      })

      wrapper.html().should.not.containEql('$100')
    })
  })

  describe('<Sidebar />', () => {
    beforeEach(() => {
      Sidebar.__Rewire__('ArtistFilter', () => <div className='artist-filter' />)
      Sidebar.__Rewire__('MediumFilter', () => <div className='medium-filter' />)
      Sidebar.__Rewire__('RangeSlider', () => <div className='range-slider' />)
    })

    afterEach(() => {
      Sidebar.__ResetDependency__('ArtistFilter')
      Sidebar.__ResetDependency__('MediumFilter')
      Sidebar.__ResetDependency__('RangeSlider')
    })

    it('renders the range filter if the auction is open', () => {
      const { wrapper } = renderTestComponent({
        Component: Sidebar,
        data: {
          artworkBrowser: {
            isClosed: false
          }
        }
      })

      wrapper.find('.medium-filter').length.should.eql(1)
      wrapper.find('.artist-filter').length.should.eql(1)
      wrapper.find('.range-slider').length.should.eql(1)
    })

    it('does not render the range filter if the auction is closed', () => {
      const { wrapper } = renderTestComponent({
        Component: Sidebar,
        data: {
          artworkBrowser: {
            isClosed: true
          }
        }
      })

      wrapper.find('.medium-filter').length.should.eql(1)
      wrapper.find('.artist-filter').length.should.eql(1)
      wrapper.find('.range-slider').length.should.eql(0)
    })
  })

  describe('<ArtistFilter />', () => {
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
        const initialStore = createStore(auctions)
        initialStore.dispatch(actions.updateAggregatedArtists(aggregatedArtists))

        const { wrapper } = renderTestComponent({
          Component: Sidebar,
          store: initialStore
        })

        wrapper.find('.artsy-checkbox').length.should.eql(5)
        const renderedText = wrapper.text()
        renderedText.should.containEql('All')
        renderedText.should.containEql('Artist 1(23)')
        renderedText.should.containEql('Artist 2(44)')
        renderedText.should.containEql('Artist 3(57)')
        wrapper.find('input[value="artists-all"]').props().checked.should.eql(true)
      })
    })

    describe('some artists selected', () => {
      it('checks the correct artist boxes', () => {
        const initialStore = createStore(auctions)
        initialStore.dispatch(actions.updateAggregatedArtists(aggregatedArtists))
        initialStore.dispatch(actions.updateArtistId('artist-1'))

        const { wrapper } = renderTestComponent({
          Component: ArtistFilter,
          store: initialStore
        })

        wrapper.find('.artsy-checkbox').length.should.eql(4)
        const renderedText = wrapper.text()
        renderedText.should.containEql('All')
        renderedText.should.containEql('Artist 1(23)')
        renderedText.should.containEql('Artist 2(44)')
        renderedText.should.containEql('Artist 3(57)')
        wrapper.find('input[value="artists-all"]').props().checked.should.eql(false)
        wrapper.find('input[value="artist-1"]').props().checked.should.eql(true)
      })
    })
  })

  describe('<MediumFilter />', () => {
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
        const initialStore = createStore(auctions)
        initialStore.dispatch(actions.updateInitialMediumMap(aggregatedMediums))
        initialStore.dispatch(actions.updateAggregatedMediums(aggregatedMediums))

        const { wrapper } = renderTestComponent({
          Component: MediumFilter,
          store: initialStore
        })

        wrapper.find('.artsy-checkbox').length.should.eql(4)
        const renderedText = wrapper.text()
        renderedText.should.containEql('All')
        renderedText.should.containEql('Painting(23)')
        renderedText.should.containEql('Works on Paper(44)')
        renderedText.should.containEql('Design(57)')
        wrapper.find('input[value="mediums-all"]').props().checked.should.eql(true)
      })
    })

    describe('some mediums selected', () => {
      it('checks the correct medium boxes', () => {
        const initialStore = createStore(auctions)
        initialStore.dispatch(actions.updateInitialMediumMap(aggregatedMediums))
        initialStore.dispatch(actions.updateAggregatedMediums(aggregatedMediums))
        initialStore.dispatch(actions.updateMediumId('painting'))

        const { wrapper } = renderTestComponent({
          Component: MediumFilter,
          store: initialStore
        })

        wrapper.find('.artsy-checkbox').length.should.eql(4)
        const renderedText = wrapper.text()
        renderedText.should.containEql('All')
        renderedText.should.containEql('Painting(23)')
        renderedText.should.containEql('Works on Paper(44)')
        renderedText.should.containEql('Design(57)')
        wrapper.find('input[value="mediums-all"]').props().checked.should.eql(false)
        wrapper.find('input[value="painting"]').props().checked.should.eql(true)
      })
    })
  })

  describe('<RangeSlider />', () => {
    it('renders the range correctly initially', () => {
      const { wrapper } = renderTestComponent({
        Component: RangeSlider
      })

      wrapper.find('.auction2-range-slider__caption').length.should.eql(1)
      wrapper.text().should.containEql('$0 - 50,000+')
    })

    it('renders the range correctly for a middle bucket', () => {
      const initialStore = createStore(auctions)
      initialStore.dispatch(actions.updateEstimateDisplay(200, 4000))

      const { wrapper } = renderTestComponent({
        Component: RangeSlider,
        store: initialStore
      })

      wrapper.find('.auction2-range-slider__caption').length.should.eql(1)
      wrapper.text().should.containEql('$200 - 4,000')
    })
    it('renders the range correctly for an upper bucket', () => {
      const initialStore = createStore(auctions)
      initialStore.dispatch(actions.updateEstimateDisplay(500, 50000))

      const { wrapper } = renderTestComponent({
        Component: RangeSlider,
        store: initialStore
      })

      wrapper.find('.auction2-range-slider__caption').length.should.eql(1)
      wrapper.text().should.containEql('$500 - 50,000+')
    })
  })

  describe('<FilterSort />', () => {
    it('selects the correct option', () => {
      const { wrapper } = renderTestComponent({
        Component: FilterSort
      })

      wrapper.find('.bordered-pulldown-text').text().should.eql('Lot Number Asc')
    })
  })
})
