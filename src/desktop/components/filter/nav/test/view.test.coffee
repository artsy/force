_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'

describe 'FilterNav', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      $.fn.hidehover = sinon.stub()
      FilterNav = require '../view'
      @view = new FilterNav
        el: $ """
          <nav class="filter-nav filter-artworks-nav">
             <a class="filter-button filter-nav-all is-active">All Works</a>
             <div class="filter-dropdown is-active">
                <div class="filter-nav-main-text">Price</div>
                <div class="filter-nav-active-text">$1,000 to $5,000</div>
                <div class="icon-arrow-down"></div>
                <nav style=""><a data-attr="price_range" data-val=""><span class="filter-dropdown-text">All Works</span><span class="filter-dropdown-count"></span><span class="icon-check"></span></a><a data-attr="price_range" data-val="-1:1000" class=""><span class="filter-dropdown-text">Under $1,000</span><span class="filter-dropdown-count"></span><span class="icon-check"></span></a><a data-attr="price_range" data-val="1000:5000" class="is-active"><span class="filter-dropdown-text">$1,000 to $5,000</span><span class="filter-dropdown-count"></span><span class="icon-check"></span></a><a data-attr="price_range" data-val="5000:10000"><span class="filter-dropdown-text">$5,000 to $10,000</span><span class="filter-dropdown-count"></span><span class="icon-check"></span></a><a data-attr="price_range" data-val="10000:50000"><span class="filter-dropdown-text">$10,000 to $50,000</span><span class="filter-dropdown-count"></span><span class="icon-check"></span></a><a data-attr="price_range" data-val="50000:1000000000000"><span class="filter-dropdown-text">Over $50,000</span><span class="filter-dropdown-count"></span><span class="icon-check"></span></a><a data-attr="price_range" data-val="-1:1000000000000"><span class="filter-dropdown-text">All For Sale</span><span class="filter-dropdown-count">(1228)</span><span class="icon-check"></span></a></nav>
             </div>
             <div class="filter-dropdown is-active">
                <div class="filter-nav-main-text">Size</div>
                <div class="filter-nav-active-text">Small</div>
                <div class="icon-arrow-down"></div>
                <nav style=""><a data-attr="dimension" data-val=""><span class="filter-dropdown-text">All Sizes</span><span class="filter-dropdown-count"></span><span class="icon-check"></span></a><a data-attr="dimension" data-val="24" class="is-active"><span class="filter-dropdown-text">Small</span><span class="filter-dropdown-count">(17)</span><span class="icon-check"></span></a><a data-attr="dimension" data-val="48"><span class="filter-dropdown-text">Medium</span><span class="filter-dropdown-count">(5)</span><span class="icon-check"></span></a><a data-attr="dimension" data-val="84"><span class="filter-dropdown-text">Large</span><span class="filter-dropdown-count">(87)</span><span class="icon-check"></span></a></nav>
             </div>
          </nav>
        """
        params: new Backbone.Model
      done()

  afterEach ->
    benv.teardown()

  describe '#clearActive', ->

    it 'clears active things when params change', ->
      @view.$('.filter-dropdown').addClass 'is-active'
      @view.params.trigger 'change'
      @view.$('.filter-dropdown').hasClass('is-active').should.not.be.ok()

  describe '#renderActiveParams', ->

    it 'renders active params', ->
      @view.params.set price_range: '5000:10000'
      @view.renderActiveParams()
      @view.$('.filter-dropdown').hasClass('is-active').should.be.ok()
      @view.$('.filter-nav-active-text').text().should.containEql '$5,000 to $10,000'
      @view.$('nav a').hasClass('is-active').should.be.ok()


  describe '#highlightAll', ->

    it 'highlights all works when the params arent specific', ->
      @view.params.clear()
      @view.$('.filter-nav-all').hasClass('is-active').should.be.ok()

  describe '#filterAttr', ->

    it 'sets price', ->
      @view.filterAttr currentTarget: $ "<div data-attr='price_range' data-val='-1:1000'></div>"
      @view.params.get('price_range').should.equal '-1:1000'

  describe '#highlightDropdownAlls', ->

    it 'makes the all nav active when there is no param set', ->
      @view.params.clear()
      @view.highlightDropdownAlls()
      @view.$('.filter-dropdown nav a').first().hasClass('is-active').should.be.ok()
