_ = require 'underscore'
cheerio = require 'cheerio'
Backbone = require 'backbone'
rewire = require 'rewire'
routes = rewire '../routes.coffee'
sinon = require 'sinon'
moment = require 'moment'

#
# Tests routes and the rendered template
#
describe 'Unsupported Browser', ->

  beforeEach ->
    @req = { params: {}, body: {} }
    @res =
      render: sinon.stub()
      locals: { sd: {}, asset: (->) }
      redirect: sinon.stub()
      cookie: sinon.stub()

  describe '#index', ->

    it 'renders an unsupported browser page', ->
      routes.index @req, @res
      @res.render.args[0][0].should.equal 'template'

  describe '#continueAnyway', ->

    it 'sets a cookie the middleware uses to bypass the unsupported message', ->
      routes.continueAnyway @req, @res
      @res.cookie.args[0][0].should.equal 'continue_with_bad_browser'

    it 'sets the cookie to expire one day from now', ->
      routes.continueAnyway @req, @res
      today = new Date()
      expireDate = new Date @res.cookie.args[0][2].expires
      moment(expireDate).diff(today, 'days', true).should.be.approximately(1, 0.0001)

    it 'redirects to the root if no forward url is passed', ->
      routes.continueAnyway @req, @res
      @res.redirect.args[0][0].should.equal '/'

    it 'redirects to a form submitted forward url or passed', ->
      @req.body['redirect-to'] = '/artwork/matthew-abbott-lobby-and-supercomputer'
      routes.continueAnyway @req, @res
      @res.redirect.args[0][0].should.equal '/artwork/matthew-abbott-lobby-and-supercomputer'

    it 'does not redirect to an external url', ->
      @req.body['redirect-to'] = 'http://example.com'
      routes.continueAnyway @req, @res
      @res.redirect.args[0][0].should.equal '/'

    it 'defaults redirect to /', ->
      routes.continueAnyway @req, @res
      @res.redirect.args[0][0].should.equal '/'
