_ = require 'underscore'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
cheerio = require 'cheerio'
Backbone = require 'backbone'
Shows = require '../../../collections/shows_feed'
Fair = require '../../../models/fair'
Profile = require '../../../models/profile'
PartnerLocation = require '../../../models/partner_location'
Artist = require '../../../models/artist'
Article = require '../../../models/article'
{ fabricate } = require '@artsy/antigravity'
SearchResult = require '../../../models/search_result'
Artworks = require '../../../collections/artworks'

describe 'Artworks template', ->
  describe 'with no params', ->
    beforeEach ->
      filename = path.resolve __dirname, "../templates/artworks.jade"
      @page = jade.compile(fs.readFileSync(filename), filename: filename) {
        sd: {}
        fair: new Fair fabricate 'fair', filter_genes: []
        filters: new Backbone.Model medium: {}, related_genes: {}
      }

    it 'renders correctly', ->
      @page.should.containEql '<a href="/the-armory-show/browse/artworks?filter=true">All Works</a>'
      @page.should.containEql 'fairs-artworks-categories'
      @page.should.not.containEql 'fair-artworks-list'

  describe 'with params', ->
    beforeEach ->
      filename = path.resolve __dirname, "../templates/artworks.jade"
      @page = jade.compile(fs.readFileSync(filename), filename: filename) {
        sd: PARAMS: filter: 'true'
        fair: new Fair fabricate 'fair', filter_genes: []
        filters: new Backbone.Model medium: {}, related_genes: {}
      }

    it 'renders correctly', ->
      @page.should.not.containEql '<a href="/the-armory-show/browse/artworks?filter=true">All Works</a>'
      @page.should.containEql 'artwork-filter-content'

describe 'Exhibitors template', ->
  describe 'A-Z link', ->
    render = (options) ->
      defaults =
        fair: new Fair(fabricate 'fair')
        shows: new Shows(fabricate 'show', fair_location: {})
        displayToggle: true
        artworkColumnsTemplate: ->
        sd: {}
      params = _.extend defaults, options

      filename = path.resolve __dirname, "../templates/exhibitors_page.jade"
      jade.compile(fs.readFileSync(filename), filename: filename) params

    it 'hides the A-Z link unless its all exhibitors', ->
      render(displayToggle: false).should.not.containEql 'a-z-feed-toggle-container'
      render().should.containEql 'a-z-feed-toggle-container'

  describe 'less than 6 artworks', ->
    before ->
      render = (templateName) ->
        filename = path.resolve __dirname, "../templates/exhibitors_page.jade"
        jade.compile(fs.readFileSync(filename), filename: filename)

      @shows = new Shows [fabricate('show', fair: fabricate('fair'), artwork: fabricate('artwork'))]
      @template = render('exhibitors')(
        shows: @shows
        fair: new Fair fabricate 'fair', name: 'Armory Show 2013'
        sd: {}
      )

    it 'should not display artwork slider', ->
      $ = cheerio.load @template
      $.html().should.not.containEql 'fair-exhibit-artworks-slider'

  describe 'more than 6 artworks', ->
    before ->
      render = (templateName) ->
        filename = path.resolve __dirname, "../templates/exhibitors_page.jade"
        jade.compile(fs.readFileSync(filename), filename: filename)

      artworks = [
        fabricate('artwork', id: 1),
        fabricate('artwork', id: 2),
        fabricate('artwork', id: 3),
        fabricate('artwork', id: 4),
        fabricate('artwork', id: 5),
        fabricate('artwork', id: 6),
        fabricate('artwork', id: 7)
      ]
      @shows = new Shows [fabricate('show', fair: fabricate('fair'), artworks: artworks)]
      @template = render('exhibitors')(
        shows: @shows
        fair: new Fair fabricate 'fair', name: 'Armory Show 2013'
        sd: {}
      )

    xit 'should display artwork slider', ->
      $ = cheerio.load @template
      $.html().should.containEql 'fair-exhibit-artworks-slider'

describe 'Sections template', ->

  render = (options) ->
    defaults =
      fair: new Fair(fabricate 'fair')
      shows: new Shows(fabricate 'show', fair_location: {})
      displayToggle: true
      artworkColumnsTemplate: ->
      sd: {}
      sections: new Backbone.Collection([
        { section: '', partner_shows_count: 10 }
        { section: 'Pier 1', partner_shows_count: 2 }
      ]).models
    params = _.extend defaults, options

    filename = path.resolve __dirname, "../templates/sections.jade"
    jade.compile(fs.readFileSync(filename), filename: filename) params

  it 'working links', ->
    render().should.not.containEql 'null'

describe 'Main page template ', ->

  beforeEach ->

  render = (profile, fair) ->
    filename = path.resolve __dirname, "../templates/main_page.jade"
    jade.compile(fs.readFileSync(filename), filename: filename)
      fair: fair
      profile: profile
      sd: {}
      sections: new Backbone.Collection([
        { section: '', partner_shows_count: 10 }
        { section: 'Pier 1', partner_shows_count: 2 }
      ]).models

  it 'renders a profile icon', ->
    profile = new Profile(fabricate('profile'))
    fair = new Fair(fabricate('fair'))

    render(profile, fair).should.containEql profile.iconUrl()
    render(profile, fair).should.containEql 'fair-page-profile-icon'
    profile.unset 'icon'
    render(profile, fair).should.not.containEql 'fair-page-profile-icon'

  it 'renders a banner when one is present', ->
    profile = new Profile(fabricate('profile'))
    fair = new Fair(fabricate('fair'))

    fair.set 'banner_image_urls', {'mobile-fair-cover': 'http://placehold.it/350x150'}

    render(profile, fair).should.containEql 'mobile-fair-cover'
    render(profile, fair).should.not.containEql 'fair-page-profile-icon'

    fair.unset 'banner_image_urls'

    render(profile, fair).should.not.containEql 'mobile-fair-cover'
    render(profile, fair).should.containEql 'fair-page-profile-icon'

describe 'Info page template ', ->

  render = (fair, location) ->
    filename = path.resolve __dirname, "../templates/info.jade"
    jade.compile(fs.readFileSync(filename), filename: filename)
      fair: fair
      location: location
      sd: {}

  it 'does not render a map without coordinates', ->
    fair = new Fair fabricate('fair')
    @html = render fair, new PartnerLocation(fair.get('location'))
    @html.should.not.containEql 'fair-page-info-map'

  it 'render a map with coordinates', ->
    fair = new Fair fabricate('fair')
    @html = render fair, new PartnerLocation(fair.get('location'), coordinates: { lat: 1, lng: 2 } )
    @html.should.not.containEql 'fair-page-info-map'

  it 'renders markdown converted content', ->
    fair = new Fair fabricate('fair')
    @html = render fair, new PartnerLocation(fair.get('location'))
    @html.should.containEql fair.mdToHtml('about')
    @html.should.containEql 'fair-page-info-content'

describe 'Search', ->

  beforeEach ->
    @results = [
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
    @fairResults = [
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
    @term = 'bitty'
    @fair = new Fair (fabricate 'fair', about: 'about the fair', id: 'cat')
    @fairResults[0].updateForFair @fair
    @profile = new Profile(fabricate('profile', id: 'dog'))

  render = (locals) ->
    filename = path.resolve __dirname, "../templates/search_results.jade"
    jade.compile(fs.readFileSync(filename), filename: filename)(locals)

  it 'renders without errors', ->
    html = render(
      fair: @fair
      term: @term
      fairResults: @fairResults
      results: @results
      sd: {}
      profile: @profile
    )
    $ = cheerio.load html
    $('.artsy-search-results .search-result').length.should.equal 1
    $('.fair-search-results .search-result').html().should.containEql 'Booth'
    $('.fair-search-results .search-result').length.should.equal 1

  it 'submits the form to the correct route', ->
    html = render(
      fair: @fair
      term: @term
      fairResults: @fairResults
      results: @results
      sd: {}
      profile: @profile
    )
    $ = cheerio.load html
    $('form').attr('action').should.equal 'dog/search'  # note this is the profile id

  xdescribe 'For You template ', ->

  describe 'Artist template ', ->

    it 'protects against those crazy fair booths that exist in the aether', ->
      # TODO: Consolidate these various render helpers
      profile = @profile
      fairResults = @fairResults
      results = @results

      render = (params) ->
        filename = path.resolve __dirname, "../templates/artist.jade"
        jade.compile(fs.readFileSync(filename), filename: filename) _.extend(
          profile: profile
          artist: new Artist fabricate 'artist'
          fairResults: fairResults
          results: results
          fair: new Backbone.Model fabricate 'fair'
          sd: {}
        , params)
      render {
        shows: new Shows [fabricate 'show', fair_location: null]
      }, 'artist'

describe 'article page template ', ->

  beforeEach ->

  render = (profile, fair) ->
    filename = path.resolve __dirname, "../templates/article.jade"
    jade.compile(fs.readFileSync(filename), filename: filename)(
      fair: fair
      profile: profile
      sd: {}
      article: new Article fabricate 'article'
      resize: ->
    )

  it 'renders the article body', ->
    profile = new Profile(fabricate('profile'))
    fair = new Fair(fabricate('fair'))

    articlePage = render profile, fair
    articlePage.should.containEql 'On The Heels of A Stellar Year'
    articlePage.should.containEql 'Taipei Biennial'
