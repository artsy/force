_             = require 'underscore'
routes        = require '../routes'
sinon         = require 'sinon'
Backbone      = require 'backbone'
CurrentUser   = require '../../../models/current_user.coffee'
{ fabricate } = require 'antigravity'

describe '/user', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { }
    @res = { render: sinon.stub(), redirect: sinon.stub(), locals: { sd: { ARTSY_URL: 'http://localhost:5000'} } }

  afterEach ->
    Backbone.sync.restore()

  describe '#edit', ->

    it 'redirects to the home page without a current user', ->
      routes.edit @req, @res
      @res.redirect.args[0][0].should.equal '/'

    xit "fetches the current user and the user's profile", ->

    xit 'determines which model to edit first (profile or user)', ->

  xdescribe '#delete', ->
