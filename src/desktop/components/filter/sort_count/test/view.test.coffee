_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'

describe 'FilterSortCount', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      FilterSortCount = benv.require resolve(__dirname, '../view')
      @view = new FilterSortCount
        el: $ "<div></div>"
        counts: new Backbone.Model
        params: new Backbone.Model
      done()

  afterEach ->
    benv.teardown()

  it 'renders the counts', ->
    @view.counts = new Backbone.Model total: 1001
    @view.$el = $ "<div><div class='filter-sort-count-total'></div></div>"
    @view.renderTotal()
    @view.$el.html().should.containEql '1,001'

  it 'updates the params to sort', ->
    @view.sort target: $ "<div data-sort='-foo'></div>"
    @view.params.get('sort').should.equal '-foo'

  it 'renders singulars like a bawse', ->
    @view.counts.set total: 1
    @view.renderTotal()
    @view.$el.html().should.not.containEql 'Works'
