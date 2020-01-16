_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ fabricate } = require '@artsy/antigravity'
Artworks = require '../../../collections/artworks'
CurrentUser = require '../../../models/current_user'
{ resolve } = require 'path'
FillwidthView = benv.requireWithJadeify resolve(__dirname, '../view'), ['template']

describe 'FillwidthView', ->

  before (done) ->
    benv.setup ->
      benv.expose
        $: benv.require 'jquery'
        jQuery: benv.require 'jquery'
      $.fn.fillwidth = sinon.stub()
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    @currentUser = new CurrentUser(id: "user_id", email: "a@b.c")
    window.currentUser = @currentUser
    window.currentUser.initializeDefaultArtworkCollection()
    sinon.stub Backbone, 'sync'
    col = new Artworks [fabricate 'artwork']
    col.url = 'foo/bar'
    @removed = false
    @view = new FillwidthView { el: $('body'), collection: col, empty: (=> @removed = true ) }
    done()

  afterEach ->
    Backbone.sync.restore()

  describe '#render', ->

    it 'renders a row of artworks', ->
      @view.collection.first().set 'title', 'Foo to the Bar'
      @view.render()
      @view.$el.html().should.containEql 'Foo to the Bar'

  describe '#nextPage', ->

    it 'fetches the next page of artworks', ->
      @view.page = 0
      @view.nextPage()
      _.last(Backbone.sync.args)[1].url.should.containEql 'foo/bar'
      _.last(Backbone.sync.args)[2].data.page.should.equal 0
      @view.page.should.equal 1

  describe '#empty', ->

    it 'runs empty if the collection has no items in it', ->
      @view.collection = new Artworks()
      @view.render()
      @removed.should.equal true

  describe '#handleSeeMore', ->

    xit "Hides first row"
    xit "Shows see more if got # of artowrks asked for"
    xit "Shows see more if got fewer artworks than asked but not all fit on row"
