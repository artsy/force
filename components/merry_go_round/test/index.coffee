_ = require 'underscore'
benv = require 'benv'
rewire = require 'rewire'
Backbone = require 'backbone'
existy = _.negate _.isUndefined
initCarousel = rewire '../index'
template = require('jade').compileFile(require.resolve '../templates/bottom_navigation.jade')

describe '#initCarousel', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      $.fn.imagesLoaded = (cb) -> cb()
      Backbone.$ = $

      flickity =
        on: (->)
        cells: [target: {}]
        selectedCell: target: {}
        getLastCell: -> target: {}

      stub = class MerryGoRoundFlickity
        constructor: -> @flickity = flickity

      initCarousel.__set__ 'MerryGoRoundFlickity', stub

      $('body').html "
        <div class='js-carousel'>
          <div class='js-mgr-cells'>
            <div class='js-mgr-cell'></div>
            <div class='js-mgr-cell'></div>
            <div class='js-mgr-cell'></div>
          </div>
          <nav class='js-mgr-navigation'></nav>
        </div>
      "
      done()

  after ->
    benv.teardown()

  it 'sets up the carousel', ->
    instance = initCarousel $('.js-carousel'), template: template
    existy(instance.cells).should.be.true()
    existy(instance.navigation).should.be.true()

  it 'pre-renders the navigation', ->
    instance = initCarousel $('.js-carousel'), template: template
    html = instance.navigation.$el.html()
    html.should.containEql 'mgr-arrow-left'
    html.should.containEql 'mgr-dots'
    html.should.containEql 'mgr-arrow-right'

  it 'accepts a callback', ->
    initCarousel $('.js-carousel'), template: template, (instance) ->
      existy(instance.cells).should.be.true()
      existy(instance.navigation).should.be.true()

  it 'returns without an error if there is no $el', ->
    initCarousel $('.sorry')
    _.isUndefined initCarousel()
      .should.be.true()

  describe 'option `imagesLoaded` is `true`', ->
    it 'returns a thennable', ->
      initCarousel $('.js-carousel'), imagesLoaded: true, template: template
        .then (instance) ->
          existy(instance.cells).should.be.true()
          existy(instance.navigation).should.be.true()
