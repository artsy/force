import AuctionsBlock from 'desktop/apps/auctions2/components/auctions_block/AuctionsBlock'
import fixtures from 'desktop/apps/auctions2/__tests__/fixtures/auctions_data.json'
import moment from 'moment'
import React from 'react'
import renderTestComponent from 'desktop/apps/auction/__tests__/utils/renderTestComponent'

describe('auctions2/components/auctions_block/AuctionsBlock.test.js', () => {
  describe('<AuctionsBlock />', () => {

    it('renders an auction item', () => {
      const { wrapper } = renderTestComponent({
        Component: AuctionsBlock,
        props: {
          auctions: [fixtures.currentAuctions[0]]
        }
      })
      wrapper.html().should.containEql('<a href="heritage-auctions-the-future-is-now"')
      wrapper.html().should.containEql('Heritage Auctions: The Future is Now')
    })

    describe('Rendering: live', () => {

      it('renders the title', () => {
        const { wrapper } = renderTestComponent({
          Component: AuctionsBlock,
          props: {
            auctions: [],
            liveIntegration: true,
          }
        })
        wrapper.html().should.containEql('Ongoing Live Auctions')
      })

      it('renders the live icon', () => {
        const { wrapper } = renderTestComponent({
          Component: AuctionsBlock,
          props: {
            auctions: [fixtures.currentAuctions[0]],
            liveIntegration: true,
          }
        })
        wrapper.html().should.containEql('<div class="live"')
      })
    })

    describe('Rendering: timed', () => {

      it('renders the title', () => {
        const { wrapper } = renderTestComponent({
          Component: AuctionsBlock,
          props: {
            auctions: fixtures.currentAuctions
          }
        })
        wrapper.html().should.containEql('Ongoing Timed Auctions')
      })

      it('does not render the live icon', () => {
        const { wrapper } = renderTestComponent({
          Component: AuctionsBlock,
          props: {
            auctions: [fixtures.currentAuctions[0]]
          }
        })
        wrapper.html().should.not.containEql('<div class="live"')
      })
    })

    describe('Date formatting', () => {

      it('Renders upcoming registration_ends_at date (hours)', () => {
        fixtures.currentAuctions[0].registration_ends_at = moment().add(3, 'hours')
        fixtures.currentAuctions[0].live_start_at = moment().add(20, 'hours')
        const { wrapper } = renderTestComponent({
          Component: AuctionsBlock,
          props: {
            auctions: [ fixtures.currentAuctions[0] ],
            liveIntegration: true
          }
        })
        wrapper.html().should.containEql('Register by ' + moment(fixtures.currentAuctions[0].registration_ends_at).format('ha'))
      })

      it('Renders upcoming registration_ends_at date (days)', () => {
        fixtures.currentAuctions[0].registration_ends_at = moment().add(3, 'days')
        fixtures.currentAuctions[0].live_start_at = moment().add(20, 'days')
        const { wrapper } = renderTestComponent({
          Component: AuctionsBlock,
          props: {
            auctions: [fixtures.currentAuctions[0]],
            liveIntegration: true
          }
        })
        wrapper.html().should.containEql('Register by ' + moment(fixtures.currentAuctions[0].registration_ends_at).format('MMM D, ha'))
      })

      it('Renders upcoming live_start_at date correctly (minutes)', () => {
        fixtures.currentAuctions[0].registration_ends_at = moment()
        fixtures.currentAuctions[0].live_start_at = moment().add(20, 'minutes')
        const { wrapper } = renderTestComponent({
          Component: AuctionsBlock,
          props: {
            auctions: [fixtures.currentAuctions[0]],
            liveIntegration: true
          }
        })
        wrapper.html().should.containEql('Live in 20 minutes')
      })

      it('Renders upcoming live_start_at date correctly (days)', () => {
        fixtures.currentAuctions[0].registration_ends_at = moment()
        fixtures.currentAuctions[0].live_start_at = moment().add(20, 'hours')
        const { wrapper } = renderTestComponent({
          Component: AuctionsBlock,
          props: {
            auctions: [fixtures.currentAuctions[0]],
            liveIntegration: true
          }
        })
        wrapper.html().should.containEql('Live in 20 hours')
      })

      it('Renders "In Progress" if live auction has started', () => {
        fixtures.currentAuctions[0].end_at = moment().add(2, 'days')
        fixtures.currentAuctions[0].live_start_at = moment().subtract(20, 'hours')
        const { wrapper } = renderTestComponent({
          Component: AuctionsBlock,
          props: {
            auctions: [fixtures.currentAuctions[0]],
            liveIntegration: true
          }
        })
        wrapper.html().should.containEql('In Progress')
      })

      it('Renders upcoming start_at date correctly if timed auction (days)', () => {
        fixtures.currentAuctions[0].start_at = moment().add(4, 'days')
        const { wrapper } = renderTestComponent({
          Component: AuctionsBlock,
          props: {
            auctions: [fixtures.currentAuctions[0]]
          }
        })
        wrapper.html().should.containEql('Live in 4 days')
      })

    })
  })
})