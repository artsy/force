_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ stubChildClasses } = require '../../../../test/helpers/stubs'

describe 'ArticleIndexView', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      $.fn.waypoint = sinon.stub()
      Backbone.$ = $
      $el = $('<div></div>')
      @GalleryInsightsView = benv.require resolve(
        __dirname, '../../client/gallery_insights')
      stubChildClasses @GalleryInsightsView, this,
        ['CTABarView']
        ['previouslyDismissed', 'render', 'transitionIn', 'transitionOut']
      @CTABarView::render.returns $el
      @view = new @GalleryInsightsView el: $el
      done()

  after ->
    benv.teardown()

  describe '#eligibleToSignUp', ->

    it 'checks if in article or vertical of Gallery Insights', ->
      @GalleryInsightsView.__set__ 'sd',
        GALLERY_INSIGHTS_SECTION_ID: 'foo'
        ARTICLE: null
        SECTION: null
      @view.eligibleToSignUp().should.not.be.ok

  describe '#setupCTAWaypoints', ->

    it 'only sets up waypoints for vertical page if in vertical page', ->
      @GalleryInsightsView.__set__ 'sd',
        GALLERY_INSIGHTS_SECTION_ID: 'foo'
        ARTICLE: null
        SECTION: { id: 'foo' }
      @view.setupCTAWaypoints()
      _($.fn.waypoint.thisValues).chain().last(2).pluck('selector').value()
        .join().should.not.containEql '.article-container'
