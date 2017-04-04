template = require('jade').compileFile(require.resolve '../template.jade')
cheerio = require 'cheerio'
moment = require 'moment'
ViewHelpers = require('../helpers.coffee')

fixture = -> [
  {
    "id": "56ba482e8b3b8167d7000000",
    "sale_artwork": {
      "id": "ed-ruscha-cockroaches-from-insects-portfolio",
      "lot_label": "10",
      "counts": {
        "bidder_positions": 5,
      },
      "highest_bid": {
        "amount": "$4,000"
      },
      "sale_id": "mauction-evening-sale",
      "sale": {
        "end_at": "2016-10-31T04:28:00+00:00",
        "live_start_at": null
      },
      "artwork": {
        "image": {
          "url": "https://d32dm0rphc51dk.cloudfront.net/0-AL7CEZ5IDjCWdNxwjmBg/tall.jpg"
        },
        "href": "/artwork/ed-ruscha-cockroaches-from-insects-portfolio",
        "artist": {
          "name": "Ed Ruscha"
        }
      }
    }
  }
]

describe 'My Active Bids template', ->
  beforeEach ->
    @locals =
      myActiveBids: fixture()
      ViewHelpers: ViewHelpers
      accounting: formatMoney: (s) -> s

  it 'renders highest bid if user is leading bidder and reserve met\
      bidder position match', ->
    @locals.myActiveBids[0].is_leading_bidder = true
    @locals.myActiveBids[0].sale_artwork.reserve_status = 'reserve_met'
    $ = cheerio.load(template(@locals))
    $('.bid-status').text().should.containEql 'Highest Bid'
    $('.bid-status__is-winning').length.should.equal 1

  it 'renders highest bid if leading bidder and reserve not met \
      bidder position do not match', ->
    @locals.myActiveBids[0].is_leading_bidder = true
    @locals.myActiveBids[0].sale_artwork.reserve_status = 'reserve_not_met'
    $ = cheerio.load(template(@locals))
    $('.bid-status').text().should.containEql 'Highest Bid'
    $('.bid-status__is-winning-reserve-not-met').length.should.equal 1

  it 'renders losing if not leading bidder & reserve not met', ->
    @locals.myActiveBids[0].is_leading_bidder = false
    @locals.myActiveBids[0].sale_artwork.reserve_status = 'reserve_not_met'
    $ = cheerio.load(template(@locals))
    $('.bid-status').text().should.containEql 'Outbid'
    $('.bid-status__is-losing').length.should.equal 1

  it 'renders losing if not leading bidder & reserve is met', ->
    @locals.myActiveBids[0].is_leading_bidder = false
    @locals.myActiveBids[0].sale_artwork.reserve_status = 'reserve_met'
    $ = cheerio.load(template(@locals))
    $('.bid-status').text().should.containEql 'Outbid'
    $('.bid-status__is-losing').length.should.equal 1

  it 'does not render bid status for open live sale', ->
    @locals.myActiveBids[0].sale_artwork.sale.live_start_at = moment().subtract(1, 'day').format()
    @locals.myActiveBids[0].sale_artwork.sale.is_live_open = true
    @locals.myActiveBids[0].sale_artwork.sale.end_at = null
    $ = cheerio.load(template(@locals))
    $('.bid-status').length.should.eql 0
    $('.my-active-bids-bid-live-button').length.should.eql 1
    $('.my-active-bids-bid-live-button').text().should.containEql 'Bid Live'
    $('.my-active-bids-bid-live-button').attr('href')
      .should.containEql('mauction-evening-sale')
