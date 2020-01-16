cheerio = require 'cheerio'
fs = require 'fs'
jade = require 'jade'
path = require 'path'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Artwork = require '../../../models/artwork'
Artworks = require '../../../collections/artworks'

render = (template) ->
  filename = path.resolve __dirname, "../#{template}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Artwork Columns template', ->

  before ->
    @artworks = new Artworks([
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
      new Artwork fabricate 'artwork'
    ])

  it 'renders artwork items in columns', ->
    twoCols = @artworks.groupByColumnsInOrder 2
    $ = cheerio.load render('template')({ artworkColumns: twoCols })
    $('.artwork-column').first().find('.artwork-item').should.have.lengthOf (@artworks.length / 2)
    $('.artwork-column').last().find('.artwork-item').should.have.lengthOf (@artworks.length / 2)
    $('.artwork-column').should.have.lengthOf 2

    threeCols = @artworks.groupByColumnsInOrder 3
    $ = cheerio.load render('template')({ artworkColumns: threeCols })
    $('.artwork-column').first().find('.artwork-item').should.have.lengthOf 3
    $('.artwork-column').last().find('.artwork-item').should.have.lengthOf 2
    $('.artwork-column').should.have.lengthOf 3

    eightCols = @artworks.groupByColumnsInOrder 8
    $ = cheerio.load render('template')({ artworkColumns: eightCols })
    $('.artwork-column').first().find('.artwork-item').should.have.lengthOf 1
    $('.artwork-column').should.have.lengthOf 8

  it 'can render empty columns to be populated by the view', ->
    $ = cheerio.load render('template')({ numberOfColumns: 5 })
    $('.artwork-column').should.have.lengthOf 5
    $('.artwork-column').is(':empty').should.be.true()

  it 'will pass an image version for a given height to the artwork item template', ->
    threeCols = @artworks.groupByColumnsInOrder 3
    $ = cheerio.load render('template')({ artworkColumns: threeCols, setHeight: 200 })
    artwork = @artworks.models[0]
    imgSrc = $(".artwork-item[data-artwork='#{artwork.get('id')}'] img").attr 'src'
    imgSrc.should.containEql artwork.defaultImage().imageSizeForHeight 200

    $ = cheerio.load render('template')({ artworkColumns: threeCols, setHeight: 400 })
    artwork = @artworks.models[0]
    imgSrc = $(".artwork-item[data-artwork='#{artwork.get('id')}'] img").attr 'src'
    imgSrc.should.containEql artwork.defaultImage().imageSizeForHeight 400
