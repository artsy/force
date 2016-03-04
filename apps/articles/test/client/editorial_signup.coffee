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
      Backbone.$ = $
      $el = $('<div></div>')
      @EditorialSignupView = benv.require resolve(
        __dirname, '../../client/editorial_signup')
      stubChildClasses @EditorialSignupView, this,
        ['CTABarView']
        ['previouslyDismissed', 'render', 'transitionIn', 'transitionOut']
      @CTABarView::render.returns $el
      @setupCTAWaypoints = sinon.spy @EditorialSignupView::, 'setupCTAWaypoints'
      @view = new @EditorialSignupView el: $el
      done()

  after ->
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

    it 'only sets up waypoints for editorial article page', ->
      @EditorialSignupView.__set__ 'sd',
        ARTICLE: author_id: '123'
        ARTSY_EDITORIAL_ID: '123'
        SUBSCRIBED_TO_EDITORIAL: false
      @view.initialize()
      @setupCTAWaypoints.called.should.be.true()
