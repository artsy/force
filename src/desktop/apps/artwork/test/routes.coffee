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

  describe '#download', ->
    describe 'as a normal user', ->
      describe 'when the image is downloadable', ->
        beforeEach ->
          Backbone.sync.restore()
          sinon.stub(Backbone, 'sync')
            .yieldsTo 'success', fabricate('artwork', images: [downloadable: true, image_versions: ['larger'], image_url: '/blah/:version.jpg'])

        it 'downloads the artwork', ->
          routes.download @req, @res, @next
          request.get.called.should.be.true()

      describe 'when the image is missing urls/versions', ->
        beforeEach ->
          Backbone.sync.restore()
          sinon.stub(Backbone, 'sync')
            .yieldsTo 'success', fabricate('artwork', images: [downloadable: true])

        it 'nexts with a 403', ->
          routes.download @req, @res, @next
          @next.called.should.be.true()
          @next.args[0][0].status.should.eql 403

      describe 'when the image is not downloadable', ->
        beforeEach ->
          Backbone.sync.restore()
          sinon.stub(Backbone, 'sync')
            .yieldsTo 'success', fabricate('artwork', images: [downloadable: false])

        it 'nexts with a 403', ->
          routes.download @req, @res, @next
          request.get.called.should.be.false()
          @next.called.should.be.true()
          @next.args[0][0].status.should.eql 403

    describe 'as an admin', ->
      describe 'when the image is not downloadable', ->
        beforeEach ->
          @req.user = new CurrentUser fabricate 'user', type: 'Admin'
          Backbone.sync.restore()
          sinon.stub(Backbone, 'sync')
            .yieldsTo 'success', fabricate('artwork', images: [downloadable: false])

        it 'downloads the artwork', ->
          routes.download @req, @res, @next
          request.get.called.should.be.true()
