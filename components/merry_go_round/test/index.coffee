_ = require 'underscore'
benv = require 'benv'
rewire = require 'rewire'
Backbone = require 'backbone'
existy = _.negate _.isUndefined

initCarousel = rewire '../index'
stub = class MerryGoRoundFlickity
  constructor: -> @flickity = on: ->
initCarousel.__set__ 'MerryGoRoundFlickity', stub

describe '#initCarousel', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      $.fn.imagesLoaded = (cb) -> cb()
      Backbone.$ = $
      $('body').html "
        <div class='js-carousel'>
          <div class='.js-mgr-cells'>
            <div class='.js-mgr-cell'></div>
            <div class='.js-mgr-cell'></div>
            <div class='.js-mgr-cell'></div>
          </div>
          <nav class='.js-mgr-navigation'></nav>
        </div>
      "
      done()

  after ->
    benv.teardown()

  it 'sets up the carousel', ->
    instance = initCarousel $('.js-carousel')
    existy(instance.cells).should.be.true()
    existy(instance.navigation).should.be.true()

  it 'accepts a callback', (done) ->
    initCarousel $('.js-carousel'), null, (instance) ->
      existy(instance.cells).should.be.true()
      existy(instance.navigation).should.be.true()
      done()

  it 'returns without an error if there is no $el', ->
    initCarousel $('.sorry')
    true.should.be.true()
    initCarousel()
    true.should.be.true()

  describe 'option `imagesLoaded` is `true`', ->
    it 'returns a thennable', (done) ->
      promise = initCarousel $('.js-carousel'), imagesLoaded: true
      promise.then (instance) ->
        existy(instance.cells).should.be.true()
        existy(instance.navigation).should.be.true()
        done()
