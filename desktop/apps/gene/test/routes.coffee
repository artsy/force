{ fabricate, fabricate2 } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
CurrentUser = require '../../../models/current_user'

describe 'Gene routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req =
      params:
        id: 'foo'
      query:
        sort: '-published_at'
      originalUrl: 'http://localhost:5000/gene/gene'
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
    it 'bootstraps the gene', (done)->
      @req.path = '/gene/foo/artworks'
      routes.index @req, @res
      _.first(Backbone.sync.args)[2].success fabricate 'gene', id: 'foo'
      _.last(Backbone.sync.args)[2].success fabricate2 'filter_artworks'
      _.defer => _.defer =>
        @res.locals.sd.GENE.id.should.equal 'foo'
        @res.render.args[0][0].should.equal 'index'
        done()

    it 'redirects to the correct URL if the gene slug has been updated', (done) ->
      routes.index @req, @res
      _.first(Backbone.sync.args)[2].success fabricate 'gene', id: 'not-foo'
      _.last(Backbone.sync.args)[2].success fabricate2 'filter_artworks'
      _.defer => _.defer =>
        @res.redirect.called.should.be.true()
        @res.redirect.args[0].should.eql [301, '/gene/not-foo']
        @res.render.called.should.be.false()
        done()

    it 'overrides the view mode if the path is /artworks', (done)->
      @req.path = '/gene/foo/artworks'

      routes.index @req, @res
      _.first(Backbone.sync.args)[2].success fabricate 'gene', id: 'foo'
      _.last(Backbone.sync.args)[2].success fabricate2 'filter_artworks'

      _.defer => _.defer =>
        @res.locals.sd.GENE.id.should.equal 'foo'
        @res.locals.sd.MODE.should.equal 'artworks'
        @res.render.args[0][0].should.equal 'index'
        done()

    it 'sets the view mode properly if artworks or artist is in the title', (done)->
      @req.path = '/gene/the-artists-pizza'
      @req.params.id = 'the-artists-pizza'

      routes.index @req, @res
      _.first(Backbone.sync.args)[2].success fabricate 'gene', id: 'the-artists-pizza', type: name: 'E1 - Content'
      _.last(Backbone.sync.args)[2].success fabricate2 'filter_artworks'

      _.defer => _.defer =>
        @res.locals.sd.GENE.id.should.equal 'the-artists-pizza'
        @res.locals.sd.MODE.should.equal 'artworks'
        @res.render.args[0][0].should.equal 'index'
        done()
