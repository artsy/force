_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../models/current_user'
Artwork = require '../../../models/artwork'
ArtworkInquiry = require '../../../models/artwork_inquiry'
openInquiryQuestionnaireFor = rewire '../index'

describe 'openInquiryQuestionnaireFor', ->
  before (done) ->
    sinon.stub _, 'defer', (cb) -> cb()

    @InquiryQuestionnaireView = openInquiryQuestionnaireFor.__get__ 'InquiryQuestionnaireView'
    @render = sinon.stub @InquiryQuestionnaireView::, 'render', -> this

    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      $.support.transition = end: 'transitionend'
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end
      done()

  after ->
    _.defer.restore()
    benv.teardown()
    @render.restore()

  beforeEach ->
    sinon.stub Backbone, 'sync'

    @user = new CurrentUser fabricate 'user'
    @artwork = new Artwork fabricate 'artwork'
    @inquiry = new ArtworkInquiry

    @modal = openInquiryQuestionnaireFor
      user: @user
      inquiry: @inquiry
      artwork: @artwork

  afterEach ->
    Backbone.sync.restore()

  it 'opens the modal', ->
    @modal.opened.should.be.true()

  describe 'abort', ->
    it 'aborts without error, clearing the logger', (done) ->
      logger = @modal.subView.logger
      sinon.spy logger, 'reset'
      @modal.view.once 'closed', -> _.partial(_.delay, _, 2) ->
        logger.reset.called.should.be.true()
        logger.reset.reset()
        done()
      @modal.subView.state.trigger 'abort'

