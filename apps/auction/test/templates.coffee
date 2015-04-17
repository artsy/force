_ = require 'underscore'
benv = require 'benv'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Auction = require '../../../models/auction'
Profile = require '../../../models/profile'
CurrentUser = require '../../../models/current_user'
Artworks = require '../../../collections/artworks'
SaleArtworks = require '../../../collections/sale_artworks'
Articles = require '../../../collections/articles'
State = require '../../../components/auction_artworks/models/state'

describe 'auction templates', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'

      data =
        sd: {}
        asset: ->
        auction: @auction = new Auction fabricate('sale', name: 'An Auction')
        artworks: @artworks = new Artworks _.times 2, -> fabricate 'artwork'
        saleArtworks: @saleArtworks = new SaleArtworks _.times 2, -> fabricate 'sale_artwork'
        articles: @articles = new Articles
        user: @user = new CurrentUser
        state: @state = new State

      benv.render resolve(__dirname, '../templates/index.jade'), data, =>
        done()

  after ->
    benv.teardown()

  describe 'index', ->
    it 'renders correctly', ->
      $('.auction-title').text().should.equal 'An Auction'
      $('.js-register-button').text().should.equal 'Register to bid'
      $('.auction-grid-artwork').should.have.lengthOf 2
