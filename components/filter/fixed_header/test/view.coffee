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
      @view = new FilterFixedHeader el: $ "<div></div>"
      done()

  afterEach ->
    benv.teardown()

  it 'wraps the view in a container that locks the height', ->
    spy = sinon.spy $.fn, 'height'
    @view.wrap()
    spy.called.should.be.ok

  it 'only scrolls back up if the user has scrolled past the header'