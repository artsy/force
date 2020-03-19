rewire = require 'rewire'
_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
{ FairsView } = benv.requireWithJadeify resolve(__dirname, '../client/index.coffee'), [
  'pastFairsTemplate'
]
ViewHelpers = require '../helpers/view_helpers.coffee'
moment = require 'moment'
mediator = require '../../../lib/mediator.coffee'

describe 'FairsView', ->

  before (done) ->
    benv.setup ->
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      sinon.spy mediator, 'trigger'
      done()

  after ->
    mediator.trigger.restore()
    benv.teardown()

  beforeEach (done) ->
    @image = { url: "https://www.example.com/cat.jpg" }
    @profile = { is_published: true, icon: { url: "https://www.example.com/cat.jpg" } }
    fair = fabricate('fair', image: @image, profile: @profile)
    @fairs = [fair]
    benv.render resolve(__dirname, '../templates/index.jade'), {
      sd: FAIRS: @fairs
      featuredFairs: @fairs
      currentFairRows: ViewHelpers.currentRows(@fairs)
      upcomingFairs: @fairs
      pastFairs: @fairs
      ViewHelpers: ViewHelpers
      asset: (->)
    }, =>
      @view = new FairsView
        el: $('body')
        user: null
      done()

  describe '#renderPastFairs', ->

    beforeEach ->
      @view.initialize({ el: $('body') })

    it 'appends the additional fair(s)', ->
      @view.$('.fairs__past-fairs-list a').length.should.eql 1
      @view.renderPastFairs [fabricate('fair', is_published: true, has_listing: true, has_full_feature: true, image: @image, profile: @profile, end_at: moment().subtract(10, 'days').format())]
      @view.$('.fairs__past-fairs-list a').length.should.eql 2

  it 'opens the auth modal with expected args', ->
    @view.$('.fairs__promo__sign-up').click()
    mediator.trigger.args[0][0].should.containEql 'open:auth'
    mediator.trigger.args[0][1].mode.should.containEql 'signup'
    mediator.trigger.args[0][1].copy.should.containEql 'Sign up to follow fairs'
