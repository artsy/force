_ = require 'underscore'
jade = require 'jade'
cheerio = require 'cheerio'
path = require 'path'
fs = require 'fs'
Backbone = require 'backbone'
artists = require './artists_fixture.coffee'

render = (templateName) ->
  filename = path.resolve __dirname, "../index.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Related artists templates', ->

  beforeEach ->

    html = render('index')(
      sd: {
        CLIENT:
          artists: artists
      }
      asset: (->)
    )

    @$ = cheerio.load(html)

  it 'displays related artists header', ->
    @$('.artwork-artist-related-rail__header h2').text().should.equal 'Related Artists'

  it 'displays correct href for view all link', ->
    @$('.artwork-artist-related-rail__header a').attr('href').should.equal '/artist/dustin-yellin/related-artists'

  it 'works without any artists', ->
    html = render('index')(
      sd: {
        CLIENT: { artists: {} }
      }
      asset: (->)
    )
    @$ = cheerio.load(html)
    @$.html().should.equal ''
