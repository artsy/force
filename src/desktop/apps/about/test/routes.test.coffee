sinon = require 'sinon'
rewire = require 'rewire'
routes = rewire '../routes'

send = null
json = null

describe 'About routes', ->
  describe '#index', ->
    beforeEach ->
      @res =
        redirect: sinon.stub()
        locals: sd: IS_MOBILE: true
        render: sinon.stub()
      routes.__set__ 'JSONPage', sinon.stub().returns
        get: sinon.stub().callsArgWith 0, null, sections: []

    it 'redirects to buying-with-artsy if it is mobile', ->
      routes.index {}, @res
      @res.redirect.args[0].should.eql ['/buying-with-artsy']

    it 'doesnt redirect if not mobile', ->
      @res.locals.sd.IS_MOBILE = false
      routes.index {}, @res
      @res.redirect.called.should.not.be.ok()
      @res.render.called.should.be.ok()
