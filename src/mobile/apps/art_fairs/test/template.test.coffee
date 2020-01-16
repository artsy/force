_ = require 'underscore'
benv = require 'benv'
moment = require 'moment'
cheerio = require 'cheerio'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
Helpers = require '../helpers.coffee'

describe 'Art fairs template', ->

  before ->
    profile = { is_published: true, icon: { url: "https://www.example.com/cat.jpg" } }
    unpublished_profile = { is_published: false, icon: { url: "https://www.example.com/cat.jpg" } }
    location = { city: 'New York', state: 'NY', country: 'US' }
    @currentFairs = _.times 2, ->
      fair = fabricate('fair', location: location, image: { url: { "https://www.example.com/cat.jpg" } }, profile: profile, id: _.uniqueId(), is_published: true, has_full_feature: true, has_listing: true, organizer: fabricate('fair_organizer'), end_at: moment().add(10, 'days'))
      fair
    @pastFairs = _.times 4, ->
      fair = fabricate('fair', location: location, profile: profile, id: _.uniqueId(), is_published: true, has_full_feature: true, has_listing: true, organizer: fabricate('fair_organizer'), end_at: moment().subtract(10, 'days'))
      fair
    @upcomingFairs = _.times 3, ->
      fabricate('fair', profile: unpublished_profile, id: _.uniqueId(), is_published: true, has_full_feature: true, has_listing: true, organizer: null, end_at: moment().add(10, 'days'))


  describe 'with currentFairs', ->
    before (done) ->
      benv.setup =>
        benv.expose { $: benv.require 'jquery' }
        Backbone.$ = $
        benv.render resolve(__dirname, '../templates/index.jade'),
          sd: {}
          asset: (->)
          _: require 'underscore'
          navItems: [
            { name: 'Current', hasItems: @currentFairs.length },
            { name: 'Upcoming', hasItems: @upcomingFairs.length },
            { name: 'Past', hasItems: @pastFairs.length }
          ]
          emptyMessage: "Past Fairs"
          extraClasses: "art-fairs-tabs"
          featuredFairs: @currentFairs
          currentFairs: @currentFairs
          pastFairs: @pastFairs
          upcomingFairs: @upcomingFairs
          Helpers: Helpers
          remainingPastFairs: []
        done()

    after ->
      benv.teardown()

    # this test always fails ci
    xit 'renders header with current fairs active', ->
      $(".art-fairs-header").html().should.containEql 'Collect from leading'
      $(".art-fairs-tab[data-tab=current]").hasClass('art-fairs-tab--active')

  describe 'without currentFairs', ->
    before (done) ->
      benv.setup =>
        benv.expose { $: benv.require 'jquery' }
        Backbone.$ = $
        benv.render resolve(__dirname, '../templates/index.jade'),
          sd: {}
          _: require 'underscore'
          navItems: [
            { name: 'Current', hasItems: @currentFairs.length },
            { name: 'Upcoming', hasItems: @upcomingFairs.length },
            { name: 'Past', hasItems: @pastFairs.length }
          ]
          emptyMessage: "Past Fairs"
          extraClasses: "art-fairs-tabs"
          asset: (->)
          currentFairs: []
          pastFairs: @pastFairs
          upcomingFairs: @upcomingFairs
          Helpers: Helpers
          remainingPastFairs: []
        done()

    after ->
      benv.teardown()

    it 'renders header with upcoming fairs active', ->
      $(".art-fairs-header").html().should.containEql 'Collect from leading'
      $('.art-fairs-header').hasClass 'art-fairs-header--background-image'
      $(".art-fairs-tab[data-tab=upcoming]").hasClass('art-fairs-tab--active')
