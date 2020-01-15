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

describe 'FairsView', ->

  before (done) ->
    benv.setup ->
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      done()

  after ->
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
