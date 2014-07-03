sinon = require 'sinon'
routes = require '../routes'

describe 'Personalize routes', ->
  beforeEach ->
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: sd: {} }

  describe '#index', ->
    describe 'logged in', ->
      it 'renders the personalize page', ->
        routes.index { params: {}, user: fetch: sinon.stub().yieldsTo 'success' }, @res
        @res.render.args[0][0].should.equal 'template'

    describe 'logged out', ->
      it 'redirects to login', ->
        routes.index { params: {} }, @res
        @res.redirect.args[0][0].should.equal '/log_in?redirect_uri=/personalize'
