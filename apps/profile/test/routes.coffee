{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
CurrentUser = require '../../../models/current_user.coffee'

describe 'User profile routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'user' }, originalUrl: "/alessandra" }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { ARTSY_URL: 'http://localhost:5000'} } }

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'renders the profile template', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'profile'
      @res.render.args[0][0].should.equal 'templates'
      @res.render.args[0][1].profile.get('id').should.equal 'alessandra'

    it 'redirects to the correct profile url', ->
      @req.originalUrl = '/wrong-profile'
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'profile'
      @res.redirect.args[0][0].should.equal '/alessandra'

  describe '#contact', ->

    it 'redirects to profile when requesting a partner profile tab', ->
      routes.contact @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'profile'
      @res.redirect.args[0][0].should.equal '/alessandra'

describe 'Partner routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'getty' }, originalUrl: "/getty"  }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { ARTSY_URL: 'http://localhost:5000'} } }

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'renders the index template', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'partner_profile'
      @res.render.args[0][0].should.equal '../partner/templates'
      @res.render.args[0][1].profile.isPartner()

  describe '#about', ->

    it 'renders the contact template', ->
      routes.about @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'partner_profile'
      @res.render.args[0][0].should.equal '../partner/templates'
      @res.render.args[0][1].profile.isPartner()

  describe '#contact', ->

    it 'renders the contact template', ->
      routes.contact @req, @res
      gallery = fabricate 'partner_profile'
      gallery.owner_type = 'PartnerGallery'
      _.last(Backbone.sync.args)[2].success gallery
      @res.render.args[0][0].should.equal '../partner/templates'
      @res.render.args[0][1].profile.isPartner()

  describe '#favorites', ->

    it 'redirects to profile if requesting a user tab on a partner profile', ->
      routes.favorites @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'partner_profile'
      @res.redirect.args[0][0].should.equal '/getty'

  describe '#follow', ->

    it 'redirects to profile page without user', ->
      routes.follow @req, @res
      @res.redirect.args[0][0].should.equal '/getty'

    it 'follows a profile and redirects to the profile', ->
      @res.redirect = sinon.stub()
      @req.user = new CurrentUser fabricate 'user'
      routes.follow @req, @res
      Backbone.sync.args[0][1].url().should.include '/api/v1/me/follow/profile'
      Backbone.sync.args[0][1].get('profile_id').should.equal 'getty'
      Backbone.sync.args[0][2].success()
      @res.redirect.args[0][0].should.equal '/getty'


describe 'Fair routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'the-armory-show' }, originalUrl: '/the-armory-show' }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { ARTSY_URL: 'http://localhost:5000'} } }

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'renders the index template', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'fair_profile'
      _.last(Backbone.sync.args)[2].success fabricate 'fair_profile'
      _.last(Backbone.sync.args)[2].success fabricate 'fair'
      _.last(Backbone.sync.args)[2].success []
      _.last(Backbone.sync.args)[2].success []
      _.last(Backbone.sync.args)[2].success []
      _.last(Backbone.sync.args)[2].success []
      _.last(Backbone.sync.args)[2].success []
      @res.render.args[0][0].should.equal '../fair/templates/overview'
      @res.render.args[0][1].profile.isFairOranizer()

  describe '#posts', ->

    it 'renders the posts template', ->
      routes.posts @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'fair_profile'
      _.last(Backbone.sync.args)[2].success fabricate 'fair_profile'
      _.last(Backbone.sync.args)[2].success fabricate 'fair'
      @res.render.args[0][0].should.equal '../fair/templates/index'
      @res.render.args[0][1].profile.isFairOranizer()
