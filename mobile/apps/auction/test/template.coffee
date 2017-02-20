_ = require 'underscore'
benv = require 'benv'
moment = require 'moment'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Auction = require '../../../models/auction'
CurrentUser = require '../../../models/current_user'
Artworks = require '../../../collections/artworks'
SaleArtworks = require '../../../collections/sale_artworks'
State = require '../../../components/auction_artwork_list/state'

describe 'auction templates', ->
  before ->
    @baseData =
      _: require 'underscore'
      sd: {}
      artworks: @artworks = new Artworks _.times 3, -> fabricate 'artwork'
      saleArtworks: @saleArtworks = new SaleArtworks _.times 3, -> fabricate 'sale_artwork'
      user: @user = new CurrentUser
      state: @state = new State
      navItems: [
        { name: 'Lots', hasItems: true }
        { name: 'Sale Info', hasItems: true }
      ]

  describe 'default auction - open', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require 'jquery'

        data = _.extend {}, @baseData,
          auction: @auction = new Auction fabricate 'sale',
            name: 'An Auction'
            start_at: moment().subtract(2, 'days').format()
            end_at: moment().add(2, 'days').format()


        benv.render resolve(__dirname, '../templates/index.jade'), data, =>
          done()

    after ->
      benv.teardown()

    describe 'index', ->
      it 'renders correctly', ->
        $('.auction-title').text().should.equal 'An Auction'
        $('.auction-artwork-list-item').should.have.lengthOf 3

  describe 'default auction - preview', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require 'jquery'

        data = _.extend {}, @baseData,
          auction: @auction = new Auction fabricate('sale',
            name: 'An Auction'
            start_at: moment().add(2, 'days').format()
            end_at: moment().add(4, 'days').format()
            auction_state: 'preview'
          )

        benv.render resolve(__dirname, '../templates/index.jade'), data, =>
          done()

    after ->
      benv.teardown()

    describe 'index', ->
      it 'renders correctly', ->
        $('.auction-title').text().should.equal 'An Auction'
        $('.auction-preview-registration').should.have.lengthOf 1
        $('.auction-artwork-list-item').should.have.lengthOf 0

  describe 'auction promo', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require 'jquery'

        data = _.extend {}, @baseData,
          auction: @auction = new Auction fabricate 'sale', name: 'An Auction Promo', sale_type: 'auction promo'

        benv.render resolve(__dirname, '../templates/index.jade'), data, =>
          done()

    after ->
      benv.teardown()

    describe 'index', ->
      it 'renders correctly', ->
        $('.auction-title').text().should.equal 'An Auction Promo'
        $('.auction-artwork-list-item').should.have.lengthOf 3
        $('body').html().should.containEql 'This is a sale preview. Bidding for this auction does not take place on Artsy.'
