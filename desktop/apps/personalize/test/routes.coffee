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
      it 'redirects to login with the appropriate redirect_uri', ->
        routes.index { params: {}, url: '/personalize' }, @res
        @res.redirect.args[0][0].should.equal '/log_in?redirect_uri=%2Fpersonalize'

      it 'redirects to login with the appropriate redirect_uri', ->
        routes.index { params: {}, url: '/personalize?reonboarding=1' }, @res
        @res.redirect.args[0][0].should.equal '/log_in?redirect_uri=%2Fpersonalize%3Freonboarding%3D1'
