_ = require 'underscore'
benv = require 'benv'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
{ Cities, FeaturedCities } = require 'places'
Show = require '../../../models/partner_show'
Shows = require '../shows'

describe 'Location Based', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      done()

  after ->
    benv.teardown()

  describe 'with opening shows', ->
    before ->
      @defaults =
        sd: {}
        asset: (->)
        city: Cities[0] # Amsterdam
        cities: Cities[0..1]
        featuredCities: FeaturedCities[0..1]

    describe 'on the first page', ->
      before (done) ->
        benv.render resolve(__dirname, '../templates/location_based.jade'), _.defaults({
          opening: [new Show fabricate 'show']
          upcoming: []
          current: new Shows [fabricate 'show'], state: currentPage: 1, pageSize: 1, totalRecords: 1
          past: []
        }, @defaults), done

      it 'displays opening shows', ->
        $('.shows-page-header').map(-> $(this).text()).get().should.eql [
          'Opening This Week', 'Current Shows in Amsterdam (1)'
        ]

    describe 'on the second page', ->
      before (done) ->
        benv.render resolve(__dirname, '../templates/location_based.jade'), _.defaults({
          opening: [new Show fabricate 'show']
          upcoming: []
          current: new Shows _.times(2, -> fabricate 'show'), state: currentPage: 2, pageSize: 1, totalRecords: 2
          past: []
        }, @defaults), done

      it 'displays opening shows', ->
        $('.shows-page-header').map(-> $(this).text()).get().should.eql [
          'Current Shows in Amsterdam (2)'
        ]
