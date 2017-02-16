rewire = require 'rewire'
proxyToMerged = rewire '../../../lib/middleware/proxy_to_merged'
sinon = require 'sinon'

describe 'proxy to merged', ->

  beforeEach ->
    proxyToMerged.__set__ 'proxy', @proxy = { web: sinon.stub() }
    @Math = proxyToMerged.__get__ 'Math'
    @Math.random = sinon.stub()
    @req = session: {}
    @res = {}
    @next = sinon.stub()

  it 'proxies merged force if the coin flip succeeds', ->
    proxyToMerged.__set__ 'weight', 0.5
    @Math.random.returns 0.4
    proxyToMerged @req, @res, @next
    @proxy.web.args[0][2].target.should.equal 'https://merged.artsy.net'

  it 'keeps someone in merged force mode regardless of coin flip', ->
    proxyToMerged.__set__ 'weight', 0.5
    @Math.random.returns 0.6
    @req.session.inMergedForce = true
    proxyToMerged @req, @res, @next
    @proxy.web.args[0][2].target.should.equal 'https://merged.artsy.net'

  it 'regardless of the session will not proxy if the weight is 0', ->
    proxyToMerged.__set__ 'weight', 0
    @req.session.inMergedForce = true
    proxyToMerged @req, @res, @next
    @next.called.should.be.ok()

  it 'sets the host header as the target host to appease Heroku routing', ->
    proxyToMerged.__set__ 'weight', 1
    @req.session.inMergedForce = true
    proxyToMerged @req, @res, @next
    @proxy.web.args[0][2].headers.host.should.equal 'merged.artsy.net'
