_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'
Params = require '../../models/params'
CheckBoxesFilterView = benv.requireWithJadeify resolve(__dirname, '../../filters/check_boxes/check_boxes_filter_view'), ['template']

describe 'CheckBoxesFilterView', ->
  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require('jquery')
        jQuery: benv.require('jquery')
        sd: METAPHYSICS_ENDPOINT: 'http://metaphysics.test'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  describe 'minimal configuration', ->
    beforeEach ->
      params = new Params({sale_id: 'my-sale'}, {})
      @view = new CheckBoxesFilterView(
        itemType: 'medium',
        paramName: 'gene_ids',
        params: params,
        aggregations: new Backbone.Collection([new Backbone.Model(id: 'MEDIUM', counts: [{id: 'design', name: 'Design', count: 12}])])
      )

    describe '#render', ->
      beforeEach ->
        @view.render()

      it 'renders the template', ->
        @view.$el.html().should.containEql '<div class="aggregated-items aggregated-medium">'

      it 'renders all of the checkboxes', ->
        @view.$('.artsy-checkbox').length.should.eql 2
