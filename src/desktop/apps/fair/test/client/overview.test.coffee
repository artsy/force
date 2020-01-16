_ = require 'underscore'
sd = require('sharify').data
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
moment = require 'moment'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
Fair = require '../../../../models/fair.coffee'

xdescribe 'ForYouView', ->

  before (done) ->
    benv.setup =>
      sd.API_URL = 'localhost:3003'

      sd.CURRENT_PATH = ""
      sd.CURRENT_USER = "hello"
      sd.NODE_ENV = "test"
      benv.expose { $: benv.require 'jquery' }
      sinon.stub Backbone, 'sync'
      @OverviewView = require '../../client/overview.coffee'
      Backbone.$ = $

      @fair = new Fair fabricate 'fair'
      done()

  after ->
    benv.teardown()
    Backbone.sync.restore()
    sd.CURRENT_USER = undefined

  describe '#initialize', ->

    it "renders personalized artist list", ->
      view = new @OverviewView
        el: $("""<div>
            <div class='clock'></div>
            <div class='container-left'><div class='large-section-subheading'></div></div>
            </div>""")
        fair: @fair
        model: @model

      Backbone.sync.args[0][2].success { time: moment().subtract('minutes', 2).format("YYYY-MM-DD HH:mm:ss ZZ") }
      Backbone.sync.args[1][2].success [{artist: fabricate('artist')}]
      Backbone.sync.args[2][2].success []

      view.$el.html().should.not.containEql 'undefined'
      view.$el.html().should.not.containEql "\#{"
      view.$el.html().should.not.containEql "NaN"

      view.$('.container-left .large-section-subheading').length.should.equal 1
      view.$('.container-left .large-section-subheading').text().should.containEql 'Pablo Picasso'
