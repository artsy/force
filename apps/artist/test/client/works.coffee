_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
{ stubChildClasses } = require '../../../../test/helpers/stubs'
Artist = require '../../../../models/artist'

describe 'WorksView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @WorksView = benv.requireWithJadeify resolve(__dirname, '../../client/views/works'), ['template']
      @model = new Artist fabricate 'artist', id: 'foo-bar', published_artworks_count: 1
      done()

  after ->
    benv.teardown()

  beforeEach ->
    sinon.stub _, 'defer', (cb) -> cb()
    sinon.stub Backbone, 'sync'
    @WorksView.__set__ 'splitTestInterface', -> 'fillwidth'
    stubChildClasses @WorksView, this,
      ['FillwidthView']
      ['render', 'nextPage', 'remove']
    @view = new @WorksView model: @model
    @view.sortBy = '-published_at'

  afterEach ->
    _.defer.restore()
    Backbone.sync.restore()
    @view.remove()

  describe '#render', ->
    it 'renders the template', ->
      @view.render()
      @view.$('#artwork-section').length.should.equal 1
      @view.$('.bordered-pulldown-text').text().should.equal 'Recently Added'

  describe '#postRender', ->
    beforeEach ->
      @view.render()

    it 'sets up fillwidth views with collections pointing to for sale and not for sale works', ->
      view1Opts = @FillwidthView.args[0][0]
      view2Opts = @FillwidthView.args[1][0]
      view1Opts.fetchOptions['filter[]'].should.equal 'for_sale'
      view2Opts.fetchOptions['filter[]'].should.equal 'not_for_sale'
      view1Opts.collection.url.should.containEql '/artworks'
      view2Opts.collection.url.should.containEql '/artworks'

    describe 'sorting', ->
      it 'passes the correct sort option into setupArtworks when sorting by Recently Added, and updates the picker', ->
        $fixture = $ """
          <div class="bordered-pulldown-options">
            <a data-sort="-published_at">Recently Added<a>
          </div>
        """
        @view.onSortChange currentTarget: $fixture.find('a')
        @view.sortBy.should.equal '-published_at'
        @view.$el.find('.bordered-pulldown-toggle').html().should.containEql 'Recently Added'

      it 'passes the correct sort option into setupArtworks when sorting by Relevance', ->
        $fixture = $ """
          <div class="bordered-pulldown-options">
            <a data-sort>Relevance<a>
          </div>
        """
        @view.onSortChange currentTarget: $fixture.find('a')
        @view.sortBy.should.equal ''
