_ = require 'underscore'
benv = require 'benv'
moment = require 'moment'
{ resolve } = require 'path'
{ fabricate } = require 'antigravity'
Fair = require '../../../models/fair'
Items = require '../../../collections/items'

describe 'Fairs template', ->
  before ->
    @currentFairs = _.times 2, ->
      fair = new Fair fabricate('fair', id: _.uniqueId(), published: true, has_full_feature: true, organizer: fabricate('fair_organizer'), end_at: moment().add(10, 'days'))
      fair.representation = new Items [fabricate 'featured_link']
      fair
    @pastFairs = _.times 4, ->
      fair = new Fair fabricate('fair', id: _.uniqueId(), published: true, has_full_feature: true, organizer: fabricate('fair_organizer'), end_at: moment().subtract(10, 'days'))
      fair.representation = new Items [fabricate 'featured_link']
      fair
    @upcomingFairs = _.times 3, ->
      new Fair fabricate('fair', id: _.uniqueId(), published: true, has_full_feature: true, organizer: null, end_at: moment().add(10, 'days'))

  describe 'with current fairs', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require 'jquery'
        benv.render resolve(__dirname, '../templates/index.jade'),
          sd: {}
          asset: (->)
          featuredFairs: @currentFairs
          currentFairs: @currentFairs
          pastFairs: @pastFairs
          upcomingFairs: @upcomingFairs
        done()

    after ->
      benv.teardown()

    it 'renders correctly', ->
      $('.aggregate-page-items-featured .aggregate-page-subheader').first().text().should.equal 'Current Fairs'
      $('.ap-featured-item').length.should.equal 6

  describe 'without current fairs', ->
    before (done) ->
      benv.setup =>
        benv.expose $: benv.require 'jquery'
        benv.render resolve(__dirname, '../templates/index.jade'),
          sd: {}
          asset: (->)
          featuredFairs: @pastFairs
          currentFairs: []
          pastFairs: @pastFairs
          upcomingFairs: @upcomingFairs
        done()

    after ->
      benv.teardown()

    it 'renders correctly', ->
      $('.aggregate-page-items-featured .aggregate-page-subheader').first().text().should.equal 'Past Fairs'
      $('.ap-featured-item').length.should.equal 4
