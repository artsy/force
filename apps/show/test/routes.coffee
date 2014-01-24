sinon   = require 'sinon'
routes  = require '../routes'
Backbone = require 'backbone'
{ fabricate } = require 'antigravity'

describe 'Show route', ->
  beforeEach ->
    @req = { params: {} }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: {} } }
    sinon.stub Backbone, 'sync'

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->
    beforeEach ->
      routes.index @req, @res

    it 'renders the partners page if partner has private profile', ->
      show = fabricate('show')
      show.partner.default_profile_public = false
      Backbone.sync.args[0][2].success(show)
      @res.render.args[0][0].should.equal 'template'

    it 'renders the partners page if partner has public profile', ->
      show = fabricate('show')
      show.partner.default_profile_public = true
      Backbone.sync.args[0][2].success(show)
      Backbone.sync.args[1][2].success(fabricate('profile'))
      @res.render.args[0][0].should.equal 'template'
