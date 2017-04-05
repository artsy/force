_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
TeamChannelNavView = require '../view'
sd = require('sharify').data

describe 'TeamChannelView', ->

  beforeEach (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      $.fn.waypoint = (@waypoint = sinon.stub())
      @carousel = { navigation: {} }
      @view = new TeamChannelNavView
        el: $('<div></div>')
        $content: $('<div></div>')
        $waypointEl: $('<div></div>')
        offset: -400
      done()

  afterEach ->
    benv.teardown()

  describe '#setupStickyNav', ->

    it 'adds a waypoint', ->
      @waypoint.called.should.be.true()
      @waypoint.args[0][1].offset.should.equal -400

  describe '#toggleHamburgerNav', ->

    it 'toggles the hamburger on if it is closed', ->
      @view.toggleHamburgerNav()
      $('body').hasClass('is-open').should.be.true()

    it 'toggles the hamburger off if it is open', ->
      $('body').addClass('is-open')
      @view.toggleHamburgerNav()
      $('body').hasClass('is-open').should.be.false()
