{ resolve } = require 'path'
benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
LandingCarouselView = rewire '../landing'
Params = require '../../../components/parameters/filter_params.coffee'

describe 'LandingCarouselView', ->
  before (done) ->
    @category =
      name: 'Foo Bar'
      facet: 'some-facet'
      id: 'foo-bar'
      partners: [{
        name: 'Gallery1'
        id: 'gallery-1'
        initials: "G"
        locations: [{ city: "New York" }]
        profile:
          id: "gallery-1"
          href: "/gallery-1"
          image: cropped: url: "/gallery-1.jpeg"
      }, {
        name: 'Gallery2'
        id: 'gallery-2'
        initials: "G"
        locations: [{ city: "New York" }]
        profile:
          id: "gallery-2"
          href: "/gallery-2"
          image: cropped: url: "/gallery-2.jpeg"
      }, {
        name: 'Gallery3'
        id: 'gallery-3'
        initials: "G"
        locations: [{ city: "New York" }]
        profile:
          id: "gallery-3"
          href: "/gallery-3"
          image: cropped: url: "/gallery-3.jpeg"
      }]

    @fetch = sinon.stub()
    LandingCarouselView.__set__ 'fetchLocationCarousel', @fetch
    @fetch.returns new Promise (resolve, reject) => resolve @category

    @PartnerCellCarouselView = benv.requireWithJadeify resolve(__dirname, '../../../components/partner_cell_carousel/view'), ['template']
    LandingCarouselView.__set__ 'PartnerCellCarouselView', @PartnerCellCarouselView
    @PartnerCellCarouselView.prototype.postRender = sinon.stub()
    @PartnerCellCarouselView.prototype.initialize = sinon.spy()

    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
      Backbone.$ = $
      done()

  beforeEach (done) ->
    benv.render resolve(__dirname, '../../../templates/index_landing.jade'), {
      profiles: []
      facets: []
      categories: [@category]
      ViewHelpers: require '../../../components/partner_cell/view_helpers.coffee'
    }, =>
      @params = new Params type: 'gallery'
      @view = new LandingCarouselView params: @params, el: $('.js-partner-category-carousels')
      done()

  after ->
    benv.teardown()

  describe '#setup', ->
    it 'retuns if already setup', ->
      @view.loaded = true
      @view.setup().then =>
        @PartnerCellCarouselView.prototype.initialize.called.should.be.false()
        @PartnerCellCarouselView.prototype.postRender.called.should.be.false()
        @fetch.called.should.be.false()
        @view.loaded.should.be.true()

    it 'sets up pre-rendered category carousels', ->
      @view.setup().then =>
        @PartnerCellCarouselView.prototype.initialize.called.should.be.true()
        @PartnerCellCarouselView.prototype.postRender.called.should.be.true()
        @fetch.called.should.be.true()
        @view.loaded.should.be.true()

    it 'prepends location carousel', ->
      @view.$('.partner-category-carousel').length.should.eql 1
      @view.setup().then =>
        @view.$('.partner-category-carousel').length.should.eql 2

  describe '#seeAllClicked', ->
    it 'updates params', ->
      @view.seeAllClicked target: $('<a data-id=some-id data-facet=category />')[0], preventDefault: -> #
      @params.get('category').should.eql 'some-id'

  describe '#paramsChanged', ->
    beforeEach ->
      @view.resizeCarousels = sinon.stub()
      @view.setup = sinon.stub()

    it 'does nothing if params has selection', ->
      @params.set category: 'painting'
      @view.paramsChanged(@params)

      @view.resizeCarousels.called.should.be.false()
      @view.setup.called.should.be.false()

    it 'resizes carousels when view becomes visible and is already loaded', ->
      @view.loaded = true
      @view.paramsChanged(@params)

      @view.resizeCarousels.called.should.be.true()
      @view.setup.called.should.be.false()

    it 'sets up carousels when view becomes visible for the first time', ->
      @view.paramsChanged(@params)

      @view.resizeCarousels.called.should.be.false()
      @view.setup.called.should.be.true()
