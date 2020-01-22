benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Partner = require '../../../../../models/partner'
PartnerCellView = benv.requireWithJadeify require.resolve('../view'), ['template']

PartnerCellView.__set__ 'Cities', [{"slug": "new-york-ny-usa", "name": "New York", "full_name": "New York, NY, USA", "coords": [40.71, -74.01 ] }]

describe 'PartnerCellView', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @partner = {
      id: "soze-gallery",
      name: "Soze Gallery",
      initials: "SG",
      locations: [{ city: "Los Angeles" }, { city: "New York" }],
      profile:
        id: "soze-gallery",
        href: "/soze-gallery",
        image: cropped: url: "/something.jpeg"
    }

  describe '#render', ->
    it 'renders partner data', ->
      @view = new PartnerCellView partner: @partner
      @view.render()
      @view.$('.partner-cell-name').text().should.equal 'Soze Gallery'
      @view.$('.partner-cell-follow-button').data('id').should.equal 'soze-gallery'
      @view.$('.partner-featured-image').attr('href').should.equal '/soze-gallery'
      @view.$('.partner-cell-name').attr('href').should.equal '/soze-gallery'
      @view.$('.hoverable-image').data('initials').should.equal 'SG'

    describe 'with an image', ->
      beforeEach ->
        @view = new PartnerCellView partner: @partner
        @view.render()

      it 'sets the class', ->
        @view.$('.hoverable-image').hasClass('is-missing').should.be.false()

      it 'sets background image', ->
        @view.$('.hoverable-image').attr('style').should.containEql 'background-image: url(/something.jpeg)'

    describe 'without an image', ->
      beforeEach ->
        @partner.profile.image = {}
        @view = new PartnerCellView partner: @partner
        @view.render()

      it 'sets the class', ->
        @view.$('.hoverable-image').hasClass('is-missing').should.be.true()

      it 'does not set background image', ->
        @view.$('.hoverable-image').is('style').should.be.false()

    describe 'preferred city', ->
      it 'lists preferred city first if gallery location matches', ->
        @view = new PartnerCellView partner: @partner, preferredCitySlug: 'new-york-ny-usa'
        @view.render()

        @view.$('.partner-cell-location').text().should.equal 'New York & 1 other location'

      it 'lists first location first if gallery location does not match', ->
        @view = new PartnerCellView partner: @partner, preferredCitySlug: 'tokyo'
        @view.render()

        @view.$('.partner-cell-location').text().should.equal 'Los Angeles & 1 other location'

      it 'lists first location first if no peferred city provided', ->
        @view = new PartnerCellView partner: @partner
        @view.render()

        @view.$('.partner-cell-location').text().should.equal 'Los Angeles & 1 other location'
