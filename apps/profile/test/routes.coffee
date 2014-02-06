{ fabricate } = require 'antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
Profile = require '../../../models/profile.coffee'
Shortcut = require '../../../models/shortcut.coffee'

describe 'User profile routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'user' } }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { ARTSY_URL: 'http://localhost:5000'} } }

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'renders the profile template', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'profile'
      @res.render.args[0][0].should.equal 'templates'
      @res.render.args[0][1].profile.get('id').should.equal 'alessandra'

  describe '#contact', ->

    it 'redirects to profile when requesting a partner profile tab', ->
      routes.contact @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'profile'
      @res.redirect.args[0][0].should.equal '/alessandra'

describe 'Partner routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { params: { id: 'some-gallery' } }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { ARTSY_URL: 'http://localhost:5000'} } }

  afterEach ->
    Backbone.sync.restore()

  describe '#index', ->

    it 'renders the index template', ->
      routes.index @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'partner_profile'
      @res.render.args[0][0].should.equal '../partner/templates'
      @res.render.args[0][1].profile.isPartner()

  describe '#contact', ->

    it 'renders the contact template', ->
      routes.contact @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'partner_profile'
      @res.render.args[0][0].should.equal '../partner/templates'
      @res.render.args[0][1].profile.isPartner()

  describe '#favorites', ->

    it 'redirects to profile if requesting a user tab on a partner profile', ->
      routes.favorites @req, @res
      _.last(Backbone.sync.args)[2].success fabricate 'partner_profile'
      @res.redirect.args[0][0].should.equal '/getty'
