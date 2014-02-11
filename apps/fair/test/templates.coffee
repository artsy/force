_               = require 'underscore'
benv            = require 'benv'
jade            = require 'jade'
path            = require 'path'
fs              = require 'fs'
Backbone        = require 'backbone'
{ AToZ }        = require 'artsy-backbone-mixins'
{ fabricate }   = require 'antigravity'
Fair            = require '../../../models/fair'
Profile         = require '../../../models/profile'
SearchResult    = require '../../../models/search_result'
Artists         = require '../../../collections/artists'
Partners        = require '../../../collections/partners'
cheerio         = require 'cheerio'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Fair', ->
  describe 'index page', ->
    after benv.teardown

    before (done) ->
      benv.setup =>
        benv.expose { $: benv.require 'jquery' }
        sd =
          CANONICAL_MOBILE_URL : 'http://localhost:5000'
          ARTSY_URL : 'http://localhost:5000'
          ASSET_PATH: 'http://localhost:5000'
          CSS_EXT: '.css.gz'
          JS_EXT: '.js.gz'
          NODE_ENV: 'test'
        fair = new Fair (fabricate 'fair')
        profile = new Profile (fabricate 'fair_profile')
        template = render('index')
          sd: sd
          fair: fair
          profile: profile
        @$template = $(template)
        done()

    it 'renders without errors', ->
      @$template.html().should.not.contain 'undefined'
      @$template.html().should.contain 'Back to Artsy.net'

  describe 'info page', ->
    after benv.teardown

    before (done) ->
      benv.setup =>
        benv.expose { $: benv.require 'jquery' }
        sd =
          CANONICAL_MOBILE_URL : 'http://localhost:5000'
          ARTSY_URL : 'http://localhost:5000'
          ASSET_PATH: 'http://localhost:5000'
          CSS_EXT: '.css.gz'
          JS_EXT: '.js.gz'
          NODE_ENV: 'test'
          SECTION: 'info'
        fair = new Fair (fabricate 'fair', about: 'about the fair')
        profile = new Profile (fabricate 'fair_profile')
        template = render('index')
          sd: sd
          fair: fair
          profile: profile
        @$template = $(template)
        done()

    it 'renders without errors', ->
      @$template.html().should.not.contain 'undefined'
      @$template.html().should.contain 'Back to Artsy.net'
      @$template.find('.fair-map-link').length.should.equal 1
      @$template.find('.fair-info-content').html().should.contain 'about the fair'

  describe 'search page', ->
    after benv.teardown

    before (done) ->
      benv.setup =>
        sd =
          CANONICAL_MOBILE_URL : 'http://localhost:5000'
          ARTSY_URL : 'http://localhost:5000'
          ASSET_PATH: 'http://localhost:5000'
          CSS_EXT: '.css.gz'
          JS_EXT: '.js.gz'
          NODE_ENV: 'test'
          SECTION: 'search'

        benv.expose { $: benv.require 'jquery' }
        results = [
           new SearchResult
             model: 'artist',
             id: 'andy-warhol',
             display: 'Andy Warhol',
             label: 'Artist',
             score: 'excellent',
             search_detail: 'American, 1928-1987',
             published: true,
             highlights: [],
             image_url: 'http://artsy.net/api/v1/artist/andy-warh'
             display_model: 'Artist',
             location: '/artist/andy-warhol',
             is_human: true
          ]
        fairResults = [
         new SearchResult
           model: 'partnershow',
           id: 'oriol-galeria-dart-oriol-galeria-dart-at-the-armory-show-2013',
           display: 'Oriol Galeria d\'Art at The Armory Show 2013',
           label: 'Partnershow',
           score: 'excellent',
           search_detail: null,
           published: false,
           highlights: [],
           image_url: 'http://artsy.net/api/v1/'
           display_model: 'Booth',
           location: '/show/oriol-galeria-dart-oriol-galeria-dart-at-the-armory-show-2013',
           is_human: false
        ]

        fair = new Fair (fabricate 'fair', about: 'about the fair')
        profile = new Profile (fabricate 'fair_profile')
        fairResults[0].updateForFair fair
        template = render('index')
          sd: sd
          fair: fair
          profile: profile
          results: results
          fairResults: fairResults
        @$template = $(template)
        done()

    it 'renders without errors', ->
      @$template.html().should.contain 'Back to Artsy.net'
      @$template.find('.artsy-search-results .search-result').length.should.equal 1
      @$template.find('.fair-search-results .search-result').html().should.contain 'Booth'
      @$template.find('.fair-search-results .search-result').length.should.equal 1

  describe 'a-to-z-lists', ->
    before ->
      m1 = fabricate('partner', artworks_count: 1)
      m2 = fabricate('partner', artworks_count: 0)

      exhibitorsAToZGroup = new Partners([ m1, m2 ])

      fair = new Fair (fabricate 'fair', about: 'about the fair')
      profile = new Profile (fabricate 'fair_profile')

      @template = render('browse')
        sd: {}
        fair: fair
        profile: profile
        exhibitorsAToZGroup : exhibitorsAToZGroup.groupByAlphaWithColumns(3)

    it 'renders without errors', ->
      $ = cheerio.load @template
      $('.fair-exhibitors-list').length.should.equal 1
      $('.fair-exhibitors-list a').length.should.equal 1
      $('.fair-exhibitors-list .a-to-z-item').length.should.equal 2
