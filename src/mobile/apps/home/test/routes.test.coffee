_ = require 'underscore'
sinon = require 'sinon'
rewire = require 'rewire'
routes = rewire '../routes'

describe '#index', ->

  beforeEach ->
    @req = {}
    @res = { render: sinon.stub(), locals: { sd: {} } }
    @next = sinon.stub()
    routes.__set__ 'metaphysics', @metaphysics = sinon.stub()
    @metaphysics.returns Promise.resolve home_page: hero_units: [{
      title: 'Foo'
    }]

  it 'renders the hero units', (done) ->
    routes.index @req, @res, @next
    _.defer =>
      @res.render.args[0][1].heroUnits[0].title.should.equal 'Foo'
      done()
