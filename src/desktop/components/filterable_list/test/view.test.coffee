_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
{ fabricate } = require '@artsy/antigravity'
FilterableListView = benv.requireWithJadeify resolve(__dirname, '../view'), [
  'filtersTemplate'
  'itemsTemplate'
  'headerTemplate'
  'itemTemplate'
]

describe 'FilterableListView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  describe 'with grouping', ->
    describe 'with some undefined groupings / bad data', ->
      beforeEach ->
        types = ['catalogue', 'catalogue', 'review', 'interview', 'review']
        years = ['', undefined, '2005-01-01', '2003-01-01', '2010-01-01']
        @collection = new Backbone.Collection _.times 5, (i) ->
          fabricate 'show', type: types[i], year: years[i]
        @view = new FilterableListView
          collection: @collection
          group_by: 'year'
          filter_by: 'type'
          filters:
            catalogue: 'Exhibition Catalogues'
            review: 'Exhibition Reviews'
            interview: 'Interviews'
            monograph: 'Monographs'
            biography: 'Biographies'
        $('body').html @view.render().$el

      it 'renders a grouped list', ->
        @view.$('.filterable-list-item-header').length.should.equal 4
        @view.$('.filterable-list-item-header').first().text().should.equal '2010'
        @view.$('.filterable-list-item-header').last().text().should.equal 'Unknown'

    describe 'with expected data', ->
      beforeEach ->
        types = ['catalogue', 'catalogue', 'review', 'interview', 'review']
        years = ['2005-01-01', '2005-01-01', '2005-01-01', '2003-01-01', '2010-01-01']
        @collection = new Backbone.Collection _.times 5, (i) ->
          fabricate 'show', type: types[i], year: years[i]
        @view = new FilterableListView
          collection: @collection
          group_by: 'year'
          filter_by: 'type'
          filters:
            catalogue: 'Exhibition Catalogues'
            review: 'Exhibition Reviews'
            interview: 'Interviews'
            monograph: 'Monographs'
            biography: 'Biographies'
        $('body').html @view.render().$el

      it 'renders a grouped list', ->
        @view.$('.filterable-list-item-header').length.should.equal 3
        @view.$('.filterable-list-item-header').first().text().should.equal '2010'
        @view.$('.filterable-list-item-header').last().text().should.equal '2003'

      it 'renders the relevant filters', ->
        @view.$('.filterable-list-filter').first().text().should.equal 'All'
        @view.$('.filterable-list-filter').first().hasClass 'is-active'
        @view.$('.filterable-list-filter').first().data('filter').should.equal 'all'
        @view.$('.filterable-list-filter').map(-> $(this).text()).get().should.eql [
          'All'
          'Exhibition Catalogues'
          'Exhibition Reviews'
          'Interviews'
        ]

      it 'filters the view when filters are clicked', ->
        # Click interviews
        @view.$('.filterable-list-filter[data-filter="interview"]').click()
        @view.$('.filterable-list-filter[data-filter="interview"]').hasClass 'is-active'
        @view.$('.filterable-list-filter.is-active').length.should.equal 1
        @view.$('.filterable-list-item-header').length.should.equal 1
        @view.$('.filterable-list-item').length.should.equal 1
        @view.$('.filterable-list-item').data('value').should.equal 'interview'
        # Click reviews
        @view.$('.filterable-list-filter[data-filter="review"]').click()
        @view.$('.filterable-list-filter[data-filter="review"]').hasClass 'is-active'
        @view.$('.filterable-list-filter.is-active').length.should.equal 1
        @view.$('.filterable-list-item-header').length.should.equal 2
        @view.$('.filterable-list-item').length.should.equal 2
        @view.$('.filterable-list-item').data('value').should.equal 'review'

  describe 'without grouping', ->
    beforeEach ->
      types = ['catalogue', 'catalogue', 'review', 'interview', 'review']
      @collection = new Backbone.Collection _.times 5, (i) ->
        fabricate 'show', type: types[i]
      @view = new FilterableListView
        collection: @collection
        filter_by: 'type'
        filters:
          catalogue: 'Exhibition Catalogues'
          review: 'Exhibition Reviews'
          interview: 'Interviews'
          monograph: 'Monographs'
          biography: 'Biographies'
      $('body').html @view.render().$el

    it 'renders a flat list', ->
      @view.$('.filterable-list-item-header').length.should.equal 0
      @view.$('.filterable-list-item').length.should.equal 5

    it 'renders the relevant filters', ->
      @view.$('.filterable-list-filter').first().text().should.equal 'All'
      @view.$('.filterable-list-filter').first().hasClass 'is-active'
      @view.$('.filterable-list-filter').first().data('filter').should.equal 'all'
      @view.$('.filterable-list-filter').map(-> $(this).text()).get().should.eql [
        'All'
        'Exhibition Catalogues'
        'Exhibition Reviews'
        'Interviews'
      ]

    it 'filters the view when filters are clicked', ->
      # Click interviews
      @view.$('.filterable-list-filter[data-filter="interview"]').click()
      @view.$('.filterable-list-filter[data-filter="interview"]').hasClass 'is-active'
      @view.$('.filterable-list-filter.is-active').length.should.equal 1
      @view.$('.filterable-list-item').length.should.equal 1
      @view.$('.filterable-list-item').data('value').should.equal 'interview'
      # Click reviews
      @view.$('.filterable-list-filter[data-filter="review"]').click()
      @view.$('.filterable-list-filter[data-filter="review"]').hasClass 'is-active'
      @view.$('.filterable-list-filter.is-active').length.should.equal 1
      @view.$('.filterable-list-item').length.should.equal 2
      @view.$('.filterable-list-item').data('value').should.equal 'review'
