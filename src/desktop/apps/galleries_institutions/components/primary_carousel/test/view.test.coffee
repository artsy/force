benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
Profiles = require '../../../../../collections/profiles.coffee'
rewire = require 'rewire'
PrimaryCarousel = rewire '../view.coffee'
{ fabricate } = require '@artsy/antigravity'

describe 'PrimaryCarousel', ->
  before (done) ->
    benv.setup ->
      benv.expose
        $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  describe '#setupFlickity', ->
    beforeEach ->
      @initCarousel = sinon.stub()
      @initCarousel.returns { cells: { flickity: { on: -> } } }
      PrimaryCarousel.__set__ 'initCarousel', @initCarousel

    it 'does not set up carousel if no profile', ->
      view = new PrimaryCarousel
        params: new Backbone.Model
        profiles: new Profiles []
        el: $('body')

      view.setupFlickity()
      @initCarousel.notCalled.should.be.ok()

    it 'sets up carousel without auto play if only one profile', ->
      view = new PrimaryCarousel
        params: new Backbone.Model
        profiles: new Profiles [fabricate 'profile']
        el: $('body')

      view.setupFlickity()
      @initCarousel.calledOnce.should.be.ok()
      @initCarousel.args[0][1].autoPlay.should.equal false

    it 'sets up carousel with auto play if more than one profile', ->
      view = new PrimaryCarousel
        params: new Backbone.Model
        profiles: new Profiles [fabricate('profile', id: '1'), fabricate('profile', id: '2')]
        el: $('body')

      view.setupFlickity()
      @initCarousel.calledOnce.should.be.ok()
      @initCarousel.args[0][1].autoPlay.should.equal true
