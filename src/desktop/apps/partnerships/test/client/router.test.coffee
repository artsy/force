_ = require 'underscore'
benv = require 'benv'
rewire = require 'rewire'
sinon = require 'sinon'
Backbone = require 'backbone'

describe 'PartnershipsRouter', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      @Router = rewire '../../client/router'
      @Router.__set__ 'View', Backbone.View
      done()

  after ->
    benv.teardown()

  beforeEach ->
    jumpProto = @Router.__get__('Jump')::
    sinon.stub jumpProto, 'scrollToTop'
    sinon.stub jumpProto, 'scrollToPosition'
    @router = new @Router

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

    afterEach ->
      $.fn.offset.restore()

    it 'navigates to the section', ->
      @router.toSection('section2')
      @router.jump.scrollToPosition.called.should.be.true()
      @router.jump.scrollToPosition.args[0][0].should.equal 200
