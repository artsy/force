_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'
CurrentUser = require '../../../../../models/current_user'
HomeTopRailView = benv.requireWithJadeify resolve(__dirname, '../view'), ['template']
Q = require 'bluebird-q'

describe 'HomeTopRailView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @user = new CurrentUser fabricate 'user'
    sinon.stub HomeTopRailView.prototype, 'fetchAndRender'
    HomeTopRailView.__set__ 'metaphysics', @metaphysics = sinon.stub()
    @metaphysics.returns Q.resolve { me: bidder_positions: [] }
    @view = new HomeTopRailView user: @user, el: $ "<div></div>"
    HomeTopRailView::fetchAndRender.restore()

  afterEach ->
    Backbone.sync.restore()

  describe '#fetchAndRender', ->
    describe 'after collections are fetched', ->
      describe 'with featured works', ->
        beforeEach (done) ->
          @view.fetchAndRender()
          Backbone.sync.args[0][2].success []
          Backbone.sync.args[1][2].success [{ id: 'foo' }]
          Backbone.sync.args[2][2].success [fabricate 'artwork', title: 'Foobar']
          _.defer => _.defer => done()

        it 'renders the artworks', ->
          @view.$('.artwork-item').html().should.containEql 'Foobar'

      describe 'with personalized works', ->
        beforeEach (done) ->
          @metaphysics.returns Q.resolve { me: bidder_positions: [{
            sale_artwork:
              artwork:
                title: "Hello World"
                artist: name: 'Andy Foobar'
                image: url: 'foo.jpg'
          }] }
          @view.fetchAndRender()
          Backbone.sync.args[0][2].success [fabricate 'artwork', title: 'Bar']
          Backbone.sync.args[1][2].success []
          Backbone.sync.args[1][2].success [{ id: 'foo' }]
          Backbone.sync.args[2][2].success []
          _.defer => _.defer => done()

        it 'renders the artworks', ->
          @view.$('.artwork-item').html().should.containEql 'Bar'

        it 'renders your active bids', ->
          @view.$('.my-active-bids-item-details').html()
            .should.containEql 'Andy Foobar'

