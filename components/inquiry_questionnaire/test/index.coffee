_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
CurrentUser = require '../../../models/current_user'
Artwork = require '../../../models/artwork'
ArtworkInquiry = require '../../../models/artwork_inquiry'
openInquiryQuestionnaireFor = require '../index'

describe 'openInquiryQuestionnaireFor', ->
  before (done) ->
    sinon.stub _, 'defer', (cb) -> cb()
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      $.support.transition = end: 'transitionend'
      $.fn.emulateTransitionEnd = -> @trigger $.support.transition.end
      done()

  after ->
    _.defer.restore()
    benv.teardown()

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
