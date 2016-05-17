_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
mediator = require '../../../../lib/mediator.coffee'
{ stubChildClasses } = require '../../../../test/helpers/stubs'

describe 'EditorialSignupView', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      $.fn.waypoint = sinon.stub()
      sinon.stub($, 'ajax')
      Backbone.$ = $
      $el = $('<div><div class="article-es-header"></div></div>')
      @EditorialSignupView = benv.requireWithJadeify resolve(__dirname, '../../client/editorial_signup'), ['editorialSignupLushTemplate', 'editorialSignupTemplate']
      stubChildClasses @EditorialSignupView, this,
        ['CTABarView']
        ['previouslyDismissed', 'render', 'transitionIn', 'transitionOut', 'close']
      @CTABarView::render.returns $el
      @CTABarView::previouslyDismissed.returns false
      @setupCTAWaypoints = sinon.spy @EditorialSignupView::, 'setupCTAWaypoints'
      sinon.stub @EditorialSignupView::, 'cycleImages'
      @view = new @EditorialSignupView el: $el
      done()

  after ->
    $.ajax.restore()
    benv.teardown()

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

    it 'does not render CTA bar if page does not come from social or search traffic', ->
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: author_id: '123'
        ARTSY_EDITORIAL_ID: '123'
        SUBSCRIBED_TO_EDITORIAL: false
        MEDIUM: 'unknown'
      @view.initialize()
      mediator.trigger 'auction-reminders:none'
      @setupCTAWaypoints.called.should.not.be.ok()

    it 'only sets up waypoints for editorial article page', ->
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: author_id: '123'
        ARTSY_EDITORIAL_ID: '123'
        SUBSCRIBED_TO_EDITORIAL: false
        MEDIUM: 'social'
      @view.initialize()
      mediator.trigger 'auction-reminders:none'
      @setupCTAWaypoints.called.should.be.ok()

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

  describe 'CTA popup', ->

    it 'is hidden if an auction reminder is visible', ->
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: author_id: '123'
        ARTSY_EDITORIAL_ID: '123'
        SUBSCRIBED_TO_EDITORIAL: false
        MEDIUM: 'social'
      @view.initialize()
      _.defer ->
        @setupCTAWaypoints.called.should.not.be.ok()

    it 'is displayed if there arent any auction reminders', ->
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: author_id: '123'
        ARTSY_EDITORIAL_ID: '123'
        SUBSCRIBED_TO_EDITORIAL: false
        MEDIUM: 'social'
      @view.initialize()
      mediator.trigger 'auction-reminders:none'
      @setupCTAWaypoints.called.should.be.ok()
