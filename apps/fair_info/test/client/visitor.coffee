_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Fair = require '../../../../models/fair.coffee'
Profile = require '../../../../models/profile.coffee'
embeddedMap = require '../../../../components/embedded_map/index.coffee'
FairInfoVisitorsView = require '../../client/visitors.coffee'
InfoMenu = require '../../info_menu.coffee'

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
    embeddedMap.init = sinon.stub()
    fair = fabricate 'fair'
    profile = fabricate 'fair_profile'
    @fair = new Fair fair
    @profile = new Profile profile
    @infoMenu = new InfoMenu fair: @fair
    @infoMenu.infoMenu = {
      events: true,
      programming: false,
      artsyAtTheFair: false,
      aboutTheFair: false
    }

    benv.render resolve(__dirname, '../../templates/visitors.jade'), {
      sd: { FAIR: fair, PROFILE: profile, CURRENT_PATH: '/info2/visitors' }
      fair: @fair
      profile: @profile
      infoMenu: @infoMenu.infoMenu
      asset: (->)
    }, =>
      @view = new FairInfoVisitorsView { el: $('.fair-info2-body'), model: @profile, fair: @fair }
      done()

  afterEach ->
    window.open.restore()

  describe '#initialize', ->

    beforeEach ->
      @view.initialize({ el: $('.fair-info2-body'), profile: @profile, fair: @fair })

    it 'adds embedded map', ->
      html = @view.$el.html()
      html.should.containEql 'id="fair-info2-map"'

    it 'adds map google link', ->
      @view.$('.fair-info2-map-link').attr('href').should.equal @fair.location().googleMapsLink()

    it 'opens directions in google', ->
      @view.$('.fair-info2-get-directions-link').click()
      window.open.called.should.equal true
