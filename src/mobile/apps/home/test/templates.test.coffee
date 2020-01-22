_s = require 'underscore.string'
cheerio = require 'cheerio'
jade = require 'jade'
path = require 'path'
fs = require 'fs'
Shows = require '../../../collections/shows_feed'
Artworks = require '../../../collections/artworks'
FeaturedLinks = require '../../../collections/featured_links'
{ fabricate } = require '@artsy/antigravity'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Current shows template', ->

  it 'shows a properly formatted fair booth', ->
    shows = new Shows [
      fabricate('show',
        name: 'Splattering of Foo paint'
        fair: fabricate('fair', name: 'Foobarzalooza 2013')
        fair_location: { display: 'Pier Bar, Booth Baz' }
        artworks: [fabricate('artwork')]
      )
    ]
    html = render('current_shows')(shows: shows.models, artworkColumnsTemplate: ->)
    html.should.containEql 'Foobarzalooza 2013'
    html.should.containEql 'Pier Bar, Booth Baz'
    html.should.not.containEql 'Splattering of Foo paint'

  it 'shows a properly formatted non-fair exhibition', ->
    shows = new Shows [
      fabricate('show',
        name: 'Splattering of Foo paint'
        fair: null
        artworks: [fabricate('artwork')]
      )
    ]
    html = render('current_shows')(shows: shows.models, artworkColumnsTemplate: ->)
    html.should.containEql 'Splattering of Foo paint'

describe 'Featured artworks template', ->

  it 'shows the blurb of featured artworks if included', ->
    artworks = new Artworks [
      fabricate('artwork',
        blurb: 'Blurb about what else, cats'
      )
    ]
    html = render('featured_works')(artworks: artworks.models, sd: {})
    html.should.containEql 'Blurb about what else, cats'

describe 'Index', ->

  it 'with hero units', ->
    heroUnits = [
      { title: 'Diary of a cat' }
      { title: 'Diary of a dog' }
    ]
    html = render('page')(heroUnits: heroUnits, sd: {}, _s: _s, resize: () -> {})
    html.should.containEql 'Diary of a cat'
    $ = cheerio.load html

    $('.home-page-hero-unit').length.should.equal 2

  describe 'with one hero unit', ->

    it 'has no dots', ->

  it 'with no hero units', ->
    html = render('page')(heroUnits: [], sd: {})
    html.should.containEql 'Current Shows'
