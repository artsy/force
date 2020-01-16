{ fabricate } = require '@artsy/antigravity'
_ = require 'underscore'
sinon = require 'sinon'
Backbone = require 'backbone'
routes = require '../routes'
Profile = require '../../../models/profile.coffee'
CurrentUser = require '../../../models/current_user.coffee'

describe 'Partner routes', ->

  beforeEach ->
    sinon.stub Backbone, 'sync'
    @req = { body: {}, query: {}, params: { id: 'foo' } }
    @res = { render: sinon.stub(), locals: { sd: {} } }
    @next = sinon.stub()

  afterEach ->
    Backbone.sync.restore()

  describe '#requireNewLayout', ->
    _.each ['gallery_one', 'gallery_two', 'gallery_three', 'institution'], (layout) ->
      it "nexts to the middleware in this route stack if the profile layout is #{layout}", ->
        partnerProfile = new Profile fabricate 'partner_profile',
          owner: fabricate 'partner', profile_layout: layout
        @res.locals.profile = partnerProfile
        routes.requireNewLayout @req, @res, @next
        @next.calledOnce.should.be.ok
        _.isUndefined(@next.args[0][0]).should.be.ok()

    _.each ['gellery_default', 'gallery_deprecated'], (layout) ->
      it "skips the middlewares from this route stack if the profile layout is #{layout}", ->
        deprecatedLayoutPartnerProfile = new Profile fabricate 'partner_profile',
          owner: fabricate 'partner', profile_layout: layout
        @res.locals.profile = deprecatedLayoutPartnerProfile
        routes.requireNewLayout @req, @res, @next
        @next.calledOnce.should.be.ok
        @next.args[0][0].should.equal 'route'
