_             = require 'underscore'
HeroUnits     = require '../../collections/hero_units'
FeaturedLinks = require '../../collections/featured_links.coffee'

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
  if req.user? then res.redirect '/' else next()
