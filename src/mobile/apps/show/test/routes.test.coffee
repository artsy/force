_ = require 'underscore'
benv = require 'benv'
sinon = require 'sinon'
routes = require '../routes'
Backbone = require 'backbone'
{ fabricate } = require '@artsy/antigravity'
Show = require '../../../models/show'
Location = require '../../../models/location'

describe 'Show Routes', ->

  before (done) ->
    benv.setup =>
      sinon.stub Backbone, 'sync'
      @req = params: id: 'show-foo-bar'
      @res = render: sinon.stub(), locals: sd: {}
      done()

  after ->
    Backbone.sync.restore()
    benv.teardown()

  describe 'renders the show page', ->

    xit '#index', ->
      routes.index @req, @res
      Backbone.sync.args[0][1].url().should.containEql '/api/v1/show/show-foo-bar'
      Backbone.sync.args[1][1].url.should.containEql '/api/v1/partner_show/show-foo-bar/images'
      Backbone.sync.args[0][2].success fabricate 'show', name: 'Foo at the Bar'
      Backbone.sync.args[1][2].success fabricate 'show_install_shot'
      _.defer => _.defer =>
        Backbone.sync.args[3][2].url.should.containEql '/api/v1/partner/gagosian5/show/gagosian-gallery-inez-and-vinoodh2/artworks'
        @res.render.args[0][0].should.equal 'index'
        @res.render.args[0][1].show.get('name').should.equal 'Foo at the Bar'
