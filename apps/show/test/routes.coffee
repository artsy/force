_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
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
    it 'fetches everything and renders the "index" template', ->
      Backbone.sync
        .onCall 0
        .yieldsTo 'success', fabricate 'show', id: 'foobar', partner: id: 'foobar-partner'
        .onCall 1
        .yieldsTo 'success', []
        .onCall 2
        .yieldsTo 'success'
        .onCall 3
        .yieldsTo 'success', []

      routes.index @req, @res, @next
        .then =>
          Backbone.sync.args[0][1].url().should.containEql '/api/v1/partner/foobar-partner/show/foobar'
          Backbone.sync.args[1][1].url.should.containEql '/api/v1/partner_show/foobar/images'
          Backbone.sync.args[2][1].url().should.containEql '/api/v1/partner/foobar-partner/show/foobar'
          Backbone.sync.args[2][2].data.should.have.keys ['cacheBust']
          Backbone.sync.args[3][1].url().should.containEql '/show/foobar/artworks?published=true'

          @next.called.should.be.false()
          @res.render.called.should.be.true()
          @res.render.args[0][0].should.equal 'index'

    it 'does not render non-displayable shows', ->
      Backbone.sync
        .onCall 0
        .yieldsTo 'success', fabricate 'show', displayable: false, id: 'foobar', partner: id: 'foobar-partner'
        .onCall 1
        .yieldsTo 'success', []
        .onCall 2
        .yieldsTo 'success'
        .onCall 3
        .yieldsTo 'success', []

      routes.index @req, @res, @next
        .then =>
          @res.render.called.should.be.false()
          @next.called.should.be.true()

    describe 'with a fair', ->
      beforeEach ->
        @fair = fabricate 'fair'
        @show = fabricate 'show', fair: @fair, id: 'foobar', partner: id: 'foobar-partner'

      xit 'should fetch the fair profile', ->
        Backbone.sync
          .onCall 0
          .yieldsTo 'success', @show
          .onCall 1
          .yieldsTo 'success', []
          .onCall 2
          .yieldsTo 'success'
          .onCall 3
          .yieldsTo 'success', []

        routes.index @req, @res, @next
          .then ->
            Backbone.sync.args[0][2].success @show
            Backbone.sync.args[4][1].id.should.equal 'the-armory-show'

      it 'should mark the fair as unpublished if the profile fetch fails', ->
        Backbone.sync
          .onCall 0
          .yieldsTo 'success', @show
          .onCall 1
          .yieldsTo 'success', []
          .onCall 2
          .yieldsTo 'success'
          .onCall 3
          .yieldsTo 'success', []
          .onCall 4
          .yieldsTo 'error'

        routes.index @req, @res, @next
          .then =>
            Backbone.sync.args[4][1].id.should.equal 'the-armory-show'
            @res.render.args[0][1].fair.get('published').should.be.false()
