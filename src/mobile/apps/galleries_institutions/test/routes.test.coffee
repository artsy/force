_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
routes = require '../routes'
Partner = require '../../../models/partner'
Partners = require '../../../collections/partners'

describe 'Galleries routes', ->
  beforeEach ->
    sinon.stub(Backbone, 'sync').yieldsTo 'success', []

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    beforeEach ->
      @res = render: sinon.stub()
      @req = path: '/galleries'

    it 'renders the galleries page', ->
      routes.index @req, @res
      @res.render.args[0][0].should.equal 'index'
      @res.render.args[0][1].copy.partnerType.should.equal 'galleries'

  describe '#galleries_institutions', ->
    beforeEach ->
      @res = render: sinon.stub(), locals: sd: sinon.stub()
      @next = sinon.stub()
      @partners = [
        new Partner fabricate 'partner'
      ]

    it 'nexts if the city is invalid', ->
      req = path: '/galleries/meow', params: city: 'meow'
      routes.galleries_institutions req, @res, @next
      @next.called.should.be.true()

    it 'renders the city template', (done) ->
      req = path: '/galleries/new-york', params: city: 'new-york'
      routes.galleries_institutions req, @res, @next

      Backbone.sync.args[0][2].data.should.equal 'size=20&active=true&type[]=PartnerGallery&sort=sortable_id&has_full_profile=true&partnerPlural=Galleries&near=40.7127837,-74.0059413&total_count=1'
      Backbone.sync.args[0][2].success @partners
      _.defer => _.defer =>
        @res.render.called.should.be.true()
        @res.render.args[0][0].should.equal 'partners'
        @res.render.args[0][1].city.name.should.equal 'New York'
        done()

    it 'renders all galleries if no city param is passed', (done) ->
      req = path: '/galleries/all', params: {}
      routes.galleries_institutions req, @res, @next

      Backbone.sync.args[0][2].success @partners
      _.defer => _.defer =>
        @res.render.called.should.be.true()
        @res.render.args[0][0].should.equal 'partners'
        @res.render.args[0][1].city.name.should.equal 'All Galleries'
        done()
