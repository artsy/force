_ = require 'underscore'
sinon = require 'sinon'
benv = require 'benv'
rewire = require 'rewire'
Backbone = require 'backbone'
ResultsView = rewire '../view.coffee'
PartnerCellView = benv.requireWithJadeify require.resolve('../../partner_cell/view'), ['template']

describe 'ResultsView', ->

  nPartners = (range) ->
    range.map (i) ->
      return {
        name: 'Gallery' + i
        id: 'gallery-' + i
        initials: "IDK"
        locations: [{ city: "New York" }]
        profile:
          id: 'gallery-' + i
          href: '/gallery-' + i
          image: cropped: url: "/gallery-#{i}.jpeg"
      }

  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      ResultsView.__set__ 'PartnerCellView', PartnerCellView
      $.onInfiniteScroll = sinon.stub()
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @filterPartners = new Backbone.Model
    @params = new Backbone.Model
    $('body').html """
      <div class=galleries-institutions-results-grid></div>
      <div class=galleries-institutions-spinner>
        <div class=loading-spinner></div>
      </div>'
    """
    @view = new ResultsView
      params: @params
      filterPartners: @filterPartners
      el: ('body')

    @view.fetch = sinon.stub()

  describe '#render', ->
    beforeEach ->
      @partners = nPartners(_.range(1, 11))

    it 'sets state for not all fetched yet', ->
      @filterPartners.allFetched = false
      @view.render(@partners)
      @view.$el.attr('data-state').should.equal ''

    it 'sets state for all fetched', ->
      @filterPartners.allFetched = true
      @view.render(@partners)
      @view.$el.attr('data-state').should.equal 'finished-paging'

    it 'renders grid', ->
      @view.render(@partners)

      @view.$gridContainer.children().length.should.equal 10
      names1 = _.pluck(@partners, 'name')
      @view.$('.partner-cell-name').map -> $(this).text()
        .get().should.eql names1

      partnersPage2 = nPartners(_.range(11, 21))
      names2 = _.pluck(partnersPage2, 'name')

      @view.render(partnersPage2)
      @view.$gridContainer.children().length.should.equal 20
      @view.$('.partner-cell-name').map -> $(this).text()
        .get().should.eql names1.concat(names2)

  describe '#reset', ->
    it 'clears the ui and starts a new fetch', ->
      @view.$gridContainer.html '<div></div>'
      @view.reset()

      @view.$gridContainer.html().should.equal ''
      @view.fetch.calledOnce.should.be.true()

  describe '#fetchNextPage', ->
    beforeEach ->
      @params.hasSelection = sinon.stub()

    it 'does not fetch if no params selected', ->
      @params.hasSelection.returns false
      @filterPartners.allFetched = false
      @view.fetchNextPage()
      @view.fetch.called.should.be.false()

    it 'does not fetch if all results are fetched', ->
      @params.hasSelection.returns true
      @filterPartners.allFetched = true
      @view.fetchNextPage()
      @view.fetch.called.should.be.false()

    it 'fetches otherwise', ->
      @params.hasSelection.returns true
      @filterPartners.allFetched = false
      @view.fetchNextPage()
      @view.fetch.calledOnce.should.be.true()
