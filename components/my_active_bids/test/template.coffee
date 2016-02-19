template = require('jade').compileFile(require.resolve '../template.jade')
fixture = -> [
  {
    "id": "56ba482e8b3b8167d7000000",
    "display_max_bid_amount_dollars": "$4,000",
    "highest_bid": {
      "id": "56ba482febad644caf000000"
    },
    "sale_artwork": {
      "id": "ed-ruscha-cockroaches-from-insects-portfolio",
      "lot_number": "10",
      "bidder_positions_count": 5,
      "highest_bid": {
        "id": "56ba482febad644caf000000"
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

  it 'renders highest bid if the highest_bid on the sale artwork and \
      bidder positon match', ->
    data = fixture()
    data[0].is_winning = true
    template(myActiveBids: data).should.containEql 'Highest Bid'

  it 'renders losing if the highest_bid on the sale artwork and \
      bidder positon do not match', ->
    data = fixture()
    data[0].is_winning = false
    template(myActiveBids: data).should.containEql 'Outbid'
