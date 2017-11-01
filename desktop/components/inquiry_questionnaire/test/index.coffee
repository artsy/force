_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../models/current_user'
Artwork = require '../../../models/artwork'
ArtworkInquiry = require '../../../models/artwork_inquiry'
openInquiryQuestionnaireFor = null

describe 'openInquiryQuestionnaireFor', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      $.support.transition = end: 'transitionend'
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end
      sinon.stub(_, 'defer').callsFake (cb) -> cb()
      openInquiryQuestionnaireFor = rewire '../index'

      @StateView = openInquiryQuestionnaireFor.__get__ 'StateView'
      @render = sinon.stub(@StateView::, 'render').callsFake -> this

      @Logger = openInquiryQuestionnaireFor.__get__ 'Logger'

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
      resetSpy = sinon.spy @Logger::, 'reset'

      @modal.view.once 'closed', -> _.partial(_.delay, _, 2) ->
        resetSpy.called.should.be.true()
        resetSpy.restore()
        done()

      @modal.subView.state.trigger 'abort'
