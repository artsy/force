_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'

BookmarksView = benv.requireWithJadeify resolve(__dirname, '../view'), ['template', 'bookmarksTemplate']
BookmarksView.__set__ 'sd', CURRENT_USER: 'existy'

describe 'BookmarksView', ->
  before (done) ->
    benv.setup =>
      Bloodhound = -> ttAdapter: sinon.stub(), initialize: sinon.stub()
      Bloodhound.tokenizers = obj: whitespace: sinon.stub()
      benv.expose
        $: benv.require 'jquery'
        Bloodhound: Bloodhound
      Backbone.$ = $
      $.fn.typeahead = sinon.stub()
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @view = new BookmarksView

  afterEach ->
    Backbone.sync.restore()

  describe '#initialize', ->
    it 'accepts a mode', ->
      view = new BookmarksView mode: 'pre'
      view.$el.html().should.containEql 'is-pre'
      view.$el.html().should.not.containEql 'is-post'

    it 'sets the default mode to "post"', ->
      @view.mode.should.equal 'post'
      @view.$el.html().should.containEql 'is-post'
      @view.$el.html().should.not.containEql 'is-pre'

    describe '#render', ->
      it 'renders the base template', ->
        @view.$el.html().should.containEql 'Add an artist you own work by'

    it 'fetches the bookmarks collection', ->
      Backbone.sync.args[0][0].should.equal 'read'
      Backbone.sync.args[0][1].url.should.containEql '/api/v1/me/bookmark/artists'

    it 'sets up the autocomplete view', ->
      @view.autocomplete.mode.should.equal 'artists'
      @view.autocomplete.$input.length.should.equal 1

  describe '#collect, #renderCollection', ->
    beforeEach ->
      @view.autocomplete.$input.val 'Foo Bar'
      @view.autocomplete.trigger 'search:selected', $.Event('sup'), new Backbone.Model(id: 'foobar', name: 'Foo Bar')

    it 'listens to the autocomplete instance and triggers a collect, which renders the collect', ->
      @view.$('.bookmark-artist').length.should.equal 1
      @view.$('.bookmark-artist-name').text().should.equal 'Foo Bar'

    it 'clears the input', ->
      _.last($.fn.typeahead.args)[0].should.equal 'val'
      _.last($.fn.typeahead.args)[1].should.equal ''

    it 'follows the artist', ->
      @view.following.length.should.equal 1

    it 'fades in the result set', (done) ->
      _.defer =>
        @view.$collection.hasClass('is-fade-in').should.be.true
        done()

  describe '#uncollect', ->
    beforeEach ->
      @view.autocomplete.trigger 'search:selected', $.Event('sup'), new Backbone.Model(id: 'foobar', name: 'Foo Bar')

    it 'removes the bookmark from the collection', ->
      @view.bookmarks.length.should.equal 1
      @view.$('.bookmark-artist-remove').click()
      @view.bookmarks.length.should.equal 0

    it 'rerenders the collection', ->
      @view.$('.bookmark-artist-remove').click()
      @view.$('.bookmark-artist-remove').length.should.equal 0

    it 'destroys the bookmark', ->
      sinon.spy @view.bookmarks.model::, 'destroy'
      @view.$('.bookmark-artist-remove').click()
      @view.bookmarks.model::destroy.called.should.be.true

    it 'unfollows the artist', ->
      @view.following.length.should.equal 1
      @view.$('.bookmark-artist-remove').click()
      @view.following.length.should.equal 0

  describe 'when persist is false', ->
    beforeEach ->
      Backbone.sync.restore()
      sinon.stub Backbone, 'sync'
      @view = new BookmarksView persist: false
      sinon.spy @view.bookmarks, 'newFromArtist'
      sinon.spy @view.bookmarks, 'createFromArtist'
      sinon.spy @view.following, 'follow'

    afterEach ->
      @view.bookmarks.newFromArtist.restore()
      @view.bookmarks.createFromArtist.restore()
      @view.following.follow.restore()

    it 'sets the persist option', ->
      @view.persist.should.be.false

    it 'does not fetch the bookmarks collection', ->
      Backbone.sync.called.should.be.false

    it 'does not persist the bookmark', ->
      @view.autocomplete.trigger 'search:selected', $.Event('sup'), new Backbone.Model(id: 'foobar', name: 'Foo Bar')
      @view.bookmarks.newFromArtist.called.should.be.true
      @view.bookmarks.createFromArtist.called.should.be.false
      Backbone.sync.called.should.be.false

    it 'does not follow the artist', ->
      @view.autocomplete.trigger 'search:selected', $.Event('sup'), new Backbone.Model(id: 'foobar', name: 'Foo Bar')
      @view.following.follow.called.should.be.false

    describe '#saveAll', ->
      beforeEach ->
      it 'saves all the bookmarks', ->
        @view.autocomplete.trigger 'search:selected', $.Event('sup'), new Backbone.Model(id: 'foobar', name: 'Foo Bar')
        @view.autocomplete.trigger 'search:selected', $.Event('sup'), new Backbone.Model(id: 'barbaz', name: 'Bar Baz')
        @view.autocomplete.trigger 'search:selected', $.Event('sup'), new Backbone.Model(id: 'bazqux', name: 'Baz Qux')
        @view.saveAll()
        Backbone.sync.callCount.should.equal 3
