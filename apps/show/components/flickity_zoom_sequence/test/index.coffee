benv = require 'benv'
sinon = require 'sinon'
Backbone = require 'backbone'
FlickityZoomSequence = require '../index'

describe 'FlickityZoomSequence', ->
  before (done) ->
    benv.setup ->
      benv.expose $: benv.require('jquery'), jQuery: benv.require('jquery')
      Backbone.$ = $
      done()

  after ->
    benv.teardown()

  beforeEach ->
    @flickity = select: sinon.stub()
    @seq = new FlickityZoomSequence @flickity

  describe '#click', ->
    it 'engages the clicked mode', ->
      @seq.clicked.should.be.false()
      @seq.click null, null, null, 2
      @seq.clicked.should.be.true()
      @flickity.select.args[0][0].should.equal 2

  describe '#select', ->
    beforeEach ->
      sinon.stub @seq, 'zoom'
        .returns view: new Backbone.View
      sinon.stub @seq, 'src'
        .returns 'foobar.jpg'

    afterEach ->
      @seq.zoom.restore()
      @seq.src.restore()

    it 'opens the modal if clicked is engaged', ->
      @seq.select()
      (@seq.modal is undefined).should.be.true()
      @seq.clicked = true
      @seq.select()
      (@seq.modal is undefined).should.be.false()

    it 'turns off clicked mode when modal is closed via UI event', ->
      @seq.clicked = true
      @seq.select()
      @seq.clicked.should.be.true()
      @seq.modal.view.trigger 'closed', null # Synthetic close
      @seq.clicked.should.be.true() # Reamins true
      @seq.modal.view.trigger 'closed', target: 'existy' # UI event close
      @seq.clicked.should.be.false()
