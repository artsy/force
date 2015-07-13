_ = require 'underscore'
sinon = require 'sinon'
flashMiddleware = require '../../../lib/middleware/flash'

describe 'flashMiddleware', ->
  beforeEach ->
    @req = flash: sinon.stub().returns(['my', 'my', 'metrocard'])
    @res = locals: { sd: {} }, render: (@renderStub = sinon.stub())
    @next = sinon.stub()

  it 'monkey patches render to inject flash messages into the locals', ->
    @res.render()
    @req.flash.called.should.not.be.ok()
    flashMiddleware @req, @res, @next
    @next.called.should.be.ok()
    @res.render('foobar')
    @req.flash.called.should.be.ok()
    @res.locals.sd.should.eql FLASH: 'my, my, metrocard'
    _.last(@renderStub.args)[0].should.equal 'foobar'
