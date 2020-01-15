$ = require 'cheerio'
_ = require 'underscore'
{ fabricate } = require '@artsy/antigravity'
Profile = require '../../../../models/profile'
Fair = require '../../../../models/fair'
FairEvent = require '../../../../models/fair_event'
FairEvents = require '../../../../collections/fair_events'
template = require('jade').compileFile(require.resolve '../../templates/events.jade')
InfoMenu = require '../../../../components/info_menu/index.coffee'
data = _.extend {}, asset: (->), sd: {CURRENT_PATH: '/info/events'}, markdown: (->)

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
    @fairEvent.set venue_address: '711 12th Ave, New York, NY 10019'
    @fairEvents = new FairEvents [@fairEvent], { fairId: @fair.id }

  describe 'fair with events', ->
    beforeEach ->
      @html = render({ profile: @profile, fair: @fair, fairEvents: @fairEvents, sortedEvents: @fairEvents.sortedEvents(), infoMenu: @infoMenu.infoMenu })

    it 'should render event date and time', ->
      @html.should.containEql 'Saturday, March 8'
      @html.should.containEql '5:15-5:30PM'

    it 'should render event details', ->
      @html.should.containEql 'Welcome'
      @html.should.containEql 'PARTICIPANTS: Noah Horowitz, Executive Director'
      @html.should.containEql 'The New York Times Style Magazine Media Lounge on Pier 94'

    it 'should display map icon', ->
      @html.should.containEql '<i class="icon-circle-chevron"></i><span>Map</span>'

    it 'should not display map icon', ->
      @fairEvent.set venue_address: null
      @fairEvents = new FairEvents [@fairEvent], { fairId: 'armory-show-2013' }
      clientWithoutAdddress = render({ profile: @profile, fair: @fair, fairEvents: @fairEvents, sortedEvents: @fairEvents.sortedEvents(), infoMenu: @infoMenu.infoMenu })
      clientWithoutAdddress.should.not.containEql '<i class="icon-circle-chevron"></i><span>Map</span>'

    it 'outlook event url should be present', ->
      @html.should.containEql "outlook"

    it 'google event url should be present', ->
      @html.should.containEql "https://www.google.com/calendar/render?action=TEMPLATE&amp;text=Welcome&amp;dates=20140308T171500/20140308T173000&amp;details=PARTICIPANTS:%20Noah%20Horowitz,%20Executive%20Director,%20The%20Armory%20Show%0APhilip%20Tinari,%20Director,%20Ullens%20Center%20for%20Contemporary%20Art%20(UCCA),%20Beijing%0AAdrian%20Cheng,%20Founder%20and%20Chairman,%20K11%20Art%20Foundation,%20Hong%20Kong%0A&amp;location=&amp;sprop=&amp;sprop=name:"

    it 'yahoo event url should be present', ->
      @html.should.containEql "http://calendar.yahoo.com/?v=60&amp;view=d&amp;type=20&amp;title=Welcome&amp;st=20140308T171500&amp;dur=0015&amp;desc=PARTICIPANTS:%20Noah%20Horowitz,%20Executive%20Director,%20The%20Armory%20Show%0APhilip%20Tinari,%20Director,%20Ullens%20Center%20for%20Contemporary%20Art%20(UCCA),%20Beijing%0AAdrian%20Cheng,%20Founder%20and%20Chairman,%20K11%20Art%20Foundation,%20Hong%20Kong%0A&amp;in_loc="

    it 'iCal event url should be present', ->
      @html.should.containEql "ical"
