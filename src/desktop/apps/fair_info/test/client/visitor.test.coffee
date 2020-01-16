_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
Fair = require '../../../../models/fair.coffee'
Profile = require '../../../../models/profile.coffee'
FairInfoVisitorsView = require '../../client/visitors.coffee'
InfoMenu = require '../../../../components/info_menu/index.coffee'

describe 'FairInfoVisitorsView', ->

  before (done) ->
    benv.setup ->
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
    @infoMenu = new InfoMenu fair: @fair
    @infoMenu.infoMenu = {
      events: true,
      programming: false,
      artsyAtTheFair: false,
      aboutTheFair: false
    }

    benv.render resolve(__dirname, '../../templates/visitors.jade'), {
      sd: { FAIR: fair, PROFILE: profile, CURRENT_PATH: '/info/visitors' }
      fair: @fair
      profile: @profile
      infoMenu: @infoMenu.infoMenu
      asset: (->)
    }, =>
      @view = new FairInfoVisitorsView { el: $('.fair-info2-body'), model: @fair }
      done()

  afterEach ->
    window.open.restore()

  describe '#showDirections', ->
    it 'opens directions in google', ->
      @view.$('.js-get-directions-link').click()
      window.open.called.should.equal true


