sinon   = require 'sinon'
routes  = require '../routes'

describe 'Personalize routes', ->
  beforeEach ->
    @req = { params: {} }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: {} } }

  describe '#initial', ->
    it 'redirects to the first step', ->
      routes.initial @req, @res
      @res.redirect.args[0][0].should.equal '/personalize/collect'

  describe '#index', ->
    it 'renders the personalize page', ->
      routes.index @req, @res
      @res.render.args[0][0].should.equal 'template'
