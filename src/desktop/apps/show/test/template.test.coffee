_ = require 'underscore'
jade = require 'jade'
cheerio = require 'cheerio'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
PartnerShow = require '../../../models/partner_show'
Profile = require '../../../models/profile'
AdditionalImage = require '../../../models/additional_image'
Artwork = require '../../../models/artwork'
Artworks = require '../../../collections/artworks'

render = (templateName) ->
  jade.compileFile(require.resolve "../templates/#{templateName}.jade")

xdescribe 'metadata', ->
  describe 'events', ->
    describe 'with multiple events', ->
      it 'renders correctly', ->
        { events } = fabricate 'show'
        events.should.have.lengthOf 2
        show = new PartnerShow events: events
        html = render('metadata/events') show: show
        html.should.containEql 'js-open-show-events'
        html.should.containEql 'Multiple events for this show'

    describe 'a single events, with a description', ->
      it 'renders correctly', ->
        { events } = fabricate 'show'
        show = new PartnerShow events: [_.extend {}, events[0], description: 'Existy']
        html = render('metadata/events') show: show
        html.should.containEql 'js-open-show-events'
        html.should.not.containEql 'Multiple events for this show'
        html.should.containEql 'Opening Reception'

    describe 'a single events, without a description', ->
      it 'renders correctly', ->
        { events } = fabricate 'show'
        show = new PartnerShow events: [_.extend {}, events[0], description: null]
        html = render('metadata/events') show: show
        html.should.not.containEql 'js-open-show-events'
        html.should.not.containEql 'Multiple events for this show'
        html.should.containEql 'Opening Reception'

xdescribe 'Partner Show', ->
  describe 'an average show', ->
    before ->
      @show = new PartnerShow fabricate('show')
      @html = render('index')
        sd: {}
        asset: (->)
        show: @show
        location: @show.location()
        artworks: @show.related().artworks
        fair: @show.related().fair
        partner: @show.related().partner
        profile: @show.related().profile
        installShots: @show.related().installShots
      @$ = cheerio.load @html

    it 'renders a show title', ->
      @$('.show-title').text().should.equal @show.title()

    it 'renders show details', ->
      @$('.show-partner').text().should.containEql @show.related().partner.get('name')
      @$('.show-location').text().should.containEql @show.location().singleLine()
      @$('.show-dates').text().should.containEql @show.runningDates()

    it 'renders social sharing links', ->
      @$('.show-share').should.have.lengthOf 1
      @$('.show-share .share-to-facebook').should.have.lengthOf 1
      @$('.show-share .share-to-twitter').should.have.lengthOf 1

    it 'renders a container for artwork columns', ->
      @$('.show-artworks-columns').should.have.lengthOf 1

    it 'does not render a press release', ->
      @$('.show-press-release').should.have.lengthOf 0

  describe 'a show that is in an unfeatured fair', ->
    before ->
      @show = new PartnerShow fabricate('show')
      fair = @show.related().fair.set 'has_full_feature', false
      @html = render('index')
        sd: {}
        asset: (->)
        show: @show
        location: @show.location()
        artworks: @show.related().artworks
        fair: fair
        partner: @show.related().partner
        profile: @show.related().profile
        installShots: @show.related().installShots
      @$ = cheerio.load @html

    it 'does not render a link for the fair', ->
      @$('.show-fair-link').should.have.lengthOf 0

  describe 'with 1 installation shot', ->
    before ->
      @show = new PartnerShow fabricate('show')
      @show.related().installShots.reset [fabricate 'show_install_shot']
      @html = render('index')
        sd: {}
        asset: (->)
        show: @show
        location: @show.location()
        artworks: @show.related().artworks
        fair: @show.related().fair
        partner: @show.related().partner
        profile: @show.related().profile
        installShots: @show.related().installShots
      @$ = cheerio.load @html

    it 'does not render the carousel', ->
      @$('.show-installation-shot-carousel').should.have.lengthOf 0

  describe 'with 3 or more installation shots', ->
    before ->
      @show = new PartnerShow fabricate('show')
      @show.related().installShots.reset _.times 3, -> fabricate 'show_install_shot'
      @html = render('index')
        sd: {}
        asset: (->)
        show: @show
        location: @show.location()
        artworks: @show.related().artworks
        fair: @show.related().fair
        partner: @show.related().partner
        profile: @show.related().profile
        installShots: @show.related().installShots
      @$ = cheerio.load @html

    it 'renders installation shots', ->
      @$('.show-installation-shot-carousel').should.have.lengthOf 1
      @$('.mgr-cell').should.have.lengthOf 3

  describe 'with a press release', ->
    before ->
      @show = new PartnerShow fabricate('show', press_release: '*Existy*')
      @html = render('index')
        sd: {}
        asset: (->)
        show: @show
        location: @show.location()
        artworks: @show.related().artworks
        fair: @show.related().fair
        partner: @show.related().partner
        profile: @show.related().profile
        installShots: @show.related().installShots
      @$ = cheerio.load @html

    it 'renders the press release', ->
      @$('.show-press-release').should.have.lengthOf 1
      @$('.show-press-release').html().should.containEql '<p><em>Existy</em></p>'
