_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
Fair = require '../../../../models/fair.coffee'
Profile = require '../../../../models/profile.coffee'
FairEvent = require '../../../../models/fair_event.coffee'
FairEvents = require '../../../../collections/fair_events.coffee'
InfoMenu = require '../../../../components/info_menu/index.coffee'

describe 'FairInfoEventsView', ->

  before (done) ->
    benv.setup ->
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
    @fair_event = new FairEvent fabricate('fair_event'), { fairId: 'armory-show-2013' }
    @fair_events = new FairEvents [@fair_event], { fairId: 'armory-show-2013' }
    @infoMenu = new InfoMenu fair: @fair
    @infoMenu.infoMenu = {
      events: true,
      programming: false,
      artsyAtTheFair: false,
      aboutTheFair: false
    }
    data = { FAIR: fair, PROFILE: profile, CURRENT_PATH: '/info/events' }
    benv.render resolve(__dirname, '../../templates/events.jade'), {
      sd: data
      fair: @fair
      profile: @profile
      asset: (->)
      sortedEvents: {
        Saturday:
          [ @fair_event ]
      }
      infoMenu: @infoMenu.infoMenu
    }, =>
      @FairInfoEventsView = benv.requireWithJadeify resolve(__dirname, '../../client/events'), ['template']
      @FairInfoEventsView.__set__ 'sd', data
      sinon.stub(@FairInfoEventsView.prototype, 'initializeBlurb')
      @view = new @FairInfoEventsView { el: $('.fair-info2-body'), model: @profile, fair: @fair }
      done()

  describe '#initialize', ->
    it 'displays fair events', ->
      html = @view.$el.html()

      html.should.not.containEql 'undefined'
      html.should.not.containEql 'There are no events.'
      html.should.containEql 'class="fair-info-event-day"'
      html.should.containEql 'Welcome'
