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

  describe '#formattedTraveling', ->
    beforeEach ->
      @view.preprocessTraveling()
      @parent = @collection.find (item) ->
        item.has('children') and
        item.get('children').length > 2
      @childless = @collection.find (item) ->
        not item.has('children')

    it 'formats the travel history correctly', ->
      $(@view.formattedTraveling(@parent)).text()
        .should.containEql 'Traveled to Cleveland Museum of Art, Cleveland, OH, United States, 2004; Perez Museum of Art, Miami, FL, United States, 2004;'

    it 'returns an empty string when there are no children', ->
      $(@view.formattedTraveling(@childless)).text().should.equal ''

  describe '#itemTemplate', ->
    beforeEach ->
      @view.render()

    it 'renders correctly', ->
      $item = @view.$('.filterable-list-item').first()
      $item.text().should.containEql 'Damage Control, Mudam; luxembourg, Luxembourg, Luxembourg.'
      $item.text().should.containEql 'Traveled to Museum Joanneum, Graz, Austria, 2011;'
      $item.data('value').should.equal 'group'
