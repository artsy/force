_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
CurrentUser = require '../../../../models/current_user'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'

describe 'OnboardingModal', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../fixtures/favorites.jade'), { sd: {} }, =>
        OnboardingModal = benv.requireWithJadeify(
          resolve(__dirname, '../../client/onboarding_modal')
          ['template']
        )
        OnboardingModal::initialize = sinon.stub()
        @view = new OnboardingModal
          el: $('body')
        done()

  afterEach ->
    benv.teardown()
    Backbone.sync.restore()

  describe '#close', ->

    it 'sets the dismissal cookie so we dont show this too much'