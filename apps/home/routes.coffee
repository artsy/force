_             = require 'underscore'
HeroUnits     = require '../../collections/hero_units'
FeaturedLinks = require '../../collections/featured_links.coffee'
{ parse }     = require 'url'
Backbone      = require 'backbone'
sd            = require('sharify').data

getRedirectTo = (req) ->
  req.body['redirect-to'] or req.query['redirect-to'] or req.query['redirect_uri'] or parse(req.get('Referrer') or '').path or '/'

emailTypes =
  'weekly_email': "weekly newsletters."
  'personalized_email': "personalized emails."
  'follow_users_email': "user follow emails."

@index = (req, res) ->
  heroUnits = new HeroUnits
  featuredLinks = new FeaturedLinks
  render = _.after 2, ->
    res.render 'index',
      heroUnits: heroUnits.models
      featuredLinks: featuredLinks.models
  heroUnits.fetch
    cache: true
    success: render
    error: res.backboneError
  featuredLinks.fetchSetItemsByKey 'homepage:featured-sections',
    cache: true
    success: render
    error: res.backboneError

@redirectToSignup = (req, res) ->
  res.redirect "/sign_up"

@redirectLoggedInHome = (req, res, next) ->
  if req.user? then res.redirect getRedirectTo(req) else next()

@unsubscribe = (req, res, next) ->
  type = req.query.type
  new Backbone.Model().save {},
    url: "#{sd.ARTSY_URL}/api/v1/me/unsubscribe"
    data: _.pick(req.query, 'authentication_token', 'type')
    success: (obj) ->
      res.render 'unsubscribe', type: emailTypes[type], name: obj.get('name')
    error: res.backboneError