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
