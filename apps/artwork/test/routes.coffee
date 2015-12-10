_ = require 'underscore'
Q = require 'bluebird-q'
sinon = require 'sinon'
Backbone = require 'backbone'
request = require 'superagent'
{ fabricate } = require 'antigravity'
routes = require '../routes'
CurrentUser = require '../../../models/current_user'
Artwork = require '../../../models/artwork'

describe 'Artwork routes', ->
  beforeEach ->
    sinon.stub Backbone, 'sync'
    sinon.stub request, 'get'
      .returns set: sinon.stub()

    @req =
      params: id: 'foo'
      query: sort: '-published_at'
      pipe: sinon.stub().returns pipe: sinon.stub()

    @res =
      render: sinon.stub()
      redirect: sinon.stub()
      status: sinon.stub()
      locals:
        sd:
          APP_URL: 'http://localhost:5000'
          CURRENT_PATH: '/artwork/andy-foobar'

    @next = sinon.stub()

  afterEach ->
    Backbone.sync.restore()
    request.get.restore()

  describe '#index', ->
    beforeEach ->
      Backbone.sync
        .onCall 0
        .yieldsTo 'success', artwork = fabricate 'artwork',
            id: 'andy-foobar'
            artist: id: 'andy-foobar-artist'
            artists: [id: 'andy-foobar-artist']
        .returns Q.resolve artwork

    it 'bootstraps the artwork', ->
      routes.index @req, @res, @next
        .then =>
          @res.locals.sd.ARTWORK.id.should.equal 'andy-foobar'
          @res.render.args[0][0].should.equal 'index'

    it 'works with client side routes', ->
      @res.locals.sd.CURRENT_PATH = '/artwork/andy-foobar/inquire'
      @req.params.tab = 'inquire'
      routes.index @req, @res, @next
        .then =>
          @res.locals.sd.ARTWORK.id.should.equal 'andy-foobar'
          @res.render.args[0][0].should.equal 'index'

    it 'redirects to the correct artwork url', ->
      @res.locals.sd.CURRENT_PATH = '/artwork/andy-foobar-wrong'
      routes.index @req, @res, @next
        .then =>
          @res.redirect.args[0][0].should.equal '/artwork/andy-foobar'

    it 'redirects to the correct artwork page for client side routes fetched with a changed slug', ->
      @res.locals.sd.CURRENT_PATH = '/artwork/andy-foobar-wrong/inquire'
      @req.params.tab = 'inquire'
      routes.index @req, @res, @next
        .then =>
          @res.redirect.args[0][0].should.equal '/artwork/andy-foobar'

    describe 'with multiple artists', ->
      beforeEach ->
        Backbone.sync.restore()

        sinon.stub Backbone, 'sync'
        Backbone.sync
          .onCall 0
          .yieldsTo 'success', artwork = fabricate 'artwork', {
            id: 'andy-foobar'
            artist: id: 'multiple-andy-foobar-artist-primary'
            artists: [
              { id: 'multiple-andy-foobar-artist-secondary' }
              { id: 'multiple-andy-foobar-artist-primary' }
            ]
          }
          .returns Q.resolve artwork
          .onCall 1
          .yieldsTo 'success', {}
          .returns Q.resolve {}
          .onCall 2
          .yieldsTo 'success', artist = id: 'multiple-andy-foobar-artist-primary', fetched: 'existy'
          .returns Q.resolve artist

      it 'fully fetches the artists', ->
        routes.index @req, @res, @next
          .then =>
            Backbone.sync.callCount.should.equal 3
            @res.render.called.should.be.true()
            @res.render.args[0][1].artwork.related().artist.get 'fetched'
              .should.equal 'existy'

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
          request.get.called.should.be.true()

      describe 'when the image is not downloadable', ->
        beforeEach ->
          Backbone.sync.restore()
          sinon.stub(Backbone, 'sync')
            .yieldsTo 'success', fabricate('artwork', images: [downloadable: false])

        it '403s', ->
          routes.download @req, @res, @next
          request.get.called.should.be.false()
          @next.called.should.be.true()
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
          request.get.called.should.be.true()
