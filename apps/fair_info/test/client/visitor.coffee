_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Fair = require '../../../../models/fair.coffee'
Profile = require '../../../../models/profile.coffee'
FairInfoVisitorsView = require '../../client/visitors.coffee'

describe 'FairInfoVisitorsView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach (done) ->
    sinon.stub(window, 'open')
    fair = fabricate 'fair'
    profile = fabricate 'fair_profile'
    @fair = new Fair fair
    @profile = new Profile profile
    benv.render resolve(__dirname, '../../templates/visitors.jade'), {
      sd: { FAIR: fair, PROFILE: profile, CURRENT_PATH: '/info2/visitors' }
      fair: @fair
      profile: @profile
      asset: (->)
    }, =>
      @view = new FairInfoVisitorsView { el: $('.fair-info2-body'), model: @profile, fair: @fair }
      done()

  afterEach ->
    window.open.restore()

  describe '#initialize', ->

    beforeEach ->
      @view.initialize({ el: $('.fair-info2-body'), profile: @profile, fair: @fair })

    it 'adds map links and image src', ->
      html = @view.$el.html()
      html.should.not.containEql 'undefined'
      html.should.not.containEql '#{'
      html.should.containEql 'maps.google'
      @view.$('.fair-info2-map-link').attr('href').should.equal @fair.location().googleMapsLink()
      @view.$('img.map').attr('src').should.equal @fair.location().mapImageSrc(410, 150, 2, 16)

    it 'opens directions in google', ->
      @view.$('.fair-info2-get-directions-link').click()
      window.open.called.should.equal true