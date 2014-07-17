sinon = require 'sinon'
benv = require 'benv'
Backbone = require 'backbone'
Scrollbar = require '../../lib/scrollbar'

describe 'Scrollbar', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @scrollbar = new Scrollbar

  it 'should always have a body', ->
    @scrollbar.$body.length.should.equal 1
    @scrollbar.$els.length.should.equal 1

  it 'should be able to accept additional nodes', ->
    scrollbar = new Scrollbar $els: $('<fixture></fixture>')
    scrollbar.$els.length.should.equal 2
    scrollbar = new Scrollbar $els: $('<fixture></fixture>').add('<another></another>')
    scrollbar.$els.length.should.equal 3

  it 'sets padding on the body equal to the scrollbarWidth and appends the is-modal class', ->
    @scrollbar.scrollbarWidth = 15
    @scrollbar.set()
    $('body').attr('style').should.equal 'padding-right: 15px;'
    $('body').hasClass('is-modal').should.be.true

  it 'removes the padding and the modal class', ->
    @scrollbar.scrollbarWidth = 15
    @scrollbar.set()
    @scrollbar.reset()
    $('body').attr('style').should.be.empty
    $('body').hasClass('is-modal').should.be.false
