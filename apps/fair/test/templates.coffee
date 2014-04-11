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
CoverImage      = require '../../../models/cover_image'
SearchResult    = require '../../../models/search_result'
Artists         = require '../../../collections/artists'
Partners        = require '../../../collections/partners'
Item            = require '../../../models/item'
Items           = require '../../../collections/items'
OrderedSet      = require '../../../models/ordered_set'
OrderedSets     = require '../../../collections/ordered_sets'
FeedItem        = require '../../../components/feed/models/feed_item'
cheerio         = require 'cheerio'
sinon           = require 'sinon'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Fair', ->
  describe 'index page', ->
    after -> benv.teardown()

    before (done) ->
      benv.setup =>
        benv.expose { $: benv.require 'jquery' }
        sd =
          CANONICAL_MOBILE_URL : 'http://localhost:5000'
          APP_URL : 'http://localhost:5000'
          ARTSY_URL : 'http://localhost:5000'
          ASSET_PATH: 'http://localhost:5000'
          CSS_EXT: '.css.gz'
          JS_EXT: '.js.gz'
          NODE_ENV: 'test'
          CURRENT_PATH: '/cool-fair'
        fair = new Fair (fabricate 'fair')
        profile = new Profile (fabricate 'fair_profile')
        template = render('index')
          sd: sd
          fair: fair
          profile: profile
        @$template = $(template)
        done()

    it 'renders without errors', ->
      @$template.html().should.not.containEql 'undefined'
      @$template.html().should.containEql 'Back to Artsy.net'

  describe 'info page', ->
    after -> benv.teardown()

    before (done) ->
      benv.setup =>
        benv.expose { $: benv.require 'jquery' }
        sd =
          CANONICAL_MOBILE_URL : 'http://localhost:5000'
          APP_URL : 'http://localhost:5000'
          ASSET_PATH: 'http://localhost:5000'
          CSS_EXT: '.css.gz'
          JS_EXT: '.js.gz'
          NODE_ENV: 'test'
          SECTION: 'info'
          CURRENT_PATH: '/cool-fair'
        fair = new Fair (fabricate 'fair', about: 'about the fair')
        profile = new Profile (fabricate 'fair_profile')
        template = render('index')
          sd: sd
          fair: fair
          profile: profile
        @$template = $(template)
        done()

    it 'renders without errors', ->
      @$template.html().should.not.containEql 'undefined'
      @$template.html().should.containEql 'Back to Artsy.net'
      @$template.find('.fair-map-link').length.should.equal 1
      @$template.find('.fair-info-content').html().should.containEql 'about the fair'

  describe 'search page', ->
    after -> benv.teardown()

    before (done) ->
      benv.setup =>
        sd =
          CANONICAL_MOBILE_URL : 'http://localhost:5000'
          APP_URL : 'http://localhost:5000'
          ASSET_PATH: 'http://localhost:5000'
          CSS_EXT: '.css.gz'
          JS_EXT: '.js.gz'
          NODE_ENV: 'test'
          SECTION: 'search'
          CURRENT_PATH: '/cool-fair'
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
          fill: sinon.stub()
        @$template = $(template)
        done()

    it 'renders without errors', ->
      @$template.html().should.containEql 'Back to Artsy.net'
      @$template.find('.artsy-search-results .search-result').length.should.equal 1
      @$template.find('.fair-search-results .search-result').html().should.containEql 'Booth'
      @$template.find('.fair-search-results .search-result').length.should.equal 1

  describe 'overview', ->
    before ->
      fair = new Fair (fabricate 'fair', about: 'about the fair')
      coverImage = new CoverImage(image_versions: ['wide'], image_url: "foo/wide.jpg")
      profile = new Profile (fabricate 'fair_profile')
      primarySets = new OrderedSets()

      # Explore ordered set
      editorial = new OrderedSet fabricate('set', {
        key: "editorial"
        item_type: "FeaturedLink"
      })
      editorialItems = new Items(null, 'editorial-foo')
      editorialItems.add new Item( fabricate 'featured_link', { title: 'Chinese Art' } )
      editorialItems.add new Item( fabricate 'featured_link', { title: 'Moar Chinese Art' } )
      editorial.set items: editorialItems
      primarySets.add editorial

      # Explore ordered set
      explore = new OrderedSet fabricate('set', {
        key: "explore"
        item_type: "FeaturedLink"
      })
      exploreItems = new Items(null, 'explore-foo')
      exploreItems.add new Item( fabricate 'featured_link', { title: 'Explore Art' } )
      exploreItems.add new Item( fabricate 'featured_link', { title: 'Moar Explore Art' } )
      explore.set items: exploreItems
      primarySets.add explore

      # Primary ordered set
      primary = new OrderedSet fabricate('set', {
        key: "primary"
        item_type: "FeaturedLink"
      })
      primaryItems = new Items(null, 'primary-foo')
      primaryItems.add new Item( fabricate 'featured_link', { title: 'Primary Art' } )
      primaryItems.add new Item( fabricate 'featured_link', { title: 'Moar Primary Art' } )
      primary.set items: primaryItems
      primarySets.add primary

      # Curator ordered set
      curator = new OrderedSet fabricate('set', {
        key: "curator"
        item_type: "FeaturedLink"
      })
      curatorItems = new Items(null, 'curator-foo')
      curatorItems.add new Item( fabricate 'featured_link', { title: 'Curator Art' } )
      curatorItems.add new Item( fabricate 'featured_link', { title: 'Moar Curator Art' } )
      curator.set items: curatorItems
      primarySets.add curator

      filteredSearchOptions = new Backbone.Model {
        related_gene:
          'abstract-painting': 388
          'art-since-2000': 1717
          'black-and-white-photography': 99
          'contemporary-color-fields': 38
          'contemporary-conceptualism': 439
          'contemporary-photography': 310
          'contemporary-pop': 78
          'pop-art': 55
          'the-fantastic': 183
          'women-artists': 600
      }

      filteredSearchColumns = fair.filteredSearchColumns filteredSearchOptions
      @template = render('overview')
        sd:
          APP_URL : 'http://localhost:5000'
          ASSET_PATH: 'http://localhost:5000'
          CURRENT_PATH: '/cool-fair'
        fair: fair
        profile: profile
        filteredSearchColumns: filteredSearchColumns
        coverImage: coverImage
        primarySets: primarySets

    it 'renders without errors', ->
      $ = cheerio.load @template
      $('.fair-search-options-column').length.should.equal 2
      $('.fair-search-options-column a').length.should.equal 10
      $('.fair-search-options-column').text().should.include 'contemporary pop'
      $('.feature-image').length.should.equal 1

      $('.container-right .small-section').length.should.equal 2
      $('.container-left .small-section').length.should.equal 2
      $('.fair-overview-curator .small-section').length.should.equal 2
      $('.fair-overview-post-container .large-post').length.should.equal 1
      $('.fair-overview-post-container .small-post').length.should.equal 1

  describe 'exhibitors columns', ->
    before ->
      partnerShow = new FeedItem fabricate('show',
        _type: "PartnerShow",
        artists: [fabricate('artist')]
        artworks: [fabricate('artwork')]
      )
      @template = render('exhibitors_columns')
        columns : [[partnerShow, partnerShow], [partnerShow, partnerShow]]

    it 'renders without errors', ->
      $ = cheerio.load @template
      $('.exhibitors-column').length.should.equal 2
      $('.exhibitor-name').length.should.equal 4
      $('.exhibitor-item img').length.should.equal 4
