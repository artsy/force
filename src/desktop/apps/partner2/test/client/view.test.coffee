benv = require 'benv'
Backbone = require 'backbone'
sinon = require 'sinon'
CurrentUser = require '../../../../models/current_user.coffee'
Artworks = require '../../../../collections/artworks.coffee'
Partner = require '../../../../models/partner.coffee'
Profile = require '../../../../models/profile.coffee'
Articles = require '../../../../collections/articles.coffee'
_ = require 'underscore'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'

describe 'PartnerView', ->

  before (done) ->
    benv.setup ->
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  describe 'when setting up tabs', ->

    beforeEach (done) ->
      sinon.stub Backbone, 'sync'
      benv.render resolve(__dirname, '../../templates/index.jade'), {
        profile: new Profile fabricate 'partner_profile'
        sd: { PROFILE: fabricate 'partner_profile' }
        asset: (->)
        params: {}
      }, =>
        PartnerView = mod = benv.requireWithJadeify(
          resolve(__dirname, '../../client/view'), ['tablistTemplate']
        )
        @profile = new Profile fabricate 'partner_profile'
        @partner = @profile.related().owner
        mod.__set__ 'sectionToView', {}
        mod.__set__ 'tablistTemplate', (@tablistTemplate = sinon.stub())

        @view = new PartnerView
          profile: @profile
          partner: @partner
          el: $ 'body'
        done()

    afterEach ->
      Backbone.sync.restore()

    describe '#getDisplayableSections', ->
      describe 'with minimal data to display', ->
        beforeEach ->
          @partner.set {
            partner_artists_count: 0
            displayable_shows_count: 0
            published_not_for_sale_artworks_count: 0
            published_for_sale_artworks_count: 0
          }
        it 'gallery', ->
          @partner.set {
            type: 'Gallery'
            claimed: true,
            # This assumes that galleries do not have the option to disable the artists section
            display_artists_section: true
          }
          @profile.set owner_type: 'PartnerGallery'
          sections = @view.getDisplayableSections @view.getSections()
          sections.should.eql ['overview', 'contact']

        it 'institution', ->
          @partner.set {
            type: 'Institution'
            display_artists_section: false
          }
          @profile.set owner_type: 'PartnerInstitution'
          sections = @view.getDisplayableSections @view.getSections()
          sections.should.eql ['overview', 'about']

      describe 'with maximum data to display', ->
        beforeEach ->
          @partner.set {
            partner_artists_count: 1
            displayable_shows_count: 1
            display_artists_section: true
            published_not_for_sale_artworks_count: 1
            published_for_sale_artworks_count: 1
          }

        describe 'gallery', ->
          beforeEach ->
            @partner.set {
              type: 'Gallery'
              claimed: true
            }
            @profile.set owner_type: 'PartnerGallery'

          it 'returns proper sections when display works section is disabled', ->
            @partner.set display_works_section: false
            sections = @view.getDisplayableSections @view.getSections()
            sections.should.eql ['overview', 'shows', 'artists', 'contact']

          it 'returns proper sections when display work section is enabled', ->
            @partner.set display_works_section: true
            sections = @view.getDisplayableSections @view.getSections()
            sections.should.eql ['overview', 'shows', 'works', 'artists', 'contact']

          it 'includes articles when @partnerArticlesCount > 0', ->
            @view.partnerArticlesCount = 1
            sections = @view.getDisplayableSections @view.getSections()
            sections.should.eql ['overview', 'shows', 'artists', 'articles', 'contact']

          it 'does not include articles when @partnerArticlesCount is 0', ->
            @view.partnerArticlesCount = 0
            sections = @view.getDisplayableSections @view.getSections()
            sections.should.eql ['overview', 'shows', 'artists', 'contact']

        describe 'institution', ->
          beforeEach ->
            @partner.set type: 'Institution'
            @profile.set owner_type: 'PartnerInstitution'

          it 'returns proper sections when display works section is disabled', ->
            @partner.set display_works_section: false
            sections = @view.getDisplayableSections @view.getSections()
            sections.should.eql ['overview', 'shows', 'artists', 'shop', 'about']

          it 'returns proper sections when display work section is enabled', ->
            @partner.set display_works_section: true
            sections = @view.getDisplayableSections @view.getSections()
            sections.should.eql ['overview', 'shows', 'collection', 'artists', 'shop', 'about']

          it 'returns proper sections when display_artists_section is disabled', ->
            @partner.set display_artists_section: false
            sections = @view.getDisplayableSections @view.getSections()
            sections.should.eql ['overview', 'shows', 'shop', 'about']

          it 'returns proper sections when display_artists_section is enabled', ->
            @partner.set display_artists_section: true
            sections = @view.getDisplayableSections @view.getSections()
            sections.should.eql ['overview', 'shows', 'artists', 'shop', 'about']

          it 'includes articles when @partnerArticlesCount > 0', ->
            @view.partnerArticlesCount = 1
            sections = @view.getDisplayableSections @view.getSections()
            sections.should.eql ['overview', 'shows', 'articles', 'artists', 'shop', 'about']

          it 'does not include articles when @partnerArticlesCount is 0', ->
            @view.partnerArticlesCount = 0
            sections = @view.getDisplayableSections @view.getSections()
            sections.should.eql ['overview', 'shows', 'artists', 'shop', 'about']

    describe '#initializeTablistAndContent', ->

      it 'renders tabs properly', ->
        @view.initializeTablistAndContent()
        _.last(@tablistTemplate.args)[0].profile.get('id').should.equal @profile.get('id')
        _.last(@tablistTemplate.args)[0].sections.should.eql ['overview', 'about']

    describe '#initializePartnerAndCounts', ->
      it 'returns a thenable promise', ->
        @view.initializePartnerAndCounts().then.should.be.a.Function()

      it 'makes proper requests to fetch partner and articles', ->
        @view.initializePartnerAndCounts()
        requests = _.last(Backbone.sync.args, 2)
        requests[0][1].url().should.endWith "/api/v1/partner/#{@partner.get('id')}"
        requests[1][1].url.should.endWith '/api/articles'
        requests[1][2].data.should.eql partner_id: @partner.get('_id'), limit: 1, published: true, count: true

      it 'fetches and returns partner and articles and sets articles count', ->
        nextSyncCall = Backbone.sync.args.length
        articles = new Articles [fabricate('article'), fabricate('article')]
        articles.count = 2
        Backbone.sync
          .onCall nextSyncCall
          .yieldsTo 'success', @partner

        Backbone.sync
          .onCall nextSyncCall + 1
          .yieldsTo 'success', articles

        @view.initializePartnerAndCounts().then =>
          @view.partnerArticlesCount.should.equal 2
