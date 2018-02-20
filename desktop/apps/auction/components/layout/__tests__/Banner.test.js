import React from 'react'
import renderTestComponent from 'desktop/apps/auction/__tests__/utils/renderTestComponent'
import moment from 'moment'
import sinon from 'sinon'

const rewire = require('rewire')('../Banner')
const { Banner } = rewire

describe('auction/components/layout/Banner.test', () => {
  beforeEach(() => {
    rewire.__set__('ClockView', () => <div className="auction-clock" />)
  })

  describe('<Banner />', () => {
    it('tracks a click on the "Enter Live Auction" button', () => {
      const liveAuctionUrl = 'live.artsy.net/some-auction-url'
      const mockTrack = sinon.spy()
      window.analytics = { track: mockTrack }
      const { wrapper } = renderTestComponent({
        Component: Banner,
        props: {
          hasEndTime: true,
          isAuction: true,
          isLiveOpen: true,
          liveAuctionUrl,
        },
      })

      wrapper.find('a').simulate('click')
      mockTrack.calledWithMatch('click').should.be.true()
    })

    it('renders a clock if the auction has yet to open for live bidding', () => {
      const { wrapper } = renderTestComponent({
        Component: Banner,
        props: {
          auction: { live_start_at: moment().add(2, 'days') },
          isAuction: true,
          hasEndTime: false,
          isLiveOpen: false,
        },
      })

      wrapper.find('.auction-clock').length.should.eql(1)
    })

    it("renders a clock if the auction hasn't started yet", () => {
      const { wrapper } = renderTestComponent({
        Component: Banner,
        props: {
          auction: {
            live_start_at: moment().add(4, 'days'),
            start_at: moment().add(2, 'days'),
          },
          isAuction: true,
          hasEndTime: false,
          isLiveOpen: false,
        },
      })

      wrapper.find('.auction-clock').length.should.eql(1)
    })

    it('renders an Enter Live Auction banner if isLiveOpen', () => {
      const liveAuctionUrl = 'live.artsy.net/some-auction-url'

      const { wrapper } = renderTestComponent({
        Component: Banner,
        props: {
          isAuction: true,
          hasEndTime: true,
          isLiveOpen: true,
          liveAuctionUrl,
        },
      })

      wrapper.text().should.containEql('Live Bidding Now Open')
      wrapper
        .find('a')
        .html()
        .should.containEql(liveAuctionUrl)
    })

    it('renders a normal banner if not live', () => {
      const { wrapper } = renderTestComponent({
        Component: Banner,
        props: {
          hasEndTime: true,
          isLiveOpen: false,
        },
        options: {
          renderMode: 'render',
        },
      })

      wrapper.find('.auction-clock').length.should.eql(1)
    })

    it('hides clock if no end_at', () => {
      const { wrapper } = renderTestComponent({
        Component: Banner,
        props: {
          hasEndTime: false,
          isLiveOpen: false,
        },
        options: {
          renderMode: 'render',
        },
      })

      wrapper.find('.auction-clock').length.should.eql(0)
    })
  })
})
