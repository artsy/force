_ = require 'underscore'
benv = require 'benv'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
moment = require 'moment'
ViewHelpers = require '../helpers/view_helpers.coffee'

describe 'Fairs template', ->
  before ->
    image = { url: "https://www.example.com/cat.jpg" }
    profile = { icon: { url: "https://www.example.com/cat.jpg" } }
    @currentFairs = _.times 2, ->
      fabricate('fair', profile: profile, image: image, id: _.uniqueId(), published: true, has_full_feature: true, has_listing: true, organizer: fabricate('fair_organizer'), end_at: moment().add(10, 'days'), banner_size: 'large')
    @pastFairs = _.times 4, ->
      fabricate('fair', profile: profile, image: image, id: _.uniqueId(), published: true, has_full_feature: true, has_listing: true, organizer: fabricate('fair_organizer'), end_at: moment().subtract(10, 'days'))
    @upcomingFairs = _.times 3, ->
      fabricate('fair', profile: profile, image: image, id: _.uniqueId(), published: true, has_full_feature: true, has_listing: true, organizer: null, end_at: moment().add(10, 'days'))

    @rows = ViewHelpers.fillRows @currentFairs

  describe 'with current fairs', ->
    beforeEach (done) ->
      benv.setup =>
        benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
        benv.render resolve(__dirname, '../templates/index.jade'),
          sd: {}
          asset: (->)
          featuredFairs: @currentFairs
          currentFairs: @currentFairs
          pastFairs: @pastFairs
          upcomingFairs: @upcomingFairs
          currentFairRows: @rows
          ViewHelpers: ViewHelpers
        done()

    afterEach ->
      benv.teardown()

    # TODO: Intermittent failure, we should probably refactor this suite to use
    # cheerio and jade.render to avoid DOM finickyness
    xit 'renders correctly', ->
      $('.fairs__current-fairs h1.fair-header').text().should.equal 'Current Fairs'
      $('.fairs__current-fair').length.should.equal 2

    xit 'groups the splits the current fairs into one row', ->
      $('.fairs__current-fair-row--half').length.should.equal 1
      $('.fairs__current-fair-row--half .fairs__current-fair').length.should.equal 2

  describe 'without current fairs', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
        benv.render resolve(__dirname, '../templates/index.jade'),
          sd: {}
          asset: (->)
          featuredFairs: @pastFairs
          currentFairs: []
          pastFairs: @pastFairs
          upcomingFairs: @upcomingFairs
          currentFairRows: []
          ViewHelpers: ViewHelpers
        done()

    after ->
      benv.teardown()

    xit 'renders correctly, with a fair promo', ->
      $('.fairs__promo').length.should.equal 1
      $('.fairs__past-fairs h1.fair-header').text().should.equal 'Past Fairs'
      $('.fairs__past-fair').length.should.equal 4
