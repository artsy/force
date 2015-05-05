_ = require 'underscore'
fs = require 'fs'
jade = require 'jade'
path = require 'path'
{ fabricate } = require 'antigravity'
Artwork = require '../../../../../models/artwork'

render = (templateName) ->
  filename = path.resolve __dirname, "../templates/#{templateName}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'index template', ->

  beforeEach ->
    @locals =
      sd: {}
      artwork: @artwork = new Artwork fabricate 'artwork'

  it 'is defensive about that trixy missing artist', ->
    @artwork.isContactable = -> true
    @artwork.isPriceDisplayable = -> true
    @artwork.set artist: null
    render('index')(_.extend @locals,
    ).should.containEql "I'm interested in this work."