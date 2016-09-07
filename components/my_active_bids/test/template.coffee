template = require('jade').compileFile(require.resolve '../template.jade')
fixture = -> [
  {
    "id": "56ba482e8b3b8167d7000000",
    "sale_artwork": {
      "id": "ed-ruscha-cockroaches-from-insects-portfolio",
      "lot_number": "10",
      "counts": {
        "bidder_positions": 5,
      },
      "highest_bid": {
        "amount": "$4,000"
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
      accounting: formatMoney: (s) -> s

  it 'renders highest bid if the highest_bid on the sale artwork and \
      bidder positon match', ->
    @locals.myActiveBids[0].is_highest_bidder = true
    template(@locals).should.containEql 'Highest Bid'

  it 'renders losing if the highest_bid on the sale artwork and \
      bidder positon do not match', ->
    @locals.myActiveBids[0].is_highest_bidder = false
    template(@locals).should.containEql 'Outbid'
