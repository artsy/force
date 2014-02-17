_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
{ resolve } = require 'path'

describe 'BorderedPulldown', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      Backbone.$ = $
      BorderedPulldown = require '../view'
      @view = new BorderedPulldown el: $ "<div></div>"
      done()

  afterEach ->
    benv.teardown()

  it 'moves the pulldown up when selecting some items', ->
    sinon.spy $.fn, 'css'
    @view.optionHeight = 100
    $fixture = $("<div><b></b><b id='a'></b><b></b></div>")
    @view.select currentTarget: $fixture.find('#a')
    $.fn.css.args[0][0]['margin-top'].should.equal -100