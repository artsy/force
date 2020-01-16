Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
PartnerShows = require '../../collections/partner_shows'
moment = require 'moment'

describe 'PartnerShows', ->

  beforeEach ->
    @shows = new PartnerShows null, partnerId: 'foobar'

  describe '#url', ->

    it 'sorts by most recent', ->
      @shows.url().should.containEql '/api/v1/partner/foobar/shows?sort=-featured,-end_at'


  for version in ['featured', 'larger']

    describe '#featuredShow', ->

      beforeEach ->
        futureShow = fabricate('show',
          status: 'upcoming'
          id: "future-show"
          featured: false
          start_at: moment().add(30, 'days').toJSON()
          end_at: moment().add(37, 'days').toJSON()
          eligible_artworks_count: 4
          image_versions: [version]
        )
        currentShow = fabricate('show',
          status: 'running'
          id: "running-show"
          featured: false
          start_at: moment().subtract(7, 'days').toJSON()
          end_at: moment().add(7, 'days').toJSON()
          eligible_artworks_count: 4
          image_versions: [version]
        )
        currentShow2 = fabricate('show',
          status: 'running'
          id: "running-show-2"
          featured: false
          start_at: moment().subtract(5, 'days').toJSON()
          end_at: moment().add(2, 'days').toJSON()
          eligible_artworks_count: 4
          image_versions: [version]
        )
        pastShow = fabricate('show',
          status: 'closed'
          id: "closed-show"
          featured: false
          start_at: moment().subtract(37, 'days').toJSON()
          end_at: moment().subtract(30, 'days').toJSON()
          eligible_artworks_count: 4
          image_versions: [version]
        )
        @shows.reset([futureShow,currentShow,currentShow2,pastShow])

      describe 'with a featured show', ->

        it "selects the featured show regardless of its running dates", ->
          @shows.findWhere(status: 'upcoming').set('featured', true)
          @shows.featuredShow().get('id').should.equal 'future-show'
          @shows.findWhere(status: 'upcoming').set('featured', false)
          @shows.findWhere(status: 'closed').set('featured', true)
          @shows.featuredShow().get('id').should.equal 'closed-show'

      describe 'without a featured show', ->
        describe 'with multiple running shows', ->
          it "selects the running show that ends closest to now", ->
            @shows.featuredShow().get('id').should.equal "running-show-2"

        describe 'with no running shows and multiple upcoming shows', ->
          it "selects the upcoming show with the nearest start date", ->
            farFutureShow = fabricate('show',
              status: 'upcoming'
              id: "far-future-show"
              featured: false
              start_at: moment().add(90, 'days').toJSON()
              end_at: moment().add(97, 'days').toJSON()
              eligible_artworks_count: 4
              image_versions: [version]
            )
            nearFutureShow = fabricate('show',
              status: 'upcoming'
              id: "future-show"
              featured: false
              start_at: moment().add(30, 'days').toJSON()
              end_at: moment().add(37, 'days').toJSON()
              eligible_artworks_count: 4
              image_versions: [version]
            )
            @shows.reset([farFutureShow,nearFutureShow])
            @shows.featuredShow().get('id').should.equal 'future-show'

        describe 'with no running shows and no upcoming shows', ->
          it "selects the past show with the nearest end date", ->
            recentClosedShow = fabricate('show',
              status: 'closed'
              id: "closed-show"
              featured: false
              start_at: moment().subtract(37, 'days').toJSON()
              end_at: moment().subtract(30, 'days').toJSON()
              eligible_artworks_count: 4
              image_versions: [version]
            )
            madOldShow = fabricate('show',
              status: 'closed'
              id: "another-closed-show"
              featured: false
              start_at: moment().subtract(67, 'days').toJSON()
              end_at: moment().subtract(60, 'days').toJSON()
              eligible_artworks_count: 4
              image_versions: [version]
            )
            @shows.reset([recentClosedShow,madOldShow])
            @shows.featuredShow().get('id').should.equal 'closed-show'
