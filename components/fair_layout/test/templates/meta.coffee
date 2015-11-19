_ = require 'underscore'
_s = require 'underscore.string'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
{ fabricate } = require 'antigravity'
Fair = require '../../../../models/fair'
Profile = require '../../../../models/profile'
CurrentUser = require '../../../../models/current_user'
cheerio = require 'cheerio'

@fair = new Fair fabricate 'fair'
@profile = new Profile fabricate 'fair_profile'

render = (templateName) ->
  filename = path.resolve __dirname, "../../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
)

describe 'Metatags', ->
  describe 'overview page', ->

    before (done) ->
      sd =
        APP_URL: 'http://localhost:5000'
        API_URL: 'http://localhost:5000'
        NODE_ENV: 'test'
        FAIR: fabricate 'fair'
        CURRENT_PATH: '/cool-fair'
        SECTION: 'overview'
      fair = new Fair (sd.FAIR)
      profile = new Profile (sd.PROFILE)
      template = render('head')
        sd: sd
        fair: fair
        profile: profile
        _s: _s
        asset: (->)
      @$template = cheerio.load template
      done()

    it 'renders the default title and description in the root directory', ->
      @$template.html().should.containEql '<title>Armory Show 2013 | Artsy</title>'
      @$template.html().should.containEql '<meta name="description" content="Browse artworks, artists and exhibitors from Armory Show 2013 on Artsy.">'

  describe 'articles page', ->
    before (done) ->
      sd =
        APP_URL: 'http://localhost:5000'
        API_URL: 'http://localhost:5000'
        NODE_ENV: 'test'
        FAIR: fabricate 'fair'
        CURRENT_PATH: '/cool-fair/articles'
        SECTION: 'posts'
      fair = new Fair (sd.FAIR)
      profile = new Profile (sd.PROFILE)
      template = render('head')
        sd: sd
        fair: fair
        profile: profile
        _s: _s
        asset: (->)
      @$template = cheerio.load template
      done()

    it 'renders article metadata', ->
      @$template.html().should.containEql '<title>Exclusive Artsy Editorial from Armory Show 2013</title>'
      @$template.html().should.containEql '<meta name="description" content="Read the latest articles from Armory Show 2013 on Artsy.">'

  describe 'visitor info page', ->
    before (done) ->
      sd =
        APP_URL: 'http://localhost:5000'
        API_URL: 'http://localhost:5000'
        NODE_ENV: 'test'
        FAIR: fabricate 'fair'
        CURRENT_PATH: '/cool-fair/info'
        SECTION: 'info'
      fair = new Fair (sd.FAIR)
      profile = new Profile (sd.PROFILE)
      template = render('head')
        sd: sd
        fair: fair
        profile: profile
        _s: _s
        asset: (->)
      @$template = cheerio.load template
      done()

    it 'renders info metadata', ->
      @$template.html().should.containEql '<title>Visitor information: Armory Show 2013</title>'
      @$template.html().should.containEql '<meta name="description" content="Plan your visit to Armory Show 2013: Hours, address, contact information, and more on Artsy.">'

  describe 'artworks page', ->
    before (done) ->
      sd =
        APP_URL: 'http://localhost:5000'
        API_URL: 'http://localhost:5000'
        NODE_ENV: 'test'
        FAIR: fabricate 'fair'
        CURRENT_PATH: '/browse/artworks'
        SECTION: 'browse'
      fair = new Fair (sd.FAIR)
      profile = new Profile (sd.PROFILE)
      template = render('head')
        sd: sd
        fair: fair
        profile: profile
        _s: _s
        asset: (->)
      @$template = cheerio.load template
      done()

    it 'renders artwork page metadata', ->
      @$template.html().should.containEql '<title>Artworks from Armory Show 2013</title>'
      @$template.html().should.containEql '<meta name="description" content="Browse artworks being shown at Armory Show 2013 on Artsy.">'

  describe 'exhibitors page', ->
    before (done) ->
      sd =
        APP_URL: 'http://localhost:5000'
        API_URL: 'http://localhost:5000'
        NODE_ENV: 'test'
        FAIR: fabricate 'fair'
        CURRENT_PATH: '/browse/booths'
        SECTION: 'browse'
      fair = new Fair (sd.FAIR)
      profile = new Profile (sd.PROFILE)
      template = render('head')
        sd: sd
        fair: fair
        profile: profile
        _s: _s
        asset: (->)
      @$template = cheerio.load template
      done()

    it 'renders exhibitor page metadata', ->
      @$template.html().should.containEql '<title>Exhibitors at Armory Show 2013</title>'
      @$template.html().should.containEql '<meta name="description" content="Browse galleries exhibiting at Armory Show 2013 on Artsy.">'  

  describe 'fair artist page', ->
    before (done) ->
      sd =
        APP_URL: 'http://localhost:5000'
        API_URL: 'http://localhost:5000'
        NODE_ENV: 'test'
        FAIR: fabricate 'fair'
        CURRENT_PATH: '/browse/artist/andy-foobar'
        SECTION: 'browse'
      fair = new Fair (sd.FAIR)
      profile = new Profile (sd.PROFILE)
      template = render('head')
        sd: sd
        fair: fair
        profile: profile
        _s: _s
        asset: (->)
      @$template = cheerio.load template
      done()

    it 'renders fair artist page metadata', ->
      @$template.html().should.containEql '<title>Andy Foobar at Armory Show 2013</title>'
      @$template.html().should.containEql '<meta name="description" content="Browse works by Andy Foobar being shown at Armory Show 2013 on Artsy.">'    
