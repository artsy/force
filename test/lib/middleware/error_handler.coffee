_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'
errorHandler = rewire '../../../lib/middleware/error_handler'

describe 'errorHandler', ->
  beforeEach ->
    @renderStub = { render: sinon.stub() }
    @res = {
      status: sinon.stub().returns(@renderStub)
    }
    @err = {
      status: 420
      message: 'When they go low, we go high'
      stack: 'mad fat stacks'
    }

  it.only 'invokes the error handler template with the right parameters (and the right status code for the page)', ->
    errorHandler.__set__ 'NODE_ENV', 'development'
    errorHandler(@err, {}, @res, {})
    @res.status.args[0][0].should.equal 420
    @renderStub.render.args[0][0].should.containEql 'desktop/components/error_handler/index.jade'
    @renderStub.render.args[0][1].message.should.equal 'When they go low, we go high'
    @renderStub.render.args[0][1].code.should.equal 420
    @renderStub.render.args[0][1].detail.should.equal 'mad fat stacks'

  it 'passes undefined in production', ->
    errorHandler.__set__ 'NODE_ENV', 'production'
    errorHandler(@err, {}, @res, {})
    @res.status.args[0][0].should.equal 420
    @renderStub.render.args[0][0].should.containEql 'desktop/components/error_handler/index.jade'
    _.isUndefined(@renderStub.render.args[0][1].message).should.be.ok()
    @renderStub.render.args[0][1].code.should.equal 420
    _.isUndefined(@renderStub.render.args[0][1].detail).should.be.ok()
