_ = require 'underscore'
benv = require 'benv'
rewire = require 'rewire'
Backbone = require 'backbone'
{ resolve } = require 'path'
FilterableListView = benv.requireWithJadeify resolve(__dirname, '../../../../components/filterable_list/view'), templates = [
  'filtersTemplate'
  'itemsTemplate'
  'headerTemplate'
]
ExhibitionListView = require '../../client/views/exhibitions'
_.map templates, (template) -> ExhibitionListView::[template] = FilterableListView::[template] # Inherited templates

describe 'ExhibitionListView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @collection = new Backbone.Collection(require '../fixtures/exhibitions')
      @view = new ExhibitionListView
        collection: @collection
        group_by: 'start_date'
        filter_by: 'kind'
        filters:
          solo: 'Solo Shows'
          'two-person': 'Two-person Shows'
          group: 'Group Shows'
          screening: 'Screenings'
      done()

  after ->
    benv.teardown()

  describe '#itemTemplate', ->
    beforeEach ->
      @view.render()

    it 'renders correctly', ->
      $item = @view.$('.filterable-list-item').first()
      $item.text().should.containEql 'Ai Weiwei - Circle of Animals/ Zodiac Heads, Los Angeles County Museum of Art, Los Angeles, CA, United States, (Traveling Exhibition).'
      $item.data('value').should.equal 'solo'
