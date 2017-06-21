// FIXME: Reenable

// require('babel-core/register')
// require('coffee-script/register')
// import $ from 'jquery'
// import moment from 'moment'
// import benv from 'benv'
// import { fabricate } from 'antigravity'
// import Auction from 'desktop/models/auction.coffee'
// import CurrentUser from 'desktop/models/current_user.coffee'
// import MyActiveBidsView from 'desktop/components/my_active_bids/view.coffee'
// import Backbone from 'backbone'
// import { data as sd } from 'sharify'
//
// const template = require('jade').compileFile(require.resolve('desktop/apps/auction2/components/page/my_active_bids.jade'))
//
// describe('my active bids auction page template', () => {
//   let view
//
//   before((done) => {
//     benv.setup(() => {
//       benv.expose({$: benv.require('jquery'), jQuery: benv.require('jquery')})
//       sd.PREDICTION_URL = 'http://live-test.artsy.net'
//       Backbone.$ = $
//       view = new MyActiveBidsView({template: template})
//       done()
//     })
//   })
//
//   after(() => {
//     benv.teardown()
//   })
//
//   describe('my_active_bids', () => {
//     describe('no user', () => {
//       before(() => {
//         view.auction = new Auction(fabricate('sale', { name: 'An Auction', auction_state: 'open', live_start_at: moment().subtract(1, 'day').format() }))
//         view.bidderPositions = {}
//         view.user = null
//         view.render()
//       })
//
//       it('does not display anything', () => {
//         view.$('h2').should.have.lengthOf(0)
//       })
//     })
//
//     describe('user but no bids', () => {
//       before(() => {
//         view.auction = new Auction(fabricate('sale', { name: 'An Auction', auction_state: 'open', live_start_at: moment().subtract(1, 'day').format() }))
//         view.bidderPositions = {}
//         view.user = null
//         view.render()
//       })
//
//       it('does not display anything', () => {
//         view.$('h2').should.have.lengthOf(0)
//       })
//     })
//
//     describe('with a user and bids', () => {
//       before(() => {
//         view.auction = new Auction(fabricate('sale', { name: 'An Auction', auction_state: 'open', live_start_at: moment().subtract(1, 'day').format() }))
//         view.bidderPositions = [
//           {
//             'is_leading_bidder': false,
//             'sale_artwork': {
//               'id': 'imhuge-brillo-condensed-soap',
//               'lot_label': '2',
//               'reserve_status': 'no_reserve',
//               'counts': {
//                 'bidder_positions': 1
//               },
//               'sale_id': 'juliens-auctions-street-and-contemporary-art-day-sale',
//               'highest_bid': {
//                 'display': '$750'
//               },
//               'sale': {
//                 'end_at': '2016-10-31T04:28:00+00:00'
//               },
//               'artwork': {
//                 'href': '/artwork/imhuge-brillo-condensed-soap',
//                 'title': 'Brillo Condensed Soap',
//                 'date': '2016',
//                 'image': {
//                   'url': 'https://d32dm0rphc51dk.cloudfront.net/G5tbqHUjuiGvjwDtCVlsGQ/square.jpg'
//                 },
//                 'artist': {
//                   'name': 'Imhuge'
//                 }
//               }
//             }
//           }
//         ]
//         view.user = new CurrentUser({ id: 'user' })
//         view.render()
//       })
//       it('displays an outbid bid status', () => {
//         view.$('h2').should.have.lengthOf(1)
//         view.$('.bid-status').should.have.lengthOf(1)
//         view.$('.bid-status').text().should.containEql('Outbid')
//         view.$('.auction-my-active-bids__bid-button').should.have.lengthOf(1)
//         view.$('.auction-my-active-bids__bid-button').text().should.containEql('Bid')
//       })
//     })
//   })
// })
