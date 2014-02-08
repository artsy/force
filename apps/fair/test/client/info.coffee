_                 = require 'underscore'
benv              = require 'benv'
Backbone          = require 'backbone'
sinon             = require 'sinon'
{ resolve }       = require 'path'
{ fabricate }     = require 'antigravity'
Fair              = require '../../../../models/fair.coffee'
Profile           = require '../../../../models/profile.coffee'
FairInfo          = benv.requireWithJadeify resolve(__dirname, '../../client/info.coffee'), ['infoTemplate']

describe 'FairInfoView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    fair = fabricate 'fair'
    profile = fabricate 'fair_profile'
    @fair = new Fair fair
    @profile = new Profile profile
    benv.render resolve(__dirname, '../../templates/index.jade'), {
      sd      : { FAIR: fair, PROFILE: profile }
      fair    : @fair
      profile : @profile
    }, =>
      $('body').html '<div id="fair"></div>'
      @view = new FairInfo { el: $('#fair'), model: @profile, fair: @fair }
      done()

  describe '#initialize', ->

    beforeEach ->
      @view.initialize({ el: $('body'), fair: @fair })

    it 'doesnt render anything if there are no results', ->
      html = @view.$el.html()
      html.should.not.include 'undefined'
      html.should.not.include '#{'
      html.should.include 'maps.google'
