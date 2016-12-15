_ = require 'underscore'
benv = require 'benv'
rewire = require 'rewire'
sinon = require 'sinon'
Backbone = require 'backbone'

describe 'AboutRouter', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      @AboutRouter = rewire '../../client/router'
      @AboutRouter.__set__ 'AboutView', Backbone.View
      sinon.stub _, 'defer', (cb) -> cb()
      done()

  after ->
    _.defer.restore()
    benv.teardown()

  beforeEach ->
    jumpProto = @AboutRouter.__get__('JumpView')::
    sinon.stub jumpProto, 'scrollToTop'
    sinon.stub jumpProto, 'scrollToPosition'
    @router = new @AboutRouter

  afterEach ->
    @router.jump.scrollToTop.restore()
    @router.jump.scrollToPosition.restore()

  describe '#toTop', ->
    it 'navigates to the top', ->
      @router.$window.scrollTop = -> 1
      @router.toTop()
      @router.jump.scrollToTop.called.should.be.true()

  describe '#toSection', ->
    beforeEach ->
      sinon.stub($.fn, 'offset').returns top: 200
      @router.view.$spinner = $('<div>')
      @router.view.loadUptoSection = (selector, cb) -> cb()

    afterEach ->
      $.fn.offset.restore()

    it 'navigates to the section', ->
      @router.toSection('section2')
      @router.jump.scrollToPosition.called.should.be.true()
      @router.jump.scrollToPosition.args[0][0].should.equal 201
      @router.view.$spinner.data('state').should.equal 'loaded'
