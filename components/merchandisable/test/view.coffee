benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Embedly = require '../../embedly'
MerchandisableView = benv.requireWithJadeify resolve(__dirname, '../view.coffee'), ['template']

describe 'MerchandisableView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @collection = new Backbone.Collection [
      { name: 'Foo', external_url: 'http://foo.bar' }
      { name: 'Bar', external_url: 'http://bar.baz' }
    ]
    @view = new MerchandisableView collection: @collection

  afterEach ->
    Backbone.sync.restore()

  it 'renders an empty template with a spinner if there are no items yet', ->
    html = @view.render().$el.html()
    html.should.containEql 'loading-spinner'
    html.should.containEql 'Books &amp; Catalogs for purchase'

  it 'plucks and fetches the Embedly response for the URLs in the collection', ->
    Backbone.sync.args[0][1].url.should.equal  'http://api.embed.ly/1/oembed'
    Backbone.sync.args[0][2].data.should.containEql 'urls=http%3A%2F%2Ffoo.bar&urls=http%3A%2F%2Fbar.baz'

  describe 'with Embedly response', ->
    beforeEach ->
      Backbone.sync.restore()
      sinon.stub(Backbone, 'sync').yieldsTo 'success', [
        { thumbnail_url: 'http://thumbnail.jpg', url: 'http://foo.bar' }
        { thumbnail_url: 'http://thumbnail.jpg', url: 'http://bar.baz' }
      ]
      @view.embedly.fetch()

    it 'renders the items', ->
      @view.$el.html().should.not.containEql 'loading-spinner'
      @view.$('.merchandisable-item').length.should.equal 2
      @view.$('.merchandisable-item-title').first().text().should.equal 'Foo'
