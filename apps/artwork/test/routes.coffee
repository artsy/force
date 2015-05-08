{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
request = require 'superagent'
routes = require '../routes'
CurrentUser = require '../../../models/current_user.coffee'
Artwork = require '../../../models/artwork.coffee'

describe 'Artwork routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    sinon.stub(request, 'get').returns(set: sinon.stub())
    @req = { params: { id: 'foo' }, query: { sort: '-published_at' }, pipe: sinon.stub().returns(pipe: sinon.stub()) }
    @res = { render: sinon.stub(), redirect: sinon.stub(), status: sinon.stub(), locals: { sd: { APP_URL: 'http://localhost:5000', CURRENT_PATH: '/artwork/andy-foobar' } } }
    @next = sinon.stub()

  afterEach ->
    Backbone.sync.restore()
    request.get.restore()

  describe '#index', ->
    it 'bootstraps the artwork', (done) ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'artwork', id: 'andy-foobar', artist: id: 'andy-foobar-artist'
      _.defer =>
        _.last(Backbone.sync.args)[2].success fabricate 'artist'
        @res.locals.sd.ARTWORK.id.should.equal 'andy-foobar'
        @res.locals.sd.ARTIST.id.should.equal 'andy-foobar-artist'
        @res.render.args[0][0].should.equal 'index'
        done()

    it 'works without an artist', (done) ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'artwork', id: 'andy-foobar', artist: null
      _.defer =>
        @res.locals.sd.ARTWORK.id.should.equal 'andy-foobar'
        @res.render.args[0][0].should.equal 'index'
        done()

    it 'works with multiple artists', (done) ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'artwork',
        id: 'andy-foobar'
        artist: id: 'andy-foobar-artist'
        artists: [{ id: 'andy-foobar-artist' }, { id: 'andy-barbaz-artist' }]
      _.defer =>
        fetches = _.last(Backbone.sync.args, 2)
        fetches[0][2].success fabricate 'artist'
        fetches[1][2].success fabricate 'artist'
        @res.locals.sd.ARTIST.id.should.equal 'andy-foobar-artist'
        _.pluck(@res.locals.sd.ARTISTS, 'id')
          .should.eql ['andy-foobar-artist', 'andy-barbaz-artist']
        @res.render.args[0][0].should.equal 'index'
        done()

    it 'works with client side routes', (done) ->
      @res.locals.sd.CURRENT_PATH = '/artwork/andy-foobar/inquire'
      @req.params.tab = 'inquire'
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'artwork', id: 'andy-foobar', artist: id: 'andy-foobar-artist'
      _.defer =>
        _.last(Backbone.sync.args)[2].success fabricate 'artist'
        @res.locals.sd.ARTWORK.id.should.equal 'andy-foobar'
        @res.locals.sd.ARTIST.id.should.equal 'andy-foobar-artist'
        @res.render.args[0][0].should.equal 'index'
        done()

    it 'redirects to the correct artwork url', ->
      @res.locals.sd.CURRENT_PATH = '/artwork/andy-foobar-wrong'
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'artwork', id: 'andy-foobar'
      @res.redirect.args[0][0].should.equal '/artwork/andy-foobar'

    it 'redirects to the correct artwork page for client side routes fetched with a changed slug', ->
      @res.locals.sd.CURRENT_PATH = '/artwork/andy-foobar-wrong/inquire'
      @req.params.tab = 'inquire'
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'artwork', id: 'andy-foobar'
      @res.redirect.args[0][0].should.equal '/artwork/andy-foobar'

  describe '#save', ->
    it 'saves the artwork', ->
      @req.user = new CurrentUser fabricate 'user'
      routes.save @req, @res
      _.last(Backbone.sync.args)[0].should.equal 'create'
      _.last(Backbone.sync.args)[1].url.should.containEql "/api/v1/collection/saved-artwork/artwork/#{@req.params.id}?user_id=#{@req.user.id}"

  describe '#download', ->
    describe 'when normal user', ->
      describe 'when the image is downloadable', ->
        beforeEach ->
          Backbone.sync.restore()
          sinon.stub(Backbone, 'sync')
            .yieldsTo 'success', fabricate('artwork', images: [downloadable: true])

        it 'downloads the artwork', ->
          routes.download @req, @res, @next
          request.get.called.should.be.true

      describe 'when the image is not downloadable', ->
        beforeEach ->
          Backbone.sync.restore()
          sinon.stub(Backbone, 'sync')
            .yieldsTo 'success', fabricate('artwork', images: [downloadable: false])

        it '403s', ->
          routes.download @req, @res, @next
          request.get.called.should.be.false
          @next.called.should.be.true
          @res.status.args[0][0].should.equal 403

    describe 'when admin', ->
      describe 'when the image is downloadable', ->
        beforeEach ->
          @req.user = new CurrentUser fabricate 'user', type: 'Admin'
          Backbone.sync.restore()
          sinon.stub(Backbone, 'sync')
            .yieldsTo 'success', fabricate('artwork', images: [downloadable: false])

        it 'downloads the artwork', ->
          routes.download @req, @res, @next
          request.get.called.should.be.true
