_ = require 'underscore'
cheerio = require 'cheerio'
path = require 'path'
fs = require 'fs'
jade = require 'jade'
moment = require 'moment'
helpers = require '../helpers'
sinon = require 'sinon'

render = ->
  filename = path.resolve __dirname, "../index.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Auction artworks module', ->
  describe 'when a live sale is in preview', ->
    it 'should show a sale is opening label', ->
      artwork = {
        auction: {
          is_closed: false,
          is_live_open: false,
          is_preview: true,
          name: 'Phillips Prints'
          live_start_at: "2017-08-10T16:00:00+00:00",
          start_at: "2017-08-08T16:00:00+00:00",
          artworks: [{ title: 'My title' }]
        }
      }
      html = render()(
        artwork: artwork
        helpers: {
          auction_artworks: {
            upcomingLabel: helpers.upcomingLabel,
            masonry: () => { columns: [] }
          }
        }
        asset: (->)
        sd:
          ENABLE_EXPERIMENTAL_STITCH_INJECTION: false
      )

      $ = cheerio.load(html)
      $('.artwork-auction-artworks__auction-name').html().should.containEql('Phillips Prints Auction opens ')
