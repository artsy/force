sinon   = require 'sinon'
routes  = require '../routes'

describe 'Personalize routes', ->
  beforeEach ->
    @req = { params: {} }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: {} } }

  describe '#index', ->
    it 'renders the personalize page', ->
      routes.index @req, @res
      @res.render.args[0][0].should.equal 'template'
