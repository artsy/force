_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'

describe 'FilterArtworksNav', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      $.fn.hidehover = sinon.stub()
      benv.render resolve(__dirname, '../template.jade'), { sd: {}, filterRoot: '/browse/artworks' }, =>
        FilterArtworksNav = benv.require resolve(__dirname, '../view')
        @view = new FilterArtworksNav
          el: $('.filter-nav')
          params: new Backbone.Model
          counts: new Backbone.Model
        done()

  afterEach ->
    benv.teardown()

  it 'renders counts', ->
    @view.counts.set
      price_range: '-1:1000000000000': name: '-1:1000000000000', count: 51
      dimension: '24': name: '24', count: 38
    @view.renderCounts()
    @view.$el.html().should.containEql '(51)'
    @view.$el.html().should.containEql '(38)'

  it 'renders counts for data in form { c: 10 }', ->
    @view.counts.set
      price_range: '-1:1000000000000': name: '-1:1000000000000', c: 51
      dimension: '24': name: '24', count: 38
    @view.renderCounts()
    @view.$el.html().should.containEql '(51)'
    @view.$el.html().should.containEql '(38)'


  it 'renders counts for data in form { painting: 10 }', ->
    @view.counts.set
      price_range: '-1:1000000000000': 51
      dimension: '24': 38
    @view.renderCounts()
    @view.$el.html().should.containEql '(51)'
    @view.$el.html().should.containEql '(38)'


  it 'renders without errors', ->
    @view.$el.html().should.not.containEql 'undefined'

  describe '#minCount', ->
    it 'returns a minimum count threshold', ->
      @view.counts.clear()
      @view.counts.set
        foobar:
          baz: name: 'Baz', count: 42
          qux: name: 'Qux', count: 1
        dimension:
          a: name: 'A', count: 11
          b: name: 'B', count: 21
          c: name: 'C', count: 31
          d: name: 'D', count: 41
          e: name: 'E', count: 51
          f: name: 'F', count: 61
          g: name: 'G', count: 71
          h: name: 'H', count: 81
          i: name: 'I', count: 91
          j: name: 'J', count: 101
          k: name: 'K', count: 115
          l: name: 'L', count: 121

      @view.minCount('foobar').should.equal 1
      @view.minCount('dimension').should.equal 31
      @view.minCount('dimension', 3).should.equal 101
