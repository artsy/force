moment = require 'moment'
_ = require 'underscore'
benv = require 'benv'
{ fabricate } = require 'antigravity'
Auction = require '../../../models/auction'
Profile = require '../../../models/profile'
CurrentUser = require '../../../models/current_user'
Artworks = require '../../../collections/artworks'
SaleArtworks = require '../../../collections/sale_artworks'
Articles = require '../../../collections/articles'
State = require '../../../components/auction_artworks/models/state'
footerItems = require '../footer_items'

describe 'auction templates', ->
  before ->
    @baseData =
      sd: {}
      asset: ->
      artworks: @artworks = new Artworks _.times 2, -> fabricate 'artwork'
      saleArtworks: @saleArtworks = new SaleArtworks _.times 2, -> fabricate 'sale_artwork'
      articles: @articles = new Articles
      user: @user = new CurrentUser
      state: @state = new State
      footerItems: footerItems

  describe 'default auction', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')

        data = _.extend {}, @baseData,
          auction: @auction = new Auction fabricate 'sale', name: 'An Auction'

        benv.render require.resolve('../templates/index.jade'), data, ->
          done()

    after ->
      benv.teardown()

    describe 'index', ->
      it 'renders correctly', ->
        $('.auction-sub-header').should.have.lengthOf 0
        $('.auction-title').text().should.equal 'An Auction'
        $('.js-register-button').text().should.equal 'Register to bid'
        $('.auction-grid-artwork').should.have.lengthOf 2
        $('.garamond-tab').should.have.lengthOf 6
        $('.auction-associated-sale').should.have.lengthOf 0

      it 'shows the correct registration messages', ->
        $('.auction-header-metadata').text().should.containEql 'Register to bid'
        $('.auction-header-metadata').text().should.containEql 'Registration required to bid'

  describe 'auction promo', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')

        data = _.extend {}, @baseData,
          auction: @auction = new Auction fabricate 'sale', name: 'An Auction Promo', sale_type: 'auction promo'

        benv.render require.resolve('../templates/index.jade'), data, ->
          done()

    after ->
      benv.teardown()

    describe 'index', ->
      it 'renders correctly', ->
        $('.auction-sub-header').text().should.equal 'Sale Preview'
        $('.auction-title').text().should.equal 'An Auction Promo'
        $('.auction-grid-artwork').should.have.lengthOf 2
        $('.garamond-tab').should.have.lengthOf 4
        $('.auction-associated-sale').should.have.lengthOf 0

  describe 'with associated sale', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')

        data = _.extend {}, @baseData,
          auction: @auction = new Auction fabricate 'sale', name: 'An Auction', associated_sale: fabricate 'sale', name: 'An Associated Sale'

        benv.render require.resolve('../templates/index.jade'), data, ->
          done()

    after ->
      benv.teardown()

    it 'renders the associated sale stub as well', ->
      $('.auction-associated-sale').should.have.lengthOf 1
      $('.aas-metadata-title').text().should.equal 'An Associated Sale'

  describe 'auction in preview with no user', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
        data = _.extend {}, @baseData,
          auction: @auction = new Auction fabricate 'sale', name: 'An Auction', auction_state: 'preview'
          user: null
        benv.render require.resolve('../templates/index.jade'), data, ->
          done()
    after ->
      benv.teardown()

    it 'shows an email invite', ->
      $('.auction-header-metadata').text().should.containEql 'Receive an email invitation when the auction begins.'

  describe 'live auction', ->
    describe 'live auction that is open for pre-bidding', ->
      before (done) ->
        benv.setup =>
          benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
          data = _.extend {}, @baseData,
            auction: @auction = new Auction fabricate 'sale', name: 'An Auction', auction_state: 'open',  live_start_at: moment().add(2, 'days')
            user: null
          benv.render require.resolve('../templates/index.jade'), data, ->
            done()
      after ->
        benv.teardown()

      it 'shows a timer for when live bidding opens', ->
        $('.auction-callout').text().should.containEql 'Live bidding begins'
        $('.auction-callout').text().should.containEql 'EDT'

    describe 'live auction that is open for live bidding', ->
      before (done) ->
        benv.setup =>
          benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
          data = _.extend {}, @baseData,
            auction: @auction = new Auction fabricate 'sale', name: 'An Auction', auction_state: 'open',  live_start_at: moment().subtract(2, 'days')
            user: null
          benv.render require.resolve('../templates/index.jade'), data, ->
            done()
      after ->
        benv.teardown()

      it 'says live bidding now open', ->
        $('.auction-callout').text().should.containEql 'Live bidding now open'
        $('.auction-callout').text().should.not.containEql 'EDT'

  describe 'open auction with no user', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
        data = _.extend {}, @baseData,
          auction: @auction = new Auction fabricate 'sale', name: 'An Auction'
          user: null
        benv.render require.resolve('../templates/index.jade'), data, ->
          done()

    after ->
      benv.teardown()

    it 'shows an email invite', ->
      $('.auction-header-metadata').text().should.containEql 'Register to bid'

  describe 'user not qualified_for_bidding', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
        data = _.extend {}, @baseData,
          auction: @auction = new Auction fabricate 'sale', name: 'An Auction', auction_state: 'preview'
        data.user.set qualified_for_bidding: false, registered_to_bid: true
        benv.render require.resolve('../templates/index.jade'), data, ->
          done()
    after ->
      benv.teardown()

    it 'shows Registration pending', ->
      $('.auction-header-metadata').text().should.containEql 'Registration pending'
      $('.auction-header-metadata').text().should.containEql 'Reviewing submitted information'

  describe 'user is qualified_for_bidding', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
        data = _.extend {}, @baseData,
          auction: @auction = new Auction fabricate 'sale', name: 'An Auction', auction_state: 'preview'
        data.user.set qualified_for_bidding: true, registered_to_bid: true
        benv.render require.resolve('../templates/index.jade'), data, ->
          done()
    after ->
      benv.teardown()

    it 'shows Approved to bid', ->
      $('.auction-header-metadata').text().should.containEql 'Approved to Bid'

  describe 'registration is closed', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
        data = _.extend {}, @baseData,
          auction: @auction = new Auction fabricate 'sale', name: 'An Auction'
          user: null
        data.auction.set is_auction: true, registration_ends_at: moment().subtract(2, 'days').format()
        benv.render require.resolve('../templates/index.jade'), data, ->
          done()
    after ->
      benv.teardown()

    it 'shows Registration closed', ->
      $('.auction-header-metadata').text().should.containEql 'Registration closed'
      $('.auction-header-metadata').text().should.containEql 'Registration required to bid'
