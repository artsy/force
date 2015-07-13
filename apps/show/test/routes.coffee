_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
PartnerShow = require '../../../models/partner_show'
{ fabricate } = require 'antigravity'
routes = require '../routes'

describe 'Show route', ->
  beforeEach ->
    @req = get: sinon.stub(), params: id: 'foobar'
    @res = render: sinon.stub(), redirect: sinon.stub(), locals: sd: {}
    @next = sinon.stub()
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    it 'fetches everything and renders the "index" template', (done) ->
      routes.index @req, @res

      Backbone.sync.args[0][1].url().should.containEql '/api/v1/show/foobar'
      Backbone.sync.args[0][2].success _.extend(fabricate('show'), id: 'foobar', partner: id: 'foobar-partner')

      Backbone.sync.args[1][1].url.should.containEql '/api/v1/partner_show/foobar/images'
      Backbone.sync.args[1][2].success []

      _.defer =>
        Backbone.sync.args[2][1].url().should.containEql '/api/v1/partner/foobar-partner/show/foobar'
        Backbone.sync.args[2][2].data.should.have.keys ['cacheBust']
        Backbone.sync.args[2][2].success()
        Backbone.sync.args[3][1].url().should.containEql '/show/foobar/artworks?published=true'
        Backbone.sync.args[3][2].success []

        _.defer =>
          @res.render.called.should.be.true()
          @res.render.args[0][0].should.equal 'index'

          done()
