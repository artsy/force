{ fabricate } = require 'antigravity'
_ = require 'underscore'
express = require 'express'
sinon = require 'sinon'
request = require 'supertest'
Backbone = require 'backbone'
CurrentUser = require '../../../models/current_user.coffee'
Profile = require '../../../models/profile.coffee'

nonDeprecatedLayoutPartnerProfile = new Profile fabricate 'partner_profile'
deprecatedLayoutPartnerProfile = new Profile fabricate 'partner_profile',
  owner: fabricate 'partner', profile_layout: 'gallery_deprecated'

prepareLocals = (profile) ->
  (req, res, next) ->
    res.locals.profile = profile
    res.locals.sd = {}
    res.locals.asset = (->)
    next()

loginAsUser = (req, res, next) ->
  req.user = new CurrentUser fabricate 'user', type: 'User'
  next()

loginAsAdmin = (req, res, next) ->
  req.user = new CurrentUser fabricate 'user', type: 'Admin'
  next()

partner2 = require '../index'
partner1 = (req, res, next) -> res.send 'partner1'

partnerRoutes = [
  '/:id', '/:id/overview', '/:id/shows', '/:id/works', '/:id/collection',
  '/:id/shop', '/:id/artists', '/:id/artist/:artistId', '/:id/articles',
  '/:id/contact', '/:id/about'
]

describe 'partner2 index', ->
  beforeEach ->
    @app = express()
    @app.use prepareLocals(nonDeprecatedLayoutPartnerProfile)

  describe 'public', ->
    beforeEach ->
      @app.use partner2
      @app.use partner1

    _.each partnerRoutes, (route) ->
      it "renders partner1 for #{route}", ->
        request(@app)
          .get route.replace(':id', 'partner-id').replace(':artistId', 'artist-id')
          .expect 200
          .expect 'partner1'

  describe 'users', ->
    beforeEach ->
      @app.use loginAsUser
      @app.use partner2
      @app.use partner1

    _.each partnerRoutes, (route) ->
      it "renders partner1 for #{route}", ->
        request(@app)
          .get route.replace(':id', 'partner-id').replace(':artistId', 'artist-id')
          .expect 200
          .expect 'partner1'

  describe 'admins', ->
    describe 'with partner profile layout other than gallery_deprecated', ->
      beforeEach ->
        @app.use loginAsAdmin
        @app.use partner2
        @app.use partner1

      _.each _.without(partnerRoutes, '/:id/overview'), (route) ->
        it "renders partner2 for #{route}", ->
          request(@app)
            .get route.replace(':id', 'partner-id').replace(':artistId', 'artist-id')
            .expect 200
            .expect (res) ->
              # https://github.com/visionmedia/supertest/issues/253
              res.text.should.startWith '<!DOCTYPE html>'

      it 'redirects to /:id for /:id/overview', ->
        request(@app)
          .get '/partner-id/overview'
          .expect 302
          .expect (res) ->
            res.text.should.endWith 'Redirecting to /partner-id'

    describe 'with partner profile layout gallery_deprecated', ->
      beforeEach ->
        @app = express()
        @app.use prepareLocals(deprecatedLayoutPartnerProfile)
        @app.use loginAsAdmin
        @app.use partner2
        @app.use partner1

      _.each partnerRoutes, (route) ->
        it "renders partner1 for #{route}", ->
          request(@app)
            .get route.replace(':id', 'partner-id').replace(':artistId', 'artist-id')
            .expect 200
            .expect 'partner1'
