_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
mappedAggregations = require '../fixtures/mapped_aggregations'

describe 'HeaderCountsView', ->

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      @HeaderSortsView = benv.requireWithJadeify resolve(__dirname, '../../views/header_sorts_view'), ['template']

      done()

  after ->
    benv.teardown()

  beforeEach ->
    params = new Backbone.Model
    params.defaultParams = sort: 'year'
    @view = new @HeaderSortsView
      params: params

  it 'sorts hash', ->
    @view.sorts.should.eql {
      '-partner_updated_at': 'Recently Updated'
      '-published_at': 'Recently Added'
      '-year': 'Artwork Year (desc.)'
      'year': 'Artwork Year (asc.)'
    }

  describe 'render', ->
    it 'lists all sorts', ->
      $links = @view.render().$('.bordered-pulldown-options a')
      values = []
      labels = []
      $links.map ->
        ($el = $(this)).data('key').should.equal 'sort'
        values.push $el.data('value')
        labels.push $el.text()

      values.should.eql _.keys @view.sorts
      labels.should.eql _.values @view.sorts

    it 'renders with default sort', ->
      @view.render().$el.text().should.containEql 'Sort by:Artwork Year (asc.)'
      @view.params.defaultParams.sort = '-published_at'
      @view.render().$el.text().should.containEql 'Sort by:Recently Added'

  describe 'select', ->
    it 'updates params and DOM on select', ->
      @view.render()
      @view.params.updateWith = sinon.stub()
      e =
        currentTarget: $('<a data-key="foo" data-value="bar">Foo Bar</a>')[0]
        preventDefault: ->

      @view.select e
      $(e.currentTarget).hasClass('bordered-pulldown-active').should.be.true()
      @view.$('.bordered-pulldown-text').text().should.eql 'Foo Bar'
      @view.params.updateWith.calledWith('foo', 'bar').should.be.ok()
