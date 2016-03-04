_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ stubChildClasses } = require '../../../../test/helpers/stubs'

describe 'EditorialSignupView', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      $.fn.waypoint = sinon.stub()
      sinon.stub($, 'ajax')
      Backbone.$ = $
      $el = $('<div><div class="article-es-header"></div></div>')
      @EditorialSignupView = benv.require resolve(
        __dirname, '../../client/editorial_signup')
      stubChildClasses @EditorialSignupView, this,
        ['CTABarView']
        ['previouslyDismissed', 'render', 'transitionIn', 'transitionOut', 'close']
      @CTABarView::render.returns $el
      @setupCTAWaypoints = sinon.stub @EditorialSignupView::, 'setupCTAWaypoints'
      @view = new @EditorialSignupView el: $el
      done()

  after ->
    $.ajax.restore()
    @setupCTAWaypoints.restore()
    benv.teardown()

  describe '#initialize', ->

    it 'returns if page does not come from social or search traffic', ->
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: author_id: '123'
        ARTSY_EDITORIAL_ID: '123'
        SUBSCRIBED_TO_EDITORIAL: false
        MEDIUM: 'unknown'
      @view.initialize()
      @setupCTAWaypoints.called.should.be.false()

  describe '#eligibleToSignUp', ->

    it 'checks is not in editorial article or magazine', ->
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: null
        SUBSCRIBED_TO_EDITORIAL: false
        CURRENT_PATH: ''
      @view.eligibleToSignUp().should.not.be.ok()

    it 'checks if in article or magazine', ->
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: null
        SUBSCRIBED_TO_EDITORIAL: false
        CURRENT_PATH: '/articles'
      @view.eligibleToSignUp().should.be.ok()

  describe '#setupCTAWaypoints', ->

    it 'only sets up waypoints for editorial article page', ->
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: author_id: '123'
        ARTSY_EDITORIAL_ID: '123'
        SUBSCRIBED_TO_EDITORIAL: false
        MEDIUM: 'social'
      @view.initialize()
      @setupCTAWaypoints.called.should.be.true()

  describe '#onSubscribe', ->

    it 'removes the form when successful', ->
      $.ajax.yieldsTo('success')
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: author_id: '123'
        ARTSY_EDITORIAL_ID: '123'
        SUBSCRIBED_TO_EDITORIAL: false
        MEDIUM: 'social'
      @view.onSubscribe({currentTarget: $('<div></div>')})
      @view.$el.children('.article-es-header').css('display').should.containEql 'none'

    it 'removes the loading spinner if there is an error', ->
      $.ajax.yieldsTo('error')
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: author_id: '123'
        ARTSY_EDITORIAL_ID: '123'
        SUBSCRIBED_TO_EDITORIAL: false
        MEDIUM: 'social'
      $subscribe = $('<div></div>')
      @view.onSubscribe({currentTarget: $subscribe})
      $($subscribe).hasClass('loading-spinner').should.be.false()
