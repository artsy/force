cheerio = require 'cheerio'
fs = require 'graceful-fs'
jade = require 'jade'
path = require 'path'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
AdditionalImage = require '../../../models/additional_image'

render = (template) ->
  filename = path.resolve __dirname, "../#{template}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'Carousel template', ->

  before ->
    @figures = new Backbone.Collection [
      new AdditionalImage fabricate 'artwork_image', { default: true }
      new AdditionalImage fabricate 'artwork_image'
      new AdditionalImage fabricate 'artwork_image'
      new AdditionalImage fabricate 'artwork_image'
      new AdditionalImage fabricate 'artwork_image'
      new AdditionalImage fabricate 'artwork_image'
    ]

  it 'renders arrows and dots for navigation', ->
    $ = cheerio.load render('template')({ carouselFigures: @figures.models })
    $('.carousel-controls .carousel-arrow-left').should.have.lengthOf 1
    $('.carousel-controls .carousel-arrow-right').should.have.lengthOf 1
    $('.carousel-controls .carousel-dot').should.have.lengthOf @figures.length

  it 'renders three copies of the figures for the wrap around effect', ->
    $ = cheerio.load render('template')({ carouselFigures: @figures.models })
    $('.carousel-pre-decoys .carousel-figure').should.have.lengthOf @figures.length
    $('.carousel-post-decoys .carousel-figure').should.have.lengthOf @figures.length
    $('.carousel-figures .carousel-figure').should.have.lengthOf @figures.length

  it 'gives the main list an index to match figures', ->
    $ = cheerio.load render('template')({ carouselFigures: @figures.models, height: 300 })
    @figures.each (figure, index) ->
      $(".carousel-figure[data-carousel-figure-index='#{index}']").should.have.lengthOf 1
      $(".carousel-figure[data-carousel-figure-index='#{index}'] img").attr('src').should.equal figure.imageUrlForHeight(300)
