{ resolve } = require 'path'
benv = require 'benv'
sinon = require 'sinon'
rewire = require 'rewire'
Backbone = require 'backbone'
PartnersView = rewire '../index'
Params = require '../../../components/parameters/filter_params'

describe 'PartnersView', ->
  before (done) ->
    benv.setup =>
      benv.expose
        $: benv.require 'jquery'
      Backbone.$ = $
      PartnersView.__set__ 'LandingCarouselView', sinon.stub()
      PartnersView.__set__ 'PrimaryCarousel', sinon.stub()
      PartnersView.__set__ 'SearchResultsView', sinon.stub()
      PartnersView.__set__ 'FetchFilterPartners', sinon.stub()
      sinon.stub PartnersView::, 'updateUrl'
      $.fn.typeahead = sinon.stub()
      done()

  beforeEach (done) ->
    benv.render resolve(__dirname, '../../../templates/index_landing.jade'), {
      facets: []
      profiles: []
      categories: []
    }, =>
      @params = new Params
      @view = new PartnersView params: @params, root: 'galleries', el: $('body')
      @view.url()
      done()

  after ->
    benv.teardown()

  describe '#url', ->
    it 'formats query string with selection', ->
      @params.set location: 'new-york', silent: true
      @view.url().should.eql '/galleries?location=new-york'

    it 'returns root with no selection', ->
      @view.url().should.eql '/galleries'

  describe 'updateResultsHeading', ->
    beforeEach ->
      @location = @view.dropdownViews[0].currentSelectionName = sinon.stub()
      @category = @view.dropdownViews[1].currentSelectionName = sinon.stub()
      @location.returns ''
      @category.returns ''

    it 'formats without selections correctly', ->
      @view.updateResultsHeading()
      title = @view.$('.galleries-institutions-results-heading').text()
      title.should.eql 'All Galleries'

    it 'formats with location correctly',->
      @location.returns 'New York'
      @view.updateResultsHeading()
      title = @view.$('.galleries-institutions-results-heading').text()
      title.should.eql 'All Galleries near New York'

    it 'formats with category correctly',->
      @category.returns 'Painting'
      @view.updateResultsHeading()
      title = @view.$('.galleries-institutions-results-heading').text()
      title.should.eql 'All Painting Galleries'


    it 'formats with location and category correctly', ->
      @location.returns 'New York'
      @category.returns 'Painting'
      @view.updateResultsHeading()
      title = @view.$('.galleries-institutions-results-heading').text()
      title.should.eql 'All Painting Galleries near New York'

  describe 'paramsChanged', ->
    it 'updates data-state for results', ->
      @params.set location: 'new-york'
      state = @view.$('.galleries-institutions-main-content').attr('data-state')
      state.should.eql 'search'

      @params.unset 'location'
      state = @view.$('.galleries-institutions-main-content').attr('data-state')
      state.should.eql 'landing'

    it 'updates url and heading', ->
      @view.updateUrl = sinon.stub()
      @view.updateResultsHeading = sinon.stub()
      @view.paramsChanged()
      @view.updateUrl.called.should.be.true()
      @view.updateResultsHeading.called.should.be.true()

