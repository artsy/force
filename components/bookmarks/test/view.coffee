_             = require 'underscore'
benv          = require 'benv'
sinon         = require 'sinon'
Backbone      = require 'backbone'
{ resolve }   = require 'path'

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
    describe '#render', ->
      it 'renders the base template', ->
        @view.$el.html().should.include 'Add an artist you own work by'

    it 'fetches the bookmarks collection', ->
      Backbone.sync.args[0][0].should.equal 'read'
      Backbone.sync.args[0][1].url.should.include '/api/v1/me/bookmark/artists'

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

    it 'destroys the bookmark on the server', ->
      # For whatever reason, I'm not seeing a 'delete' in Backbone.sync...
      sinon.spy @view.bookmarks.model::, 'destroy'
      @view.$('.bookmark-artist-remove').click()
      @view.bookmarks.model::destroy.called.should.be.true

    it 'unfollows the artist', ->
      @view.following.length.should.equal 1
      @view.$('.bookmark-artist-remove').click()
      @view.following.length.should.equal 0

  describe '#trapEnter', ->
    beforeEach ->
      sinon.stub @view.autocomplete.$input, 'triggerHandler'
      (@enter = $.Event 'keydown').keyCode = @enter.which = 13

    it 'traps the enter keydown and selects the first result', ->
      @view.trapEnter @enter
      @view.autocomplete.$input.triggerHandler.callCount.should.equal 2
      @view.autocomplete.$input.triggerHandler.args[0][0].which.should.equal 40
      @view.autocomplete.$input.triggerHandler.args[1][0].which.should.equal 9
