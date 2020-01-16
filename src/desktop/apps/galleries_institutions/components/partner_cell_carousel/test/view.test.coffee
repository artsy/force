benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Partners = require '../../../../../collections/partners'
PartnerCellView = benv.requireWithJadeify require.resolve('../../partner_cell/view'), ['template']
PartnerCellCarouselView = benv.requireWithJadeify require.resolve('../view'), ['template']

describe 'PartnerCellCarouselView', ->

  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      PartnerCellCarouselView.__set__ 'PartnerCellView', PartnerCellView
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @category =
      name: 'Foo Bar'
      facet: 'some-facet'
      id: 'foo-bar'
      partners: [{
        name: 'Gallery Foo'
        id: 'gallery-foo'
        initials: "GF"
        locations: [{ city: "New York" }]
        profile:
          id: "foo-gallery"
          href: "/foo-gallery"
          image: cropped: url: "/foo.jpeg"
      }, {
        name: 'Gallery Bar'
        id: 'gallery-bar'
        initials: "GB"
        locations: [{ city: "New York" }]
        profile:
          id: "bar-gallery",
          href: "/bar-gallery",
          image: cropped: url: "/bar.jpeg"
      }]

    @view = new PartnerCellCarouselView model: @category

  describe '#render', ->
    beforeEach ->
      @view.render()

    it 'renders correctly', ->
      @view.$('.partner-cell-name').map -> $(this).text()
        .get().should.eql [
          'Gallery Foo'
          'Gallery Bar'
        ]
      @view.$('.pcc-header-left').text().should.equal 'Foo Bar'
      @view.$('.pcc-see-all').data('id').should.equal 'foo-bar'
      @view.$('.pcc-see-all').data('facet').should.equal 'some-facet'
