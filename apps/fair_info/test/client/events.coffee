_ = require 'underscore'
benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Fair = require '../../../../models/fair.coffee'
Profile = require '../../../../models/profile.coffee'
FairEvent = require '../../../../models/fair_event.coffee'
FairEvents = require '../../../../collections/fair_events.coffee'


describe 'FairInfoEventsView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      @FairInfoEventsView = require '../../client/events.coffee'
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
    benv.render resolve(__dirname, '../../templates/events.jade'), {
      sd: { FAIR: fair, PROFILE: profile, CURRENT_PATH: '/info2/events' }
      fair: @fair
      profile: @profile
      asset: (->)
      sortedEvents: {
        Saturday:
          [ @fair_event ]
      }
    }, =>
      sinon.stub(@FairInfoEventsView.prototype, 'initializeBlurb')
      @view = new @FairInfoEventsView { el: $('.fair-info2-body'), model: @profile, fair: @fair }
      done()


  describe '#initialize', ->

    beforeEach ->
      @view.initialize({ el: $('.fair-info2-body'), profile: @profile, fair: @fair })

    it 'displays fair events', ->
      html = @view.$el.html()

      html.should.not.containEql 'undefined'
      html.should.not.containEql 'There are no events.'
      html.should.containEql 'class="fair-info-event-day"'
      html.should.containEql 'Welcome'
