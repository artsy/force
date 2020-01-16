_ = require 'underscore'
{ fabricate } = require '@artsy/antigravity'
sd = require('sharify').data
should = require 'should'
Backbone = require 'backbone'
PartnerShow = require '../../models/partner_show'
PartnerLocation = require '../../models/partner_location'
FairLocation = require '../../models/partner_location'
Fair = require '../../models/fair'
sinon = require 'sinon'
moment = require 'moment'

describe 'PartnerShow', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @partnerShow = new PartnerShow fabricate('show')

  afterEach ->
    Backbone.sync.restore()

  describe '#url', ->

    it 'includes a partner in the url if the model has one', ->
      partnerShow = new PartnerShow id: 'slug-for-show', partner: fabricate('partner')
      partnerShow.url().should.equal "#{sd.API_URL}/api/v1/partner/#{partnerShow.get('partner').id}/show/#{partnerShow.get('id')}"

    it 'returns a URL with no id for new models', ->
      partnerShow = new PartnerShow id: 'slug-for-show'
      partnerShow.url().should.equal "#{sd.API_URL}/api/v1/show/#{partnerShow.get('id')}"

  describe '#toJSONLD', ->
    it 'returns valid json', ->
      artist = fabricate 'artist'
      @partnerShow.set artists: [artist]
      json = @partnerShow.toJSONLD()
      json['@context'].should.equal 'http://schema.org'
      json['@type'].should.equal 'Event'
      json.name.should.equal 'Inez & Vinoodh'
      json.location.name.should.equal 'Gagosian Gallery'
      json.location.address.should.eql
        '@type': 'PostalAddress'
        streetAddress: '529 W 20th St.2nd Floor'
        addressLocality: 'New York'
        addressRegion: 'NY'
        postalCode: '10011'
      json.performer[0].should.eql {
        "@type": "Person"
        image: "/images/missing_image.png"
        name: "Pablo Picasso"
        sameAs: "#{sd.APP_URL}/artist/#{artist.id}"
      }

  describe '#toPageTitle', ->

    it 'creates a title defensively handling empty or missing values', ->
      @partnerShow.toPageTitle().should.containEql "Inez & Vinoodh | Gagosian Gallery |"

    it 'omits the artworks for sale bit if the partner is not a gallery', ->
      @partnerShow.attributes.partner.name = "White Cube"
      @partnerShow.attributes.partner.type = "Institution"
      @partnerShow.toPageTitle().should.not.containEql ", Artwork for Sale"

  describe '#toPageDescription', ->

    it 'correctly renders the meta description', ->
      @partnerShow.toPageDescription().should.containEql 'Past show at Gagosian Gallery New York, 529 W 20th St. 2nd Floor'

    it 'adds a single artist to the meta description', ->
      @partnerShow.set 'artists', [fabricate('artist')]
      @partnerShow.toPageDescription().should.containEql 'Past show featuring works by Pablo Picasso at Gagosian Gallery New York, 529 W 20th St. 2nd Floor'

    it 'adds multiple artists to the meta description', ->
      @partnerShow.set 'artists', [fabricate('artist'), fabricate('artist')]
      @partnerShow.toPageDescription().should.containEql 'Past show featuring works by Pablo Picasso and Pablo Picasso at Gagosian Gallery New York, 529 W 20th St. 2nd Floor'

  describe '#location', ->

    it 'returns a partner location', ->
      show = new PartnerShow fabricate 'show'
      show.location().should.be.instanceOf(PartnerLocation)

    it 'returns a fair location', ->
      show = new PartnerShow(fabricate 'show',
        fair_location:
          display: 'Booth 1234'
      )
      show.location().should.be.instanceOf(FairLocation)

  describe '#isOnlineExclusive', ->
    it 'returns false when there is partner location', ->
      show = new PartnerShow(fabricate 'show',
        location: new PartnerLocation(fabricate: 'partner_location'),
        partner_city: null,
        fair: null)
      show.isOnlineExclusive().should.be.false()

    it 'returns false when there is a partner_city', ->
      show = new PartnerShow(fabricate 'show',
        location: null,
        partner_city: 'Tehran',
        fair: null
      )
      show.isOnlineExclusive().should.be.false()

    it 'returns false when its a fair show', ->
      show = new PartnerShow(fabricate 'show',
        location: null,
        fair: new Fair(fabricate: 'fair'),
        partner_city: null
      )
      show.isOnlineExclusive().should.be.false()

    it 'returns true when there is no location', ->
      show = new PartnerShow(fabricate 'show',
        location: null,
        partner_location: null,
        fair: null
      )
      show.isOnlineExclusive().should.be.true()


  describe '#formatShowOrFairCity', ->

    it 'returns undefined without location and fair', ->
      show = new PartnerShow fabricate 'show', fair: null, location: null
      _.isUndefined(show.formatShowOrFairCity()).should.be.true()

  describe '#runningDates', ->

    it 'gives a formatted date span for the running dates', ->
      @partnerShow.runningDates().should.equal "Jul 12th – Aug 23rd 2013"

  describe '#shareTitle', ->

    it "includes fair location", ->
      @partnerShow.set
        fair_location:
          display: 'Booth 1234'

      @partnerShow.shareTitle().should.equal "Inez & Vinoodh, Booth 1234 See it on @artsy"

    it "include partner name", ->
      @partnerShow.shareTitle().should.equal 'See "Inez & Vinoodh" at Gagosian Gallery on @artsy'

  describe '#formatArtists', ->

    beforeEach ->
      @partnerShow.set
        artists: [
          fabricate('artist', id: 'picasso-1')
          fabricate('artist', id: 'picasso-2')
          fabricate('artist', id: 'picasso-3')
          fabricate('artist', id: 'picasso-4')
        ]

    it "correctly limits artists", ->
      @partnerShow.formatArtists(2).should.equal "<a href='/artist/picasso-1'>Pablo Picasso</a>, <a href='/artist/picasso-2'>Pablo Picasso</a> and 2 more"

    it "correctly limits artists", ->
      @partnerShow.formatArtists().should.equal "<a href='/artist/picasso-1'>Pablo Picasso</a>, <a href='/artist/picasso-2'>Pablo Picasso</a>, <a href='/artist/picasso-3'>Pablo Picasso</a>, <a href='/artist/picasso-4'>Pablo Picasso</a>"

  describe '#fairLocationDisplay', ->

    it "Returns fair location", ->
      @partnerShow.set
        fair_location:
          display: 'Booth 1234'

      @partnerShow.fairLocationDisplay().should.equal "<i>New York</i> &ndash; Booth 1234"

    it 'works with a missing fair location', ->
      @partnerShow.set fair_location: null
      @partnerShow.fairLocationDisplay().should.equal "<i>New York</i> &ndash; "

  describe '#posterImageUrl', ->
    it 'returns an image', ->
      @partnerShow.posterImageUrl().should.containEql 'partner_show_images/51f6a51d275b24a787000c36/1/large.jpg'

    it 'returns a featured image', ->
      @partnerShow.posterImageUrl(true).should.containEql '/partner_show_images/51f6a51d275b24a787000c36/1/featured.jpg'

    it 'returns larger if featured or large is unavailable', (done) ->
      @partnerShow.on 'fetch:posterImageUrl', (url) ->
        url.should.containEql 'additional_images/4e7cb83e1c80dd00010038e2/1/large.jpg'
        done()

      @partnerShow.unset 'image_versions'
      @partnerShow.posterImageUrl()
      Backbone.sync.args[0][2].url.should.containEql "/api/v1/partner/#{@partnerShow.get('partner').id}/show/#{@partnerShow.id}/artworks"
      Backbone.sync.args[0][2].success [fabricate 'artwork']

    it 'returns empty when there really is no image', ->
      @partnerShow.unset 'image_versions'
      @partnerShow.posterImageUrl()
      Backbone.sync.args[0][2].success []

  describe '#openingThisWeek', ->
    beforeEach ->
      @starting = '2015-04-09T04:00:00+00:00'
      @partnerShow.set 'start_at', @starting

    xit 'returns a boolean if the show opens within "this week"', ->
      # if today is a tuesday and show is opening the next thursday
      @today = moment('2015-04-08T04:00:00+00:00')
      @partnerShow.openingThisWeek().should.be.false()
      # if today is the prior saturday and show is opening on a thursday
      @today = moment('2015-04-04T04:00:00+00:00')
      @partnerShow.openingThisWeek(@today).should.be.true()
      # if today is the prior thursday and the show is opening on a thursday
      @today = moment('2015-04-02T04:00:00+00:00')
      @partnerShow.openingThisWeek(@today).should.be.false()

  describe '#isEndingSoon', ->
    beforeEach ->
      @ending = '2013-08-23T04:00:00+00:00'
      @partnerShow.set 'end_at', @ending

    it 'returns a boolean if the show ends within the desired timeframe (default 5 days)', ->
      @partnerShow.isEndingSoon(5, moment(@ending).subtract(3, 'days')).should.be.true()
      @partnerShow.isEndingSoon(5, moment(@ending).subtract(5, 'days')).should.be.true()
      @partnerShow.isEndingSoon(5, moment(@ending).subtract(5.5, 'days')).should.be.false()
      @partnerShow.isEndingSoon(5, moment(@ending).subtract(6, 'days')).should.be.false()

    it 'supports custom day values for "soon"', ->
      @partnerShow.isEndingSoon(2, moment(@ending).subtract(3, 'days')).should.be.false()
      @partnerShow.isEndingSoon(3, moment(@ending).subtract(3, 'days')).should.be.true()

  describe '#endingIn', ->
    beforeEach ->
      @ending = '2013-08-23T04:00:00+00:00'
      @partnerShow.set 'end_at', @ending

    it 'returns the correct string', ->
      @partnerShow.endingIn(moment(@ending).subtract(3, 'days')).should.equal 'in 3 days'
      @partnerShow.endingIn(moment(@ending).subtract(1, 'day')).should.equal 'in 1 day'
      @partnerShow.endingIn(moment(@ending)).should.equal 'today'

  describe '#isOpeningToday', ->
    beforeEach ->
      @starting = '2013-07-12T04:00:00+00:00'
      @partnerShow.set 'start_at', @starting

    it 'returns a boolean value for whether or not the show opens *today*', ->
      @partnerShow.isOpeningToday(moment(@starting).subtract(1, 'day')).should.be.false()
      @partnerShow.isOpeningToday(moment(@starting).add(1, 'day')).should.be.false()
      @partnerShow.isOpeningToday(moment(@starting)).should.be.true()

  describe '#contextualLabel', ->
    describe 'with name', ->
      it 'returns the correct label', ->
        new PartnerShow(artists: [0, 0, 0], fair: null).contextualLabel('Foobar').should.equal 'Group Show including Foobar'
        new PartnerShow(artists: [0], fair: null).contextualLabel('Foobar').should.equal 'Solo Show'
        new PartnerShow(artists: [0], fair: 'existy').contextualLabel('Foobar').should.equal 'Fair Booth including Foobar'
        new PartnerShow(artists: [0, 0, 0], fair: 'existy').contextualLabel('Foobar').should.equal 'Fair Booth including Foobar'

    describe 'without name', ->
      it 'returns the correct label', ->
        new PartnerShow(artists: [0, 0, 0], fair: null).contextualLabel().should.equal 'Group Show'
        new PartnerShow(artists: [0], fair: null).contextualLabel().should.equal 'Solo Show'
        new PartnerShow(artists: [0], fair: 'existy').contextualLabel().should.equal 'Fair Booth'
        new PartnerShow(artists: [0, 0, 0], fair: 'existy').contextualLabel().should.equal 'Fair Booth'

  describe '#daySchedules', ->
    beforeEach ->
      @partnerShow = new PartnerShow fabricate 'show',
        location: fabricate 'partner_location'

    it 'returns true if a show has day schedules', ->
      @partnerShow.daySchedules().should.be.true()

    it 'returns false if a show has no schedules', ->
      @partnerShow = new PartnerShow fabricate 'show',
        location: fabricate 'partner_location',
          day_schedules: []
      @partnerShow.daySchedules().should.be.false()

  describe '#formatDaySchedule', ->
    beforeEach ->
      @partnerShow = new PartnerShow fabricate 'show',
        location: fabricate 'partner_location'
      @partnerShow.get('location').day_schedules.push
        _id: "5543d89472616978f1e40100"
        start_time: 76000,
        end_time: 88400,
        day_of_week: "Tuesday"

    it 'returns the formatted day schedule for a day of the week with a day schedule', ->
      @partnerShow.formatDaySchedule('Monday').should.match { start: 'Monday', hours: '10am–7pm' }

    it 'returns the formatted day schedule for a day of the week with no day schedule', ->
      @partnerShow.formatDaySchedule('Friday').should.match { start: 'Friday', hours: 'Closed' }

    it 'returns the formatted day schedule for a day with multiple schedule blocks', ->
      @partnerShow.formatDaySchedule('Tuesday').should.match { start: 'Tuesday', hours: '10am–7pm, 9:06pm–12:33am' }

  describe '#formatDaySchedules', ->
    beforeEach ->
      @partnerShow = new PartnerShow fabricate 'show',
        location: fabricate 'partner_location'
      @partnerShow.get('location').day_schedules.push
        _id: "5543d89472616978f1e40100"
        start_time: 76000,
        end_time: 88400,
        day_of_week: "Tuesday"

    it 'returns a formatted string describing the days open and hours for the show', ->
      @partnerShow.formatDaySchedules().should.match [
        { hours: '10am–7pm', start: 'Monday' }
        { hours: '10am–7pm, 9:06pm–12:33am', start: 'Tuesday' }
        { hours: '10am–7pm', start: 'Wednesday' }
        { hours: '10am–7pm', start: 'Thursday' }
        { hours: 'Closed', start: 'Friday' }
        { hours: 'Closed', start: 'Saturday' }
        { hours: '10am–7pm', start: 'Sunday' }
      ]

  describe '#formatModalDaySchedules', ->
    beforeEach ->
      @partnerShow = new PartnerShow fabricate 'show',
        location: fabricate 'partner_location'

    it 'returns a formatted string describing the days open and hours for the show', ->
      @partnerShow.formatModalDaySchedules().should.match [ days: 'Monday–Thursday, Sunday', hours: '10am–7pm' ]

    it 'returns a correctly formatted string when a show has unusual hours', ->
      @partnerShow = new PartnerShow fabricate 'show',
        location: fabricate 'partner_location',
          day_schedules: [
            {
              _id: "5543d893726169750b990100",
              start_time: 42359,
              end_time: 68992,
              day_of_week: "Wednesday"
            }, {
              _id: "5543d8937261697591bd0100",
              start_time: 1800,
              end_time: 70250,
              day_of_week: "Monday"
            }, {
              _id: "5543d89472616978f1e40100",
              start_time: 42359,
              end_time: 68992,
              day_of_week: "Tuesday"
            }, {
              _id: "5543d8947261690f169d0100",
              start_time: 1800,
              end_time: 70250,
              day_of_week: "Saturday"
            }, {
              _id: "5543d8947261695aea200200",
              start_time: 42359,
              end_time: 68992,
              day_of_week: "Thursday"
            }
          ]
      @partnerShow.formatModalDaySchedules().should.match [
        { days: 'Monday, Saturday', hours: '12:30am–7:30pm' }
        { days: 'Tuesday–Thursday', hours: '11:45am–7:09pm' }
      ]

    it 'returns a correctly formatted string when a show has overlapping days and multiple time blocks', ->
      @partnerShow = new PartnerShow fabricate 'show',
        location: fabricate 'partner_location',
          day_schedules: [
            {
              _id: "5543d893726169750b990100",
              start_time: 42359,
              end_time: 68992,
              day_of_week: "Wednesday"
            }, {
              _id: "5543d8937261697591bd0100",
              start_time: 1800,
              end_time: 70250,
              day_of_week: "Monday"
            }, {
              _id: "5543d89472616978f1e40100",
              start_time: 42359,
              end_time: 68992,
              day_of_week: "Tuesday"
            }, {
              _id: "5543d89472616978f1e40100",
              start_time: 82359,
              end_time: 98992,
              day_of_week: "Tuesday"
            }, {
              _id: "5543d8947261690f169d0100",
              start_time: 1800,
              end_time: 70250,
              day_of_week: "Saturday"
            }, {
              _id: "5543d8947261695aea200200",
              start_time: 42359,
              end_time: 68992,
              day_of_week: "Thursday"
            }, {
              _id: "5543d89472616978f1e40100",
              start_time: 82359,
              end_time: 98992,
              day_of_week: "Wednesday"
            }
          ]
      @partnerShow.formatModalDaySchedules().should.match [
        { days: 'Monday, Saturday', hours: '12:30am–7:30pm' },
        { days: 'Tuesday–Wednesday', hours: '11:45am–7:09pm, 10:52pm–3:29am' },
        { days: 'Thursday', hours: '11:45am–7:09pm' }
      ]
