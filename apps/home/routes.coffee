_             = require 'underscore'
HeroUnits     = require '../../collections/hero_units'
FeaturedLinks = require '../../collections/featured_links.coffee'
{ parse }     = require 'url'
Backbone      = require 'backbone'
sd            = require('sharify').data

getRedirectTo = (req) ->
  req.body['redirect-to'] or req.query['redirect-to'] or req.query['redirect_uri'] or parse(req.get('Referrer') or '').path or '/'

getRedirectTo = (req) ->
  req.body['redirect-to'] or req.query['redirect-to'] or req.query['redirect_uri'] or parse(req.get('Referrer') or '').path or '/'

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
