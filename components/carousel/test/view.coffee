_ = require 'underscore'
benv = require 'benv'
fs = require 'fs'
jade = require 'jade'
sinon = require 'sinon'
path = require 'path'
{ fabricate } = require 'antigravity'
{ resolve } = require 'path'
AdditionalImage = require '../../../models/additional_image'
Backbone = require 'backbone'

render = (template) ->
  filename = path.resolve __dirname, "../#{template}.jade"
  jade.compile(
    fs.readFileSync(filename),
    { filename: filename }
  )

describe 'CarouselView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      $.fn.fillwidth = ->
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    Carousel = require '../view.coffee'
    @figures = new Backbone.Collection [
      new AdditionalImage fabricate 'artwork_image', { default: true }
      new AdditionalImage fabricate 'artwork_image'
      new AdditionalImage fabricate 'artwork_image'
      new AdditionalImage fabricate 'artwork_image'
      new AdditionalImage fabricate 'artwork_image'
      new AdditionalImage fabricate 'artwork_image'
    ]
    $('body').append $("<div class=\"carousel\"></div>")
    $('.carousel').append render('template')({ carouselFigures: @figures.models })
    Carousel::setStops = sinon.stub()
    @view = new Carousel { el: $('.carousel'), collection: @figures }

  describe '#setStops', ->

    # This doesn't work. Check image widths...?
    xit 'sets stops for shifting the carousel track left', ->
      window.width = 1024
      @view.$('.carousel-pre-decoys').width 1024
      @view.setStops()
      @view.stopPositions.should.have.lengthOf @figures.length
      @view.lastDecoyPosition.should.be.greaterThan _.first(@view.stopPositions)
      @view.lastDecoyPosition.should.be.lessThan _.last(@view.stopPositions)
