_ = require 'underscore'
_s = require 'underscore.string'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
{ AToZ } = require 'artsy-backbone-mixins'
{ fabricate, fabricate2 } = require 'antigravity'
Fair = require '../../../models/fair'
Profile = require '../../../models/profile'
CoverImage = require '../../../models/cover_image'
SearchResult = require '../../../models/search_result'
Artists = require '../../../collections/artists'
Partners = require '../../../collections/partners'
Item = require '../../../models/item'
Items = require '../../../collections/items'
OrderedSet = require '../../../models/ordered_set'
OrderedSets = require '../../../collections/ordered_sets'
FilterArtworks = require '../../../collections/filter_artworks.coffee'
FeedItem = require '../../../components/feed/models/feed_item'
cheerio = require 'cheerio'
sinon = require 'sinon'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Fair', ->
  describe 'index page', ->

    before (done) ->
      sd =
        CANONICAL_MOBILE_URL: 'http://localhost:5000'
        APP_URL: 'http://localhost:5000'
        API_URL: 'http://localhost:5000'
        CSS_EXT: '.css.gz'
        JS_EXT: '.js.gz'
        NODE_ENV: 'test'
        CURRENT_PATH: '/cool-fair'
        PROFILE: fabricate 'fair_profile'
        FAIR: fabricate 'fair', filter_genes: []
        FACEBOOK_APP_NAMESPACE: 'namespace'
      fair = new Fair (sd.FAIR)
      profile = new Profile (sd.PROFILE)
      template = render('index')
        sd: sd
        fair: fair
        profile: profile
        _s: _s
        asset: (->)
      @$template = cheerio.load template
      done()

    it 'renders without errors', ->
      @$template.html().should.not.containEql 'undefined'
      @$template.html().should.containEql 'Back to Artsy.net'

  describe 'info page', ->

    before (done) ->
      fair = fabricate 'fair', filter_genes: []
      fair.about = 'about the fair'
      sd =
        CANONICAL_MOBILE_URL: 'http://localhost:5000'
        APP_URL: 'http://localhost:5000'
        CSS_EXT: '.css.gz'
        JS_EXT: '.js.gz'
        NODE_ENV: 'test'
        SECTION: 'info'
        CURRENT_PATH: '/cool-fair'
        PROFILE: fabricate 'fair_profile'
        FAIR: fair
        FACEBOOK_APP_NAMESPACE: 'namespace'
      fair = new Fair sd.FAIR
      profile = new Profile sd.PROFILE
      template = render('index')
        sd: sd
        _s: _s
        fair: fair
        profile: profile
        asset: (->)
      @$template = cheerio.load template
      done()

    it 'renders without errors', ->
      @$template.html().should.not.containEql 'undefined'
      @$template.html().should.containEql 'Back to Artsy.net'
      @$template.root().find('.fair-map-link').length.should.equal 1
      @$template.root().find('.fair-info-content').html().should.containEql 'about the fair'

  describe 'search page', ->

    before (done) ->
      sd =
        CANONICAL_MOBILE_URL: 'http://localhost:5000'
        APP_URL: 'http://localhost:5000'
        CSS_EXT: '.css.gz'
        JS_EXT: '.js.gz'
        NODE_ENV: 'test'
        PROFILE: fabricate 'fair_profile'
        FAIR: fabricate 'fair', filter_genes: []
        SECTION: 'search'
        CURRENT_PATH: '/cool-fair'
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
      ]
      fair = new Fair (fabricate 'fair', about: 'about the fair')
      profile = new Profile (fabricate 'fair_profile')
      fairResults[0].updateForFair fair
      template = render('index')
        sd: sd
        _s: _s
        fair: fair
        profile: profile
        results: results
        fairResults: fairResults
        crop: sinon.stub()
        asset: (->)
      @$template = cheerio.load template
      done()

    it 'renders without errors', ->
      @$template.html().should.containEql 'Back to Artsy.net'
      @$template.root().find('.artsy-search-results .search-result').length.should.equal 1
      @$template.root().find('.fair-search-results .search-result').html().should.containEql 'Booth'
      @$template.root().find('.fair-search-results .search-result').length.should.equal 1

  describe 'overview', ->

    { fair, coverImage, profile, primarySets, nestedFilteredSearchColumns } = {}

    before ->
      fair = new Fair (fabricate 'fair', about: 'about the fair', tagline: 'This is a custom tagline', filter_genes: _.times 2, -> fabricate 'gene', { id: _.uniqueId() })
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
      @collection = new FilterArtworks fabricate2('filter_artworks'), parse: true

      @template = render('overview')
        sd:
          APP_URL: 'http://localhost:5000'
          CURRENT_PATH: '/cool-fair'
          PROFILE: fabricate 'fair_profile'
          FAIR: fabricate 'fair', filter_genes: _.times 2, -> fabricate 'gene', { id: _.uniqueId() }
        fair: fair
        profile: profile
        filteredSearchColumns: filteredSearchColumns
        coverImage: coverImage
        primarySets: primarySets
        asset: (->)
        _: _
        counts: @collection.counts
        params: new Backbone.Model
        filterLabelMap: require '../../../components/filter2/dropdown/label_map.coffee'
        _s: _s

      nestedFilteredSearchOptions = new Backbone.Model {
        related_gene:
          'abstract-painting':
            'name': 'Abstract Painting'
            'count': 388
          'art-since-2000':
            'name': 'Art since 2000'
            'count': 1717
          'black-and-white-photography':
            'name': 'Black and White Photography'
            'count': 99
          'contemporary-slash-modern':
            'name': 'Contemporary/Modern'
            'count': 38
      }

      nestedFilteredSearchColumns = fair.filteredSearchColumns nestedFilteredSearchOptions
      @nestedTemplate = render('overview')
        sd:
          APP_URL: 'http://localhost:5000'
          CURRENT_PATH: '/cool-fair'
          PROFILE: fabricate 'fair_profile'
          FAIR: fabricate 'fair', filter_genes: _.times 2, -> fabricate 'gene', { id: _.uniqueId() }
        fair: fair
        profile: profile
        filteredSearchColumns: nestedFilteredSearchColumns
        coverImage: coverImage
        primarySets: primarySets
        asset: (->)
        _: _
        counts: @collection.counts
        params: new Backbone.Model
        filterLabelMap: require '../../../components/filter2/dropdown/label_map.coffee'
        _s: _s

    xit 'renders without errors', ->
      $ = cheerio.load @template
      $('.fair-search-options-column').length.should.equal 2
      $('.fair-search-options-column a').length.should.equal 10
      $('.fair-search-options-column').text().should.containEql 'Contemporary Pop'
      $('.feature-image').length.should.equal 1

      $('.container-right .small-section').length.should.equal 2
      $('.container-left .small-section').length.should.equal 2
      $('.fair-overview-curator .small-section').length.should.equal 2
      $('#fair-editorial-2-up article').length.should.equal 2

    xit 'renders nested gene names without errors', ->
      $ = cheerio.load @nestedTemplate
      $('.fair-search-options-column').length.should.equal 2
      $('.fair-search-options-column a').length.should.equal 4
      $('.fair-search-options-column').text().should.containEql 'Contemporary/Modern'

    it 'renders a 3 grid layout with less editorial', ->
      eSet = primarySets.findWhere(key: 'editorial')
      cSet = primarySets.findWhere(key: 'curator')
      eSet.get('items').reset(eSet.get('items').first(2))
      cSet.get('items').reset(cSet.get('items').first(1))
      $ = cheerio.load render('overview')
        sd:
          APP_URL: 'http://localhost:5000'
          CURRENT_PATH: '/cool-fair'
          PROFILE: fabricate 'fair_profile'
          FAIR: fabricate 'fair', filter_genes: []
        fair: fair
        profile: profile
        filteredSearchColumns: nestedFilteredSearchColumns
        coverImage: coverImage
        primarySets: primarySets
        asset: (->)
        _: _
        counts: @collection.counts
        params: new Backbone.Model
        filterLabelMap: require '../../../components/filter2/dropdown/label_map.coffee'
        _s: _s
      $.html('.fair-overview-post-container').should.containEql 'fair-editorial-3-up'

    it 'renders a editorial even when missing a set', ->
      eSet = primarySets.findWhere(key: 'editorial')
      cSet = primarySets.findWhere(key: 'curator')
      primarySets.remove(eSet)
      cSet.get('items').reset([{}, {}])
      $ = cheerio.load render('overview')
        sd:
          APP_URL: 'http://localhost:5000'
          CURRENT_PATH: '/cool-fair'
          PROFILE: fabricate 'fair_profile'
          FAIR: fabricate 'fair', filter_genes: []
        fair: fair
        profile: profile
        filteredSearchColumns: nestedFilteredSearchColumns
        coverImage: coverImage
        primarySets: primarySets
        asset: (->)
        _: _
        counts: @collection.counts
        params: new Backbone.Model
        filterLabelMap: require '../../../components/filter2/dropdown/label_map.coffee'
        _s: _s
      $.html('.fair-overview-post-container').should.containEql 'fair-editorial-2-up'

    it 'renders a editorial even when missing a set w/ >= 4 items', ->
      eSet = primarySets.findWhere(key: 'editorial')
      cSet = primarySets.findWhere(key: 'curator')
      cSet.get('items').reset([{},{},{},{},{}])
      primarySets.remove(eSet)
      $ = cheerio.load render('overview')
        sd:
          APP_URL: 'http://localhost:5000'
          CURRENT_PATH: '/cool-fair'
          PROFILE: fabricate 'fair_profile'
          FAIR: fabricate 'fair', filter_genes: []
        fair: fair
        profile: profile
        filteredSearchColumns: nestedFilteredSearchColumns
        coverImage: coverImage
        primarySets: primarySets
        asset: (->)
        _: _
        counts: @collection.counts
        params: new Backbone.Model
        filterLabelMap: require '../../../components/filter2/dropdown/label_map.coffee'
        _s: _s
      $.html().should.containEql 'fair-overview-curator'

    it 'renders tagline if present', ->
      $ = cheerio.load render('overview')
        sd:
          APP_URL: 'http://localhost:5000'
          CURRENT_PATH: '/cool-fair'
          PROFILE: fabricate 'fair_profile'
          FAIR: fabricate 'fair', filter_genes: []
        fair: fair
        profile: profile
        filteredSearchColumns: nestedFilteredSearchColumns
        coverImage: coverImage
        primarySets: primarySets
        asset: (->)
        _: _
        counts: @collection.counts
        params: new Backbone.Model
        filterLabelMap: require '../../../components/filter2/dropdown/label_map.coffee'
        _s: _s

      $.html('.fair-tagline').should.containEql 'This is a custom tagline'

  describe 'exhibitors columns', ->
    before ->
      partnerShow = new FeedItem fabricate('show',
        _type: "PartnerShow",
        artists: [fabricate('artist')]
        artworks: [fabricate('artwork')]
      )
      @template = render('exhibitors_columns')
        columns: [[partnerShow, partnerShow], [partnerShow, partnerShow]]

    it 'renders without errors', ->
      $ = cheerio.load @template
      $('.exhibitors-column').length.should.equal 2
      $('.exhibitor-name').length.should.equal 4
      $('.exhibitor-item img').length.should.equal 4
