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
BiblographyListView = require '../../client/views/bibliography'
_.map templates, (template) -> BiblographyListView::[template] = FilterableListView::[template] # Inherited templates

describe 'BiblographyListView', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @collection = new Backbone.Collection(require '../fixtures/publications')
      @view = new BiblographyListView
        collection: @collection
        group_by: 'publish_date'
        filter_by: 'kind'
        filters:
          book: 'Books'
          article: 'Articles'
          catalogue: 'Exhibition Catalogues'
          review: 'Exhibition Reviews'
          interview: 'Interviews'
          monograph: 'Monographs'
          biography: 'Biographies'
      done()

  after ->
    benv.teardown()

  describe '#itemTemplate', ->
    beforeEach ->
      @view.render()

    it 'renders correctly', ->
      $item = @view.$('.filterable-list-item').first()
      $item.text().should.containEql 'Walther König. Sterling Ruby: Softwork.'
      $item.data('value').should.equal 'monograph'
