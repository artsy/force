_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'

describe 'FilterFixedHeader', ->

  beforeEach (done) ->
    benv.setup =>
      FilterFixedHeader = benv.require resolve(__dirname, '../view')
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      FilterFixedHeader.__set__ 'JumpView', class @JumpView extends Backbone.View
        initialize: ->
      @view = new FilterFixedHeader
        el: $ "<div></div>"
        params: new Backbone.Model
      done()

  afterEach ->
    benv.teardown()

  it 'wraps the view in a container that locks the height', ->
    spy = sinon.spy $.fn, 'height'
    @view.wrap()
    spy.called.should.be.ok

  it 'scrolls back up if the user has scrolled past the header', ->
    @view.document = { scrollTop: 0 }
    @view.$window.scrollTop = -> 300
    @view.$el.offset = -> top: 200
    @view.scrollToTop()
    @view.document.scrollTop.should.be.above 0

  it 'doenst scroll back up if the user hasnt scrolled past the header', ->
    @view.document = { scrollTop: 0 }
    @view.$window.scrollTop = -> 200
    @view.$el.offset = -> top: 300
    @view.scrollToTop()
    @view.document.scrollTop.should.not.be.above 0

  it 'renders active params', ->
    @view.$el.html """
      <div class="filter-dropdown">
        <div class="filter-nav-main-text">Price</div>
        <div class="filter-nav-active-text"></div>
        <div class="icon-arrow-down"></div>
        <nav style="">
          <a data-attr="price_range" data-val="-1:1000">
            <span class="filter-dropdown-text">Under $1,000</span>
            <span class="filter-dropdown-count"></span>
            <span class="icon-check"></span>
          </a>
        </nav>
      </div>
    """
    @view.params.set price_range: '-1:1000'
    @view.renderActiveParams()
    @view.$('.filter-dropdown').hasClass('is-active').should.be.ok
    @view.$('.filter-nav-active-text').text().should.include 'Under $1,000'
    @view.$('nav a').hasClass('is-active').should.be.ok