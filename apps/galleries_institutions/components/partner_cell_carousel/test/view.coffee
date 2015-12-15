benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'
Partners = require '../../../../../collections/partners'
PartnerCellView = benv.requireWithJadeify require.resolve('../../partner_cell/view'), ['template']
PartnerCellCarouselView = benv.requireWithJadeify require.resolve('../view'), ['template']
PartnerCellCarouselView.__set__ 'PartnerCellView', PartnerCellView

describe 'PartnerCellCarouselView', ->

  before (done) ->
    benv.setup ->
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @category = new Backbone.Model name: 'Foo Bar'
    @partners = new Partners [
      fabricate 'partner', name: 'Gallery Foo'
      fabricate 'partner', name: 'Gallery Bar'
    ]
    @view = new PartnerCellCarouselView category: @category, partners: @partners

  describe '#render', ->
    beforeEach ->
      @view.render()

    it 'renders correctly', ->
      @view.$('.partner-cell-name').map -> $(this).text()
        .get().should.eql [
          'Gallery Foo'
          'Gallery Bar'
        ]
