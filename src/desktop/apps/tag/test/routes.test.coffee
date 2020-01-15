{ fabricate, fabricate2 } = require '@artsy/antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'

describe 'Tag routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req =
      params:
        id: 'foo'
    @res =
      render: sinon.stub()
      redirect: sinon.stub()
      locals:
        sd:
          APP_URL: 'http://localhost:5000'
          CURRENT_PATH: '/artwork/andy-foobar'

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    xit 'bootstraps the tag', (done)->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'gene', id: 'tag'
      
      _.defer => _.defer =>
        @res.locals.sd.TAG.id.should.equal 'tag'
        @res.render.args[0][0].should.equal 'index'
        done()
