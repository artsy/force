Q = require 'bluebird-q'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
{ fabricate } = require '@artsy/antigravity'

describe 'Search routes', ->
  describe '#index', ->
    describe 'success', ->
      beforeEach ->
        sinon.stub(Backbone, 'sync').returns Q.resolve()

      afterEach ->
        Backbone.sync.restore()

      it 'makes the appropriate request and removes accents', (done) ->
        req = params: {}, query: term: 'f\uFF4Fob\u00C0r'
        res = render: sinon.stub(), locals: sd: {}
        next = sinon.stub()

        routes.index req, res, next

        Backbone.sync.args[0][0].should.equal 'read'
        Backbone.sync.args[0][2].data.term.should.equal 'foobAr'

        done()

      it 'works with query', ->
        req = { params: {}, query: { q: "percy" } }
        res = { render: sinon.stub(), locals: { sd: {} } }
        routes.index req, res
        Backbone.sync.args[0][2].success([{}])
        res.render.called.should.be.ok

      it 'works with term', ->
        req = { params: {}, query: { term: "percy" } }
        res = { render: sinon.stub(), locals: { sd: {} } }
        routes.index req, res
        Backbone.sync.args[0][2].success([{}])
        res.render.called.should.be.ok

      it 'redirects without query or term', ->
        req = params: {}, query: {}
        res = redirect: sinon.stub(), locals: sd: {}
        routes.index req, res
        res.redirect.args[0][0].should.equal '/'
