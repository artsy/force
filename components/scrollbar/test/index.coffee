sinon = require 'sinon'
benv = require 'benv'
Backbone = require 'backbone'
Scrollbar = require '../index'

describe 'Scrollbar', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @scrollbar = new Scrollbar
    @scrollbar.hasScrollbar = true

  it 'should always have a body', ->
    @scrollbar.$body.length.should.equal 1
    @scrollbar.$els.length.should.equal 1

  it 'sets padding on the body equal to the scrollbarWidth and appends the is-scrolling-disabled class', ->
    @scrollbar.scrollbarWidth = 15
    @scrollbar.disable()
    $('body').attr('style').should.equal 'padding-right: 15px;'
    $('body').hasClass('is-scrolling-disabled').should.be.true()

  it 'removes the padding and the modal class', ->
    @scrollbar.scrollbarWidth = 15
    @scrollbar.disable()
    @scrollbar.reenable()
    $('body').attr('style').should.be.empty
    $('body').hasClass('is-scrolling-disabled').should.be.false()

  it 'does not add padding (but adds modal class) if there is no scrollbar present', ->
    @scrollbar.hasScrollbar = false
    @scrollbar.disable()
    $('body').attr('style').should.be.empty
    $('body').hasClass('is-scrolling-disabled').should.be.true()
