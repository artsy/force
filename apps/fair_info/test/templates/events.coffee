$ = require 'cheerio'
_ = require 'underscore'
{ fabricate } = require 'antigravity'
Profile = require '../../../../models/profile'
Fair = require '../../../../models/fair'
FairEvent = require '../../../../models/fair_event'
FairEvents = require '../../../../collections/fair_events'
template = require('jade').compileFile(require.resolve '../../templates/events.jade')
InfoMenu = require '../../info_menu.coffee'
data = _.extend {}, asset: (->), sd: {CURRENT_PATH: '/info2/events'}, markdown: (->)

render = (moreData) ->
  template _.extend {}, data, moreData

describe 'Events templates', ->
  before ->
    @profile = new Profile fabricate 'profile'
    @fair = new Fair fabricate 'fair'
    @infoMenu = new InfoMenu fair: @fair
    @infoMenu.infoMenu = {
      events: true,
      programming: false,
      artsyAtTheFair: false,
      aboutTheFair: false
    }
    @fairEvent = new FairEvent fabricate('fair_event'), { fairId: 'armory-show-2013' }
    @fairEvents = new FairEvents [@fairEvent], { fairId: @fair.id }

  describe 'fair with events', ->
    beforeEach ->
      @html = render({ profile: @profile, fair: @fair, fairEvents: @fairEvents, sortedEvents: @fairEvents.sortedEvents(), infoMenu: @infoMenu.infoMenu })

    it 'should render event date and time', ->
      @html.should.containEql 'Saturday, March 8'
      @html.should.containEql '5:15-5:30PM'

    it 'should render event details', ->
      @html.should.containEql 'Welcome'
      @html.should.containEql 'This panel is organized in conjunction with The Armory Show'
      @html.should.containEql 'The New York Times Style Magazine Media Lounge on Pier 94'

    it 'should display map icon', ->
      @html.should.containEql '<i class="icon-circle-chevron"></i><span>Map</span>'

    it 'should not display map icon', ->
      @fairEvent.set venue_address: null
      @fairEvents = new FairEvents [@fairEvent], { fairId: 'armory-show-2013' }
      clientWithoutAdddress = render({ profile: @profile, fair: @fair, fairEvents: @fairEvents, sortedEvents: @fairEvents.sortedEvents(), infoMenu: @infoMenu.infoMenu })
      clientWithoutAdddress.should.not.containEql '<i class="icon-circle-chevron"></i><span>Map</span>'
