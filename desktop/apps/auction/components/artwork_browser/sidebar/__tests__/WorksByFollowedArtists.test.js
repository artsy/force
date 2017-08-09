import React from 'react'
import renderTestComponent from 'desktop/apps/auction/__tests__/utils/renderTestComponent'
import { test, __RewireAPI__ } from 'desktop/apps/auction/components/artwork_browser/sidebar/WorksByFollowedArtists'
import sinon from 'sinon'

const { WorksByFollowedArtists } = test

describe('auction/components/artwork_browser/sidebar/WorksByFollowedArtists.test', () => {
  describe('<WorksByFollowedArtists />', () => {
    const GridArtwork = () => <div />
    const prevSpy = sinon.spy()
    const nextSpy = sinon.spy()

    const props = {
      previousPageOfFollowedArtistArtworksAction: prevSpy,
      nextPageOfFollowedArtistArtworksAction: nextSpy,
      displayedSaleArtworks: [{ id: 1 }, { id: 2 }, { id: 3 }]
    }

    beforeEach(() => {
      __RewireAPI__.__Rewire__('GridArtwork', GridArtwork)
    })

    afterEach(() => {
      __RewireAPI__.__ResetDependency__('GridArtwork')
    })

    it('renders a label', () => {
      const { wrapper } = renderTestComponent({
        Component: WorksByFollowedArtists,
        props
      })

      wrapper.html().should.containEql('Works By Artists You Follow')
    })

    it('disables prev button clicks', () => {
      const { wrapper } = renderTestComponent({
        Component: WorksByFollowedArtists,
        props: {
          ...props,
          followedArtistRailPage: 1
        }
      })

      wrapper.find('.auction-WorksByFollowedArtists__page-left .disabled').length.should.eql(1)
    })

    it('disables next button clicks', () => {
      const { wrapper } = renderTestComponent({
        Component: WorksByFollowedArtists,
        props: {
          ...props,
          isOnlyFollowedArtistsPage: true
        }
      })

      wrapper.find('.auction-WorksByFollowedArtists__page-right .disabled').length.should.eql(1)
    })

    it('triggers a previousPageAction onClick', () => {
      const { wrapper } = renderTestComponent({
        Component: WorksByFollowedArtists,
        props: {
          ...props,
          followedArtistRailPage: 0
        }
      })

      wrapper.find('.auction-WorksByFollowedArtists__page-left').simulate('click')
      prevSpy.called.should.eql(true)
    })

    it('triggers a nextPage action onClick', () => {
      const { wrapper } = renderTestComponent({
        Component: WorksByFollowedArtists,
        props: {
          ...props,
          isOnlyFollowedArtistsPage: false
        }
      })

      wrapper.find('.auction-WorksByFollowedArtists__page-right').simulate('click')
      nextSpy.called.should.eql(true)
    })

    it('renders a list of grid artworks', () => {
      const { wrapper } = renderTestComponent({
        Component: WorksByFollowedArtists,
        props
      })

      wrapper.find(GridArtwork).length.should.eql(3)
    })
  })
})
