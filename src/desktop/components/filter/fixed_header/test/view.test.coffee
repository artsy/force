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
    spy.called.should.be.ok()

  it 'scrolls back up if the user has scrolled past the header', ->
    @view.$bodyHtml.scrollTop = sinon.stub()
    @view.$window.scrollTop = -> 300
    @view.$el.offset = -> top: 200
    @view.scrollToTop()
    @view.$bodyHtml.scrollTop.args[0][0].should.be.above 0

  it 'doenst scroll back up if the user hasnt scrolled past the header', ->
    @view.document = { scrollTop: 0 }
    @view.$window.scrollTop = -> 200
    @view.$el.offset = -> top: 300
    @view.scrollToTop()
    @view.document.scrollTop.should.not.be.above 0

  describe '#squeeze', ->

    it 'doesnt choke if the filter UI is missing a left portion', ->
      @view.squeeze()

    it 'toggles the visiblity of the left info when the screen is smaller'
