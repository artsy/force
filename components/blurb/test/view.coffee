_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'

describe 'BlurbView', ->

  before (done) ->
    benv.setup =>
      benv.expose { $: benv.require 'jquery' }
      @dotdotdot = $.fn.dotdotdot = sinon.stub()
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    BlurbView = require '../view.coffee'
    $('body').append '<div class="blurb"></div>'
    @view = new BlurbView el: $('.blurb')
    @view.detachEllipsis = sinon.stub()

  describe '#attachEllipsis', ->

    it 'attaches ellipsis using dotdotdot', ->
      @dotdotdot.calledOnce.should.be.ok()
