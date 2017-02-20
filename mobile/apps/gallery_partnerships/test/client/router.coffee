_ = require 'underscore'
benv = require 'benv'
rewire = require 'rewire'
sinon = require 'sinon'
Backbone = require 'backbone'

describe 'GalleryPartnershipsRouter', ->
  before (done) ->
    benv.setup =>
      benv.expose $: benv.require 'jquery'
      Backbone.$ = $
      @Router = rewire '../../client/router'
      @Router.__set__ 'View', Backbone.View
      done()

  after ->
    benv.teardown()

  describe '#toSection', ->
    beforeEach ->
      @router = new @Router
      @window = @router.$window = scrollTop: sinon.stub()
      sinon.stub($.fn, 'offset').returns top: 200

    afterEach ->
      $.fn.offset.restore()

    it 'navigates to the section', ->
      @router.toSection('section2')
      @window.scrollTop.called.should.be.true()
      @window.scrollTop.args[0][0].should.equal 200
